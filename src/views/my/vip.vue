<template>
    <div>
        <Header></Header>
        <div class="all">
            <div class="detail">
                <div>
                    <img src="../../../static/app/img/my/vip.png" alt="" class="vipHeader">
                </div>
                <div>
                    <div class="v3Box">
                        <img src="../../../static/app/img/my/vv.png" alt="" class="vipHeader">
                    </div>
                    <div class="callBox">
                        <img src="../../../static/app/img/my/call.png" alt="" class="vipHeader">
                        <!-- <div class="callMe" v-if="isVip != '0'">111</div> -->
                        <div class="callMe" @click="isonvip" >111</div><!-- isShowApply = true -->
                    </div>
                </div>
                <mu-dialog width="400" center class="applyDialog" :open.sync="isShowApply">
                    <div :model="formData">
                        <p class="dialogTitle">开通会员服务</p>
                        <div class="rows">
                            <i class="iconfont icon-My"></i>
                            <input type="text" v-validate="'required|name'" name="姓名" v-model="formData.name" placeholder="请输入姓名">
                            <div v-show="errors.has('姓名')" class="error">{{ errors.first('姓名')}}</div>
                        </div>
                        <div class="rows">
                            <i class="iconfont icon-shouji"></i>
                            <input type="text" v-validate="'required|mobile'" name="手机号码" v-model="formData.mobile" placeholder="请输入手机号码">
                            <div v-show="errors.has('手机号码')" class="error">{{ errors.first('手机号码')}}</div>

                        </div>
                        <div class="rows">
                            <i class="iconfont icon-gongsi1"></i>
                            <input type="text" v-validate="'required|company'" name="单位名称" v-model="formData.company" placeholder="请输入单位名称">
                            <div v-show="errors.has('单位名称')" class="error">{{ errors.first('单位名称')}}</div>
                        </div>
                        <mu-button class="applyBtn" @click="closeApply">确认办理</mu-button>
                        <mu-button class="sureBtn" @click="cancelApply">取消</mu-button>
                    </div>
                </mu-dialog>
                <div class="title">
                    <span>服务内容</span>
                </div>
                <van-tabs v-model="active">
                    <van-tab title="信息服务">
                        <div class="tabBox">
                            <div style="color:#999;font-family:Consolas, &quot;font-size:14px;padding:.3rem">
                                <div>
                                    1、寻找项目。根据资金方需求，在全球范围内寻找并筛选符合其发展战略方向的各类投资项目信息；
                                </div>
                                <div>
                                    2、寻找资金。根据项目方需求，在全球范围内寻找并筛选合适的投资人信息和资金信息；
                                </div>
                                <div>
                                    3、寻找专家。在全球范围内寻找并筛选外部专家信息，供企业参考选聘；
                                </div>
                                <div>
                                    4、寻找人才。在全球范围内寻找并筛选客户所需的高级人才信息，供企业参考选聘；
                                </div>
                                <div>
                                    5、寻找政策。在全球范围内寻找并筛选与企业相关的政策信息；
                                </div>
                                <div>
                                    6、商机提示。为企业作出商机提示及投资建议。
                                </div>
                                <div>
                                    以上信息定期形成信息简报并推送，推送如遇重要信息则通过即时快报即时发送。
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="商业衔接服务">
                        <div class="tabBox">
                            <div style="color:#999;font-family:Consolas, &quot;font-size:14px;padding:.3rem">
                                <div>
                                    对信息简报和即时快报中推送的项目、投资人、专家及高级人才，平台可提供商业衔接服务，安排项目方、投资人、专家及高级人才、政府相关部门等进行直接接洽，接洽的方式包括电话沟通、视频沟通、见面洽谈和现场考察等。
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="商业需求推广服务">
                        <div class="tabBox">
                            <div style="color:#999;font-family:Consolas, &quot;font-size:14px;padding:.3rem">
                                <div>
                                    根据上市公司、私募机构等要求，平台按照精准推送的原则将其投资、融资、战略合作等需求信息定向发送给符合条件的潜在合作者。
                                </div>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="研修服务">
                        <div class="tabBox">
                            <div style="color:#999;font-family:Consolas, &quot;font-size:14px;padding: .3rem">
                                <div>
                                    1、小型专题研讨会。平台定期举行小型专题研讨会，会议将邀请国内外企业家、科技专家、投行高管、政府官员、跨界专家、法律和财税大咖等就特定行业、企业经典案例和热点事件等进行专题研讨和分享。
                                </div>
                                <div>
                                    2、大型主题会议。由证券传媒主办的各类大型年度会议。
                                </div>

                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="定制化增值服务">
                        <div class="tabBox">
                            <div style="color:#999;font-family:Consolas, &quot;font-size:14px;padding:.3rem">
                                <div>
                                    1、资金解决建议方案及指定项目的投融资撮合；
                                </div>
                                <div>
                                    2、 私人订制专项研讨会或项目研讨会；
                                </div>
                                <div>
                                    3、 项目路演服务；
                                </div>
                                <div>
                                    4、 推广服务和招商引资服务；
                                </div>
                                <div>
                                    5、 重大舆情提示及媒体沟通解决方案服务；
                                </div>
                                <div>
                                    6、 企业培训服务；
                                </div>
                                <div>
                                    7、全球商务考察与商务接待，以及翻译服务等
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>

