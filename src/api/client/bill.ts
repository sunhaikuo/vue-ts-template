import axios from 'axios'
axios.defaults.withCredentials = true
export async function getBillList(pageNo, pageSize) {
    return await axios.get(
        'https://party-payment-api.mtime.cn/payment/paymentRecodeList?pageNo=' +
            pageNo +
            '&pageSize=' +
            pageSize
    )
}
export async function getBillDetail(orderSn) {
    return await axios.get(
        'https://party-payment-api.mtime.cn/payment/paymentDetail?orderSn=' +
            orderSn
    )
}
