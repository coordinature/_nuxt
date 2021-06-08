<template lang="pug">
    .uk-card.uk-card-small.uk-width-xlarge.uk-width-1-1
        ul(uk-sortable).uk-list.uk-list-collapse
            li.uk-card(v-for="point in order")
                to-card(:answers="content[point]")
                to-card-input(:answers="content[point]")
</template>
<script>
export default {
    props: ['content', 'order']
}
</script>