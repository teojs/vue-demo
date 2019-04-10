const fs = require('fs')
const path = require('path')
module.exports = () => {
  const views = path.join(process.cwd(), 'src/views')

  fs.watch(views, { recursive: true }, (eventType, filename) => {
    if (
      eventType === 'rename' &&
      fs.existsSync(path.join(views, filename)) &&
      fs.statSync(path.join(views, filename)).isFile()
    ) {
      // 自动写入模板
      const file = fs.readFileSync(path.join(views, filename), {
        encoding: 'utf-8',
      })
      const template = fs.readFileSync(
        path.join(process.cwd(), 'plugin/vueCreator/tpl.vue'),
        {
          encoding: 'utf-8',
        }
      )
      if (file === '') {
        fs.writeFileSync(
          path.join(views, filename),
          template.replace(
            'component name here',
            filename
              .replace('.vue', '')
              .replace('\\', '-')
              .replace('/', '-')
          )
        )
      }
    }
  })
}
