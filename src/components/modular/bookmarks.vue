<template>
  <div class="content-box">
	  <div class="content-title">
		  <span class="neme">书签名称</span>
		  <span class="describe">描述</span>
	  </div>
    <div class="content-list">
		  <ul>
			<li v-for="(name,index) in names" :key="name" class="list-item" :class="{on:index%2==0,off:index%2!=0}">
				<span class="neme">地物名称</span>
		  		<span class="describe">描述1</span>

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

</style>