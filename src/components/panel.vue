<template lang="pug">
.uk-panel
    div(v-if="expand").uk-container-expand
        slot
    div(v-else).uk-container
        slot
</template>
<script>
export default {
    props: ['expand'],
    data() {
        return {
            items: []
        }
    },
    methods: {
        addItem(classname) {
            const found = this.items.find((item) => item === classname );
            found ? console.log('already exists') : this.wrappers = [ ...this.items, item ]
        }
    }
}
</script>