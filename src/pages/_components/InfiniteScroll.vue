<template>
    <div class="infinite-wrapper">
        <slot></slot>
        <div class="loading" v-show="showLoading">
            <img src="../_assets/images/banana.gif" alt="" v-if="loadingType==='loading'">
            <p v-else>{{loadingErrMsg===''?'加载失败···':loadingErrMsg}}</p>
        </div>
    </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component
export default class infiniteScroll extends Vue {
    // 滚动事件
    @Prop({
        default: () => {}
    })
    onScroll: Function
    // 是否显示loading
    @Prop({
        default: false
    })
    showLoading: Boolean
    @Prop({
        default: 'loading',
        validator: val => {
            return ['loading', 'error'].indexOf(val) !== -1
        }
    })
    // loading 类型 loading,error
    loadingType: string
    // 错误信息
    @Prop({
        default: ''
    })
    loadingErrMsg: string

    // 上一次滚动距离
    beforeScrollTop: number
    // 上一次滚动时间
    beforeScrollTime: any
    // 屏幕高度
    screenHeight: number
    // body 高度
    bodyHeight: number

    mounted() {
        setTimeout(() => {
            this.beforeScrollTop =
                document.documentElement.scrollTop ||
                window.pageYOffset ||
                document.body.scrollTop
            this.screenHeight = document.documentElement.clientHeight
            this.beforeScrollTime = new Date()
            window.addEventListener('scroll', () => {
                this.bodyHeight = document.body.clientHeight
                let afterScrollTop =
                    document.documentElement.scrollTop ||
                    window.pageYOffset ||
                    document.body.scrollTop
                let delta = afterScrollTop - this.beforeScrollTop
                //向下滑动时加载
                if (
                    delta > 0 &&
                    afterScrollTop + this.screenHeight >= this.bodyHeight
                ) {
                    let afterScrollTime: any = new Date()
                    let timespan: any = afterScrollTime - this.beforeScrollTime
                    if (timespan > 500) {
                        this.beforeScrollTime = afterScrollTime
                        this.onScroll()
                    }
                }
                this.beforeScrollTop = afterScrollTop
            })
        }, 4)

        window.addEventListener('resize', () => {
            this.screenHeight = document.documentElement.clientHeight
        })
    }
}
</script>
<style lang='less'>
.loading {
    margin-top: 2px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 10px 0px;
    img {
        height: 75px;
    }
    p {
        line-height: 75px;
        font-size: 26px;
        text-align: center;
        color: #47403b;
        opacity: 0.3;
    }
}
</style>
