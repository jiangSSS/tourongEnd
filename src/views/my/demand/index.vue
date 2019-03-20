<template>
    <div class="containerAll">
        <!-- <Header @click="$router.push('/my')"></Header> -->
        <div class="header">
            <mt-header title="需求填报" class="header-title">
                <mt-button icon="back" slot="left" @click="$router.push('/my')"></mt-button>
            </mt-header>
        </div>
        <div class="navTab">
             <div class="nav fll">
                <router-link :to="{name:'member'}">成为专家</router-link>
            </div>
            <div class="nav fll">
                <router-link :to="{name:'demanda'}">找专家</router-link>
            </div>
            <div class="nav fll">
                <router-link :to="{name:'recommend'}">推荐专家</router-link>
            </div>
            <div class="nav fll">
                <router-link :to="{name:'other'}">其他需求</router-link>
            </div>
           
             <div class="nav fll">
                <router-link :to="{name:'lookDemand'}">需求列表</router-link>
            </div>
        </div>
        <router-view></router-view>

    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    export default {
        components: {
            Header
        },
        data() {
            return {
                isShow: false,
                active: 0,
                vactiveStep: 0,
                    
            }
        },
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
    // .containerAll {
    //     // background: #f3f5f7
    // }
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
        font-size: .28rem;
        padding: .2rem
    }

    .nav {}

    .navMenu:hover {
        color: #005982;
    } //点击样式随路由变化
    .router-link-active {
        color: #005982 !important;
        border-bottom: 2px solid #005982;
    }

    .container {}

    .subTabs {
        /* padding-top: .8rem; */
        padding: .8rem 0 0 0;
        width: 7.5rem !important;
        min-width: 7.5rem !important
        /* background: #fff; */
    }

    .subTab {
        background: #fff;
        margin-bottom: .3rem
    }

    .itemBox {
        padding-bottom: .1rem;
        border-bottom: .2rem solid #f3f5f7
    }


    .peojectTitle {
        border-left: 3px solid #005982;
        margin: .3rem;
        padding-left: .2rem;
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        line-height: 1.533;

    }

    .cancleBtn {
        margin: .2rem .3rem 0 0;
        padding: 0 .1rem;
        height: .6rem;
    }

    .nowTime {
        display: inline-block;
        padding-left: .6rem;
        color: #005982;
        font-weight: 700;
    }

    .step {
        background: #fff
    } // /deep/.mu-step-label{
    //     padding-left: .2rem;
    //     padding-right: .2rem
    // }
</style>