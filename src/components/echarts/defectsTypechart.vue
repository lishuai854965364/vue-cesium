<template>
<div class="container">
  <div style=" width: 230px;height: 234px;" :id="id" :option="option"></div>
  <div class="lable">
	  <ul>
		  <li>
			  <span class="blue-icon icon">
				  <img src="../../assets/imgaes/blue-icon.png" alt="">
			  </span>
			  <a>一般</a>
			  <span>
				  5
				  <a href="">万</a>
				</span>
			  <span>40.18%</span>
		  </li>
		  <li>
			  <span class="icon yellow-icon">
				  <img src="../../assets/imgaes/yellow-icon.png" alt="">
			  </span>

			  <a>严重</a>
			  <span>
				  2
				  <a href="">万</a>
			  </span>
			  <span>20%</span>
		  </li>
		  <li>
			  <span class="icon purple-icon">
				  <img src="../../assets/imgaes/purple-icon.png" alt="">

			  </span>

			  <a>危急</a>
			  <span>
				  3
				  <a href="">万</a>

			  </span>
			  <span>30%</span>
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
    },
      //option 是图表的配置数据
    option: {
      type: Object
    }
  },
  mounted() {
    HighCharts.chart(this.id, this.option)
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
.lable{
	width: 199px;
	height: 89px;
	position: absolute;
	right: 0;
	top: 54px;
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
</style>