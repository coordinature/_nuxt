<template lang="pug">
nuxt-link(v-if="to" :to="to")
    slot
    | {{ name || slug }}
span(v-else) 
    slot
    | {{ name || slug }}
</template>
<script>
export default {
    props: ['to', 'name', 'slug']
}
</script>