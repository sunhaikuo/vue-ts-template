import axios from 'axios'
import { Query } from '@mtime-node-mlibs/live-util-ts'
axios.defaults.baseURL = 'https://party-payment-api.mtime.cn/'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'
export function getGiftPackage() {
    return axios.get('giftpackage/list')
}
export function receiveGiftPackage(postData) {
    return axios.post(
        'giftpackage/receiveGiftPackage',
        Query.stringify(postData)
    )
}
