<template lang="pug">
div.uk-padding-remove-right.uk-flex-left
  nuxt-link(to="/works/" style=" cursor: pointer" )
    img(:src="`https://dbaumann.ams3.digitaloceanspaces.com/images/${leaf}`" alt='' 
      :class="`uk-height-${$mq}`"
    ).uk-card.uk-card-hover
    p synchronicity blanket | 130x80cm | 2016
</template>
<style scoped>
.uk-height-sm {
  width: 100%;
  height: auto;
}

.uk-height-md {
  height: 420px;
  width: auto;
}

.uk-height-lg,
.uk-height-xl {
  height: 520px;
  width: auto;
}
</style>
<script>
export default {
  data() {
    return {
      leaf: 'synchronicity-blanket.jpg',
    }
  },
}
</script>
