import Vue from 'vue'
import Vuex from 'vuex'
import created from './_base'
import MtimeUi from '@mtime-node-mlibs/mtime-ui'
import '@mtime-node-mlibs/mtime-ui/dist/theme-default/index.css'
Vue.use(MtimeUi)
import filters from 'Pages/_filters/GlobalFilter'
Vue.use(filters)
import { Share } from '@mtime-node-mlibs/live-util-ts'
// 设置微信分享信息
Share.share(<any>window['__INITIAL_STATE__'].wx)
import App from 'Pages/userDetail/Main.vue'
new Vue({
    el: '#app',
    created: created,
    render: h => h(App)
})
