import axios from 'axios'
export default function getUserFeedDetail(userId, pageIndex, pageStamp) {
    return axios.get(
        'https://party-feeds-api.mtime.cn/user/feed/list.api?userId=' +
            userId +
            '&pageIndex=' +
            pageIndex +
            '&pageStamp=' +
            pageStamp
    )
}
