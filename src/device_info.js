/**
 * 获取浏览器信息
 */

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

  const userAgent = navigator.userAgent.toLowerCase()
  const getVersion = matchFn => {
    const match = matchFn()

    return processFn => {
      return match ? processFn(match) : ''
    }
  }

  const Version = {
    IE: () => getVersion(() => userAgent.match(/(msie\s|trident.*rv:)([\w.]+)/))(res => res[2]),
    Chrome: () => getVersion(() => userAgent.match(/chrome\/([\d.]+)/))(res => res[1]),
    Firefox: () => getVersion(() => userAgent.match(/firefox\/([\d.]+)/))(res => res[1]),
    Opera: () => getVersion(() => userAgent.match(/opera\/([\d.]+)/))(res => res[1]),
    Safari: () => getVersion(() => userAgent.match(/version\/([\d.]+)/))(res => res[1]),
    Edge: () => getVersion(() => userAgent.match(/edge\/([\d.]+)/))(res => res[1]),
    QQBrowser: () => getVersion(() => userAgent.match(/qqbrowser\/([\d.]+)/))(res => res[1]),
  }

  result.version = Version[result.browser] ? Version[result.browser]() : ''

  return result
}

const getOsVersion = os => {
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

export default () => {
  const osInfo = getOs()

  return {
    ...osInfo,
    osVersion: getOsVersion(osInfo.os),
  }
}
