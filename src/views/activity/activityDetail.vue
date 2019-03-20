<template>

    <div class="all" :data="activityDetail">
        <Header></Header>
		<i class="iconfont icon-fenxiang shareTitle"></i>
        <div class="containerAll">
            <div class="detail">
                <div class="headerWarp">
                    <div class="title">{{activityDetail.title}}</div>
                    <div>
                        <span>主办：</span>
                        <span>{{activityDetail.speaker}}</span>
                    </div>
                    <div>
                        <span>地点：</span>
                        <span>{{activityDetail.address}}</span>
                    </div>
                   <div class="clearfix">
                        <div class="sendBtn flr likeBtn" v-if="follow" @click="isFollow">已关注</div>
                    <div class="sendBtn flr" v-else @click="noFollow">关注</div>
                    <div class="fll">
                        <span>活动时间：</span>
                        <span v-if="activityDetail&&activityDetail.regStartTimeStr">{{activityDetail.regStartTimeStr.slice(0,10)}}</span>
                        <span>~</span>
                        <span v-if="activityDetail&&activityDetail.regEndTimeStr">{{activityDetail.regEndTimeStr.slice(0,10)}}</span>
                    </div>
                   </div>
                </div>
                <div>
                    <div class="contentImg">
                        <img :src="$url + activityDetail.imgPath" class="detailImg" alt="">
                    </div>
                    <div class="contentText" v-html="activityDetail.content"></div>
                </div>

            </div>
        </div>
        <div class="social-share"></div>
        <div class="footer">
            <div v-if="good" @click="isGood">
                <i class="iconfont icon-dianzan" style="color:#f00"></i>
                <span>{{activityDetail.greatNum}}</span>
            </div>
            <div v-else @click="noGood">
                <i class="iconfont icon-dianzan"></i>
                <span>{{activityDetail.greatNum}}</span>
            </div>
            <div @click="$router.push({name:'activityComments',query:{id}})">
                <i class="iconfont icon-weibiaoti-"></i>
                <span>{{countComment}}</span>
            </div>
            <div @click="share = true">
                <i class="iconfont icon-share"></i>
                <span>分享</span>
            </div>
            <!-- <div id="shareBtn" class="soshm">
                <i class="iconfont icon-share"></i>
                <span>分享</span>
            </div> -->

        </div>
        <!-- <van-popup v-model="share" position="bottom" :overlay="true" class="shareBox">
            <div class="social-share"></div>
            <button id="shareBtn"></button>
        </van-popup> -->
        <van-popup v-model="share" position="bottom" :overlay="true" class="shareBox">
            <share :config="config"></share>
            <div class="cancelShare" @click="share = false">取消</div>
        </van-popup>
        <div class="apply" @click="handleApply" v-show="activityDetail.status == 1">
            <i class="iconfont icon-bianji1"></i>
            <span>报名</span>
        </div>
        <div class="apply end" v-show="activityDetail.status == 0">
            <i class="iconfont icon-bianji1"></i>
            <span>尚未开始</span>
        </div>
        <!-- <div class="apply end" v-show="activityDetail.status == -1">
            <i class="iconfont icon-bianji1"></i>
            <span>往期回顾</span>
        </div> -->
        <mu-dialog width="400" center class="applyDialog" :model="formData" :open.sync="isShowApply">
            <p class="dialogTitle">报名信息</p>
            <div class="">
                <i class="iconfont icon-My"></i>
                <input class="" v-model="formData.memberName" type="text" placeholder="请输入姓名">
            </div>
            <div>
                <i class="iconfont icon-shouji"></i>
                <input type="text" v-validate="'required|memberMobile'" name="手机号码" v-model="formData.memberMobile" placeholder="请输入手机号">
                <span v-show="errors.has('手机号码')" class="error">{{ errors.first('手机号码')}}</span>
            </div>
            <div>
                <i class="iconfont icon-neirong"></i>
                <input type="text" v-model="formData.remark" placeholder="备注">

            </div>
            <mu-button class="applyBtn" @click="closeApply()">确认</mu-button>
            <mu-button class="applyBtn" @click="isShowApply = false">取消</mu-button>
        </mu-dialog>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    import { Toast } from 'mint-ui'
    import { Popup } from 'vant'
    import * as Cookies from 'js-cookie'
    import "soshm/dist/soshm.min.js"
    import VeeValidate, { Validator } from 'vee-validate'
    Validator.extend('memberMobile', {
        getMessage: name => '必须是11位手机号码',
        validate: value => {
            return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
        }
    });
    // 修改错误提示
    const dict = {
        messages: {
            required: (field) => '请输入' + field
        }
    }
    const validator = new Validator({});
    validator.localize('zh_CN', dict);
    export default {
        components: {
            Header,
            Footer,
            Toast
        },
        data() {
            return {
                isShowApply: false,
                activityDetail: [],
                commentList: [],
                formData: {
                    remark: "",
                    memberName: "",
                    memberMobile: ""
                },
                good: 0,
                id: "",
                follow: 0,
                countComment: "",
                // 分享
                share: false,
                config: {
                    // url: '', // 网址，默认使用 window.location.href
                    // source: '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
                    // title: '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                    // description: '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                    // image: '', // 图片, 默认取网页中第一个img标签
                    sites: ["qzone", "qq", "weibo",], // 启用的站点
                    // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
                    wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
                    wechatQrcodeHelper:
                        "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
                },
            }
        },
        // mounted() {
        //     document.getElementById('shareBtn').addEventListener('click', function () {
        //         soshm.popIn({
        //             title: '弹窗分享',
        //             sites: ['weixin', 'weixintimeline', 'weibo', 'yixin', 'qzone', 'tqq', 'qq']
        //         });
        //     }, false);
        // },
        methods: {
            // 打开报名框
            handleApply() {

				 //alert(item.id)
				  this.$axios.get('/jsp/wap/trActivity/do/isSignUp.jsp', {
				 	params: {
				 		activityId: this.id
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

				 		this.isShowApply = true
				 	}
				 })
				 .catch(function (error) {
				 	console.log(error);
				 });
               /* if (this.activityDetail.status != 1) {
                    this.isShowApply = false
                }else{
                    this.isShowApply = true
                } */
            },
            // 确认报名 关闭报名框
            closeApply() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let activityId = this.$route.query.id
                        this.$axios.get(`/jsp/wap/trActivity/do/doSignUp.jsp`, {
                            params: {
                                activityId,
                                memberName: this.formData.memberName,
                                memberMobile: this.formData.memberMobile,
                                remark: this.formData.remark
                            }
                        }).then(res => {
                            console.log("活动报名", res)

                            if (res.success == "true") {
                                let instance = Toast('报名成功');
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                                // }
                            } else {
                                let instance = Toast(res.message);
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                            }
                        })
                        setTimeout(() => {
                            this.isShowApply = false;
                        }, 500);
                        return;
                    }
                    let instance = Toast('请输入正确的手机号');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                });
            },
            // 活动详情
            getActivityDetail() {
                this.id = this.$route.query.id
                this.$axios.get(`/jsp/wap/trActivity/ctrl/jsonActivityDetail.jsp?id=${this.id}`).then(res => {
                    console.log("111", res)
                    this.activityDetail = res.data
                    this.activityDetail.greatNum = Number(res.data.greatNum)
                    if (Cookies.get('userKey') && this.$store.state.userinfo.headImgPath != '') {
                        this.avatar = this.$store.state.userinfo.headImgPath
                    }
                    if (Cookies.get('userKey') && this.$store.state.userinfo.name != '') {
                        this.memberName = this.$store.state.userinfo.name
                    }
                    if (Cookies.get('userKey') && this.$store.state.userinfo.provinceStr != '') {
                        this.provinceStr = this.$store.state.userinfo.provinceStr
                    }
                })
            },
            // 是否点赞
            getGood() {
                this.$axios.get(`/jsp/wap/trActivity/do/isGreat.jsp?id=${this.id}`).then(res => {
                    console.log("是否点赞", res)
                    this.good = Number(res.data)
                })
            },
            // 点赞
            noGood() {
                this.$axios.get(`/jsp/wap/trActivity/do/doGreat.jsp?id=${this.id}`).then(res => {
                    console.log("点赞成功", res)
                    if (res.success == "true") {
                        let instance = Toast('点赞成功');
                        setTimeout(() => {
                            instance.close();
                        }, 500);
                        this.good = 1
                        this.activityDetail.greatNum = Number(this.activityDetail.greatNum + 1)
                    } else {
                        let instance = Toast(res.message);
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                    }
                })
            },

            // 取消点赞
            isGood() {
                this.$axios.get(`/jsp/wap/trActivity/do/cancelGreat.jsp?id=${this.id}`).then(res => {
                    console.log("取消点赞", res)
                    if (res.success == "true") {
                        let instance = Toast('已取消点赞');
                        setTimeout(() => {
                            instance.close();
                        }, 500);
                        this.good = 0
                        this.activityDetail.greatNum = Number(this.activityDetail.greatNum - 1)
                    }
                })
            },
            // 评论列表
            getComment() {
                this.id = this.$route.query.id
                this.$axios.get(`/jsp/wap/trActivity/ctrl/jsonCommentPage.jsp?id=${this.id}`).then(res => {
                    this.countComment = Number(res.data.pagination.totalCount)
                })
            },
            //  getFollow() {
            //     this.$axios.get(`/jsp/wap/trActivity/do/isGreat.jsp?id=${this.id}`).then(res => {
            //         console.log("是否点赞", res)
            //         this.follow = Number(res.data)
            //     })
            // },
             getFollow() {
                this.$axios.get(`/jsp/wap/trActivity/ctrl/jsonIsFollow.jsp?id=${this.id}`).then(res => {
                    console.log("是否关注", res)
                    this.follow = Number(res.data)
                })
            },
            // 关注
            noFollow() {
                this.$axios.get(`/jsp/wap/trActivity/do/doFollow.jsp?id=${this.id}`).then(res => {
                    console.log("投资关注", res)
                    if (res.success == "true") {
                        let instance = Toast('关注成功');
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                        this.follow = 1
                    } else {
                        let instance = Toast(res.message);
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                    }
                })
            },
            // 取消关注
            isFollow() {
                this.$axios.get(`/jsp/wap/trActivity/do/doUnfollow.jsp?id=${this.id}`).then(res => {
                    console.log("取消关注", res)
                    if (res.success == "true") {
                        let instance = Toast('已取消关注');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                        this.follow = 0
                    } else {
                        let instance = Toast('取消失败');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                })
            },
        },
        created() {
            this.getActivityDetail()
            this.getGood()
            this.getComment()
            this.getFollow()
        }
    }
