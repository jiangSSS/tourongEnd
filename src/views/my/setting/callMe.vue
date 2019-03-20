<template>
<div>
    <Header></Header>     
    <div class="all">
        <div class="detail">
            <!-- <router-link to="/weekList"><img src="../../../static/app/img/my0.jpg" alt=""></router-link> -->
           
           <!-- <img src="../../../../static/app/img/about-1.jpg" class="" alt=""> -->
           <div class="callBox">
               <img src="../../../../static/app/img/zaixiankefu.png" class="callImg" alt="">
               <p>在线客服</p>
               <p>010-82033116</p>
           </div>
           <div class="callBox">
               <img src="../../../../static/app/img/kefuyouxiang.png" class="callImg" alt="">
               <p>客服邮箱</p>
               <p>kefu@zqcmlink.com</p>
           </div>
           <div class="callBox" @click="xinlang">
               <img src="../../../../static/app/img/xinliangweibo.png" class="callImg" alt="">
               <p>新浪微博</p>
               <p>证券传媒投融连线</p>
           </div>
           <div class="callBox">
               <img src="../../../../static/app/img/zaixiankefu.png" class="callImg" alt="">
               <p>lianxidizhi</p>
               <p>北京市西城区裕民东路3号京版信息港8层</p>
           </div>
           <div class="callBox">
               <img src="../../../../static/app/img/shangwuhezuoyouxiang.png" class="callImg" alt="">
               <p>商务合作邮箱</p>
               <p>cooperator@zqcmlink.com</p>
           </div>
           <div class="callBox">
               <img src="../../../../static/app/img/rencaizhaopinyouxiang.png" class="callImg" alt="">
               <p>人才招聘邮箱</p>
               <p>hr@zqcmlink.com</p>
           </div>
        </div>
    </div>    
</div>
    
</template>

<script>
    import Header from "@/components/Header.vue"
    export default {
        components:{
            Header
        },
        data() {
            return {
            }
        },
        methods:{
             xinlang(){
                let href = 'https://weibo.com/u/6914234011?is_hot=1'
                 window.open(href, "_blank");
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .detail {
        padding-bottom: 1.1rem;
        padding-top: .9rem
    }
   .callImg{
       width: 1.4rem
   }
   .callBox{
    //    margin: 0 auto;
       text-align: center;
       border-bottom: .2rem solid #f3f5f7;
       padding: .2rem 0;
   }
    
    
</style>