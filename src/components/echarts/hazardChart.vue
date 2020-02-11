<template>
<div class="content-box">
	<div class="title">
		<span class="title-text">线路隐患统计</span>
	</div>
	<div style=" width: 300px;height: 182px;" :id="id"></div>
	<div class="lable">
	  <ul>
		  <li>
			  <span class="blue-icon icon">
				  <img src="../../assets/imgaes/blue-icon.png" alt="">
			  </span>
			  <a>地面</a>
			  <span>
				  521
				</span>
		  </li>
		  <li>
			  <span class="icon yellow-icon">
				  <img src="../../assets/imgaes/yellow-icon.png" alt="">
			  </span>

			  <a>树木</a>
			  <span>
				  2
			  </span>
		  </li>
		  <li>
			  <span class="icon purple-icon">
				  <img src="../../assets/imgaes/purple-icon.png" alt="">

			  </span>

			  <a>公路</a>
			  <span>
				  3
			  </span>
		  </li>
	  </ul>
  </div>
</div>
</template>

<script>
import HighCharts from 'highcharts'

export default {
	props: {
		id: {
		type: String
		}
	},
	data(){
		return{
			hazardTypeOption: {
				chart: {
				type: "pie", //饼图
				backgroundColor: "none",
				options3d: {
					enabled: true,
					alpha: 50
				},
				// margin: [0, 10, 20, 0] //距离上下左右的距离值
				marginRight: 150
				},
				legend: {
				　　align: 'right', //水平方向位置
				　　verticalAlign: 'top', //垂直方向位置
				　　x: 0, //距离x轴的距离
				　　y: 0 //距离Y轴的距离
				},
				title: "",

				credits: {
				enabled: false
				},
				colors: ["#116dc3", "#b2aa2d", "#af1b9f"],
				plotOptions: {
				pie: {
					innerSize: 60,
					depth: 35,
					dataLabels: {
					enabled: false
					}
				}
				},
				series: [
				{
					type: "pie",
					data: [
					["测试1", 12], //模块名和所占比，也可以{name: '测试1',y: 12}
					["测试2", 23],
					["测试3", 19]
					]
				}
				]
			},
		}
	},
	mounted () {
    HighCharts.chart(this.id, this.hazardTypeOption)

	},
}
</script>

<style lang='less' scoped>
.content-box{
	position: relative;
	.title{
		height: 40px;
		line-height: 40px;
		.title-text{
			color: #fff;
			font-size: 16px;
		}
	}
	.lable{
	width: 90px;
	height: 89px;
	position: absolute;
	right: 0;
	top: 78px;
	z-index: 999;
  }
  ul li{
	  margin-top: 10px;
	  position: relative;
  }
ul li a{
	position: relative;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 24px;
	letter-spacing: 0px;
	color: #26e1ff;
	display: inline-block;
	margin-right: 20px;
}

ul li span{
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 11px;
	letter-spacing: 0px;
	color: #ffffff;
}
.icon{
	display: inline-block;
	width: 20px;
	height: 20px;
	position: absolute;
	left: -27px;
    top: 1px;
}
.icon img{
	position: absolute;
	left: 4px;
    top: 4px;
}
.blue-icon{
	background: url('../../assets/imgaes/blue-icon-border.png');
}
.yellow-icon{
	background: url('../../assets/imgaes/yellow-icon-border.png');

}
.purple-icon{
	background: url('../../assets/imgaes/purple-icon-border.png');
}
}
</style>