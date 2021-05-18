export default {
    ssr: false, 
    target: 'static',
    components: true,
    srcDir: 'src',
    head: {
      title: 'nuxt',
      meta: [
        { charset: 'utf-8 ' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'hello' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        { src: 'https://cdn.talkjs.com/talk.js' }
      ]
    },
    css: [
      // 'uikit/dist/css/uikit.min.css',
      // 'vuesax/dist/vuesax.css'
    ],
    plugins: [
      { src: '~/plugins/uikit' , mode: 'client' },
      // { src: '~/plugins/vuesax' , mode: 'client' },
    ],
    modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
    /* serverMiddleware: [
      // API middleware
      // {path: '/api', handler: '~~/api/index.js'}
      
    ], */
    auth: {
      strategies: {
      local: {
        endpoints: {
          // these are the API endpoints we created in Express
          login: {
            url: '/api/users/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: true,
          user: {
            url: '/api/users/user',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
      },
      redirect: {
        login: '/user/login', // User will be redirected to this path if login is required
        logout: '/', // User will be redirected to this path if after logout, current route is protected
        home: '/' // User will be redirect to this path after login if accessed login page directly
      },
      rewriteRedirects: true,
  },
}