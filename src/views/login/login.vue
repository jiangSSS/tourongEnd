<template>
    <div class="all">
        <div class="loginBody">
            <img src="../../../static/app/img/login_bg.jpg" class="bg" alt="">
            <p class="loginTitle" v-if="fail">登录注册</p>
            <p class="loginTitle" v-else>找回密码</p>
            <div class="container_warp">
                <img src="../../../static/app/img/loginLogo.png" class="loginLogo">
                <div class="login_tabs" v-if="fail">
                    <van-tabs v-model="active">
                        <van-tab title="登录">
                            <div class="loginBox">
                                <div class="tel">手机或邮箱</div>
                                <div>
                                    <input v-model="loginData.account" class="login_input" type="text" placeholder="请输入手机或邮箱">
                                </div>
                                <div class="pwd">密码</div>
                                <div>
                                    <input v-model="loginData.pwd" class="login_input" type="password" placeholder="请输入密码">
                                </div>
                                <div class="clearfix">
                                    <div class="fll">
                                        <input v-model="login_checked" type="checkbox" @click="!login_checked" class="checkBox">
                                        <span class="loginDesc">两周内自动登录</span>
                                    </div>
                                    <div class="flr " @click="fail = false">
                                        <span class="loginDesc">
                                            忘记密码？
                                        </span>

                                    </div>
                                </div>
                                <mt-button type="default" class="loginBtn" @click="handleLogin">登录</mt-button>
                            </div>
                        </van-tab>
                        <van-tab title="注册">
                            <div class="loginBox">
                                <div class="tel">
                                    <span class="tel">手机号码</span>
                                </div>
                                <div>
                                    <input class="login_input" type="text" v-model="registerData.mobile" placeholder="请输入正确的手机号">
                                </div>
                                <div class="pwd">验证码</div>
                                <div class="clearfix code">
                                    <input v-model="registerData.code" class="login_input fll" type="text" placeholder="请输入验证码">
                                    <span v-show="code_show" @click="getCode(registerData.mobile)" class="gain">获取验证码</span>
                                    <span v-show="!code_show" class="gain">{{count}}s</span>
                                </div>
                                <div class="pwd">邮箱</div>
                                <div class="clearfix code">
                                    <input v-model="registerData.email" class="login_input" type="text" placeholder="请输入邮箱">
                                </div>
                                <div class="pwd">密码</div>
                                <div>
                                    <input v-model="registerData.pwd" class="login_input" type="password" placeholder="请输入密码" @keyup.enter="handleReg">
                                </div>
                                <div class="clearfix">
                                    <div class="fll">
                                        <input type="checkbox" v-model="register_checked" class="checkBox">
                                        <span class="loginDesc">我已阅读并同意
                                            <a @click="$router.push('/agreement')">《投融资讯平台服务协议》</a>
                                        </span>
                                    </div>
                                </div>
                                <mt-button type="default" class="loginBtn" @click="handleReg">立即注册</mt-button>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
                <div v-else class="login_tabs">
                    <div class="loginBox">
                        <div @click="fail = true" class="backLogin flr">返回登录</div>
                        <div class="tel">
                            <span class="tel">手机号码</span>
                        </div>
                        <div>
                            <input class="login_input" type="text" v-model="forgetData.mobile" placeholder="请输入正确的手机号">
                        </div>
                        <div class="pwd">验证码</div>
                        <div class="clearfix code">
                            <input v-model="forgetData.code" class="login_input fll" type="text" placeholder="请输入验证码">
                            <span v-show="code_show" @click="getCode(forgetData.mobile)" class="gain">获取验证码</span>
                            <span v-show="!code_show" class="gain">{{count}}s</span>
                        </div>
                        <div class="pwd">新密码</div>
                        <div>
                            <input v-model="forgetData.newPwd" class="login_input" type="password" placeholder="设置新密码" @keyup.enter="handleReg">
                        </div>
                        <div class="pwd">确认密码</div>
                        <div>
                            <input v-model="forgetData.reNewPwd" class="login_input" type="password" placeholder="确认新密码" @keyup.enter="handleReg">
                        </div>
                        <mt-button type="default" class="loginBtn" @click="handleFindPwd">提交</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Toast from 'muse-ui-toast';
    import * as Cookies from 'js-cookie'
    import { Toast } from 'mint-ui'
    import qs from "qs"
    export default {
        components: {
            Toast
        },
        data() {
            return {
                fail: true,
                active: 0,
                isClick: true,
                login_show: true,
                code_show: true,
                emailshow: false,
                login_checked: false,
                register_checked: true,
                loginData: {
                    account: "",
                    pwd: "",
                    loginType: "account_pwd"
                },
                registerData: {
                    mobile: "",
                    code: "",
                    pwd: "",
                    email: ""
                },
                forgetData: {
                    mobile: "",
                    code: "",
                    newPwd: "",
                    reNewPwd: ""
                },
                count: '',
                timer: null,
                hint: ""
            };
        },
        methods: {
            // 获取验证码
            getCode(mobile) {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.code_show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.code_show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000);
                }
                this.$axios.get("/jsp/common/baseUser/ctrl/ajaxSendMobileValidCode.jsp", { params: { mobile } }).then(res => {
                    if (res.success == "true") {
                        let instance = Toast('发送成功');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    } else {
                        let instance = Toast(res.message);
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                });
            },
            // 登录
            handleLogin() {
                this.$axios.post(`/jsp/wap/login/do/doLogin.jsp`, qs.stringify(this.loginData)).then(res => {
                    console.log("登录", res)
                    if (res.success == "true") {
                        if (this.login_checked) {
                            Cookies.set("userKey", res.data, { expires: 14 })
                        } else {
                            Cookies.set("userKey", res.data, { expires: 3 })
                        }
                        let instance = Toast(res.message);
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                        setTimeout(() => {
                            this.$router.push({ name: "home" })
                        }, 2000);
                    } else {
                        let instance = Toast(res.message);
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                })
            },
            // 注册
            handleReg() {
                if (this.registerData.mobile == '') {
                    let instance = Toast('请输入手机号');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                } else if (this.registerData.mobile.length != 11) {
                    let instance = Toast('手机号不正确');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                } else if (this.registerData.code == '') {
                    let instance = Toast('请输入验证码');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                } else if (this.registerData.email == '') {
                    let instance = Toast('请输入邮箱');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                } else if (this.registerData.pwd.length < 6) {
                    let instance = Toast('密码不能少于6位');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                } else {
                    this.$axios.get('/jsp/wap/login/do/doRegister.jsp', { params: { code: this.registerData.code, mobile: this.registerData.mobile, pwd: this.registerData.pwd, email: this.registerData.email } }).then(res => {
                        if (this.login_checked) {
                            Cookies.set("userKey", res.data, { expires: 14 });
                        } else {
                            Cookies.set("userKey", res.data, { expires: 3 });
                        }
                        if (res.success == "true") {
                            this.$axios.post('/jsp/wap/login/do/doLogin.jsp', qs.stringify({ mobile: this.registerData.mobile, pwd: this.registerData.pwd, loginType: this.loginData.loginType })).then(res => {
                                if (res.success == "true") {
                                    this.$router.push({ name: 'home' })
                                } else {
                                    let instance = Toast(res.message);
                                    setTimeout(() => {
                                        instance.close();
                                    }, 2000);
                                }
                            })
                        } else {
                            let instance = Toast(res.message);
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                        }
                    })
                }
            },
            handleFindPwd() {
                this.$axios.get("/jsp/wap/login/do/doEditPwd.jsp", {
                    params: {
                        code: this.forgetData.code,
                        mobile: this.forgetData.mobile,
                        newPwd: this.forgetData.newPwd,
                        reNewPwd: this.forgetData.reNewPwd
                    }
                }).then(res => {
                    if (res.success == "true") {
                        let instance = Toast(res.message);
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                        setTimeout(() => {
                            this.fail = true
                        }, 2000);
                    } else {
                        let instance = Toast(res.message);
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                });
            },
        },
    };
</script>
<style scoped lang="scss">
/deep/ .van-tabs__line{
    background-color: #005982
}
    .login_tabs {
        margin: 0 auto;
    }

    .loginBody {
        position: relative;
    }

    .loginLogo {
        width: 1.4rem;
        position: absolute;
        top: -0.8rem;
        right: 0.3rem;
    }

    .backLogin {
        color: #ccc
    }

    .container_warp {
        width: 80%;
        background: #fff;
        border-radius: 0.1rem;
        padding-top: 1rem;
        position: absolute;
        top: 1.8rem;
        left: 0.8rem;
    }

    .bg {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }

    .login_input {
        border: none;
        width: 100%;
        border-bottom: 1px solid #e2e2e2;
        padding: 0.15rem 0;
    }

    .loginBox {
        padding: 0.15rem 0.8rem;
        margin-bottom: 1rem;
    }

    .tel,
    .pwd {
        font-size: .26rem;
        padding: 0.15rem 0;
        color: rgb(87, 86, 86);

    }

    .loginBtn {
        background: #005982;
        color: #fff;
        width: 100%;
        height: 0.6rem;
        margin-top: 0.5rem;
    }

    .loginTitle {
        font-size: 0.4rem;
        font-family: "Microsoft YaHei";
        color: rgba(255, 255, 255, 0.8);
        position: absolute;
        top: 0;
        left: 40%;
    }

    .loginDesc,
    .loginDesc a {
        font-size: .2rem; // font-family: "Microsoft YaHei";
        color: rgba(51, 51, 51, 0.8);
        font-family: "PingFang";
        line-height: 0.489;

    }

    .checkBox {
        height: 0.2rem;
    }

    .code {
        position: relative;
    }

    .gain {
        position: absolute;
        right: 0;
        line-height: 2.5;
    }

    .email {
        color: #005982;
    }

    input::-webkit-input-placeholder {
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb( 200, 200, 200);
    }
</style>