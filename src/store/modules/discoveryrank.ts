import { DiscoveryRank } from '../../interface/IDiscoveryRank'
export default {
    state: {
        DiscoveryRank: {} as DiscoveryRank
    },
    mutations: {
        getDiscoveryRank(state, DiscoveryRank: DiscoveryRank) {
            state.DiscoveryRank = DiscoveryRank
        }
    },
    getters: {
        discoveryRank: state => state.discoveryRank
    }
}
