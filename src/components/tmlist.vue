<template lang="pug">
ul.uk-list.uk-list-striped(uk-sortable='handle: .uk-card')
  li #food
      a.uk-icon-link.uk-margin-small-right(href='#' uk-icon='close')
  li #hungry
        a.uk-icon-link.uk-margin-small-right(href='#' uk-icon='close')
  li #iwantfood
        a.uk-icon-link.uk-margin-small-right(href='#' uk-icon='close')



</template>

<script>

export default {
        name: 'Tmlist',

}
</script>