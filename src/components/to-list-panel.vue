<template lang="pug">
ul
    li(v-for="item in items") 
        nuxt-link(:to="item.path") {{ item.path }}
</template>
<script>
export default {
    props: ['items']
}
</script>
