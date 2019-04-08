module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.teoxu.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': 'http://api.teoxu.cn',
        },
      },
    },
  },
}
