import View from '../controller/view'
import wxAPI from '../controller/wxAPI'
let config = {
    globalInterceptors: [],
    router: [
        {
            path: '/apple-app-site-association',
            con: View.sendAppleAppSiteJson()
        },
        {
            path: '/index',
            con: View.simpleView('index', {
                title: '首页',
                wxShareInfo: false
            })
        },
        {
            path: '/demo',
            con: View.demoView('demo', {
                title: 'demo页面',
                wxShareInfo: false
            })
        },
        // {
        //     path: /^\/user((\/?)|(\/.*))/,
        //     con: View.simpleView('user', {
        //         title: '用户详情页',
        //         wxShareInfo: false
        //     })
        // },
        {
            path: '/gamerank',
            con: View.gameRecordView('gamerank', {
                title: '排行榜',
                wxShareInfo: false
            })
        },
        {
            path: '/topicdetail',
            con: View.topicView({
                title: '话题详情',
                wxShareInfo: false
            })
        },
        {
            path: '/discoveryrank',
            con: View.rankingListView('discoveryrank', {
                title: '发现排行榜',
                wxShareInfo: false
            })
        },
        {
            path: '/live',
            con: View.liveView('live', {
                title: '侃侃猩，炫出你的热爱',
                wxShareInfo: {
                    title: '一群爱侃侃的猩猩',
                    summary: '欢乐内容直播中，一睹为快',
                    pic: 'http://feature.mtime.cn/video/share/wx_logo.jpg'
                }
            })
        },
        {
            path: '/exception',
            con: View.simpleView('exception', {
                title: '页面异常',
                wxShareInfo: false
            })
        },
        {
            path: '/gamerule',
            con: View.simpleView('gamerule', {
                title: '游戏规则',
                wxShareInfo: false
            })
        },
        {
            path: '/guessMovieRule',
            con: View.simpleView('guessMovieRule', {
                title: '活动规则',
                wxShareInfo: false
            })
        },
        // {
        //     path: '/teleprompter',
        //     con: View.simpleView('teleprompter', {
        //         title: '提词器',
        //         wxShareInfo: false
        //     })
        // },
        {
            path: '/follow',
            con: View.followView('follow', {
                title: '侃侃猩——展现真实的你',
                wxShareInfo: {
                    title: '侃侃猩—展现真实的你',
                    summary: '炫出你的热爱  不负好时光',
                    pic: 'http://feature.mtime.cn/video/share/wx_logo.jpg'
                }
            })
        },
        {
            path: '/gamerecord',
            con: View.gameRecordView('gamerecord', {
                title: '游戏记录',
                wxShareInfo: false
            })
        },
        {
            path: '/group',
            con: View.groupView('group', {
                title: '群组详情',
                wxShareInfo: false
            })
        },
        {
            path: '/download',
            con: View.simpleView('download', {
                title: '侃侃猩下载',
                wxShareInfo: {
                    summary: '炫出你的热爱  不负好时光',
                    title: '侃侃猩',
                    pic: ''
                }
            })
        },
        {
            path: '/mtlf',
            con: View.simpleView('mtlf', {
                title: '正在唤起App',
                wxShareInfo: false
            })
        },
        {
            path: '/userDetail',
            con: View.userDetailView('userDetail', {
                title: '用户详情',
                wxShareInfo: false
            })
        },
        {
            path: '/billList',
            con: View.simpleView('billList', {
                title: '购买记录',
                wxShareInfo: false
            })
        },
        {
            path: '/billDetail',
            con: View.billDetailView('billDetail', {
                title: '详情',
                wxShareInfo: false
            })
        },
        {
            path: '/agreement',
            con: View.simpleView('agreement', {
                title: '用户协议',
                wxShareInfo: false
            })
        },
        {
            path: '/explain',
            con: View.simpleView('explain', {
                title: '提现',
                wxShareInfo: false
            })
        },
        {
            path: '/newbiegift',
            con: View.giftPackageView('newbiegift', {
                title: '礼包',
                wxShareInfo: false
            })
        },
        {
            path: '/wRdbPJ60zA.txt',
            con: wxAPI.microWx()
        },
        {
            path: '/wxcs',
            method: 'post',
            con: wxAPI.wxcs()
        },
        {
            path: '/wxcs',
            method: 'get',
            con: wxAPI.valiWxcs()
        },
        {
            path: '/guide',
            con: View.simpleView('guide', {
                title: '下载侃侃猩App',
                wxShareInfo: false
            })
        },
        {
            path: '/inviteGM',
            con: View.inviteGM({
                title: '侃侃猩猜电影',
                wxShareInfo: {
                    title: '侃侃猩猜电影',
                    summary: '我正在侃侃猩猜电影，快来挑战我！',
                    pic: 'http://feature.mtime.cn/video/share/wx_logo.jpg'
                }
            })
        },
        {
            path: '/.well-known/apple-app-site-association',
            con: View.sendAppleAppSiteJson()
        },
        {
            path: '/MP_verify_wxODteTUqGeeZL5G.txt',
            con: View.sendWxSecurityFile()
        }
    ]
}
export function getRouterConfig() {
    let routerObj = {}
    config.router.forEach((item: any) => {
        let obj = {} as any
        let arr = item.path.split('/')
        let name = arr[arr.length - 1]
        if (!name) {
            throw new Error('router parse error, item is ' + item)
        }
        obj.name = name
        routerObj[name] = item
    })
    return routerObj
}

export default config
