<template lang="pug">
div
  ul(v-if="category").uk-list
    li(v-for="article in category.children")
      page(:product="article")
</template>
<script>
export default {
  computed: {
    category() {
      const places = this.$store.state.places
      if (places && places.length > 0) {
        return places.find(
          (place) => place.title === this.$route.params.category
        )
      } else {
        return null
      }
    },
  }
}
</script>
