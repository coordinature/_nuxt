<template lang="pug">
div 
    template(v-if="Array.isArray(answers)")
        to-slider(:items="answers")
    template(v-else-if="answers['#']")
        to-display(:node="answers['#']")
    template(v-else)
        p {{ answers }}
</template>
<script>
export default {
    props: ['answers'],
}
</script>