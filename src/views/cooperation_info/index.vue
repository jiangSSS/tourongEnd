<template>
	<div>
		 <Header></Header>
		<div class="box">
			 <div class="bread fll" style="padding-top: 2rem;">
			  
			</div>
			<div style="padding-top: 2rem;">
				<!--{{this.$route.params.id}}  -->
				<!-- <img :src=info.logoImgPath alt=""> -->
				<div><h2 style="font-size: 0.38rem;text-align: center;">{{info.organizationName}}</h2></div>
				
				<!-- {{watchnum}} -->
				<h3 class="title3">机构介绍:</h3>
				<hr>
				<p>{{info.organizationInfo}}</p>
				
				<h3 class="title3">服务能力介绍:</h3>
				<hr>
				<p>{{info.serviceAbility}}</p>
			</div>
			
		</div>
		
		
			
			 <Footer class="footer"></Footer>
	</div>
</template>


<script>
	import Header from "@/components/Header.vue";
	import Footer from "@/components/Bottom.vue";
	export default{
		data(){
			return{
				info:'',
				wanum:'',
				watchnum:0,
				timer:null
			}
		},
		methods:{
			/* star(){
				//alert(this.watchnum)
				clearInterval(this.timer)
				this.timer = setInterval(() => {
					this.watchnum++
				},1000)
			} */
		},
		 components: {
		    Header,
		    Footer,
		   
		},
		created(){
			/* this.timer = setInterval(() => {
				this.watchnum++
			},1000) */
			this.wanum=this.$store.state.cooperationnum
			const _this=this;
			//console.log('打印vuex数据',this.$store.state.cooperation.id)
			this.info = this.$route.query.id
			/* history.pushState(null, null, document.URL); 
			window.addEventListener('popstate', function() { 
			history.pushState(null, null, document.URL); 
			}); */
			//console.log('idshi')
			//console.log('idshihelloworld',this.info)
			//console.log('idshi',$route.params.id)
		} ,
		/* computed: {
		
		 //const hello = _this.$store.state.cooperation.id
		  hello:function () {
		    return this.$store.state.cooperationnum
		  }
		}, */
		watch:{
			//hello = this.$store.state.cooperationnum
			 watchnum (){
				//alert(this.$store.state.cooperation)
				this.info = this.$store.state.cooperation
				/* this.info = this.$route.query.id */
			}
		},
		beforeCreate() {
			setInterval(() => {
				this.watchnum =this.watchnum +1
			},10)
		},
		mounted() {
		　　clearInterval(this.timer)
		},
		distroyed: function () {
		　　clearInterval(this.timer)

		}
	}
</script>
<style scoped>
	.title3 {
		padding-left: 0.18rem;
		font-weight: bold;
		border-left: #005982 solid 3px;
		line-height: 0.46rem;
		margin: 0.25rem;
		
	}
	p{
		
		margin: 0.2rem;
	}
</style>
