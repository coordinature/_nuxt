<template lang="pug">
nav.uk-navbar-container(uk-navbar='')
    .uk-navbar-item.uk-width-1-1
        form.uk-search.uk-search-navbar.uk-flex.uk-width-1-1
            span(uk-search-icon='').uk-padding-right
            // input.uk-search-input( type='search' placeholder='Search #tag')
            .uk-width-1-1.uk-flex-inline.uk-margin-large-left
                input.uk-margin-small-left.uk-inline.uk-form-blank.uk-input.uk-width-auto( v-for="item in items" :value="item")
                input.uk-inline.uk-form-blank.uk-input( placeholder='Add #tag' )
</template>
<script>

export default {
        name: 'tm-search',
        props: ['items']

}
</script>