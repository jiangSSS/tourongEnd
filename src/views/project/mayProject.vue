<template>
    <div class="">
        <Header></Header>
        <div class="detail">
            <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"> -->
                <div class="mayProject" v-for="(item,index) in projectList" :key="index">
                    <router-link :to="{name:'project',query:{id:item.id}}">
                        <div class="mayTitle">
                            {{item.title}}
                        </div>
                        <div class="mayTime">
                            <!-- <span>投资金额：</span> -->
                            <span>{{item.brief}}</span>
                        </div>
                        <div class="mayTime">
                            <span>{{item.addTimeStr.slice(0,10)}}</span>
                        </div>
                    </router-link>
                <!-- </div> -->
            </div>
        </div>

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
                projectList: [],
                id:""
            };
        },


        methods: {
            // 投资详情
            getProjectDetail() {
                this.id = this.$route.query.id
                this.$axios.get(`/jsp/wap/trProject/ctrl/jsonProjectDetail.jsp?id=${this.id}`).then(res => {
                    console.log("aaa", res)
                    this.projectDetail = res.data.project
                    this.memberInfo = res.data.memberInfo
                    this.projectList = res.data.projectList
                })
            },

        },
        created() {
            this.getProjectDetail()
        }
    };
</script>
<style scoped lang="scss">
    .detail {
        margin-top: .9rem;
        padding: 0 .3rem
    }

    .mayProject {
        padding: .15rem 0;
        border-bottom: .05rem solid #f3f5f7
    }

    .mayTitle {
        border-left: 3px solid #005982;
        padding-left: .2rem;
        color: rgb(51, 51, 51);
        line-height: 1.6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .mayTime {
        line-height: 2;
        color: rgb(128, 128, 128);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>