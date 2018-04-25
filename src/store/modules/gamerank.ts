// import { Info } from '../../interface/Info'
export default {
    state: {
        gameName: '小游戏'
    },
    mutations: {
        setInfo(state, data) {
            state.gameName = data
        }
    }, // 同步更改
    actions: {}, // 异步更改
    getters: {
        gameName: state => state.gameName
    }
}
