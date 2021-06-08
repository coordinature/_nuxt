// import {  assets } from '~/assets/js/infrastructure.js'

export const strict = false

export const state = () => ({
  page: {},
  article: {},
  placement: {}
})

export const mutations = {
  article(state, article) {
    state.article[article.id] = article
  },
  page(state, page) {
    state.page[page.id] = page
  },
  place(state, place) {
    state.placement[place.id] = place
  },
  clear(state) {
      state.page = {}
      state.article = {}
      state.placement = {}
  }
}

/* export const actions = {
  async cloud(store) {
    const db = this.$fire.firestore
    const batch = db.batch()
    const instance = db.collection('content').doc(store.rootState.instanceTime)

    const places = instance.collection('places')
    const articles = instance.collection('products')
    const media = instance.collection('pictures')
    const pages = db.collection('pages')

    const placementObjects = Object.values(store.state.placement)
    const articleObjects = Object.values(store.state.article)
    const pagesObjects = Object.values(store.state.page)

    const _this = this

    const createImageAndGetReference = async (image) => {
        let imageRef
        if(!image.preview) {
            imageRef = media.doc(image.id)
            await imageRef.update({
                caption: image.caption
            }) 
        } else {
            imageRef = media.doc()
            assets.putObject({
                Bucket: 'dbaumann',
                Body: image.body ,
                ACL: 'public-read',
                Key: image.key
            }, async function (err, data) {
                if (err) {
                    console.log(err, err.stack)
                } else {
                    
                    await imageRef.update({
                        id: imageRef.id,
                        title: image.title.toLowerCase(),
                        caption: image.caption,
                        file: image.key
                    }) 
                }
            })

        }
        return imageRef
    }

    pagesObjects.forEach(async page => {
        const ref = pages.doc(page.id)
        ref.set(page, { merge: true });

        batch.update(ref, {
            html: page.html
        }) 
    })

    placementObjects.forEach(place => {
        const ref = places.doc(place.id)
        ref.update({
            children: place.children.map(itemId => articles.doc(itemId))
        })
    })

    articleObjects.forEach(async article => {
        if(article.id !== 'add_new_work') {
            const ref = articles.doc(article.id)
            const _article = articles.where('slug', '==', article.slug)
            const images = article.children.map(async image => createImageAndGetReference(image))
            Promise.all(images).then(async values => {
                _article.get().then(newArticle => {
                    if(ref) {
                        ref.update({
                            title: article.title,
                            description: article.description,
                            children: values
                        })
                    }
                })
            })
            
        } else {
            const newArticle = await articles.add({
                title: article.title.toLowerCase(),
                description: article.description,
                places: [],
                children: []
            })
            const articleRef = articles.doc(newArticle.id)
            const articleImages = article.children.map(image => {
                return createImageAndGetReference(image)
            })
            Promise.all(articleImages).then(async values => {
                articleRef.update({
                    children: values
                })
            })
            const placeQuery = places.where('title', '==', article.places[0])
            const placeRef = await placeQuery.get().then(response => {
                return response.docs[0].ref
            })
            placeRef.update({
                children: this.$fireModule.firestore.FieldValue.arrayUnion(articleRef)
            })
            
        }
        const route = '/works/'+ this.$router.currentRoute.params.category + '/' + encodeURI(article.title.toLowerCase().split(" ").join('_') + '/')
        this.$router.push(route)
    })

    
    store.commit('clear')

  },
} */
