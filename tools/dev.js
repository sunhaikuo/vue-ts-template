process.env.NODE_ENV = 'development'
const webpack = require('webpack')
const WebpackConfig = require('./webpack.config')
const chalk = require('chalk')
const ora = require('ora')
const spinner = ora('正在编译环境...')
const fs = require('fs-extra')
const path = require('path')
const rm = require('rimraf')
// 要缓存的中间件列表
let middlewareList = []
let web = null
rm(path.join(__dirname, '../build'), err => {
    WebpackConfig.copyPackage().then(() => {
        start()
    })
})
function start() {
    spinner.start()
    Promise.all([compilerBundle(), compilerClient(), copyHTML()])
        .then(data => {
            const clientData = data && data.length > 1 && data[1]
            compilerServer(clientData)
            spinner.stop()
        })
        .catch(err => {
            spinner.stop()
            console.log('start', err)
        })
}

function compilerBundle() {
    const webpackServerConfig = WebpackConfig.getBundleConfig()
    const count = webpackServerConfig.length
    let index = 0
    const tasks = webpackServerConfig.map(item => {
        return new Promise((resolve, reject) => {
            webpack(item).watch({}, (err, stats) => {
                if (stats.compilation.errors.length > 0) {
                    stats.compilation.errors.forEach(item => {
                        try {
                            console.warn('Bundles代码有错误', item.file)
                            console.error(item.message)
                        } catch (error) {
                            console.error(errors)
                        }
                    })
                }
                if (err) {
                    formatLog('编译出现错误', 'red')
                    reject(stats.compilation.errors[0].message)
                } else {
                    index++
                    if (index == count) {
                        formatLog('服务端bundles打包完成, 共' + count + '个', 'cyan')
                    }
                    resolve()
                }
            })
        })
    })
    return Promise.all(tasks)
}

function compilerClient() {
    return new Promise((resolve, reject) => {
        const webpackConfig = WebpackConfig.getClientConfig()
        const compiler = webpack(webpackConfig)
        const devMiddleware = require('webpack-dev-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: true
        })
        const hotMiddleware = require('webpack-hot-middleware')(compiler, {
            log: () => {},
            timeout: 2000,
            heartbeat: 1000
        })
        middlewareList = middlewareList.concat([devMiddleware, hotMiddleware])
        devMiddleware.waitUntilValid(() => {
            formatLog('客户端资源构建完毕', 'green')
            resolve(middlewareList)
        })
    })
}

function compilerServer(ops) {
    formatLog('开始编译服务端', 'green')
    return new Promise((resolve, reject) => {
        const compiler = webpack(WebpackConfig.getServerConfig())
        compiler.watch({}, (err, stats) => {
            spinner.stop()
            if (stats.compilation.errors.length > 0) {
                stats.compilation.errors.forEach(item => {
                    try {
                        console.warn('Bundles代码有错误', item.file)
                        console.error(item.message)
                    } catch (error) {
                        console.error(errors)
                    }
                })
            }
            if (err) {
                formatLog('Index 编译出现错误', 'red')
                reject(err)
            } else {
                formatLog('Index 编译成功', 'green')
                startApp(ops)
                resolve()
            }
        })
    })
}

function startApp(middlewareList) {
    if (!web) {
        web = require('../build/index').default.dynamicServer(middlewareList, function() {
            console.log(chalk.cyan('服务器开始运行: '))
        })
    } else {
        web.close(function() {
            const mod = require.cache[require.resolve('../build/index')]
            delete require.cache[require.resolve('../build/index')]
            const ix = mod.parent.children.indexOf(mod)
            if (ix >= 0) mod.parent.children.splice(ix, 1)
            web = require('../build/index').default.dynamicServer(middlewareList, function() {
                console.log(chalk.green('web服务重新启动'))
            })
        })
    }
}

function formatLog(str, color) {
    console.log(chalk[color](`${new Date().toLocaleDateString()}: ${str}!`))
}

function copyHTML() {
    fs.copy(path.resolve(__dirname, 'test.html'), path.resolve(__dirname, '../build/test.html'), () => {
        console.log('copy mtlf文件成功！')
    })
}
