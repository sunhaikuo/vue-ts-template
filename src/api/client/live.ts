import axios from 'axios'
export async function checkRoom(roomId) {
    return await axios.get(
        'https://party-api-m.mtime.cn/room/checkRoom?roomNum=' + roomId
    )
}
