import getDeviceInfo from './device_info'

const JsTracking = config => {
  config = {
    dataName: {
      pageLoad: 'data-tracking-page-load',
      elementClick: 'data-tracking-element-click',
      elementView: 'data-tracking-element-view',
    },
    processData: data => {
      return {
        ...data.attrData
      }
    },
    submitData: () => Promise.resolve(),
    submitConditions: () => true,
    elementViewConditions: () => true,
    ...config
  }

  const firstDateTime = Date.now()

  const getBindElement = (element, attributeName) => {
    const hasAttr = element.hasAttribute(attributeName)

    if (hasAttr) {
      return element
    }

    if (element.nodeName.toLowerCase() === 'body') {
      return null
    }

    return getBindElement(element.parentElement, attributeName)
  }

  const getPathName = () => {
    const hashRouter = location.hash.indexOf('#/') === 0
    let pathName = location.pathname

    if (hashRouter) {
      pathName = location.hash.slice(1)
    }

    if (pathName !== '/' && pathName.slice(-1) === '/') {
      pathName = pathName.slice(0, -1)
    }

    return pathName
  }

  const getElementIndex = element => {
    return Array.from(element.parentElement.children).indexOf(element)
  }

  const getElementTopHeight = element => {
    const top = element.offsetTop

    if (element.offsetParent) {
      return top + getElementTopHeight(element.offsetParent)
    }

    return top
  }

  const hasElementClientRect = element => {
    const elementHeight = element.getBoundingClientRect().height
    const elementClientY = element.getBoundingClientRect().y
    const innerHeight = window.innerHeight

    return innerHeight - elementClientY > 0 && innerHeight - elementClientY - elementHeight <= innerHeight
  }

  const getAttrData = async (element, attributeName) => {
    let data = element.getAttribute(attributeName)

    // 处理异步加载元素属性数据
    if (data === 'async') {
      data = await new Promise(resolve => {
        // 如果不支持MutationObserver方法，使用定时器模拟
        if (typeof MutationObserver === 'undefined') {
          let seconds = 0
          const timer = setInterval(() => {
            const value = element.getAttribute(attributeName)

            seconds += 1

            if (value !== 'async') {
              resolve(value)
              clearInterval(timer)
              return
            }

            // 5秒还没载入数据，不等了
            if (seconds >= 5) {
              resolve('{}')
              clearInterval(timer)
            }
          }, 1000)
        } else {
          const observer = new MutationObserver(mutationsList => {
            for (let mutation of mutationsList) {
              if (mutation.type === 'attributes' && Object.values(config.dataName).includes(mutation.attributeName)) {
                observer.disconnect()
                resolve(element.getAttribute(attributeName))
              }
            }
          })
  
          observer.observe(element, {
            attributes: true
          })
        }
      })
    }

    return JSON.parse(data || '{}')
  }

  const getGlobalData = () => {
    const getCookieData = () => {
      if (!document.cookie) {
        return {}
      }

      const cookieList = document.cookie.split(';')
      const cookieJson = {}

      for (let cookie of cookieList) {
        const [name, value] = cookie.split('=')

        cookieJson[name.trim()] = value.trim()
      }

      return cookieJson
    }

    const getPageData = () => {
      return {
        url: location.href,
        host: location.host,
        hostName: location.hostname,
        pathName: getPathName(),
        title: document.title,
        referrer: document.referrer,
        referrerHost: document.referrer.split('/')[2] || ''
      }
    }

    const getNavigator = () => {
      const getLanguage = () => {
        const language = navigator.browserLanguage || navigator.language
        const arr = language.split('-')

        if (arr[1]) {
          arr[1] = arr[1].toUpperCase()
        }

        return arr.join('-')
      }

      return {
        language: getLanguage(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        appName: navigator.appName,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        ...getDeviceInfo(),
      }
    }

    return {
      page: getPageData(),
      cookie: getCookieData(),
      navigator: getNavigator(),
    }
  }

  const saveLocalData = data => {
    localStorage.setItem('data-tracking', JSON.stringify(data))
  }

  const getLocalData = () => {
    return JSON.parse(localStorage.getItem('data-tracking')) || []
  }

  const emptyLocalData = () => {
    localStorage.removeItem('data-tracking')
  }

  const pushLocalData = data => {
    const dataList = getLocalData()

    dataList.push(data)
    saveLocalData(dataList)

    return dataList
  }

  const postData = () => {
    const dataList = getLocalData()

    if (!dataList.length) {
      return
    }

    config.submitData(dataList).then(success => {
      if (success !== false) {
        emptyLocalData()
      }
    })
  }

  const saveData = async (attrData, eventType, option = {}) => {
    const data = await config.processData(
      {
        ...getGlobalData(),
        attrData,
      },
      {
        eventType,
        firstDateTime,
        eventDateTime: Date.now(),
        pathName: getPathName(),
        ...option,
      }
    )

    return pushLocalData(data)
  }

  const submitData = async (attrData, eventType, option = {}) => {
    const dataList = await saveData(attrData, eventType, option)

    if (!config.submitConditions(dataList)) {
      return
    }

    postData()
  }

  const handlePageLoad = async () => {
    const element = document.querySelector(`[${config.dataName.pageLoad}]`)

    if (!element) {
      return
    }

    const attrData = await getAttrData(element, config.dataName.pageLoad)

    // 异步加载数据，需要重新检测一遍属性是否还存在，防止多次执行
    if (!element.hasAttribute(config.dataName.pageLoad)) {
      return
    }

    element.removeAttribute(config.dataName.pageLoad)

    submitData(attrData, 'pageLoad', {
      element,
      dataIndex: 0,
    })
  }

  const handleElementClick = () => {
    document.addEventListener('click', async e => {
      const element = getBindElement(e.target, config.dataName.elementClick)

      if (!element) {
        return
      }

      const attrData = await getAttrData(element, config.dataName.elementClick)

      submitData(attrData, 'elementClick', {
        element,
        dataIndex: getElementIndex(element)
      })
    })
  }

  const handleElementView = () => {
    let elementTimers = []
    let timer = null
    const handleElementMove = (isAsync = true) => {
      const elements = Array.from(document.querySelectorAll(`[${config.dataName.elementView}]`))

      if (elements.length === 0) {
        return
      }

      for (let element of elements) {
        if (!hasElementClientRect(element)) {
          continue
        }

        // 截流
        if (elementTimers.find(item => item === element)) {
          continue
        }

        const elementIndex = elementTimers.push(element) - 1
        const checkElement = async () => {
          elementTimers.splice(elementIndex, 1)

          if (!element.hasAttribute(config.dataName.elementView)) {
            return
          }

          // 检测是否在可视区域，并且符合条件
          if (hasElementClientRect(element) && config.elementViewConditions(element)) {
            const attrData = await getAttrData(element, config.dataName.elementView)

            if (!element.hasAttribute(config.dataName.elementView)) {
              return
            }

            element.removeAttribute(config.dataName.elementView)

            submitData(attrData, 'elementView', {
              element,
              dataIndex: getElementIndex(element)
            })
          }
        }

        if (isAsync) {
          setTimeout(checkElement, 1200)
        } else {
          checkElement()
        }
      }
    }

    // m
    window.addEventListener('touchend', () => {
      setTimeout(handleElementMove, 100)
    })

    // pc
    window.addEventListener('wheel', () => {
      clearTimeout(timer)

      timer = setTimeout(() => {
        handleElementMove()
      }, 60)
    })

    return handleElementMove
  }

  const init = () => {
    let handleElementMove = () => { }

    const handlePageChange = () => {
      handlePageLoad()
      handleElementMove(false)
    }

    const handlePageComplete = () => {
      handlePageLoad()
      handleElementClick()

      // hashchange，需要重新检测页面加载和元素曝光
      handleElementMove = handleElementView()

      handleElementMove(false)

      // 解决异步渲染页面无法获取数据信息
      setInterval(() => {
        handlePageChange()
      }, 1200)
    }

    if (document.readyState === 'complete') {
      handlePageComplete()
      return
    }

    window.addEventListener('load', handlePageComplete)
  }

  init()

  return {
    submitData: postData,
    getDataList: getLocalData,
    pushData: saveData,
    emptyData: emptyLocalData,
  }
}

export default JsTracking
