<template lang="pug">
div.uk-width-1-1.js-upload
    .uk-inline.uk-text-meta.uk-width-1-1.uk-input.uk-form-blank(v-if="order.length === 0")
        // input.uk-text-baseline(:placeholder="question").uk-input.uk-form-blank

        span.uk-text-baseline {{ question }}
        // a(uk-form-custom).uk-text-baseline.uk-form-icon-flip.uk-form-icon
            input(type="file" multiple)
            span(uk-icon="icon: plus; ratio: 0.8" ).uk-link
    // hr.uk-divider-small.uk-margin-top
    ol(v-if="readers.length > 0" , uk-sortable @moved="e => updateOrder(e.target.children)").uk-list.uk-list-collapse.uk-margin-remove
        li( v-for="(reader, readerIndex) in readers" :key="readerIndex" :id="readerIndex")
            to-checkable-item(icon="image" :background="reader.data" :text="reader.file.name.split('.')[0].split('-').join(' ').split('_').join(' ')" :callback="(data) => updateReader(data, readerIndex)" disabled=false)
    ol.uk-list.uk-list-collapse.uk-margin-remove
        li
            .uk-inline.uk-text-meta.uk-width-1-1.uk-input.uk-form-blank
                // input(placeholder="collection").uk-input.uk-form-blank
                
                a(uk-form-custom).uk-text-baseline.uk-form-icon
                    input(type="file" multiple)
                    span(uk-icon="icon: upload; ratio: 0.8" ).uk-link
                span(uk-form-custom).uk-input.uk-form-blank.uk-text-baseline.uk-text-meta
                    input(type="file" multiple)
                    span.uk-link {{ 'Add an item to this list.' }}
                
        // progress(value="0" max="100" hidden)#js-progressbar.uk-progress
// div(v-else)
    to-img(v-if="file.type.split('/')[0] === 'image'" :src="reader.result")
    
</template>

<script>
export default {
    props: [ 'question', 'starter', 'rows', 'type', 'callback', 'assistance' ],
    data() {
        return {
            file: {},
            files: {},
            readers: [],
            touched: {},
            uploads: [],
            order: [],
            reader: null,
            caption: '',
            example: 'Example Caption | Year'
        }
    },
    computed: {
        year() {
            const dayjs = require('dayjs')
            const toObject = require('dayjs/plugin/toObject')
            dayjs.extend(toObject)

            let date

            this.file.lastModified ? date = this.file.lastModified : date = Date.now()

            console.log(this.file)

            const dateObject = dayjs(date).toObject()

            return dateObject.years
        },
        name() {
            let name
            this.file.name ? name = this.file.name.split('.')[0].split(' ').join('-') : name = 'Untitled_image-' + JSON.stringify(Date.now())
            console.log(name)
            return name 
        },
    },
    watch: {
        touched(newTouched) {

        }
    },
    methods: {
        updateOrder(oldList) {
            const list = [ ...oldList ]
            this.order = list.map(child => {
                return child.id
            })
            this.uploads = this.order.map(index => {
                return this.touched[index]
            })
            this.$emit('upload', this.uploads)
        },
        updateReader(data, index) {
            if(index || index === 0) {
                this.order = [...this.order, JSON.stringify(index)]
                const reader = this.readers[index]
                const newReader = {
                    ...reader,
                    selected: data.selected,
                    caption: data.value
                }
                this.touched[JSON.stringify(index)] = newReader
                this.uploads = this.order.map(index => {
                    return this.touched[index]
                })
                this.$emit('upload', this.uploads)
            }   
           
        }
    },
    mounted() {
        var bar = document.getElementById('js-progressbar');
        var UIkit = require('uikit')
        var _this = this
        UIkit.upload('.js-upload', {
            url: '/api/images/',
            multiple: true,

            beforeAll: async function () {
                _this.file =  arguments[1][0];
                _this.files = { ...arguments[1] }

                Object.keys(this.files).map(fileIndex => {
                    
                    const file = this.files[fileIndex]
                    const type = file.type.split('/')[0]
                    const reader = new FileReader();
                    

                    reader.onload = function(e) {
                        // The file's text will be printed here
                        _this.readers = [
                            ..._this.readers, {
                               file: file,
                               data: e.target.result 
                            }
                        ]
                    };

                    if(type === 'image') {
                        reader.readAsDataURL(file)
                    } else if (type === 'text') {
                        reader.readAsText(file)
                    }

                })
            }.bind(this),
        });
    },
}

    

</script>