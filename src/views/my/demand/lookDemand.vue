<template>
    <div class="">
        <div v-for="(item,index) in pageList" :key="index">
            <div class="projectBox">
                <div class="clearfix">
                    <div class="projectTitle fll">{{item.typeStr}}</div>
                    <!-- <mu-button icon color="Normal" class="delete" @click="handleDelete(item.id,index)">
                        <i class="iconfont icon-shanchu"></i>
                        <mu-icon value="删除" class="mu-icon"></mu-icon>
                    </mu-button> -->
                </div>
                <div class="textContent">
                    <div class="content">
                        <span>内容：</span>
                        <span class="lookNum">{{item.content}}</span>

                    </div>
                    <div class="clearfix time">
                        <div class="fll startTime">{{item.addTimeStr}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="noData" v-show="this.pageList.length == 0">还没有需求哦</div>
    </div>
</template>

<script>
    import { Toast, MessageBox } from "mint-ui"
    export default {
        data() {
            return {
                pageList: []
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonFeedbackList.jsp`).then(res => {
                    console.log("需求列表", res)
                    this.pageList = res.data.pageList
                })
            },
            // handleDelete(id, index) {
            //     MessageBox.confirm('', {
            //         message: '即将删除该需求, 是否继续?',
            //         title: '提示',
            //         showCancelButton: true
            //     }).then(action => {
            //         if (action == 'confirm') {     //确认的回调
            //             this.$axios.get(`/jsp/wap/center/do/doDelProject.jsp?id=${id}`).then(res => {
            //                 this.pageList.splice(index, 1)
            //                 this.count -= 1
            //                 let instance = Toast("删除成功");
            //                 setTimeout(() => {
            //                     instance.close();
            //                 }, 2000);
            //             })
            //         } else {
            //             let instance = Toast(res.message);
            //             setTimeout(() => {
            //                 instance.close();
            //             }, 2000);
            //         }
            //     }).catch(err => {
            //         if (err == 'cancel') {     //取消的回调
            //         }
            //     });
            // },
        },
        created() {
            this.getData()
        }
    }
</script>
<style scoped lang="scss">
    .projectTitle {
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
        width: 5.3rem;

    }

    .projectBox {
        border-bottom: .15rem solid #f3f5f7
    }

    .content {
        padding: 0 .3rem
    }

    .time {
        padding: .1rem .3rem;
        color: #999
    }

    .delete {
        width: 1.5rem
    }
    .noData{
        text-align: center;
        color: #ccc;
        margin-top: 2rem
    }
</style>