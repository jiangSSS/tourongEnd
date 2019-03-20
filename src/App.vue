<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	// function login(url) {
	//   var osType = getDevice();
	//   if (osType.isIos) {
	//     window.webkit.messageHandlers.login.postMessage({ url: url });
	//   } else if (osType.isAndroid) {
	//     app.login({ url: url });
	//   } else {
	//     mui.toast("您使用的是PC无法使用!");
	//   }
	// }

	// //获取手机机型
	// function getDevice() {
	//   var u = navigator.userAgent;
	//   var os = { isIos: false, isAndroid: false, name: 'unknown', type: 0 };
	//   if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {//android终端
	//     os.isAndroid = true;
	//     os.name = 'android';
	//     os.type = 2;
	//   } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {//ios终端
	//     os.isIos = true;
	//     os.name = 'ios';
	//     os.type = 1;
	//   }
	//   return os;
	// }
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) return i;
		}
		return -1;
	};
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	export default {
		name: 'App',

	}
</script>

<style>
	* {
		font-size: .3rem
	}

	.icon-xiangyou,
	.icon-dizhi,
	.icon-gongzuohuibao,
	.icon-sousuo1 {
		font-size: .3rem
	}

	.icon-shijian:before {
		font-size: .28rem
	}

	.noData {
		color: #ccc;
		text-align: center;
		padding: .1rem 0;
	}

	.mintui-back:before {
		font-size: .3rem !important
	}
</style>
