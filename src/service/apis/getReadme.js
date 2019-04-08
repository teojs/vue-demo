export default (options, axios) => {
  axios
    .get('/mock/README.md')
    .then(e => {
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
