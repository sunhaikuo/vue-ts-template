export default interface ITopicDetail {
    // feed流推荐实体Id，long型
    feedId: number
    // feed类型，跟推荐返回枚举一致。1 图文、2视频文字动态、3 直播、4 视频影评、5 图文影评、6 表情评分
    feedType: number
    // 发布者编号
    relatedId: number
    // 发布者类型（1 电影 、2 影人、4 用户），int型
    relatedType: number
    // 名称（用户名、主影人名、主影片名）
    name: string
    // 头像
    headImg: string
    // 用户认证类型
    userCertType: number
    // 定位信息
    locateDesc: string
    // 时间戳，unix时间戳，单位描述，long型
    pulishTime: number //
    // 是否关注
    isFollow: Boolean
    // 是否自己发布的
    isOwn: Boolean
    // 评论数
    commentCount: number
    // 点赞数
    praiseCount: number
    // 评论数,String
    commentCountDesc: string
    // 点赞数,String
    praiseCountDesc: string
    // 是否自己点赞
    selfPraise: Boolean
    // 关联话题
    relatedTopic: [
        {
            // 话题编号
            topicId: string
            // 话题名称
            name: string
        }
    ]
    // 动态内容
    feed: {
        // 动态内容
        content: string
        movie: {
            // 影片Id
            movidId: number
            // 影片名称
            name: string
            // 影片英文名称
            nameEn: string
            // 年代
            year: string
            // 影片封面图
            img: string
            // 1 推荐，2 不推荐，0 无选择
            recommendStatus: number
        }
    }
    // 图片动态显示， 1 单张图、2 多张图片、3 视频、4 直播
    feedImageType: number
    // 单张图或多张图，仅feedImageType等于1 、2时有意义
    feedImages: Array<string>
    video: {
        // 视频标题
        title: string
        // 视频Id,long型
        videoId: number
        // 视频来源
        videoSourceType: number
        // 封面图
        image: string
        // 时长
        length: number
        // 播放次数
        playCount: number
        // 宽度， int 型
        width: number
        // 高度 ，int 型
        height: number
    }
    live: {
        // 直播缩略图
        image: string
        liveId: string
        // 时间戳
        time: number
        // 直播标题
        title: string
        // 1直播中  -1直播结束   -2 回看
        status: number
        // 直播分享链接
        shareUrl: string
        // 直播观看人数
        liveWathers: number
        // 直播观看人数 ,String
        liveWathersDesc: string
    }
    // app埋点参数
    version: string
    // app埋点参数
    source: string
    // 查询下一页的标识
    pageStamp: string
}
