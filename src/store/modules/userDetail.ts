import { User } from '../../interface/IUser'
export default {
    state: {
        user: {} as User
    },
    mutations: {
        addUser(state, user: User) {
            state.user = user
        }
    },
    getters: {
        user: state => state.user
    }
}
