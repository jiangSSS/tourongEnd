<template>
    <div class="all">
        <van-cell-group>
            
            <van-field v-model="formData.name" label="姓名" v-validate="'required|name'" name="姓名"  placeholder="请填写姓名" />
            <!-- <span v-show="errors.has('姓名')" class="error">{{ errors.first('姓名')}}</span> -->
            <van-field v-model="formData.mobile" label="联系方式" v-validate="'required|mobile'" name="电话号码" placeholder="请填写电话号码" />
            <!-- <span v-show="errors.has('电话号码')" class="error">{{ errors.first('电话号码')}}</span> -->
            <van-field v-model="formData.company" label="单位" v-validate="'required|company'" name="单位名称" placeholder="请填写单位名称" />
            <!-- <span v-show="errors.has('单位名称')" class="error">{{ errors.first('单位名称')}}</span> -->
            <van-field v-model="formData.job" label="职位" v-validate="'required|job'" name="所在职位" placeholder="请填写所在职位" />
            <!-- <span v-show="errors.has('所在职位')" class="error">{{ errors.first('所在职位')}}</span> -->
            <van-field v-model="formData.introduce" label="介绍" v-validate="'required|introduce'" name="介绍" type="textarea" placeholder="请填写介绍" rows="4" autosize />
            <!-- <span v-show="errors.has('介绍')" class="error">{{ errors.first('介绍')}}</span> -->
        </van-cell-group>
        <div class="submitBox">
            <mt-button type="default" class="submit" @click="submit">提交</mt-button> 
        </div>       
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import { Dialog, Field } from "vant";
    import { Toast } from "mint-ui"
    import VeeValidate, { Validator } from "vee-validate";
    Validator.extend("mobile", {
        getMessage: field => "必须是11位手机号码",
        validate: value => {
            return (
                value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
            );
        }
    });
    Validator.extend("introduce", {
        getMessage: field => "请输入",
        validate: value => {
            return (
                value.length != 0
            );
        }
    });
    Validator.extend("company", {
        getMessage: field => "请输入",
        validate: value => {
            return (
                value.length != 0
            );
        }
    });
    Validator.extend("job", {
        getMessage: field => "请输入",
        validate: value => {
            return (
                value.length != 0
            );
        }
    });
    Validator.extend("name", {
        getMessage: field => "请输入",
        validate: value => {
            return (
                value.length != 0
            );
        }
    });
    Validator.extend("formData.directorEmail", {
        // getMessage: field => "邮箱格式不正确",
        messages: {
            email: () => '邮箱格式不正确'
        },
        validate: value => {
            return;
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
        },
        data() {
            return {
                formData: {
                    name: "",
                    mobile: "",
                    company: "",
                    job: "",
                    introduce: ""
                }
            }
        },
        methods: {
            submit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$axios.get(`/jsp/wap/center/do/doExpertRecommend.jsp`, {
                            params: {
                                name: this.formData.name,
                                mobile: this.formData.mobile,
                                company: this.formData.company,
                                job: this.formData.job,
                                introduce: this.formData.introduce
                            }
                        }).then(res => {
                            console.log("推荐专家", res)
                            if (res.message = "true") {
                                let instance = Toast("提交成功！我们客服人员会尽快与您联系");
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                                setTimeout(() => {
                                    this.$router.push("/my")
                                }, 2000)
                            } else {
                                let instance = Toast("提交失败，请检查网络或重试");
                                setTimeout(() => {
                                    instance.close();
                                }, 2000);
                            }
                        })
                        return;
                    }
                    let instance = Toast('请完善信息');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    .all {
        background: #fff;
    }
    .red{
        color: #f00
    }
    .error {
        color: #f00;
        font-size: .2rem;
        display: inline-block;
        margin-left: 2.2rem
    }

    .submit {
        width: 94%;
        height: .8rem;
        background: #005982;
        color: #fff;
        margin-top: .6rem
    }
    .submitBox{
        text-align: center;
    }
</style>