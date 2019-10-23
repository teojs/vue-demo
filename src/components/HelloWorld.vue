<template>
  <h1>{{msg}}</h1>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {}
  },
  props: {
    msg: String,
  },
}
</script>

<style lang="less" scoped>
h1 {
  font-size: 100px;
}
</style>
