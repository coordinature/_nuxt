<template lang="pug">
form.uk-form-stacked(@submit.prevent="submitAnswer")
    template(v-if="type === 'upload'")
        to-upload(
            :question="question"
        ).uk-width-1-1
    template(v-if="type === 'text'")
        // label(v-show="answer.trim().length > 0").uk-form-label.uk-margin-small-left {{ starter || question }}
        label(v-if="label !== false && assistance").uk-form-label.uk-margin-small-left {{ question }}
        div.uk-inline.uk-width-1-1.uk-text-meta
            template(v-if="action === 'set'")
                a(
                    uk-icon="icon: plus; ratio: 0.8"
                    @click="setAnswers"
                ).uk-form-icon.uk-form-icon-flip
            template(v-else)
                template(v-if="completed")
                    a(
                        :uk-icon="'icon: check; ratio: 0.8'"
                        @click="submitAnswer"
                        ).uk-form-icon.uk-form-icon-flip
                input(
                    v-model="answer" 
                    :placeholder="question"
                    ).uk-input.uk-form-blank.uk-width-1-1

    template(v-if="type === 'list'")
        // label(v-show="answer.trim().length > 0").uk-form-label.uk-margin-small-left {{ starter || question }}
        
        label(v-if="label !== false && assistance").uk-form-label.uk-margin-small-left {{ question }}
        .uk-inline.uk-width-1-1
            to-upload(
                @upload="setAnswers"
                :assistance="assistance"
                :question="question")
        
        
</template>
<script>
export default {
    props: [ 'question', 'assistance', 'starter', 'rows', 'type', 'callback', 'label', 'action', 'value', 'values' ],

    data () {
        return {
            answer: this.value || '',
            answers: this.values || []
        }
    },

    computed: {
        updated() {
            return this.answer.trim() !== this.starter
        },
        completed() {
            const primaryCondition = this.answer.trim().length > 0
            const secondaryCondition = this.updated 
            // console.log( primaryCondition, secondaryCondition, primaryCondition && secondaryCondition, primaryCondition || secondaryCondition )
            return secondaryCondition
        },
  
    },

    methods: {
        setAnswers(payload) {

            if (Array.isArray(payload)) {
                this.answers = payload
                this.submitAnswers(payload)
            } else {
                this.answer = payload
                 this.submitAnswer(payload)
            }

        },
        submitAnswers(answers) {
            if(answers) {
                // this.resetAnswer()
                this.callback([...answers])
            } else {
                 console.log('no answers submitted')
            }
        },
        submitAnswer() {
            if(this.answer.trim().length > 0) {
                this.callback(this.answer)
                // this.resetAnswer()
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