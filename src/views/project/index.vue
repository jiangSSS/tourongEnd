<template>
    <div id="father">
        <vue-drawer-layout ref="drawerLayout" :reverse="true" @mask-click="handleMaskClick">
            <div class="drawer" slot="drawer">
                <div class="text">
                    <div class="chooseBox">
                        <div class="title">项目筛选</div>
                        <div class="choose">
                            <div class="sbuTitle clearfix">
                                <span class="fll">融资方式</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow" @click="isShow = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow = false"></i>
                            </div>
                            <div class="type" v-show="isShow">
                                <span class="radioItem" v-for="(item,index) in financingWayList" :key="index" :class="{active:item.checked}" @click="wayCheckItem(item.dataValue,index)">{{item.dataName}}</span>
                            </div>
                            <div class="sbuTitle clearfix">
                                <span class="fll">所属行业（可多选）</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow1" @click="isShow1 = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow1 = false"></i>
                            </div>
                            <div class="type" v-show="isShow1">
                                <van-checkbox-group v-model="result" @change="industryItem">
                                    <van-checkbox v-for="(item, index) in industryList" :key="index" :name="item" class="checkItem" checked-color="#005982">
                                        {{ item.dataName }}
                                    </van-checkbox>
                                </van-checkbox-group>
                                <!-- <span v-for="(item, index) in industryList" :key="index" class="checkBtn" :class="(item.like == 0 ? ' nolike' : ' like')" @click="checkItem1(index)">{{item.dataName}}</span> -->
                            </div>
                            <div class="sbuTitle clearfix">
                                <span class="fll">所在地区（可多选）</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow2" @click="isShow2 = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow2 = false"></i>
                            </div>
                            <div class="type" v-show="isShow2">
                                <van-checkbox-group v-model="area" @change="areaItem">
                                    <van-checkbox v-for="(item, index) in regionList" :key="index" :name="item" class="checkItem" checked-color="#005982">
                                        {{ item.dataName }}
                                    </van-checkbox>
                                </van-checkbox-group>
                                <!-- <label v-model="area" @change="areaItem">
                                    <button  v-for="(item, index) in regionList" :key="index" :name="item" class="radioItem buttonCheck" :class="{active:item.checked}">{{item.dataName}}</button>    
                                </label> -->
                                <!-- <span v-for="(item, index) in regionList" :key="index" class="checkBtn" :class="(item.like == 0 ? ' nolike' : ' like')" @click="checkItem2(index)">{{item.dataName}}</span> -->
                                <!-- <label v-for="(item, index) in regionList" :key="index" class="checkBtn" :class="{active:isActive2 == true}" @click="checkItem2(index)"><input type="checkbox">{{item.dataName}}</label> -->
                            </div>
                            <div class="sbuTitle clearfix">
                                <span class="fll">融资金额</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow3" @click="isShow3 = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow3 = false"></i>
                            </div>
                            <div class="type" v-show="isShow3">
                                <div v-for="(item, index) in financingMoneyList" :key="index" class="radioItem" :class="{active:item.checked}" @click="moneyCheckItem(item.dataValue,index)">{{item.dataName}}</div>
                            </div>
                        </div>
                        <div class="clearfix sureChoose">
                            <mu-button class="chooseBtn fll" @click="handleRemove">清空</mu-button>
                            <mu-button class="chooseBtn flr sure" @click="handleSure">确定</mu-button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="son" class="content" slot="content">
                <div class="text">
                    <div class="index">
                        <div class="header clearfix">
                            <div class="flr" @click="sendProject">
                                <button class="sendMoney">发布资金</button>
                            </div>
                            <div class="search fll">
                                <input type="text" placeholder="请输入内容" v-model="title" class="input_search" />
                                <i class="iconfont icon-sousuo1" @click="search"></i>
                            </div>
                        </div>
                        <div class="detail">
                            <div class="chooseTitle">
                                <div class="titleA" v-for="(item,index) in sortList" :class="{actived:item.checked == true}" :key="index" @click="getAll(item.sort,index)">{{item.name}}</div>
                                <div class="titleA" @click="handleToggleDrawer">筛选</div>
                            </div>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                                <div class="projectList" v-for="(item,index) in pageList" :key="index">
                                    <router-link :to="{path:'/project/projectDetail',query:{id:item.id}}">
                                        <div class="projectTitle">{{item.title}}</div>
                                        <div class="projectDetail">{{item.brief}}</div>
                                    </router-link>
                                    <div class="clearfix">
                                        <div class="fll projectTime">
                                            <i class="iconfont icon-shijian"></i>
                                            <span>{{item.addTimeStr}}</span>
                                        </div>
                                        <div class="sendBtn flr" @click="handleCustomer(item.id)">
                                            投递资金
                                        </div>
                                    </div>
                                </div>
                                <!-- <div>
                                    <div class="noData" v-show="more">加载中...</div>
                                    <div class="noData" v-show="noMore">--- 没有更多数据了 ---</div>
                                </div> -->
                                <div class="noData" v-if="this.totalCount > pageList.length">加载中...</div>
                                <div class="noData" v-else>--- 没有更多数据了 ---</div>
                                <mu-dialog width="400" center class="applyDialog" :open.sync="isShowApply">
                                    <select class="oneRows" v-model="moneyId">
                                        <option :value="item.id" v-for="item in myMoney" :key="item.index" :label="item.title">{{item.title}}</option>
                                    </select>
                                    <div class="btnSend">
                                        <mu-button class="applyBtn" @click="closeApply">确认</mu-button>
                                        <mu-button class="applyBtn" @click="isShowApply = false">取消</mu-button>
                                    </div>
                                </mu-dialog>
                            </div>
                        </div>
                        <!-- <vueToTop></vueToTop> -->
                        <!-- <ToTop></ToTop> -->
                        <div class="">
                            <a class="totop" id="totop" @click="goTop" v-show="isShowToTop">
                                <img src="../../../static/app/img/backTop.png" class="top" alt="">
                            </a>
                        </div>
                    </div>
                    <Footer class="footer"></Footer>
                </div>
            </div>
        </vue-drawer-layout>

    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Bottom.vue";
    import ToTop from "@/components/toTop.vue"
    import $ from "webpack-zepto"
    import { Dialog } from "vant";
    import { Toast } from "mint-ui"
    import * as Cookies from 'js-cookie'
    export default {
        components: {
            Footer,
            Header,
            ToTop
            // Choose
        },
        data() {
            return {
                area: [],
                pageList: [],
                loading: false,
                pn: 1,
                pageNumber: 1,
                totalCount: '',

                // more: false,
                // noMore: false,
                // 
                isShow: false,
                isShow1: false,
                isShow2: false,
                isShow3: false,
                isActive3: 0,
                isActive2: 0,
                isActive: 0,
                result: [],
                financingMoneyList: [],
                financingWayList: [],
                industryList: [],
                regionList: [],
                industrys: "",
                regions: "",
                financingWays: "",
                financingMoneys: "",
                title: "",
                isShowApply: false,
                myMoney: [],
                projectId: "",
                moneyId: "",
                myMoney_Count: 0,
                myMoney_pagination: false,
                sort: '',
                sortList: [
                    {
                        name: "综合排序",
                        checked: false,
                        sort: 1
                    },
                    {
                        name: "时间排序",
                        checked: false,
                        sort: 2
                    }
                ],

                isShowToTop: false,
                isLoading: false

            };
        },
        methods: {
            // 获取我的资金列表
            getMyMoney(pn) {
                this.$axios.get("/jsp/wap/center/ctrl/jsonIssueCapitalList.jsp", {
                    params: { pageNumber: pn }
                }).then(res => {
                    this.myMoney = res.data.pageList;
                    var myMoney = res.data.pageList
                    if (myMoney.length > 0) {
                        this.moneyId = myMoney[0].id
                    }
                    // this.myMoney_Count = Number(res.data.pagination.totalCount);
                });
            },
            // 约见项目方
            handleCustomer(id) {
                if (Cookies.get("userKey")) {
                    if (this.myMoney.length == 0) {
                        let instance = Toast('您还没有发布资金，请先发布资金');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    } else {
                        this.isShowApply = true;
                        this.id = id;
                    }
                }
                else {
                    let instance = Toast('您还未登录，请先登录');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }
            },
            // 确认投递 关闭投递框
            closeApply() {
                this.$axios.get("/jsp/wap/trProject/do/doBespoke.jsp", {
                    params: { id: this.id, moneyId: this.moneyId }
                })
                    .then(res => {
                        if (res.success == "true") {
                            let instance = Toast('提交成功，平台将尽快为您安排');
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                        } else {
                            let instance = Toast(res.message);
                            setTimeout(() => {
                                instance.close();
                            }, 2000);
                        }
                    });
                setTimeout(() => {
                    this.isShowApply = false;
                }, 500);
            },
            onRefresh() {
                setTimeout(() => {
                    let instance = Toast("刷新成功");
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                    this.isLoading = false;
                }, 500);
            },
            // 打开筛选
            handleToggleDrawer() { this.$refs.drawerLayout.toggle(); },
            // 关闭筛选
            handleMaskClick() { this.$refs.drawerLayout.toggle(false); },
            // 上拉加载
            loadMore(sort) {
                this.pn += 1
                // this.loading = true         
                this.$axios.get('/jsp/wap/trProject/ctrl/jsonProjectPage.jsp', {
                    params: {
                        // sort:this.sort,
                        financingWays: this.financingWays,
                        financingMoneys: this.financingMoneys,
                        industrys: this.industrys,
                        regions: this.regions,
                        pageNumber: this.pn,
                        sort: this.sort
                    }
                }).then(res => {
                    // this.pn += 1
                    this.loading = true
                    if (res.success == "true") {
                        this.pageList = [...this.pageList, ...res.data.pageList]
                        this.totalCount = Number(res.data.pagination.totalCount)
                        this.loading = false
                    }
                })
            },
            // 获取项目列表
            getProjectList(sort, financingMoneys, financingWays, industrys, regions) {
                this.loading = true
                this.$axios.get(`/jsp/wap/trProject/ctrl/jsonProjectPage.jsp`, {
                    params: {
                        sort, financingMoneys, financingWays, industrys, regions
                    }
                }).then(res => {
                    console.log("项目列表", res)
                    // this.loading = true
                    if (res.success == "true") {
                        this.pageList = res.data.pageList
                        this.totalCount = Number(res.data.pagination.totalCount)
                        this.loading = false
                    }
                });
            },
            // --- 筛选 ---
            // 投资方式筛选
            wayCheckItem(e, index) {
                this.financingWays = e
                if (this.financingWayList[index].checked) {
                    this.financingWayList[index].checked = !this.financingWayList[index].checked
                    this.financingWays = ''
                } else {
                    this.financingWayList.forEach(item => {
                        item.checked = false
                    });
                    this.financingWayList[index].checked = true
                }
            },
            // 投资金额筛选
            moneyCheckItem(e, index) {
                this.financingMoneys = e
                if (this.financingMoneyList[index].checked) {
                    this.financingMoneyList[index].checked = !this.financingMoneyList[index].checked
                    this.financingMoneys = ''
                } else {
                    this.financingMoneyList.forEach(item => {
                        item.checked = false
                    });
                    this.financingMoneyList[index].checked = true
                }
            },
            // 所属行业筛选
            industryItem(val) {
                let industryList = []
                val.forEach(item => {
                    industryList.push(item.dataValue)
                })
                this.industrys = industryList.join(',')
            },
            // 地区筛选
            areaItem(val) {
                let regionList = []
                val.forEach(item => {
                    regionList.push(item.dataValue)
                })
                this.regions = regionList.join(',')
                this.getProjectList(this.financingMoneys, this.financingWays, this.industrys, this.regions)
            },
            // --- 全部分类 ---
            getTypeData() {
                this.$axios.get(`/jsp/wap/trProject/ctrl/jsonCategoryList.jsp`).then(res => {
                    console.log("项目分类", res)
                    if (res.success == "true") {
                        let financingMoneyList = res.data.financingMoneyList
                        financingMoneyList.forEach(item => {
                            this.$set(item, 'checked', false)
                        });
                        financingMoneyList.unshift({ dataName: '不限' })
                        this.financingMoneyList = financingMoneyList

                        let financingWayList = res.data.financingWayList
                        financingWayList.forEach(item => {
                            this.$set(item, 'checked', false)
                        });
                        financingWayList.unshift({ dataName: '不限' })
                        this.financingWayList = financingWayList

                        let industryList = res.data.industryList
                        industryList.forEach(item => {
                            this.$set(item, 'checked', false)
                        });
                        industryList.unshift({ dataName: '不限' })
                        this.industryList = industryList

                        let regionList = res.data.regionList
                        regionList.forEach(item => {
                            this.$set(item, 'checked', false)
                        });
                        regionList.unshift({ dataName: '不限' })
                        this.regionList = regionList
                    }
                })
            },
            // 清空
            handleRemove() {
                this.area = []
                this.result = []
                var region = []
                this.regionList.forEach(item => {
                    region.pop(item.dataValue)
                })
                this.financingMoneyList.forEach(item => {
                    item.checked = false
                });
                this.financingWayList.forEach(item => {
                    this.$set(item, 'checked', false)
                });
                this.getProjectList(this.financingMoneys = "", this.financingWays = "", this.industrys = "", this.regions = "")
            },
            // 确定筛选
            handleSure() {
                this.getProjectList(this.sort, this.financingMoneys, this.financingWays, this.industrys, this.regions)
                // 关闭筛选
                this.$refs.drawerLayout.toggle(false);
            },
            // 搜索
            search() {
                this.$axios.get("/jsp/wap/trProject/ctrl/jsonProjectPage.jsp", {
                    params: { financingWays: this.financingWays, regions: this.regions, industrys: this.industrys, financingMoneys: this.financingMoneys, title: this.title }
                }).then(res => {
                    if (res.success == "true") {
                        this.pageList = res.data.pageList;
                        this.totalCount = res.data.pagination.totalCount;
                        this.pn = 1;
                    }
                });
            },
            // 发布资金
            sendProject() {
                if (Cookies.get('userKey')) {
                    this.$router.push('/issueMoney')
                } else {
                    this.$router.push('/login')
                }
            },
            // 排序
            getAll(sort, index) {
                this.sortList.forEach(item => {
                    item.checked = false
                })
                this.sortList[index].checked = true
                this.getProjectList(sort, this.financingMoneys, this.financingWays, this.industrys, this.regions)

            },
            goTop() {
                // this.timer = setInterval(() => {
                    let scrollTop = this.$body.scrollTop + this.$docElement.scrollTop;
                    let speed = Math.floor(scrollTop / 6);
                    this.$body.scrollTop = this.$docElement.scrollTop = this.scrollTop - (speed < 1 ? 1 : speed);
                // }, 30);
            },
            pageToTop() {
                let scrollTop = this.$body.scrollTop + this.$docElement.scrollTop;
                if (scrollTop > 300) {
                    this.isShowToTop = true;
                } else {
                    this.isShowToTop = false;
                }
                // if (scrollTop === 0) {
                //     clearInterval(this.timer);
                // }
            },
            // debounce(fn, delay, timeout) {
            //     var timer = null;
            //     var last = new Date().getTime();
            //     delay = delay || 300;
            //     timeout = timeout || 300;
            //     return () => {
            //         if (timer) {
            //             clearTimeout(timer);
            //         }
            //         timer = setTimeout(fn, delay);
            //         if (new Date().getTime() > last + timeout) {
            //             fn.apply(this, [].slice.call(Array, arguments));
            //             last = new Date().getTime();
            //             clearTimeout(timer);
            //         }
            //     };
            // }
            
        },
        mounted() {
            this.$docElement = document.getElementById('son')
            this.$body = document.getElementById('father');
            this.pageToTop();
            // document.getElementById('son').addEventListener('scroll', this.debounce(this.pageToTop));
            document.getElementById('son').addEventListener('scroll', this.pageToTop);
        },
        created() {
            this.getProjectList(this.sort, this.financingMoneys, this.financingWays, this.industrys, this.regions)
            this.getTypeData()
            if (Cookies.get("userKey")) {
                this.getMyMoney()
            }
        }
    };
