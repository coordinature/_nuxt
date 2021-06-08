<template lang="pug">
div 
    slot
</template>
<script>
export default {
    data () {
        return {
            domain: '',
            values: [],
            viewer: {},
            storage: {},
            clipboard: {},
            connection: {},
            toggle: {
                viewable: false,
                assistance: false,
            }
        }
    },
    created() {

        this.domain = window.location
        this.clipboard = window.navigator.clipboard
        this.connection = window.navigator.connection
        this.storage = window.localStorage
        this.viewer = {
            ...window.screen,
            size: {
                heightOuter: window.outerHeight,
                widthOuter: window.outerWidth,
                heightInner: window.innerHeight,
                widthInner: window.innerWidth,
                
            },
            ratio: {
                pixel: window.devicePixelRatio,
                diagonal: window.innerWidth / window.innerHeight
            },

        }
        this.browser ={
            platform: window.navigator.platform,
            version: window.navigator.appVersion
        }

    },
}
</script>