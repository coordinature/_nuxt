<template lang="pug">
.uk-card.uk-card-default(class='uk-width-1-2@m')
    .uk-card-header                        
        div.uk-grid-small.uk-flex-middle(uk-grid='')
            div.uk-width-auto
                img.uk-border-circle(width='40' height='40' src='/img/chart.jpg')
            div.uk-width-expand
                h3.uk-card-title.uk-margin-remove-bottom Title
                p.uk-text-meta.uk-margin-remove-top
                    time(datetime='2016-04-01T19:00') April 01, 2016
            input.uk-checkbox.uk-flex-between(type='checkbox' checked='')
        .uk-card-body
            .uk-card-media-top
                img(src='/img/chart.jpg' alt='')
                p
                | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        .uk-card-footer
            a.uk-button.uk-button-text(href='#') Read more
</template>

<script>
export default {
    name: 'Tmcard',
}
</script>