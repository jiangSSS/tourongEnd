<template>
    <div>
        <Header></Header>
        <div class="all">
            <div class="detail">
                <div class="peojectTitle">
                    北京某互联网创新创业服务平台项目
                </div>
                <div class="sendNum">共收到{{sendTime}}次投递项目</div>
                <div class="sendList" v-for="(item,index) in sendList" :key="index">
                    <div class="sendItem">
                        <div class="clearfix title">
                            <img src="../../../static/app/img/my/dian.jpg" class="dian fll">
                            <div class="sendTitle fll">{{item.title}}</div>
                        </div>
                        <div class="sendTime">{{item.time}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <Footer class="footer"></Footer> -->
    </div>

</template>

<script>
    import Header from "@/components/Header.vue"
    import Footer from "@/components/Bottom.vue"
    export default {
        components: {
            Footer,
            Header
        },
        data() {
            return {
                sendTime: "155",
                sendList: [
                    {
                        title: "北京某企资金1000万-9亿元寻求全国优质",
                        time: "2018-01-01 12:11:10",

                    },
                    {
                        title: "北京某企资金1000万-9亿元寻求全国优质",
                        time: "2018-01-01 12:11:10",
                    },
                    {
                        title: "北京某企资金1000万-9亿元寻求全国优质",
                        time: "2018-01-01 12:11:10",
                    },
                    {
                        title: "北京某企资金1000万-9亿元寻求全国优质",
                        time: "2018-01-01 12:11:10",
                    },
                    {
                        title: "北京某企资金1000万-9亿元寻求全国优质",
                        time: "2018-01-01 12:11:10",
                    },
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .detail {
        padding-bottom: .8rem
    }

    .all {
        padding-top: .8rem
    }

    .sendItem {
        border-bottom: .2rem solid #f3f5f7;
        padding: .15rem 0;

    }

    .sendTitle {
        font-size: .3rem;
        color: rgb( 51, 51, 51);
        font-weight: bold;
        font-family: "PingFang";
        line-height: 3;
    }

    .sendTime {
        font-family: "PingFang";
        color: rgb( 153, 153, 153);
        margin-left: .5rem
    }

    .dian {
        width: .15rem;
        margin: .38rem .15rem;
        display: inline-block;

    }

    .peojectTitle {
        border-left: 3px solid #005982;
        margin: .2rem;
        padding-left: .1rem;
        font-size: .3rem;
        font-family: "PingFang";
        color: rgb( 51, 51, 51);
        line-height: 1.533;

    }

    .sendNum {
        margin-left: .2rem;
        color: rgb( 153, 153, 153);
    }
</style>