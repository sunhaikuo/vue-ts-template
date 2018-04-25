export interface UserDetail {
    // 1关注 2未关注
    liked: number
    // 1拉黑 2 未拉黑
    isBlackUser: number
    // 关注用户数
    likesCount: number
    // 粉丝数
    follwersCount: string
    // 动态数
    dynamicCount: string
    userInfo: {
        // 年龄
        age: number
        // 头像
        avatarUrlPic: string
        // 生日 年月日的字符串
        brithdayTime: string
        // 性别 1男2女3保密
        gender: number
        // 用户Id
        id: number
        // 昵称
        nickname: string
        // 需要实名认证
        needAuthentication: boolean
        // 签名
        signature: string
        // 状态 1正常2禁用
        status: number
        // 视频头像Id
        videoAvatarId: string
        // 所在地省份Id
        currentProvinceId: number
        // 所在地省份名称
        currentProvinceName: string
        // 所在地城市Id
        currentCityId: number
        // 所在地城市名称
        currentCityName: string
        // 官方认证状态
        officialCertification: number
    }
}
