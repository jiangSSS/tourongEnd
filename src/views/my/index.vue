<template>
    <div>
        <div class="header" style="height:0">
            <mt-header title="个人中心" class="header-title"></mt-header>
        </div>
        <div class="all">
            <div class="detail">
                <div class="bg">
                    <img src="../../../static/app/img/bg-header.jpg" class="sendHeader" alt="">
                    <div class="userBox">
                        <div class="clearfix usera">
                            <div class="fll userAvatar">
                                <div class="avatarBox">
                                    <img :src="$url +  userInfo.headImgPath" v-if="userInfo.headImgPath != ''" class="avatar">
                                    <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188149577,2949073731&fm=26&gp=0.jpg" v-else class="avatar">
                                    <span class="editUser" @click="$router.push('/userInfo')">
                                        <img src="../../../static/app/img/my/edit.jpg" class="edit">
                                    </span>
                                </div>
                                <div class="userName">{{userInfo.name}}</div>                                
                            </div>
                            <div class="fll userInfo">
                                <!-- <div>       
                                    <span v-if="userInfo.authenticationName != ''"><span>已认证:</span><span class="demand">{{userInfo.authenticationName}}</span> </span>
                                    <span v-else class="demand">待审核</span>
                                </div> -->
                                <div class="attest">
                                    <span class="num" :class="{actived:userInfo.authenticationName}">
                                        <i class="iconfont icon-touzi"></i>投资方</span>
                                    <span class="num" :class="{actived:userInfo.authenticationName}">
                                        <i class="iconfont icon-xiangmu1"></i>项目方</span>
                                    <span class="num" :class="{actived:userInfo.authenticationName}">
                                        <i class="iconfont icon-zhuanjia"></i>专家</span>
                                </div>
                                
                                <!-- <div>{{userInfo.mobile}}</div> -->
                                <div>{{userInfo.company}}</div>
                                <div v-if="isVip != '0'" class="isVipColor" @click="$router.push({name:'vip'})">
                                    <i></i> 会员权益中心</div>
                                <div v-else class="equity" @click="$router.push({name:'vip'})">
                                    <i></i> 会员权益中心</div>
                            </div>
                            <!-- <div class="flr messageBox" @click="$router.push('/message/sysMessage')">
                                <i class="iconfont icon-xiaoxi message"></i>
                                <span class="newNum" v-if="this.num != '0'">{{num}}</span>
                            </div> -->
                        </div>
                        <div class="weekLsit">
                            <router-link to="/weekList">
                                <div class="vip">VIP会员特权</div>
                                <div to="/weeklist" class="beforeWeek">
                                    <span class="numbers" v-if="weekLists&&weekLists.length != 0">{{weekLists[0].addTimeStr.substr(0,4)}}年第{{count}}期</span>
                                    <span class="numbers" v-else>暂无周报</span>
                                </div>
                                <div to="/weeklist" class="goo">111</div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div>
                    <router-link to="/fastNews">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a1.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">及时快报</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/vip">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a2.jpg" class="icon" alt="">
                            <div class="nums fll">
                                <span class="myName">会员权益中心</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/member">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a3.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">会员认证</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/myFocus">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a4.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">我的关注</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/myProject">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a5.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">我的项目</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/myMoney">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a6.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">我的资金</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/myActivity">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a7.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">我的活动</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/setting">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a8.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">系统设置</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/demand">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a9.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">需求填报</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </router-link>
                    <!-- <router-link to=""> -->
                    <div @click="tokefu">
                        <div class="myDetail clearfix">
                            <img src="../../../static/app/img/my/a10.jpg" class="icon" alt="">
                            <div class="fll">
                                <span class="myName">在线客服</span>
                                <i class="iconfont icon-xiangyou flr"></i>
                            </div>
                        </div>
                    </div>

                    <!-- </router-link> -->
                </div>
                <div class="logout" @click="loginOut">
                    退出登录
                </div>
            </div>
        </div>
        <Footer class="footer"></Footer>
    </div>

</template>

