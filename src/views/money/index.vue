<template>
    <div id="father">
        <vue-drawer-layout ref="drawerLayout" :reverse="true" @mask-click="handleMaskClick">
            <div class="drawer" slot="drawer">
                <div class="text">
                    <div class="chooseBox">
                        <div class="title">资金筛选</div>
                        <div class="choose">
                            <div class="sbuTitle clearfix">
                                <span class="fll">投资行业</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow2" @click="isShow2 = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow2 = false"></i>
                            </div>
                            <div class="type" v-show="isShow2">
                                <van-checkbox-group v-model="investIndustrysa" @change="investIndustry">
                                    <van-checkbox v-for="(item, index) in investIndustryList" :key="index" :name="item" class="checkItem" checked-color="#005982">{{ item.dataName }}</van-checkbox>
                                </van-checkbox-group>
                                <!-- <span class="radioItem" v-for="(item,index) in investIndustryList" :key="index" :class="{active:item.checked}" @click="investIndustry(item.dataValue,index)">{{item.dataName}}</span> -->
                            </div>
                            <div class="sbuTitle clearfix">
                                <span class="fll">资金类型</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow" @click="isShow = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow = false"></i>
                            </div>
                            <div class="type" v-show="isShow">
                                <van-checkbox-group v-model="investTypesa" @change="investType">
                                    <van-checkbox v-for="(item, index) in investTypeList" :key="index" :name="item" class="checkItem" checked-color="#005982">{{ item.dataName }}</van-checkbox>
                                </van-checkbox-group>
                                <!-- <span class="radioItem" v-for="(item,index) in investTypeList" :key="index" :class="{active:item.checked}" @click="investType(item.dataValue,index)">{{item.dataName}}</span> -->
                            </div>
                            <div class="sbuTitle clearfix">
                                <span class="fll">所属地区（可多选）</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow1" @click="isShow1 = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow1 = false"></i>
                            </div>
                            <div class="type" v-show="isShow1">
                                <van-checkbox-group v-model="regionArea" @change="regionAreaItem">
                                    <van-checkbox v-for="(item, index) in regionList" :key="index" :name="item" class="checkItem" checked-color="#005982">{{ item.dataName }}</van-checkbox>
                                </van-checkbox-group>
                                <!-- <span class="radioItem" v-for="(item,index) in regionList" :key="index" :class="{active:item.checked}" @click="region(item.dataValue,index)">{{item.dataName}}</span> -->
                            </div>
                            <div class="sbuTitle clearfix">
                                <span class="fll">投资地区（可多选）</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow3" @click="isShow3 = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow3 = false"></i>
                            </div>
                            <div class="type" v-show="isShow3">
                                <van-checkbox-group v-model="investRegionArea" @change="investRegionItem">
                                    <van-checkbox v-for="(item, index) in investRegionList" :key="index" :name="item" class="checkItem" checked-color="#005982">{{ item.dataName }}</van-checkbox>
                                </van-checkbox-group>
                                <!--  -->
                                <!-- <span
                                v-for="(item,index) in investRegionList"
                                :key="index"
                                class="babel_btn"
                                :class="(item.checked == false ? 'nolike':'like')"
                                @click="investRegionItem(item.dataValue,index)"
                              >{{item.dataName}}</span> -->
                                <!-- <span class="radioItem" v-for="(item,index) in investRegionList" :key="index" :class="{active:item.checked}" @click="investRegion(item.dataValue,index)">{{item.dataName}}</span> -->
                             </div>
                            <div class="sbuTitle clearfix">
                                <span class="fll">投资金额</span>
                                <i class="iconfont icon-xiangxia flr" v-if="!isShow4" @click="isShow4 = true"></i>
                                <i class="iconfont icon-shouqi flr" v-else @click="isShow4 = false"></i>
                            </div>
                            <div class="type" v-show="isShow4">
                                <span class="radioItem" v-for="(item,index) in investAmountList" :key="index" :class="{active:item.checked}" @click="investAmount(item.dataValue,index)">{{item.dataName}}</span>
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
                            <div class="flr" @click="sendMoney">
                                <button class="sendMoney">发布项目</button>
                            </div>
                            <div class="search fll">
                                <input type="text" placeholder="请输入内容" v-model="title" class="input_search">
                                <i class="iconfont icon-sousuo1" @click="search"></i>
                            </div>
                        </div>
                        <div class="detail">
                            <div class="chooseTitle">
                                <!-- <div>综合排序</div>
                                <div>时间排序</div> -->
                                <div class="titleA" v-for="(item,index) in sortList" :class="{actived:item.checked == true}" :key="index" @click="getAll(item.sort,index)">{{item.name}}</div>
                                <div class="titleA" @click="handleToggleDrawer">筛选</div>
                            </div>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                                <div class="moneyList" v-for="item in pageList" :key="item.index">
                                    <router-link :to="{path:'/money/moneyDetail',query:{id:item.id}}">
                                        <div class="moneyTitle">{{item.title}}</div>
                                        <div class="moneyDetail">{{item.investRequire}}</div>
                                    </router-link>
                                    <div class="clearfix">
                                        <div class="fll moneyTime">
                                            <i class="iconfont icon-shijian"></i>
                                            <span>{{item.addTimeStr}}</span>
                                        </div>
                                        <div class="sendBtn flr" @click="handleSend(item.id)">
                                            <!-- {{item.sendBtn}} -->
                                            投递项目
                                        </div>
                                    </div>
                                </div>
                                <!-- <div>
                                    <div class="noData" v-show="more">加载中...</div>
                                    <div class="noData" v-show="noMore">--- 没有更多数据了 ---</div>
                                </div> -->
                                <div class="noData" v-if="this.totalCount > pageList.length">加载中...</div>
                                <div class="noData" v-else>--- 没有更多数据了 ---</div>
                                <!-- <div class="noData" v-if="this.pageList.length == 0">--- 没有更多数据了 ---</div> -->
                                <mu-dialog width="400" center class="applyDialog" :open.sync="isShowApply">
                                    <select class="oneRows" v-model="projectId">
                                        <option :value="item.id" v-for="item in myProject" :key="item.index" :label="item.title">{{item.title}}</option>
                                    </select>
                                    <mu-button class="applyBtn" @click="closeApply">确认</mu-button>
                                    <mu-button class="applyBtn" @click="isShowApply = false">取消</mu-button>
                                </mu-dialog>
                            </div>
                        </div>
                        <!-- <vueToTop></vueToTop> -->
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
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Bottom.vue";
    import { Dialog } from "vant";
    import { Toast } from "mint-ui"
    import * as Cookies from "js-cookie";
    export default {
        components: {
            Footer,
            Header
        },
        data() {
            return {
                isShowApply: false,
                pageList: [],
                loading: false,
                pn: 1,
                pageNumber: 1,
                totalCount: '',
                myProject: [],
                projectId: "",
                moneyId: "",
                myMoney_Count: 0,

                // more: false,
                // noMore: false,
                //
                isShow: false,
                isShow1: false,
                isShow2: false,
                isShow3: false,
                isShow4: false,
                result: [],
                investAmountList: [],
                investIndustryList: [],
                investRegionList: [],
                investTypeList: [],
                regionList: [],
                investAmounts: "",
                investIndustrys: "",
                investRegions: "",
                investTypes: "",
                regions: "",
                investIndustrysa: [],
                investTypesa: [],
                investRegionArea: [],
                regionArea: [],

                title: "",
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

                isShowToTop:false
            };
        },
        methods: {
            // 获取我的项目
            getMyProject(pn) {
                this.$axios.get("/jsp/wap/center/ctrl/jsonIssueProjectList.jsp", {
                    params: { pageNumber: pn }
                }).then(res => {
                    console.log("我的项目去投递", res)
                    this.myProject = res.data.pageList;
                    var myProject = res.data.pageList
                    if (myProject.length > 0) {
                        this.projectId = myProject[0].id
                    }
                    // this.myProject_Count = Number(res.data.pagination.totalCount);
                });
            },
            // 投递
            handleSend(id) {
                if (Cookies.get("userKey")) {
                    if (this.myProject.length == 0) {
                        let instance = Toast('您还没有发布项目，请先发布项目');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    } else {
                        this.isShowApply = true;
                        this.moneyId = id;
                    }
                }
                else {
                    let instance = Toast('您未登录，请先登录');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }
            },
            // 确认投递 关闭投递框
            closeApply() {
                this.$axios.get("/jsp/wap/trCapital/do/doDeliver.jsp", {
                    params: { id: this.moneyId, projectId: this.projectId }
                })
                    .then(res => {
                        if (res.success == "true") {
                            let instance = Toast('项目投递成功，平台将尽快为您安排');
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
            // 打开筛选
            handleToggleDrawer() {
                this.$refs.drawerLayout.toggle();
            },
            // 关闭筛选
            handleMaskClick() {
                console.info("mask-click");
                this.$refs.drawerLayout.toggle(false);
            },
            // 获取更多
            loadMore(sort) {
                this.pn += 1;
                this.$axios.get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
                    params: {
                        // sort: this.sort,
                        investAmounts: this.investAmounts,
                        investIndustrys: this.investIndustrys,
                        investRegions: this.investRegions,
                        investTypes: this.investTypes,
                        regions: this.regions,
                        pageNumber: this.pn,
                        sort: this.sort,
                    }
                }).then(res => {
                    this.loading = true
                    if (res.success == "true") {
                        this.pageList = [...this.pageList, ...res.data.pageList];
                        this.totalCount = Number(res.data.pagination.totalCount);
                        // if (this.totalCount > this.pageList.length) {
                        //     this.more = true
                        //     this.noMore = false
                        // } else {
                        //     this.more = false
                        //     this.noMore = true
                        // }
                        this.loading = false;
                    }
                });
            },
            // 投资列表
            getDatalList(
                sort,
                investAmounts,
                investIndustrys,
                investRegions,
                investTypes,
                regions
            ) {
                this.loading = true;
                this.$axios.get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
                    params: {
                        sort,
                        investAmounts,
                        investIndustrys,
                        investRegions,
                        investTypes,
                        regions
                    }
                })
                    .then(res => {
                        console.log("投资列表", res);
                        // this.loading = true
                        if (res.success == "true") {
                            this.pageList = res.data.pageList;
                            this.totalCount = Number(res.data.pagination.totalCount);
                            // this.pn = 1;
                            // if (this.totalCount > this.pageList.length) {
                            //     this.more = true
                            //     this.noMore = false
                            // } else {
                            //     this.more = false
                            //     this.noMore = true
                            // }
                            this.loading = false;
                        }
                    });
            },
            // 投资分类
            getTypeData() {
                this.$axios
                    .get(`/jsp/wap/trCapital/ctrl/jsonCategoryList.jsp`)
                    .then(res => {
                        console.log("投资分类", res);
                        if (res.success == "true") {
                            let investAmountList = res.data.investAmountList;
                            investAmountList.forEach(item => {
                                this.$set(item, "checked", false);
                            });
                            this.investAmountList = investAmountList;
                            let investIndustryList = res.data.investIndustryList;
                            investIndustryList.forEach(item => {
                                this.$set(item, "checked", false);
                            });
                            investIndustryList.unshift({ dataName: "不限" });
                            this.investIndustryList = investIndustryList;

                            let investRegionList = res.data.investRegionList;
                            investRegionList.forEach(item => {
                                this.$set(item, "checked", false);
                            });
                            investRegionList.unshift({ dataName: "不限" });
                            this.investRegionList = investRegionList;

                            let regionList = res.data.regionList;
                            regionList.forEach(item => {
                                this.$set(item, "checked", false);
                            });
                            this.regionList = regionList;

                            let investTypeList = res.data.investTypeList;
                            investTypeList.forEach(item => {
                                this.$set(item, "checked", false);
                            });
                            investTypeList.unshift({ dataName: "不限" });
                            this.investTypeList = investTypeList;
                        }
                    });
            },
            // 投资行业筛选
            // investIndustry(e, index) {
            //     this.investIndustrys = e;
            //     if (this.investIndustryList[index].checked) {
            //         this.investIndustryList[index].checked = !this.investIndustryList[index]
            //             .checked;
            //         this.investIndustrys = "";
            //     } else {
            //         this.investIndustryList.forEach(item => {
            //             item.checked = false;
            //         });
            //         this.investIndustryList[index].checked = true;
            //     }
            // },
            investIndustry(val) {
                let investIndustryList = [];
                val.forEach(item => {
                    investIndustryList.push(item.dataValue);
                });
                this.investIndustrys = investIndustryList.join(",");
            },
            // 资金类型筛选
            // investType(e, index) {
            //     this.investTypes = e;
            //     if (this.investTypeList[index].checked) {
            //         this.investTypeList[index].checked = !this.investTypeList[index]
            //             .checked;
            //         this.investTypes = "";
            //     } else {
            //         this.investTypeList.forEach(item => {
            //             item.checked = false;
            //         });
            //         this.investTypeList[index].checked = true;
            //     }
            // },
            investType(val) {
                let investTypeList = [];
                val.forEach(item => {
                    investTypeList.push(item.dataValue);
                });
                this.investTypes = investTypeList.join(",");
            },
            // 投资金额筛选
            investAmount(e, index) {
                this.investAmounts = e;
                if (this.investAmountList[index].checked) {
                    this.investAmountList[index].checked = !this.investAmountList[index].checked;
                    this.investAmounts = "";
                } else {
                    this.investAmountList.forEach(item => {
                        item.checked = false;
                    });
                    this.investAmountList[index].checked = true;
                }
            },
            // 所属地区
            regionAreaItem(val) {
                let regionList = [];
                val.forEach(item => {
                    regionList.push(item.dataValue);
                });
                this.regions = regionList.join(",");
            },
            // 投资地区
            investRegionItem(val) {
                let investRegionList = [];
                val.forEach(item => {
                    investRegionList.push(item.dataValue);
                });
                this.investRegions = investRegionList.join(",");
                this.getDatalList(this.investAmounts, this.investIndustrys, this.investRegions, this.investTypes, this.regions);
            },
            // 清空
            handleRemove() {
                this.investIndustrysa = [],
                    this.investTypesa = [],
                    this.investRegionArea = [],
                    this.regionArea = [],
                    this.investAmountList.forEach(item => {
                        this.$set(item, 'checked', false)
                    });
                this.getDatalList(this.investAmounts = "", this.investIndustrys = "", this.investRegions = "", this.investTypes = "", this.regions = ""
                );
            },
            // 确定
            handleSure() {
                this.getDatalList(this.sort,this.investAmounts, this.investIndustrys, this.investRegions, this.investTypes, this.regions);
                this.$refs.drawerLayout.toggle(false);
            },
            //  搜索
            search() {
                this.$axios.get("/jsp/wap/trCapital/ctrl/jsonCapitalPage.jsp", {
                    params: {
                        investIndustrys: this.investIndustrys,
                        investTypes: this.investTypes,
                        regions: this.regions,
                        investRegions: this.investRegions,
                        investAmounts: this.investAmounts,
                        title: this.title
                    }
                }).then(res => {
                    if (res.success == "true") {
                        this.pageList = res.data.pageList;
                        this.totalCount = res.data.pagination.totalCount;
                        this.pn = 1;
                    }
                });
            },
            // 发布项目
            sendMoney() {
                if (Cookies.get("userKey")) {
                    this.$router.push("/issueProject");
                } else {
                    this.$router.push("/login");
                }
            },
            // 排序
            getAll(sort, index) {
                this.sortList.forEach(item => {
                    item.checked = false
                })
                this.sortList[index].checked = true
                this.getDatalList(sort, this.investAmounts, this.investIndustrys, this.investRegions, this.investTypes, this.regions)
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
            this.getDatalList(
                this.sort,
                this.investAmounts,
                this.investIndustrys,
                this.investRegions,
                this.investTypes,
                this.regions
            );
            this.getTypeData();
            if (Cookies.get("userKey")) {
                this.getMyProject();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .detail {
        padding-bottom: 1.2rem 
    }

    img {
        width: 100%;
    }

    /* 头部 */

    .search {
        margin: 0.2rem;
        background: #fafafa;
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
        width: 4.6rem;
        border-radius: 4px;
        font-family: "PingFang";
        line-height: 2.103;
        padding: 0 0.2rem;
        background: #fafafa;
    }

    .input_search:focus {
        outline: none;
    }

    .input_search::-webkit-input-placeholder {
        padding-left: 0.3rem;
    }

    /* End */

    .index {
        height: 100vh;
    }

    .content {
        overflow: scroll;
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

    /* 列表 */

    .moneyList {
        padding: 0.3rem;
        background: #fff;
        border-bottom: 0.2rem solid #fafafa;
    }

    .moneyTitle {
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb(62, 58, 57);
        font-weight: bold;
		line-height: 1.2;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
		padding: .1rem 0;
    }

    .moneyDetail {
        font-size: 0.26rem;
        margin: .15rem 0;
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

    .moneyTime {
        font-family: "PingFang";
        color: #ccc;
        line-height: 1.385;

        span {
            font-size: 0.26rem;
        }
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

    /* End */
	.header{
		background: #fff!important
	}
    .checkItem {
        width: 100%;
        padding: 0 0.2rem;
        line-height: 2;
        border-bottom: 1px dashed #fafafa;
    }

    /* ---筛选--- */

    .chooseBox {
        background: #fff;
    }

    .choose {
        overflow: scroll;
        height: 100vh;
        padding-bottom: 2rem;
    }

    .title {
        text-align: center;
        line-height: 3;
        border-bottom: 1px solid #fafafa;
    }

    .sbuTitle {
        font-size: 0.28rem;
        font-family: "PingFang";
        color: rgb(51, 51, 51);
        font-weight: bold;
        line-height: 4;
        padding: 0 0.2rem;
        border-bottom: 1px solid #fafafa;
    }

    .type {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #fafafa;
        padding: 0.2rem 0.2rem 0.3rem;
    }

    .radioItem {
        background: #eee;
        color: rgb(102, 102, 102);
        width: 1.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 10%;
        margin-right: 0.2rem;
        margin-top: 0.2rem;
        font-size: 0.24rem;
        font-family: "PingFang";
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .radioItem input {
        // visibility: hidden;
        // display: none
    }

    .active {
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
        padding: 0.6rem 0;
        font-size: 0.3rem;
    }

    .sure {
        background: #005982;
        color: #fff;
    }

    /* 多选框 */

    #moneyType {
        width: 2rem;
    }

    /* 投递框 */

    .applyDialog {
        text-align: center;
        margin: 0 auto;

        input {
            border: 0;
            border-bottom: 1px solid rgb(237, 237, 237);
            line-height: 2.6;
            margin-left: 0.1rem;
            width: 80%;
        }

        .iconfont {
            font-size: 0.6rem; // padding-top: 1rem;
            display: inline-block;
        }
    }

    .dialogTitle {
        font-weight: bold;
        font-size: 0.34rem;
    }

    .applyBtn {
        /* width: 90%; */
        background: #005982;
        color: #fff;
        text-align: left;
        margin-top: 0.4rem;
    }

    .oneRows {
        width: 4.6rem !important;
    }

    .like {
        background: #005982;
        color: #fff;
        width: 1.66rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 10%;
        margin-right: 0.2rem;
        margin-top: 0.2rem;
        font-size: 0.24rem;
        font-family: "PingFang";
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .nolike {
        color: rgb(102, 102, 102);
        width: 1.66rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 10%;
        margin-right: 0.2rem;
        margin-top: 0.2rem;
        font-size: 0.24rem;
        font-family: "PingFang";
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .actived {
        color: #005982
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