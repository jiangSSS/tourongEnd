<template>
    <div>
        <!-- <Header class="header"></Header> -->
        <div class="header">
            <mt-header title="会员权益中心" class="header-title">
                <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
            </mt-header>
        </div>

        <div class="all">
            <div class="detail">
                <!-- <router-link to="/weekList"><img src="../../../static/app/app/img/my0.jpg" alt=""></router-link> -->
                <div class="bg">
                    <img src="../../../static/app/img/member_bg.jpg" alt="">000
                    <div class="userBox">
                        <div class="clearfix usera">
                            <div class="fll userAvatar">
                                <div class="avatarBox">
                                    <img :src="$url +  userInfo.headImgPath" v-if="userInfo.headImgPath != ''" class="avatar">
                                    <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188149577,2949073731&fm=26&gp=0.jpg" v-else class="avatar">
                                </div>
                            </div>
                            <div class="fll userInfo">
                                <div class="clearfix">
                                    <div class="fll username">{{userInfo.name}}</div>
                                    <div class="flr dueTime">
                                        <img src="../../../static/app/img/due.jpg" class="due">
                                        <span>2018.11.11</span>
                                        <span>到期</span>
                                    </div>
                                </div>
                                <div>{{userInfo.mobile}}</div>
                                <div>{{userInfo.company}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="memberDesc">会员专属权益</div>
                    <div v-for="(item,index) in member" :key="index" class="member">
                        <div class="memberTitle">{{item.num}}) {{item.title}}</div>
                        <div>
                            <span>权益内容：</span>
                            <span>{{item.content}}</span>
                        </div>
                        <div>
                            <span>权益对象：</span>
                            <span>{{item.object}}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <Footer class="footer"></Footer>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    export default {
        components: {
            Footer,
            Header
        },
        data() {
            return {
                member: [
                    {
                        num: "1",
                        title: "节日特权",
                        content: "以节日内容为准;",
                        object: "一星及以上会员"
                    },
                    {
                        num: "2",
                        title: "VIP专区",
                        content: "您将获得会员中心贵宾特价区的访问权限，享有以贵宾专属低价预定产品的特权;",
                        object: "三星及以上会员"
                    },
                ],
                userInfo: []
            }
        },
        methods: {
            getUserData() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonUserInfo.jsp`).then(res => {
                    console.log("用户信息", res)
                    this.userInfo = res.data.userInfo
                })
            },
        },
        created() {
            this.getUserData()
        }
    }
</script>

<style scoped lang="scss">

    .mint-header {
        background: transparent!important;
        color: rgba(255, 255, 255, .8)!important;
        position: fixed;
        height: 0.86rem;
        top: 0;
        right: 0;
        left: 0;
        width: 100%;
        font-size: .4rem;
        z-index: 999
    }

    .mintui-back:before {
        font-size: .3rem
    }

    .detail {
        padding-bottom: 1.1rem;
    }

    img {
        width: 100%
    }

    .bg {
        position: relative;
        height: 3.6rem;
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
    }

    .userInfo {
        font-size: .28rem;
        color: rgb( 102, 102, 102);
        line-height: 1.6;
        margin-top: .2rem;
        padding-left: .2rem
    }

    .memberDesc {
        border-radius: 40%;
        padding: .1rem;
        margin: .1rem .3rem;
        background: rgba(237, 237, 237, 1);
        display: inline-block
    }

    .member {
        padding: 0 .3rem;
        .memberTitle {

            font-size: .34rem;
            font-family: "PingFang";
            color: rgb( 51, 51, 51);
            font-weight: bold;
            line-height: 3.5
        }
    }

    .member span:nth-child(1) {
        font-weight: bold
    }

    .due {
        width: .2rem
    }

    .username {
        margin-right: 1.6rem;
    }

    .dueTime {
        font-size: .2rem;
        font-family: "PingFang";
        color: rgb( 193, 171, 114);
        line-height: 1.512;
    }
</style>