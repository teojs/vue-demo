const fs = require('fs')
const path = require('path')
const format = require('prettier-eslint')
const formatConfig = {
  filePath: path.join(process.cwd(), '.eslintrc.js'),
}

module.exports = () => {
  const apisDir = path.join(process.cwd(), 'src/service/apis')

  // 自动写入模板方法
  const writeTpl = filePath => {
    setTimeout(() => {
      const file = fs.readFileSync(filePath, {
        encoding: 'utf-8',
      })
      const template = `
      /**
       * 接口说明...
       */
      export default function(ctx) {
        this.$http({
          method: 'post',
          url: '/api',
          // params: ctx.data,
          data: ctx.data,
        }).then(e => {
          if (e.code === '01') {
            return ctx.success(e.body)
          }
          ctx.fail(e.message)
        })
      }
    `
      if (file === '') {
        const formatTpl = format({
          text: template,
          ...formatConfig,
        })
        fs.writeFileSync(filePath, formatTpl)
      }
    }, 1000)
  }

  // // 初始化路由

  if (process.env.NODE_ENV === 'development') {
    // 只有在开发环境时 监听文件的变化并自动写入模板和初始化路由
    fs.watch(apisDir, { recursive: true }, (eventType, filename) => {
      const filePath = path.join(apisDir, filename)
      if (eventType === 'rename') {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          writeTpl(filePath)
        }
      }
    })
  }
}
