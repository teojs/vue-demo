export default (options, axios) => {
  try {
    const { type } = options.data
    axios
      .get('/api/api/getMovie?type=' + type)
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
  } catch (error) {
    return options.fail({
      code: '02',
      message: '参数必传！',
    })
  }
}
