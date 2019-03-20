<template>
  <div class="">
    <Header></Header>
    <!-- <div class="header">
        <mt-header title="评论列表" class="header-title">
            <mt-button icon="back" slot="left" @click="$router.push({name:'newsDetail',query:{id}})"></mt-button>           
        </mt-header>
    </div> -->
    <div class="all">
      <div class="alla">

        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading">
          <p v-show="com_show" style="text-align:center;margin-top: 2rem">暂无评论</p>
          <div class="commentBox" v-for="item in pageList" :key="item.index">
            <div class="clearfix">
              <img :src="$url + item.headImgPath" v-if="item.headImgPath != ''" class="userImg fll">
              <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188149577,2949073731&fm=26&gp=0.jpg" v-else class="userImg fll">
              <div class="clearfix">
                <span class="userName fll">{{item.memberName}}</span>
                <div class="flr commentTime">{{item.beforeTime}}前</div>
              </div>
            </div>
            <div class="commentDetail">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="commentBtnBox">
        <mt-button type="default" class="commentBtn" @click="$router.push({name:'comments',query:{id}})">我要评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue";
  export default {
    components: {
      Header
    },
    data() {
      return {
        pageList: [],
        pn: 1,
        pageNumber: 1,
        totalCount: [],
        id: "",
        loading: false,
        com_show: false
      };
    },
    methods: {
      // 上拉加载
      loadMore() {
        this.pn = this.pn + 1
        this.loading = true
        this.$axios.get(`/jsp/wap/trNews/ctrl/jsonCommentPage.jsp?id=${this.id}`, {
          params: {
            pageNumber: this.pn
          }
        }).then(res => {
          if (res.success == "true") {
            var pageList = res.data.pageList
            pageList.forEach(item => {
              var time = (new Date(item.addTimeStr)).valueOf()
              item.beforeTime = this.get_time_diff(time)
            })
            this.pageList = [...this.pageList, ...res.data.pageList]
            this.totalCount = res.data.pagination.totalCount
            this.loading = false
          }
        })
      },
      // 我的评论列表
      getData() {
        this.loading = true
        this.id = this.$route.query.id
        this.$axios.get(`/jsp/wap/trNews/ctrl/jsonCommentPage.jsp?id=${this.id}`).then(res => {
          console.log("项目列表", res)
          if (res.success == "true") {
            this.totalCount = res.data.pagination.totalCount
            var pageList = res.data.pageList
            pageList.forEach(item => {
              var time = (new Date(item.addTimeStr)).valueOf()
              item.beforeTime = this.get_time_diff(time)
            })
            this.pageList = pageList
            this.pn = 1
            this.loading = false
            if (pageList.length == 0) {
              this.com_show = true
            }
          } else {
            this.com_show = true
          }
        });
      },

      // 获取时间
      get_time_diff(time) {
        var diff = '';
        var time_diff = new Date().getTime() - time; //时间差的毫秒数 

        //计算出相差的月数
        var months = Math.floor(time_diff / (30 * 24 * 3600 * 1000))
        //计算出相差天数 
        var days = Math.floor(time_diff / (24 * 3600 * 1000));
        // if (days > 0) {
        // diff += days + '天';
        // }
        //计算出小时数 
        var leave1 = time_diff % (24 * 3600 * 1000);
        var hours = Math.floor(leave1 / (3600 * 1000));
        // if (hours > 0) {
        // diff += hours + '小时';
        // } else {
        // if (diff !== '') {
        //   diff += hours + '小时';
        // }
        // }
        //计算相差分钟数 
        var leave2 = leave1 % (3600 * 1000);
        var minutes = Math.floor(leave2 / (60 * 1000));
        // if (minutes > 0) {
        // diff += minutes + '分';
        // } else {
        // if (diff !== '') {
        //   diff += minutes + '分';
        // }
        // }
        //计算相差秒数 
        var leave3 = leave2 % (60 * 1000);
        var seconds = Math.round(leave3 / 1000);
        // if (seconds > 0) {
        // diff += seconds + '秒';
        // } else {
        // if (diff !== '') {
        //   diff += seconds + '秒';
        // }
        // }
        if (months >= 1) {
          diff = months + '月';
        } else if (days >= 1) {
          diff = days + '天'
        } else if (hours >= 1) {
          diff = hours + '小时'
        } else if (minutes >= 1) {
          diff = minutes + '分'
        } else if (seconds >= 1) {
          diff = seconds + '秒'
        } else {
          if (diff !== '') {
            diff += seconds + '秒';
          }
        }
        return diff;
      },
    },
    created() {
      this.getData()
    }
  };
</script>
<style scoped lang="scss">
  .all {
    padding: 0.9rem 0.2rem 0;
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

  .alla {
    margin-bottom: 1.3rem
  }

  .commentBox {
    border-bottom: 1px solid #f3f5f7;
    padding: .1rem 0;
  }

  .commentDetail {
    font-size: 0.26rem;
    font-family: "PingFang";
    color: rgb(51, 51, 51);
    line-height: 1.5;
    padding-left: .2rem;
    margin-top: -.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

  }

  .commentBtnBox {
    position: fixed;
    height: 1.3rem;
    width: 100%;
    bottom: 0;
    background: #fff;
  }

  .commentBtn {
    width: 94%;
    height: .8rem;
    background: #005982;
    color: #fff;
    text-align: center;
    position: fixed;
    bottom: .25rem;
  }

  .userImg {
    width: 1rem;
    height: 1rem;
    margin-top: .1rem;
    border-radius: 100%
  }

  .userName {
    font-size: 0.32rem;
    font-family: "PingFang";
    color: rgb(51, 51, 51);
    font-weight: bold;
    line-height: 2;
    margin-left: .15rem
  }

  .commentTime {
    font-size: .28rem;
    font-family: "PingFang";
    color: rgb( 204, 204, 204);
    line-height: 2.5;

  }
</style>