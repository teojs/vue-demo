# vue-demo

## 安装依赖

```
npm install
```

### 热重启本地开发

```
npm run serve
```

### 打包到生产环境

```
npm run build
```

### 代码修复

```
npm run lint
```

### (mark) 去除 git 提交时 eslint fix 功能

> 如果要在提交时执行 eslint fix 命令，可以在 package.json 加入这段代码

```json
// package.json
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,vue}": ["vue-cli-service lint", "git add"]
  }
}
```

### 代码结构说明

```bash
vue-project
├─ vue.config.js           # 一些vue-cli配置
├─ dist                    # 打包后的代码，用于发布到生产环境
├─ plugin                  # 一些vue-cli3自动化插件
│  ├─ apiCreator           # 自动创建api引用
│  └─ vueCreator           # 创建.vue文件时自动写入模板
├─ public                  # 静态资源
└─ src                     # 主代码目录
   ├─ App.vue              # vue主页面
   ├─ main.js
   ├─ router.js            # 路由配置
   ├─ store.js             # vuex状态管理
   ├─ assets               # 存放资源的目录，图片什么的
   ├─ components           # 组件
   ├─ service              # api分离后存放的目录
   │  ├─ apis.js           # api接口暴露
   │  ├─ axios.config.js   # 请求配置
   │  └─ apis              # api文件目录
   ├─ utils                # 一些可重复利用的方法
   └─ views                # vue页面目录
```
