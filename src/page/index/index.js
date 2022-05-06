/*
 * @Author: zhengguozhi
 * @Date: 2020-06-08 17:55:08
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2021-06-04 21:30:46
 */
import Vue from 'vue'
import app from './app'
import '@config/common'
import Vant from 'vant'
// import 'vant/lib/index.css'

Vue.use(Vant)
// import '@lib/plugins/markdown/md.css'
// import { toApp } from '@lib/eryuSdk'

// 阻止默认的处理方式(阻止下拉滑动的效果)
// document.body.addEventListener('touchmove', function (e) {
//   e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
// }, { passive: false }) // passive 参数不能省略，用来兼容ios和android

// 点击body关闭页面
// document.body.addEventListener('click', () => {
//   console.log('goBack-->')
//   toApp({ type: 'goBack' })
// }, false)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  mounted: () => {},
  template: '<app/>',
  components: {
    app
  }
})
