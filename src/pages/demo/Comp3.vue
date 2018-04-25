<template>
    <div>
        <h3>{{msg}}</h3>
        <div class="info">
            <p>{{decodeURIComponent(data.name)}} </p>
            <p>{{decodeURIComponent(data.hUrl)}} </p>
            <p>{{decodeURIComponent(data.lUrl)}} </p>
        </div>
        <div class="img-wrap">
            <div class="img">
                <img src="./images/baidu.png" width="110" height="35" /> webpack处理img标签
            </div>
            <div class="img">
                <span class="baidu"></span>webpack处理background-image
            </div>
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
.img {
    margin: 30px;
}
.baidu {
    width: 110px;
    height: 35px;
    display: inline-block;
    background-image: url('./images/baidu.png');
    background-size: 100%;
}
</style>
<script lang="ts">
import Vue from 'vue'
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
import { User } from '../../interface/IUser'
import { Mutation, Getter } from 'vuex-class'
import Component from 'vue-class-component'
import { Provide } from 'vue-property-decorator'
import { getData } from '../../api/client/user'
@Component
export default class App extends Vue {
    @Provide() msg = '测试Ajax取数据'
    @Provide() data = {}
    @Mutation('addUser') addUser
    @Getter('info') info
    send() {
        let user = {} as User
        user.age = 109
        user.name = 'sunhaikuo'
        this.addUser(user)
    }
    mounted() {
        this.getData()
    }
    async getData() {
        let json: any = await getData()
        this.data = json.data.data
    }
}
</script>