<template>
    <div>
        <Header></Header>
        <div class="detail">
            <div class="clearfix weekTitle">
                <div class="peojectTitle fll">推荐项目</div>
                <span class="flr cancleBtn" @click="$router.push('/project')">更多
                    <i class="iconfont icon-xiangyou"></i>
                </span>
            </div>
            <div class="weekList" v-for="(item,index) in projectList" :key="index + 'project'">
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
                <div class="submitBox">
                    <mt-button type="default" class="nolike" @click="deletePro(index,item.id)">不感兴趣</mt-button>
                    <mt-button type="default" class="islike" v-if="item.isLike == '1'">
                        <i class="iconfont icon-xin-copy likea"></i>感兴趣</mt-button>
                    <mt-button type="default" class="like" v-else @click="likePro(index,item.id)">
                        <i class="iconfont icon-xin-copy"></i>感兴趣</mt-button>
                </div>
            </div>
            <!-- 资金 -->
            <div class="clearfix weekTitle">
                <div class="peojectTitle fll">推荐资金</div>
                <span class="flr cancleBtn" @click="$router.push('/money')">更多
                    <i class="iconfont icon-xiangyou"></i>
                </span>
            </div>
            <div class="weekList" v-for="(item,index) in capitalList" :key="index + 'money'">
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
                <div class="submitBox">
                    <mt-button type="default" class="nolike" @click="deleteMon(index,item.id)">不感兴趣</mt-button>
                    <mt-button type="default" class="islike" v-if="item.isLike == '1'">
                        <i class="iconfont icon-xin-copy likea"></i>感兴趣</mt-button>
                    <mt-button type="default" class="like" v-else @click="likeMon(index,item.id)">
                        <i class="iconfont icon-xin-copy"></i>感兴趣</mt-button>
                </div>
            </div>
            <!-- 新闻 -->
            <div class="clearfix weekTitle">
                <div class="peojectTitle fll">推荐资讯</div>
                <span class="flr cancleBtn" @click="$router.push('/news')">更多
                    <i class="iconfont icon-xiangyou"></i>
                </span>
            </div>
            <div class="weekList" v-for="(item,index) in newsList" :key="index + 'news'">
                <router-link :to="{name:'newsDetail',query:{id:item.resourceId}}">
                    <div class="projectBox">
                        <div class="clearfix rows">
                            <div class="fll">
                                <img :src="$url + item.imgPaths" alt="" class="imgList">
                            </div>
                            <div class="nums fll">
                                <div class="titleBox">
                                    <div class="messageTitleImg">{{item.title}}</div>
                                </div>
                                <div class="newsDescImg">{{item.content}}</div>
                            </div>
                        </div>
                    </div>
                </router-link>
                <div class="submitBox">
                    <mt-button type="default" class="nolike" @click="deleteNews(index,item.id)">不感兴趣</mt-button>
                    <mt-button type="default" class="islike" v-if="item.isLike == '1'">
                        <i class="iconfont icon-xin-copy likea"></i>感兴趣</mt-button>
                    <mt-button type="default" class="like" v-else @click="likeNews(index,item.id)">
                        <i class="iconfont icon-xin-copy"></i>感兴趣</mt-button>
                </div>
            </div>
            <!-- 活动 -->
            <div class="clearfix weekTitle">
                <div class="peojectTitle fll">推荐活动</div>
                <span class="flr cancleBtn" @click="$router.push('/activity')">更多
                    <i class="iconfont icon-xiangyou"></i>
                </span>
            </div>
            <div class="weekList" v-for="(item,index) in activityList" :key="index + 'activity'">
                <router-link :to="{name:'activityDetail',query:{id:item.resourceId}}">
                    <div class="projectBox">
                        <div class="clearfix rows">
                            <div class="fll">
                                <img :src="$url + item.imgPaths" alt="" class="imgList">
                            </div>
                            <div class="nums fll">
                                <div class="titleBox">
                                    <div class="messageTitleImg">{{item.title}}</div>
                                </div>
                                <!-- <div class="newsDescImg">{{item.content}}</div> -->
                                <div class="newsDescImg" v-html="item.content"></div>
                            </div>
                        </div>
                    </div>
                </router-link>
                <div class="submitBox">
                    <mt-button type="default" class="nolike" @click="deleteAct(index,item.id)">不感兴趣</mt-button>
                    <mt-button type="default" class="islike" v-if="item.isLike == '1'"><i class="iconfont icon-xin-copy likea"></i>感兴趣</mt-button>
                    <mt-button type="default" class="like" v-else @click="likeAct(index,item.id)"><i class="iconfont icon-xin-copy"></i>感兴趣</mt-button>
                </div>
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
                active2: 0,
                // 周报详情
                capitalList: [],
                activityList: [],
                newsList: [],
                projectList: [],
            };
        },
        methods: {
            // 周报详情
            getFastNews() {
                let id = this.$route.query.id
                this.$axios.get(`/jsp/wap/center/ctrl/jsonNewsflashList.jsp?id=${id}`).then(res => {
                    console.log("及时快报", res)
                    this.capitalList = res.data.capitalList
                    this.activityList = res.data.activityList
                    this.newsList = res.data.newsList
                    this.projectList = res.data.projectList
                })
            },
            deleteMon(index, id) {
                this.$axios.get(`/jsp/wap/center/do/unlikeNewsflash.jsp?id=${id}`).then(res => {
                    this.capitalList.splice(index, 1)
                    this.capitalList.length -= 1
                   
                })
            },
            deletePro(index, id) {
                this.$axios.get(`/jsp/wap/center/do/unlikeNewsflash.jsp?id=${id}`).then(res => {
                    this.projectList.splice(index, 1)               
                    this.projectList.length -= 1
                })
            },
            deleteNews(index, id) {
                this.$axios.get(`/jsp/wap/center/do/unlikeNewsflash.jsp?id=${id}`).then(res => {
                    this.newsList.splice(index, 1)
                    this.newsList.length -= 1
                })
            },
            deleteAct(index, id) {
                this.$axios.get(`/jsp/wap/center/do/unlikeNewsflash.jsp?id=${id}`).then(res => {
                    this.activityList.splice(index, 1)
                    this.activityList.length -= 1            
                })
            },
            likePro(index, id) {
                this.$axios.get(`/jsp/wap/center/do/likeNewsflash.jsp?id=${id}`).then(res => {
                    this.projectList[index].isLike = '1'
                })
            },
            likeMon(index, id) {
                this.$axios.get(`/jsp/wap/center/do/likeNewsflash.jsp?id=${id}`).then(res => {
                    this.capitalList[index].isLike = '1'
                })
            },
            likeNews(index, id) {
                this.$axios.get(`/jsp/wap/center/do/likeNewsflash.jsp?id=${id}`).then(res => {
                    this.newsList[index].isLike = '1'
                })
            },
            likeAct(index, id) {
                this.$axios.get(`/jsp/wap/center/do/likeNewsflash.jsp?id=${id}`).then(res => {
                    this.activityList[index].isLike = '1'
                })
            },
        },
        created() {
            this.getFastNews()
        }
    };
