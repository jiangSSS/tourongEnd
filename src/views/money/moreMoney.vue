<template>
    <div class="">
        <Header></Header>
        <div class="detail">
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                <div class="mayProject" v-for="(item,index) in pageList" :key="index">
                    <router-link :to="{name:'moneyDetail',query:{id:item.id}}">
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
                </div>
            </div>
            <div>
                <div class="noData" v-show="more">加载中...</div>
                <div class="noData" v-show="noMore">--- 没有更多数据了 ---</div>
            </div>
        </div>

    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    export default {
        components: {
            Header
        },
        data() {

            return {
                pageList: [],
                pn: 1,
                totalCount: 0,
                memberInfo: {},
                loading: false,
                more: false,
                noMore: false
            };
        },


        methods: {
            loadMore() {
                let memberId = this.$route.query.memberId;
                this.pn = this.pn + 1;
                this.loading = true
                this.$axios.get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
                    params: {
                        memberId,
                        pageNumber: this.pn
                    }
                }).then(res => {
                    this.loading = true
                    if (res.success == "true") {
                        this.pageList = [...this.pageList, ...res.data.pageList];
                        this.totalCount = Number(res.data.pagination.totalCount);
                        if (this.totalCount > this.pageList.length) {
                            this.more = true
                            this.noMore = false
                        } else {
                            this.more = false
                            this.noMore = true
                        }
                        this.loading = false;
                    }
                });
            },
            // 更多资金
            getMoreMoney() {
                let memberId = this.$route.query.memberId;
                this.loading = true;
                this.$axios.get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", { params: { memberId } }).then(res => {
                    if (res.success == "true") {
                        this.memberInfo = res.data.memberInfo
                        this.pageList = res.data.pageList;
                        this.totalCount = res.data.pagination.totalCount;
                        this.pn = 1;
                        if (this.totalCount > this.pageList.length) {
                            this.more = true;
                            this.noMore = false;
                        } else {
                            this.more = false;
                            this.noMore = true;
                        }
                        this.loading = false;
                    }
                });
            },

        },
        created() {
            this.getMoreMoney()
        }
    };
</script>
<style scoped lang="scss">
    .detail {
        margin-top: .9rem;
        padding: 0 .3rem
    }

    .mayProject {
        padding: .15rem 0;
        border-bottom: .05rem solid #f3f5f7
    }

    .mayTitle {
        border-left: 3px solid #005982;
        padding-left: .2rem;
        color: rgb(51, 51, 51);
        line-height: 1.6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .mayTime {
        line-height: 2;
        color: rgb(128, 128, 128);
    }
    .noData{
        color: #ccc;
        text-align: center;
        /* margin-top: 2rem */
    }
</style>