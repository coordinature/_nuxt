<template lang="pug">
div
    div(v-for="(question, key) in questions" :key="key")
        to-card-input(
            :assistance="assistance"
            :question="question.question"
            :starter="question.default"
            :type="question.type"
            :rows="question.rows"
            :label="key"
            :callback="(i) => callback(key, i)")
        hr(v-show="assistance")
</template>
<script>
export default {
    props: ['questions', 'callback', 'answers', 'assistance']
}
</script>