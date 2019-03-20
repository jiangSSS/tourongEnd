<template>

    <div class="tabs">
        <router-link to="/home" class="tab-item" :class="{active:$route.name === 'home'}">
            <i class="iconfont icon-shouye"></i>
            <div class="tab-title">首页</div>
        </router-link>
        <div @click="toProject" class="tab-item" :class="{active:$route.name === 'project'}">
            <i class="iconfont icon-icon-project"></i>
            <div class="tab-title">项目库</div>
        </div>
        <div @click="toMessage" class="tab-item" :class="{active:$route.name === 'sysMessage'}">
            <i class="iconfont icon-xiaoxi"></i>
            <div class="tab-title">消息</div>
             <span class="newNum" v-if="this.num != '0'">{{num}}</span>
        </div>
        <div @click="toMoney" class="tab-item" :class="{active:$route.name === 'money'}">
            <i class="iconfont icon-zuanshi"></i>
            <div class="tab-title">资金库</div>
        </div>
        <div @click="toPerson" class="tab-item" :class="{active:$route.name === 'my'}">
            <i class="iconfont icon-My"></i>
            <div class="tab-title">我的</div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"
    import * as Cookies from 'js-cookie'

    export default {
        components: {
            Header
        },
        data() {
            return {
                num:"",
            }
        },
        methods: {
            toProject(){
                this.$router.push('/project')
                // this.getProjectList()
            },
             toMoney(){
                this.$router.push('/money')
                // this.getProjectList()
            },
            toPerson() {
                if (Cookies.get('userKey')) {
                    this.$router.push('/my')
                } else {
                    this.$router.push('/login')
                }
            },
            toMessage() {
                if (Cookies.get('userKey')) {
                    this.$router.push('/message')
                } else {
                    this.$router.push('/login')
                }
            },
            getMessageCount() {
                this.$axios.get(`/jsp/wap/center/ctrl/jsonSysMsgNum.jsp`).then(res => {
                    console.log("未读数量", res)
					if(res.data>99){
						 this.num = '99+'
					}else{
						 this.num = res.data
					}

                })
            },
        },
        created(){
            this.getMessageCount()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .tabs {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background-size: 100%;
        display: flex;
        background: #fff;
        padding: .1rem 0;
        a {
            text-decoration: none;
            color: #666
        }

        .active {
            color: #005982
        }
    }
     .tab-item {
            width: 2.5rem;
            flex: 1;
            text-align: center;
            position: relative;
            .iconfont {
                font-size: .4rem;
            }
            ;
            .tab-title {
                font-size: .26rem;
                margin-top: .1rem
            }
        }
        .newNum{
            position: absolute;
            background: #e75225;
            top: -.08rem;
            right: 0.2rem;
            color: #fff;
            font-size: .16rem;
            min-width: .3rem;
			line-height: 0.36rem;
            border-radius: 100%;
			display: inline-block;
			padding: 0.03rem;
        }
</style>
