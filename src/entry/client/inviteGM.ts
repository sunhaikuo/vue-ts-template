import Vue from 'vue'
import App from 'Pages/inviteGM/Main.vue'
import created from './_base'
new Vue({
    el: '#app',
    created: created,
    render: h => h(App)
})
