/**
 *
 * 获取README.md并在首页展示
 *
 * @param {object}   options
 * @param {object}   options.data      接口所需的参数
 * @param {function} options.success   请求成功后回调的方法
 * @param {function} options.fail      请求失败后回调的方法
 * @param {function} options.error     请求错误后回调的方法
 * @param {function} axios             异步请求的方法
 */
export default (options, axios) => {
  axios.get('/mock/README.md').then(e => {
    options.success(e)
    // if (e.code === '01') {
    //   options.success(e)
    // } else {
    //   options.fail(e)
    // }
  })
  // .catch(err => {
  //   options.error(err)
  // })
}
