<template>
    <div>
        <div class="header clearfix">
            <div class="search fll">
                <div class="fll select">
                    <!-- <div class="leftHeader">
                        <select class="radioItem" v-model="type" placeholder="请选择">
                            <option value="1">找资金</option>
                            <option value="2">找项目</option>
                            <option value="3">找资讯</option>
                            <option value="4">找活动</option>
                        </select>
                    </div> -->
                    <div>
                        <input id="ipt" class="iptSelect" v-model="num[type-1]" value="" placeholder="请选择" type="text"/><i class="iconfont icon-xiangxia"></i>
                        <ul id="ul">
                            <li>找资金</li>
                            <li>找项目</li>
                            <li>找资讯</li>
                            <li>找活动</li>
                        </ul>
                    </div>
                </div>
                <input type="text" placeholder="请输入内容" v-model="title" class="input_search" />
                <i class="iconfont icon-sousuo1" @click="search"></i>
            </div>
            <div class="fll cancel" @click="$router.push('/')">取消</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                type: "1",
                title: "",
                num:['找资金','找项目','找资讯','找活动']
            }
        },
        mounted() {
            var ipt = document.getElementById('ipt');
            var ul = document.getElementById('ul');
            var lis = ul.children;
            ul.style.display = 'none';
            ipt.onfocus =  ()=> {
                ul.style.display = 'block';
            }
            ipt.onblur =  ()=> {
                setTimeout( ()=> {
                    ul.style.display = 'none';
                }, 100)
            }
            var that = this
            for (let i = 0; i < lis.length; i++) {
                lis[i].onclick = function () {
                    that.type = i + 1
                    lis[i].value = this.innerText;
                    console.log(that.type)
                }        
            }
        },
        methods: {
            search() {
                console.log("四大搜索")
                if (this.type == '1') {
                    this.$router.push({ name: "searchMoney", query: { title: this.title } })
                } else if (this.type == '2') {
                    this.$router.push({ name: "searchProject", query: { title: this.title } })
                } else if (this.type == '3') {
                    this.$router.push({ name: "searchNews", query: { title: this.title } })
                } else if (this.type == '4') {
                    this.$router.push({ name: "searchActivity", query: { title: this.title } })
                }
            },
        }
    }
</script>
<style scoped lang="scss">
    .select {
        width: 1.5rem;
        margin-right: .2rem
    }

    .iptSelect {
        width: 1rem;
        background: #f3f5f7;
        line-height: .62rem
    }
    #ul li{
        width: 1rem;
        border-bottom: 1px solid #fff;
    }

    .search {
        margin: 0.2rem;
        background: #f3f5f7;
    }

    .icon-sousuo1 {
        line-height: 2;
        margin-right: 0.2rem;
    }

    .input_search {
        font-family: "PingFang";
        width: 3.4rem;
        margin-left: .3rem;
        line-height: 2.103;
        background: #f3f5f7;
        color: #333;
        border-radius: 4px;
        border: 0;
    }

    .input_search:focus {
        outline: none;
    }

    .input_search::-webkit-input-placeholder {
        padding-left: 0.3rem;
    }

    .cancel {
        line-height: 3.5;
        margin: 0 0.2rem;
    }
    .radioItem {
        display: block;
        margin: 0 .1rem;
        border: 0;
        background: #f3f5f7;
        margin-top: 0.1rem;
    }

    .radioItem:focus {
        border: 0;
    }
</style>