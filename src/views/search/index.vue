<template>
    <div>
        <Header></Header>
        <router-view></router-view>
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
                isShow: false,
                searchList: ["项目", "资金", "资讯"],
                type: '1',
                title: ""
            }
        },
        methods: {
            // handleShowList() { this.isShow = true },
            // handleCloseList() { this.isShow = false },
            // search() {
            //     console.log("111")
            //     if (this.type == '1') {
            //         let { href } = this.$router.resolve({
            //             name: "searchMoney",
            //             query: {
            //                 title: this.title,
            //             }
            //         });
            //         window.open(href, '_blank');
            //     } else if (this.type == '2') {
            //         let { href } = this.$router.resolve({
            //             name: "searchProject",
            //             query: {
            //                 title: this.title,
            //             }
            //         });
            //         window.open(href, '_blank');
            //     }

                // else if (this.type == '3') {
                //     let { href } = this.$router.resolve({
                //         name: "news",
                //         // query: {
                //         //     title: this.title,
                //         // }
                //     });
                //     window.open(href, '_blank');
                // }
            // },
        }
    }
</script>
<style scoped lang="scss">
    .header {}

    .select {
        width: 1.5rem;
    }

    .search {
        margin: .2rem;
        background: #f3f5f7;
    }

    .leftHeader {}

    .icon-sousuo1 {
        line-height: 2;
        margin-right: .2rem
    }

    .input_search {
        border: 0;
        color: rgb( 153, 153, 153);
        width: 4rem;
        border-radius: 4px;
        font-family: "PingFang";
        line-height: 2.103;
        padding: 0 .2rem;
        background: #f3f5f7
    }

    .input_search:focus {
        outline: none;
    }

    .input_search::-webkit-input-placeholder {
        padding-left: .3rem
    }

    .cancel {
        line-height: 3.5;
        margin: 0 .2rem
    }

    .type {
        /* background: #f3f5f7 */
    }

    .radioItem {
        display: block;
        line-height: 2;
        margin: 0 .1rem;
        border: 0;
        background: #f3f5f7
    }

    .sbuTitle {
        /* background: #f3f5f7 */
    }
</style>