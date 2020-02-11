<template>
<div class="container">
  <!-- <div style=" width: 465px;height: 230px;" :id="id" :option="option"></div> -->
  <div id="defectsChart" style=" width: 465px;height: 230px;"></div>
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
    setdefectsChart(){
      let  myChart = this.$echarts.init(document.getElementById('defectsChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 60,
          right: 10,
          bottom: 30,
          left: 10
        },
        xAxis: {
          type: 'category',
          data: ["1年内", "1-5", "5-10", "10-15", "15-20"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(0,255,255,0.5)"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            color: "#00cce2"
          }
        },
        yAxis: {
          type: 'value',
          show: false,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false
          },
          nameTextStyle: {
            color: "#999"
          },
          splitArea: {
            show: false
          }
        },
        series: [{
          name: '一般',
          type: 'line',
          data: [150, 100, 180, 100, 1000],
          lineStyle: {
            normal: {
              color: "#00cce2",
              shadowBlur: 10
            }
          },
          symbol: "circle",
          symbolSize: 8,
          smooth: true,
          itemStyle: {
            normal : {
              color:'#00cce2'
            },

          },
          label: {
            normal: {
              show: true,
              color: "#fff",
              position: 'top'
            }
          },
          smooth: true
        },
          {
            name: '严重',
            type: 'line',
            data: [123, 568, 111, 222, 123],
            lineStyle: {
              normal: {
                color: '#5f6bfb',
                shadowBlur: 10
              }
            },
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
            itemStyle: {
              normal : {
                color:'#5f6bfb'
              },
            },
            label: {
              normal: {
                show: true,
                color: "#fff",
                position: 'top'
              }
            }
          },
          {
            name: '危急',
            type: 'line',
            data: [125, 568, 25, 36, 784],
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
            lineStyle: {
              normal: {
                color: '#f8b701',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: '#f8b701'
              }
            },
            label: {
              normal: {
                show: true,
                color: "#fff",
                position: 'top'
              }
            }
          },
          {
            name: '严重',
            type: 'line',
            data: [0, 0, 0, 0, 0],
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
            lineStyle: {
              normal: {
                color: '#ed3e48',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: '#ed3e48'
              }
            },
            label: {
              normal: {
                show: true,
                color: "#fff",
                position: 'top'
              }
            }
          }
        ]
      })
    }
  },
  mounted() {
    // HighCharts.chart(this.id, this.option)
    this.setdefectsChart()
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