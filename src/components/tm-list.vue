<template lang="pug">
ul.uk-list.uk-list-striped(uk-sortable='handle: .uk-card')
  li.uk-flex.uk-flex-between(v-for="item in items")
    span {{ item }}
    a.uk-icon-link.uk-margin-small-right(href='#' uk-icon='close')



</template>

<script>

export default {
  name: 'TmList',
  props: ['items']


}
</script>