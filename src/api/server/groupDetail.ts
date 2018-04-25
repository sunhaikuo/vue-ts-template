import fetch from './fetch'
export default async function getGroupDetail(groupId) {
    return await fetch('http://party-api-m.mtime.cn/group?groupId=' + groupId)
}
