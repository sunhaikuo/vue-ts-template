import { DateTime } from '@mtime-node-mlibs/live-util-ts'

class GlobalFilter {
    public static install(vue) {
        vue.filter('imageCut', GlobalFilter.imageCut)
        vue.filter('numerFormat', GlobalFilter.numerFormat)
        vue.filter('dateFormat', GlobalFilter.dateFormat)
    }
    /**
     * 图片裁剪
     * @param url 图片URL
     * @param w 宽度
     * @param h 高度
     * @param type 裁剪类型 1,2,3,4,5
     */
    public static imageCut(url, w, h, type) {
        return url.replace(
            /(\/[^\/]*?)(_(\w*?))?\.(jpg|png|jpeg|bmp)/im,
            '$1_' + w + 'X' + h + 'X' + type + '.$4'
        )
    }
    /**
     * 格式化数字
     * @param val 数值
     */
    public static numerFormat(val) {
        if (val) {
            let num = ~~val
            if ((num + '').length < 5) {
                return num + ''
            } else {
                return (num / 10000).toFixed(1).replace(/\.0/, '') + '万'
            }
        } else {
            return 0
        }
    }
    /**
     * 格式化时间
     * @param val 时间
     */
    public static dateFormat(val) {
        try {
            if (val) {
                const date = DateTime.dateFormat('xxxx', val)
                const nowTime = Math.floor(+new Date() / 1000)
                const nowDate = DateTime.dateFormat('xxxx', nowTime)
                const diff = nowTime - val
                if (Number.isInteger(diff)) {
                    let day = Math.floor(diff / (3600 * 24))
                    if (day > 0) {
                        if (day === 1) {
                            return '昨天' + date._h + ':' + date._m
                        } else {
                            if (nowDate.y === date.y) {
                                return date.mm + '-' + date.dd
                            } else {
                                return date.y + '-' + date.mm + '-' + date.dd
                            }
                        }
                    } else {
                        let hour = Math.floor(diff / 3600)
                        if (hour > 0) {
                            return hour + '小时前'
                        }
                        let min = Math.floor(diff / 60)
                        if (min > 0) {
                            return min + '分钟前'
                        } else {
                            return (diff > 0 ? diff : 1) + '秒前'
                        }
                    }
                } else {
                    return ''
                }
            } else {
                return ''
            }
        } catch (error) {
            return ''
        }
    }
}
const install = GlobalFilter.install
export default install
