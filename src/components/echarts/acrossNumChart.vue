<template>
<div class="container">
  <div style=" width: 465px;height: 230px;" id="myChart"></div>

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
	  drawLine(){
		  let  myChart = this.$echarts.init(document.getElementById('myChart'))
		 	// 绘制图表
        myChart.setOption({
             tooltip: {
				show: true,
				trigger: 'item'
			},
            grid: {
				left: 6,
				top: 30,
				bottom: 26,
				right: 6
			},
			xAxis: {
				data: ['2014.02', '2015.03', '2016.04', '2017.05', '2018', '2019'],
				offset: 6,
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: true,
					interval: 0,
					textStyle: {
						color: '#00cce2',
						fontSize: 12
					}
				}
			},
			 yAxis: {
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false
				}
			},
			series: [{
				type: 'pictorialBar',
				symbolSize: [20, 8],
				symbolOffset: [0, -3],
				z: 12,
				itemStyle: {
					normal: {
						color: 'rgba(255,215,0,0.9)'
					}
				},
				data: [{
					value: 258,
					symbolPosition: 'end'
				},
				{
					value: 200,
					symbolPosition: 'end'
				},
				{
					value: 113,
					symbolPosition: 'end'
				},
				{
					value: 130,
					symbolPosition: 'end'
				},
				{
					value: 120,
					symbolPosition: 'end'
				},
				{
					value: 140,
					symbolPosition: 'end'
				},
				{
					value: 125,
					symbolPosition: 'end'
				}
				]
			},
			{
				type: 'pictorialBar',
				symbolSize: [20, 8],
				symbolOffset: [0, 3],
				z: 12,
				itemStyle: {
					normal: {
						color: 'rgba(255,215,0,0.9)'
					}
				},
				data: [258, 200, 113, 130, 120, 140, 125],
				barMinHeight: [2]
			},
			{
				type: 'pictorialBar',
				symbolSize: [35, 10],
				symbolOffset: [0, 5],
				z: 11,
				itemStyle: {
					normal: {
						color: 'transparent',
						borderColor: 'rgba(255,215,0,0.9)',
						borderWidth: 2
					}
				},
				data: [258, 200, 113, 130, 120, 140, 125],
				barMinHeight: [2]
			},
			{
				type: 'pictorialBar',
				symbolSize: [45, 15],
				symbolOffset: [0, 8],
				z: 10,
				itemStyle: {
					normal: {
						color: 'transparent',
						borderColor: 'rgba(255,215,0,0.6)',
						borderType: 'dashed',
						borderWidth: 2
					}
				},
				data: [258, 200, 113, 130, 120, 140, 125],
				barMinHeight: [2]
			},
			{
				type: 'bar',
				itemStyle: {
					normal: {
						color: 'rgba(255,215,0,0.6)'
					}
				},
				silent: true,
				barWidth: 20,
				data: [258, 200, 113, 130, 120, 140, 125],
				barMinHeight: [2],
				label: {
					normal: {
						show: true,
						color: '#fff',
						position: 'top'
					}
				}
			}
			]
        });
	  }
  },
  mounted() {
	// HighCharts.chart(this.id, this.option)
	this.drawLine()
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