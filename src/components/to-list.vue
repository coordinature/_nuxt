<template lang="pug">
div
    ul.uk-text-small(v-if="items.length > 0")
        li(v-for="(item, i) in items" :key="`${i}-${item.name}`")
            to-item(v-if="item.name" :name="item.name")
        // nuxt-link(:to="`${item.name}/`")
            span {{ item.name }}
        // nuxt-link(:to="`${path}/${item.name}/`")
            span {{ item.name }}
        // span {{ item.name }}
        // li(v-if="this.item.type === 'draft'")
        // nuxt-link(:to="`${path}/draft`") draft
        // hr.uk-divider-small.uk-margin-small-top
        // li
            .uk-inline.uk-flex.uk-flex-middle(@click="createDraft")
                span(uk-icon="icon: plus; ratio: 0.8") 
                span.uk-margin-left.uk-margin-small-left.uk-text-lowercase add item
            // to-list(:items="item.items")
            // category-list(:items="work.categories")
</template>
<script>
export default {
    props: ['items', 'path'],
    props: { 
       path: 'folds',
       title: String,
       description: String,
       items: {
           type: Array|Object,
           default: function() {
               return [
                   { name: "one" },
                   { name: "two" }
               ]
           }
       },
    },
    data() {
        return {
            item: {},
            list: []
        }
    },
    methods: {
        createDraft() {
            this.item = {
                title: '',
                type: 'draft'
            }
            this.$router.push(this.path + '/draft')
        }
    }

}
</script>