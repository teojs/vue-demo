export default (options, axios) => {
  axios
    .get('/api/api/getMovie?type=' + options.data.type)
    .then(e => {
      if (e.code === '01') {
        options.success(e)
      } else {
        options.fail(e)
      }
    })
    .catch(err => {
      options.error(err)
    })
}
