/* 此文件会自动生成，请勿修改 */
import axios from './axios.config'
import getReadme from './apis/getReadme'

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
  getReadme: request(getReadme),
}
export default apis
