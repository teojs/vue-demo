import axios from 'axios'
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
axios.defaults.validateStatus = function(code) {
  return code >= 200 && status < 300
}
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else {
      return {
        code: response.status,
        message: response.statusText,
      }
    }
    // return Promise.reject(response)
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
