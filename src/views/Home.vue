<template>
  <div class="home">
    <router-link to="/readme">README.md</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {},
  data() {
    return {
      article: '',
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
}
</style>