</script>
<style scoped lang="scss">
    .icon-xinsui {
        font-size: .4rem
    }

    .icon-xin {
        font-size: .3rem
    }

    .subTabs {
        padding: 0.8rem 0 0 0;
        width: 7.5rem !important;
        min-width: 7.5rem !important;
    }

    .detail {
        margin-top: .9rem;
        background: #fff
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
        margin: .05rem 0.3rem 0 0;
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
        color: #444;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
		line-height: 1.3;
    }

    .messageTitleImg {
        font-size: .3rem;
        padding: 0 .3rem;
        color: #444;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 4rem
    }

    .newsDesc {
        line-height: 2;
        padding: 0 .3rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .newsDescImg {
        width: 4rem;
        line-height: 1.6;
        padding: 0 .3rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 1.55rem
    }

    .weekList {
        border-bottom: .1rem solid #fafafa;
        padding: .2rem 0
    }

    .weekTitle {
        border-top: 1px solid #f3f5f7;
        border-bottom: 1px solid #f3f5f7;
    }

    .imgList {
        width: 3rem;
        height: 2rem;
        margin-left: .3rem
    }

    .submitBox {
        padding: .1rem .3rem;
    }

    .like {
		width: 2.4rem;
        height: .6rem;
        border: 1px solid rgb( 0, 89, 130);
        color: rgb( 0, 89, 130);
    }

    .islike {
		
        height: .6rem;
        border: 1px solid rgb( 0, 89, 130);
        color: #fff;
        background: #005982;
    }

    .likea {
        color: #f00;
    }

    .nolike {
		width: 2.4rem;
        height: .6rem;
        border: 1px solid #f3f5f7;
        margin-right: .3rem
    }
</style>