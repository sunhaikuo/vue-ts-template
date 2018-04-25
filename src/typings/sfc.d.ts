/**
 *  为了解决import vue文件时报错问题
 */
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module 'components/*' {
    import Vue from 'vue'
    export default Vue
}
