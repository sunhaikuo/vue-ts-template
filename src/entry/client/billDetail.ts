import Vue from 'vue'

import MtimeUi from '@mtime-node-mlibs/mtime-ui'
import '@mtime-node-mlibs/mtime-ui/dist/theme-default/index.css'
Vue.use(MtimeUi)

import App from 'Pages/bill/BillDetail.vue'
new Vue({
    el: '#app',
    render: h => h(App)
})
