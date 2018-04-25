import Vue from 'vue'
import App from 'Pages/follow/Main.vue'
import MtimeUi from '@mtime-node-mlibs/mtime-ui'
import '@mtime-node-mlibs/mtime-ui/dist/theme-default/index.css'
Vue.use(MtimeUi)
import created from './_base'

import { Share } from '@mtime-node-mlibs/live-util-ts'
// 设置微信分享信息
Share.share(<any>window['__INITIAL_STATE__'].wx)
new Vue({
    el: '#app',
    created: created,
    render: h => h(App)
})
