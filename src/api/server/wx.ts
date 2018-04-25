import * as nodeFetch from 'node-fetch'
import * as fs from 'fs'
import * as path from 'path'
import formatLog from '../../formatLog'
function getwxCS(data) {
    return new Promise((resolve, reject) => {
        getAccess_token()
            .then(token => {
                nodeFetch('https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + token, {
                    method: 'POST',
                    body: JSON.stringify({
                        touser: 'oEuf40Cd9GWaMkmdq9hMC6f8q-dA',
                        msgtype: 'link',
                        link: {
                            title: '点此进入',
                            description: '『侃侃猩猜电影』小助手',
                            url:
                                'http://mp.weixin.qq.com/s?__biz=MzU3MDM1MDg0OQ==&tempkey=OTQxX0wvWE5zcWIvWmY1NWd6S2c5eXVyUWo1ZzhMMDJ0b3Bmb01QWW5xZExQRjJLYmhBaWhucDl6dGVQZ3Y0NDk3akdBTzFSVi1SVkVEMk5rZEZPMVQzbENoNEhIM2Y3N1pBeHFDYm9LTmFzckZnc051MTN2Tjk5NXZxM1lPaEZ1V3FWNWdsRkxadV82RFlUbmJrUU1TRkMxRUg3SS1lSjNYWmpvYS1mLWd%2Bfg%3D%3D&chksm=7cf18d6d4b86047ba7616f98910456ba59306869180a09ba0bff0d50ebf130cbad67ee07ad0d&scene=0&previewkey=Y%252BfA3kxl8T5ky%252BeyBQaBhsNS9bJajjJKzz%252F0By7ITJA%253D#wechat_redirect',
                            thumb_url: 'http://feature.mtime.cn/video/share/wx_logo.jpg'
                        }
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => res.text())
                    .then(body => {
                        try {
                            let json = JSON.parse(body)
                            resolve(json)
                        } catch (e) {
                            reject(e)
                        }
                    })
            })
            .catch(err => {
                reject(err)
            })
    })
}
function getAccess_token() {
    return new Promise((resolve, reject) => {
        nodeFetch('http://cooperation.mtime.com/api/redis/kkaccess_token')
            .then(res => res.text())
            .then(body => {
                try {
                    let json = JSON.parse(body)
                    if (json.success) {
                        resolve(json.token)
                    } else {
                        reject(json.err)
                    }
                } catch (e) {
                    reject(e)
                }
            })
    })
}
export { getwxCS }
