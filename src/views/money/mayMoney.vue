<template>
    <div class="">
        <Header></Header>
        <div class="detail">
            <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"> -->
                <div class="mayProject" v-for="(item,index) in capitalList" :key="index">
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
                <!-- </div> -->
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
                capitalList: [],
                id:""
            };
        },


        methods: {
            // 投资详情
            getMoneyDetail() {
                this.id = this.$route.query.id
                this.$axios.get(`/jsp/wap/trCapital/ctrl/jsonCapitalDetail.jsp?id=${this.id}`).then(res => {
                    console.log("投资详情", res)
                    this.moneyDetail = res.data.capital
                    this.memberInfo = res.data.memberInfo
                    this.capitalList = res.data.capitalList
                })
            },

        },
        created() {
            this.getMoneyDetail()
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
</style>