module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: '8000',
    proxy: {
      '/api': {
        target: 'http://172.16.1.74:9001',
        changeOrigin: true,
        pathRewrite: {
          '/api': 'http://172.16.1.74:9001',
        },
      },
    },
  },
}
