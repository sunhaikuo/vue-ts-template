import fetch from './fetch'
export async function getGiftPackage(cookies: any) {
    return await fetch(
        'http://party-payment-api.mtime.cn/giftpackage/list',
        cookies
    )
}
export default getGiftPackage
