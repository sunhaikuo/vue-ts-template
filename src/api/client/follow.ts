import axios from 'axios'
import { Query } from '@mtime-node-mlibs/live-util-ts'
axios.defaults.baseURL = 'https://party-user-api.mtime.cn/'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'
export function refreshPic() {
    return axios.post('imagecode/getimagevalidatecode.api')
}
export function getValiCode(postData) {
    return axios.post(
        'smscode/loginorregistercode.api',
        Query.stringify(postData)
    )
}
export function register(postData) {
    return axios.post('user/sms/login.api', Query.stringify(postData))
}
