<template>
    <div class="">
        <div class="detail">
            <div class="money">资金</div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                <div class="moneyList" v-for="(item,index) in pageList" :key="index">
                    <router-link :to="{path:'/money/moneyDetail',query:{id:item.id}}">
                        <div class="moneyTitle">{{item.title}}</div>
                        <div class="moneyDetail">{{item.investRequire}}</div>
                    </router-link>
                    <div class="clearfix">
                        <div class="fll moneyTime">
                            <i class="iconfont icon-shijian"></i>
                            <span>{{item.addTimeStr}}</span>
                        </div>
                        <div class="sendBtn flr" @click="handleSend(item.id)">
                            投递项目
                        </div>
                    </div>
                </div>
                <mu-dialog width="400" center class="applyDialog" :open.sync="isShowApply">
                    <select class="oneRows" v-model="projectId">
                        <option :value="item.id" v-for="item in myProject" :key="item.index" :label="item.title">{{item.title}}</option>
                    </select>
                    <mu-button class="applyBtn" @click="closeApply">确认</mu-button>
                    <mu-button class="applyBtn" @click="isShowApply = false">取消</mu-button>
                </mu-dialog>
            </div>
            <div class="noData">--- 没有更多数据了 ---</div>
        </div>
    </div>
</template>

<script>
    import * as Cookies from "js-cookie";
    import { Toast } from "mint-ui"
    export default {
        data() {
            return {
                isShowApply: false,
                pageList: [],
                loading: false,
                pn: 1,
                pageNumber: 1,
                totalCount: [],
                title: "",

                myProject: [],
                projectId: "",
                moneyId: "",
                myMoney_Count: 0,
                myMoney_pagination: false,
            }
        },
        methods: {
            getActData() {
                this.loading = true;
                this.title = this.$route.query.title
                this.$axios.get(`/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp?title=${this.title}`).then(res => {
                    this.pageList = res.data.pageList;
                    this.totalCount = res.data.pagination.totalCount;
                    this.pn = 1;
                    this.loading = false;
                });
            },
            loadMore() {
                this.pn += 1;
                this.loading = true;
                this.$axios.get(`/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp?title=${this.title}`, {
                    params: { pageNumber: this.pn }
                }).then(res => {
                    if (res.success == "true") {
                        this.pageList = [...this.pageList, ...res.data.pageList];
                        this.totalCount = res.data.pagination.totalCount;
                        this.loading = false;
                    }
                });
            },
            // 投递项目
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
            handleSend(id) {
                if (Cookies.get("userKey")) {
                    if (this.myProject.length == 0) {
                        let instance = Toast('您还没有发布项目，请先发布项目');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    } else {
                        this.isShowApply = true;
                        this.moneyId = id;
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
        },
        created() {
            this.getActData()
            if (Cookies.get("userKey")) {
                this.getMyProject()
            }
        }
    }
</script>
<style scoped lang="scss">
    .detail {
        margin-top: 1rem
    }

    .money {
        border-left: 3px solid #005982;
        padding-left: .2rem;
        margin-left: .3rem;
        font-size: .32rem;
        color: #005982;
        font-weight: 700;
        margin-bottom: .2rem;
        /* border-bottom: 1px solid #f3f5f7 */
    }

    /* 列表 */

    .moneyList {
        padding: 0.3rem;
        background: #fff;
        border-bottom: 0.2rem solid #fafafa;
    }

    .moneyTitle {
        font-size: 0.27rem;
        font-family: "PingFang";
        color: rgb(62, 58, 57);
        font-weight: bold;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .moneyDetail {
        font-size: 0.24rem;
        margin: 0.2rem 0;
        font-family: "PingFang";
        color: rgb(137, 137, 137);
        line-height: 1.5;
        text-align: justifyLeft;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .moneyTime {
        font-family: "PingFang";
        color: #ccc;
        line-height: 1.385;
        span {
            font-size: 0.22rem;
        }
    }

    .sendBtn {
        border: 1px solid #005982;
        border-radius: 2px;
        display: inline-block;
        color: #005982;
        padding: 0.1rem 0.2rem;
        line-height: 1.25;
        font-family: "PingFang";
        font-size: 0.23rem;
        font-weight: bold;
        opacity: 0.7;
    }

    /* End */

    .checkItem {
        width: 100%;
        padding: 0 0.2rem;
        line-height: 2;
        border-bottom: 1px dashed #fafafa;
    }

    .applyBtn {
        /* width: 90%; */
        background: #005982;
        color: #fff;
        margin-top: 0.4rem;
    }

    .btnSend {
        text-align: center;
    }

    /deep/ .mu-dialog-body {
        padding: .7rem .5rem .5rem
    }

    .oneRows {
        width: 4.6rem
    }
</style>