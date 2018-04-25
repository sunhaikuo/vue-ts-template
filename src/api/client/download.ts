import axios from 'axios'
// 增加统计
export function setStaticData(ua, url) {
    axios.post('//cooperation.mtime.com/api/extra/static/add', {
        ua: ua,
        url: url
    })
}
