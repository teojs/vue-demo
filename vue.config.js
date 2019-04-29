const { proxy } = require('./local.config')

module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy,
  },
}
