/* 此文件会自动生产，请勿修改 */

import axios from './axios.config'

import testApi from './apis/testApi'
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

const apis = {
  testApi: request(testApi),
}
export default apis
