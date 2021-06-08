<template lang="pug">
ul.uk-list
    li(v-for="doc in $data[this.$route.params.collection]")
        div {{ doc.title }}
        div {{ doc.description }}
        // span {{ doc }}
        // .uk-flex
            list(
                :items="doc.items"
            )
            ul(uk-accordion).uk-list.uk-background-default.uk-width-1-1
                li.uk-card.uk-card-small
                    a(href="#").uk-accordion-title.uk-card-header Add Item
                    div.uk-accordion-content.uk-card-body
                        span {{ doc._['#'] }}
                        tm-form(
                            :entity="item"
                            @submit="payload => addCollection(doc._['#'], payload)"
                        )
            
        // button(
            @click="removeItem( item._['#'] )"
            ).uk-button Delete
    // li(v-for="(input, key) in list" )
        label.uk-form-label {{ key + ":" }}
        input(
            v-model="item[key]" :placeholder="key"
        ).uk-margin-small.uk-input
</template>