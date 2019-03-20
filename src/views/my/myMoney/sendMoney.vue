<template>
    <div class="">
        <Header></Header>
        <div class="tab">
            <van-tabs v-model="active">
                <van-tab title="发出的投递">
                    <div class="project">
                        <div v-infinite-scroll="loadMore2" infinite-scroll-disabled="loading">
                            <div v-for="(item, index) in myPageList" :key="index" class="project_list">
                                <p class="title" @click="toSendMoney(item.capitalId)">{{item.capitalName}}</p>
                                <div class="p2 clearfix">
                                    <span class="content1 fll">我的项目：</span>
                                    <span class="content content1 fll">{{item.projectName}}</span>
                                </div>
                                <p class="p2">
                                    接收人：
                                    <span class="">{{item.projectMemberName}}</span>
                                    <span class="time">
                                        <i class="iconfont icon-shijian"></i>
                                        {{item.addTimeStr.substr(0,10)}}
                                        <span class="seconed">{{item.addTimeStr.substr(10,19)}}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <!-- <div class="noData" v-show="myPageList.length == 0">您还没有投递项目</div> -->
                        <div>
                             <div class="noMore" v-if="!(this.totalCount1 > this.myPageList.length)">--- 没有更多数据了 ---</div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="收到的投递">
                    <div class="project">
                        <div v-infinite-scroll="loadMore1" infinite-scroll-disabled="loadings">
                            <div v-for="(item, index) in pageList" :key="index" class="project_list">
                                <p class="title" @click="toSendProject(item.projectId)">{{item.projectName}}</p>
                                <div class="p2 clearfix">
                                    <span class="content1 fll">我的资金：</span>
                                    <span class="content fll">{{item.capitalName}}</span>
                                </div>
                                <p class="p2">
                                    发起人：
                                    <span class="">{{item.capitalMemberName}}</span>
                                    <span class="time">
                                        <i class="iconfont icon-shijian"></i>
                                        {{item.addTimeStr.substr(0,10)}}
                                        <span class="seconed">{{item.addTimeStr.substr(10,19)}}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <!-- <div class="noData" v-show="pageList.length == 0">您还没有收到投递</div> -->
                         <div>
                             <div class="noMore" v-if="!(this.totalCount2 > this.pageList.length)">--- 没有更多数据了 ---</div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import { Tab, Tabs } from 'vant';
    export default {
        components: {
            Header
        },
        data() {
            return {
                active: 0,
                myPageList: [],
                pageList: [],
                loading:false,
                loadings:false,
                pn1:1,
                pn2:2,
                pageNumber1: 1,
                totalCount1: '',
                pageNumber2: 1,
                totalCount2: '',
            };
        },


        methods: {
            loadMore1(){
                this.pn1 += 1;
                this.$axios.get(`/jsp/wap/center/ctrl/jsonDeliverMeList.jsp`,{params:{pageNumber:this.pn1}}).then(res => {
                    this.loading = true
                    if(res.success == "true"){
                        this.pageList = [...this.pageList,...res.data.pageList]
                        this.totalCount1 = Number(res.data.pagination.totalCount);
                        this.loading = false
                    }       
                })
            },
            getSendData() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonDeliverMeList.jsp`).then(res => {
                    console.log("我收到的约谈", res)
                    this.pageList = res.data.pageList
                })
            },
            loadMore2(){
                this.pn2 += 1;
                this.$axios.get(`/jsp/wap/center/ctrl/jsonMyDeliverList.jsp`,{params:{pageNumber:this.pn2}}).then(res => {
                    this.loadings = true
                    if(res.success == "true"){
                        this.myPageList = [...this.myPageList,...res.data.pageList]
                        this.totalCount2 = Number(res.data.pagination.totalCount);
                        this.loadings = false
                    }       
                })
            },
            getBackData() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonMyDeliverList.jsp`).then(res => {
                    console.log("我发起的约谈", res)
                    this.myPageList = res.data.pageList
                })
            },
            toSendProject(id) {
                this.$router.push({ name: 'projectDetail', query: { id } })
            },
            toSendMoney(id) {
                this.$router.push({ name: 'moneyDetail', query: { id } })
            },

        },
        created() {
            this.getBackData()
            this.getSendData()
        }
    };
</script>
<style scoped lang="scss">
    .tab {
        padding-top: .8rem
    }

    /deep/ .van-tabs__line {
        background-color: #005982 !important
    }

    .title {
        color: #005982;
        // font-size: .35rem;
        padding: .2rem
    }

    .project_list {
        border-bottom: .2rem solid #f3f5f7
    }

    .content {
        width: 5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .noData {
        text-align: center;
        margin-top: 2rem
    }
    .noMore{
        text-align: center;
        padding: .2rem 0;
        color: #ccc
    }
    .time{
        color: #ccc
    }
</style>