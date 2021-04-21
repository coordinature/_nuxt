export default {
    // ssr: false, 
    // target: 'static',
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
    },
    css: [
      'uikit/dist/css/uikit.min.css',
      // 'vuesax/dist/vuesax.css'
    ],
}