<template>
    <div class="header">
        <mt-header :title="title" class="header-title">
            <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>           
        </mt-header>
    </div>
</template>
<script>
    export default {
        computed:{
            title(){
                return this.$route.meta.title
            }
        }
    }
</script>

<style>
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
</style>