</script>
<style scoped lang="scss">
    .error {
        color: #f00;
        font-size: .2rem;
        /* position: absolute; */
        margin-right: 1.2rem
    }

    .containerAll {
        background: #f3f5f7;
        margin-bottom: 1rem
    }

    .end {
        background: #ccc !important
    }

    img {
        width: 100%
    }

    .detailImg {
        width: 100%
    }

    .detail {
        background: #fff;
        padding: 1rem .3rem 0;
    }

    .title {
        font-size: .32rem;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        font-weight: bold;
        line-height: 2;
    }

    .headerWarp {
        padding-bottom: .2rem
    }

    .headerWarp span {
        font-size: .24rem;
        font-family: "PingFang";
        color: rgb( 153, 153, 153);
        line-height: 2;
    }

    .contentText {
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb( 102, 102, 102);
        line-height: 1.429;
    }
    /deep/ .contentText img{
        max-width: 100%;
    }
    /deep/ .contentText table{
      width: 100%!important;
    }
    .contentImg {
        padding: .3rem 0
    }

    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background-size: 100%;
        display: flex;
        background: #fff;
        div {
            width: 2.5rem;
            flex: 1;
            text-align: center;
            span {
                font-size: .32rem;
                font-family: "PingFang";
                color: rgb( 102, 102, 102);
                line-height: 2.5;
                margin-left: .1rem
            }
        }
    }

    .apply {
        width: 1.7rem;
        height: 1.7rem;
        position: fixed;
        bottom: 1.8rem;
        right: .4rem;
        background: #005982;
        border-radius: 50%;
        color: #fff;
        text-align: center;

        .icon-bianji1::before {
            display: block;
            font-size: .5rem;
            margin-top: .4rem;
        }
    }

    .icon-dianzan,
    .icon-weibiaoti-,
    .icon-share {
        font-size: .4rem
    }

    .applyDialog {
        text-align: center;
        margin: 0 auto;
        input {
            border: 0;
            border-bottom: 1px solid rgb(237, 237, 237);
            line-height: 2.6;
            margin-left: .1rem;
            width: 80%;
        }
        .iconfont {
            font-size: .6rem; // padding-top: 1rem;
            display: inline-block
        }
    }

    .dialogTitle {
        font-weight: bold;
        font-size: .34rem
    }

    .applyBtn {
        /* width: 90%; */
        background: #005982;
        color: #fff;
        text-align: left;
        margin-top: .4rem;
    }

    .shareBox {
        padding: .5rem;
        text-align: center;
        /* padding-top: 4rem */
    }

    .cancelShare {
        margin-top: .3rem;
        border: 1px solid #005982;
        border-radius: .1rem;
        width: 40%;
        text-align: center;
        margin: .3rem auto 0
    }
    .sendBtn {
        border: 1px solid #005982;
        border-radius: 2px;
        display: inline-block;
        color: #005982;
        padding: .1rem;
        height: .6rem;
        width: 1.2rem;
        line-height: .4rem;
        font-family: "PingFang";
        font-size: .23rem;
        font-weight: bold;
        opacity: 1;
        margin-right: .3rem;
        text-align: center;
    }

    .likeBtn {
        background: #005982;
        color: #fff
    }
	.shareTitle{
		position: fixed;
		top: .2rem;
		right: .2rem;
		z-index: 999
	}
</style>
