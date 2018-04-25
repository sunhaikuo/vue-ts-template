export default () => {
    return `
    export default {
        state: {
            info: ''
        },
        mutations: {
            addInfo(state, info: string) {
                console.log('info', info)
                state.info = info
            }
        },
        getters: {
            info: state => state.info
        }
    }

    `
}
