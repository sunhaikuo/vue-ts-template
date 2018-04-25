import fetch from './fetch'
export async function getTopic(topicId) {
    return await fetch(
        'http://party-topic-api.mtime.cn/topic/detail.api?topicId=' + topicId
    )
}
export async function getTopicHotDetail(topicId) {
    return await fetch(
        'http://party-feeds-api.mtime.cn/topic/feed/list.api?topicId=' +
            topicId +
            '&sortType=2&pageIndex=1'
    )
}
export async function getTopicNewDetail(topicId) {
    return await fetch(
        'http://party-feeds-api.mtime.cn/topic/feed/list.api?topicId=' +
            topicId +
            '&sortType=1&pageIndex=1'
    )
}
