import Vue from 'vue'
import App from 'Pages/newbiegift/Main.vue'
import MtimeUi from '@mtime-node-mlibs/mtime-ui'
import '@mtime-node-mlibs/mtime-ui/dist/theme-default/index.css'
Vue.use(MtimeUi)
new Vue({
    el: '#app',
    render: h => h(App)
})
