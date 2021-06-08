<template lang="pug">
form(@submit.prevent="$emit('submit', {...item})").uk-form-horizontal
    div(v-for="(input, key) in item" :key="key + '-key'")
        label(
            :for="key + '-input'"
        ).uk-form-label {{ key + ":" }}
        div.uk-form-controls
            input(
                :id="key + '-input'"
                v-model="item[key]" :placeholder="key"
            ).uk-margin-small.uk-input
    div.uk-flex.uk-flex-right
        input(
            type="submit"
        ).uk-button
</template>
<script>
export default {
    props: {
        schema: String,
        entity: Object,
        action: Function,
    },
    data() {
        return {
            item: this.entity
        }
    },
}
</script>