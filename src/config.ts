import * as path from 'path'
import * as fs from 'fs'
import formatLog from './formatLog'
/**
 * 服务端启动配置文件
 */
class Config {
    private static baseConfig = {
        default: {
            name: 'default',
            port: '8194'
        },
        dev: {
            name: 'dev'
        },
        qa: {
            name: 'qa'
        },
        pre: {
            name: 'pre'
        },
        prod: {
            name: 'prod'
        }
    }

    public static init() {
        /*eslint-disable*/
        let env =
            typeof process.env.NODE_ENV === 'undefined'
                ? 'dev'
                : process.env.NODE_ENV
        let config
        switch (env) {
            case 'prod':
                config = this.baseConfig.prod
                break
            case 'pre':
                config = this.baseConfig.pre
                break
            case 'qa':
                config = this.baseConfig.qa
                break
            default:
                config = this.baseConfig.dev
        }
        const dir = path.resolve(__dirname, './package.json')
        try {
            const pkgStr = fs.readFileSync(dir, 'utf8')
            const pkg = JSON.parse(pkgStr)
            config.cdn = pkg.cdn
        } catch (error) {
            env !== 'development' && formatLog.log('can not read package.json')
        }
        return {
            name: this.get('name', config),
            port: this.get('port', config),
            cdn: this.get('cdn', config),
            startup: new Date()
        }
    }

    private static getConfig(key, store) {
        const info = key.split('.')
        let cur = null
        info.map(item => {
            if (typeof store[item] !== 'undefined') {
                store = store[item]
                cur = store
            } else {
                cur = null
            }
        })
        return cur
    }

    private static get(key, config) {
        let value = this.getConfig(key, config)
        if (value === null) {
            value = this.getConfig(key, this.baseConfig.default)
            if (value === null && process.env.NODE_ENV !== 'development') {
                formatLog.warn('defaultConfig is undefined', key)
            }
        }
        return value
    }
}
export default Config.init()
