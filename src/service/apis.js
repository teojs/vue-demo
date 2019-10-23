/* 此文件会自动生成，请勿修改 */

import axios from './axios.config'

const request = function(api) {
  return ctx => {
    ctx = {
      success() {},
      fail() {},
      error() {},
      ...ctx,
    }
    return api.bind(this)(ctx)
  }
}

// 自动注册/src/service/apis的所以接口

const apis = {}
const allApis = require.context('./apis', true, /\.js$/)
allApis.keys().forEach(key => {
  const path = key
    .match(/\.\/(.+?)\.js/)[1]
    .replace(/\//g, '.')
    .split('.')
  if (path.length === 1) {
    apis[path[0]] = request.bind(apis)(allApis(key).default)
  }
  if (path.length === 2) {
    apis[path[0]] = {}
    apis[path[0]][path[1]] = request.bind(apis)(allApis(key).default)
  }
})

apis.$http = axios
apis.$api = apis
// 可以在此处注册一些弹框组件

export default apis
