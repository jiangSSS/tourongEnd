<template>
    <div class="">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
            <div class="step" v-for="(item,index) in projectList" :key="index">
                <div class="itemBox">
                    <div class="clearfix">
                        <div class="peojectTitle fll" @click="$router.push({name:'projectDetail',query:{id:item.id}})">
                            {{item.title}}
                        </div>
                        <mt-button class="flr cancleBtn" @click="cancelBtn(item.id,index)">
                            取消关注
                        </mt-button>
                    </div>
                    <div class="progress">
                        <!-- <van-steps direction="vertical" :active="0" active-color="#005982" icon="icon-shijian">
                            <van-step v-for="(item,index) in item.progress" :key="index">
                                <h3>{{item.name}}</h3>
                                <p>
                                    <span>{{item.time}}</span>
                                    <span class="nowTime" v-show="isShow">最新动态</span>
                                </p>
                            </van-step>
                        </van-steps> -->
                        <div class="brief" @click="$router.push({name:'projectDetail',query:{id:item.id}})"> {{item.brief}}</div>
                    </div>
                </div>
            </div>
        </div>
        <p v-show="projectList.length == 0" class="noAtt">
            你没有关注任何项目哦~
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
                pn: 1,
                count: 1,
                loading: false,
                pageNumber: 1,
                projectList: [],
            }
        },
        methods: {
            cancelBtn(id, index) {
                this.$axios.get(`/jsp/wap/trProject/do/doUnfollow.jsp?id=${id}`).then(res => {
                    if (res.success == 'true') {
                        this.projectList.splice(index, 1)
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
                this.$axios.get('/jsp/wap/center/ctrl/jsonFollowList.jsp?type=1', {
                    params: {
                        pageNumber: this.pn
                    }
                }).then(res => {
                     this.loading = true
                    if (res.success == "true") {
                        this.projectList = [...this.projectList, ...res.data.pageList]
                        this.count = res.data.pagination.totalCount
                        this.loading = false
                    }
                })
            },
            // 我的关注项目列表
            getData() {
                this.$axios.get('/jsp/wap/center/ctrl/jsonFollowList.jsp?type=1').then(res => {
                    console.log(res);
                    if (res.success == 'true') {
                        this.projectList = res.data.pageList
                        this.count = Number(res.data.pagination.totalCount)
                    }
                })
            },
            // toProjectDetailPage(id) {
            //     this.$router.push({path:"/project",query:{id}})
            // },
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
        width: 5.2rem;
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
    .brief {
        padding: 0 .2rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
		line-height: 1.4;
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