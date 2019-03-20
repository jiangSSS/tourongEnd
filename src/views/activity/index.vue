<template>
    <div id="father">
        <vue-drawer-layout ref="drawerLayout" :reverse="true" @mask-click="handleMaskClick">
            <div class="drawer" slot="drawer">
                <div class="text">
                    <div class="chooseBox">
                        <div class="title">活动类型</div>
                        <div class="choose">
                            <div class="sbuTitle clearfix">
                                <span class="fll">请选择活动标签</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow" @click="isShow = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow = false"></i>
                            </div>
                            <div class="type" v-show="isShow">
                                <span v-for="(item,index) in categoryList" :key="index" @click="getCategory(item.dataValue,index)" :class="{activeBox:item.checked}">{{item.dataName}}</span>
                            </div>
                        </div>
                        <div class="clearfix sureChoose">
                            <mu-button class="chooseBtn fll" @click="handleCancle">清空</mu-button>
                            <mu-button class="chooseBtn flr sure" @click="handleSure">确定</mu-button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="son" class="content" slot="content">
                <div class="text">
                    <div class="all">
                        <Header></Header>
                        <div class="detail">
                            <div class="statusBox">
                                <span class="type_item" v-for="(item , index) in statusList" :key="index" @click="getStatus(item.statusValue,index)" :class="{active:item.checked}">{{item.statusName}}</span>
                                <span class="type_item" @click="handleToggleDrawer">活动类型</span>
                            </div>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                                <div class="applyBox" v-for="(item,index) in pageList" :key="index">
                                    <router-link :to="{path:'/activityDetail',query:{id:item.id}}">
                                        <div class="imgWarp">
                                            <div class="imgBox">
                                                <img :src="$url + item.imgPath" alt="" class="imgPath">
                                                <span class="flr rightTop">{{item.statusStr}}</span>
                                                <div class="applyNum">
                                                    <i class="iconfont icon-gongzuohuibao"></i>
                                                    <span>报名数量：</span>
                                                    <span>{{item.applyNum}}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="applyDesc">
                                            <div class="applyTitle">{{item.title}}</div>
                                            <div class="company">
                                                <span>主办：</span>
                                                <span>{{item.speaker}}</span>
                                            </div>
                                        </div>
                                    </router-link>
                                    <div class="applyDesc">
                                        <div class="clearfix">
                                            <div class="fll timeAddress">
                                                <div class="timeAddressList">
                                                    <i class="iconfont icon-dizhi"></i>
                                                    <span>地点:</span>
                                                    <span>{{item.address}}</span>
                                                </div>
                                                <div class="timeAddressList">
                                                    <i class="iconfont icon-shijian"></i>
                                                    <span>时间:</span>
                                                    <span>{{ item.regStartTimeStr.slice(0,10)}} 至 {{item.regEndTimeStr.slice(0,10)}}</span>
                                                </div>
                                            </div>
                                            <mt-button type="default" class="flr" :class="item.status == 1 ? 'applyBtn' : 'overBtn'" @click="to_sign_up(item)">
                                                {{item.status == 1 ? '立即报名' :'' + item.status == 0 ? '活动预告':'' + item.status == -1 ? '往期回顾' : ''}}
                                            </mt-button>
                                        </div>
                                    </div>
                                </div>
                                <ToTop></ToTop>
                                <div>
                                    <div class="noData" v-show="more">加载中...</div>
                                    <div class="noData" v-show="noMore">--- 没有更多数据了 ---</div>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <a class="totop" id="totop" @click="goTop" v-show="isShowToTop">
                                <img src="../../../static/app/img/backTop.png" class="top" alt="">
                            </a>
                        </div>
                        <Footer class="footer"></Footer>
                    </div>
                </div>
            </div>
        </vue-drawer-layout>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    import ToTop from "@/components/toTop.vue"
	import { Toast } from "mint-ui"

    export default {
        components: {
            Header,
            Footer,
            ToTop,
        },
        data() {
            return {
                more: false,
                noMore: false,
                showTop: false,
                isShow: false,
                active1: 0,
                pn: 1,
                pageNumber: 1,
                pageList: [],
                isShowData: false,
                loading: false,
                isLoading: false,

                category: '',
                status: '',

                totalCount: [],
                categoryList: [],
                statusList: [],

                isShowToTop:false
            }
        },
        methods: {
			/* 我要报名 */
			to_sign_up(item){
				//alert(item.id)
				 this.$axios.get('/jsp/wap/trActivity/do/isSignUp.jsp', {
					params: {
						activityId: item.id
					}
				})
				.then(response=> {

					//alert(response.data.isSignUp)
					if(response.data.isSignUp==1){
						let instance = Toast('您已经报过名');
						setTimeout(() => {
							instance.close();
						}, 2000);



					}else{
						this.$router.push({
							name:'activityDetail',
							query:{id:item.id},
							})

					}
				})
				.catch(function (error) {
					console.log(error);
				});

			},
            // 打开筛选
            handleToggleDrawer() {this.$refs.drawerLayout.toggle();},
            // 关闭筛选
            handleMaskClick() {this.$refs.drawerLayout.toggle(false);},
            // 上拉加载
            loadMore() {
                this.pn += 1
                this.$axios.get('/jsp/wap/trActivity/ctrl/jsonActivityPage.jsp', { params: { statuss: this.status, categorys: this.category, pageNumber: this.pn } }).then(res => {
                    this.loading = true
                    if (res.success == "true") {
                        this.pageList = [...this.pageList, ...res.data.pageList]
                        this.totalCount = res.data.pagination.totalCount
                        if (this.totalCount > this.pageList.length) {
                            this.more = true
                            this.noMore = false
                        } else {
                            this.more = false
                            this.noMore = true
                        }
                        // this.loading = false;
                    }
                })
            },
            // 活动列表
            getActivityList(status, category) {
                // this.loading = true
                this.$axios.get(`/jsp/wap/trActivity/ctrl/jsonActivityPage.jsp?`, { params: { statuss: this.status, categorys: this.category } }).then(res => {
                    console.log("活动列表", res)
                    if (res.success == "true") {
                        this.pageList = res.data.pageList
                        this.totalCount = res.data.pagination.totalCount
                        this.pn = 1
                        if (this.totalCount > this.pageList.length) {
                            this.more = true
                            this.noMore = false
                        } else {
                            this.more = false
                            this.noMore = true
                        }
                        this.loading = false
                    }
                })
            },

            // 分类列表
            getTypeData() {
                this.$axios.get('/jsp/wap/trActivity/ctrl/jsonCategoryList.jsp').then(res => {
                    console.log("活动分类", res)
                    if (res.success == "true") {
                        let statusList = res.data.statusList
                        statusList.forEach(item => {
                            this.$set(item, 'checked', false)
                        });
                        this.statusList = statusList

                        let categoryList = res.data.categoryList
                        categoryList.forEach(item => {
                            this.$set(item, 'checked', false)
                        });
                        this.categoryList = categoryList
                    }
                })
            },
            // 状态分类
            getStatus(e, index) {
                this.status = e
                if (this.statusList[index].checked) {
                    this.statusList[index].checked = !this.statusList[index].checked
                    this.status = ''
                } else {
                    this.statusList.forEach(item => {
                        item.checked = false
                    });
                    this.statusList[index].checked = true
                }
                this.getActivityList(this.status, this.category)
            },
            // 筛选分类
            getCategory(e, index) {
                this.category = e
                if (this.categoryList[index].checked) {
                    this.categoryList[index].checked = !this.categoryList[index].checked
                    this.category = ''
                } else {
                    this.categoryList.forEach(item => {
                        item.checked = false
                    });
                    this.categoryList[index].checked = true
                }
            },
            // 确定筛选
            handleSure() {
                this.getActivityList(this.status, this.category)
                this.$refs.drawerLayout.toggle(false);

            },
            // 清空
            handleCancle() {
                this.categoryList.forEach(item => {
                    item.checked = false
                });
                this.getActivityList(this.category = "")
            },
            goTop() {
                let scrollTop = this.$body.scrollTop + this.$docElement.scrollTop;
                let speed = Math.floor(scrollTop / 6);
                this.$body.scrollTop = this.$docElement.scrollTop = this.scrollTop - (speed < 1 ? 1 : speed);
            },
            pageToTop() {
                let scrollTop = this.$body.scrollTop + this.$docElement.scrollTop;
                if (scrollTop > 300) {
                    this.isShowToTop = true;
                } else {
                    this.isShowToTop = false;
                }
            },
        },
          mounted () {
            this.$docElement = document.getElementById('son')
            this.$body = document.getElementById('father');
            this.pageToTop();
            document.getElementById('son').addEventListener('scroll', this.pageToTop);
        },
        created() {
            this.getActivityList(this.status, this.category)
            this.getTypeData()
        },
    }
