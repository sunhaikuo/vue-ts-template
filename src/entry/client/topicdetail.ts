import Vue from 'vue'

import App from 'Pages/topicDetail/TopicDetail.vue'
import '@mtime-node-mlibs/mtime-ui/dist/theme-default/icon.css'
import filters from 'Pages/_filters/GlobalFilter'
import created from './_base'
Vue.use(filters)
new Vue({
    el: '#app',
    created: created,
    render: h => h(App)
})
