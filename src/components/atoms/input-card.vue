<template lang="pug">
form.uk-form-stacked(@submit.prevent="submitAnswer")
    label(v-show="answer.trim().length > 0").uk-form-label.uk-margin-small-left {{ starter || question }}
    template(v-if="type !== 'textarea'")
        div.uk-inline
            a(
                uk-icon="arrow-right"
                @click="submitAnswer"
                ).uk-form-icon.uk-form-icon-flip.uk-position-bottom-right
            input(
                v-model="answer" :placeholder="question"
                ).uk-input.uk-form-blank.uk-form-width-large
    template(v-else)
        div.uk-inline
            a(
                uk-icon="arrow-right"
                @click="submitAnswer"
                ).uk-form-icon.uk-form-icon-flip
            textarea(
                v-model="answer" 
                :placeholder="question"
                :rows="rows"
                ).uk-textarea.uk-form-blank.uk-form-width-large
        
        
</template>
<script>
export default {
    props: [ 'question', 'starter', 'rows', 'type', 'callback' ],

    data () {
        return {
            answer: ''
        }
    },

    methods: {
        submitAnswer() {
            if(this.answer.trim().length > 0) {
                this.callback(this.answer)
                this.resetAnswer()
            } else {
                 console.log('no answer submitted')
            }
        },
        resetAnswer() {
            this.answer = ''
        }
    }

}
</script>