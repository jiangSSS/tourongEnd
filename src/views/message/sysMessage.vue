<template>
    <div class="">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
            <div v-for="(item,index) in systemData" :key="index" class="messageBox">
                <div class="desc">
                    <span v-if="item.noticeType == 0">系统</span>
                    <span v-if="item&&item.addTimeStr">{{item.addTimeStr.slice(0,10)}}</span>
                </div>
                <div class="messageTitle">{{item.content}}</div>
            </div>
        </div>
        <div v-if="this.systemData.length == 0" class="noChange">还没有系统消息哦</div>
        <div v-if="this.systemData.length != 0">
            <div class="noData" v-show="more">加载中...</div>
            <div class="noData" v-show="noMore">--- 没有更多数据了 ---</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                systemData: [],
                noShow: false,
                loading: false,
                pn: 1,
                pageNumber: 1,
                totalCount: '',

                more: false,
                noMore: false
            }
        },
        methods: {
            // 上拉加载
            loadMore() {
                this.pn += 1
                this.$axios.get(`/jsp/wap/center/ctrl/jsonNoticeList.jsp`, { params: {pageNumber:this.pn} }).then(res => {                
                    this.loading = true                                   
                    if (res.success == "true") {       
                        this.systemData = [...this.systemData, ...res.data.pageList]
                        this.totalCount = Number(res.data.pagination.totalCount)
                        if (this.totalCount > this.systemData.length) {               
                            this.more = true
                            this.noMore = false
                        } else {
                            this.more = false
                            this.noMore = true           
                            //  this.loading = false
                        }
                        //  this.loading = false
                    }
                })
            },
            // 获取系统消息
            getData() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonNoticeList.jsp`).then(res => {
                    console.log("系统消息", res)
                    this.loading = true
                    if (res.success == "true") {                      
                        this.systemData = res.data.pageList
                        this.totalCount = Number(res.data.pagination.totalCount)
                        this.pn = 1
                        // if (this.totalCount > this.systemData.length) {
                        //     this.more = true
                        //     this.noMore = false

                        // } else {
                        //     this.more = false
                        //     this.noMore = true
                        // }
                        this.loading = false
                    }
                })
            },
        },
        created() {
            this.getData()
        }

    }
</script>
<style scoped lang="scss">
    .detail {
        padding-top: .8rem;
        padding-bottom: .9rem;
    }

    img {
        width: 100%
    }

    .subTabs {
        // background: #fff
        padding: 0;
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
        border-bottom: .2rem solid #f3f5f7;
        .messageTitle {
            font-size: .32rem;
            line-height: 2;
            font-family: "PingFang";
            color: rgb( 51, 51, 51);
        }
    }

    .noChange {
        text-align: center;
        color: #ccc;
        margin-top: 2rem
    }

    .desc {
        color: #999
    }
</style>