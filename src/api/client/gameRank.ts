import axios from 'axios'
export async function getData(type) {
    return await axios.get(
        'https://party-guess-movie-api.mtime.cn/rank/findRankingList.api?queryType=' +
            type,
        { withCredentials: true }
    )
}
