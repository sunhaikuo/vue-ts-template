import * as express from 'express'
import routerConfig from './config'
import * as bugReport from 'bugreport'
import formatLog from '../formatLog'
/**
 * 后端路由
 */
class Router {
    public static router = express.Router()
    public static run() {
        this.parseRouter(this.router)
        this.handerError()
        this.handerNotFound()
    }

    /**
     * 根据config 配置路由
     */
    public static parseRouter(router) {
        const rootRouterConfig = routerConfig.router
        const globalInterceptors = routerConfig.globalInterceptors
        if (rootRouterConfig && rootRouterConfig.length > 0) {
            handle(router, rootRouterConfig)
        }

        function handle(router, config) {
            config.forEach(item => {
                if (!item.path) return
                if (item.con) {
                    const method = item.method || 'all'
                    const interceptors = item.interceptors || globalInterceptors
                    router[method](item.path, ...interceptors, item.con)
                }
                if (item.children && item.children.length > 0) {
                    const subrouter = express.Router()
                    router.use(item.path, subrouter)
                    handle(subrouter, item.children)
                }
            })
        }
    }
    public static handerError() {
        this.router.use((err, req, res, next) => {
            bugReport.report(err)
            formatLog.error(err)
            if (process.env.NODE_ENV === 'prod') {
                // 记录到错误收集平台
                err = '应用程序内部错误'
            }
            res.format({
                'text/html': function() {
                    res.redirect('/download')
                },
                'application/json': function() {
                    return res.status(500).json({
                        success: false,
                        msg: err.toString()
                    })
                },
                default: function() {
                    res.redirect('/download')
                }
            })
        })
    }
    public static handerNotFound() {
        this.router.use('*', (req, res) => {
            const payload = {
                url: req.originalUrl,
                error: 'Not found'
            }
            res.format({
                'text/plain': function() {
                    res.status(404).send(payload)
                },
                'text/html': function() {
                    res.redirect('/download')
                },
                'application/json': function() {
                    return res.status(404).json(payload)
                },
                default: function() {
                    res.status(404).send(payload)
                }
            })
        })
    }
}
// return
// 500 error
Router.run()
let router = Router.router
export default router
