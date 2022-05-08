/*
 * @Author: xuxueliang
 * @Date: 2020-01-17 12:17:51
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-12-22 17:29:06
 */
import axios from 'axios'
import qs from 'qs'
import getApiSig, { setSigerConfig } from '@lib/siger'
import Toast from '@lib/plugins/Sloth/Toast/'
import { setCookie, getCookie, delCookie } from '@lib/common/config/mUtils'
// import getParam from '@lib/plugins/Sloth/getParam'
import onlineToTest from '@lib/common/config/onLinetoTest.js'
import { isIOS, urlParam } from '@lib/eryuSdk'
import { commonParams, isDev } from '@config'
import Vue from 'vue'
// let urlParam = getParam()
// import { Indicator, Toast } from 'mint-ui' 没有试用mintUi
// import 'mint-ui/lib/style.css'
const { deviceOs } = urlParam
const appConfig = {
  deviceOs: deviceOs || (isIOS ? 'iOS' : 'Android')
}
Vue.prototype.$ajax = axios
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
// 更新签名
setSigerConfig({
  // API_SIG_SUFIX: 'sufix-bb1'
  // API_SIG_VERSION: 'version-bb2'
  // API_SIG_POSSTR: 'pos--bb3'
})
// 设置Id
if (urlParam.uId) {
  console.log('getCookie-old-uId-->', getCookie('uId'))
  console.log('urlParam-uId-->', urlParam.uId)
  setCookie('uId', urlParam.uId)
  console.log('setCookie-new-uId-->', getCookie('uId'))
}
if (urlParam.yUId) {
  let oldYUId = getCookie('yUId') && getCookie('yUId').toString()
  let newYUId = urlParam.yUId && urlParam.yUId.toString()
  console.log('getCookie-old-yUId-->', oldYUId)
  console.log('urlParam-yUId-->', newYUId)
  if (oldYUId && newYUId && oldYUId !== newYUId) {
    console.log('new !== old-->', oldYUId, newYUId)
    delCookie('yUId')
    setCookie('yUId', urlParam.yUId)
    console.log('setCookie-new-yUId-->', getCookie('yUId'))
  }
  if (!oldYUId && newYUId) {
    console.log('old not defind-->', oldYUId, newYUId)
    setCookie('yUId', urlParam.yUId)
    console.log('setCookie-new-yUId-->', getCookie('yUId'))
  }
}
let uId = null
let yUId = null
// 获取id
// getUId().then((res) => {
//   uId = res.uId || ''
// })
// getUId('yUId').then((res) => {
//   yUId = res.yUId || ''
// })
axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.data = config.data || {}
      if (yUId) {
        config.data.yUId = yUId
      }
      if (uId) {
        config.data.uId = uId
      }
      Object.assign(config.data, appConfig, commonParams)
      config.data.ts = parseInt(+new Date() / 1000)
      config.data.sig = getApiSig(config.data || {})
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error) => {
    // Toast({
    //   message: '加载超时',
    //   position: 'middle',
    //   duration: 3000
    // })
    // Toast.showShortCenter('加载超时', '', 3000)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (res) => {
    // Indicator.close()
    if (res.data && res.data.error.errno === 200) {
      return res.data
    }
    return Promise.reject(res.data)
  },
  (error) => {
    console.log('好多人在访问呀，请重新试试[timeout]')
    // Indicator.close()
    if (error) {
      let errortime = null
      clearTimeout(errortime)
      errortime = setTimeout(() => {
        // Toast({
        //   message: error.message,
        //   position: 'middle',
        //   duration: 2000
        // })
        // Toast.showShortCenter('网络断开，请稍后再试', '', 2000)
        clearTimeout(errortime)
      }, 0)
    }
    return Promise.reject(error)
  }
)
const basePost = (api, param = {}) => {
  if (param.__ISTEST__) {
    // 参数中有 __ISTEST__ 属性即是打算走测试接口；当是开发环境时 或者 浏览器地址含有 __ISTEST__ 属性时； 走测试接口
    if (
      process.env.NODE_ENV === 'development' ||
      window.location.href.indexOf('__ISTEST__') > -1
    ) {
      api = 'https://192.168.2.175/getApi?domain=ey&api=' + api
    }
    delete param.__ISTEST__
  }
  if (!isDev || window.location.href.indexOf('__production__') > -1) {
    // 如果是生产环境，则走正常接口
    api =
      `http://helloHttpService-handleHTTPEvent2.midway-http.1775201834160782.cn-beijing.fc.devsapp.net` +
      api
  }
  return axios.post(api, param).catch(handlError)
}
const handlError = (data) => {
  data && data.error && data.error.usermsg && Toast.center(data.error.usermsg)
}
onlineToTest(basePost)
export default basePost
