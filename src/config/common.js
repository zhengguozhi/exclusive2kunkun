/*
 * @Author: xuxueliang
 * @Date: 2019-11-20 18:07:41
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2021-06-04 17:31:11
 */
import { loadVConsole } from '@lib/common/config/mUtils' // 引入vconsole
// import Toast from '@lib/plugins/Sloth/Toast'
import { belong, sw } from '@app/project'
import { setUrl } from '@lib/common/config/toTestGesture/fn' // 引入设置跳转测试地址url
import toTestGesture from '@lib/common/config/toTestGesture' // 引入滑动调试手势
// import { setQueryFlag } from '@lib/eryuSdk' // 引入获取参数方式
require('@lib/common/stylus/index.styl')
require('@lib/common/config/flexible.js')
if (sw) {
  require('@lib/common/config/sw/registerServiceWorker.js') // 引入sw
}
require('@lib/common/config/fixIphoneXviewport.js') // 兼容iphoneX+底部安全区留白
// setQueryFlag('#') // 获取参数方式为#
toTestGesture(document.body) // 启用滑动调试手势
// 浏览器地址包含 __ISCONSOLE__ 即打开调试
if (window.location.href.indexOf('__ISCONSOLE__') > -1) {
  loadVConsole() // 暂行
}
window.logs = []
// 重写console.log方法 非开发环境，测试环境不打印log
if (process.env.NODE_ENV !== 'development' && window.location.href.indexOf('__ISCONSOLE__') < 0) {
  window.logs = []
  console.log = (function (oriLogFunc) {
    return function () {
      window.logs.push(arguments)
      // oriLogFunc.apply(console, arguments)
    }
  })(console.log)
}
// 检测hdc更新
window.__hdc__checkUpdate && window.__hdc__checkUpdate(function (isOld) {
  if (isOld) {
    // Toast.center('页面数据已更新即将刷新')
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
})
if (belong === 'baobao') {
  console.log('setUrl-->', belong)
  setUrl({ test: window.location.href.replace('wap/', 'wap/h5Test/') }) // 设置跳转测试地址url
}
