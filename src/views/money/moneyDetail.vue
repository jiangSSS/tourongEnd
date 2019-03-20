<template>

    <div class="all" :data="moneyDetail">
        <Header></Header>
        <div class="containerAll">
            <div class="detail">
                <div class="projectHeader">
                    <div class="projectTitle">{{moneyDetail.title}}</div>
                    <div class="time">
                        <span>编号：</span>
                        <span>{{moneyDetail.identifier}}</span>
                    </div>
                    <div class="clearfix">
                        <div class="fll time">
                            <i class="iconfont icon-shijian"></i>
                            <span v-if="moneyDetail.addTimeStr">{{moneyDetail.addTimeStr.slice(0,10)}}</span>
                            <span v-else>2019-01-01</span>
                        </div>
                        <div class="sendBtn flr likeBtn" v-if="follow" @click="isFollow">已关注</div>
                        <div class="sendBtn flr" v-else @click="noFollow">关注</div>
                        <div class="sendBtn flr" @click="handleSend">投递项目</div>
                    </div>
                    <mu-dialog width="400" center class="applyDialog" :open.sync="isShowApply">
                        <select class="oneRows" v-model="projectId">
                            <option :value="item.id" v-for="item in myProject" :key="item.index" :label="item.title">{{item.title}}</option>
                        </select>
                        <mu-button class="applyBtn" @click="closeApply">确认</mu-button>
                        <mu-button class="applyBtn" @click="isShowApply = false">取消</mu-button>
                    </mu-dialog>
                </div>
                <div class="user clearfix" @click="$router.push({name:'investors',query:{id}})">
                    <img class="avatar fll" :src="$url + memberInfo.photoImgPath" v-if="memberInfo&&memberInfo.photoImgPath"  alt>
                    <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188149577,2949073731&fm=26&gp=0.jpg" v-else class="avatar fll">
                    <span class="fll member" v-if="memberInfo.name">{{memberInfo.name}}</span>
                    <span class="fll member" v-else>投资人</span>
                    <!-- <span class="fll">{{memberInfo.name}}</span> -->
                    <div class="flr">
                        <span class="">{{memberInfo.company}}</span>
                        <i class="iconfont icon-xiangyou"></i>
                    </div>

                </div>
                <!-- <div class="user clearfix">
                    <div class="fll titleDesc">融资信息</div>
                    <div class="flr customer">
                        客户要求保密
                    </div>

                </div> -->
                <div class="message">
                    <div>
                        <span>投资资金:</span>
                        <span>{{moneyDetail.investAmountName}}</span>
                    </div>
                    <div>
                        <span>投资方式:</span>
                        <span>{{moneyDetail.capitalSourceName}}</span>
                    </div>
                    <div>
                        <span>投资类型:</span>
                        <span>{{moneyDetail.investTypeName}}</span>

                    </div>
                    <div>
                        <span>资金来源:</span>
                        <span>{{moneyDetail.capitalSourceName}}</span>

                    </div>
                    <div>
                        <span>资金类型:</span>
                        <span>{{moneyDetail.capitalBodyName}}</span>

                    </div>
                    <div>
                        <span>投资行业:</span>
                        <span>{{moneyDetail.investIndustryName}}</span>

                    </div>
                    <div>
                        <span>投资阶段: </span>
                        <span>{{moneyDetail.investStageName}}</span>

                    </div>
                    <div>
                        <span>市场热点:</span>
                        <span>{{moneyDetail.marketHotName}}</span>

                    </div>
                    <div>
                        <span>区域热点:</span>
                        <span>{{moneyDetail.areaHotName}}</span>

                    </div>
                    <div>
                        <span>支付方式:</span>
                        <span>{{moneyDetail.paymentTypeName}}</span>

                    </div>
                    <div>
                        <span>有效期限:</span>
                        <span>{{moneyDetail.validStartTimeStr}}--{{moneyDetail.validEndTimeStr}}</span>

                    </div>
                    <div>
                        <span>保障措施:</span>
                        <span>{{moneyDetail.safeguardName}}</span>
                    </div>

                </div>
                <!-- <div class="user clearfix" @click="$router.push('/money/progress')">

                    <div class="fll">查看项目进展</div>
                    <div class="flr">
                        <i class="iconfont icon-xiangyou"></i>
                    </div>
                </div> -->
                <div class="typeBox">
                     <span v-for="(lab,idx) in moneyDetail.labelList" :key="idx" class="typeItem" @click="searchLabel(lab.labelId)">{{lab.labelName}}</span>
                </div>
                <div class="contentTell">
                    <div class="detaila">
                        <div class="peojectTitle">投资要求概述</div>
                    </div>
                    <div class="contentDesc">{{moneyDetail.investRequire}}</div>
                </div>
                <div class="contentTell">
                    <div class="detaila">
                        <div class="peojectTitle">投资案例</div>
                    </div>
                    <!-- <div class="" v-for="(item,index) in core" :key="index">
                        <div class="coreName">
                            {{item.name}}
                        </div>
                        <div class="coreDetail">
                            {{item.detail}}
                        </div>
                    </div> -->
                     <div class="coreDetail">
                            {{moneyDetail.investCase}}
                        </div>
                </div>
                <!-- <div class="contentTell">
                    <div class="detaila">
                        <div class="peojectTitle">项目点评</div>

                    </div>
                    <div class="" v-for="(item,index) in review" :key="index">
                        <div class="coreName">
                            {{item.bb}}
                        </div>
                        <div class="coreDetail">
                            {{item.desc}}
                        </div>
                    </div>
                </div> -->
                <div class="contentTell">
                    <div class="detaila">
                        <div class="peojectTitle">其他说明</div>
                    </div>
                    <div class="contentDesc">{{moneyDetail.otherExplain}}</div>
                </div>
                <div class="contentTell ">
                    <!-- <router-link :to="{name:'mayMoney',query:{id}}">
                        <div class="detaila">
                            <div class="peojectTitle">可能感兴趣的资金</div>
                        </div>
                    </router-link> -->
                    <div class="detaila" @click="toMayMoney">
                        <div class="peojectTitle">可能感兴趣的资金 <i class="iconfont icon-xiangyou flr"></i></div>
                       
                    </div>
                    <!-- <div class="mayProject" v-for="(item,index) in capitalList" :key="index">
                        <router-link :to="{name:'moneyDetail',query:{id:item.id}}" >
                            <div class="mayTitle">
                                {{item.title}}
                            </div>
                            <div class="mayTime">
                                <span>投资金额：</span>
                                <span>{{item.investAmountName}}</span>
                            </div>
                            <div class="mayTime">
                                <span>{{item.capitalSourceName}}</span>
                            </div>
                        </router-link>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    import { Toast } from 'mint-ui'
    import { Dialog } from "vant";
    import * as Cookies from 'js-cookie'

    export default {
        components: {
            Header,
            Footer,
            Toast
        },
        data() {
            return {
                core: [
                    {
                        name: "张麟（法人）",
                        detail: "之前就职于苏州工业园区大型企业10多年，管理企业大型项目，对现代化企业管理流程熟悉。"
                    },
                    {
                        name: "黄羽（总经理）",
                        detail: "之前就职于苏州工业园区大型企业10多年，管理企业大型项目，对现代化企业管理流程熟悉。"
                    },
                ],
                review: [
                    {
                        bb: "完整的逻辑架构",
                        desc: "打造符合投资人口味的完整计划书逻辑框架和商业模式，提出优化建议。"
                    },
                    {
                        bb: "清晰的商业模式",
                        desc: "打造符合投资人口味的完整计划书逻辑框架和商业模式，提出优化建议。"
                    },
                ],
                moneyDetail: [],
                follow: 0,
                id: "",

                isShowApply: false,
                myProject: [],
                capitalList: [],
                projectId: "",
                moneyId: "",
                myMoney_Count: 0,
                myMoney_pagination: false,

                memberId:"",
                memberInfo:[]
            }
        },
        methods: {
            toDetail(){
                let id = this.$route.query.id
                this.$router.push({name: 'moneyDetail', params:{id}})
            },
            searchLabel(labelId) {
                this.$router.push({ name: 'labelMoney', query: { labelId } })
            },
            getMyProject(pn) {
                this.$axios.get("/jsp/wap/center/ctrl/jsonIssueProjectList.jsp", {
                    params: { pageNumber: pn }
                }).then(res => {
                    console.log("我的项目去投递", res)
                    this.myProject = res.data.pageList;
                    var myProject = res.data.pageList
                    if (myProject.length > 0) {
                        this.projectId = myProject[0].id
                    }
                    this.myProject_Count = Number(res.data.pagination.totalCount);
                });
            },
            handleSend() {
                if (Cookies.get("userKey")) {
                    if (this.myProject.length == 0) {
                        let instance = Toast('您还没有发布项目，请先发布项目');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    } else {
                        this.isShowApply = true;
                        this.moneyId = this.$route.query.id;
                    }
                }
                else {
                    let instance = Toast('您未登录，请先登录');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }
            },
            // 确认投递 关闭投递框
            closeApply() {
                this.$axios.get("/jsp/wap/trCapital/do/doDeliver.jsp", {
                    params: { id: this.moneyId, projectId: this.projectId }
                })
                    .then(res => {
                        if (res.success == "true") {
                            let instance = Toast('提交成功，平台将尽快为您安排');
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
                setTimeout(() => {
                    this.isShowApply = false;
                }, 500);
            },
            // 投资详情
            getMoneyDetail() {
                this.id = this.$route.query.id
                this.$axios.get(`/jsp/wap/trCapital/ctrl/jsonCapitalDetail.jsp?id=${this.id}`).then(res => {
                    console.log("投资详情", res)
                    this.moneyDetail = res.data.capital
                    this.memberInfo = res.data.memberInfo
                    this.memberId = res.data.memberInfo.id
                    this.capitalList = res.data.capitalList
                })
            },
            toMayMoney(){
                let id = this.$route.query.id
                this.$router.push({name:'mayMoney',query:{id}})
            },
            // 获取关注状态
            getFollow() {
                this.$axios.get(`/jsp/wap/trCapital/ctrl/jsonIsFollow.jsp?id=${this.id}`).then(res => {
                    console.log("是否关注", res)
                    this.follow = Number(res.data)
                })
            },
            // 关注
            noFollow() {
                this.$axios.get(`/jsp/wap/trCapital/do/doFollow.jsp?id=${this.id}`).then(res => {
                    console.log("投资关注", res)
                    if (res.success == "true") {
                        let instance = Toast('关注成功');
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                        this.follow = 1
                    } else {
                        let instance = Toast(res.message);
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                    }
                })
            },
            // 取消关注
            isFollow() {
                this.$axios.get(`/jsp/wap/trCapital/do/doUnfollow.jsp?id=${this.id}`).then(res => {
                    console.log("取消关注", res)
                    if (res.success == "true") {
                        let instance = Toast('已取消关注');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                        this.follow = 0
                    } else {
                        let instance = Toast('取消失败');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                })
            },
        },
        created() {
            this.getMoneyDetail()
            this.getFollow()
            if (Cookies.get("userKey")) {
                this.getMyProject();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .containerAll {
        background: #f3f5f7; // margin-bottom: 1rem
    }

    img {
        width: 100%
    }

    .detail {
        background: #f3f5f7;
    }

    .projectTitle {
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        font-weight: bold;
        line-height: 1.6;
        padding: .3rem 0 0 0;
    }

    .sendBtn {
        border: 1px solid #005982;
        border-radius: 2px;
        display: inline-block;
        color: #005982;
        padding: .1rem;
        height: .6rem;
        width: 1.4rem;
        line-height: .4rem;
        font-family: "PingFang";
        font-size: .23rem;
        font-weight: bold;
        opacity: 1;
        margin-right: .3rem;
        text-align: center;
    }

    .likeBtn {
        background: #005982;
        color: #fff
    }

    .time {

        font-size: .3rem;
        font-family: "PingFang";
        color: rgb(137, 137, 137);
        line-height: 2;

    }

    .projectHeader {
        background: #fff;
        padding: .8rem .2rem .1rem;
        margin-bottom: .3rem
    }

    .user {
        line-height: 3;
        padding: .2rem;
        background: #fff;
        margin-bottom: .3rem
    }

    .titleDesc {
        font-size: .3rem;
        color: rgb( 51, 51, 51);
    }

    .customer {
        color: rgb( 0, 89, 130);
    }

    .contentTell {
        background: #fff;
        padding: .2rem;
        margin-bottom: .3rem;
        .detaila {
            background: #fff;
            padding: .2rem 0;
            // border-bottom: 1px solid #f3f5f7;
            .peojectTitle {
                border-left: 3px solid #005982; // margin: 0 .3rem;
                padding-left: .2rem;
                font-size: .3rem;
                font-family: "PingFang";
                color: rgb( 51, 51, 51);
                line-height: 1.533;


            }
        }
        .contentDesc {
            color: rgb(128, 128, 128);
            padding: .1rem 0;
            line-height: 1.5;
        }
    }

    .coreDetail {
        color: rgb(128, 128, 128);
		line-height: 1.5
    }

    .coreName {
        font-weight: 700;
        padding: .2rem 0 0;
    }
    .message {
        background: #fff;
        padding: .2rem;
        margin-bottom: .3rem
    }

    .message div {
        line-height: 2
    }

    .message div span:nth-child(1) {
        font-family: "PingFang";
        color: rgb(137, 137, 137);
        display: inline-block;
        margin-right: .1rem
    }

    /* 投递框 */

    .applyDialog {
        text-align: center;
        margin: 0 auto;
        input {
            border: 0;
            border-bottom: 1px solid rgb(237, 237, 237);
            line-height: 2.6;
            margin-left: 0.1rem;
            width: 80%;
        }
        .iconfont {
            font-size: 0.6rem; // padding-top: 1rem;
            display: inline-block;
        }
    }

    .dialogTitle {
        font-weight: bold;
        font-size: 0.34rem;
    }

    .applyBtn {
        /* width: 90%; */
        background: #005982;
        color: #fff;
        margin-top: 0.4rem;
    }，

    /deep/ .mu-dialog-body {
        padding: .7rem .5rem .5rem
    }

    .oneRows {
        width: 4.6rem !important;
    }

    .mayProject {
        padding: .15rem 0;
        border-bottom: .05rem solid #f3f5f7
    }

    .mayTitle {
        color: rgb( 51, 51, 51);
        line-height: 1.6
    }

    .mayTime {
        line-height: 2;
        color: rgb(128, 128, 128);
    }
    .avatar{
        width:1rem;border-radius: 100%;
    }
    .member{
        margin-left: .2rem
    }
    .typeItem{
        background: #005982;
        opacity: .8;
        color: #fff;
        display: inline-block;
        padding: .1rem;
        margin-right: .1rem;
        border-radius: 6%
    }
    .typeBox{
        padding: 0 .2rem;
        margin-bottom: .3rem
        
    }
</style>