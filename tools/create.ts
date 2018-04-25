import client from './template/entry.client'
import server from './template/entry.server'
import router from './template/router.template'
import vuex from './template/vuex.template'
import page from './template/page.template'
import * as readline from 'readline'
import * as fs from 'fs-extra'
import * as path from 'path'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * 生成项目模块
 */
class Create {
    /**
     * 模块名称
     */
    private moduleName: string
    /**
     * 是否需要router
     */
    private isRouter: boolean
    /**
     * 是否需要vuex
     */
    private isVuex: boolean
    /**
     * 创建pages页面
     */
    private createPage() {
        let basePath = path.resolve(__dirname, '../src/pages/', this.moduleName)
        let pathStr = path.resolve(basePath, 'images')
        fs.mkdirsSync(pathStr)
        // 创建子文件时，不创建文件夹
        let pageHtml = page(this.isRouter)
        fs.writeFileSync(path.resolve(basePath, 'Main.vue'), pageHtml)
        if (this.isRouter) {
            pageHtml = page(false)
            fs.writeFileSync(path.resolve(basePath, 'Tab.vue'), pageHtml)
        }
    }
    /**
     * 创建router
     */
    private createRouter() {
        let basePath = path.resolve(__dirname, '../src/pages/', this.moduleName)
        fs.writeFileSync(path.resolve(basePath, 'router.ts'), router())
    }
    /**
     * 创建vuex
     */
    private createVuex() {
        let vuexPath = path.resolve(
            __dirname,
            '../src/store/modules/',
            this.moduleName + '.ts'
        )
        fs.writeFileSync(vuexPath, vuex())
    }
    /**
     * 创建entry.client
     */
    private createClient() {
        let clientConfig = client(this.moduleName, this.isRouter, this.isVuex)
        fs.writeFileSync(
            path.resolve(
                __dirname,
                '../src/entry/client/',
                this.moduleName + '.ts'
            ),
            clientConfig
        )
    }
    /**
     * 创建entry.server
     */
    private createServer() {
        let serverConfig = server(this.moduleName)
        fs.writeFileSync(
            path.resolve(
                __dirname,
                '../src/entry/server/',
                this.moduleName + '.ts'
            ),
            serverConfig
        )
    }
    /**
     * 问题方法
     * @param question 问题
     */
    private ask(question: string): any {
        return new Promise((resolve, reject) => {
            rl.question(question, answer => {
                resolve(answer)
            })
        })
    }
    /**
     * 设置问题
     */
    private async setQuestion() {
        return new Promise(async (resolve, reject) => {
            let moduleName: any = await this.ask('Input your module name ？')
            let isRouter: any = await this.ask(
                'Do you need Vue-Router？（yes/No）'
            )
            let isVuex: any = await this.ask('Do you need Vuex？（yes/No）')
            rl.close()
            if (!isRouter || isRouter.toLowerCase() === 'yes') {
                isRouter = true
            } else {
                isRouter = false
            }
            if (!isVuex || isVuex.toLowerCase() === 'yes') {
                isVuex = true
            } else {
                isVuex = false
            }
            if (
                typeof moduleName === 'string' &&
                typeof isRouter === 'boolean' &&
                typeof isVuex === 'boolean'
            ) {
                console.log('moduleName=', moduleName)
                console.log('isRouter=', isRouter)
                console.log('isVuex=', isVuex)
                this.moduleName = moduleName
                this.isRouter = isRouter
                this.isVuex = isVuex
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }
    /**
     * 开始执行
     */
    public async start() {
        let result = await this.setQuestion()
        if (result) {
            this.createPage()
            if (this.isRouter) {
                this.createRouter()
            }
            if (this.isVuex) {
                this.createVuex()
            }
            this.createClient()
            this.createServer()
            console.log(
                '----- 创建成功，请在src/routes/config.ts配置路由 -----'
            )
        } else {
            console.log('some input error!')
        }
    }
}

let create = new Create()
create.start()
