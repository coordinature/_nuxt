<template lang="pug">
div
    img(:src="src").uk-height-medium.uk-width-auto
    figcaption.uk-text-meta.uk-margin-small-top {{ caption  }}
    // input.uk-input.uk-form-blank(v-model='caption' :placeholder="example")
</template>
<script>
export default {
    props: ['src', 'caption', 'example'],
    data() {
        return {
            newCaption: this.caption,
            newSrc: this.src
        }
    },
    watch: {
        caption(newCaption) {
            this.newCaption = newCaption
        }
    }

}
</script>