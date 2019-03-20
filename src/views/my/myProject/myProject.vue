<template>
        <div>
            <Header></Header>
            <div class="detail">
                <div class="aLL">
                    <!-- <div class="titleA" @click="getAll">全部</div>
                    <div class="titleA" @click="getA">草稿箱</div>
                    <div class="titleA" @click="getB">其他</div> -->
                    <div class="titleA" v-for="(item,index) in title" :class="{actived:item.checked == true}" :key="index" @click="getAll(item.status,index)">{{item.name}}</div>
                    <div class="titleA" @click="$router.push('/uploadProject')">快速上传</div>
                </div>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                    <div v-for="(item,index) in pageList" :key="index">
                        <div class="projectBox">
                            <div class="clearfix">
    
                                <div class="peojectTitle fll" @click="toProjectDetailPage(item.id,item.status)">{{item.title}}</div>
                                <span class="flr cancleBtn" v-if="item.status == '0'">未发布</span>
                                <span class="flr cancleBtn" v-else :class="item.status  == '5' ? ' being':'' + item.status == '10' ? ' already':'' + item.status == '15'? ' fail':''">{{item.status == '5' ? '审核中':'' + item.status == '10' ? '已发布':'' + item.status == '15'? '审核失败':''}}
                                </span>
								 <span v-text="'驳回原因:'+item.rebutReason" class="fll cancleBtn" v-if="item.status == '15'" style="margin-top: 0;position: relative;top:-0.3rem;text-align: left;">失败原因</span>
								
                            </div>
                            <div class="textContent">
                                <div class="projectDetail">
                                    <!-- <span>投资资金：</span>
                                    <span class="lookNum">{{item.investAmountName}}</span> -->
                                    {{item.brief}}
                                </div>
                                <div class="clearfix">
                                    <div class="fll startTime">{{item.addTimeStr.slice(0,10)}}</div>
                                    <div class="flr">
                                        <mu-button icon color="Normal" class="delete" @click="$router.push({name:'manageProject',query:{id:item.id}})">
                                            <i class="iconfont icon-edit-1-copy"></i>
                                            <mu-icon value="动态" class="mu-icon"></mu-icon>
                                        </mu-button>
                                        <mu-button icon color="Normal" class="delete" @click="$router.push({name:'issueProject',query:{id:item.id}})">
                                            <i class="iconfont icon-edit-1-copy"></i>
                                            <mu-icon value="修改" class="mu-icon"></mu-icon>
                                        </mu-button>
                                        <mu-button icon color="Normal" class="delete" @click="delete_item(item.id,index)">
                                            <i class="iconfont icon-shanchu"></i>
                                            <mu-icon value="删除" class="mu-icon"></mu-icon>
                                        </mu-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p v-show="pageList.length == 0" class="noAtt">你没有该项目哦~</p>
                <div class="apply" @click="$router.push('/issueProject')">
                    <i class="iconfont icon-youxianzijin"></i>
                    <span>添加项目</span>
                </div>
                <div class="subBtn" @click="$router.push('/projectDeliver')">项目投递</div>
            </div>
    
        </div>
    </template>
    
    <script>
        import Header from "@/components/Header.vue";
        import { MessageBox, Toast } from 'mint-ui';
        export default {
            components: {
                Header,
                MessageBox
            },
            data() {
                return {
                    pageList: [],
                    count: 1,
                    pn: 1,
                    loading: false,
                    status: "",
                    title: [
                        {
                            name: "全部",
                            checked: true,
                            status: ''
                        },
                        {
                            name: "草稿箱",
                            checked: false,
                            status: 0
                        },
                        // {
                        //     name: '审核',
                        //     checked: false,
                        //     status: 1
                        // },
                    ]
                };
            },
            methods: {
                loadMore(status, pageNumber) {
                    this.pn = this.pn + 1
                    this.$axios.get(`/jsp/wap/center/ctrl/jsonMyProjectList.jsp`, { params: { status:this.status, pageNumber: this.pn } }).then(res => {
                        this.loading = true
                        if (res.success == "true") {
                            this.pageList = [...this.pageList, ...res.data.pageList]
                            this.count = res.data.pagination.totalCount
                            this.loading = false
                        }
                    })
                },
                getData(status, pageNumber) {
                    this.loading = true
                    this.$axios.get(`/jsp/wap/center/ctrl/jsonMyProjectList.jsp`, { params: { status, pageNumber:this.pn } }).then(res => {
                        console.log("我的项目", res)
                        this.pageList = res.data.pageList
                        this.count = Number(res.data.pagination.totalCount)
                        this.pn = 1
                        this.loading = false
                    })
                },
                handleApply() {
    
                },
//                 uploadMoney() {
//                     if (this.$store.state.userinfo.isVip != '0') {
//                         MessageBox.confirm('', {
//                             message: '只有会员才能享受快速上传, 是否办理会员?',
//                             title: '提示',
//                             showCancelButton: true
//                         }).then(action => {
//                             if (action == 'confirm') {     //确认的回调
//                                this.$router.push('/vip')
//                             }
//                         }).catch(err => {
//                             if (err == 'cancel') {     //取消的回调
//                             }
//                         });
//                     } else {
//                         this.$router.push('/uploadProject')
//                     }
//                 },
                // 删除一个项目
                delete_item(id, index) {
                    MessageBox.confirm('', {
                        message: '即将删除该项目, 是否继续?',
                        title: '提示',
                        showCancelButton: true
                    }).then(action => {
                        if (action == 'confirm') {     //确认的回调
                            this.$axios.get(`/jsp/wap/center/do/doDelProject.jsp?id=${id}`).then(res => {
                                this.pageList.splice(index, 1)
                                this.count -= 1
                            })
                        }
                    }).catch(err => {
                        if (err == 'cancel') {     //取消的回调
                        }
                    });
                },
                toSendMoney(id) {
                this.$router.push({ name: 'moneyDetail', query: { id } })
            },
                toProjectDetailPage(id, status) {
                    if (status == '10') {
                        this.$router.push({ name: 'projectDetail', query: { id } })
                    }   else if(status == '0'){
                        let instance = Toast('项目尚未发布成功');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }   else{
                        let instance = Toast('项目尚未通过审核');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                },
                // getA() {
                //     this.getData(this.status = 0)
                //     // this.financingWayList[index].checked = !this.financingWayList[index].checked
                // },
                // getB() {
                //     this.getData(this.status = 1)
                // },
                // getAll() {
                //     this.getData(this.status = "")
                // }
                getAll(status, index) {
                    this.title.forEach(item => {
                        item.checked = false
                    })
                    this.title[index].checked = true
                     this.$axios.get(`/jsp/wap/center/ctrl/jsonMyProjectList.jsp`,{params:{status}}).then(res=>{
                     this.pageList = res.data.pageList
                })
                   
                },
            },
            created() {
                this.getData(status)
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
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 5rem
        }
		.projectDetail{
			line-height: 1.2;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical !important;
		}
    
        .cancleBtn {
            margin: 0.1rem 0.3rem 0 0;
            padding: 0 0.2rem;
            height: 0.7rem;
            border: none;
            background: none;
    
            font-size: .24rem;
            font-family: "Microsoft YaHei";
            color: rgb( 102, 102, 102);
            line-height: 3;
        }
    
        .delete {
            width: 1.5rem
        }
    
        .startTime {
            line-height: 3;
            font-family: "PingFang";
            color: rgb( 153, 153, 153);
        }
    
        .lookNum {
            color: #005982;
            font-size: .32rem;
    
        }
    
        .mu-icon {
            font-size: .26rem;
            font-family: "MicrosoftYaHeiLight";
            font-style: normal;
            color: rgb( 102, 102, 102);
        }
    
        .projectBox {
            padding-bottom: .2rem;
            border-bottom: .1rem solid #f3f5f7
        }
    
        .apply {
            width: 1.5rem;
            height: 1.5rem;
            position: fixed;
            bottom: 1.2rem;
            right: .4rem;
            background: #005982;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            .iconfont {
                display: block;
                font-size: .5rem;
                margin-top: .25rem;
            }
            span {
                font-size: .2rem;
                display: block;
				margin-top: .15rem
            }
        }
    
        .noAtt {
            text-align: center;
            margin-top: 4rem
        } // 状态样式
        .being {
            color: #FFA500
        }
    
        .already {
            color: #005982
        }
    
        .fail {
            color: pink
        }
    
        .titleA {
            padding: .3rem
        }
    
        .aLL {
            display: flex;
            justify-content: space-around
        }
    
        .actived {
            color: #005982
        }
    
        .subBtn {
            position: fixed;
            top: 0.2rem;
            right: 0.3rem;
            background: #fff;
            border: 0;
            font-size: 0.28rem;
            color: #005982;
            z-index: 999;
        }
        /deep/ .mint-msgbox-btns{
            height: 1rem;
            line-height: 1rem
        }
        /deep/ .mint-msgbox-btn{
            height: 1rem;
            line-height: 1rem;
        }
	
    </style>