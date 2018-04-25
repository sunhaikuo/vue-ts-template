import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
/******************** Vue-Router ************************* */
import routerConfig from 'Pages/discoveryrank/router'
const router = new VueRouter({
    routes: routerConfig
})
Vue.use(VueRouter)

/******************** Vuex ************************* */
import storeWrap from 'Store/index'
import module from 'Store/modules/discoveryrank'
const store = storeWrap(module)
Vue.use(Vuex)
if ((<any>window).__INITIAL_STATE__) {
    // 这是为了防止在ssr渲染的数据 和 前端vuex的数据不相匹配, 导致state取数据报错
    store.replaceState(
        Object.assign(store.state, (<any>window).__INITIAL_STATE__)
    )
}

import App from '../../pages/discoveryrank/Main.vue'
import MtimeUi from '@mtime-node-mlibs/mtime-ui'
import '@mtime-node-mlibs/mtime-ui/dist/theme-default/index.css'
Vue.use(MtimeUi)
import filters from 'Pages/_filters/GlobalFilter'
Vue.use(filters)
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})
