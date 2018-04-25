<template>
    <div>
        <h3>{{msg}}</h3>
        <div class="wrap">
            <input type="text" v-model="text">
            <button @click="send">自发自收</button>
            <span class="info-wrap">收到的消息为：
                <span class="rec-text">{{info}}</span>
            </span>
        </div>
    </div>
</template>
<style lang="less" scoped>
.wrap {
    margin-left: 30px;
    margin-top: 20px;
}
h3 {
    margin-top: 50px;
    text-align: center;
}
input {
    height: 50px;
    line-height: 50px;
    border: 1px solid lightblue;
}
button {
    width: 150px;
    height: 50px;
    border-radius: 10px;
    background-color: lightcoral;
    text-align: center;
    color: #fff;
    margin-left: 10px;
}
.info-wrap {
    margin-left: 30px;
}
.rec-text {
    border-bottom: 1px solid lightblue;
}
</style> 
<script lang="ts">
import Vue from 'vue'
import { Rtmp } from 'Inter/IRtmp'
import { Mutation, Getter } from 'vuex-class'
import Component from 'vue-class-component'
import { Provide } from 'vue-property-decorator'
@Component
export default class App extends Vue {
    @Provide() text = 'Hello World'
    @Provide() msg = '测试Vuex通信'
    // 相当于：this.store.getter.rtmp
    @Getter('rtmp') user: Rtmp
    @Getter('info') info: string
    // 相当于：this.store.commit('addInfo', info)
    @Mutation('addInfo') addInfo
    send() {
        // this.$store.commit('addInfo', this.text)
        this.addInfo(this.text)
    }
}
</script>