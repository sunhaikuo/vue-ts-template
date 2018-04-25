import fetch from './fetch'
export async function getRankingList(issue, rankType) {
    return await fetch(
        'http://party-search-api.mtime.cn/rankinglist/getRankingList?issue=' +
            issue +
            '&rankType=' +
            rankType
    )
}
export default getRankingList
