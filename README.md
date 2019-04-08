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
