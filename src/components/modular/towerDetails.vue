<template>
  <div class="line-details">
    <div class="line-name">
      <label for="" class="title">杆塔：</label>
      <span class="name">复奉线</span>
      <span class="go-back" @click="setisShowState">返回</span>
    </div>
    <div class="standing-book">
      <span class="title">台账</span>
      <div class="standing-content">
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <ul class="list">
                <li>
                  <label for="">线路ID：</label>
                  <span>482</span>
                </li>
                <li>
                  <label for="">输送容量（mw）：</label>
                  <span>123124 </span>
                </li>
                <li>
                  <label for="">运维区段：</label>
                  <span>2-2312</span>
                </li>
                <li>
                  <label for="">地线型号：</label>
                  <span>2-12312</span>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <ul class="list">
                <li>
                  <label for="">线路名称：</label>
                  <span>482</span>
                </li>
                <li>
                  <label for="">投运提起：</label>
                  <span>123124 </span>
                </li>
                <li>
                  <label for="">运维线路长度（km）：</label>
                  <span>2-2312</span>
                </li>
                <li>
                  <label for="">光缆型号：</label>
                  <span>2-12312</span>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <ul class="list">
                <li>
                  <label for="">电压等级：</label>
                  <span>482</span>
                </li>
                <li>
                  <label for="">资产单位：</label>
                  <span>123124 </span>
                </li>
                <li>
                  <label for="">运维杆塔基数：</label>
                  <span>2-2312</span>
                </li>
                <li>
                  <label for="">运维部门：</label>
                  <span>2-12312</span>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <ul class="list">
                <li>
                  <label for="">线路起止：</label>
                  <span>482</span>
                </li>
                <li>
                  <label for="">运维单位：</label>
                  <span>123124 </span>
                </li>
                <li>
                  <label for="">导线型号：</label>
                  <span>2-2312</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 隐患统计、列表 -->
    <div class="Hidden-trouble-statistical">

    </div>
	<div class="Hidden-trouble-statistical">

    </div>
    <div class="Hidden-trouble-statistical">

    </div>
  </div>
</template>

<script>
import hazardChartCommon from "../echarts/hazardChart";
import defectsStatisticsChartCommon from '../echarts/defectsStatisticsChart'
export default {
  data () {
      return {
        isShowTowerDetails:false,
        cur:0, //默认选中第一个tab
        tableData: [],
        options: [],
        hazardStatisticsId:'hazardChart',
        hazardStatisticsList:[],
      }
  },
  components: {
    hazardChartCommon,
    defectsStatisticsChartCommon
  },
  methods: {
    setisShowState(){
      this.isShowRightBox = !this.isShowRightBox
      this.$emit('setState', this.isShowRightBox)
    },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
}
</script>

<style lang="less" scoped>

@import "../../style/towerDetails.less";

</style>