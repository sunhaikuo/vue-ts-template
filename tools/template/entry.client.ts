/**
 * 创建entry.client
 * @param module module的名字
 * @param isRouter 是否需要router
 * @param isVuex 是否需要Vuex
 */
function createClient(module, isRouter, isVuex) {
    let routerConfig = `
    /******************** Vue-Router ************************* */
    import VueRouter from 'vue-router'
    import routerConfig from 'Pages/${module}/router'
    const router = new VueRouter({
        routes: routerConfig
    })
    Vue.use(VueRouter)
    `
    let vuexConfig = `
    /******************** Vuex ************************* */
    import Vuex from 'vuex'
    import storeWrap from 'Store/index'
    import module from 'Store/modules/${module}'
    const store = storeWrap(module)
    Vue.use(Vuex)
    if ((<any>window).__INITIAL_STATE__) {
        // 这是为了防止在ssr渲染的数据 和 前端vuex的数据不相匹配, 导致state取数据报错
        store.replaceState(
            Object.assign(store.state, (<any>window).__INITIAL_STATE__)
        )
    }
    `

    return `
    import Vue from 'vue'
    ${isRouter ? routerConfig : ''}
    ${isVuex ? vuexConfig : ''}
    import App from 'Pages/${module}/Main.vue'
    new Vue({
        el: '#app',
        ${isRouter ? 'router,' : ''}
        ${isVuex ? 'store,' : ''}
        render: h => h(App)
    })
    `
}

export default createClient
