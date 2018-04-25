export interface Register {
    // 手机号
    mobile: number
    // 短信验证码
    smsCode: string
    // 短信Id
    smsCodeId: string
    // 发送短信验证码 的图片验证码
    imgCode: string
    // 图片验证码Id
    imgCodeId: string
}
export interface Inviter {
    // 邀请人Id
    inviterUserId: string
    // 邀请人头像
    inviterIcon: string
    // 邀请人昵称
    inviterNickName: string
}
