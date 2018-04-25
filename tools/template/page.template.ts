/**
 * createHtml
 * @param isRouter 是否需要router
 */
function createHtml(isRouter) {
    let routerHtml = `
        <router-link to="/Tab">Vue-router</router-link>
        <router-view></router-view>
    `
    return `
    <template>
        <div class="wrap">
            <p>{{msg}}</p>
            ${isRouter ? routerHtml : ''}
        </div>
    </template>
    <style lang="less" scoped>

    </style>
    <script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Provide } from 'vue-property-decorator'
    @Component
    export default class Comp extends Vue {
        @Provide() msg = 'Hello World'
        select(index: number) {
            
        }
        mounted() {

        }
    }
    </script>
    `
}

export default createHtml
