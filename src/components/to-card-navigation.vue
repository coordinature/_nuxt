<template lang="pug">
div
  div.uk-flex.uk-grid.uk-grid-collapse.uk-child-width-1-2
    ul.uk-list
      li(v-for="route in  $router.options.routes")
        div {{ route.name }}
    ul.uk-list
      li 
        div {{ "host: " + hostname }}
      li
        div {{ "route: " + $route.name }}
      li
        div {{ "collection: " +  $route.params.collection }}
      li
        div {{ "category: " +  $route.params.category }}
      li
        div {{ "content: " +  $route.params.content }}
        // span.uk-margin-small-left path: {{ $route.path }}
</template>
<script>
export default {
    data() {
      return {
        hostname: ''
      }
    },
    mounted() {
      this.hostname = window.location.hostname
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
    
}
</script>