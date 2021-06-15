<template lang="pug">
.uk-background-muted
    .uk-container.uk-height-viewport
        .uk-flex.uk-flex-between
            ul.uk-breadcrumb.uk-text-meta.uk-margin-top
                li(v-for="(part, partIndex) in $route.name.split('-')")
                    template(v-if="part === 'document'")
                        //n-link(v-if="answers.title" to="") {{  answers.title.toLowerCase().split(' ').join('-')  }}
                        n-link(to="") {{  $route.params[part] }}
                        //n-link(v-else to="") {{  hash }}
                    template(v-else)
                        n-link(to="") {{ $route.params[part] }}
            ul.uk-iconnav.uk-margin-top
                
                // li
                    a( :uk-icon="editable ? 'check' : 'pencil'" @click="editable = !editable")
                // li(v-if="keys.length > 0")
                    button( @click="checkAnswers").uk-button.uk-button-default.uk-icon.uk-flex.uk-flex-middle
                        span( :uk-icon="editable ? 'check' : 'cloud-upload'" )
                        span.uk-margin-small-left.uk-text-capitalize update
                li
                    a( :uk-icon="toggle.assistance ? 'play' : 'play-circle'" @click="toggle.assistance = !toggle.assistance") 
                li
                    a( :uk-icon="toggle.viewable ? 'info' : 'question'" @click="toggle.viewable = !toggle.viewable")
        .uk-flex
            .uk-panel.uk-width-medium
                
                list(:items="values" :path="'/works'").uk-list.uk-list-collapse
            nuxt.uk-card.uk-card-small
// to-template
    // to-list( :items="$router.options.routes" )
    to-panel
    nuxt
</template>
<script>
export default {
    data () {
        return {
            domain: '',
            supply: {},
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

    async fetch () {
        // this.content = await this.$content().fetch()
        this.$gun.get(this.$route.params.collection).map().on((node0, key0) => {

            // add results straight to the Vue component state
            // and get updates when nodes are updated by GUN
          
            console.log( {  ...node0 } )
            this.list = []
            this.$gun.get(key0).on((node1, key1) => {
                console.log( { ...node1 } )
            })
        });
    },

    mounted() {
        
        // console.log(window)
       
        // this.graph = this.$gun.get('dbaumann')
        this.graph = this.$gun.get(this.$route.fullPath)
        this.graph.map().once((node0, key0) => {

            // add results straight to the Vue component state
            // and get updates when nodes are updated by GUN
            this.values = [
                ...this.values,
                {  ...node0 }
            ]

            const index = {
                hash: node0['_']['#'],
                path: '/' + this.$route.params.collection + '/' + node0.name + '/'
            }

            console.log(index)


            this.$store.dispatch('index', index)
 
        });
    },
}
</script>