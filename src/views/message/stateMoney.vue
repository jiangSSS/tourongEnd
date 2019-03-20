<template>
    <div class="">
        <div v-for="(item,index) in MoneyData" :key="index" class="messageBox">
            <div>
                <div class="title" @click="toFocusMoney(item.projectId)">{{item.title}}</div>
                <div>
                    <div class="messageTitle">{{item.content}}</div>
                    <img :src=" $url + imgPaths" alt="" v-for="(imgPaths,idx) in item.imgPathList" :key="idx" class="imgList">
                    <div class="messageTime">{{item.addTimeStr.substr(0,10)}}</div>
                </div>
            </div>
        </div>
        <div v-show="noShow" class="noChange">您关注的资金还未发布动态</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                MoneyData: [],
                noShow: false
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonDynamicList.jsp?type=2`).then(res => {
                    console.log("资金动态", res)
                    this.MoneyData = res.data
                    if (this.MoneyData.length == 0) {
                        this.noShow = true
                    }
                })
            },
            toFocusMoney(id){
                this.$router.push({name:"moneyDetail",query:{id}})
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
</style>