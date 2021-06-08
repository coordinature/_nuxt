<template lang="pug">
ul 
    li(v-for="(item, itemKey) in items").uk-active
        slot(name="item" :item="item")
           item(:to="item.path" :name="item.name" :slug="item.slug").uk-text-lowercase 
           slot
        //display(v-if="item.items" :path="item.items['#']")
       
</template>
<script>
export default {
    props: {
        items: {
            type: Array|Object,
            default: function() {
                return [
                    {
                        slug: 'one',
                        path: 'one'
                    },
                    {
                        slug: 'three-three',
                        path: 'three-three'
                    },
                    {
                        slug: 'two',
                        path: 'two'
                    }
                ]
            }
        }
    },
    data() {
        return {
            active: 0,
            selected: [],
            checked: []
        }
    }
}
</script>