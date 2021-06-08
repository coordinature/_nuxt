<template lang="pug">
div
    .uk-section-small.uk-section-default
        .uk-panel.uk-container
            span.uk-text-meta {{ $route.name }}
            h1.uk-h1 {{ $route.params.collection + " form" }}
            tm-form(
                :entity="model"
                @submit="doc=> addCollection($route.params.collection, doc)"
            )

    .uk-section-small.uk-section-muted
        .uk-panel.uk-container
          list(:items="items")
</template>
<script>
import UIkit from 'uikit'

const collections = {
    works:   {
        title:  String, 
    }
}

const examples = {
    works:   {
        title: "Categories",
        description: "A description of this collection category.",
        imageUrl: 'https://via.placeholder.com/185x140'
    }
}

export default {
    layout: 'developer',
    
    data() {
        return {
            model: {},
            graph: {},
            items: {},
            list: []
        }
    },
    mounted() {
       

        this.graph = this.$gun.get(this.$route.params.collection)
        this.graph.map().on((object, id) => {

            // Get unique names
            const keys = Object.keys(object._['>'])

            // Loop through each key and create a place for it, then select, only the object
            // needed from the general object which we had in the first place.

            keys.map(key => {
                const path = object[key]['#']
                this.$gun.get(path).once(node => {
                    this.items[key] = {}
                    this.items[key] = node
                })
            })
        })

        this.model = examples[this.$route.params.collection]

        

        
    
        /* folds.set({
            slug: this.createSlug(item.title + ' draft'),
            title: item.title + ' draft'
        }) */

        this.getList('works/paintings/folds')
    },
    methods: {
        log(message) {
            console.log(Date.now() + ":", message)
        },
        slugify(input) {
            return input.toLowerCase().split(' ').join('-')
        },
        removeList(path) {
            this.$gun.get(path).put({})
        },
        removeItem(path) {
            const id = path.split('/')[ path.split('/').length - 1 ]
            this.$gun.get(this.path).get(id).put(null)
            console.log('deleted:', path)
        },
        getItem(path) {
            this.$gun.get(path).once(node => {
                this.list.push(node)
            })
        },
        getList(path) {
            let list, object
            object = this.$gun.get(path)._.root.graph[path]
            object ? list = Object.values(object).splice(1) : null
            list && list.forEach(item => { 
                item ? this.getItem(item['#']) : console.log("Reference deleted")
            }) 

            /* list.once().map().once(list => {
                console.log(list)
            }) */
            // list.map().once()
        },
        addItem(path, item) {

            this.$gun.get(path).put({
                [this.createSlug(item.title)]: item
            })

            console.log('item added at:', path)
        },

        addCollection(path, subCollection) {
            const collection = this.$gun.get(path).get('items')
            collection.get( this.slugify(subCollection.title) ).put({
                slug: this.slugify(subCollection.title),
                ...subCollection
            })
        }
    },
    watch: {
        items(newItems) {
            const values = Object.values(newItems)
            console.log(values)
        }
    }

}
</script>