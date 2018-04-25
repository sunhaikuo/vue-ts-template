import fetch from './fetch'
export async function getRecordDetail(cookies: any) {
    return await fetch(
        'http://party-guess-movie-api.mtime.cn/getDetailRecord.api',
        cookies
    )
}
export default getRecordDetail
