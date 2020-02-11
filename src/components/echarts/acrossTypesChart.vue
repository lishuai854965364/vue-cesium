<template>
<div class="container">
  <!-- <div style=" width: 465px;height: 230px;" :id="id" :option="option"></div>
   -->
  <div style=" width: 465px;height: 230px;" id="chart"></div>

  <div class="lable">

  </div>
</div>
</template>
<script>
import HighCharts from 'highcharts'
export default {
  props: {
    id: {
      type: String
    },
      //option 是图表的配置数据
    option: {
      type: Object
    }
  },
  methods: {
	setAcrossTypeChart(){
		let  myChart = this.$echarts.init(document.getElementById('chart'))
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
	// HighCharts.chart(this.id, this.option)
	this.setAcrossTypeChart()
  }
}
</script>

<style scoped>
/* 容器 */
.container {
  position: relative;
	width: 465px;
  height: 236px;
}
</style>