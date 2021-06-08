<template lang="pug">
.uk-inline.uk-width-1-1
    a(v-if="icon" :uk-icon="`icon: ${icon}; ratio: 0.8`").uk-form-icon
    a(v-show="selected" :uk-icon="`icon: check; ratio: 0.8`" @click="toggleChecked").uk-form-icon.uk-form-icon-flip
    a(v-show="!selected" :uk-icon="`icon: plus-circle; ratio: 0.8`" @click="toggleChecked").uk-form-icon.uk-form-icon-flip
    input(v-model="value" :placeholder="'placeholder'" :disabled="disabled || false").uk-input.uk-text-meta.uk-form-blank.uk-width-1-1
</template>
<script>
export default {
    props: ['icon', 'text', 'background', 'disabled', 'callback'],
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
           
            const change = {
                value: this.value,
                selected: this.selected
            }

            if( this.callback ) {
                this.callback(change)
                this.selected = !this.selected
            } else {
                console.log('no callback for this:', change)
            }
           
            
        },
    }
}
</script>