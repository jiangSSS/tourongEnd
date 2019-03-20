<template>
    <div class="all">
        <Header></Header>
        <div class="detail">
            <div class="statusBox">
                <span class="type_item" v-for="(item , index) in typeDataList" :key="index" @click="checkItem(item.dataValue,index)" :class="{active:item.checked}">{{item.dataName}}</span>
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                <div class="messageList">
                    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
                        <div class="" v-for="(item,index) in pageList" :key="index">
                            <router-link :to="{path:'/news/newsDetail',query:{id:item.id}}">
                                <div class="clearfix rows">
                                    <div class="nums clearfix flr">
                                        <div class="clearfix titleBox">
                                            {{item.title}}
                                        </div>
                                       <!-- <div class="newsDesc">
                                            {{item.brief}}
                                        </div> -->
                                        <div class="messageTime">
                                            <span class="fll timestatus">{{item.addTimeStr.slice(0,10)}}</span>
                                            <span class="flr rightTime">
                                                <span>(来源：
                                                    <span>{{item.source}}</span> )</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="newsImgBox fll">
                                        <img :src="$url + item.imgPath" class="newsImg">
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                    <!-- <vueToTop></vueToTop> -->
                    <ToTop></ToTop>
                <div>
                    <!-- <div class="noData" v-if="this.totalCount > this.pageList.length">加载中...</div>
                    <div class="noData" v-else>--- 没有更多数据了 ---</div> -->
                    <div class="noData" v-show="more">加载中...</div>
                    <div class="noData" v-show="noMore">--- 没有更多数据了 ---</div>
                </div>
            </div>
        </div>
        <Footer class="footer"></Footer>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Bottom.vue";
    import ToTop from "@/components/toTop.vue"

    export default {
        components: {
            Header,
            Footer,
            ToTop
        },
        data() {
            return {
                pageList: [],
                pn: 1,
                pageNumber: 1,
                totalCount: '',
                loading: false,
                typeDataList: [],
                categorys: "",

                more:false,
                noMore:false
            };
        },
        methods: {
            loadMore() {
                this.pn += 1; 
                this.$axios
                    .get("/jsp/wap/trNews/ctrl/jsonNewsPage.jsp", {
                        params: { dataValues: this.categorys, pageNumber: this.pn }
                    })
                    .then(res => {                         
                        this.loading = true;
                        if (res.success == "true") {
                            this.pageList = [...this.pageList, ...res.data.pageList];
                            this.totalCount = Number(res.data.pagination.totalCount);
                            if(this.totalCount > this.pageList.length){
                                this.more = true
                                this.noMore = false
                            }else{
                                this.more = false
                                this.noMore = true
                            }
                            this.loading = false;                 
                        }
                    });
            },
            // 新闻列表
            getNewsList(categorys) {
                this.loading = true;
                this.$axios
                    .get(`/jsp/wap/trNews/ctrl/jsonNewsPage.jsp`, {
                        params: { dataValues: this.categorys }
                    })
                    .then(res => {
                        this.loading = true;
                        console.log("新闻列表", res);
                        if (res.success == "true") {
                            this.pageList = res.data.pageList;
                            // this.pn = 1;
                            this.loading = false;
                        }
                    });
            },
            // 分类筛选
            checkItem(e, index) {
                this.categorys = e;
                if (this.typeDataList[index].checked) {
                    this.typeDataList[index].checked = !this.typeDataList[index].checked;
                    this.categorys = "";
                } else {
                    this.typeDataList.forEach(item => {
                        item.checked = false;
                    });
                    this.typeDataList[index].checked = true;
                }
                this.getNewsList(this.categorys);
            },
            // 新闻分类
            getTypeData() {
                this.$axios.get("/jsp/wap/trNews/ctrl/jsonCategoryList.jsp").then(res => {
                    console.log("新闻分类", res);
                    if (res.success == "true") {
                        let typeDataList = res.data;
                        typeDataList.forEach(item => {
                            this.$set(item, "checked", false);
                        });
                        typeDataList.forEach(item => {
                            if (item.dataValue == this.category) {
                                item.checked = true;
                            }
                        });
                        this.typeDataList = typeDataList;
                    }
                });
            },
        },
        created() {
            this.getNewsList(this.categorys);
            this.getTypeData();
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../node_modules/swiper/dist/css/swiper.css";
    .detail {
        padding-top: 0.8rem;
        padding-bottom: 1.2rem;
        /* background: #fafafa; */
    }

    img {
        width: 100%;
    }

    .subTabs {
        // background: #fff
        padding: 0;
    }

    .nums {
        width: 4.55rem;
    }
    .titleBox{
       margin-top: 0;
       position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical !important;  
       font-size: .3rem; color: #333;margin-bottom: .15rem;line-height:1.4;
    }

    .newsDesc {
		color: #888;
		font-size: 0.26rem;
		margin-top: 0.15rem;
		line-height:.3rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		height: .3rem
	}

    .subTab {
        font-size: 0.5rem !important;
        font-family: "PingFang";
        color: rgb(51, 51, 51);
        line-height: 2.727;
        text-align: center;
        background: #fff;
    } // /deep/.van-tabs__line {
    //     background: #005982 !important;
    //     bottom: .2rem !important;
    // }
    .title {
        margin-top: 0.2rem;
    }

    .messageList {
        padding-top: 0.2rem;
        background: #fff;
    }

    .rows {
    	padding: .25rem;
    	border-bottom: 0.2rem solid #f3f5f7;
    
    	.messageTitle {
    		font-size: 0.3rem;
    		font-family: "Microsoft YaHei";
    		color: rgb(51, 51, 51);
    		line-height: 1.4;
    	}
    
    	.messageTime {
    		font-size: 0.24rem;
    		font-family: "Microsoft YaHei";
    		color: #c9c9c9;
    		line-height: 1.1;
    		margin-top: .25rem
    	}
    
    	.messageTime span {
    		font-size: 0.24rem;
    	}
    
    	.rightTime {
    		overflow: hidden;
    		white-space: nowrap;
    		text-overflow: ellipsis;
    		width: 2.4rem;
    		text-align: right
    	}
    }
    .dian {
        margin: 0.15rem;
    }

	.newsImgBox {
			width: 2.2rem;
			height: 1.5rem;
			overflow: hidden;
		.newsImg {
			width: 2.2rem;
			height: 1.5rem;
			float: left
		}
	}
    .type_item {
        color: #666;
        cursor: pointer;
        padding: 0.2rem 0 0.1rem;
        margin: 0 .3rem;
        line-height: 2;
        font-size: .3rem;
        display: inline-block;
        /* display: fixed;
        justify-content: space-around; */
    }

    .active {
        color: #005982;
        border-bottom: 3px solid #005982;
    }
</style>