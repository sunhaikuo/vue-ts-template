import axios from 'axios'
export function getTopicHotDetail(topicId, pageIndex, pageStamp) {
    return axios.get(
        'https://party-feeds-api.mtime.cn/topic/feed/list.api?topicId=' +
            topicId +
            '&sortType=2&pageIndex=' +
            pageIndex +
            '&pageStamp=' +
            pageStamp
    )
}
export function getTopicNewDetail(topicId, pageIndex, pageStamp) {
    return axios.get(
        'https://party-feeds-api.mtime.cn/topic/feed/list.api?topicId=' +
            topicId +
            '&sortType=1&pageIndex=' +
            pageIndex +
            '&pageStamp=' +
            pageStamp
    )
}
