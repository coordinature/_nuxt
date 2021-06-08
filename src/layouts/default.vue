<template lang="pug">
#app.font-sans(v-on:keyup="handleKey")
  header.uk-container.uk-margin-bottom
    navigation(v-if="map" :title="map.website.title")
  .uk-container
    section(uk-height-viewport="expand: true").uk-container
      div(uk-grid v-if="$route.name === 'works-category' || $route.name === 'works-category-article'").uk-grid-collapse
        aside(class="uk-visible@s").uk-width-medium
          h2.uk-h2.uk-flex.uk-flex-middle.uk-inline
            nuxt-link(v-if="!editable" to="/works/" uk-icon="arrow-left").uk-margin-small-right.uk-position-center-left-out
            span {{ $route.params.category }}
          // template(v-if="!$store.state.editable || !$store.state.accessible" )
              article-list(
                v-if="category" 
                :id="category.title" 
                :articles="category.children")
          editable-article-list(
            v-if="category" 
            :id="category.title" 
            :articles="category.children" 
            @update="readUpdate")
        nuxt.uk-width-expand
      div(v-else)
        nuxt
  
  footer.uk-container.uk-padding
    nuxt-link(to="/login/")
      span &copy; 2020 Dagmar Baumann
</template>
<script>
// import { app } from '~/assets/js/infrastructure'
import { groupWith, groupBy, compose, map, filter } from 'rambda'
import sizeof from 'object-sizeof'

