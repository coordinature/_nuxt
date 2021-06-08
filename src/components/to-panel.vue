<template lang="pug">
.uk-panel
    span HEllo
</template>
<script>
export default {
    mounted() {
         console.log(this.$route.name, this.$route.fullPath, this.$route.params)
    }
}
</script>