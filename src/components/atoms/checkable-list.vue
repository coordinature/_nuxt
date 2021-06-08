<template lang="pug">
ul(
    :uk-sortable="sortable"
    ).uk-list
    li(v-for="item in items")
        checkable-item(:text="item" @toggled="handleToggle")
</template>
<script>
export default {
    props: ['items', 'sortable'],
    data() {
        return {
            selected: [],
        }
    },
    methods: {
        handleToggle({ id, state }) {
            console.log(id, state)
        }
    }
}
</script>