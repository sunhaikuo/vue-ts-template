export default {
    state: {
        // 手机号
        mobile: '234343',
        // 短信验证码
        smsCode: '',
        // 短信Id
        smsCodeId: '',
        // 发送短信验证码 的图片验证码
        imgCode: ''
    },
    mutations: {
        getSmsCode(state, mobile) {
            this.state.register.mobile = mobile
        },
        postInfo() {}
    },
    actions: {},
    getters: {
        mobile: state => state.mobile
    }
}
