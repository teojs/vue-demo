<template>
  <article v-html="article"></article>
</template>

<script>
import hljs from 'highlight.js'
export default {
  name: 'MarkDown',
  data() {
    return {}
  },
  props: {
    article: String,
  },
  mounted() {},
  methods: {},
  updated() {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block)
    })
  },
}
</script>

<style scoped lang="less">
@import '~highlight.js/styles/default.css';
article {
  max-width: 960px;
  margin: auto;
}
</style>
