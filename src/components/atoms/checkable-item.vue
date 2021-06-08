<template lang="pug">
.uk-inline
    a(v-if="icon" :uk-icon="`icon: ${icon}; ratio: 0.8`").uk-form-icon
    a(:uk-icon="`icon: ${selected ? 'check' : 'plus'}; ratio: 0.8`" @click="toggleChecked").uk-form-icon.uk-form-icon-flip
    input(v-model="value" :placeholder="'placeholder'" :disabled="disabled || true").uk-input.uk-form-small
</template>
<script>
export default {
    props: ['icon', 'text', 'disabled'],
    data() {
        return {
            value: this.text || null,
            active: false,
            selected: false,
            editable: false
        }
    },
    methods: {
        toggleChecked() {
            this.selected = !this.selected
            console.log(this.value, this.selected)
        },
    }
}
</script>