<template>
  <div class="home">
    <MarkDown :article="article" />
  </div>
</template>

<script>
// @ is an alias to /src
import MarkDown from '@/components/MarkDown.vue'
import marked from 'marked'
export default {
  name: 'home',
  components: {
    MarkDown,
  },
  data() {
    return {
      article: '',
    }
  },
  mounted() {
    this.getReadme()
  },
  methods: {
    getReadme() {
      this.$api.getReadme({
        success: e => {
          this.article = marked(e)
        },
        fail: e => {
          console.log(e)
        },
      })
    },
  },
}
</script>
