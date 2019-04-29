const fs = require('fs')
const path = require('path')
const format = require('prettier-eslint')
const formatConfig = {
  filePath: path.join(process.cwd(), '.eslintrc.js'),
}

module.exports = () => {
  const apisDir = path.join(process.cwd(), 'src/service/apis')
  const routerFile = path.join(process.cwd(), 'src/service/apis.js')

  // 接口封装
  const routerFn = `
  const request = api => {
    return options => {
      options = {
        success() {},
        fail() {},
        error() {},
        ...options,
      }
      return api(options, axios)
    }
  }
  `

  // 自动写入api路由方法
  const initApiRouter = () => {
    let importApi = `
    /* 此文件会自动生成，请勿修改 */

    import axios from './axios.config'

    `
    const apiRouters = {}

    const createApiRouters = (apisDir, parent) => {
      const apis = fs.readdirSync(apisDir)
      apis.forEach(api => {
        let apiName = api.replace('.js', '')
        apiName = /^\d/.test(apiName)
          ? '_' + apiName.replace(/\./g, '')
          : apiName.replace(/\./g, '')
        const apiPath = path.join(apisDir, api)
        if (fs.existsSync(apiPath)) {
          if (
            fs.statSync(apiPath).isFile() &&
            path.extname(apiPath) === '.js'
          ) {
            if (parent) {
              importApi += `import ${parent +
                apiName} from './apis/${parent}/${api.replace('.js', '')}'\n`
              apiRouters[parent][apiName] = `request(${parent + apiName})`
            } else {
              importApi += `import ${apiName} from './apis/${api.replace(
                '.js',
                ''
              )}'\n`
              apiRouters[apiName] = `request(${apiName})`
            }
          }
          if (fs.statSync(apiPath).isDirectory()) {
            apiRouters[apiName] = {}
            createApiRouters(apiPath, apiName)
          }
        }
      })
    }
    createApiRouters(apisDir)

    const file = `
      ${importApi}
      ${routerFn}
      const apis = ${JSON.stringify(apiRouters).replace(/"/g, '')}
      export default apis
    `
    const formatFile = format({
      text: file,
      ...formatConfig,
    })
    fs.writeFileSync(routerFile, formatFile)
  }

  // 自动写入模板方法
  const writeTpl = filePath => {
    const file = fs.readFileSync(filePath, {
      encoding: 'utf-8',
    })
    const template = `
      /**
       * 此处可以写一些接口说明
       */
      export default (options, axios) => {
        // 在此处校验传参 options.data
        axios
          .get('/api')
          .then(e => {
            // 在此处封装请求结果
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
    `
    if (file === '') {
      const formatTpl = format({
        text: template,
        ...formatConfig,
      })
      fs.writeFileSync(filePath, formatTpl)
    }
  }

  // 初始化路由
  initApiRouter()

  if (process.env.NODE_ENV === 'development') {
    // 只有在开发环境时 监听文件的变化并自动写入模板和初始化路由
    fs.watch(apisDir, { recursive: true }, (eventType, filename) => {
      const filePath = path.join(apisDir, filename)
      if (eventType === 'rename') {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          writeTpl(filePath)
        }
        initApiRouter()
      }
    })
  }
}
