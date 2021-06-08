// import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const strict = false

const instanceTime = '1609431420341'

// const _places = this.$fire.firestore.collection('places')
// const _media = this.$fire.firestore.collection('images')
// const _articles = this.$fire.firestore.collection('articles')


export const state = () => ({
  media: [],
  places: [],
  articles: [],
  read: {},
  update: {},
  accessible: false,
  editable: false,
  instanceTime: '1609432865509'
})

export const mutations = {
  update(state, payload) {
    state.update[payload.id] = payload
  },
  read(state, payload) {
    state.read[payload.slug] = payload
  },
  accessible(state, payload) {
    state.accessible = payload
  },
  editable(state, payload) {
    state.editable = payload
  },
  ...vuexfireMutations,
}

export const actions = {
  logout({ commit }) {
    this.$fire.auth.signOut().then(() => commit('accessible', false))
  },

  login(context, { email, password, checked }) {
    return new Promise(async (resolve, reject) => {
      const response = await this.$fire.auth.signInWithEmailAndPassword(email, password)
      .then((response)=> {
        if (response.user.email === email) {
          context.commit('accessible', true)
          resolve('ready');
        }
      })
      .catch(function (error) {
        reject(error.message)
      })
    })
  },

  reset(context, { email }) {
    return new Promise(async (resolve, reject) => {
      const response = await this.$fire.auth.sendPasswordResetEmail(email)
      .then(response => {
        resolve("Email sent!")
      }).catch(function(error) {
        reject(error.message)
      });
    })
  },

  async loginLink(context, { email }) {

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:3000/login?email=' + email,
      // This must be true.
      handleCodeInApp: true,
      
    };

    this.$fire.auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
      // ...
    });
  },

  contact(state, { name, email, subject, message }) {
    const conversations = this.$fire.firestore.collection('conversations')
    const contacts = this.$fire.firestore.collection('contacts')
    const messages = this.$fire.firestore.collection('messages')

    return new Promise(function (resolve, reject) {
      const payload = {
        sent: Date.now(),
        name,
        subject,
        email,
        message,
      }

      let contactRef
      let conversationRef
      let messageRef

      contacts
        .add({
          name: payload.name,
          email: payload.email,
        })
        .then(async (response) => {
          contactRef = await response.id
          // console.log("We've made a contact!", contactRef)
          // contactReq = await contacts.doc(response.id).get()
          // console.log("We've made a contact:", response.id, contactRef.data())
        })
        .then(() => {
          conversations
            .add({
              subject: payload.subject,
              participants: [],
              messages: [],
            })
            .then(async (response) => {
              conversationRef = await response.id
              // console.log("We've made a conversation!", conversationRef)
              // conversationRef = await conversations.doc(response.id).get()
              // console.log("We've made a conversation with called:", conversationRef.data())
            })
            .then(() => {
              // console.log(Date.now(), contacts.doc(contactRef), conversations.doc(conversationRef))
              messages
                .add({
                  author: contacts.doc(contactRef),
                  text: payload.message,
                  sent: payload.sent,
                  context: conversations.doc(conversationRef),
                })
                .then((response) => {
                  messageRef = response.id
                  // console.log("We've made your message!", messageRef)
                  // messageReq = await messages.doc(response.id).get()
                  // console.log("We've made your message:", messageRef.data())
                  if (messageRef) {
                    const successObject = {
                      msg:
                        'Message Created Sucessfully, Dagmar will get back to you soon.',
                      payload,
                    }
                    resolve(successObject)
                  } else {
                    const errorObject = {
                      msg: 'An error occured',
                      error: '',
                      // error, //...some error we got back
                    }
                    reject(errorObject)
                  }
                })
            })
        })
    })

    /* app.prod.path.ref('emails/' + JSON.stringify(payload.sent)).set(payload).then(response => {
        console.log("message sent by: ", payload)
    }); */
  },

  bindPages: firestoreAction(async function ({state, bindFirestoreRef }) {
    const db = this.$fire.firestore
    const instance = db.collection('content').doc(state.instanceTime)
    const _pages = db.collection('pages')
    await bindFirestoreRef('pages', _pages)
  }),

  bindPlaces: firestoreAction(async function ({ bindFirestoreRef, state }) {
    const db = this.$fire.firestore
    const instance = db.collection('content').doc(state.instanceTime)
    const _places = instance.collection('places');
    await bindFirestoreRef('places', _places, { wait: true })
  }),

  bindPlace: firestoreAction(async function ({ bindFirestoreRef, state }, placeTitle) {
    const db = this.$fire.firestore
    const instance = db.collection('content').doc(state.instanceTime)
    const _places = instance.collection('places');
    const _place = _places.where('title', '==', placeTitle)
    await bindFirestoreRef('places', _place)
  }),

  bindArticle: firestoreAction(async function (
    { bindFirestoreRef, state, commit },
    articleTitle
  ) {
    const db = this.$fire.firestore
    const instance = db.collection('content').doc(state.instanceTime)
    const _articles = instance.collection('products');
    const _article = _articles.where('title', '==', articleTitle)

    _article.get().then(article => {
      const ref = article.docs[0]
      if(ref) {
        const idRef = ref.id 
        _articles.doc(idRef).update({
          id: idRef,
          slug: articleTitle.split(' ').join('_')
        })
        // console.log(_articles.doc(idRef))
      }
    })

    await bindFirestoreRef('articles', _article).then(result => {
      if(result[0] && result[0].children[0]) {
        const articleOp = result[0]
        commit('read', result[0])
      }
    })
    
  }),

  bindMedia: firestoreAction(async function (
    { bindFirestoreRef, state },
    articleTitle
  ) {

    const db = this.$fire.firestore
    const instance = db.collection('content').doc(state.instanceTime)
    const _articles = instance.collection('products');
    const _media = instance.collection('pictures');
    
    const _article = _articles.where('title', '==', articleTitle)
    _article.get().then(async (snapshot) => {
      const _article = snapshot.docs[0]
      if(_article) {
        const article = _article.data()
        const _images = article.children.map(async (imageUrl) => {
          const _image = _media.where('url', '==', imageUrl)
          return await bindFirestoreRef('images', _image)
        })
      }
    })
  }),
}
