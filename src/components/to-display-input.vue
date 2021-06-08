<template lang="pug">
div.uk-flex
  div.uk-grid.uk-grid-collapse.uk-flex.uk-margin-left
    article.uk-margin-large-left {{ Object.entries(article.items) }}
      .uk-panel(v-if="!article || editable")
        ol.uk-list.uk-margin-remove.uk-switcher
          li(v-for="(item, i) in items" :key="'item-'+item.id" :id="'item-' + item.id").uk-margin-remove
            // editable-media(
                v-if="item && item.id"
                :media="item" 
                :position="i" 
                :editable="editable"
                :permissions="['update']"
                @update="handleUpdate"
                @deletion="handleDeletion"
                ).uk-sortable.uk-width-auto
          li.uk-margin-remove.uk-width-expand.uk-padding-small-left
            // media-uploader(@upload="handleCreation").uk-height-medium

        ol(uk-switcher="connect: .uk-list.uk-margin-remove.uk-switcher; animation: uk-animation-fade" uk-sortable="handle: .uk-sortable-handle" @moved="handleItemsUpdate" ).uk-thumbnnnail.uk-list.uk-flex.uk-flex-middle.uk-grid.uk-grid-small.uk-list.uk-margin-small-top.uk-margin-small-bottom
          li( :id="'item-' + item.id" v-for="(item, i) in items" :key="'item-'+item.id").uk-margin-remove.uk-sortable-handle
            .uk-inline
              img(:src="item.preview || base + item.file").uk-height-xxsmall.uk-width-auto
              div(class="uk-position-cover uk-overlay uk-overlay-priimary uk-flex uk-flex-center uk-flex-middle")
                span(uk-icon="trash" )
          li.uk-margin-remove.uk-width-auto.uk-padding-small-left
            .uk-placeholder.uk-margin-remove.uk-card.uk-card-hover
              span(uk-icon="image").uk-padding-large
              // img(src="https://via.placeholder.com/75").uk-height-xxsmall.uk-width-auto.uk-sortable-handle.uk-border-rounded
            
        input(v-model="title"  placeholder="Project title" @input="handleSaveProject").uk-h4.uk-padding-small.uk-width-large.uk-input.uk-form-blank.uk-border-rounded
        hr.uk-divider-small.uk-margin-small-left
        textarea(
            v-model="description" 
            @input="handleSaveProject" 
            placeholder="Your description for this project goes here." 
            :rows="Math.round(description.length / 60)"
          ).uk-width-large.uk-padding-small.uk-textarea.uk-form-blank.uk-border-rounded

</template>
<style scoped>
.uk-height-medium {
  height: 395px
}
.uk-placeholder {
  padding: 5px;
  margin-top: 0px;
  margin-bottom: 3px;
}

.uk-editing {
 padding: 5px;
}

.uk-height-xxsmall {
  height: 70px;
}

.uk-padding-xsmall {
  padding: 5px;
}

.uk-padding-large {
  padding: 19px
}
</style>
<script>
export default {
    props: ['article', 'editable'],
 /*  computed: {
    article() {
      const articles = this.$store.state.articles
      const draft = this.$store.state.update.article

      if (articles.length > 0 ) {
        const artic = articles.find(
          (article) =>
            article.title === this.$route.params.article.split('_').join(' ')
        )
        return artic
      } else {
        return this.$store.state.read[this.$route.params.article]
      }
    },
    editable() {
      return this.$store.state.editable
    },
    product() {
      return {
        id: this.$route.params.article,
        slug : '',
        title: this.title,
        description: this.description,
        children: this.items
      }
    },
    draft() {
      return this.$store.state.update.article
    }
  },
  created() {
    if (!this.article && this.$route.params.article !== 'add_new_work') {
      this.$store.dispatch(
        'bindArticle',
        this.$route.params.article.split('_').join(' ')
      )
    }
  }, */
  data() {
    return {
      id: this.$route.params.article,
      add: false,
      title: '',
      description: '',
      items: [],
      slug: this.$route.params.article,
      base: 'https://dbaumann.ams3.digitaloceanspaces.com/images/',
    }
  },
 /*  watch: {
    article(newArticle) {
      this.fillData(newArticle)
    }
    
  }, */
 /*  methods: {
    fillData(payload) {
      this.id = payload.id
      this.slug = payload.slug
      this.title = payload.title
      this.description = payload.description
      this.items = payload.children
    },
    handleUpdate(update) {
      const item = this.items.find(item => item.id === update.id)
      const index = this.items.indexOf(item)
      if (~index) {
        this.items[index] = {
          ...item,
          ...update,
          title: this.title
        };
        this.handleSaveProject()
      } else {
        console.log("no", this.items[index], update.id, item, index)
      }
    },
    handleCreation(creation) {
      this.items = [...this.items, creation]
      this.handleSaveProject()
    },
    handleDeletion(itemId) {
      const item = this.items.find(item => item.id === itemId)
      const index = this.items.indexOf(item)
      if (~index) {
        this.items.splice(index, 1);
        this.handleSaveProject()
      } else {
        console.log('no:', ~index)
      }
      console.log(item, index, itemId)
    },
    handleItemsUpdate(event) {
      const handles = event.detail[0].handles
      this.items = handles.map((item) => {
        const key = item.id.split('-')[1]
        return this.items.find(item => item.id === key)
      })
      this.handleSaveProject()
    },
    handleSaveProject() {
      this.$store.commit('update/article', {
        id: this.id,
        slug: this.slug,
        title: this.title,
        description: this.description,
        places: [this.$route.params.category],
        children: this.items,
      })
    },
  }, */
}
</script>
