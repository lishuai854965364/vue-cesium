<template>
<div class="content-box">
	<div class="title">
		<span class="title-text">线路缺陷类型统计</span>
	</div>
	<div  style=" width: 300px;height: 182px;" id="defectsChart"></div>
</div>
</template>

<script>
export default {
	data () {
		return {

		}
	},
	methods: {
		setDefectsChart(){
		let  myChart = this.$echarts.init(document.getElementById('defectsChart'))
		 myChart.setOption({
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      color:['#93b03c','#19deaa','#001bec','#a32ad0','#11b8e1'],
			series: [
				{
            type: 'pie',
            radius: [20, 110],
            center: ['50%', '50%'],
			roseType: 'radius',
			label: {
                normal: {
                    show: true,
                    formatter: '{b}({d}%)'      // 显示百分比
                }
			},
			labelLine: {    //引导线设置
                 normal:{
					length:1
				}
           },
            data: [
                {value: 10, name: '跨河流'},
                {value: 5, name: '跨公路'},
                {value: 45, name: '跨电力线'},
                {value: 25, name: '跨电路'},
                {value: 35, name: '跨建筑'}
            ]
        }
				]
		 })
	}
	},
	mounted() {
		this.setDefectsChart()
	}
}
</script>

<style lang='less' scoped>
.content-box{
	width: 300px;
	height: 182px;
	// position: relative;
	.title{
		height: 40px;
		line-height: 40px;
		.title-text{
			color: #fff;
			font-size: 16px;
		}
	}
}

</style>