<template>
  <div class="home">
    <el-row class="wrap">

      <el-col
        :span="6"
        class="left-wrap"
      >
        <div class="left-top">
          <div class="line-num item">
            <div class="text-num">
              <span class="num">100</span>
              <span class="unit">条</span>
            </div>
            <div class="totality">
              <span class="totality-text">线路总数</span>
            </div>
            <div class="bg-img">
              <img
                src="../assets/imgaes/num-bg.png"
                alt=""
              >
            </div>
          </div>
          <div class="tower-num item">
            <div class="text-num">
              <span class="num">45</span>
              <span class="unit">万</span>
            </div>

            <div class="totality">
              <span class="totality-text">线路总数</span>
            </div>
            <div class="bg-img">
              <img
                src="../assets/imgaes/num-bg.png"
                alt=""
              >
            </div>
          </div>
          <div class="line-mileage item">
            <div class="text-num">
              <span class="num">900</span>
              <span class="unit">公里</span>
            </div>

            <div class="totality">
              <span class="totality-text">线路总数</span>
            </div>
            <div class="bg-img">
              <img
                src="../assets/imgaes/num-bg.png"
                alt=""
              >
            </div>
          </div>
          <div class="hiddenTrouble-num item">
            <div class="text-num">
              <span class="num">11</span>
              <span class="unit">万</span>
            </div>

            <div class="totality">
              <span class="totality-text">线路总数</span>
            </div>
            <div class="bg-img">
              <img
                src="../assets/imgaes/num-bg.png"
                alt=""
              >
            </div>
          </div>
          <div class="defects-num item">
            <div class="text-num">
              <span class="num">79</span>
              <span class="unit">万</span>
            </div>

            <div class="totality">
              <span class="totality-text">线路总数</span>
            </div>
            <div class="bg-img">
              <img
                src="../assets/imgaes/num-bg.png"
                alt=""
              >
            </div>
          </div>
          <div
            class="payAcross-num item"
            style="margin-right:10px;"
          >
            <div class="text-num">
              <span class="num">15</span>
              <span class="unit">万</span>
            </div>

            <div class="totality">
              <span class="totality-text">线路总数</span>
            </div>
            <div class="bg-img">
              <img
                src="../assets/imgaes/num-bg.png"
                alt=""
              >
            </div>
          </div>
        </div>
        <div class="left-chart">
          <div class="chart-top">
            <!-- 隐患类型占比图表 -->
            <div class="hiddenTrouble-type left-bg">
              <span class="title">隐患类型占比</span>
              <hazardTypeChartCommon
                :id="hazardTypeId"
                :option="hazardTypeOption"
              ></hazardTypeChartCommon>
            </div>
            <!-- 隐患总数图表 -->
            <div class="hiddenTrouble-num right-bg">
              <span class="title">近五次隐患总数及等级变化</span>
              <hazardNumChartCommon
                :id="hazardNumId"
                :option="hazardNumOption"
              ></hazardNumChartCommon>
            </div>
            <!-- <span class="icon"></span> -->
            <div class="icon">
              <img
                src="../assets/imgaes/point.png"
                alt=""
              >
            </div>
          </div>
          <div class="chart-center">
            <!-- 缺陷类型图表 -->
            <div class="defects-type left-bg title-icon">
              <span class="title">全网缺陷类型占比</span>
              <defectsTypeChartCommon
                :id="defectsTypeId"
                :option="defectsTypeOption"
              ></defectsTypeChartCommon>
            </div>
            <!-- 缺陷总数图表 -->
            <div class="defects-num right-bg title-icon">
              <span class="title">近五次缺陷总数及等级变化</span>
              <defectsNumChartCommon
                :id="defectsNumId"
                :option="defectsNumOption"
              ></defectsNumChartCommon>
            </div>
            <div class="icon">
              <img
                src="../assets/imgaes/point.png"
                alt=""
              >
            </div>

          </div>
          <div class="chart-bottom">
            <!-- 交跨类型图表 -->
            <div class="payAcross-type left-bg title-icon">
              <span class="title">交跨类型占比</span>
              <acrossTypesChartCommon></acrossTypesChartCommon>
            </div>
            <!-- 交跨总数 -->
            <div class="payAcross-num right-bg title-icon">
              <span class="title">近五次交跨总数及等级变化</span>
              <acrossNumChartCommon

              ></acrossNumChartCommon>
            </div>
            <div class="icon">
              <img
                src="../assets/imgaes/point.png"
                alt=""
              >
            </div>

          </div>
        </div>
      </el-col>
      <!-- 三维球显示 -->

      <el-col
        :span="12"
        class="center-wrap"
      >
        <earthcontainer
          class="container"
          style="width:100%;height:100%"
        ></earthcontainer>
        <earthmanager class="manager"></earthmanager>

      </el-col>
      <!-- 右侧展示盒子 -->
      <el-col
        :span="6"
        class="right-wrap"
      >
        <div
          class="management-box"
          v-if="isShowLineDetails"
        >
          <div class="management-top">
            <!-- 设备管理 -->
            <div class="equipment ">
              <span class="title">设备管理</span>
              <equipmentCommon @setState='getState'></equipmentCommon>
            </div>
            <!-- 三跨管理 -->
            <!-- <div class="threeSpans management">
                <span class="title">三跨管理</span>

          </div> -->
            <!-- 图层管理 -->
            <div class="coverage">
              <span class="title">图层管理</span>
              <coverageCommon></coverageCommon>
            </div>

          </div>
          <div class="management-bottom">
            <!-- 故障测距定位 -->
            <div class="fault management">
              <span class="title">故障测距定位</span>
              <faultLocationCommon></faultLocationCommon>
            </div>
            <!-- 地物管理 -->
            <div class="features management">
              <span class="title">地物管理</span>
              <faultLocationCommon></faultLocationCommon>

            </div>
            <!-- 书签管理 -->
            <div class="bookmarks management">
              <span class="title">书签管理</span>
              <bookmarks></bookmarks>

            </div>
          </div>
          <div class="left-icon">
            <img
              src="../assets/imgaes/left-icon.png"
              alt=""
            >
          </div>
          <div class="right-icon">
            <img
              src="../assets/imgaes/management-point.png"
              alt=""
            >
          </div>
        </div>
        <lineStatistics v-if="!isShowLineDetails" @setState='getState' :text = 'text'></lineStatistics>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import earthcontainer from "./pages/EarthContainer.vue";
