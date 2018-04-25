import fetch from './fetch'
export default async function getBillDetail(orderSn) {
    return await fetch(
        'https://party-payment-api.mtime.cn/payment/paymentDetail?orderSn=' +
            orderSn
    )
}
