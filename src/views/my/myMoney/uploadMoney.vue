<template>
    <div class="">
        <Header></Header>
        <div class="tab">
            <van-tabs v-model="active">
                <van-tab title="上传资金信息">
                    <div class="project">
                        <div class="rows heightRows">
                            <div class="rows">
                                <span>
                                    <i style="color:#f00">*</i> 资金标题</span>
                                <input class="oneInput" type="text"  v-model="applyTitle">
                            </div>
                            <div>
                                <!-- <span v-show="errors.has('项目标题')" class="error">{{ errors.first('项目标题')}}</span> -->
                            </div>
                            <div class="rows">
                                <span style="color:#f00">*</span>
                                <span class="desc">上传文件</span>
                                <van-uploader :after-read="onRead" accept multiple action class="file">
                                    <mt-button type="default" class="btn">添加文件</mt-button>
                                </van-uploader>
                            </div>
                            <div v-for="(item,index) in fileList" :key="index" class="fileBox">
                                <div class="fileItem">{{item.name}}</div>
                            </div>
                            <div class="submitBox">
                                <mt-button type="default" class="submit" @click="submit(5)">提交</mt-button>
                            </div>

                        </div>
                    </div>
                </van-tab>
                <van-tab title="快速上传列表">
                    <div class="project">
                        <div v-for="(item , index) in pageList" :key="index" class="invest-item">

                            <div class="clearfix titleBox">
                                <div class="title fll" @click="toMoneyDetailPage(item.id,item.applyStatus)">
                                    {{item.applyTitle}}
                                </div>
                                <div class="flr not" v-if="item.applyStatus != '0'" :class="item.applyStatus  == '5' ? ' being':'' + item.applyStatus == '10' ? ' already':'' + item.applyStatus == '15'? ' fail':''">{{item.applyStatus == '5' ? '审核中':'' + item.applyStatus == '10' ? '已发布':'' + item.status
                                    == '15'? '':''}}</div>
                                <div class="flr not" v-else>待审核</div>

                            </div>
                            <!-- <span class="flr" :class="item.check == 0 ? ' already':'' + item.check == 1 ? ' being':'' + item.check == 2 ? ' not':'' + item.check == 3 ? ' fail':''">{{item.check == 0 ? '已发布':'' + item.check == 1 ? '审核中':'' + item.check == 2 ? '未发布':''}}</span> -->
                            <div class="clearfix">
                                <mu-button icon color="Normal" class="delete flr" @click="delete_item(item.id,index)">
                                    <i class="iconfont icon-shanchu"></i>
                                    <mu-icon value="删除" class="mu-icon"></mu-icon>
                                </mu-button>

                                <div class="time fll">{{item.applyTimeStr}}</div>
                            </div>

                            <!-- <el-button type="primary" icon="el-icon-edit" circle class="flr cancel1" size="mini" @click="amend(item.id)"></el-button> -->
                            <!-- <mt-button class="cancel2" @click="delete_item(item.id,index)"></mt-button> -->


                            <p v-show="pageList.length == 0" class="noAtt">你没有使用过上传资金哦~</p>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import { Tab, Tabs } from "vant";
    import qs from "qs";
    import { Toast, MessageBox } from "mint-ui";
    export default {
        components: {
            Header
        },
        data() {
            return {
                active: 1,
                fileList: [],
                fileNames: [],
                filePaths: [],
                applyTitle: "",
                count:1,
                pageList: []
            };
        },
        methods: {
            getData() {
                this.$axios
                    .get("/jsp/wap/center/ctrl/jsonCapitalApplyList.jsp")
                    .then(res => {
                        console.log(res)
                        if (res.success == "true") {
                            this.pageList = res.data.pageList;
                            this.count = Number(res.data.pagination.totalCount);
                        }
                    });
            },
            toMoneyDetailPage(id, status) {
                if (status == '10') {
                    let { href } = this.$router.resolve({
                        name: "moneyDetail",
                        query: { id }
                    });
                    window.open(href, '_blank');
                } else {
                    let instance = Toast('资金尚未通过审核');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }
            },
            delete_item(id, index) {
                MessageBox.confirm('', {
                    message: '即将删除该资金, 是否继续?',
                    title: '提示',
                    showCancelButton: true
                }).then(action => {
                    if (action == 'confirm') {     //确认的回调
                        this.$axios.get(`/jsp/wap/center/do/doDelDatumApply.jsp?id=${id}`).then(res => {
                            this.pageList.splice(index, 1)
                            this.count -= 1
                        })
                    }
                }).catch(err => {
                    if (err == 'cancel') {     //取消的回调
                    }
                });
            },
            submit(applyStatus) {
                if (this.applyTitle && this.fileList.length != 0) {
                    var fileNames = this.fileNames.join(";=;");
                    var filePaths = this.filePaths.join(",");
                    var params = {
                        applyTitle: this.applyTitle,
                        fileNames,
                        filePaths,
                        applyStatus
                    };
                    this.$axios.post("/jsp/wap/center/do/doCapitalDatumApply.jsp", qs.stringify(params)).then(res => {
                        console.log(res)
                        if (res.success == "true") {
                            if (applyStatus == 0) {
                                let instance = Toast('保存成功');
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                            } else {
                                let instance = Toast('资金提交成功');
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                            }
                            setTimeout(() => {
                                window.history.go(0)    
                               
                            }, 2000);
                        }
                    });
                } else {
                    let instance = Toast('请完成必填项');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }
            },

            onRead(f) {
                let param = new FormData(); //创建form对象
                param.append("file", f.file); //通过append向form对象添加数据
                let config = {
                    headers: { "content-type": "multipart/form-data" }
                };
                //添加请求头
                this.$axios
                    .post("/component/trUpload2/uploadify", param, config)
                    .then(res => {
                        if (res.success == true) {
                            console.log(res);
                            this.fileNames.push(res.data.originalName);
                            this.filePaths.push(res.data.relativePath);
                            this.fileList.push({
                                name: res.data.originalName,
                                url: res.data.relativePath
                            });
                            let instance = Toast("上传成功");
                            setTimeout(() => {
                                instance.close();
                            }, 1000);
                        } else {
                            let instance = Toast("上传失败，请检查网络");
                            setTimeout(() => {
                                instance.close();
                            }, 1000);
                        }
                    });
            }
        },
        created() {
            this.getData()
        }
    };
