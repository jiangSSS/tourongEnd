<template>
    <div>
        <Header></Header>
        <div class="detail">
            <div class="clearfix weekTitle">
                <div class="peojectTitle fll">项目精选</div>
                <span class="flr cancleBtn" @click="$router.push('/project')">更多
                    <i class="iconfont icon-xiangyou"></i>
                </span>
            </div>
            <div class="weekList" v-for="item in projectData" :key="item.index">
                <router-link :to="{name:'projectDetail',query:{id:item.resourceId}}">
                    <div class="projectBox">
                        <div class="clearfix rows">
                            <div class="nums clearfix">
                                <div class="titleBox">
                                    <div class="messageTitle">{{item.title}}</div>
                                </div>
                                <div class="newsDesc">
                                    {{item.content}}
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <!-- 资金 -->
            <div class="clearfix weekTitle">
                <div class="peojectTitle fll">资金对接</div>
                <span class="flr cancleBtn" @click="$router.push('/money')">更多
                    <i class="iconfont icon-xiangyou"></i>
                </span>
            </div>
             <div class="weekList" v-for="(item,index) in moneyData" :key="index">
                <router-link :to="{name:'moneyDetail',query:{id:item.resourceId}}">
                    <div class="projectBox">
                        <div class="clearfix rows">
                            <div class="nums clearfix">
                                <div class="titleBox">
                                    <div class="messageTitle">{{item.title}}</div>
                                </div>
                                <div class="newsDesc">
                                    {{item.content}}
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <!-- 新闻 -->
            <div class="clearfix weekTitle">
                <div class="peojectTitle fll">新闻精选</div>
                <span class="flr cancleBtn" @click="$router.push('/news')">更多
                    <i class="iconfont icon-xiangyou"></i>
                </span>
            </div>
            <div class="weekList" v-for="item in messageData" :key="item.index">
                <router-link :to="{name:'newsDetail',query:{id:item.resourceId}}">
                    <div v-if="item.img" class="projectBox">
                        <div class="clearfix rows">
                            <div class="fll">
                                <img :src="$url + item.imgPaths" alt="" class="imgList">
                            </div>
                            <div class="nums flr">
                                <div class="titleBox titleImg">
                                    <div class="messageTitle">{{item.title}}</div>
                                </div>
                                <div class="newsDesc">
                                    {{item.content}}
                                </div>
                            </div>

                        </div>
                    </div>
                      <div v-else class="projectBox">
                        <div class="clearfix rows">
                            <div class="fll tc">
                                <img :src="$url + item.imgPaths" alt="" class="imgList">
                            </div>
                            <div class="nums fll">
                                <div class="titleBox titleImg">
                                    <div class="messageTitle">{{item.title}}</div>
                                </div>
                                <div class="newsDesc" v-html="item.content">
                                    
                                </div>
                            </div>

                        </div>
                    </div>
                </router-link>
            </div>
            <!-- 活动 -->
            <div class="clearfix weekTitle">
                <div class="peojectTitle fll">活动精选</div>
                <span class="flr cancleBtn" @click="$router.push('/activity')">更多
                    <i class="iconfont icon-xiangyou"></i>
                </span>
            </div>
            <div class="weekList" v-for="item in actlist" :key="item.index">
                <router-link :to="{name:'activityDetail',query:{id:item.resourceId}}">
                    <div class="projectBox">
                        <div class="clearfix rows">
                            <div class="fll tc">
                                <img :src="$url + item.imgPaths" alt="" class="imgList">
                            </div>
                            <div class="nums fll">
                                <div class="titleBox">
                                    <div class="messageTitle">{{item.title}}</div>
                                </div>
                                <div class="newsDesc" v-html="item.content">
                                    <!-- {{item.content}} -->
                                </div>
                            </div>

                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import { MessageBox } from 'mint-ui';
    import { Dialog } from "vant";
    import { Toast } from "mint-ui"
    export default {
        components: {
            Header,
            MessageBox,
            Toast
        },
        data() {
            return {

                // 周报详情
                projectData: [],
                moneyData: [],
                messageData: [],
                actlist: [],
                issue: 1,
                time: ''
            };
        },
        methods: {
            // 周报详情
            getWeekDetail() {
                let id = this.$route.query.id
                this.issue = this.$route.query.issue
                this.time = this.$route.query.time
                this.$axios.get(`/jsp/wap/center/ctrl/jsonWeeklyDetail.jsp?id=${id}`).then(res => {
                    console.log("周报详情", res)
                    this.actlist = res.data.activityList
                    this.projectData = res.data.projectList
                    this.messageData = res.data.newsList
                    this.moneyData = res.data.capitalList
                })
            }
        },
        created() {
            this.getWeekDetail()
        }
    };
</script>
<style scoped lang="scss">
    .subTabs {
        padding: 0.8rem 0 0 0;
        width: 7.5rem !important;
        min-width: 7.5rem !important;
    }

    .detail {
        margin-top: .9rem
    }

    .textContent {
        padding: 0 .3rem
    }

    .peojectTitle {
        border-left: 3px solid #005982;
        margin: 0.3rem;
        padding-left: 0.2rem;
        font-size: 0.3rem;
        font-family: "PingFang";
        color: rgb(51, 51, 51);
        line-height: 1.533;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 5rem;

    }

    .cancleBtn {
        padding: 0 0.2rem;
        height: 0.7rem;
        border: none;
        background: none;

        font-size: .24rem;
        font-family: "Microsoft YaHei";
        color: rgb( 102, 102, 102);
        line-height: 3;
    }

    .messageTitle {
        font-size: .3rem;
        padding: 0 .3rem;
        color: #666;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 7.5rem;
		line-height: 1.8
    }

    .newsDesc {
        padding: 0 .3rem;
        color: #999;
        line-height: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 1.7rem;
		width: 7.5rem

    }

    .weekList {
        border-bottom: .2rem solid #f3f5f7;
        padding: .2rem 0
    }

    .weekTitle {
        border-top: 1px solid #f3f5f7;
        border-bottom: 1px solid #f3f5f7;
    }

    .imgList {
        width: 90%;
    }
</style>