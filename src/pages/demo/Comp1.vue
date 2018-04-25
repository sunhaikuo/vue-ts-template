<template>
    <div>
        <h3>{{msg}}</h3>
        <div class="info">
            <p>{{decodeURIComponent(rtmp.name)}} </p>
            <p>{{decodeURIComponent(rtmp.hUrl)}} </p>
            <p>{{decodeURIComponent(rtmp.lUrl)}} </p>
        </div>

    </div>
</template>
<style lang="less" scoped>
h3 {
    margin-top: 50px;
    text-align: center;
}
.info {
    margin-top: 30px;
}
p {
    height: 50px;
    border-bottom: 1px solid lightblue;
    line-height: 50px;
    padding-left: 30px;
}
</style> 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Provide } from 'vue-property-decorator'
@Component
export default class Comp1 extends Vue {
    @Provide() msg = 'ServerRender的数据，通过Vuex转到前端'
    rtmp = {}
    mounted() {
        console.log(this.$store.state.data)
        this.rtmp = this.$store.state.data
    }
}
</script> 