/**
 * 创建entry.server
 * @param module module名字
 */
function createServer(module) {
    return `
    import Vue from 'vue'
    import Vuex from 'vuex'
    import App from 'Pages/${module}/Main.vue'
    Vue.use(Vuex)
    const app = new Vue({
        render: h => h(App)
    })
    export default context => {
        return new Promise(resolve => {
            resolve(app)
        })
    }
    `
}
export default createServer
