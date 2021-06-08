<template lang="pug">
div(uk-slider).uk-width-1-1
  ul.uk-slider-items(uk-grid)
    li(v-for='(item, i) in items' :key="i").uk-width-1-1
      
      // media(:media="item")
      to-img(:src="item.data" :caption="item.caption")
  ul.uk-slider-nav.uk-dotnav.uk-margin-bottom.uk-padding-small.uk-padding-remove-left
</template>
<script>
export default {
  props: {
    category: {
      type: Number,
      default: 9,
    },
    topic: {
      type: String,
      default: 'Knots',
    },
    items: {
      type: Array,
      default() {
        return [
          {
            id: 0,
            title: 'title',
            description: 'description',
            caption: 'caption',
            source_url: '/img/synchronicityblanket.jpg',
          },
        ]
      },
    },
  },
}
</script>
<style scope>
.p2 p {
  margin: 0;
}

.uk-padding-small {
  padding: 10px;
}
</style>
