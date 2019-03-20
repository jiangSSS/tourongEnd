<template>
    <div class="">
        <div class="detail">
            <div class="money">活动</div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                <div class="applyBox" v-for="(item,index) in pageList" :key="index">
                    <router-link :to="{path:'/activityDetail',query:{id:item.id}}">
                        <div class="imgWarp">
                            <div class="imgBox">
                                <img :src="$url + item.imgPath" alt="" class="imgPath">
                                <span class="flr rightTop">{{item.statusStr}}</span>
                                <div class="applyNum">
                                    <i class="iconfont icon-gongzuohuibao"></i>
                                    <span>报名数量：</span>
                                    <span>{{item.applyNum}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="applyDesc">
                            <div class="applyTitle">{{item.title}}</div>
                            <div class="company">
                                <span>主办：</span>
                                <span>{{item.speaker}}</span>
                            </div>
                        </div>
                    </router-link>
                    <div class="applyDesc">
                        <div class="clearfix">
                            <div class="fll timeAddress">
                                <div>
                                    <span>活动地点</span>
                                    <i class="iconfont icon-dizhi"></i>
                                    <span>{{item.address}}</span>
                                </div>
                                <div>
                                    <span>活动时间</span>
                                    <i class="iconfont icon-shijian"></i>
                                    <span>{{ item.regStartTimeStr.slice(0,10)}} 至 {{item.regEndTimeStr.slice(0,10)}}</span>
                                </div>
                            </div>
                            <mt-button type="default" class="flr" :class="item.status == 1 ? 'applyBtn' : 'overBtn'" @click="$router.push({name:'activityDetail',query:{id:item.id}})">
                                {{item.status == 1 ? '立即报名' :'' + item.status == 0 ? '尚未开始':'' + item.status == 3 ? '活动结束' : ''}}查看往期
                            </mt-button>
                        </div>
                    </div>
                </div>
                <!-- <mu-dialog width="400" center class="applyDialog" :open.sync="isShowApply">
                    <select class="oneRows" v-model="projectId">
                        <option :value="item.id" v-for="item in myProject" :key="item.index" :label="item.title">{{item.title}}</option>
                    </select>
                    <mu-button class="applyBtn" @click="closeApply">确认</mu-button>
                    <mu-button class="applyBtn" @click="isShowApply = false">取消</mu-button>
                </mu-dialog> -->
            </div>
            <div class="noData">--- 没有更多数据了 ---</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowApply: false,
                pageList: [],
                loading: false,
                pn: 1,
                pageNumber: 1,
                totalCount: [],
                title: ""
            }
        },
        methods: {
            loadMore() {
                this.pn += 1;
                this.loading = true;
                this.$axios.get(`/jsp/wap/trActivity/ctrl/jsonActivityPage.jsp?title=${this.title}`, {
                    params: { pageNumber: this.pn }
                }).then(res => {
                    if (res.success == "true") {
                        this.pageList = [...this.pageList, ...res.data.pageList];
                        this.totalCount = res.data.pagination.totalCount;
                        this.loading = false;
                    }
                });
            },
            getActData() {
                this.loading = true;
                this.title = this.$route.query.title
                this.$axios.get(`/jsp/wap/trActivity/ctrl/jsonActivityPage.jsp?title=${this.title}`).then(res => {
                    this.pageList = res.data.pageList;
                    this.totalCount = res.data.pagination.totalCount;
                    this.pn = 1;
                    this.loading = false;
                });
            },

        },
        created() {
            this.getActData()
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
    .applyBox {
        border-bottom: 1px solid #fafafa;
        padding: .2rem 0;
    }

    .subTab {
        font-size: .5rem !important;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        line-height: 2.727;
        text-align: center;
        background: #fff
    }

    .messageBox {
        background: #fff;
        padding: .2rem;
        margin-top: .2rem;
        .messageTitle {
            font-size: .32rem;
            font-family: "PingFang";
            color: rgb( 51, 51, 51);
        }
        .messageDetail,
        .messageTime {
            font-size: .28rem;
            font-family: "PingFang";
            color: rgb( 102, 102, 102);

        }
    }

    .imgWarp {
        background: #fff;
        padding: .2rem;
        border-top: .2rem solid #fafafa;
    }

    .imgBox {
        height: 3.5rem;
        margin: 0 auto;
        color: #fff;
        background-size: 100% 100%;
        position: relative;
    }

    .imgPath {
        width: 100%;
        height: 100%;
    }

    /deep/ .mu-tabs-inverse {
        background: #fff;

    }

    .rightTop {
        margin: .2rem .2rem 0 0;
        background: rgba(0, 0, 0, .5);
        border-radius: 4px;
        padding: .06rem .15rem;
        position: absolute;
        top: 0;
        right: 0;

    }

    .applyNum {
        position: absolute;
        bottom: 0;
        padding: 0 0 .1rem .2rem;
        width: 100%;
        background: linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
        background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
        background: -moz-linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
        background: -ms-linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
        background: -o-linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
    }

    .applyDesc {
        padding: 0 .2rem
    }

    .overBtn {
        background: #ccc;
        color: #fff;
        width: 1.8rem;
        height: .7rem;
        line-height: .7rem;
        margin-right: .2rem;
        margin-top: .13rem
    }

    .applyBtn {
        background: #005982;
        color: #fff;
        width: 1.8rem;
        height: .7rem;
        line-height: .7rem;
        margin-right: .2rem;
        margin-top: .13rem
    }

    .applyTitle {
        font-size: .32rem;
        color: rgb( 51, 51, 51);
        font-weight: bold;
        line-height: 2;


    }

    .company span {
        font-size: .28rem;
        color: rgb( 102, 102, 102);
        line-height: 1.6
    }

    .timeAddress span {
        color: rgb( 179, 179, 179);
        font-size: .24rem
    }

    .iconfont,
    a {
        color: rgb( 179, 179, 179);
    }

    .active {
        color: #005982 !important;
        border-bottom: 3px solid #005982
    }

    .statusBox {
        padding-left: .3rem
    }

    .type_item {
        color: #666;
        cursor: pointer;
        padding: .2rem 0;
        margin: 0 .3rem;
        display: inline-block;
        display: fixed;
        justify-content: space-around
    }

    /* 筛选 */

    .chooseBox {
        background: #fff;
        z-index: 1000;
    }

    .choose {
        overflow: scroll;
        height: 100vh;
        padding-bottom: 2rem
    }

    .title {
        text-align: center;
        line-height: 3;
        border-bottom: 1px solid #fafafa
    }

    .sbuTitle {
        font-size: .28rem;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        font-weight: bold;
        line-height: 4;
        padding: 0 .2rem;
        border-bottom: 1px solid #fafafa;
    }

    .type {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #fafafa;
        padding: .2rem .2rem .3rem;
    }

    .type span {
        background: #eee;
        width: 1.6rem;
        text-align: center;
        padding: .1rem .15rem;
        border-radius: 10%;
        margin-right: .2rem;
        margin-top: .2rem;
        font-size: .24rem;
        font-family: "PingFang";
        color: rgb( 102, 102, 102);
    }

    .type span.activeBox {
        background: #005982;
        color: #fff;
    }

    .sureChoose {
        position: absolute;
        width: 100%;
        bottom: 0;
    }

    .chooseBtn {
        width: 50%;
        padding: .6rem 0;
        font-size: .3rem;
    }

    .sure {
        background: #005982;
        color: #fff
    }

    /* 多选框 */

    #moneyType {
        width: 2rem
    }

    .checkItem {
        width: 100%;
        padding: 0 .2rem;
        line-height: 2;
        border-bottom: 1px dashed #fafafa;
    }
   
</style>