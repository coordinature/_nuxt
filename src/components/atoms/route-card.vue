<template lang="pug">
div 
    button(v-show="$route.name !== 'index'" @click="goBack") {{ '<' }}
    span {{ hostname }}
    span.uk-margin-small-left {{ $route.name }}
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
      console.log(window)
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
    
}
</script>