<template lang="pug">
div
    ul.uk-list
        li(v-for="(item, key) in items")
            item(:item="item").uk-height-small.uk-width-small
</template>
<script>
export default {
    props: { 
       title: String,
       description: String,
       items: Array|Object,
    },
    data() {
        return {
            list: []
        }
    },
    mounted() {
        console.log(Object.values(this.items))
    },
    watch: {

    }
}
</script>