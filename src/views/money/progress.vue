<template>

    <div class="all">
        <Header></Header>
        <div class="containerAll">
            <div class="detail">
                <div class="projectHeader">
                    <div class="projectTitle">北京某互联网创新创业服务平台项目股创业项目</div>
                    <div class="clearfix">
                        <div class="fll time">
                            <i class="iconfont icon-shijian"></i>
                            <span>2018-01-01</span>
                        </div>
                        <div class="sendBtn flr likeBtn" @click="$router.push('/home')">
                            关注
                        </div>
                        <div class="sendBtn flr" @click="$router.push('/home')">
                            我要约谈
                        </div>
                    </div>

                </div>
                <div class="progress">
                    <van-steps direction="vertical" :active="1" active-color="#005982" icon="icon-shijian">
                        <van-step v-for="(item,index) in progress" :key="index">
                            <h3>{{item.title}}</h3>
                            <p>{{item.time}}</p>
                        </van-step>
                        <!-- <van-step>
                            <h3>感谢大家关注本项目</h3>
                            <p>2016-07-11 10:00</p>
                        </van-step>
                        <van-step>
                            <h3>感谢大家关注本项目</h3>
                            <p>2016-07-10 09:30</p>
                        </van-step> -->
                    </van-steps>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header.vue"

    export default {
        components: {
            Header,
        },
        data() {
            return {
                progress:[
                    {
                        title:"感谢大家关注本项目",
                        time:"2049-01-11 12:40"
                    },
                    {
                        title:"感谢大家关注本项目",
                        time:"2017-01-01 12:40"
                    },
                    {
                        title:"感谢大家关注本项目",
                        time:"2018-01-01 12:40"
                    },
                ]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .containerAll {
        background: #f3f5f7; // margin-bottom: 1rem
    }

    img {
        width: 100%
    }

    .detail {
        background: #f3f5f7;
    }

    .projectTitle {
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        font-weight: bold;
        line-height: 1.6;
        padding: .3rem 0;
    }

    .sendBtn {
        border: 1px solid #005982;
        border-radius: 2px;
        display: inline-block;
        color: #005982;
        padding: .1rem .2rem;
        line-height: 1.25;
        font-family: "PingFang";
        font-size: .23rem;
        font-weight: bold;
        opacity: .7;
        margin-right: .3rem
    }

    .likeBtn {
        // color: #ccc;
        // border: 1px solid #ccc;
    }

    .time {

        font-size: .3rem;
        font-family: "PingFang";
        color: rgb(137, 137, 137);
        line-height: 2;

    }

    .projectHeader {
        background: #fff;
        padding: .8rem .2rem .1rem;
        margin-bottom: .3rem
    }

    .user {
        line-height: 3;
        padding: .2rem;
        background: #fff;
        margin-bottom: .3rem
    }

    .titleDesc {
        font-size: .3rem;
        color: rgb( 51, 51, 51);
    }

    .customer {
        color: rgb( 0, 89, 130);
    }

    .contentTell {
        background: #fff;
        padding: .2rem;
        margin-bottom: .3rem;
        .detaila {
            background: #fff;
            padding: .2rem 0;
            border-bottom: 1px solid #f3f5f7;
            .peojectTitle {
                border-left: 3px solid #005982; // margin: 0 .3rem;
                padding-left: .2rem;
                font-size: .3rem;
                font-family: "PingFang";
                color: rgb( 51, 51, 51);
                line-height: 1.533;


            }
        }
        .contentDesc {
            color: rgb(128, 128, 128);
            padding: .1rem 0;
            line-height: 1.5;
        }
    }

    .coreDetail {
        color: rgb(128, 128, 128);
    }

    .coreName {
        font-weight: 700;
        padding: .2rem 0 0;
    }

    .mayProject {
        padding: .1rem 0;

    }

    .mayTitle {
        color: rgb(128, 128, 128);
    }

    .mayTime {
        line-height: 2;
        color: rgb(128, 128, 128);
    }

    .message {
        background: #fff;
        padding: .2rem;
        margin-bottom: .3rem
    }

    .message div {
        line-height: 2
    }

    .message div span:nth-child(1) {
        font-family: "PingFang";
        color: rgb(137, 137, 137);
        display: inline-block;
        margin-right: .1rem
    }
    .progress h3{
        display: inline;
    }
</style>