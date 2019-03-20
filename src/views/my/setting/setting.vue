<template>
<div>
    <Header></Header>     
    <div class="all">
        <div class="detail">
            <!-- <router-link to="/weekList"><img src="../../../static/app/img/my0.jpg" alt=""></router-link> -->
            <div class="logoBox">
            <img src="../../../../static/app/img/my/logoa.jpg" class="logo" alt="">
                
            </div>
            <!-- <router-link to="" >
                <div class="myDetail">
                    <span class="myName">版本更新</span>
                <i class="iconfont icon-xiangyou flr"></i>
                </div>    
            </router-link> -->
            <router-link to="aboutUs" >
                <div class="myDetail">
                    <span class="myName">关于投融咨询App</span>
                <i class="iconfont icon-xiangyou flr"></i>
                </div>    
            </router-link>
            <!-- <router-link to="" >
                <div class="myDetail">
                    <span class="myName">清除缓存</span>
                <i class="iconfont icon-xiangyou flr"></i>
                </div>    
            </router-link> -->
            <router-link to="callMe" >
                <div class="myDetail">
                    <span class="myName">联系我们</span>
                <i class="iconfont icon-xiangyou flr"></i>
                </div>    
            </router-link>        
        </div>
    </div>
     <Footer class="footer"></Footer>       
</div>
    
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    export default {
        components:{
            Footer,
            Header
        },
        data() {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .detail {
        padding-bottom: 1.1rem;
        padding-top: .8rem
    }
    img {
        width: 100%
    }
    .logoBox{
        text-align: center;
        padding: .8rem 0;
        border-bottom: .2rem solid #f3f5f7;
    }
    .logo{
        width: 2rem
    }
    .myDetail{
        color: #666;
        padding: .2rem;
        background: #fff;
        border-bottom: .2rem solid #f3f5f7;
        .myName{
            padding-left: .2rem;
            display: inline-block;
            font-family: "PingFang";
             color: rgb( 51, 51, 51 );
             line-height: 3;
        }
        .iconfont{
            line-height: 3
        }
        .icon{
            width: .3rem
        }
    }
</style>