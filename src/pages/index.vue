<template lang="pug">
 .uk-height-viewport.uk-flex.uk-flex-middle.uk-flex-center 
    button.uk-button.uk-button-default.uk-border-pill  {{ hostname }}
</template>

<script>
export default {


    data() {
        return {
            hostname: null
        }
    },
    mounted() {
        this.hostname = window.location.hostname
        
    }
}
</script>