<template lang="pug">
nav.uk-navbar-container(uk-navbar='')
    .uk-navbar-left
        .uk-navbar-item
            form.uk-search.uk-search-navbar
                span(uk-search-icon='')
                input.uk-search-input(type='search' placeholder='Search #tag')
</template>
<script>

export default {
        name: 'tmsearch',

}
</script>