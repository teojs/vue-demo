/* 此文件会自动生成，请勿修改 */

import axios from './axios.config'

const request = api => {
  return options => {
    options = {
      success() {},
      fail() {},
      error() {},
      ...options,
    }
    return api(options, axios)
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
    apis[path[0]] = request(allApis(key).default)
  }
  if (path.length === 2) {
    apis[path[0]] = {}
    apis[path[0]][path[1]] = request(allApis(key).default)
  }
})

export default apis
