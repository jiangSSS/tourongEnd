<template>

  <div class="all">
    <Header></Header>
    <div class="containerAll">
      <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"> -->
      <div class="projectList" v-for="(item,index) in pageList" :key="index">
        <!-- <router-link :to="{path:'/projectA/projectDetail',query:{id:item.id}}"> -->
        <!-- </router-link> -->
        <div class="title clearfix"><div class="fll">{{title}}</div>
          <mu-button icon color="Normal" class="delete flr" @click="delete_item(item.id,index)">
            <i class="iconfont icon-shanchu"></i>
            <mu-icon value="删除" class="mu-icon"></mu-icon>
          </mu-button>
        </div>
        <div>
          <div class="content">{{item.content}}</div>
          <img class="manageImg" :src=" $url + imgPaths" alt="" v-for="(imgPaths,idx) in item.imgPathList" :key="idx">
          
        </div>
        <div class="time">
            <i></i>
            {{item.addTimeStr.slice(0,10)}}
            <span class="seconed">{{item.addTimeStr.slice(10,19)}}</span>
        </div>

      </div>
      <div>
        <div class="noData" v-show="more">加载中...</div>
        <div class="noData" v-show="noMore">--- 没有更多数据了 ---</div>
      </div>
    </div>
    <div class="subBtn" @click="add">添加进展</div>
    <div v-show="noShow" class="noChange">您还未添加过进展</div>
    <!-- </div> -->
    
  </div>
</template>

<script>
  import Header from "@/components/Header.vue"
  import Footer from "@/components/Bottom.vue"
  import { MessageBox } from 'mint-ui';
  export default {
    components: {
      Header,
      Footer
    },
    data() {
      return {
        pageList: [],
        noShow: false,
        title: '',
        imgPath:'',
        more: false,
        noMore: false
      }
    },
    methods: {
      getData() {
        let id = this.$route.query.id
        this.$axios.get(`/jsp/wap/center/ctrl/jsonProjectDetail.jsp?id=${id}`).then(res => {
          this.title = res.data.project.title
        })
        this.$axios.get(`/jsp/wap/trProject/ctrl/jsonProjectDynamicList.jsp?id=${id}`).then(res => {
          console.log("aaa", res)
          this.pageList = res.data
          if (this.pageList.length == 0) {
            this.noShow = true
          }
        })
      },
      // 
      add(){
        let id = this.$route.query.id
        this.$router.push({name:'addManageProject',query:{id}})
      },
      // 删除一个进展
      delete_item(id, index) {
        MessageBox.confirm('', {
          message: '即将删除该资金, 是否继续?',
          title: '提示',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            this.$axios.get(`/jsp/wap/center/do/doDelProjectDynamic.jsp?id=${id}`).then(res => {
              this.pageList.splice(index, 1)
              this.count -= 1
            })
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
          }
        });
      },
    },

    created() {
      this.getData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .containerAll {
    // background: #f3f5f7; 
    margin-top: 1rem;

  }
  /deep/ .mu-icon-button{
    height: .8rem;
    padding: 0;
    margin-top: -.1rem
  }
  .title,content,time{
    /* padding: 0 .2rem */
  }
  .projectList{
    padding: .2rem 0;
    border-bottom: .2rem solid #f3f5f7
  }
  .manageImg {
    width: 100%;
    padding: 0 .2rem
  }
  .delete {
        width: 1.5rem
    }
  .title {
    border-left: 3px solid #005982;
    padding:0 .2rem;
    color: #005982;
    font-size: .34rem;
    margin: .1rem 0 .1rem .3rem;
    height: .6rem;
    line-height: .6rem
  }

  .content {
    line-height: 1.5;
    color: #666;
    padding: 0 .3rem
  }

  .time {
    color: #999;
    padding: 0 .2rem
  }

  .subBtn {
    position: fixed;
    top: 0.2rem;
    right: 0.3rem;
    background: #fff;
    border: 0;
    font-size: 0.28rem;
    color: #005982;
    z-index: 999;
  }

  .noChange {
    text-align: center;
    color: #ccc;
    margin-top: 3rem;
  }
</style>