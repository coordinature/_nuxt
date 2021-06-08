<template lang="pug">
ul.uk-nav.uk-list
    li(v-for="(work, i) in works" :key="`${i}-${work.name}`")
      h1.uk-h2.uk-margin-small {{ work.name }}
      category-list(:categories="work.categories")
</template>
<style scoped>
.uk-margin-small {
  margin-bottom: 5px
}
</style>
<script>
export default {
  props: ['works'],
}
</script>
