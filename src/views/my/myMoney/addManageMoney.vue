<template>

    <div class="all">
        <Header></Header>
        <div class="containerAll" :model="formData">
            <div class="title">
                <span class="xing">*</span> 内容</div>
            <div class="text">
                <textarea class="textarea" placeholder="请输入内容" name="content" v-model="formData.content" id cols="30" rows="5"></textarea>
            </div>
            <div class="title">
                <span>图片上传</span>
                <van-uploader :after-read="onRead" accept multiple action class="">
                    <mt-button type="default" class="btn">添加文件</mt-button>
                </van-uploader>
            </div>
            <div class="fileData" v-show="this.imgPaths.length > 0">{{imgPaths}}</div>
            <div class="submitBox">
                <mt-button type="default" class="submit" @click="submit">提交</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    import { MessageBox, Toast } from 'mint-ui';
    export default {
        components: {
            Header,
            Footer
        },
        data() {
            return {
                formData: {
                    content: "",
                },
                fileList: [],
                imgPaths: []

            }
        },
        methods: {
            submit() {
                var id = this.$route.query.id
                var imgPaths = this.imgPaths.join(',')
                if (this.formData.content != '') {
                    this.$axios.get('/jsp/wap/center/do/doEditCapitalDynamic.jsp',{params:{projectId:id,content:this.formData.content,imgPaths}}).then(res => {
                        if (res.success == 'true') {
                            let instance = Toast('提交动态成功');
                            setTimeout(() => {
                                instance.close();
                            }, 1000);
                            setTimeout(() => {
                                this.$router.push({ name: 'manageMoney', query: { id } })
                            }, 500)
                        }
                    })
                } else {
                    let instance = Toast('请填写内容');
                    setTimeout(() => {
                        instance.close();
                    }, 1000);
                }
            },
            // 文件上传   
            onRead(f) {
                this.loading = true;
                let param = new FormData(); //创建form对象
                param.append("file", f.file); //通过append向form对象添加数据
                let config = {
                    headers: { "content-type": "multipart/form-data" }
                }; //添加请求头
                this.$axios
                    .post("/component/trUpload2/uploadify", param, config)
                    .then(res => {
                        this.imgPaths.push(res.data.relativePath);
                    });
            },
        }
    }
</script>
<style scoped lang="scss">
    .containerAll {
        margin-top: 1rem;

    }

    .btn {
        color: #005982;
        border: 1px solid #005982;
        line-height: 1;
        padding: 0 .2rem;
        height: .7rem;
        margin-top: .1rem;
        font-weight: 700;
    }

    .fileData {
        font-size: .2rem
    }

    .title {
        padding-left: .3rem
    }

    .xing {
        color: #f00
    }

    .textarea {
        width: 94%;
        padding: 0.2rem;
        background: #f3f5f7;
        border: none;
        resize: none;
        margin: 0 auto
    }

    .text {
        text-align: center;
    }

    .textarea:focus {
        outline: none;
    }

    .submit {
        width: 90%;
        color: #fff;
        background: #005982
    }

    .submitBox {
        text-align: center;
        margin: .4rem 0;
    }
</style>