<template>
	<div class="all">
		<!-- <div id="helloworld" style="width: 200px;height:200px"></div> -->
		<div class="header">
			<div class="searchBox" @click="$router.push('/searchList')">
				<i class="iconfont icon-sousuo"></i>
			</div>
			<div class="logoBox" @click="$router.push('/aaa')">
				<img src="../../../static/app/img/home/logo.png" class="logo">
			</div>
			<div class="rightBox" @click="tokefu">
				<img src="../../../static/app/img/home/header_right.jpg" class="header_right">
			</div>
		</div>
		<div class="detail">
			<div class="swiper">
				<swiper v-if="banner.length > 0" :options="swiperOption">
					<swiper-slide v-for="(item,index) in banner" :key="index">
						<!-- <router-link :to="{name:'newsDetail',params:{id:item.url}}"> -->
						<div>
							<img :src="$url + item.appImgPath">
							<!-- <span class="swiper-title">{{item.title}}</span> -->
						</div>
						<!-- </router-link> -->
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
					<!-- <div class="swiper-button-prev" slot="button-prev">  </div>
                    <div class="swiper-button-next" slot="button-next">  </div> -->
				</swiper>
			</div>
			<div class="tab">
				<router-link to="/money">
					<div>
						<div>
							<img src="../../../static/app/img/home/0a.jpg" alt="">
						</div>
						<div class="title">资金</div>
					</div>
				</router-link>
				<router-link to="/project">
					<div>
						<div>
							<img src="../../../static/app/img/home/0b.jpg" alt="">
						</div>
						<div class="title">项目</div>
					</div>
				</router-link>
				<router-link to="/activity">
					<div>
						<div>
							<img src="../../../static/app/img/home/0c.jpg" alt="">
						</div>
						<div class="title">活动会议</div>
					</div>
				</router-link>
				<router-link to="/news">
					<div>
						<div>
							<img src="../../../static/app/img/home/0d.jpg" alt="">
						</div>
						<div class="title">资讯</div>
					</div>
				</router-link>
			</div>
			<div class="clearfix">
				<img src="../../../static/app/img/home/homeContent1.jpg" class="homeContent1 fll">
				<div class="fll contentRight1" v-if="weekLists&&weekLists.addTimeStr">
					<p class="row1">会员周报</p>
					<div class="row2">
						<span class="numbers">{{weekLists[0].addTimeStr.substr(0,4)}}年第{{count}}期</span>
						<span @click="$router.push('/weekList')"> 点击阅读</span>
					</div>
				</div>
				<div class="fll contentRight1" v-else>
					<p class="row1">会员周报</p>
					<div class="row2">
						<span>暂无周报 </span>
					</div>
				</div>
			</div>
			<div class="issue">
				<!-- <router-link to="/issueMoney"> -->
				<div @click="issueMoney">
					<img src="../../../static/app/img/home/c1.png" alt="">
				</div>
				<!-- </router-link> -->
				<!-- <router-link to="/issueProject"> -->
				<div @click="issueProject">
					<img src="../../../static/app/img/home/c2.png" alt="">
				</div>
				<!-- </router-link> -->
				<!-- <router-link to="/demand"> -->
				<div @click="demand">
					<img src="../../../static/app/img/home/c3.png" alt="">
				</div>
				<!-- </router-link> -->

			</div>

			<div>
				<router-link to="/activity">
					<img src="../../../static/app/img/home/c4.jpg" alt="">
				</router-link>
			</div>
			<div class="subtitle">
				<span class="titleContent" @click="$router.push('/project')">
					优质项目
					<i class="iconfont icon-xiangyou"></i>
				</span>
			</div>
			<div v-for="(item,index) in projectList.slice(0,2)" :key="index" class="wellProject" @click="toProjectDetailPage(item.id)">
				<!-- <router-link :to="{path:'/project/projectDetail',query:{id:item.id}}"> -->
				<img :src="$url + item.recommendImgPath" alt="" class="wellImg">
				<div class="wellTitle">
					{{item.title}}
				</div>
				<div class="wellCompany">{{item.companyName}}</div>
				<div class="wellContent">{{item.brief}}</div>
				<!-- </router-link> -->

			</div>
			<div class="moneyBoxa">
				<div class="subtitle">
					<span class="titleContent" @click="$router.push('/money')">
						优质资金
						<i class="iconfont icon-xiangyou"></i>
					</span>
				</div>
				<div class="moneyBox" v-for="item in capitalList.slice(0,2)" :key="item.index">
					<!-- <router-link :to="{path:'/money/moneydetail',query:{id:item.id}}" class="clearfix"> -->
					<div @click="toMoneyDetailPage(item.id)" class="clearfix">
						<div class="flr imgBox">
							<img :src="$url + item.recommendImgPath" class="wellMoney"> </div>
						<div class="fll rightContent">
							<div class="rightTitle">{{item.title}}</div>
							<div class="rightList">
								<div>
									<span>投资资金:</span>
									<span class="moneyNum">{{item.investAmountName}}</span>
								</div>
								<div>
									<span>投资方式:</span>
									<span>{{item.investCase}}</span>
								</div>
								<div>
									<span>投资类型:</span>
									<span>{{item.investTypeName}}</span>
								</div>
								<div>
									<span>资金来源:</span>
									<span>{{item.capitalSourceName}}</span>
								</div>
								<div>
									<span>资金类型:</span>
									<span>{{item.capitalType}}</span>
								</div>
								<div>
									<span>投资行业:</span>
									<span>{{item.investWayName}}</span>
								</div>
							</div>
						</div>
					</div>
					<!-- </router-link> -->
				</div>
			</div>
			<div class="subtitle">
				<span class="titleContent" @click="$router.push('/news')">
					投融资讯
					<i class="iconfont icon-xiangyou"></i>
				</span>
			</div>
			<div class="newsList" v-for="item in pageList.slice(0,4)" :key="item.index" @click="toNewsDetailPage(item.id)">
				<!-- <router-link :to="{path:'/news/newsDetail',query:{id:item.id}}"> -->
				<div class="clearfix rows">
					<div class="nums clearfix flr">
						<div class="clearfix titleBox">
							{{item.title}}
						</div>
					<!-- 	<div class="newsDesc">
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
				<!-- </router-link> -->
			</div>
			<!-- 轮播_________________________________________________ -->
			<!--<div class="subtitle">-->
				<!--<span class="titleContent" @click="$router.push('/cooperation')">合作机构-->
					<!--<i class="iconfont icon-xiangyou"></i>-->
				<!--</span>-->
			<!--</div>-->
			<!--&lt;!&ndash; <div v-for="item in pageList.slice(0,4)" :key="item.index" @click="toNewsDetailPage(item.id)">&ndash;&gt;-->
			<!--&lt;!&ndash;<div v-for="item in pageList.slice(0,4)" :key="item.index" @click="toNewsDetailPage(item.id)"> &ndash;&gt;-->

				<!--<div class="txtScroll-left">-->
					<!--&lt;!&ndash; <div class="hd">-->
						<!--<a class="next"></a>-->
						<!--<ul class="num">-->

						<!--</ul>-->
						<!--<a class="prev"></a>-->
						<!--<span class="pageState"></span>-->
					<!--</div> &ndash;&gt;-->
					<!--<div class="bd">-->
						<!--<ul class="infoList">-->
							<!--<li v-for="(item , index) in shufflingarr" style="margin: 0px;padding: 0;">-->
								<!--<img :src='$url + item.logoImgPath' @click="gotoinfo(item)" alt="" style="margin: 1vw;padding: 0; width: 23vw;height: 11vw;" />-->
							<!--</li>-->
						<!--</ul>-->
						<!--<ul class="infoList">-->
							<!--<li v-for="(item , index) in shufflingarrreverse" style="margin: 0px;padding: 0;">-->
								<!--<img :src='$url + item.logoImgPath' @click="gotoinfo(item)" alt=""  style="margin: 1vw;padding: 0; width: 23vw;height: 11vw;" />-->
							<!--</li>-->
						<!--</ul>-->
					<!--</div>-->
				<!--</div>-->
			<!-- </div> -->
			<!-- 轮播_________________________________________________ -->
		</div>
		<div></div>
		<Footer class="footer"></Footer>
	</div>
