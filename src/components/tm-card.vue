<template lang="pug">
div
    .uk-card.uk-card-default
        .uk-card-header.uk-padding-remove
            div.uk-grid-small.uk-flex-middle(uk-grid='')
                div
                    img.uk-border-circle(width='40' height='40' src='/img/avatar.jpg')
                div.uk-width-expand
                    h3.uk-card-title.uk-margin-remove-bottom.uk-text-left Graph title
                    p.uk-text-meta.uk-margin-remove-top.uk-text-left
                        time(datetime='2021-08-01T19:00') 01-08-2021
                input.uk-checkbox.uk-flex-between(type='checkbox' checked='')
        .uk-card-body.uk-padding-remove.uk-margin-top
                .uk-card-media-top
                    img(src='/img/chart.jpg' alt='')
        .uk-card-footer.uk-padding-small
            p.uk-text-meta.uk-text-left
                | short graph description
            //a.uk-button.uk-button-text(href='#') Read more
</template>

<script>

export default {
        name: 'Tmcard',

}
</script>