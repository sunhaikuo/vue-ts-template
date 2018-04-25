import fetch from './fetch'
export default async function userFeedDetail(userId) {
    return await fetch(
        'http://party-feeds-api.mtime.cn/user/feed/list.api?userId=' +
            userId +
            '&pageIndex=1'
    )
}
