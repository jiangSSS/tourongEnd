<template>
<div>
    <Header></Header>     
    <div class="all">
        <div class="detail">
          <div class="noData"> 敬请期待~</div>
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
            
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .detail {
        padding-bottom: 1.1rem;
        padding-top: .9rem
    }
   .noData{
       font-size: .4rem;
       color: #005982;
       text-align: center;
       margin-top: 2rem
   }
    
    
</style>