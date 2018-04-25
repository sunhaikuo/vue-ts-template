import axios from 'axios'
export function getRankingList(issue, rankType) {
    return axios.get(
        'https://party-search-api.mtime.cn/rankinglist/getRankingList?issue=' +
            issue +
            '&rankType=' +
            rankType
    )
}
