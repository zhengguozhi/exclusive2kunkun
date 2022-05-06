/*
 * @Author: zhengguozhi
 * @Date: 2020-06-08 17:55:09
 * @LastEditors: zhengguozhi
 * @LastEditTime: 2020-07-29 17:52:44
 */
import basePost from './http'
// import domains from './domains'
/* eslint-disable */
export const initHttp = (param = {}) => basePost('/sys/init', param)
export const statusHttp = (param = {}) => basePost('/activity/status', param) // 活动状态
export const payinitHttp = (param = {}) => basePost('/activity/payinit', param) // 领取初始化
export const payrewardHttp = (param = {}) => basePost('/activity/payreward', param) // 领取
export const gaintopHttp = (param = {}) => basePost('/activity/gaintop', param) // 主播榜
export const donatetopHttp = (param = {}) => basePost('/activity/donatetop', param) // 富豪榜
export const gaintopcommonHttp = (param = {}) => basePost('/activity/gaintopcommon', param) // 日常主播榜

// 告白 start
export const gaobaitopHttp = (param = {}) => basePost('/activity/gaobaitop', param)
export const gaobailikeHttp = (param = {}) => basePost('/activity/gaobailike', param)
export const gaobaisearchHttp = (param = {}) => basePost('/activity/gaobaisearch', param)
export const queryuserHttp = (param = {}) => basePost('/zshare/queryuser', param)
export const gaobaiaddHttp = (param = {}) => basePost('/activity/gaobaiadd', param)
export const gaobaitomeHttp = (param = {}) => basePost('/activity/gaobaitome', param)
export const gaobaimyHttp = (param = {}) => basePost('/activity/gaobaimy', param)
// 告白 end

