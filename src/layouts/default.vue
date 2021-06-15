<template lang="pug">
div.uk-background-muted
  panel
    navbar(
        :title="title"
        :routes="routes"
    ).uk-text-lowercase
    // section.uk-section.uk-section-small {{ this.title }}
  // panel.uk-background-muted.uk-text-meta.uk-padding-small
    span Omotola
  panel(uk-height-viewport="offset-top: true")
    nuxt.uk-padding-small
</template>
<script>
export default {
    data() {
        return {
            name: 'dbaumann',
            title: "Dagmar Baumann",
            description: "The digital display of work by Dagmar Baumann",
            items: {},
            document: {},
            routes: [{
                slug: 'works',
                path: '/works/'
            }, {
                slug: 'about',
                path: '/about/'
            }, {
                slug: 'contact',
                path: '/contact/'
            }]
        }
    },
    async fetch () {
        this.content = await this.$content().fetch()
        this.document = await this.$content( 
            this.$route.params[this.$route.name] 
        ).fetch()


        // console.log(path)
        // console.log(this.$router.options.routes)
        // console.log(this.content)
        


        /* switch(path) {
            case '/':
                console.log(path)
            default:
                console.log(path)
        }  */  
    },
    mounted() {
        const name = this.$route.name
        console.log(this.$route)
        const names = this.$route.name.split('-')
        const point = this.$route.params[this.$route.name]
        const nodePath = name + "/" + point
        const pathGen = names.map(name => {
            return this.$route.params[name]
        }).join('/')

        let path
        pathGen.length ? path = pathGen : path = this.$route.fullPath
        this.$gun.get(path).map().on((node0, key0) => {
            console.log(key0)
            this.items[key0] = {}
            this.items[key0] = node0
            // this.items[key0] =  { ...node0, slug: node0.name, path: node0.name, key: key0 }
            // add results straight to the Vue component state
            // and get updates when nodes are updated by GUN
            /* this.$gun.get(key0).on((node1, key1) => {
                console.log(key0)
               this.collection = [ ...this.collection, { ...node1, key: key1 } ]
               console.log(node1)
            }) */

        }); 

        this.graph = this.$gun.get(this.$route.params.collection)
        this.graph.map().on((object, id) => {


            if(object.items) {
                console.log('getItems', object.items['#'])
                this.$gun.get(object.items['#']).once((node, key) => {
                    console.log(node, object)
                    this.items[key] = {}
                    this.items[key] = node
                })
            } else {
                console.log(object)
            }


            // Get unique names
            const keys = Object.keys(object._['>'])
            // console.log(keys)
            

            // Loop through each key and create a place for it, then select, only the object
            // needed from the general object which we had in the first place.

/*             keys.map(key => {
                const path = object[key]['#']
                this.$gun.get(path).once(node => {
                    console.log(node)
                    this.items[key] = {}
                    this.items[key] = node
                })
            }) */
        })
    },
    computed: {
        isCollection() {
            return this.$route.params[this.$route.name] === 'works'
        },
        isDocument() {
            return this.$route.params.document
        }
    }
}
</script>