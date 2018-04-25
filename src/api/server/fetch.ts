import * as nodeFetch from 'node-fetch'
import formatLog from '../../formatLog'
export default function fetch(url: string, cookies?: any) {
    let arr = []
    for (let key in cookies) {
        arr.push(key + '=' + cookies[key] + ';')
    }
    let cookieStr = arr.join('')
    formatLog.log(cookieStr)
    let option = {
        headers: {
            cookie: cookieStr
        }
    }
    return new Promise((resolve, reject) => {
        let d1 = +new Date()
        nodeFetch(url, option)
            .then(res => res.text())
            .then(body => {
                try {
                    let d2 = +new Date()
                    formatLog.log(
                        '--->接口',
                        url,
                        '花费的时间为:',
                        d2 - d1,
                        '毫秒'
                    )
                    let json = JSON.parse(body)
                    resolve(json)
                } catch (e) {
                    reject(e)
                }
            })
    })
}
