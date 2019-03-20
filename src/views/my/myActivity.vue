<template>
    <div>
        <Header></Header>
        <div class="">
            <div class="containerAll">
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                    <div class="all" v-for="(item,index) in pageList" :key="index">
                        <router-link :to="{path:'/activityDetail',query:{id:item.id}}">
                            <div class="clearfix activity">
                                <div class="fll activityTitle">{{item.title}}</div>
                                <div class="flr">
                                    <!-- <i class="iconfont icon-xiangyou"></i> -->
                                    <span  v-if="item.regStatus == 1" class="suc">审核通过</span>
                                    <span v-else class="noSuc">待审核</span>
                                </div>
                            </div>
                        </router-link>
                            <div class="activityMessage">
                                <div>
                                    <span>报名时间：</span>
                                    <span>{{item.regTimeStr}}</span>
                                </div>
                                <div>
                                    <span>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名：</span>
                                    <span>{{item.memberName}}</span>
                                </div>
                                <div>
                                    <span>联系电话：</span>
                                    <span>{{item.memberMobile}}</span>
                                </div>
                                <div>
                                    <span>其&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp他：</span>
                                    <span>{{item.remark}}</span>
                                </div>
                            </div>
                        
                    </div>
                </div>
                <p v-show="pageList.length == 0" class="noAtt">你没有任何活动哦~</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    export default {
        components: {
            Header
        },
        data() {
            return {
                pageList: [],
                pn: 1,
                loading: false,
                count:1
            };
        },
        methods: {
            // 上拉加载
            loadMore() {
                this.pn = this.pn + 1   
                this.$axios.get(`/jsp/wap/center/ctrl/jsonMyCapitalList.jsp`, { params: { pageNumber: this.pn } }).then(res => {
                    this.loading = true
                    if (res.success == "true") {
                        // this.pageList = [...this.pageList, ...res.data.pageList]
                        this.count = res.data.pagination.totalCount
                        this.loading = false
                    }
                })
            },
            // 我的活动列表
            getData(pageNumber) {
                this.loading = false
                this.$axios.get('/jsp/wap/center/ctrl/jsonMyActivityList.jsp', { params: { pageNumber } }).then(res => {
                    console.log("我的活动", res);
                    this.loading = true
                    if (res.success == 'true') {
                        this.pageList = res.data.pageList
                        this.count = Number(res.data.pagination.totalCount)
                        this.pn = 1
                        this.loading = false
                    }
                })
            },
        },
        created() {
            this.getData()
        }
    };
</script>
<style scoped lang="scss">
    .all {
        // background: #fff;
        // padding: .2rem
    }

    .containerAll {
        padding-top: .8rem;
        min-width: 7.5rem;
        background: #fafafa
    }

    .activity {
        background: #fff;
        padding: .3rem .2rem;
        margin-top: .3rem;
        border-bottom: 1px solid #f3f5f7
    }

    .activityTitle {
        border-left: 3px solid #005982;
        padding-left: .2rem;
        color: #005982

    }

    .activityMessage {
        background: #fff;
        padding: .2rem
    }

    .activityMessage div span:nth-child(1) {
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb( 102, 102, 102);
    }

    .activityMessage div span:nth-child(2) {
        font-size: .3rem;
        font-family: "PingFang";
        color: #333;
    }

    .noAtt {
        text-align: center;
        margin-top: 4rem
    }
    .suc{
        color: #ff9440
    }
    .noSuc{
        color: #999
    }
</style>