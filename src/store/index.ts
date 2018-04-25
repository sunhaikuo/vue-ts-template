import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let globalModule = {
    state: {
        param: ''
    },
    mutations: {
        download(state, param: string) {
            // 先上线, 不考虑APP唤起, 直接跳到企业版的地址
            let url = 'https://www.pgyer.com/ikjv'
            // let url = 'https://applink-party.mtime.cn/mtlf?' + param
            console.log('---download', url)
            window.location.href = url
        }
    }
}

export default module => {
    return new Vuex.Store({
        modules: {
            globalModule,
            module
        }
    })
}
