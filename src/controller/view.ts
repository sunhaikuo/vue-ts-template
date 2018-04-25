import * as path from 'path'
import * as fs from 'fs-extra'
import * as apis from '../../src/api/server/topicDetail'
import IRouteOpts from '../interface/IRouteOpts'
import BaseView from './BaseView'
import groupDetailApi from '../../src/api/server/groupDetail'
import { getRoomState } from '../api/server/live'
import recordApi from '../api/server/gameRecord'
import rankListApi from '../api/server/discoveryRank'
import userDetailApi from '../api/server/userDetail'
import userFeedDetailApi from '../api/server/userFeedDetail'
import billListApi from '../api/server/billList'
import billDetailApi from '../api/server/billDetail'
import giftPackageApi from '../api/server/newbieGift'
import formatLog from '../formatLog'
class View extends BaseView {
    // 唤起APP的方法
    public static sendAppleAppSiteJson() {
        return async (req, res, next) => {
            try {
                res.set('Content-Type', 'application/json')
                res.sendFile(path.resolve(__dirname, './apple-app-site-association.json'), err => {
                    if (err) {
                        next(err)
                    }
                })
            } catch (error) {
                next(error)
            }
        }
    }
    // 微信安全提示文件
    public static sendWxSecurityFile() {
        return async (req, res, next) => {
            try {
                res.send('wxODteTUqGeeZL5G')
            } catch (error) {
                next(error)
            }
        }
    }

