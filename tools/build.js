process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const WebpackConfig = require('./webpack.config')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs-extra')
const path = require('path')
const rm = require('rimraf')
let cdn
rm(path.join(__dirname, '../build'), err => {
    WebpackConfig.copyPackage().then(_cdn => {
        cdn = _cdn
        start()
    })
})
function start() {
    Promise.all([compilerClient(), compilerServer()])
        .then(data => {
            // imageMin().then(() => {
            console.log('build完成')
            // })
        })
        .catch(err => {
            console.log('start-error', err)
        })
}

function imageMin() {
    console.log('开始压缩图片')
    return new Promise((resolve, reject) => {
        const imagemin = require('imagemin')
        const imageminJpegtran = require('imagemin-jpegtran')
        const imageminPngquant = require('imagemin-pngquant')
        imagemin([path.resolve(__dirname, '../build/client/' + cdn + '/images/*.{jpg,png}')], path.resolve(__dirname, '../build/client/' + cdn + '/images'), {
            plugins: [imageminJpegtran(), imageminPngquant({ quality: '65-80' })]
        })
            .then(files => {
                console.log('压缩图片完成')
                resolve()
            })
            .catch(err => {
                console.log('压缩图片出错')
                console.log(err)
            })
    })
}

function copyMtlf() {
    fs.copy(path.resolve(__dirname, '_mtlf.js'), path.resolve(__dirname, '../build/mtlf.js'), () => {
        console.log('copy mtlf文件成功！')
    })
}

function compilerClient() {
    return new Promise((resolve, reject) => {
        const webpackConfig = WebpackConfig.getClientConfig(cdn)
        webpack(webpackConfig, (err, stats) => {
            if (stats.compilation.errors.length > 0) {
                stats.compilation.errors.forEach(item => {
                    try {
                        console.warn('client代码有错误', item.file)
                        console.error(item.message)
                    } catch (error) {
                        console.error(errors)
                    }
                })
            }
            if (err) {
                console.log('编译出现错误')
                reject(stats.compilation.errors[0].message)
            } else {
                console.log('客户端打包完成')
                resolve()
            }
        })
    })
}

function compilerServer() {
    return new Promise((resolve, reject) => {
        webpack(WebpackConfig.getServerConfig(), (err, stats) => {
            if (stats.compilation.errors.length > 0) {
                stats.compilation.errors.forEach(item => {
                    try {
                        console.warn('index代码有错误', item.file)
                        console.error(item.message)
                    } catch (error) {
                        console.error(errors)
                    }
                })
            }
            if (err) {
                console.log('Index 编译出现错误')
                reject(err)
            } else {
                console.log('Index 编译成功')
                resolve()
            }
        })
    })
}
