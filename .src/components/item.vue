<template lang="pug">
ul.uk-list
    li(v-for="(value, property) in item")
        span(v-if="typeof value === 'string'") {{ value }}
</template>
<script>
export default {
    props: {
        item: Object
    }
}
</script>