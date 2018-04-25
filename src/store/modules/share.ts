// import { Info } from '../../interface/Info'
// import { Share, IShare } from '@mtime-node-mlibs/live-util-ts'
export default {
    state: {
        shareData: {}
    },
    mutations: {
        // state中增加数据
        addShare(state, shareData) {
            console.log('share:', shareData)
            state.shareData = shareData
            // Share.share(shareData)
        },
        // 发起分享
        share(state) {
            // state.shareData = shareData
            // Share.share(state.shareData)
        }
    }
}
