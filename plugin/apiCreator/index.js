const fs = require('fs')
const path = require('path')
module.exports = () => {
  const apisPath = path.join(process.cwd(), 'src/service/apis')

  // 自动写入api路由
  const createApiRouter = () => {
    const apis = fs.readdirSync(apisPath)
    const routerPath = path.join(process.cwd(), 'src/service/apis.js')
    const routerFn =
      'const request = api => {\n' +
      '  return options => {\n' +
      '    options = {\n' +
      '      success() {},\n' +
      '      fail() {},\n' +
      '      error() {},\n' +
      '      ...options,\n' +
      '    }\n' +
      '    return api(options, axios)\n' +
      '  }\n' +
      '}\n\n'
    let importApi =
      '/* 此文件会自动生成，请勿修改 */\n\n' +
      'import axios from \'./axios.config\'\n\n'
    let exportsApi = ''
    apis.forEach(api => {
      api = api.replace('.js', '')
      let apiName = /^\d/.test(api)
        ? '_' + api.replace(/\./g, '')
        : api.replace(/\./g, '')
      importApi += `import ${apiName} from './apis/${api}'\n`
      exportsApi += `  ${apiName}: request(${apiName}),\n`
    })
    const file = `${importApi}\n${routerFn}const apis = {\n${exportsApi}}\nexport default apis\n`
    fs.writeFileSync(routerPath, file)
  }

  createApiRouter()

  fs.watch(apisPath, (eventType, filename) => {
    if (eventType === 'rename') {
      if (fs.existsSync(path.join(apisPath, filename))) {
        // 自动写入模板
        const file = fs.readFileSync(path.join(apisPath, filename), {
          encoding: 'utf-8',
        })
        const template =
          'export default (options, axios) => {\n' +
          '  // 在此处校验传参 options.data\n' +
          '  axios\n' +
          '    .get(\'/api\')\n' +
          '    .then(e => {\n' +
          '      // 在此处封装请求结果\n' +
          '      if (e.code === \'01\') {\n' +
          '        options.success(e)\n' +
          '      } else {\n' +
          '        options.fail(e)\n' +
          '      }\n' +
          '    })\n' +
          '    .catch(err => {\n' +
          '      options.error(err)\n' +
          '    })\n' +
          '}\n'
        if (file === '') {
          fs.writeFileSync(path.join(apisPath, filename), template)
        }
      }
      createApiRouter()
    }
  })
}
