import fetch from './fetch'
export default async function getBillList(cookie: any) {
    return await fetch(
        'https://party-payment-api.mtime.cn/payment/paymentRecodeList?pageNo=1&pageSize=20',
        cookie
    )
}
