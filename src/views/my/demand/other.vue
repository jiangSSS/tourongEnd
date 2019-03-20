<template>
  <div class="all">
    <!-- <Header></Header> -->
    <div class="container_warp">
      <textarea class="textarea" placeholder="请详细填写你的需求" v-model="content" name id cols="30" rows="10"></textarea>
      <mt-button type="default" class="submit" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue"
  import { Dialog } from "vant";
  import {Toast} from "mint-ui"
  export default {
    components: {
      Header
    },
    data() {
      return {
        content: ""
      }
    },
    methods: {
      submit() {
        // Dialog.alert({
        //   message: "提交成功,客服人员会尽快与您联系。"
        // }).then(() => {
          // on close
          if(this.content == ""){
             let instance = Toast("请填写需求");
              setTimeout(() => {
                instance.close();
              }, 2000);
          }else{
            this.$axios.get(`/jsp/wap/center/do/doFeedback.jsp`, { params: { content: this.content } }).then(res => {
            console.log(res)
            if (res.success = "true") {
              // this.content = res.data
              let instance = Toast("提交成功！我们客服人员会尽快与您联系");
              setTimeout(() => {
                instance.close();
              }, 2000);
              setTimeout(()=>{
                this.$router.push("/my")
              },500)
            } else {
              let instance = Toast("提交失败，请检查网络或重试");
              setTimeout(() => {
                instance.close();
              }, 2000);
            }
          })
          }
          
        // });
         
      },
    }
  }
</script>
<style scoped lang="scss">
  .all {
    background: #fff;
  }
  .container_warp {
    padding-top: .5rem;
    text-align: center;
    width: 100%;
  }
  .textarea {
    width: 94%;
    padding: 0.2rem;
    background: #f3f5f7;
    border: none;
    resize: none;
  }
  .textarea:focus {
    outline: none;
  }
  .submit {
    width: 94%;
    height: 0.8rem;
    background: #005982;
    color: #fff;
    margin-top: 0.6rem;
  }
</style>