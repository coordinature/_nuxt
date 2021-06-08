<template lang="pug">
     nuxt-link(:to="path")
        span {{ name }}
</template>
<script>
export default {
    props: [
        'path',
        'name'
    ]
}
</script>