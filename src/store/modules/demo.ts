import { Rtmp } from '../../interface/IRtmp'
export default {
    state: {
        rtmp: {} as Rtmp,
        info: ''
    },
    mutations: {
        addRtmp(state, rtmp: Rtmp) {
            state.rtmp = rtmp
        },
        addInfo(state, info: string) {
            console.log('info', info, state)
            state.info = info
        }
    },
    getters: {
        rtmp: state => state.rtmp,
        info: state => state.info
    }
}
