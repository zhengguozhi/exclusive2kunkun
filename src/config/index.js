/*
 * @Author: zhengguozhi
 * @Date: 2018-12-13 17:49:21
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2021-06-04 18:34:24
 */
// let apVersion = '2.7.0'
// export const commonParams = {
//   appName: 'xcx_xsb',
//   deviceOs: window.platform.toLowerCase().search('ios') >= 0 ? 'iOS' : 'Android',
//   deviceOp: window.system.split(' ')[1],
//   appVersion: apVersion,
//   apiVersion: apVersion,
//   // channel: 'main',
//   netType: 'WLAN',
//   deviceType: window.model
// }
import { belong } from '@app/project'
export const commonParams = {
  // act: 'annual'
}

export const assetsUrl = 'http://pws.myhug.cn'
export const assetsPrefix = 'http://pws.myhug.cn/npic/w/9/'
export const isDev = process.env.NODE_ENV === 'development'
export const ERR_OK = 200
export const belongEy = belong === 'ey'
