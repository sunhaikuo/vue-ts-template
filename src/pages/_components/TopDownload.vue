<template>
    <div class="download">
        <img src="../_assets/images/logo2.png" alt="">
        <div class="title">
            <h2>侃侃猩</h2>
            <p>Show the best of you</p>
        </div>
        <div class="btn">
            <a :href="'https://applink-party.mtime.cn/mtlf?'+link">打开</a>
        </div>
    </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component
export default class TopDownload extends Vue {
    /**要跳转的链接 */
    @Prop({
        default: () => {
            return ''
        }
    })
    link
}
</script>
<style lang='less'>
.download {
    font-weight: 300;
    border-bottom: 1px solid #d8d8d8; /*px*/
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 120px;
        height: 120px;
    }
    .title {
        margin-left: 20px;
        flex: 1;
        h2 {
            font-size: 34px;
            color: #4a4a4a;
            font-weight: 300;
        }
        p {
            margin-top: 6px;
            color: #4a4a4a;
            font-size: 30px;
            font-weight: 300;
        }
    }
    .btn {
        height: 60px;
        width: 150px;
        border: 1px solid #979797;
        line-height: 60px;
        text-align: center;
        border-radius: 10px;
        a {
            color: #4a4a4a;
            font-weight: 300;
        }
        font-size: 30px;
    }
}
</style>
