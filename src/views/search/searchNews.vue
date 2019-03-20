<template>
    <div class="">
        <div class="detail">
            <div class="money">资讯</div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                <div class="" v-for="(item,index) in pageList" :key="index">
                    <router-link :to="{path:'/newsDetail',query:{id:item.id}}">
                        <div class="clearfix rows">
                            <div class="nums clearfix flr">
                                <div class="clearfix titleBox">
                                    <img src="../../../static/app/img/my/dian.jpg" class="dian fll">
                                    <span class="fll messageTitle">{{item.title}}</span>
                                </div>
                                <div class="messageTime">
                                    <span class="fll timestatus">{{item.addTimeStr.slice(0,10)}}</span>
                                    <span class="flr rightTime">
                                        <span>(来源：
                                            <span>{{item.source}}</span> )</span>
                                    </span>
                                </div>
                                <div class="newsDesc">
                                    {{item.brief}}
                                </div>
                            </div>
                            <div class="newsImgBox fll">
                                <img :src="$url + item.imgPath" class="newsImg">
                            </div>
                        </div>
                    </router-link>
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
                this.$axios.get(`/jsp/wap/trNews/ctrl/jsonNewsPage.jsp?title=${this.title}`, {
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
                this.$axios.get(`/jsp/wap/trNews/ctrl/jsonNewsPage.jsp?title=${this.title}`).then(res => {
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
    .nums {
        width: 4.5rem;
    }
    .titleBox{
        margin-top: .1rem
    }

    .newsDesc {
        color: #666;
        float: right;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 4.2rem;
        font-size: 0.2rem;
    }

    .subTab {
        font-size: 0.5rem !important;
        font-family: "PingFang";
        color: rgb(51, 51, 51);
        line-height: 2.727;
        text-align: center;
        background: #fff;
    } 
    // /deep/.van-tabs__line {
    //     background: #005982 !important;
    //     bottom: .2rem !important;
    // }
    .title {
        margin-top: 0.2rem;
    }

    .messageList {
        padding-top: 0.2rem;
        background: #fff;
    }

    .rows {
        padding: 0.1rem 0.3rem;
        border-bottom: 0.2rem solid #fafafa;
        .messageTitle {
            font-size: 0.24rem;
            font-family: "Microsoft YaHei";
            color: rgb(51, 51, 51);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            width: 80%;
            /* line-height: 2; */
        }
        .messageTime {
            font-size: 0.2rem;
            font-family: "Microsoft YaHei";
            color: rgb(137, 137, 137);
            line-height: 2;
        }
        .messageTime span {
            font-size: .2rem
        }
        .timestatus {
            margin-left: .3rem
        }
        .rightTime {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 2.4rem
        }
    }
    .dian {
        margin: 0.15rem;
    }

    .newsImgBox {
        // display: flex;
        // justify-content: space-between;
        padding-top: 0.15rem;
        .newsImg {
            width: 2.25rem;
            height: 1.5rem;
        }
    }

    .type_item {
        color: #666;
        cursor: pointer;
        padding: 0.2rem 0 0.1rem;
        margin: 0 .3rem;
        line-height: 2;
        font-size: .3rem;
        display: inline-block;
        /* display: fixed;
        justify-content: space-around; */
    }

    .active {
        color: #005982;
        border-bottom: 3px solid #005982;
    }
</style>