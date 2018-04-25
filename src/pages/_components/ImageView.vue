<template>
    <div :class="ClassName">
        <img v-if="agentUrl" :src="agentUrl" alt="" @load="imageLoaded">
    </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
@Component
export default class ImageView extends Vue {
    /**图片Url */
    @Prop({
        required: true
    })
    url: string

    @Watch('url')
    onUrlChanged(val) {
        this.url = val
        this.setImage()
    }
    @Prop({
        default: 4
    })
    clipType: number

    @Watch('clipType')
    onclipTypeChanged(val) {
        this.clipType = val
        this.setImage()
    }

    /**
     * 默认背景图像类型 1,2
     */

    @Prop({
        default: 1
    })
    defalutBgType: number

    @Watch('defalutBgType')
    onDefalutBgTypeChanged(val) {
        this.defalutBgType = val
        this.setImage()
    }
    // 目标图像
    imgLoad = null
    // 代理后的图像
    agentUrl = ''
    // 图片是否加载完成
    isloaded: boolean = false

    get ClassName() {
        if (!this.isloaded) {
            return 'image-view-wrapper ' + 'bg' + this.defalutBgType
        } else {
            return 'image-view-wrapper'
        }
    }
    setImage() {
        this.isloaded = false
        let h = this.$el.clientHeight
        let w = this.$el.clientWidth
        let componentUrl =
            this.url +
            `&width=${w}&height=${h}&quality=75&clipType=${this
                .clipType}&iswebp=true&v=1`
        this.agentUrl = 'https://imgproxy.mtime.cn/get.ashx?uri=' + componentUrl
    }
    imageLoaded() {
        this.isloaded = true
    }
    mounted() {
        this.setImage()
    }
}
</script>
<style lang='less' scoped>
.image-view-wrapper {
    height: 100%;
    width: 100%;
    background-color: #f2f2f2;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    img {
        width: 100%;
        height: 100%;
    }
}
.bg1 {
    background-image: url(../_assets/images/logo.png);
    background-size: 240px 77px;
}
.bg2 {
    background-image: url(../_assets/images/default-photo.png);
    background-size: contain;
}
</style>

