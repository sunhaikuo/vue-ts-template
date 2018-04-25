let ExtractTextPlugin = require('extract-text-webpack-plugin')
let webpack = require('webpack')
let merge = require('webpack-merge')
let path = require('path')
let fs = require('fs-extra')
let { File, DateTime } = require('@mtime-node-mlibs/live-util-ts')
let pxtorem = require('postcss-pxtorem')
var OutPutEntryAssetsPlugin = require('./outPutEntryAssetsPlugin')
var nodeExternals = require('webpack-node-externals')

let isProduction = process.env.NODE_ENV === 'production'
let rootPath = path.resolve(__dirname, '../')

/**
 * 服务端线上打包配置
 */
function getServerConfig() {
    const entryPath = isProduction ? path.join(__dirname, './prd-server.ts') : path.join(__dirname, './dev-server.ts')
    return {
        entry: {
            app: entryPath
        },
        target: 'node',
        devtool: 'nosources-source-map',
        output: {
            path: path.join(rootPath, 'build'),
            filename: 'index.js',
            libraryTarget: isProduction ? 'var' : 'commonjs2'
        },
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js',
                Entry: path.resolve(__dirname, '../src/entry/'),
                Store: path.resolve(__dirname, '../src/store/'),
                Inter: path.resolve(__dirname, '../src/interface/'),
                Pages: path.resolve(__dirname, '../src/pages/'),
                Api: path.resolve(__dirname, '../src/api/'),
                Component: path.resolve(__dirname, '../src/pages/_components/')
            },
            extensions: ['.js', '.less', '.vue', '.json', '.ts']
        },
        externals: [
            nodeExternals({
                modulesDir: path.join(rootPath, 'node_modules')
            })
        ],
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false,
            setImmediate: false
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }
            ]
        }
    }
}

/**
 * 客户端基本配置
 */
function getClientConfig(cdn) {
    const wpConfig = {}
    // 定义应用入口
    wpConfig.entry = getClientEntry()
    wpConfig.resolve = {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            Entry: path.resolve(__dirname, '../src/entry/'),
            Store: path.resolve(__dirname, '../src/store/'),
            Inter: path.resolve(__dirname, '../src/interface/'),
            Pages: path.resolve(__dirname, '../src/pages/'),
            Api: path.resolve(__dirname, '../src/api/'),
            Component: path.resolve(__dirname, '../src/pages/_components/')
        },
        extensions: ['.js', '.less', '.vue', '.json', '.ts'] // 可以不加后缀, 直接使用 import xx from 'xx' 的语法
    }
    // 各种loader
    wpConfig.module = {
        rules: getRules()
    }
    wpConfig.devtool = isProduction ? 'nosources-source-map' : '#cheap-module-eval-source-map'
    wpConfig.output = {}
    wpConfig.plugins = []
    wpConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
    if (isProduction) {
        wpConfig.output.path = path.join(rootPath, 'build/client/') + cdn
        wpConfig.output.publicPath = '//static1.mtime.cn/' + cdn + '/'
        wpConfig.output.filename = 'script/[name].js'
        wpConfig.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        )
        wpConfig.plugins.push(
            new webpack.optimize.CommonsChunkPlugin({
                names: 'vendor',
                minChunks: function (module, count) {
                    return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
                }
            })
        )
        wpConfig.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: true
            })
        )
        // extract css into its own file
        wpConfig.plugins.push(new ExtractTextPlugin('css/[name].css'))
        wpConfig.plugins.push(
            new OutPutEntryAssetsPlugin({
                filename: '../../../bundles/client-assets.json'
            })
        )
    } else {
        wpConfig.output.path = path.join(rootPath, 'build/client')
        wpConfig.output.publicPath = '/'
        wpConfig.output.filename = '[name].js'

        wpConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
        wpConfig.plugins.push(
            new OutPutEntryAssetsPlugin({
                filename: 'client-assets.json'
            })
        )
    }
    return wpConfig
}

/**
 * 获取客户端打包入口
 */
function getClientEntry() {
    let entryPath = path.join(rootPath, 'src/entry/client')
    if (!fs.existsSync(entryPath)) {
        throw new Error('Server Entry Path must be in /src/entry/server')
    }
    let pathArr = File.getFiles(entryPath, true, true)
    let nameArr = File.getFiles(entryPath, false, false)
    let entry = {}
    // dev 时 client应用到webpack热加载上
    let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    nameArr.forEach((val, index) => {
        if (!isProduction) {
            entry[val] = [pathArr[index], hotMiddlewareScript]
        } else {
            entry[val] = pathArr[index]
        }
    })
    return entry
}
/**
 * vue 组件内css配置
 */
function getVueLoaderConfig(isSSR) {
    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: isProduction,
            sourceMap: !isProduction
        }
    }
    /**
     * 生成loader
     */
    function generateLoaders(loader) {
        const loaders = [cssLoader, 'px2rem-loader?remUnit=75&remPrecision=8']
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: {
                    sourceMap: !isProduction
                }
            })
        }
        if (isProduction && !isSSR) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        less: generateLoaders('less')
    }
}
/**
 * webpack loader
 */
function getRules(isSSR) {
    let rules = [
        {
            test: /\.ts$/,
            exclude: /node_modules|vue\/src/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/]
            }
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: getVueLoaderConfig(isSSR),
                transformToRequire: {
                    img: 'src',
                    div: 'data-defalut',
                    image: 'xlink:href'
                }
            }
        },
        {
            test: /\.css$/,
            use: getCssConfig()
        },
        {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'images/[name]-[hash:5].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1,
                name: 'fonts/[name].[ext]'
            }
        }
    ]
    function getCssConfig() {
        if (isProduction) {
            return ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'px2rem-loader?remUnit=75&remPrecision=8'
                    }
                ]
            })
        } else {
            return [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'px2rem-loader?remUnit=75&remPrecision=8'
                }
            ]
        }
    }
    return rules
}

function copyPackage() {
    return new Promise((resolve, reject) => {
        const packageInfo = fs.readJsonSync(rootPath + '/package.json')
        const name = packageInfo.name
        const version = DateTime.dateFormat('yyMMddHHmmss')
        const cdn = name + '/' + version
        packageInfo.cdn = cdn
        // 写入package.json
        const packageDir = path.join(rootPath, 'build')
        fs.mkdirsSync(packageDir)
        fs.writeJSONSync(packageDir + '/package.json', packageInfo)

        // 如果存在npm-shirnkwrap.json 文件则拷贝到build目录下
        if (fs.existsSync(rootPath + '/yarn.lock')) {
            fs.copySync(rootPath + '/yarn.lock', rootPath + '/build/yarn.lock')
        }
        if (fs.existsSync(rootPath + '/tools/apple-app-site-association.json')) {
            fs.copySync(rootPath + '/tools/apple-app-site-association.json', rootPath + '/build/apple-app-site-association.json')
        }
        resolve(cdn)
    })
}

module.exports = {
    getServerConfig,
    getClientConfig,
    copyPackage
}
