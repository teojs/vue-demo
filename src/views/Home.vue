<template>
  <div class="home">
    <h1>你好，世界</h1>
    <hello-world :msg="msg" />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {},
  data() {
    return {
      msg: '',
    }
  },
  mounted() {
    this.getHelloWorld()
  },
  methods: {
    getHelloWorld() {
      this.$api.helloWorld({
        success: e => {
          this.msg = e
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  h1 {
    font-size: 100px;
  }
}
</style>
