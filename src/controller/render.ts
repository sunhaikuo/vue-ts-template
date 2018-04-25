import * as vueServerRender from 'vue-server-renderer'
import * as LRU from 'lru-cache'
import * as path from 'path'
import * as fs from 'fs-extra'
import htmlTemplate from './index.template'
import formatLog from '../formatLog'
class Render {
    /**
     * 缓存的json文件
     */
    private static cacheJson = {}
    /**
     * 缓存解析过的bundle文件
     */
    private static cacheBundle = {}

    /**
     * 缓存bundle方法
     * @param name bundle名称
     */
    private static cache() {
        const bundleJsonPath = path.join(__dirname, './bundles')
        const bundleFiles = fs.readdirSync(bundleJsonPath)
        bundleFiles.forEach(val => {
            if (val.indexOf('.json') > -1) {
                const matchs = val.match(/(\w+)-vue-ssr-bundle\.json/)
                if (!matchs) {
                    return
                }
                const key = matchs[1]
                this.cacheJson[key] = fs.readJsonSync(
                    path.join(bundleJsonPath, val)
                )
                const bundleRender = vueServerRender.createBundleRenderer(
                    this.cacheJson[key],
                    {
                        inject: false,
                        cache: LRU({
                            max: 10000,
                            maxAge: 1000 * 60 * 15 // 缓存时间 15分钟
                        }),
                        template: htmlTemplate.render(key)
                    }
                )
                this.cacheBundle[key] = bundleRender
                bundleRender.renderToString(
                    {
                        _$forCache: true,
                        title: ''
                    },
                    err => {
                        err && formatLog.error(err)
                    }
                )
            }
        })
    }
    /**
     * 启动服务时调用，用于缓存所有的bundle文件
     */
    public static init() {
        this.cache()
    }

    /**
     * render出HTML
     * @param name 组件名称
     */
    public static render(name: string, data?: any) {
        data = data || {}
        // 计算渲染时间
        const oldTime = +new Date()
        let bundleRender
        if (process.env.NODE_ENV !== 'development' && this.cacheBundle[name]) {
            bundleRender = this.cacheBundle[name]
        } else {
            const json = path.resolve(
                __dirname,
                `./bundles/${name}-vue-ssr-bundle.json`
            )
            bundleRender = vueServerRender.createBundleRenderer(json, {
                inject: false,
                cache: LRU({
                    max: 10000,
                    maxAge: 1000 * 60 * 15 // 缓存时间 15分钟
                }),
                template: htmlTemplate.render(name)
            })
            this.cacheBundle[name] = bundleRender
        }
        return new Promise((resolve, reject) => {
            bundleRender.renderToString(data, (err, html) => {
                if (err) {
                    reject(err)
                } else {
                    const newTime = +new Date()
                    const cost = newTime - oldTime
                    formatLog.log(
                        '渲染完成' + name + '...消耗时长为:' + cost + 'ms'
                    )
                    resolve(html)
                }
            })
        })
    }
}

export default Render
