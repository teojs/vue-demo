module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.16.1.77:8020',
        changeOrigin: true,
        pathRewrite: {
          '/api': 'http://172.16.1.77:8020',
        },
      },
    },
  },
}
