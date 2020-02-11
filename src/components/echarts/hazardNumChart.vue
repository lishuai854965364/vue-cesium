<template>
  <div>
	  <div style=" width: 465px;height: 230px;" :id="id" :option="option"></div>
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

<style>

</style>