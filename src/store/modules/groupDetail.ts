import GroupDetail from '../../interface/IGroupDetail'
export default {
    state: {
        groupDetail: {} as GroupDetail
    },
    mutations: {
        getGroupDetail(state, groupDetail: GroupDetail) {
            state.groupDetail = groupDetail
        }
    },
    getters: {
        groupDetail: state => state.groupDetail
    }
}
