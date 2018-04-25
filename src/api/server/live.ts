import fetch from './fetch'
export async function getRoomState(roomNum) {
    return await fetch(
        'http://party-api-m.mtime.cn/room/checkRoom?roomNum=' + roomNum
    )
}
export default getRoomState
