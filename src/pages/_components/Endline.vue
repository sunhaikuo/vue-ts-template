<template>

    <div class="endline" v-show="show">
        <span class="line"></span>
        <span class="dot first"></span>
        <span class="text">别刷了，没有了</span>
        <span class="dot last"></span>
        <span class="line"></span>
    </div>

</template>
<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component
export default class endLine extends Vue {
    // 是否显示底线
    @Prop({
        default: false
    })
    show: Boolean
}
</script>
<style lang='less' scoped>
.endline {
    padding: 15px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    .line {
        height: 1px;
        width: 50px;
        background-color: #dddddd;
    }
    .text {
        color: #bbbbbb;
        font-size: 24px;
    }
    .dot {
        height: 6px;
        width: 6px;
        transform: rotate(-45deg);
        background-color: #dddddd;
    }
    .dot.first {
        margin-left: 6px;
        margin-right: 15px;
    }
    .dot.last {
        margin-left: 15px;
        margin-right: 6px;
    }
}
</style>
