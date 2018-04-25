import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import * as bugReport from 'bugreport'
import * as http from 'http'
import bodyParser from 'body-parser'
import router from '../src/routes/index'
import config from '../src/config'
import formatLog from '../src/formatLog'
/**
 * 服务端启动类
 */
class BootStrap {
    // express 实例
    app: any
    // 启动端口
    port: number = config.port || 3000
    // httpserver
    server: http.Server

    public run() {
        this.setBugReport()
        this.setExpress()
        this.setServer()
        this.sethandleException()
    }
    public setExpress() {
        this.app = express()
        this.app.use(express.static(path.join(__dirname, './client')))
        this.app.use(bodyParser.json())
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        )
        this.app.use(cookieParser())
        this.app.set('port', this.port)
        this.app.use('/', router)
    }
    public setBugReport() {
        bugReport.config({
            reportUrl: 'http://bug.mtime.cn/api/bug/handleBugReport',
            port: this.port
        })
    }
    public setServer() {
        this.server = http.createServer(this.app)
        this.server.on('error', this.onError.bind(this))
        this.server.on('listening', this.onListening.bind(this))
        this.server.listen(this.port)
    }

    private onError(error) {
        if (error.syscall !== 'listen') {
            throw error
        }
        let bind =
            typeof this.port === 'string'
                ? 'Pipe ' + this.port
                : 'Port ' + this.port
        /*eslint-disable indent */
        switch (error.code) {
            case 'EACCES':
                formatLog.error(bind + ' requires elevated privileges')
                process.exit(1)
                break
            case 'EADDRINUSE':
                formatLog.error(bind + ' is already in use')
                process.exit(1)
                break
            default:
                throw error
        }
    }

    private onListening() {
        let addr = this.server.address()
        let bind =
            typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
        formatLog.log('Listening on ' + bind)
    }
    private sethandleException() {
        // 全局未捕获异常
        process.on('uncaughtException', error => {
            formatLog.error('!!!uncaughtException!!!', error)
        })
    }
}
new BootStrap().run()
