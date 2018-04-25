import fetch from './fetch'
export default async function getGroupDetail(userId) {
    return await fetch(
        ' http://party-user-api.mtime.cn/getuser/getuserinfobyid.api?infoType=1&userId=' +
            userId
    )
}