</script>
<style scoped lang="scss">
    .detail {
        padding-bottom: 1.2rem;
    }

    .actived {
        color: #005982
    }

    .buttonCheck {
        outline: none;
        border: 0
    }

    .Area {
        background: #fff;
        border: 0;
        color: #666
    }

    .like {
        background: #005982;
        color: #fff
    }

    .header {
        background: #fff !important;
    }

    img {
        width: 100%;
    }

    .index {
        height: 100vh;
    }

    /* 筛选 */

    .chooseTitle {
        background: #fff;
        border-top: 1px solid #fafafa;
        display: flex;
        justify-content: space-around;
        padding: 0.3rem 0;
    }

    /* End */

    .content {
        overflow: scroll;
    }

    .tab {
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 0;
    }

    .tab img {
        width: 90%;
        height: 2rem;
    }

    .projectList {
        padding: 0.3rem;
        background: #fff;
        border-bottom: .2rem solid #f1f1f1
    }

    .projectTitle {
        padding: .1rem 0;
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb(62, 58, 57);
        font-weight: bold;
        line-height: 1;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .projectDetail {
        font-size: 0.26rem;
        margin: 0.2rem 0;
        font-family: "PingFang";
        color: rgb(137, 137, 137);
        line-height: 1.5;
        text-align: justifyLeft;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .projectTime {
        span {
            font-size: .26rem;
        }
        .iconfont {
            font-size: .2rem !important
        }
        font-family: "PingFang";
        color: #ccc;
        line-height: 1.385;
        text-align: left;
    }

    .sendBtn {
        border: 1px solid #005982;
        border-radius: 2px;
        display: inline-block;
        color: #005982;
        padding: 0.1rem 0.2rem;
        line-height: 1.25;
        font-family: "PingFang";
        font-size: 0.23rem;
        font-weight: bold;
        opacity: 0.7;
    }

    .search {
        margin: 0.2rem;
        background: #fafafa
    }

    .icon-sousuo {
        line-height: 2;
    }

    .sendMoney {
        border: 0;
        background: none;
        color: #005982;
        padding-right: 0.3rem;
        line-height: 3;
    }

    .sendMoney:focus {
        outline: none;
    }

    .input_search {
        border: 0;
        color: rgb(153, 153, 153);
        background: #fafafa;
        width: 4.6rem;
        border-radius: 4px;
        font-family: "PingFang";
        line-height: 2.103;
        padding: 0 0.2rem;
    }

    .input_search:focus {
        outline: none;
    }

    .input_search::-webkit-input-placeholder {
        padding-left: 0.3rem;
    } 

	// -------筛选--------
    .chooseBox {
        background: #fff;
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
        color: rgb(51, 51, 51);
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

    .type .checkBtn {
        width: 1.6rem;
        text-align: center;
        padding: .1rem .15rem;
        border-radius: 10%;
        margin-right: .2rem;
        margin-top: .2rem;
        font-size: .24rem;
        font-family: "PingFang";
        cursor: pointer;
    }

    .type input {
        display: none
    }

    .radioItem {
        background: #eee;
        color: rgb(102, 102, 102);
        width: 1.6rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        border-radius: 10%;
        margin-right: .2rem;
        margin-top: .2rem;
        font-size: .24rem;
        font-family: "PingFang";
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .active {
        background: #005982;
        color: #fff
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

    .applyBtn {
        /* width: 90%; */
        background: #005982;
        color: #fff;
        margin-top: 0.4rem;
    }

    .btnSend {
        text-align: center;
    }

    /deep/ .mu-dialog-body {
        padding: .7rem .5rem .5rem
    }

    .oneRows {
        width: 4.6rem
    }

    .totop {
        position: fixed;
        right: .6rem;
        bottom: 1.5rem;
        cursor: pointer;
    }

    .icon-fanhuidingbu1 {
        font-size: .4rem;
        color: #666
    }

    .top {
        width: .7rem;
        height: .7rem;
    }
</style>