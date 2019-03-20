<template>
  <div class="all">
    <Header></Header>
    <div class="container_warp">
      <textarea class="textarea" v-model="content" placeholder="请输入评论内容" name="" id="" cols="30" rows="10"></textarea>
      <mt-button type="default" class="submit" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  import { Toast } from "mint-ui";
  import * as Cookies from "js-cookie";
  export default {
    components: {
      Header,
      Toast
    },
    data() {
      return {
        content: ""
      };
    },
    methods: {
      submit() {
        if (Cookies.get("userKey")) {
          if (this.content != "") {
            let id = this.$route.query.id;
            this.$axios
              .get("/jsp/wap/trActivity/do/doComment.jsp", {
                params: { id, content: this.content }
              })
              .then(res => {
                if (res.success == "true") {               
                  let instance = Toast("评论成功");
                  setTimeout(() => {
                    instance.close();
                  }, 1000);
                  setTimeout(() => {
                    this.content = "";
                  }, 2000);
                  setTimeout(() => {
                    this.$router.push({ name: "activityDetail", query: { id } });
                  }, 1000);
                }
              });
          } else {
            let instance = Toast("不能发表空评论");
            setTimeout(() => {
              instance.close();
            }, 1000);
          }
        } else {
          let instance = Toast("登录后才能发表评论");
          setTimeout(() => {
            instance.close();
          }, 1000);
        }
      }
    }
  };
</script>
<style scoped lang="scss">
  .all {
    background: #fff;
  }

  .container_warp {
    padding-top: 1rem;
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

  .textarea:focus {outline: none;}
  .submit {
    width: 94%;
    height: 0.8rem;
    background: #005982;
    color: #fff;
    margin-top: 0.6rem;
  }
</style>