</script>
<style scoped lang="scss">
    .detail {
        padding-top: .8rem;
        padding-bottom: 1.3rem;
    }

    .all {
        height: 100vh;
    }

    .content {
        overflow: scroll;
    }

    img {
        width: 100%
    }

    .subTabs {
        background: #fff;
        padding: 0;
    }

    .container {
        padding: 0
    }

    .applyBox {
		background: #fff;
		width: 100%;
		display: block;
		overflow: hidden;
		padding: .2rem;
		border-bottom: .2rem solid #f1f1f1;
    }

    .subTab {
        font-size: .5rem !important;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        line-height: 2.727;
        text-align: center;
        background: #fff
    }

    .messageBox {
        background: #fff;
        padding: .2rem;
        margin-top: .2rem;
        .messageTitle {
            font-size: .32rem;
            font-family: "PingFang";
            color: rgb( 51, 51, 51);
        }
        .messageDetail,
        .messageTime {
            font-size: .28rem;
            font-family: "PingFang";
            color: rgb( 102, 102, 102);

        }
    }

    .imgBox {
        height: 3.5rem;
        margin: 0 auto;
        color: #fff;
        background-size: 100% 100%;
        position: relative;
    }

    .imgPath {
        width: 100%;
        height: 100%;
    }，

    /deep/ .mu-tabs-inverse {
        background: #fff;

    }

    .rightTop {
        margin: .2rem .2rem 0 0;
        background: rgba(0, 0, 0, .5);
        border-radius: 4px;
        padding: .06rem .15rem;
        position: absolute;
        top: 0;
        right: 0;

    }

    .applyNum {
        position: absolute;
        bottom: 0;
        padding: 0 0 .1rem .2rem;
        width: 100%;
        background: linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
        background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
        background: -moz-linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
        background: -ms-linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
        background: -o-linear-gradient(bottom, rgba(0, 0, 0, .5), transparent);
    }

    .applyDesc {
       margin-top: .2rem;
	   position: relative;
    }

    .overBtn {
        background: #ccc;
        color: #fff;
        width: 1.8rem;
        height: .7rem;
        line-height: .7rem;
        margin-right: .2rem;
        margin-top: .13rem
    }

    .applyBtn {
        background: #005982;
        color: #fff;
        width: 1.8rem;
        margin-right: .2rem;
        margin-top: .13rem;
    }
	/deep/.mint-button{
		padding: .15rem 0;
		height: inherit;
		line-height: inherit;
		font-size:.28rem;
		position: absolute;
		bottom: 0;
		right: 0;
	}
    .applyTitle {
        font-size: .32rem;
        color: rgb( 51, 51, 51);
        font-weight: bold;
        line-height: 2;


    }

    .company span {
        font-size: .28rem;
        color: rgb( 102, 102, 102);
        line-height: 1.6
    }
	.timeAddress {width: 100%; display: block; overflow: hidden}
    .timeAddress span {
        color: rgb( 179, 179, 179);
        font-size: .26rem;
		line-height: 1.5;
    }
	.timeAddressList{ margin-top: .15rem; margin-bottom: .25rem}
	.timeAddressList:last-child{ margin-bottom: .1rem}
    .iconfont,
    a {
        color: rgb( 179, 179, 179);
    }

    .active {
        color: #005982 !important;
        border-bottom: 3px solid #005982
    }

    .statusBox {
        padding-left: .3rem;
      margin-bottom: -.5rem ;
    }

    .type_item {
        color: #666;
        cursor: pointer;
        padding: .3rem 0 .25rem;
		width: 25%; float: left; text-align: center;
        display: inline-block;
    }

    /* 筛选 */

    .chooseBox {
        background: #fff;
        z-index: 1000;
    }

    .choose {
        overflow: scroll;
        height: 100vh;
        padding-bottom: 2rem
    }

    .title {
        text-align: center;
        line-height: 3;
        border-bottom: 1px solid #fafafa
    }

    .sbuTitle {
        font-size: .28rem;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        font-weight: bold;
        line-height: 4;
        padding: 0 .2rem;
        border-bottom: 1px solid #fafafa;
    }

    .type {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #fafafa;
        padding: .2rem .2rem .3rem;
    }

    .type span {
        background: #eee;
        width: 1.6rem;
        text-align: center;
        padding: .1rem .15rem;
        border-radius: 10%;
        margin-right: .2rem;
        margin-top: .2rem;
        font-size: .24rem;
        font-family: "PingFang";
        color: rgb( 102, 102, 102);
    }

    .type span.activeBox {
        background: #005982;
        color: #fff;
    }

    .sureChoose {
        position: absolute;
        width: 100%;
        bottom: 0;
    }

    .chooseBtn {
        width: 50%;
        padding: .6rem 0;
        font-size: .3rem;
    }

    .sure {
        background: #005982;
        color: #fff
    }

    /* 多选框 */

    #moneyType {
        width: 2rem
    }

    .checkItem {
        width: 100%;
        padding: 0 .2rem;
        line-height: 2;
        border-bottom: 1px dashed #fafafa;
    }
    .top{
        width: .7rem;
        height: .7rem;
    }
    .totop {
        position: fixed;
        right: .6rem;
        bottom: 1.5rem;
        cursor: pointer;
    }
</style>
