<template lang="pug">
.uk-text-center(uk-grid='')
  .div(class='uk-width-expand')
    tm-search(:items="tags")
    .uk-card.uk-card-default
         tm-selectinput

    .uk-card.uk-card-primary text
    .uk-card.uk-card-default.uk-padding
        ul.uk-grid-small.uk-child-width-1-2(class='uk-child-width-1-3@s' uk-sortable='handle: .uk-card' uk-grid='')
            li
                simulation
            li
                tm-card
            li
                tm-card
            li
                tm-card
            li
                tm-card
            li
                tm-card


  .div(class='uk-width-1-3')
    .uk-card.uk-card-default.uk-card-body
        .uk-card-header
            tm-tab(uk-switcher="connect: .tm-switcher")
            ul.uk-switcher.tm-switcher
                li
                    .uk-card-title.uk-text-left 27 results 
                    p.uk-text-left gestures in Rotterdam with tags:
                li.tm-switcher
                    .uk-card-title.uk-text-left 10 saved
                    p.uk-text-left your saved reports:
        .uk-card-body.uk-text-left
            ul.uk-switcher.tm-switcher
                li
                    tm-list(:items="['hungry-report', 'food-report', 'I want food-repot']")
                li
                    tm-list(:items="['dance', 'tango', 'I dance the tango']")
            
        .uk-card-footer.uk-padding-small
            .uk-button.uk-button-default see full report


</template>
<script>

export default {
    data() {
        return {
            tags: [
                'hungry',
                'i want food',
                'eating'
            ]
        }
    }
}
</script>