</template>
<script>
	import Footer from "@/components/Bottom.vue";
	import "swiper/dist/css/swiper.css";
	import {
		swiper,
		swiperSlide
	} from "vue-awesome-swiper";
	import * as Cookies from 'js-cookie'
	import {
		Toast
	} from "mint-ui"
	let vm = null;
	import '../../assets/js/jquery.SuperSlide.2.1.1.js'
	export default {
		components: {
			Footer,
			swiper,
			swiperSlide
		},
		data() {
			return {
				banner: [],
				projectList: [],
				capitalList: [],
				swiperOption: {
					// 显示分页
					pagination: {
						el: ".swiper-pagination",
						clickable: true
					},
					waitForTransition: true,
					// 设置自动播放速度
					autoplay: {
						disableOnInteraction: false,
						delay: 2000
					},
					// 开启无限循环
					loop: false,
					//设置点击箭头
					paginationClickable: true,
					prevButton: ".swiper-button-prev",
					nextButton: ".swiper-button-next",
					//设置同屏显示的数量，默认为1，使用auto是随意的意思。
					slidesPerView: 1,
					//开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
					mousewheel: false,
					//默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
					// freeMode:true,
					on: {
						click() {
							const realIndex = this.realIndex
							vm.toSwiper(realIndex)
						}
					}
				},
				pageList: [],
				count: 1,
				weekLists: [],
				imgData: [],
				shuffling: [],
				shufflingarr: [],
				shufflingarrreverse: [],
			};
		},
		methods: {
			/* gotocooperation(){
				let {
					href
				} = this.$router.resolve({
					name: "cooperation"
				});

				window.open(href);
			}, */
			gotoinfo(idd){
				//console.log(idd)
				this.$store.commit('cooperationchange',(this.$store.state.cooperation=idd));
				console.log('我是Vuex数据请指示',this.$store.state.cooperation)
				//this.$store.commit('cooperationchangemun',(this.$store.state.cooperationmun++));
				//console.log('我是Vuex数据请指示',this.$store.state.cooperationmun)
				/* this.store.commit;('cooperationchange', {
				  cooperation: idd
				}) */

				console.log('dianjihou   kanshuju',this.cooperationinfo)
				this.$router.push({
				  path: '/cooperation_info',
				  query: {
					id: idd
				  }
				})
			},
			issueMoney() {
				if (Cookies.get("userKey")) {
					this.$router.push('/issueMoney')
				} else {
					this.$router.push('/login')
				}
			},
			issueProject() {
				if (Cookies.get("userKey")) {
					this.$router.push('/issueProject')
				} else {
					this.$router.push('/login')
				}
			},
			demand() {
				if (Cookies.get("userKey")) {
					this.$router.push('/demand')
				} else {
					this.$router.push('/login')
				}
			},
			getData() {
				this.$axios.get(`/jsp/wap/index/ctrl/jsonIndex.jsp`).then(res => {
					console.log("轮播图", res);
					this.banner = res.data.banner;
					this.capitalList = res.data.capitalList;
					this.projectList = res.data.projectList;
				});
			},
			toSwiper(index) {
				let id = this.banner[index].resourceId;
				let type = this.banner[index].resourceType;
				if (id != '') {
					if (type == "1") {
						this.toProjectDetailPage(id);
					} else if (type == "2") {
						this.toMoneyDetailPage(id);
					} else if (type == "3") {
						this.toNewsDetailPage(id);
					} else if (type == "4") {
						this.$router.push({
							name: 'activityDetail',
							query: {
								id
							}
						})
					}
				} else {

				}
			},
			tokefu() {
				window.open("https://tb.53kf.com/code/app/10193554/1", "_blank");
			},
			getNewsList() {
				this.$axios.get(`/jsp/wap/trNews/ctrl/jsonNewsPage.jsp`).then(res => {
					console.log("新闻列表", res);
					if (res.success == "true") {
						this.pageList = res.data.pageList;
					}
				});
			},
			getWeekData(pn) {
				this.$axios.get(`/jsp/wap/center/ctrl/jsonWeeklyList.jsp`, {
					params: {
						pageNumber: pn
					}
				}).then(res => {
					console.log("周报列表", res)
					this.weekLists = res.data.pageList
					this.count = Number(res.data.pagination.totalCount)
				})
			},
			toProjectDetailPage(id) {
				this.$router.push({
					name: 'projectDetail',
					query: {
						id
					}
				})
			},
			toMoneyDetailPage(id) {
				this.$router.push({
					name: 'moneyDetail',
					query: {
						id
					}
				})
			},
			toNewsDetailPage(id) {
				this.$router.push({
					name: 'newsDetail',
					query: {
						id
					}
				})
			},
		},
		created() {

			this.getNewsList();
			this.getData();
			if (Cookies.get("userKey")) {
				this.getWeekData()
			}
			vm = this
			this.$axios.get('/jsp/wap/index/ctrl/jsonOrganizationList.jsp', {

				})
				.then(res => {
					//console.log('轮播数据', res.data);

					this.shuffling = res.data
					this.shufflingarr = [this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling,
						this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling,
						this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling
					].reduce((a, b) => {
						return a.concat(b);
					}, []);
					this.shufflingarrreverse = [this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling,
						this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling,
						this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling, this.shuffling
					].reduce((a, b) => {
						return a.concat(b);
					}, []);
					this.shufflingarrreverse.reverse()

					console.log('轮播数据res',this.shuffling);
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		mounted() {
			//jQuery('#helloworld').css('background', 'red');
			// setTimeout(
			// 	function() {
			// 		jQuery(".txtScroll-left").slide({
			// 			titCell: ".hd ul",
			// 			mainCell: ".bd ul",
			// 			autoPage: true,
			// 			effect: "left",
			// 			autoPlay: true,
			// 			scroll: 4,
			// 			vis: 2,
			// 			trigger: "click"
			// 		});
			// 	},
			// 	1500)
		}
	};
</script>

<style scoped lang="scss">
	/* 跑马灯样式开始 */
	.txtScroll-left {
		//width: 1200px;
		position: relative;
		border: 1px solid #ccc;
	}

	.txtScroll-left .hd {
		overflow: hidden;
		//height: 30px;
		background: #f4f4f4;
		padding: 0 10px;
	}

	.txtScroll-left .hd .prev,
	.txtScroll-left .hd .next {
		display: block;
		/* width: 20px;
		height: 120px; */
		float: right;
		margin-right: 5px;
		margin-top: 10px;
		overflow: hidden;
		cursor: pointer;
	}

	.txtScroll-left .hd .next {
		background-position: 0 -50px;
	}

	.txtScroll-left .hd .prevStop {
		background-position: -60px 0;
	}

	.txtScroll-left .hd .nextStop {
		background-position: -60px -50px;
	}

	.txtScroll-left .hd ul {
		float: right;
		overflow: hidden;
		zoom: 1;
		margin-top: 10px;
	}

	.txtScroll-left .hd ul li {
		float: left;
		//width: 1200px;
		//height: 120px;
		overflow: hidden;
		margin-right: 5px;
		text-indent: -999px;
		cursor: pointer;
	}

	.txtScroll-left .hd ul li.on {
		background-position: 0 0;
	}

	.txtScroll-left .bd {
		padding: 0px;
		//width: 430px;
		overflow: hidden;
	}

	.txtScroll-left .bd ul {
		overflow: hidden;
		zoom: 1;
	}

	.txtScroll-left .bd ul li {
		margin-right: 20px;
		float: left;
		//height: 120px;
		//line-height: 200px;
		text-align: left;
		display: inline;
	}

	.txtScroll-left .bd ul li span {
		color: #999;
	}


	/* 跑马灯样式结束 */
	// 头部
	.all {
		position: relative;
		width: 100%;
	}

	.newsImg {
		width: 2rem;
	}

	.aaaa {
		width: 4.5rem;
		color: #333 !important;
	}

	.titleImg {
		font-size: 0.24rem;
		color: #ccc;
	}

	.timedata {
		margin-left: 0.4rem;
	}

	.threes {
		display: flex;
		justify-content: space-between;
	}

	.threes img {
		width: 2rem;
		height: 1.6rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		padding: 0.15rem;
		height: 1rem;
		background: #fff;
		top: 0;

		.logo {
			width: 2.2rem;
		}

		.logoBox {
			line-height: 2.5;
			margin-top: 0.1rem;
		}

		.rightBox {
			line-height: 2;
		}

		.header_right {
			width: 0.45rem;
			text-align: center;
			margin-top: 0.1rem;
			margin-right: 0.2rem;
		}

		.search {
			font-size: 0.3rem;
			display: block;
			padding-top: -0.1rem;
		}

		.searchBox {
			margin-left: 0.1rem;
			text-align: center;
			line-height: initial;
			.iconfont {
				font-size: 0.5rem;
				line-height: initial;
				float: left;
				margin-top: .08rem;
			}
		}
	}

	.detail {
		padding-bottom: 1.2rem;
	}

	.noData {
		text-align: center;
		color: #999;
	}

	//  轮播图
	.swiper {
		img {
			height: 3.75rem;
			width: 7.5rem;
			display: block;
		}
	}

	img {
		width: 100%;
	}

	// tab卡
	.tab {
		display: flex;
		justify-content: space-around;
		padding: 0.3rem 0.4rem;
		text-align: center;

		img {
			width: 0.7rem;
		}

		a {
			color: rgba(0, 0, 0, 0.8);
		}

		.title {
			font-size: 0.25rem;
			margin-top: .2rem;
		}
	}

	.homeContent1 {
		width: 50%;
		vertical-align: text-top;
	}

	.contentRight1 {
		padding-left: 0.3rem;
		padding-top: 0.8rem;
	}

	.row1 {
		font-weight: 700;
		font-size: 0.4rem;
		padding: 0;
		margin: 0;
	}

	.row2 {
		margin: .3rem 0;
		padding: 0 !important;

		span:nth-child(1) {
			padding-right: 0.1rem;
			font-size: 0.28rem;
		}

		span:nth-child(2) {
			color: #005982;
			font-weight: 700;
			font-size: 0.28rem;
		}
	}

	.subtitle {
		padding: 0.3rem;
		text-align: center;
		margin: 0 auto;
	}

	.titleContent {
		font-size: 0.4rem;
		font-family: "MicrosoftYaHeiLight";
		color: rgb(137, 137, 137);
	}
	.titleContent em{
		margin-top: .1rem
	}

	.titleContent i::before{  margin-top: -.05rem}
	.icon-xiangyou {
		background: rgb(230, 230, 230);
		padding: .04rem;
		margin-left: 0.2rem;
		font-size: .4rem
	}

	.wellProject {
		padding: 0.2rem 0.3rem;

		.wellTitle {
			font-size: 0.34rem;
			font-family: "Microsoft YaHei";
			color: rgb(62, 58, 57);
			font-weight: bold;
			line-height: 1.5;
			margin-top: .25rem
		}

		.wellCompany {
			font-size: 0.18rem;
			font-family: "Microsoft YaHei";
			color: rgb(62, 58, 57);
			line-height: 1.5;
			padding-bottom: 0.2rem;
		}

		.wellImg {
			width: 100%; // height: 3rem;
		}

		.wellContent {
			font-size: 0.28rem;
			font-family: "Microsoft YaHei";
			color: rgb(137, 137, 137);
			line-height: 1.55;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical !important;
		}
	}

	.wellMoney {
		width: 100%;
		height: 100%;
	}

	.imgBox {
		width: 50%;
		height: 4.2rem;
	}

	.moneyBox:nth-child(even) {
		.rightContent {
			// float: rgt;
		}

		.imgBox {
			float: left;
		}
	}

	.rightContent {
		width: 50%;
		padding: 0.2rem;

		img {
			vertical-align: middle;
		}

		.rightTitle {
			font-size: 0.3rem;
			font-family: "Microsoft YaHei";
			color: rgb(62, 58, 57);
			font-weight: bold;
			line-height: 1.5;
			margin-bottom: .1rem;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical !important;
		}

		.moneyNum {
			color: #005982;
			font-size: 0.26rem !important;
			font-weight: bold;
		}
	}

	.rightList div {
		clear: both;
		line-height: 1.55;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.rightList span:nth-child(1) {
		font-family: "PingFang";
		color: #999;
		font-size: 0.24rem;
	}

	.rightList span:nth-child(2) {
		font-size: 0.24rem;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.dian {
		margin: 0.15rem;
	}

	.moneyBoxa {
		background: #fafafa;
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
		margin: 0;
		position: absolute;
		top: .11rem;
		left: 0;
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

	.nums {
		width: 4.55rem;
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

	.issue {
		display: flex;
		justify-content: space-around
	}

	.issue img {
		vertical-align: middle
	}

	.titleBox {
		margin-top: 0;
		position: relative;
		font-size: .3rem; color: #333;
		margin-bottom: .15rem;
		line-height:1.4;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical !important;
	}
</style>
