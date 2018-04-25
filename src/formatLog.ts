/**
 * 格式化日志输出
 */
export default class FormatLog {
    public static log(...args) {
        let a = Array.from(arguments)
        let b = a.unshift('[' + new Date().toLocaleString() + ']')
        console.log.apply(console, a)
    }
    public static warn(...args) {
        let a = Array.from(arguments)
        let b = a.unshift('[' + new Date().toLocaleString() + ']')
        console.warn.apply(console, a)
    }
    public static error(...args) {
        let a = Array.from(arguments)
        let b = a.unshift('[' + new Date().toLocaleString() + ']')
        console.error.apply(console, a)
    }
}