</template>

<script>
    import Header from "@/components/Header.vue"
    import VeeValidate, { Validator } from 'vee-validate'
    import { Toast } from 'mint-ui'
    Validator.extend('mobile', {
        getMessage: name => '请输入正确的手机号码',
        validate: value => {
            return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
        }
    });
    Validator.extend('name', {
        getMessage: name => '请输入姓名',
        validate: value => {
            return value.length != 0
        }
    });
    Validator.extend('company', {
        getMessage: name => '请输入单位名称',
        validate: value => {
            return value.length != 0
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
            Header
        },
        data() {
            return {
                active: 0,
                isShowApply: false,
                formData: {
                    name: "",
                    mobile: "",
                    company: ""
                },
                isVip: '0'
            }
        },
        methods: {
			isonvip(){
				if(this.isVip!=0){
					let instance = Toast('您已开通VIP');
					setTimeout(() => {
					    instance.close();
					}, 2000);
				}
				else{
					this.isShowApply = true
				}
			},
            cancelApply() {
                this.isShowApply = false
            },
            // 确认报名 关闭报名框
            closeApply() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$axios.get(`/jsp/wap/index/do/doApplyVip.jsp`, { params: { name: this.formData.name, mobile: this.formData.mobile, company: this.formData.company } }).then(res => {
                            console.log("会员", res)
                            if (res.success == "true") {
                                let instance = Toast('信息提交成功，平台将尽快为您办理！');
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                                setTimeout(() => {
                                    this.isShowApply = false;
                                }, 500);
                            } else {
                                let instance = Toast(res.message);
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                            }
                        })
                        return;
                    }
                });
            },
            getUserInfo() {
                this.$axios.get('/jsp/wap/center/ctrl/jsonUserInfo.jsp').then(res => {
                    console.log("0", res)
                    if (res.success == 'true') {
                        this.isVip = res.data.userInfo.isVip
                        this.$store.commit('CHANGE_USERINFO', res.data.userInfo)
                    }
                })
            },
        },
        created() {
            this.getUserInfo()
        }
    }
</script>
<style scoped lang="scss">
    .all {
        background: #fff
    }

    .tabBox {
        height: 6.5rem;
    }

    .detail {
        // padding-bottom: .5rem;
        padding-top: .9rem
    }

    /deep/ .van-tabs__nav--line {
        padding-bottom: .3rem;
    }

    /deep/ .van-tabs__nav {
        display: -webkit-box;
    }

    /deep/ .van-tabs__line {
        background: #005982
    }

    img {
        width: 100%
    }

    .vipHeader {
        vertical-align: middle
    }

    .v1 {
        /* width: 3rem */
    }

    .v3Box {
        padding: .4rem
    }

    .title {
        text-align: center;
        padding: .3rem
    }

    .title span {
        padding-bottom: .1rem;
        border-bottom: .03rem solid #005982
    }

    .callBox {
        position: relative;
    }

    .callMe {
        position: absolute;
        left: 53%;
        bottom: .3rem;
        width: 2.4rem; // visibility: hidden;
        opacity: 0;
    }

    .applyDialog {
        text-align: center;
        margin: 0 auto;
        input {
            border: 0;
            border-bottom: 1px solid rgb(237, 237, 237); // line-height: 2.6;
            margin-left: .1rem;
            width: 80%;
        }
        .iconfont {
            font-size: .6rem; // padding-top: 1rem;
            display: inline-block
        }
        .iconfont::before {
            line-height: .8rem
        }
    }

    .rows {
        // height: .8rem;
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

    .sureBtn {
        background: #909399;
        color: #fff;
        text-align: left;
        margin-top: .4rem;
    }

    .error {
        color: #f00;
        font-size: .2rem;
        text-align: left;
        margin-left: .9rem
    }
</style>