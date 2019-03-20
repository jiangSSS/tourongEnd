<template>
  <div class="all">
    <Header></Header>
    <div class="container_warp" :model="attestForm">
      <div class="clearfix ">
        <div class="fll rows">
          <span class="star">* </span>
          <span>认证类型</span>
        </div>
        <div class="flr">
          <div v-for="(item , index) in type" :key="index" class="fll type_btn" :class="{'active':item.checked}" @click="get_type(index)">{{item.name}}</div>
        </div>
      </div>
      <div v-if="attestForm.type == 1">
        <div class="clearfix ">
          <div class="fll rows">
            <span class="star">* </span>
            <span>个人名片</span>
          </div>
          <van-uploader :after-read="onRead1" accept multiple action class="flr">
            <div class="btn">点击上传名片</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList" :key="item.index">{{item.name}}</div>
        <div class="clearfix ">
          <div class="fll rows">
            <!-- <span class="star">* </span> -->
            <span>个人简历</span>
          </div>
          <van-uploader :after-read="onRead2" accept multiple action class="flr">
            <div class="btn">点击上传简历</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList1" :key="item.index">{{item.name}}</div>
        <div class="clearfix ">
          <div class="fll rows">
            <!-- <span class="star">* </span> -->
            <span>个人荣誉</span>
          </div>
          <van-uploader :after-read="onRead3" accept multiple action class="flr">
            <div class="btn">点击上传荣誉</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList2" :key="item.index">{{item.name}}</div>
        <div class="clearfix ">
          <div class="fll rows">
            <span class="star">* </span>
            <span>企业营业执照</span>
          </div>
          <van-uploader :after-read="onRead4" accept multiple action class="flr">
            <div class="btn">点击上传文件企业营业执照</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList3" :key="item.index">{{item.name}}</div>
        <div class="">
          <div class="rows">
            <!-- <span class="star">* </span> -->
            <span>投资能力&风险承担能力介绍</span>
          </div>
          <textarea placeholder="请输入内容" v-model="attestForm.abilityBrief" class="textarea"></textarea>
        </div>
        <!--  -->
      </div>
      <div v-if="attestForm.type == 2">
        <div class="clearfix ">
          <div class="fll rows">
            <span class="star">* </span>
            <span>个人名片</span>
          </div>
          <van-uploader :after-read="onRead1" accept multiple action class="flr">
            <div class="btn">点击上传名片</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList" :key="item.index">{{item.name}}</div>
        <div class="clearfix ">
          <div class="fll rows">
            <!-- <span class="star">* </span> -->
            <span>个人简历</span>
          </div>
          <van-uploader :after-read="onRead2" accept multiple action class="flr">
            <div class="btn">点击上传简历</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList1" :key="item.index">{{item.name}}</div>
        <div class="clearfix ">
          <div class="fll rows">
            <!-- <span class="star">* </span> -->
            <span>个人荣誉</span>
          </div>
          <van-uploader :after-read="onRead3" accept multiple action class="flr">
            <div class="btn">点击上传荣誉</div>
          </van-uploader>
        </div>
        <div v-for="item in fileList2" :key="item.index">{{item.name}}</div>
        <div class="clearfix ">
          <div class="fll rows">
            <span class="star">* </span>
            <span>企业营业执照</span>
          </div>
          <van-uploader :after-read="onRead4" accept multiple action class="flr">
            <div class="btn">点击上传文件企业营业执照</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList3" :key="item.index">{{item.name}}</div>
        <!--  -->
        <div class="">
          <div class="rows">
            <!-- <span class="star">* </span> -->
            <span>历史投资案例</span>
          </div>
          <textarea placeholder="请输入内容" v-model="attestForm.brief" class="textarea"></textarea>
        </div>
        <div class="">
          <div class="rows">
            <!-- <span class="star">* </span> -->
            <span>投资能力&风险承担能力介绍</span>
          </div>
          <textarea placeholder="请输入内容" v-model="attestForm.abilityBrief" class="textarea"></textarea>
        </div>
      </div>
      <div v-if="attestForm.type == 3">
        <div class="clearfix ">
          <div class="fll rows">
            <span class="star">* </span>
            <span>个人名片</span>
          </div>
          <van-uploader :after-read="onRead1" accept multiple action class="flr">
            <div class="btn">点击上传名片</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList" :key="item.index">{{item.name}}</div>
        <div class="clearfix ">
          <div class="fll rows">
            <span class="star">* </span>
            <span>个人简历</span>
          </div>
          <van-uploader :after-read="onRead2" accept multiple action class="flr">
            <div class="btn">点击上传简历</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList1" :key="item.index">{{item.name}}</div>
        <div class="clearfix ">
          <div class="fll rows">
            <span class="star">* </span>
            <span>个人荣誉</span>
          </div>
          <van-uploader :after-read="onRead3" accept multiple action class="flr">
            <div class="btn">点击上传荣誉</div>
          </van-uploader>
        </div>
        <div class="fileList" v-for="item in fileList2" :key="item.index">{{item.name}}</div>
      </div>

      <mt-button type="default" class="submit" @click="submit">提交</mt-button>
			<center v-if="this.why_info" style="font-size: 14px;margin-top: 0.3rem;">上次审核失败原因:{{why_info}}</center>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue"
  import { Toast } from 'mint-ui'
  export default {
    components: {
      Header,
      Toast
    },
    data() {
      return {
        type: [{ name: "项目方", checked: true }, { name: "投资人", checked: false }, { name: "专家", checked: false }],
        attestForm: {
          brief: "",
          abilityBrief:"",
          type: "1",
          cardFilePath: [],
          cvFilePath: [],
          honorFilePath: [],
          licenseFilePath: [],
        },
        fileList: [],
        fileList1: [],
        fileList2: [],
        fileList3: [],
				why_info:'',
      }
    },
    methods: {
			/* 获取驳回原因 */
			/* get_why(type) {
				alert(type)
					this.$axios.get('/jsp/wap/center/ctrl/jsonAuthentication.jsp',{
						params: {
						  type: type+1
						}
					}).then(res => {
						//console.log("驳回原因", res)
						//console.log("驳回说明", res.data.rebutReason)
						this.why_info=res.data.rebutReason
						
					})
				
			}, */
      get_type(index) {
				//alert(index)
				
        if (this.type[index].checked == true) {
          this.type[index].checked = false
          this.attestForm.type = ''
        } else {
          this.type.forEach(item => {
            item.checked = false
          })
          this.type[index].checked = true
          this.attestForm.type = (index + 1).toString()
        }this.$axios.get('/jsp/wap/center/ctrl/jsonAuthentication.jsp',{
					params: {
					  type: index+1
					}
				}).then(res => {
					//console.log("驳回原因", res)
					//console.log("驳回说明", res.data.rebutReason)
					this.why_info=res.data.rebutReason
					
				})
      },
      submit() {
				if(this.attestForm.type==1){
					if(this.attestForm.cardFilePath==''){
						 let instance = Toast('个人名片不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return
					}
					if( this.attestForm.licenseFilePath==''){
						 let instance = Toast('企业营业执照不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return
					}
				}
				if(this.attestForm.type==2){
					if(this.attestForm.cardFilePath==''){
						 let instance = Toast('个人名片不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return
					}
					if( this.attestForm.licenseFilePath==''){
						 let instance = Toast('企业营业执照不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return
					}
				}
				if(this.attestForm.type==3){
					if(this.attestForm.cardFilePath==''){
						 let instance = Toast('个人名片不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return
					}
					if( this.attestForm.cvFilePath==''){
						 let instance = Toast('个人简历不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return
					}
					if( this.attestForm.honorFilePat==''){
						 let instance = Toast('个人荣誉不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return
					}
				}
        var cardFilePath = this.attestForm.cardFilePath.join(',')
        var cvFilePath = this.attestForm.cvFilePath.join(',')
        var honorFilePath = this.attestForm.honorFilePath.join(',')
        var licenseFilePath = this.attestForm.licenseFilePath.join(',')
        this.$axios.get('/jsp/wap/center/do/doAuthentication.jsp', {
          params: { type: this.attestForm.type, brief: this.attestForm.brief, abilityBrief:this.attestForm.abilityBrief,cardFilePath, cvFilePath, honorFilePath, licenseFilePath }
        }).then(res => {
          console.log("提交认证", res)
          if (res.success == "true") {
            let instance = Toast('上传认证资料成功');
            setTimeout(() => {
              instance.close();
            }, 2000);
            setTimeout(() => {
              this.attestForm.brief = ""
              this.attestForm.abilityBrief = ""
              this.type.forEach(item => {
                item.checked = false
              })
              this.attestForm.type = ""
              // this.fileList = []
              this.attestForm.cardFilePath = []
              this.attestForm.cvFilePath = []
              this.attestForm.honorFilePath = []
              this.attestForm.licenseFilePath = []
              this.$router.push("/my")
            }, 2000)
          } else {
            let instance = Toast(res.message);
            setTimeout(() => {
              instance.close();
            }, 2000);
          }
        })
      },
      onRead1(f) {
        let param = new FormData(); //创建form对象
        param.append('file', f.file);//通过append向form对象添加数据
        let config = {
          headers: { 'content-type': 'multipart/form-data' }
        };  //添加请求头
        this.$axios.post('/component/trUpload2/uploadify', param, config).then(res => {
          console.log('111', res)
          if (res.success == true) {
            this.attestForm.cardFilePath.push(res.data.relativePath)
            this.fileList.push({ name: res.data.originalName, url: res.data.relativePath })
            let instance = Toast('上传成功');
            setTimeout(() => {
              instance.close();
            }, 1000);
          } else {
            let instance = Toast('上传失败，请检查网络');
            setTimeout(() => {
              instance.close();
            }, 1000);
          }
        })
      },
      onRead2(f) {
        let param = new FormData(); //创建form对象
        param.append('file', f.file);//通过append向form对象添加数据
        let config = {
          headers: { 'content-type': 'multipart/form-data' }
        };  //添加请求头
        this.$axios.post('/component/trUpload2/uploadify', param, config).then(res => {
          console.log('111', res)
          if (res.success == true) {
            this.attestForm.cvFilePath.push(res.data.relativePath)
            this.fileList1.push({ name: res.data.originalName, url: res.data.relativePath })
            let instance = Toast('上传成功');
            setTimeout(() => {
              instance.close();
            }, 1000);
          } else {
            let instance = Toast('上传失败，请检查网络');
            setTimeout(() => {
              instance.close();
            }, 1000);
          }
        })
      },
      onRead3(f) {
        let param = new FormData(); //创建form对象
        param.append('file', f.file);//通过append向form对象添加数据
        let config = {
          headers: { 'content-type': 'multipart/form-data' }
        };  //添加请求头
        this.$axios.post('/component/trUpload2/uploadify', param, config).then(res => {
          console.log('111', res)
          if (res.success == true) {
            this.attestForm.honorFilePath.push(res.data.relativePath)
            this.fileList2.push({ name: res.data.originalName, url: res.data.relativePath })
            let instance = Toast('上传成功');
            setTimeout(() => {
              instance.close();
            }, 1000);
          } else {
            let instance = Toast('上传失败，请检查网络');
            setTimeout(() => {
              instance.close();
            }, 1000);
          }
        })
      },
      onRead4(f) {
        let param = new FormData(); //创建form对象
        param.append('file', f.file);//通过append向form对象添加数据
        let config = {
          headers: { 'content-type': 'multipart/form-data' }
        };  //添加请求头
        this.$axios.post('/component/trUpload2/uploadify', param, config).then(res => {
          console.log('111', res)
          if (res.success == true) {
            this.attestForm.licenseFilePath.push(res.data.relativePath)
            this.fileList3.push({ name: res.data.originalName, url: res.data.relativePath })
            let instance = Toast('上传成功');
            setTimeout(() => {
              instance.close();
            }, 1000);
          } else {
            let instance = Toast('上传失败，请检查网络');
            setTimeout(() => {
              instance.close();
            }, 1000);
          }
        })
      },
      // 文件上传   
      // onRead(f) {
      //   let param = new FormData(); //创建form对象
      //   param.append("file", f.file); //通过append向form对象添加数据
      //   let config = {
      //     headers: { "content-type": "multipart/form-data" }
      //   };
      //   //添加请求头
      //   this.$axios.post("/component/trUpload2/uploadify", param, config).then(res => {
      //     if (res.success == true) {
      //       console.log(res);
      //       this.fileNames.push(res.data.originalName);
      //       this.filePaths.push(res.data.relativePath);
      //       this.fileList.push({ name: res.data.originalName, url: res.data.relativePath })
      //       let instance = Toast('上传成功');
      //       setTimeout(() => {
      //         instance.close();
      //       }, 1000);
      //     } else {
      //       let instance = Toast('上传失败，请检查网络');
      //       setTimeout(() => {
      //         instance.close();
      //       }, 1000);
      //     }
      //   });
      // },

    },
    created() {
			this.$axios.get('/jsp/wap/center/ctrl/jsonAuthentication.jsp',{
				params: {
				  type: 1
				}
			}).then(res => {
				//console.log("驳回原因", res)
				//console.log("驳回说明", res.data.rebutReason)
				this.why_info=res.data.rebutReason
				
			})
      // let authenticationType = this.$store.state.userinfo.authenticationType
      // console.log(authenticationType);
      // let Type = authenticationType.split(',')
      // Type.forEach(item => {
      //   if (item == 1) {
      //     this.project = true
      //   }
      //   if (item == 2) {
      //     this.money = true
      //   }
      //   if (item == 3) {
      //     this.member = true
      //   }
      // })
    }
  }
</script>
<style scoped lang="scss">
  .all {
    background: #fff;
  }

  .fileList {
    font-size: .2rem;
    color: #ccc
  }

  .rows {
    line-height: 3
  }

  .textarea {
    resize: none;
    border: 1px solid #f3f5f7;
    width: 100%;
    height: 2rem;
    padding: .1rem .2rem
  }

  .container_warp {
    padding: 1rem .3rem 0;
    width: 100%;

  }

  .star {
    color: #f00;
    line-height: 2
  }

  .sendFile {
    color: #005982;
    line-height: 2.6
  }

  .type_btn {
    background: #f3f5f7;
    padding: .1rem 0;
    margin-left: .2rem;
    width: 1.2rem;
    text-align: center;
    margin-top: .1rem;
    border-radius: 6%
  }

  .active {
    background: #005982;
    color: #fff
  }

  .submit {
    background: #005982 !important;
    color: #fff;
    padding: 0 .2rem !important;
    width: 1.6rem;
    margin-top: .4rem !important
  }

  .btn {
    color: #005982;
    line-height: 3
  }
</style>