(function() {
  const getDeviceInfo = () => {
    const getOs = () => {
      const getMatchMap = u => {
        return {
          // 内核
          'Trident': u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
          'Presto': u.indexOf('Presto') > -1,
          'WebKit': u.indexOf('AppleWebKit') > -1,
          'Gecko': u.indexOf('Gecko/') > -1,
          // 浏览器
          'Safari': u.indexOf('Safari') > -1,
          'Chrome': u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
          'IE': u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
          'Edge': u.indexOf('Edge') > -1,
          'Firefox': u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
          'Firefox Focus': u.indexOf('Focus') > -1,
          'Chromium': u.indexOf('Chromium') > -1,
          'Opera': u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
          'Vivaldi': u.indexOf('Vivaldi') > -1,
          'Yandex': u.indexOf('YaBrowser') > -1,
          'Arora': u.indexOf('Arora') > -1,
          'Lunascape': u.indexOf('Lunascape') > -1,
          'QupZilla': u.indexOf('QupZilla') > -1,
          'Coc Coc': u.indexOf('coc_coc_browser') > -1,
          'Kindle': u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
          'Iceweasel': u.indexOf('Iceweasel') > -1,
          'Konqueror': u.indexOf('Konqueror') > -1,
          'Iceape': u.indexOf('Iceape') > -1,
          'SeaMonkey': u.indexOf('SeaMonkey') > -1,
          'Epiphany': u.indexOf('Epiphany') > -1,
          '360': u.indexOf('QihooBrowser') > -1 || u.indexOf('QHBrowser') > -1,
          '360EE': u.indexOf('360EE') > -1,
          '360SE': u.indexOf('360SE') > -1,
          'UC': u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
          'QQBrowser': u.indexOf('QQBrowser') > -1,
          'QQ': u.indexOf('QQ/') > -1,
          'Baidu': u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
          'Maxthon': u.indexOf('Maxthon') > -1,
          'Sogou': u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
          'LBBROWSER': u.indexOf('LBBROWSER') > -1,
          '2345Explorer': u.indexOf('2345Explorer') > -1,
          'TheWorld': u.indexOf('TheWorld') > -1,
          'XiaoMi': u.indexOf('MiuiBrowser') > -1,
          'Quark': u.indexOf('Quark') > -1,
          'Qiyu': u.indexOf('Qiyu') > -1,
          'Wechat': u.indexOf('MicroMessenger') > -1,
          'WechatWork': u.indexOf('wxwork/') > -1,
          'Taobao': u.indexOf('AliApp(TB') > -1,
          'Alipay': u.indexOf('AliApp(AP') > -1,
          'Weibo': u.indexOf('Weibo') > -1,
          'Douban': u.indexOf('com.douban.frodo') > -1,
          'Suning': u.indexOf('SNEBUY-APP') > -1,
          'iQiYi': u.indexOf('IqiyiApp') > -1,
          // 系统或平台
          'Windows': u.indexOf('Windows') > -1,
          'Linux': u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
          'Mac OS': u.indexOf('Macintosh') > -1,
          'Android': u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
          'Ubuntu': u.indexOf('Ubuntu') > -1,
          'FreeBSD': u.indexOf('FreeBSD') > -1,
          'Debian': u.indexOf('Debian') > -1,
          'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
          'BlackBerry': u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
          'MeeGo': u.indexOf('MeeGo') > -1,
          'Symbian': u.indexOf('Symbian') > -1,
          'iOS': u.indexOf('like Mac OS X') > -1,
          'Chrome OS': u.indexOf('CrOS') > -1,
          'WebOS': u.indexOf('hpwOS') > -1,
          // 设备
          'Mobile': u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
          'Tablet': u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
          'iPad': u.indexOf('iPad') > -1
        }
      }
  
      const match = getMatchMap(navigator.userAgent)
      const infoMap = {
        engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
        browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', , 'WechatWork', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
        os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
        device: ['Mobile', 'Tablet', 'iPad']
      }
      const result = {}
  
      for (let s in infoMap) {
        for (let i = 0; i < infoMap[s].length; i++) {
          const value = infoMap[s][i]
  
          if (match[value]) {
            result[s] = value
          }
        }
      }
  
      return result
    }
  
    const getVersion = os => {
      const u = navigator.userAgent
      const osVersion = {
        'Windows': function () {
          var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1')
          var oldWindowsVersionMap = {
            '6.4': '10',
            '6.3': '8.1',
            '6.2': '8',
            '6.1': '7',
            '6.0': 'Vista',
            '5.2': 'XP',
            '5.1': 'XP',
            '5.0': '2000'
          }
          return oldWindowsVersionMap[v] || v
        },
        'Android': function () {
          return u.replace(/^.*Android ([\d.]+);.*$/, '$1')
        },
        'iOS': function () {
          return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
        },
        'Debian': function () {
          return u.replace(/^.*Debian\/([\d.]+).*$/, '$1')
        },
        'Windows Phone': function () {
          return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
        },
        'Mac OS': function () {
          return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.')
        },
        'WebOS': function () {
          return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
        }
      }
      let version = ''
  
      if (osVersion[os]) {
        version = osVersion[os]()
  
        if (version == u) {
          version = ''
        }
      }
  
      return version
    }
  
    const osInfo = getOs()
  
    return {
      ...osInfo,
      version: getVersion(osInfo.os),
    }
  }
  
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

  if (typeof module === 'undefined') {
    window.JsTracking = JsTracking
  } else {
    module.exports = JsTracking
  }
}());
