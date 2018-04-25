/**
 * App操作相关,如下载/唤起/jsbridge
 */
export default {
    state: {
        param: ''
    },
    mutations: {
        download(state, param: string) {
            let url = 'https://applink-party.mtime.cn/mtlf?' + param
            console.log('---download', url)
            state.param = url
            window.location.href = url
        }
    }
}