</script>
<style scoped lang="scss">
    .tab {
        padding-top: 0.8rem;
    }

    /deep/ .van-tabs__line {
        background-color: #005982 !important;
    }

    .title {
        color: #005982; // font-size: .35rem;
        padding: 0 .2rem;
        border-left: 3px solid #005982;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 5.2rem;
        margin-left: .2rem;
        font-size: .32rem; // margin-top: .2rem
        // line-height: 2
    }

    .not {
        padding-right: .4rem;
        color: #faa251;
    }

    .invest-item {
        border-bottom: .2rem solid #f3f5f7
    }

    .titleBox {
        margin-top: .3rem
    }

    .project_list {
        border-bottom: 0.2rem solid #f3f5f7;
    }

    .content {
        width: 5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .noData {
        text-align: center;
        margin-top: 2rem;
    }

    .noMore {
        text-align: center;
        padding: 0.2rem 0;
        color: #ccc;
    }

    .time {
        color: #ccc;
        padding: 0 .2rem;
        line-height: 2;
        margin-top: .2rem
    }

    ;

    .submitBox {
        // text-align: center;
        padding: 0 0.2rem;
    }

    .submit {
        background: #005982;
        color: #fff; // text-align: center;
        width: 2rem;
        margin-top: 1rem;
    }

    .oneInput {
        border: 1px solid #ccc; // border-radius: 8%;
        height: 0.6rem;
        width: 5rem;
        padding: 0 0.1rem;
    }

    .rows {
        padding: 0.2rem; // text-align: center;
    }

    .file {
        height: 0.6rem;
    }

    .error {
        color: #f00;
        padding-left: 1.8rem;
        font-size: 0.2rem;
    }

    .fileBox {
        padding-left: .4rem;
        color: #005982;
    }

    .being {
        color: #FFA500
    }

    .already {
        color: #005982
    }

    .fail {
        color: pink
    }

    .delete {
        width: 2rem
    }
</style>