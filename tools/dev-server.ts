import * as express from 'express'
import * as http from 'http'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import router from '../src/routes/index'

class DevBootStrap {
    // express 实例
    app: any
    // 启动端口
    port: number = 8194
    // httpserver
    server: http.Server

    constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        )
        this.app.use(cookieParser())
        this.app.set('port', this.port)
    }
    public dynamicServer(middlewarelist, cb) {
        let port = this.port
        middlewarelist.forEach(middleware => {
            this.app.use(middleware)
        })
        this.app.use('/', router)
        const server = http.createServer(this.app)
        const sockets = []
        function onError(err) {
            console.log(err)
        }
        function onListen() {
            cb && typeof cb === 'function' && cb()
            console.log('http://localhost:' + port)
        }
        function onConnection(socket) {
            sockets.push(socket)
            socket.once('close', function() {
                sockets.splice(sockets.indexOf(socket), 1)
            })
        }
        server.on('error', onError)
        server.on('listening', onListen)
        server.on('connection', onConnection)
        server.listen(this.port)
        const r = {
            close: function(done) {
                sockets.forEach(function(socket) {
                    socket.destroy()
                })
                server.close(err => {
                    console.log('web服务关闭')
                    if (err) {
                        done(err)
                    }
                    done()
                })
            }
        }
        return r
    }
}

export default new DevBootStrap()