<script>
    // import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    import * as Cookies from 'js-cookie'
    import { Toast } from 'mint-ui'
    export default {
        components: {
            Footer,
            // Header,
            Toast
        },
        data() {
            return {
                userInfo: [],
                messageCount: "",
                weekLists: [],
                count: 1,
                num: "",
                isVip:"0"
            }
        },
        methods: {
            getUserData() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonUserInfo.jsp`).then(res => {
                    console.log("用户信息", res)
                    this.userInfo = res.data.userInfo
                    this.isVip = res.data.userInfo.isVip
                })
            },
            loginOut() {
                Cookies.remove('userKey')
                this.login = false
                let instance = Toast('已退出，即将返回登录页  ');
                setTimeout(() => {
                    instance.close();
                }, 2000);
                setTimeout(() => {
                    this.$router.push('/login')
                }, 1000)
            },
            tokefu() {
                window.open('https://tb.53kf.com/code/app/10193554/1', '_blank')
            },
            getMessageCount() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonSysMsgNum.jsp`).then(res => {
                    console.log("未读数量", res)
                    this.num = res.data
                })
            },
            getWeekData(pn) {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonWeeklyList.jsp`, { params: { pageNumber: pn } }).then(res => {
                    console.log("周报列表", res)
                    this.weekLists = res.data.pageList
                    this.count = Number(res.data.pagination.totalCount)
                })
            },

        },
        created() {
            this.getUserData()
            this.getMessageCount()
            this.getWeekData()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .detail {
        padding-bottom: 1.1rem;
    }

    img {
        width: 100%
    }

    .mint-header {
        background: transparent !important;
        color: rgba(255, 255, 255, .8) !important;
        //position: fixed;
        position: relative;
        height: 0.86rem;
        top: 0.2rem;
        right: 0;
        left: 0;
        width: 100%;
        font-size: .4rem;
        z-index: 1000
    }

    .bg {
        position: relative;
        height: 5.5rem;
        background: #f3f5f7
    }

    .userBox {
        background: #fff;
        margin: .3rem;
        border-radius: .2rem;
        position: absolute;
        top: 1rem;
        width: 92%;
    }

    .usera {
        border-bottom: 1px solid #f3f5f7
    }

    .avatarBox {
        // border: 1px solid #ccc;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        position: relative;
    }

    .edit {
        width: .5rem;
        border-radius: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: .4rem;
    }

    .editUser {
        background: #fff;
    }

    .userAvatar {
        padding: .2rem;
        text-align: center;
        vertical-align: middle;
        .avatar {
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 50%;
            text-align: center;
        }
        .userName {
            text-align: center;
        }
    }



    .userInfo {
        font-size: .28rem;
        color: rgb( 102, 102, 102);
        line-height: 1.758;
        margin-top: .2rem;
        padding-left: .2rem
    }

    .vip {
        font-size: .36rem;
        font-family: "PingFang";
        color: rgb( 159, 141, 108);
        font-weight: bold;
        line-height: 0.938;
        position: absolute;
        left: 30%;
        top: 26%
    }

    .message {
        font-size: .45rem;

    }

    .messageBox {
        margin: .2rem .3rem;
        position: relative;
    }

    .newNum {
        background: #e75225;
        display: inline-block;
        border-radius: 100%;
        width: .3rem;
        font-size: .18rem;
        text-align: center;
        color: #fff;
        position: absolute;
        left: .25rem;
        bottom: .4rem;
    }

    .beforeWeek {
        font-size: .25rem;
        color: rgb( 159, 141, 108);
        line-height: 1.926;
        position: absolute;
        left: 30%;
        top: 47%
    }

    .goo {
        position: absolute;
        right: 7%;
        top: 30%;
        width: .6rem;
        height: .6rem;
        opacity: 0;
    }

    .weekLsit {
        height: 1.6rem;
        background: url("../../../static/app/img/weekList.jpg") no-repeat center;
        background-size: 92%;
        position: relative;
    }

    .myDetail {
        color: #666;
        padding: 0 .2rem;
        background: #fff;

        .myName {
            padding-left: .2rem;
            display: inline-block;
            font-family: "PingFang";
            color: rgb( 51, 51, 51);
            line-height: 3;
        }
        .iconfont {
            line-height: 3
        }
        .icon {
            width: .3rem;
            margin-top: .4rem;
            float: left;
        }
    }

    .myDetail div {
        display: flex;
        justify-content: space-between;
        width: 94%;
        border-bottom: 1px solid #f3f5f7;
        padding: .1rem 0;

    }

    .logout {
        text-align: center;
        padding: .3rem;
        background: #fff;
        border-top: .2rem solid #f3f5f7;
        border-bottom: .2rem solid #f3f5f7;
    }

    .demand {
        color: #005982
    }

    .actived {
        color: #005982
    }
    .equity {
        padding: 0 .3rem 0 .4rem;
        font-size: .3rem;
        line-height: 1.5;
        position: relative;
        i {
            display: inline-block;
            width: .35rem;
            height: .35rem;
            background: url(../../../static/app/img/my/zuanshi1.png) no-repeat center;
            background-size: contain;
            position: absolute;
            top: .05rem;
            left: 0rem;
        }
    }
        .isVipColor {
        color: #ee7c00; 
        padding: 0 .3rem 0 .4rem;
        font-size: .3rem;
        line-height: 1.5;
        position: relative;
        i {
            display: inline-block;
            width: .35rem;
            height: .35rem;
            background: url(../../../static/app/img/my/zuanshi2.png) no-repeat center;
            background-size: contain;
            position: absolute;
            top: .05rem;
            left: 0rem;
        }
    }
</style>