import earthresource from "./pages/EarthResource.vue";
import coverageCommon from "./modular/coverage";
import bookmarks from "./modular/bookmarks";
import equipmentCommon from "./modular/equipment";
import faultLocationCommon from "./modular/fault-location";
import earthmanager from "./pages/EarthManager";
// 线路详情
import lineStatistics from "./modular/lineStatistics";
// 杆塔详情
import towerDetailsCommon from './modular/towerDetails'
// 引入图表
import hazardTypeChartCommon from "./echarts/hazardTypeChart";
import hazardNumChartCommon from "./echarts/hazardNumChart";
import defectsNumChartCommon from "./echarts/defectsNumChart";
import acrossTypesChartCommon from "./echarts/acrossTypesChart";
import acrossNumChartCommon from './echarts/acrossNumChart';
import defectsTypeChartCommon from './echarts/defectsTypechart'

export default {
  components: {
    earthcontainer,
    earthresource,
    coverageCommon,
    bookmarks,
    equipmentCommon,
    faultLocationCommon,
    earthmanager,
    hazardTypeChartCommon,
    hazardNumChartCommon,
    defectsNumChartCommon,
    acrossTypesChartCommon,
    acrossNumChartCommon,
    defectsTypeChartCommon,
    lineStatistics,
    towerDetailsCommon
  },

  data() {
    return {
      showAside: false,
      isShowLineDetails:true,
      isShowTowerDetails: false,
      text:'',
      hazardTypeId: "hazard-type",
      hazardNumId: "hazard-num",
      defectsNumId: "defects-num",
      defectsTypeId:'defects-type',
      // 隐患类型占比option
      hazardTypeOption: {
        chart: {
          type: "pie", //饼图
          backgroundColor: "none",
          options3d: {
            enabled: true,
            alpha: 45
          },
          margin: [0, 10, 20, 10] //距离上下左右的距离值
        },
        title: "",

        credits: {
          enabled: false
        },
        colors: ["#116dc3", "#b2aa2d", "#af1b9f"],
        plotOptions: {
          pie: {
            innerSize: 80,
            depth: 40,
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
      // 近五次隐患总数及等级变化option
      hazardNumOption: {
        chart: {
          zoomType: "xy",
          // type: 'column',
          backgroundColor: "none",
          options3d: {
            enabled: true, //显示图表是否设置为3D， 我们将其设置为 true
            // alpha: 15,         //图表视图旋转角度
            // beta: 15,          //图表视图旋转角度
            depth: 50, //图表的合计深度，默认为100
            viewDistance: 25 //定义图表的浏览长度
          },
          margin: [40, 20, 20, 60] //距离上下左右的距离值
        },
        title: "",
        colors: ["#64BCEC", "#4FD3B9", "#FFACA8"],
        credits: {
          enabled: false
        },
        plotOptions: {
          column: {
            // depth:10,
            // pointWidth:25,
            // pointPadding:0.3,
            dataLabels: {
              enabled: true, //控制文本信息显示
              color: "#fff"
            }
          }
        },
        xAxis: {
          gridLineWidth: 0,

          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          labels: {
            skew3d: true,
            step: 0,
            style: {
              fontSize: 12,
              color: "#00cce2"
            }
          },
          gridLineColor: "none",
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          title: {
            text: null
          },
          tickPositions: [0, 20, 50, 100],
          gridLineWidth: 0,
          gridLineColor: "none",
          labels: {
            skew3d: true,
            step: 0,
            style: {
              fontSize: 12,
              color: "#00cce2"
            }
          }
        },

        series: [
          {
            type: "column",
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
            showInLegend: false,
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
              stops: [
                [0, "rgba(13, 76, 205, 0.6)"],
                [1, "rgba(31, 252, 255, 0.6)"]
              ]
            }
          }
        ]
      },
      //近五次缺陷总数及等级变化option
      defectsNumOption: {
        chart: {
          type: "line",
          backgroundColor: "none",
          // options3d: {
          //     enabled: true,
          //     alpha: 45
          // },
          margin: [40, 20, 40, 60] //距离上下左右的距离值
        },
        colors: ["#64BCEC", "#4FD3B9", "#FFACA8"],

        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        colors: ["#64BCEC", "#4FD3B9", "#FFACA8"],

        credits: {
          enabled: false
        },
        legend: {
          // enabled:(need_zoom=='none')?false:true,
          floating: true,
          layout: "horizontal", //标示水平排列
          align: "right", //排列在右边
          verticalAlign: "top", //上下居中
          borderWidth: 0, //边框线
          itemStyle: {
            //字体设置
            font: "9pt Trebuchet MS, Verdana, sans-serif",
            color: "#fff"
          }
        },
        xAxis: {
          gridLineWidth: 0,
          categories: ["一月", "二月", "三月", "四月", "五月"],
          crosshair: false,
          labels: {
            skew3d: true,
            step: 0,
            style: {
              fontSize: 12,
              color: "#00cce2"
            }
          },
          gridLineColor: "none",
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          title: {
            text: null
          },
          tickPositions: [0, 5000, 10000, 15000, 20000, 25000],
          gridLineWidth: 0,
          gridLineColor: "none",
          labels: {
            skew3d: true,
            step: 0,
            style: {
              fontSize: 12,
              color: "#00cce2"
            }
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              // 开启数据标签
              enabled: false
            },
            // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            enableMouseTracking: false
          }
        },
        series: [
          {
            name: "总数",
            data: [12202, 23101, 1320, 15430, 16540]
          },
          {
            name: "一般",
            data: [12320, 13540, 13650, 16540, 17650]
          },
          {
            name: "严重",
            data: [11540, 13780, 17650, 15760, 18706]
          },
          {
            name: "危急",
            data: [14302, 16504, 11023, 21011, 11503]
          }
        ]
      },
      // 缺陷类型option
    defectsTypeOption:{
      chart: {
        type: 'pie',
        backgroundColor:'none',
        options3d: {
          enabled: true,
          alpha: 50,
          beta: 0
        },
         margin: [0, 10, 20, 10] //距离上下左右的距离值

      },
      title:'',
      credits: {
          enabled: false
        },
      colors: ["#116dc3", "#b2aa2d", "#af1b9f"],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: false,
            format: '{point.name}'
          }
        }
      },
      series: [{
        type: 'pie',
        data: [
          ['一般',   45.0],
          ['严重',       26.8],

          ['危急',    8.5]
        ]
      }]
    }
    };
  },

  methods: {
    getState(LineDetailsState,data){
      console.log(data)
      this.isShowLineDetails = LineDetailsState
      this.text = data
    },
    getTowerDetailsState(data){

    },
    controlAside() {
      this.showAside = !this.showAside;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../style/home.less";
</style>

