<template>
    <div class="">
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
        <div class="step" v-for="(item,index) in investData" :key="index">
            <div class="itemBox">
                <div class="clearfix">
                    <div class="peojectTitle fll" @click="$router.push({name:'moneyDetail',query:{id:item.id}})">
                        {{item.title}}
                    </div>
                    <mt-button class="flr cancleBtn" @click="cancelBtn(item.id,index)">
                        取消关注
                    </mt-button>
                </div>
                <div class="progress" @click="$router.push({name:'moneyDetail',query:{id:item.id}})">
                    <!-- <van-steps direction="vertical" :active="0" active-color="#005982" icon="icon-shijian">
                        <van-step v-for="(item,index) in item.progress" :key="index">
                            <h3>{{item}}</h3>
                            <p>
                                <span>{{item.time}}</span>
                                <span class="nowTime" v-show="isShow">最新动态</span>
                            </p>
                        </van-step>
                    </van-steps> -->
                    <div class="invest-item-list">
                        投资资金：
                        <span class="invest-money">{{item.investAmountName}}</span>
                    </div>
                    <div class="invest-item-list inb">
                        投资方式：
                        <span class="invest-content">{{item.investCase}}</span>
                    </div>
                    <div class="invest-item-list inb">
                        资金类型：
                        <span class="invest-content">{{item.pawnTypeName}}</span>
                    </div>
                    <div class="invest-item-list w230 inb">
                        投资地区：
                        <span class="invest-content">{{item.regionNameStr}}</span>
                    </div>
                    <div class="invest-item-list inb">
                        投资行业：
                        <span class="invest-content">{{item.investIndustryName}}</span>
                    </div>
                    <div class="invest-item-list w230 inb">
                        投资类型：
                        <span class="invest-content">{{item.investTypeName}}</span>
                    </div>
                    <div class="invest-item-list inb">
                        投资阶段：
                        <span class="invest-content">{{item.investStageName}}</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <p v-show="investData.length == 0" class="noAtt">
            你没有关注任何投资哦~
        </p>
    </div>
</template>

<script>
    import { Dialog } from "vant";
    import { Toast } from "mint-ui"
    export default {
        data() {
            return {
                isShow: false,
                investData: [],
                count: 1,
                loading:false,
                pn: 1,
                pageNumber: 1,
                // totalCount: [],
            }
        },
        methods: {
            cancelBtn(id,index) {        
                this.$axios.get(`/jsp/wap/trCapital/do/doUnfollow.jsp?id=${id}`).then(res => {
                    if (res.success == 'true') {
                        this.investData.splice(index, 1)
                        this.count -= 1
                    }
                })
                let instance = Toast('取消成功');
                setTimeout(() => {
                    instance.close();
                }, 2000);
            },
            // 上拉加载
            loadMore() {
                this.pn = this.pn + 1           
                this.$axios.get('/jsp/wap/center/ctrl/jsonFollowList.jsp?type=2', {
                    params: {
                        pageNumber: this.pn
                    }
                }).then(res => {
                     this.loading = true
                    if (res.success == "true") {
                        this.investData = [...this.investData, ...res.data.pageList]
                        this.count = res.data.pagination.totalCount
                        this.loading = false
                    }
                })
            },
            // 我的关注列表
            getData() {
                this.$axios.get('/jsp/wap/center/ctrl/jsonFollowList.jsp?type=2').then(res => {
                    console.log(res);
                    if (res.success == 'true') {
                        this.investData = res.data.pageList
                        this.count = Number(res.data.pagination.totalCount)
                    }
                })
            },
        },
        created() {
            this.getData()
        }
    }
</script>
<style scoped>
    .container {}
    .noAtt {
        text-align: center;
        color: #ccc;
        margin-top: 3rem;
    }
    .subTabs {
        /* padding-top: .8rem; */
        padding: .8rem 0 0 0;
        width: 7.5rem !important;
        min-width: 7.5rem !important
            /* background: #fff; */
    }
    .subTab {
        background: #fff;
        margin-bottom: .3rem
    }
    .itemBox {
        padding-bottom: .1rem;
        border-bottom: .2rem solid #f3f5f7
    }
    .peojectTitle {
        border-left: 3px solid #005982;
        margin: .3rem;
        width: 5rem;
        padding-left: .2rem;
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb(51, 51, 51);
        line-height: 1.533;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
            /* display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; */
    }
    .invest-item-list{
        padding: 0 .2rem;
        line-height: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    .cancleBtn {
        margin: .2rem .3rem 0 0;
        padding: 0 .1rem;
        height: .6rem;
		font-size: .3rem;
    }
    .nowTime {
        display: inline-block;
        padding-left: .6rem;
        color: #005982;
        font-weight: 700;
    }
    .step {
        background: #fff
    }
</style>