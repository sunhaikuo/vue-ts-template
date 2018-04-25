<template>
    <div class="wrap">
        <div class="top">
            <div class="col col1" :class="index == 1 ? 'selected':''" @click="select(1)">
                <router-link to="/comp1">SSR渲染首屏</router-link>
            </div>
            <div class="col col2" :class="index == 2 ? 'selected':''" @click="select(2)">
                <router-link to="/comp2">Vuex测试</router-link>
            </div>
            <div class="col col3" :class="index == 3 ? 'selected':''" @click="select(3)">
                <router-link to="/comp3">Ajax取数据页面</router-link>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less" scoped>
.wrap {
    width: 750px;
    height: auto;
    border: 1px solid gray;
    border-radius: 20px;
    margin: 0 auto;
    padding: 10px;
}
.col {
    border: 1px orange solid;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: none;
    width: 150px;
    line-height: 50px;
    height: 50px;
    text-align: center;
    margin-left: 10px;
    color: #222;
    cursor: pointer;
}
.selected {
    background-color: orange;
}
.selected a {
    color: #fff;
}
.content {
    width: 100%;
    height: 500px;
    border: 1px solid lightcoral;
    border-radius: 20px;
}
.top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
a {
    width: 100%;
    height: 100%;
    display: inline-block;
}
</style>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Provide } from 'vue-property-decorator'
@Component
export default class Comp extends Vue {
    @Provide() msg = 'Hello World-1'
    @Provide() index = -1
    select(index: number) {
        this.index = index
    }
    mounted() {
        // let routerName = this.$router.currentRoute.name
        // let index = routerName.split('_')[1]
        // if (index) {
        //     this.index = parseInt(index)
        // } else {
        //     this.index = 1
        // }
        // console.log('----', index)
        this.index = 1
    }
}
</script>