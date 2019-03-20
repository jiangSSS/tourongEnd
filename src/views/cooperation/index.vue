<template>
	<div>
		 <Header></Header>
		 <div style="padding-top: 1rem;">
			 <span v-for="(item , index) in cooperationinfo.pageList" :key="index">
						<img :src='$url+item.logoImgPath' alt="" style="margin: 1vw;padding: 0; width: 23vw;height: 11vw;" @click="info(item)">
						
			</span>
		 </div>
			
			 <Footer class="footer"></Footer>
	</div>
</template>

<script>
	import Header from "@/components/Header.vue";
	import Footer from "@/components/Bottom.vue";
	export default{
		
		 components: {
		    Header,
		    Footer,
		   
		},
		data(){
			return{
				cooperationinfo:{}

			}
				
		},
		methods:{
			info(idd){
				//console.log(idd)
				this.$store.commit('cooperationchange',(this.$store.state.cooperation=idd));
				console.log('我是Vuex数据请指示',this.$store.state.cooperation)
				//this.$store.commit('cooperationchangemun',(this.$store.state.cooperationmun++));
				//console.log('我是Vuex数据请指示',this.$store.state.cooperationmun)
				/* this.store.commit;('cooperationchange', {
				  cooperation: idd
				}) */
				
				console.log('dianjihou   kanshuju',this.cooperationinfo)
				this.$router.push({
				  path: '/cooperation_info',
				  query: {
					id: idd
				  }
				})
				
			}
		},
		created(){
			this.$axios
			  .get(`/jsp/wap/index/ctrl/jsonOrganizationPage.jsp`)
			  .then(res => {
			   this.cooperationinfo = res.data
			   //console.log('huoqusuoyoulogo',res.data)
			  });
		}/* ,
		 computed: {
		
		 //const hello = _this.$store.state.cooperation.id
		  hello:function () {
		    return this.$store.state.cooperationnum
		  }
		} */
	}
</script>

<style>
</style>