    /**
     * 常规的渲染
     * @param viewName 名称
     */
    public static demoView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            let html = await super.commitAndRender(viewName, data.title, data.wxShareInfo, {
                name: 'Vue-SSR测试页面',
                hUrl: 'https://www.gooogle.com',
                lUrl: 'https://www.gooogle.com'
            })
            res.send(html)
        }
    }

    /**
     * 常规的渲染
     * @param viewName 名称
     */
    public static simpleView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            try {
                let html = await super.commitAndRender(viewName, data.title, data.wxShareInfo, null)
                res.send(html)
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 游戏记录
     */
    public static gameRecordView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            let record: any = await recordApi(req.cookies)
            // 把微信分享的数据和首屏渲染的数据放到store中
            let html = await super.commitAndRender(viewName, data.title, false, record)
            res.send(html)
        }
    }
    /**
     * 礼包列表
     */
    public static giftPackageView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            let record: any = await giftPackageApi(req.cookies)
            // 把微信分享的数据和首屏渲染的数据放到store中
            let html = await super.commitAndRender(viewName, data.title, false, record)
            res.send(html)
        }
    }
    /**
     * 发现排行榜
     */
    public static rankingListView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            let record: any = await rankListApi(-1, 1)
            // 把微信分享的数据和首屏渲染的数据放到store中
            let html = await super.commitAndRender(viewName, data.title, false, record)
            res.send(html)
        }
    }
    /**
     * 直播房间
     */
    public static liveView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            let roomNum = req.query.roomNum
            let room: any = await getRoomState(roomNum)
            // 把微信分享的数据和首屏渲染的数据放到store中
            let html = await super.commitAndRender(viewName, data.title, data.wxShareInfo, room)
            res.send(html)
        }
    }
    /**
     * 话题详情页
     */
    public static topicView(data: IRouteOpts) {
        return async (req, res, next) => {
            try {
                let topicId = req.query.topicId || req.query.topicid
                if (topicId !== undefined) {
                    let topicInfo: any = await apis.getTopic(topicId)
                    if (topicInfo.code === 1) {
                        let topicLastHotInfos: any = await apis.getTopicHotDetail(topicId)
                        let topicLastNewInfos: any = await apis.getTopicNewDetail(topicId)
                        if (topicLastHotInfos.code === 1 && topicLastNewInfos.code === 1) {
                            topicInfo.data.topicId = topicId
                            let html = await super.commitAndRender(
                                'topicdetail',
                                (topicInfo.data && topicInfo.data.topicTitle) || data.title,
                                {
                                    summary: topicInfo.data.topicIntroduction || '炫出你的热爱 不负好时光',
                                    title: topicInfo.data.topicTitle || '侃侃猩',
                                    pic: topicInfo.data.topicImage || 'http://feature.mtime.cn/video/share/wx_logo.jpg'
                                },
                                {
                                    topic: topicInfo.data,
                                    topicLastHotInfos: topicLastHotInfos.data,
                                    topicLastNewInfos: topicLastNewInfos.data
                                }
                            )
                            res.send(html)
                        } else {
                            formatLog.error(topicLastHotInfos.msg)
                            formatLog.error(topicLastNewInfos.msg)
                            res.redirect('/exception')
                        }
                    } else {
                        formatLog.error(topicInfo.msg)
                        res.redirect('/exception')
                    }
                } else {
                    res.redirect('/exception')
                }
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 群组详情
     */
    public static groupView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            try {
                let groupId = req.query.groupId
                if (groupId !== undefined) {
                    let groupInfo: any = await groupDetailApi(groupId)
                    if (groupInfo.code === 1) {
                        let html = await super.commitAndRender(viewName, data.title, data.wxShareInfo, {
                            members: groupInfo.data.members,
                            memberCount: groupInfo.data.memberCount,
                            groupName: groupInfo.data.groupName,
                            groupId: groupId
                        })
                        res.send(html)
                    } else {
                        formatLog.error(groupInfo.msg)
                        res.redirect('/exception')
                    }
                } else {
                    res.redirect('/exception')
                }
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 老拉新
     */
    public static followView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            try {
                let userId = req.query.userId
                if (userId !== undefined) {
                    let userData: any = await userDetailApi(userId)
                    if (userData.code === 1) {
                        let html = await super.commitAndRender(
                            viewName,
                            (userData.data && userData.data.userInfo && userData.data.userInfo.nickname + '邀请你来侃侃猩') || data.title,
                            {
                                summary: '炫出你的热爱 不负好时光',
                                title: userData.data.userInfo.nickname + '邀请你来侃侃猩',
                                pic: userData.data.userInfo.avatarUrlPic
                            },
                            {
                                inviterUserId: userData.data.userInfo.id,
                                inviterNickName: userData.data.userInfo.nickname,
                                inviterIcon: userData.data.userInfo.avatarUrlPic
                            }
                        )
                        res.send(html)
                    } else {
                        res.redirect('/exception')
                    }
                } else {
                    res.redirect('/exception')
                }
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 用户详情
     */
    public static userDetailView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            try {
                let userId = req.query.userId
                if (userId !== undefined) {
                    let userData: any = await userDetailApi(userId)
                    if (userData.code === 1) {
                        let feedData: any = await userFeedDetailApi(userId)
                        if (feedData.code === 1) {
                            let shareTitle = '我分享了一张' + userData.data.userInfo.nickname + '的主页，快来围观！'
                            let shareSummary = userData.data.userInfo.signature
                            let sharePic = userData.data.userInfo.avatarUrlPic ? userData.data.userInfo.avatarUrlPic : 'http://feature.mtime.cn/video/share/wx_logo.jpg'
                            let html = await super.commitAndRender(
                                viewName,
                                (userData.data && userData.data.userInfo && userData.data.userInfo.nickname) || data.title,
                                {
                                    title: shareTitle,
                                    summary: shareSummary,
                                    pic: sharePic
                                },
                                {
                                    userData: userData.data,
                                    feedData: feedData.data
                                }
                            )
                            res.send(html)
                        } else {
                            formatLog.error(feedData.msg)
                            res.redirect('/exception')
                        }
                    } else {
                        formatLog.error(userData.msg)
                        res.redirect('/exception')
                    }
                } else {
                    res.redirect('/exception')
                }
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 账单列表
     */
    public static billListView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            try {
                let billList: any = await billListApi(req.cookies)
                if (billList.code === 1) {
                    let html = await super.commitAndRender(viewName, data.title, data.wxShareInfo, {
                        billList: billList.data
                    })
                    res.send(html)
                } else {
                    formatLog.error(billList.msg)
                    res.redirect('/exception')
                }
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 账单详情
     */
    public static billDetailView(viewName: string, data: IRouteOpts) {
        return async (req, res, next) => {
            try {
                let orderSn = req.query.orderSn
                if (orderSn) {
                    let billDetail: any = await billDetailApi(orderSn)
                    if (billDetail.code === 1) {
                        let html = await super.commitAndRender(viewName, data.title, false, {
                            detail: billDetail.data.paymentDetail
                        })
                        res.send(html)
                    } else {
                        formatLog.error(billDetail.msg)
                        res.redirect('/exception')
                    }
                } else {
                    res.redirect('/exception')
                }
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 邀请好友猜电影
     * @param data 分享信息
     */
    public static inviteGM(data: IRouteOpts) {
        return async (req, res, next) => {
            try {
                // 昵称
                let nickname = req.query.nickname
                // 头像
                let icon = req.query.icon
                // 主题名称
                let theme = req.query.theme
                let userid = req.query.userid
                // 邀请ID
                let inviteId = req.query.inviteId
                if (inviteId !== undefined && userid !== undefined) {
                    let info: any = data.wxShareInfo
                    let html = await super.commitAndRender(
                        'inviteGM',
                        data.title,
                        {
                            summary: info.summary,
                            title: info.title,
                            pic: icon || info.pic
                        },
                        {
                            nickname: nickname,
                            icon: icon,
                            theme: theme,
                            inviteId: inviteId,
                            userid: userid
                        }
                    )
                    res.send(html)
                } else {
                    res.redirect('/exception')
                }
            } catch (error) {
                next(error)
            }
        }
    }

    public static test() {
        return async (req, res, next) => {
            const html = fs.readFileSync(path.resolve(__dirname, 'test.html'))
            res.set('Content-Type', 'text/html')
            res.send(html)
        }
    }
}

export default View
