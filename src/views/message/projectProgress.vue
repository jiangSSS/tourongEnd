<template>
    <div class="">
        <!-- <div v-for="(item,index) in projectData" :key="index" class="messageBox">
            <div class="messageTitle">{{item.title}}</div>
            <div class="messageDetail">{{item.content}}</div>
            <img :src=" $url + imgPaths" alt="" v-for="(imgPaths,idx) in item.imgPathList" :key="idx" class="imgList">
            <div class="time">
                <i class="iconfont icon-shijian"></i>
                <span class="seconed">{{item.addTimeStr.slice(0,10)}}</span>
                <span class="seconed">{{item.addTimeStr.slice(10,19)}}</span>
            </div>
        </div> -->
        <div v-for="(item,index) in projectData" :key="index" class="messageBox">
            <div>
                <div class="title" @click="toFocusProject(item.projectId)">{{item.title}}</div>
                <div>
                    <div class="messageTitle">{{item.content}}</div>
                    <img :src=" $url + imgPaths" alt="" v-for="(imgPaths,idx) in item.imgPathList" :key="idx" class="imgList">
                    <div class="messageTime">{{item.addTimeStr.substr(0,10)}}</div>
                </div>
            </div>
        </div>
        <div v-show="noShow" class="noChange">您关注的项目还未发布进展</div>
    </div>
</template>

<script>
    import * as Cookies from 'js-cookie'
    export default {
        data() {
            return {
                projectData: [],
                noShow: false
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonDynamicList.jsp?type=1`).then(res => {
                    console.log("项目进展", res)
                    this.projectData = res.data
                    if (this.projectData.length == 0) {
                        this.noShow = true
                    }
                })
            },
            toFocusProject(id) {
                this.$router.push({ name: 'projectDetail', query: { id } })
            },
        }, 
        created() {
            if (Cookies.get("userKey")) {
                 this.getData()
            }
            // this.getData()
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

    .title{
        border-left: 3px solid #005982;
        padding-left: .1rem;
        margin: .2rem 0;
        overflow: hidden; /*超出部分隐藏*/
        white-space: nowrap; /*不换行*/
        text-overflow: ellipsis;
        font-size: .32rem;
        color: #005982
        
    }
    .messageBox {
        background: #fff;
        padding: .2rem;
        border-bottom: .2rem solid #f3f5f7;    
        .messageTitle {
            font-size: .28rem;
            font-family: "PingFang";
            color: rgb( 51, 51, 51);
        }
        .messageDetail,
            {
            font-size: .28rem;
            font-family: "PingFang";
            color: rgb( 102, 102, 102);
        }
        .messageTime {
            color: #999;
            font-size: .26rem;
            margin: .1rem 0;
        }
    }

    .noChange {
        text-align: center;
        color: #ccc;
        margin-top: 2rem
    }

    .imgList {
        width: 2.25rem;
        padding-right: .2rem;
        height: 1.5rem;
    }

    .seconed {
        color: #999
    }
</style>