<template>
    <div class="">
        <a class="totop" id="totop" @click="goTop" v-show="isShowToTop">
            <img src="../../static/app/img/backTop.png" class="top" alt="">
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowToTop: false
                // isTop: true,
                // timer: null
            };
        },
        mounted() {
            this.$docElement = document.documentElement;
            this.$body = document.body;
            this.pageToTop();
            // window.addEventListener('scroll', this.debounce(this.pageToTop));          
            window.addEventListener('scroll', this.pageToTop);          
        },
    //     mounted: function () {
    //   this.$docElement = document.getElementById('main-box')
    //   this.$body = document.getElementById('index-box');
    //   this.pageToTop();
    //   document.getElementById('main-box').addEventListener('scroll', this.debounce(this.pageToTop));
    // },
        // destroyed() {
        //     window.removeEventListener("scroll", this.scrollToTop);
        // },
        methods: {
            goTop() {
                // this.timer = setInterval(() => {
                    let scrollTop = this.$body.scrollTop + this.$docElement.scrollTop;
                    let speed = Math.floor(scrollTop / 6);
                    this.$body.scrollTop = this.$docElement.scrollTop = this.scrollTop - (speed < 1 ? 1 : speed);
                // }, 30);
            },
            pageToTop() {
                let scrollTop = this.$body.scrollTop + this.$docElement.scrollTop;
                if (scrollTop > 200) {
                    this.isShowToTop = true;
                } else {
                    this.isShowToTop = false;
                }
                // if (scrollTop === 0) {
                //     clearInterval(this.timer);
                // }
            },
            // debounce(fn, delay, timeout) {
            //     var timer = null;
            //     var last = new Date().getTime();
            //     delay = delay || 300;
            //     timeout = timeout || 300;
            //     return () => {
            //         if (timer) {
            //             clearTimeout(timer);
            //         }
            //         timer = setTimeout(fn, delay);
            //         if (new Date().getTime() > last + timeout) {
            //             fn.apply(this, [].slice.call(Array, arguments));
            //             last = new Date().getTime();
            //             clearTimeout(timer);
            //         }
            //     };
            // }
        }
    };
</script>
<style scoped lang="scss">
    .totop {
        position: fixed;
        right: .8rem;
        bottom: 1.5rem;
        cursor: pointer;
    }
    .top{
        width: .7rem;
        height: .7rem;
    }
</style>