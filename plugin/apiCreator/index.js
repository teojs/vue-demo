const fs = require('fs')
const path = require('path')
const format = require('prettier-eslint')
const formatConfig = {
  eslintConfig: {
    parserOptions: {
      ecmaVersion: 7,
    },
    rules: {
      semi: ['error', 'never'],
    },
  },
  fallbackPrettierOptions: {
    singleQuote: true,
  },
}
module.exports = () => {
  const apisPath = path.join(process.cwd(), 'src/service/apis')

  // 自动写入api路由
  const createApiRouter = () => {
    const apis = fs.readdirSync(apisPath)
    const routerPath = path.join(process.cwd(), 'src/service/apis.js')
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

    let importApi = `
      /* 此文件会自动生成，请勿修改 */
      import axios from './axios.config'
    `
    let exportsApi = ''
    apis.forEach(api => {
      api = api.replace('.js', '')
      let apiName = /^\d/.test(api)
        ? '_' + api.replace(/\./g, '')
        : api.replace(/\./g, '')
      importApi += `import ${apiName} from './apis/${api}'\n`
      exportsApi += `  ${apiName}: request(${apiName}),\n`
    })
    const file = `
      ${importApi}
      ${routerFn}
      const apis = {\n${exportsApi}}
      export default apis
    `
    // 格式化
    const formatFile = format({
      text: file,
      ...formatConfig,
    })
    fs.writeFileSync(routerPath, formatFile)
  }

  createApiRouter()

  fs.watch(apisPath, (eventType, filename) => {
    if (eventType === 'rename') {
      if (fs.existsSync(path.join(apisPath, filename))) {
        // 自动写入模板
        const file = fs.readFileSync(path.join(apisPath, filename), {
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
          fs.writeFileSync(path.join(apisPath, filename), formatTpl)
        }
      }
      createApiRouter()
    }
  })
}
