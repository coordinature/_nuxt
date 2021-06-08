<template lang="pug">
div.uk-flex.uk-flex-center
    .uk-container
        .uk-flex.uk-flex-between
            ul.uk-breadcrumb.uk-text-meta.uk-margin-top
                li(v-for="part in $route.name.split('-')")
                    n-link(to="") {{ $route.params[part] }}
            ul.uk-iconnav.uk-margin-top
                
                li
                    a( :uk-icon="editable ? 'check' : 'pencil'" @click="editable = !editable") 
                li
                    a( :uk-icon="assistance ? 'play-circle' : 'question'" @click="assistance = !assistance") 
        hr.uk-margin-remove-top
        .uk-grid.uk-grid-small.uk-flex.uk-flex-between(uk-sortable)
            template(v-if="assistance")
                .uk-panel.uk-width-large
                    to-card-form(
                        :answers="answers"
                        :questions="questions"
                        :callback="handleAnswer"
                    )
                hr.uk-divider-vertical.uk-margin-large-left
            .uk-panel.uk-width-expand
                to-card-display(:content="answers" :order="keys" )
                    //.uk-card-media
                        img(src="//via.placeholder.com/800x240")
                    //.uk-card-header {{ answers[key] }}
                    //.uk-card-body Body
                    //.uk-card-footer Footer
        // hr
        
        // to-checkable-list(v-if="tags.length > 0" :items="tags")
        // hr(v-if="tags.length > 0").uk-divider-small
        // to-checkable-item(text="add new text" :disabled="false")
        

</template>
<style scoped>
.tm-list-padding {
    padding: 8px
}

.uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    content: "/";
    display: inline-block;
    margin: 0 10px 0 calc(12px - 4px);
    font-size: .875rem;
    color: #999;
}
</style>
<script>
const mini = {
    mini: [
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
    works: {
        title: {
            type: 'text',
            label: 'title',
            question: "What is the title of this page?",
            default: ''
        },
        description: {
            type: 'text',
            label: 'description',
            question: "What is unique about this collection?",
            default: ''
        },
        content: {
            type: 'list',
            label: 'items',
            question: "What do you want to include in this collection?",
            default: []
        }
    }
}
export default {

    data() {
        return {
            active: 0,
            questions: mini.works,
            editable: false,
            assistance: true,
            answers: {},
            keys: [],
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
        handleAnswer(key, value) {
            console.log(key, value)
            // this.answers.push(i)
            const attribute = {[key]: value}
            this.answers = {
                ...this.answers,
                ...attribute
            }
            this.keys.map(keyId => {
                return keyId
            })  
            const result = this.keys.indexOf(key)
            result === -1 ? this.keys.push(key) : console.log('already exists')

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