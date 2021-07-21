<template lang="pug">
.uk-text-center(uk-grid='')
  .div(class='uk-width-expand')
    //.uk-card.uk-card-default.uk-card-body
    nav.uk-navbar-container(uk-navbar='')
            .uk-navbar-left
                .uk-navbar-item
                    form.uk-search.uk-search-navbar
                        span(uk-search-icon='')
                        input.uk-search-input(type='search' placeholder='Search')
    .uk-card.uk-card-default
        div.uk-flex.uk-flex-center
            div.uk-margin-right
                select.uk-select
                    option Option 01
                    option Option 02
            div.uk-margin-right
                select.uk-select
                    option Option 01
                    option Option 02
            div
                select.uk-select
                    option Option 01
                    option Option 02
    .uk-card.uk-card-primary text
    .uk-card.uk-card-default
        ul.uk-grid-small.uk-child-width-1-2(class='uk-child-width-1-3@s' uk-sortable='handle: .uk-card' uk-grid='')
            li
                tmcard
            li
                .uk-card.uk-card-default.uk-card-body.uk-text-center Item 3
            li
                .uk-card.uk-card-default.uk-card-body.uk-text-center Item 4
            li
                .uk-card.uk-card-default.uk-card-body.uk-text-center Item 5
            li
                .uk-card.uk-card-default.uk-card-body.uk-text-center Item 6
            li
                .uk-card.uk-card-default.uk-card-body.uk-text-center Item 7


  .div(class='uk-width-1-3')
    .uk-card.uk-card-default.uk-card-body 1-3


</template>
<script>

export default {

}
</script>