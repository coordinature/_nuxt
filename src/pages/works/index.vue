<template lang="pug">
div
  works-list(:works="works")
</template>
<script>
export default {
  data() {
    return {
      works: []
    }
  },
  async fetch() {
    const list = await this.$content('sitemap_backup').fetch()
    this.works = list.works
  }
}
</script>
