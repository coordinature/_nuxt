<template lang="pug">
div.uk-flex.uk-flex-center
    .uk-container
        to-checkable-list(v-if="tags.length > 0" :items="tags")
        hr(v-if="tags.length > 0").uk-divider-small
        to-checkable-item(text="add new text" :disabled="false")
    .uk-container
        div(v-if="answers.length > 0").uk-width-large
            ul.uk-list.uk-margin-small-left
                li(v-for="answer in answers") {{ answer }}
            // list-panel(:items="pages")
        div
            template( v-if="active >= questions.length")
                to-checkable-list(:items="tags" :sortable="true")
                hr.uk-divider-small
                to-checkable-item(text="add new text" :disabled="false")
                ul.uk-list.uk-list-collapse.uk-margin-small-left
                  li(v-for="tag in tags")
                    label.uk-card-small.uk-card-hover.uk-padding-xsmall.uk-flex.uk-flex-middle.tm-list-padding
                        input(
                            type="checkbox"
                        ).uk-checkbox
                        span.uk-margin-small-left.uk-text-small {{ tag }}
                  li(v-show="newTags" v-for="tag in newTags") 
                    // label
                    .uk-inline
                        // input(
                            type="checkbox"
                            checked
                            ).uk-checkbox
                        a(uk-icon="icon: check; ratio: 0.8")
                        input.uk-input.uk-form-small.uk-form-blank(placeholder="new tag")
                  li
                    label(
                        @click="createTag"
                    ).uk-card-small.uk-card-hover.uk-padding-xsmall.uk-flex.uk-flex-middle.tm-list-padding
                        span(uk-icon="icon: plus; ratio: 0.8")
                        span.uk-margin-small-left.uk-text-small create tag
            template(v-else)
                to-input-card(
                    :question="questions[active].question"
                    :starter="questions[active].starter"
                    :type="questions[active].type"
                    :rows="questions[active].rows"
                    :callback="handleAnswer"
                )
    .uk-container
        to-checkable-list(v-if="tags.length > 0" :items="tags")
        hr(v-if="tags.length > 0").uk-divider-small
        to-checkable-item(text="add new text" :disabled="false")
        

</template>
<style scoped>
.tm-list-padding {
    padding: 8px
}
</style>
<script>
export default {

    data() {
        return {
            active: 0,
            questions: [
                {
                    question: 'What are you grateful for?',
                    // starter: 'Today, I am greatful for',
                    type: 'text'
                },
                {
                    question: 'Why?',
                    // starter: 'I am greatful because',
                    type: 'text',
                },
                {
                    question: 'Tell the story.',
                    // starter: 'Once, ',
                    type: 'text',
                    lines: 6
                }
            ],
            answers: [],
            newTags: []
        }
    },

    async asyncData ({ $content }) {
        const pages = await $content('').without(['body']).fetch()

        return {
            pages
        }
    },

    methods: {
        handleItemSelection() {
            console.log('selected')
        },
        handleAnswer(i) {
            this.answers.push(i)

            if ( this.active >= this.questions.length ) {
                console.log('there are no more questions')
            } else {
                this.active++
            }
        },
        findNouns(list) {
            const nlp = require('compromise').default
            const doc = nlp(list)
            return doc.nouns().json()
        },
        createTag() {
            this.newTags.push({
                text: '',
            })
        }
    },

    computed: {
        tags() {
            const statements = this.answers
            const tags = this.findNouns(statements).map(tag => tag.normal)
            return tags
        }
    }

    
}
</script>