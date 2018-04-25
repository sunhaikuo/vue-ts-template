import * as apis from '../../src/api/server/wx'
import formatLog from '../formatLog'
// 微信客服接口
export default class WxAPI {
    /**
     * 微信小程序的业务域名检验文件
     */
    public static microWx() {
        return async (req, res, next) => {
            try {
                res.send('2f45c866d64da5ce0b16abb19ff914e8')
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 小程序客服接入
     */
    public static valiWxcs() {
        return async (req, res, next) => {
            try {
                formatLog.log('小程序客服接入=>come in')
                if (req.query.echostr) {
                    formatLog.log('小程序客服接入=>成功')
                    res.send(req.query.echostr)
                } else {
                    formatLog.log('小程序客服接入=>echostr为空')
                    res.send('echostr为空')
                }
            } catch (error) {
                next(error)
            }
        }
    }
    /**
     * 接受微信小程序的客服消息
     */
    public static wxcs() {
        return async (req, res, next) => {
            try {
                formatLog.log('小程序客服=>come in')

                let data = {
                    ToUserName: req.body.ToUserName,
                    FromUserName: req.body.FromUserName,
                    CreateTime: req.body.CreateTime,
                    MsgType: req.body.MsgType,
                    Content: req.body.Content,
                    MsgId: req.body.MsgId
                }
                formatLog.log('小程序客服=>参数:' + JSON.stringify(data))
                if (req.body && req.body.FromUserName) {
                    formatLog.log('小程序客服=>FromUserName:' + req.body.FromUserName)
                    let result: any = await apis.getwxCS({
                        touser: req.body.FromUserName,
                        msgtype: 'link',
                        link: {
                            title: '点此进入',
                            description: '『侃侃猩猜电影』小助手',
                            url:
                                'http://mp.weixin.qq.com/s?__biz=MzU3MDM1MDg0OQ==&tempkey=OTQxX0wvWE5zcWIvWmY1NWd6S2c5eXVyUWo1ZzhMMDJ0b3Bmb01QWW5xZExQRjJLYmhBaWhucDl6dGVQZ3Y0NDk3akdBTzFSVi1SVkVEMk5rZEZPMVQzbENoNEhIM2Y3N1pBeHFDYm9LTmFzckZnc051MTN2Tjk5NXZxM1lPaEZ1V3FWNWdsRkxadV82RFlUbmJrUU1TRkMxRUg3SS1lSjNYWmpvYS1mLWd%2Bfg%3D%3D&chksm=7cf18d6d4b86047ba7616f98910456ba59306869180a09ba0bff0d50ebf130cbad67ee07ad0d&scene=0&previewkey=Y%252BfA3kxl8T5ky%252BeyBQaBhsNS9bJajjJKzz%252F0By7ITJA%253D#wechat_redirect',
                            thumb_url: 'http://feature.mtime.cn/video/share/wx_logo.jpg'
                        }
                    })

                    formatLog.log('小程序客服请求完成=>:' + JSON.stringify(result))
                } else {
                    formatLog.log('小程序客服=>参数错误')
                }
                res.send('success')
            } catch (error) {
                next(error)
            }
        }
    }
}
