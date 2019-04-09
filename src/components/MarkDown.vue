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

<style lang="less">
@import '~highlight.js/styles/github.css';
article {
  max-width: 960px;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  pre,
  code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
      monospace;
  }
}
</style>
