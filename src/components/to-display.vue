<template lang="pug">
div
    div(v-if="content.index")
        ul(uk-sortable).uk-list.uk-list-collapse
            li.uk-card(v-for="point in content.index.split(':')")
                to-card(:answers="content[point]")
                
        // to-display-input(:article="content" editable=false)
    
    div(v-else) 
        // to-display-input(:article="content" editable=false)
</template>
<script>
export default {
    props: [
        'hash',
        'node'
    ],
    data() {
        return {
            graph: {},
            content: {},
            items: []
        }
    },
    mounted() {
        console.log(this.node)
        const graph =  this.$gun.get(this.node)
        graph.map().on(data => {
            this.content = data
            this.graph = graph['_'].root.graph

            if(this.content['_']) {
               
                const keys = Object.keys(data['_']['>'])
                const items = keys.map(key => {
                    const hash = data[key]['#']
                    const item = this.graph[hash]
                    return item
                })

                const newObject = {
                    ...this.graph[this.node],
                    items: items
                }

                console.log(newObject)
                this.content = newObject
            }

        })
    }
}
</script>