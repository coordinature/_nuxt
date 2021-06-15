<template lang="pug">
.uk-section.uk-section-small.uk-padding-remove-top
    // ul(uk-switcher)
      li
        a Email/Password
      // li
        a Email Link
    ul(class='uk-width-3-5@m').uk-list
      li
        form(@submit.prevent="")
            fieldset.uk-fieldset
                .uk-margin
                    label.uk-form-label(for='form-horizontal-text') Email:
                        .uk-margin-small
                            input.uk-input(v-model="email" type='text', placeholder='Email')
                .uk-margin(v-show="!reset")
                    label.uk-form-label(for='form-horizontal-text') Password:
                        .uk-margin-small
                            input.uk-input(v-model="password" type="password" placeholder='Password')
                .uk-margin.uk-grid-small.uk-child-width-auto.uk-grid.uk-flex(
                  :class="reset ? 'uk-flex-between' : 'uk-flex-between'"
                )
                    label(v-show="!reset")
                        input.uk-checkbox( v-model="checked" type='checkbox' :checked="checked")
                        |  Keep me logged in
                    .uk-margin
                      button(v-show="reset" @click="handleReset").uk-button.uk-button-default
                          | Send reset link
                    label.uk-flex-end
                      input.uk-checkbox( v-model="reset" type='checkbox' :checked="reset") 
                      |  Reset Password
                .uk-margin(v-show="!reset")
                    button(@click="handleLogin").uk-button.uk-button-default
                        | submit 
                 
      // li
        form(@submit.prevent="")
          fieldset.uk-fieldset
                .uk-margin
                    label.uk-form-label(for='form-horizontal-text') Email:
                        .uk-margin-small
                            input.uk-input(v-model="email" type='text', placeholder='Email')
                .uk-margin.uk-grid-small.uk-child-width-auto.uk-grid
                    label
                        input.uk-checkbox( v-model="checked" type='checkbox' :checked="checked")
                        |  Keep me logged in
                .uk-margin
                    button(@click="handleLoginLink").uk-button.uk-button-default
                        | submit 




</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      reset: false,
      checked: false,
      redirectTo: '',
    }
  },
  beforeRouteEnter(to, from, next) {
      console.log(from)
      next();
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password,
          checked: this.checked,
        })
        .then((response) => {
          if (this.$store.state.accessible) {
            this.$router.back()
            UIkit.notification({
              message: "You are logged in!",
              status: 'success',
              pos: 'top-right',
              timeout: 5000
            });
          }
        },
        error => {
          UIkit.notification({
              message: error,
              status: 'danger',
              pos: 'top-right',
              timeout: 5000
          });
        })
    },

    handleReset() {
      this.$store
        .dispatch('reset', {
          email: this.email
        })
        .then((response) => {
          UIkit.notification({
              message: "A reset link has been sent. Check your email!",
              status: 'success',
              pos: 'top-right',
              timeout: 5000
          });
        },
        error => {
          UIkit.notification({
              message: error,
              status: 'danger',
              pos: 'top-right',
              timeout: 5000
          });
        }
      )
    }

    /* handleLoginLink() {
      const payload = {
        email: this.email,
        checked: this.checked,
      }

      this.$store.dispatch('loginLink', payload).then(
        (response) => {
          console.log(response)
          if (this.$store.state.accessible) {
            this.$router.back()
          }
        },
        (error) => {
          console.log(error)
        })
        
    }, */

  },
}
</script>
