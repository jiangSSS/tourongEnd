<template>
    <div>
        <Header></Header>
        <!-- <div class="header">
            <mt-header title="资讯列表" class="header-title">
                <mt-button icon="back" slot="left" @click="$router.push('/news')"></mt-button>
            </mt-header>
        </div> -->
        <div class="all" :data="newsDetail">
            <div class="containerAll">
                <div class="detail">
                    <div class="headerWarp">
                        <div class="title">{{newsDetail.title}}</div>
                        <div class="clearfix">
                            <div class="fll">
                                <span>作者：</span>
                                <span>{{newsDetail.author}}</span>
                                <span>(来源：<span>{{newsDetail.source}}</span> )</span>
                            </div>
                            <div class="flr"><span>{{newsDetail.addTimeStr}}</span></div>
                        </div>
                    </div>
                    <div>
                        <div class="contentImg"><img :src="$url + newsDetail.imgPath" alt=""></div>
                        <div class="contentText" v-html="newsDetail.content"></div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div v-if="good" @click="isGood">
                    <i class="iconfont icon-dianzan" style="color:#f00"></i>
                    <span>{{newsDetail.greatNum}}</span>
                </div>
                <div v-else @click="noGood">
                    <i class="iconfont icon-dianzan"></i>
                    <span>{{newsDetail.greatNum}}</span>
                </div>
                <div @click="$router.push({name:'comment',query:{id}})">
                    <i class="iconfont icon-weibiaoti-"></i>
                    <span>{{countComment}}</span>
                </div>
                <div @click="share = true">
                    <i class="iconfont icon-share"></i>
                    <span>分享</span>
                </div>
            </div>
            <van-popup v-model="share" position="bottom" :overlay="true" class="shareBox">
                <share :config="config"></share>
                <div class="cancelShare" @click="share = false">取消</div>
            </van-popup>
        </div>
    </div>
</template>
<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    import { Toast } from "mint-ui"
    import * as Cookies from 'js-cookie'

    export default {
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                id: "",
                good: 0,
                newsDetail: [],
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
        methods: {
            // 获取新闻详情
            getNewsDetail() {
                this.id = this.$route.query.id
                this.$axios.get(`/jsp/wap/trNews/ctrl/jsonNewsDetail.jsp?id=${this.id}`).then(res => {
                    console.log("新闻详情", res)
                    this.newsDetail = res.data
                    this.newsDetail.greatNum = Number(res.data.greatNum)
                })
                if (Cookies.get('userKey') && this.$store.state.userinfo.headImgPath != '') {
                    this.avatar = this.$store.state.userinfo.headImgPath
                }
                if (Cookies.get('userKey') && this.$store.state.userinfo.name != '') {
                    this.memberName = this.$store.state.userinfo.name
                }
                if (Cookies.get('userKey') && this.$store.state.userinfo.provinceStr != '') {
                    this.provinceStr = this.$store.state.userinfo.provinceStr
                }
            },
            // 是否点赞
            getGood() {
                this.$axios.get(`/jsp/wap/trNews/do/isGreat.jsp?id=${this.id}`).then(res => {
                    console.log("是否点赞", res)
                    this.good = Number(res.data)
                })
            },
            // 点赞
            noGood() {
                this.$axios.get(`/jsp/wap/trNews/do/doGreat.jsp?id=${this.id}`).then(res => {
                    console.log("点赞", res)
                    if (res.success == "true") {
                        let instance = Toast('已点赞');
                        setTimeout(() => {
                            instance.close();
                        }, 500);
                        this.good = 1
                        this.newsDetail.greatNum = Number(this.newsDetail.greatNum + 1)
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
                this.$axios.get(`/jsp/wap/trNews/do/cancelGreat.jsp?id=${this.id}`).then(res => {
                    console.log("取消点赞", res)
                    if (res.success == "true") {
                        let instance = Toast('已取消点赞');
                        setTimeout(() => {
                            instance.close();
                        }, 500);
                        this.good = 0
                        this.newsDetail.greatNum = Number(this.newsDetail.greatNum - 1)
                    }
                })
            },
            getComment() {
                this.id = this.$route.query.id
                this.$axios.get(`/jsp/wap/trNews/ctrl/jsonCommentPage.jsp?id=${this.id}`).then(res => {
                    this.countComment = Number(res.data.pagination.totalCount)
                })
            }

        },
        created() {
            this.getNewsDetail()
            this.getGood()
            this.getComment()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .containerAll {
        background: #f3f5f7;
        margin-bottom: 1rem
    }

    .mint-header {
        background: #fff !important;
        color: #333 !important;
        position: fixed !important;
        height: 0.86rem;
        top: 0;
        right: 0;
        left: 0;
        width: 100%;
        font-size: .4rem !important;
        z-index: 810
    }

    .mintui-back:before {
        font-size: .3rem !important
    }

    img {
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
        width: 90%;
        background: #005982;
        color: #fff;
        text-align: center;
        margin-top: .4rem
    }

    /deep/ {
        .contentText {
            img {
                max-width: 6rem !important;
            }
        }

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
</style>