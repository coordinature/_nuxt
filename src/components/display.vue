<template lang="pug">
div
    div(v-if="content.index")
        ul(uk-sortable).uk-list.uk-list-collapse
            li.uk-card(v-for="point in node.index.split(':')")
                // to-card(:answers="node[point]")
                span {{ point }}
                
        // to-display-input(:article="content" editable=false)
    div(v-else-if="items")
        list(:items="items")
    div(v-else) 
        // to-display-input(:article="content" editable=false)
    slot
</template>
<script>
export default {
    props: [
        'node',
        'point',
        'path'
    ],
    data() {
        return {
            graph: {},
            content: {},
            items: []
        }
    },
    mounted() {
        
        const graph =  this.$gun.get(this.path)
        this.graph = graph['_'].root.graph
        console.log(this.node, this.point, this.path, this.graph)
        graph.map().on((data, key) => {
            this.content = data
            this.graph = graph['_'].root.graph

            console.log(this.path, this.graph[key])
            this.items = [ ...this.items, {
                point: this.path+'/'+key,
                path: data.caption.split(' ').join('_'),
                name: data.caption,
                slug: data.caption.split(' ').join('_'),
                ...data
            }]
          /*   if(this.content['_']) {
               
                const keys = Object.keys(data['_']['>'])
                const items = keys.map(key => {
                    const hash = data[key]['#']
                    const item = this.graph[point]
                    return item
                })

                const newObject = {
                    ...this.graph[this.node],
                    items: items
                }

                console.log(newObject)
                this.content = newObject
            } */

        }) 
    }
}
</script>