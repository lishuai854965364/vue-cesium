
<template>
  <div class="content-box">
	  <div class="content-title">
		  <span class="neme">地物名称</span>
		  <span class="describe">描述</span>
	  </div>
	  <div class="content-list">
		  <ul>
			<li v-for="(name,index) in names" :key="name" class="list-item" :class="{on:index%2==0,off:index%2!=0}">
				<span class="neme">地物名称</span>
		  		<span class="describe">描述</span>

			</li>
		</ul>
	  </div>
  </div>
</template>

<script>
export default {
	data(){
		return{
			names: ['000', '111', '222', '333', '444', '555']
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/faultLocation.less";
// .content-box{
// 	width: 286px;
// 	.content-title {
// 		height: 34px;
// 		line-height: 34px;
// 	margin-top: 10px;

// 		span{
// 			display: inline-block;
// 			width: 49%;
// 			color: #7fa1ca;
// 			font-size: 14px;
// 			text-align: center;
// 		}
// 	}
// }
</style>