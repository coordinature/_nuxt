<template lang="pug">
nav(uk-navbar)
    div.uk-navbar-left
        a.uk-navbar-item.uk-logo
            h1.uk-h1.uk-margin-remove {{ title }}
        list(:items="routes").uk-navbar-nav
    // div.uk-navbar-right
        list.uk-navbar-nav

</template>
<script>
export default {
    props: [
        'title',
        'routes'
    ]
}
</script>