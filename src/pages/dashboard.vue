<template lang="pug">
.uk-text-center(uk-grid='')
  .div(class='uk-width-expand')
    tmsearch
    .uk-card.uk-card-default
        tmselectinput
    .uk-card.uk-card-primary text
    .uk-card.uk-card-default.uk-padding
        ul.uk-grid-small.uk-child-width-1-2(class='uk-child-width-1-3@s' uk-sortable='handle: .uk-card' uk-grid='')
            li
                tmcard
            li
                tmcard
            li
                tmcard
            li
                tmcard
            li
                tmcard
            li
                tmcard


  .div(class='uk-width-1-3')
    .uk-card.uk-card-default.uk-card-body
        .uk-card-header
            tmtab
            .uk-card-title.uk-text-left 27 results 
            p.uk-text-left gestures in Rotterdam with tags:
        .uk-card-body.uk-text-left
            tmlist
        .uk-card-footer.uk-padding-small
            .uk-button.uk-button-default see full report


</template>
<script>

export default {

}
</script>