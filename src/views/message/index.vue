<template>
    <div class="containerAll">
        <!-- <Header></Header> -->
        <div class="header">
            <mt-header title="我的消息" class="header-title">
                <!-- <mt-button icon="back" slot="left" @click="$router.push('/home')"></mt-button> -->
            </mt-header>
        </div>
        <div class="navTab">
            <div class="nav fll">
                <router-link :to="{name:'sysMessage'}">系统消息</router-link>
            </div>
            <div class="nav fll" @click="tokefu">
                <div class="kefu">在线客服</div> 
            </div>
            <div class="nav fll">
                <router-link :to="{name:'projectProgress'}">项目进展</router-link>
            </div>
            <div class="nav fll">
                <router-link :to="{name:'stateMoney'}">资金动态</router-link>
            </div>
        </div>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    export default {
        components: {
            Header,
            Footer
        },
        data() {
            return {
                isShow: false,
                active: 0,
                vactiveStep: 0,
                    
            }
        },
        methods: {
            tokefu(){
                window.open('https://tb.53kf.com/code/app/10193554/1','_blank')
            },   
        }
    }
</script>
<style scoped lang="scss">
    .mint-header{
        background: #fff!important;
        color: #333!important;
        position: fixed!important;
        height: 0.86rem;
        top: 0;right: 0;left: 0;width: 100%;
        font-size: .4rem!important;
        z-index: 810
    }
    .mintui-back:before{
        font-size: .3rem!important
    }
    .containerAll{
        margin-bottom: 1.1rem
    }
    .navTab {
        margin-top: .9rem;
        display: flex;
        justify-content: space-around;
        color: #999;
        border-top: 1px solid #f3f5f7;
        padding: .2rem 0;
        border-bottom: .2rem solid #f3f5f7
    }
    .navTab a {
        color: #666;
        font-size: .32rem;
        padding: .2rem
    }
    .navMenu:hover {
        color: #005982;
    } //点击样式随路由变化
    .router-link-active {
        color: #005982 !important;
        border-bottom: 2px solid #005982;
    }
    .kefu{
        color: #666;
        font-size: .32rem!important
    }
</style>