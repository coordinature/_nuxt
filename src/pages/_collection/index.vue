<template lang="pug">
div
  // pre
    code {{ works }}
  // to-list(:items="collection.items")
  // p {{ $route.name }}
  list(:items="items").uk-list.uk-list-collapse.uk-text-meta
  nuxt-content(:document="content")
</template>
<script>
export default {
  data() {
    return {
      content: {},
      items: []
    }
  },

  async fetch () {

    this.content = await this.$content( 
      this.$route.params[this.$route.name] 
    ).fetch()

    const name = this.$route.name
    const names = this.$route.name.split('-')
    const point = this.$route.params[this.$route.name]
    const nodePath = name + "/" + point
    const pathGen = names.map(name => {
        return this.$route.params[name]
    }).join('/')

    let path
    pathGen.length ? path = pathGen : path = this.$route.fullPath
    console.log(path)
    this.$gun.get(path).map().on((node0, key0) => {
        console.log(node0)
        this.items = [ ...this.items, { ...node0, slug: node0.name, path: node0.name, key: key0 } ]
        // add results straight to the Vue component state
        // and get updates when nodes are updated by GUN
        /* this.$gun.get(key0).on((node1, key1) => {
            console.log(key0)
            
            console.log(node1)
        }) */

    });

  },

}
</script>