export default {
  data() {
    return {
      hoverCategory: false,
      order: {},
      temp: {
        works: [],
        categories: [],
        projects: [],
        media: [],
      },
    }
  },
  computed: {
    editable() {
      return this.$store.state.editable
    }, 
    category() {
      let list, positions, items, category
      const places = this.$store.state.places
      if (places.length > 0) {
        list = places.find(
          (place) => place.title === this.$route.params.category
        )
        positions = this.order[list.title]
      }

      if (positions) {
        items = this.order[list.title].map(key => {
          const item = list.children.find(child => {
              return child.id === key
          })
          return item
        })

          category = {
            ...list,
            children: items
          }


        } else {
          category = list
        }

      return category

    },
  },
  watch: {
    $route(newRoute) {
      switch (newRoute.name) {
        case 'works-category':
          this.$store.dispatch('bindPlace', newRoute.params.category)
          console.log(newRoute.params.category)
          break
        case 'works-category-article':
          this.$store.dispatch(
            'bindArticle',
            newRoute.params.article.split('_').join(' ')
          )
          this.$store.dispatch(
            'bindMedia',
            newRoute.params.article.split('_').join(' ')
          )
          break
        default:
          // console.log(newRoute.params.category)
          break
      }
    },

  },
  asyncComputed: {
    async map() {
      const map = await this.$content('sitemap').fetch()
      return map
    },
    async sitemap() {
      const sitemap = await this.getPlaces()

      const picturesPromises = await sitemap.map(async (branch) => {
        const promises = branch.children.map((child) =>
          this.getPictures(child.id)
        )
        const resolved = await Promise.all(promises).then((values) => {
          return values
        })
        return resolved
      })

      const pictures = await Promise.all(picturesPromises).then((values) => {
        return values
      })

      const composite = sitemap.map((branch, i) => {
        return {
          ...branch,
          children: branch.children.map((branch, j) => ({
            ...branch,
            children: pictures[i][j],
          })),
        }
      })

      return composite
    },
  },
  created() {
    this.$store.dispatch('bindPages')
    this.$store.dispatch('bindPlaces')
    switch (this.$route.name) {
      case 'works-category':
        if (!this.category) {
          this.$store.dispatch('bindPlace', this.$route.params.category)
        }
      case 'works-category-article':
        if (!this.category) {
          // this.$store.dispatch('bindPlace', this.$route.params.category)
        }
        break
      default:
        break
    }
  },
  mounted() {
    const _this = this
    document.onkeydown = function(e) {
        if (e.ctrlKey /* && (e.ctrlKey || e.metaKey) */) {
            e.preventDefault(); // present "Save Page" from getting triggered.

            _this.$store.commit('editable', !_this.editable)

        }
    };
    /* this.getCollection({collection: 'articles'}).then(articles => {
      articles.forEach(article => {
        const articleReference = this.$fire.firestore.collection('articles').doc(article.id)
        this.getCollection({
          collection: 'places', 
          query: ['path', '==', article.places[0]]
        }).then(placements => {
          placements.map(place => {
            this.$fire.firestore.collection('places').doc(place.id).update({
              items: this.$fireModule.firestore.FieldValue.arrayUnion(reference)
            }, { merge: true })
          })
        })
      })
    }) */
    /* this.getCollection({collection: 'images'}).then(images => {
      images.forEach(image => {
        const imageReference = this.$fire.firestore.collection('images').doc(image.id)
        this.getCollection({
          collection: 'articles', 
          query: ['title', '==', image.title]
        }).then(articles => {
          articles.map((article) => {
            const articleReference = this.$fire.firestore.collection('articles').doc(article.id)
            articleReference.update({
              items: this.$fireModule.firestore.FieldValue.arrayUnion(imageReference)
            }, { merge: true })
          })
        })
      })
    }) 
    
    */
    /* this.getCollection({
      collection: 'images',
      query: ['url', '==', '11B8144.jpg'],
    }).then((results) => {
      console.log('image', results[0].id)
    }) */
    if(this.$route.params.article) {
      const path = this.$route.params.article.split("_").join(" ")
      const url = decodeURI(path)
    }
    

    /* this.getCollection({
      collection: 'articles',
      query: ['title', '==', url],
    }).then((articles) => {
      // console.log('article', results[0].id)
      // console.log('result', results[0])
      // console.log(articles[0].title)
      this.getCollection({
        collection: 'images',
        query: ['title', '==', articles[0].title],
      }).then((images) => {
        console.log('article', url)
        console.log('image', images)
      })
    }) */

  },
  methods: {
    handleKey(key) {
      // console.log(key)
    },
    async getCollection({ collection, query }, service) {
      let api, request
      if (!service) {
        api = this.$fire.firestore
      } else {
        api = service
      }
      if (!query) {
        request = api.collection(collection)
      } else {
        request = api.collection(collection).where(query[0], query[1], query[2])
      }
      return await request.get().then((results) =>
        results.docs.map((result) => ({
          id: result.id,
          ...result.data(),
        }))
      )
    },
    getMedia() {
      const images = this.$fire.firestore
        .collection('images')
        .get()
        .then((results) => {
          const images = results.docs.map((doc) => doc.data())
          const categories = images.map((image) => image.more.categories)
          console.log(categories)
        })
    },
    getArticles() {
      this.$fire.firestore
        .collection('articles')
        .get()
        .then((results) => {
          results.docs.map((doc) => {
            return doc.data()
          })
        })
    },
    getPlacements() {
      this.$fire.firestore
        .collection('places')
        .get()
        .then((results) => {
          results.docs.map((doc) => {
            return doc.data()
          })
        })
      console.log('hello')
    },
    getPlaces() {
      return this.$fire.firestore
        .collection('categories')
        .get()
        .then((results) => {
          const categories = results.docs.map((doc) => doc.data())
          const filteredCategories = categories
          const sameParent = (x, y) => x.parent === y.parent
          const result = groupWith(sameParent, categories)

          const input = categories
          const filteredList = filter(
            (x) =>
              x.slug !== 'info' &&
              x.slug !== 'about' &&
              x.slug !== 'contact' &&
              x.slug !== 'thumbnail' &&
              x.slug !== 'uncategorized',
            categories
          )
          const groups = Object.entries(groupBy((x) => x.parent, filteredList))
          const index = groups[0]
          const works = groups.slice(1)
          const named = works.map((category) => {
            const parent = index[1].find(
              (item) => item.id === JSON.parse(category[0])
            )
            const object = {
              id: parent.id,
              title: parent.slug,
              children: category[1].map((leaf) => {
                return {
                  id: leaf.id,
                  title: leaf.name,
                  children: [],
                }
              }),
            }
            return object
          })

          const output = named
          return output
        })
    },
    async getPictures(id) {
      const cheerio = require('cheerio')
      const media = this.$fire.firestore
        .collection('media')
        .where('categories', 'array-contains', id)
      const project = await media.get().then((results) => {
        // loop through results to filter IN values
        const list = results.docs.map((doc) => {
          // Select wanted attributes
          const data = doc.data()
          const title = data.title.rendered
          const caption = data.caption.rendered
          const description = cheerio.load(data.description.rendered).text()
          const alt = data.alt_text
          const type = data.mime_type
          const categories = data.categories
          const id = data.id

          let height, width, file

          // select optional variables
          if (data.media_details) {
            height = data.media_details.height
            width = data.media_details.width
            file = data.media_details.file.split('/')[
              data.media_details.file.split('/').length - 1
            ]
          } else {
            height = ''
            width = ''
            file = ''
          }

          // return wanted values
          return {
            title,
            caption,
            description,
            categories,
            dimensions: {
              height,
              width,
              file,
            },
            id,
            alt,
            type,
          }
        })

        // pass list to groupWith funtoin
        const isGroupedByArticle = (x) => {
          const groupCheck = x.alt.split('#')[0].trim()
          if (groupCheck !== '') {
            return groupCheck
          } else {
            return x.title
          }
        }
        // const isGroupedByParentCategory = (x, y) => x.categories[0] === y.categories[0]

        const result = Object.entries(groupBy(isGroupedByArticle, list))

        return result.map((value, i) => ({
          id: i,
          title: value[0],
          description: value[1][0].description,
          children: value[1].map((value) => ({
            id: value.id,
            type: value.type,
            caption: value.caption,
            ...value.dimensions,
          })),
        }))
      })
      return project
    },
    prepareTree(sitemap) {
      const content = JSON.stringify(sitemap)
      const uriContent =
        'data:application/octet-stream,' + encodeURIComponent(content)
      window.open(uriContent, 'dbaumann')
    },
    seedFirestoreImages() {
      const images = this.works.map((work) => {
        return work.children.map((category) => {
          return category.children.map((project) => {
            return project.children.map((picture) => {
              return picture
            })
          })
        })
      })
      console.log(images.flat(4))
      /* this.tree.children = sitemap.map((branch) => {
        // console.log(this.$fire)
        const uriContent = "data:application/octet-stream," + encodeURIComponent(content);

        return {id: branch.title}
      }) */
    },
    readUpdate(positions) {
      this.order[this.category.title] = positions
      this.$store.commit('update/place', {
        id: this.category.id,
        title: this.category.title,
        children: positions
      })
      this.$store.dispatch('update/cloud')
    },
  },
}
</script>
<style scoped>
.uk-width-medium {
  min-width: 200px;
  max-width: 240px;
}
</style>