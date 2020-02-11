<template>
  <div class="line-details">
    <div class="line-name">
      <label for="" class="title" v-if="text == '杆塔'">杆塔:</label>
      <label for="" class="title" v-else>线路：</label>
      <span class="name">复奉线</span>
      <span class="go-back" @click="setisShowState">返回</span>
    </div>

    <!-- 杆塔台账 -->
    <div class="tower-parameter" v-if="text == '杆塔'">
      <span class="title">台账</span>
      <div class="standing-content">
        <el-row >
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <ul class="list">
                <li>
                  <label for="">线路ID：</label>
                  <span>482</span>
                </li>
                <li>
                  <label for="">顺序号：</label>
                  <span>123124 </span>
                </li>
                <li>
                  <label for="">杆塔全高：</label>
                  <span>2-2312</span>
                </li>
                <li>
                  <label for="">耐张段长度（m）：</label>
                  <span>2-12312</span>
                </li>
                <li>
                  <label for="">高程：</label>
                  <span>2-12312</span>
                </li>
                <li>
                  <label for="">同塔并架信息：</label>
                  <span>2-12312</span>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <ul class="list">
                <li>
                  <label for="">线路ID：</label>
                  <span>482</span>
                </li>
                <li>
                  <label for="">杆塔型号：</label>
                  <span>123124 </span>
                </li>
                <li>
                  <label for="">运维班组：</label>
                  <span>2-2312</span>
                </li>
                <li>
                  <label for="">杆塔重量：</label>
                  <span>2-12312</span>
                </li>
                <li>
                  <label for="">代表档距(m)：</label>
                  <span>2-12312</span>
                </li>
                <li>
                  <label for="">大号侧档距(m)：</label>
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
                  <label for="">杆塔性质：</label>
                  <span>123124 </span>
                </li>
                <li>
                  <label for="">保护角：</label>
                  <span>2-2312</span>
                </li>
                <li>
                  <label for="">生产厂家：</label>
                  <span>2-12312</span>
                </li>
                <li>
                  <label for="">经度：</label>
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
                  <label for="">运行编号：</label>
                  <span>482</span>
                </li>
                <li>
                  <label for="">资产单位：</label>
                  <span>123124 </span>
                </li>
                <li>
                  <label for="">呼程高：</label>
                  <span>2-2312</span>
                </li>
                <li>
                  <label for="">施工编号：</label>
                  <span>2-2312</span>
                </li>
                <li>
                  <label for="">纬度：</label>
                  <span>2-2312</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 线路台账 -->
    <div class="standing-book" v-else>
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
    <!-- 杆塔缺陷 -->
    <div class="Hidden-trouble-statistical defects"  v-if="text == '杆塔'">
      <div class="defects-title">
        <span class="title-text">缺陷</span>
        <ul class="title-tab">
          <li class="tab-item" @click="cur=0" :class="{active:cur==0}">今年</li>
          <li class="tab-item" @click="cur=1" :class="{active:cur==1}">去年</li>
          <li class="tab-item" @click="cur=2" :class="{active:cur==2}">自定义</li>
        </ul>
        <div class="tab-content">
          <div class="content-item" v-if="cur==0">
            <el-table
                  :data="tableData"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
                  <!-- <el-table-column
                    width="30">
                    <img src="../../assets/imgaes/location.png" alt="" srcset="">
                  </el-table-column> -->
                  <el-table-column
                    prop="date"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="巡查时间">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="缺陷部位">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="缺陷等级">
                  </el-table-column>
                  <el-table-column
                    prop="address"

                    label="缺陷描述">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="缺陷照片">
                  </el-table-column>
                </el-table>
          </div>
          <div class="content-item" v-if="cur==1">2</div>
          <div class="content-item" v-if="cur==2">3</div>

        </div>
      </div>
    </div>
    <!-- 隐患统计、列表 -->
    <div class="Hidden-trouble-statistical" v-else>
        <ul class="tab-tilte">
            <li  @click="cur=0" :class="{active:cur==0}">隐患统计</li>
            <li  @click="cur=1" :class="{active:cur==1}">隐患列表</li>

        </ul>
        <div class="clear"></div>
        <div class="tab-content">
          <!-- 隐患统计 -->
            <div v-if="cur==0" class="hazard-statistics">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <hazardChartCommon :id="hazardStatisticsId"></hazardChartCommon>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <div class="title">
                      <span class="title-text">线路隐患统计</span>
                    </div>
                    <div class="hazard-list">
                      <ul>
                      <li class="list-item">
                        <span class="name">地物名称</span>
                          <span class="describe">描述</span>
                      </li>
                    </ul>
                    </div>

                    <!-- <ul>
                        <li v-for="(name,index) in hazardStatisticsList" :key="name" class="list-item" :class="{on:index%2==0,off:index%2!=0}">
                          <span class="neme">地物名称</span>
                            <span class="describe">描述</span>

                        </li>
                      </ul> -->
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    3
                  </div>
                </el-col>
              </el-row>
            </div>
            <!--隐患列表 -->
            <div v-if="cur==1">
              <div class="search">
                <div class="sear-item">
                  <label for="">线路名称</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <label for="">隐患类型</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <label for="">分析条件</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <button class="sear-btn">查询</button>
                </div>
              </div>
              <div class="clear"></div>
              <div class="table">
                 <el-table
                  :data="tableData"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
                  <el-table-column
                    width="30">
                    <img src="../../assets/imgaes/location.png" alt="" srcset="">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="线路名称"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="线路区间">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="隐患类型">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    width="160"
                    label="据小号侧杆塔距离(m)">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="空间距离(m)">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="规程中要求">
                  </el-table-column>
                </el-table>
              </div>
            </div>
        </div>
    </div>

    <!-- 杆塔照片 -->
    <div class="Hidden-trouble-statistical defects"  v-if="text == '杆塔'">
      <div class="defects-title">
        <span class="title-text">照片</span>
        <ul class="title-tab">
          <li class="tab-item" @click="cur=0" :class="{active:cur==0}">今年</li>
          <li class="tab-item" @click="cur=1" :class="{active:cur==1}">去年</li>
          <li class="tab-item" @click="cur=2" :class="{active:cur==2}">自定义</li>
        </ul>
      </div>
      <div class="tab-content">

      </div>
    </div>
    <!-- 缺陷统计、列表 -->
    <div class="Hidden-trouble-statistical" v-else>
        <ul class="tab-tilte">
            <li  @click="cur=0" :class="{active:cur==0}">缺陷统计</li>
            <li  @click="cur=1" :class="{active:cur==1}">缺陷列表</li>

        </ul>
        <div class="clear"></div>
        <div class="tab-content">
            <div v-if="cur==0" class="hazard-statistics">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <defectsStatisticsChartCommon ></defectsStatisticsChartCommon>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <div class="title">
                      <span class="title-text">线路隐患统计</span>
                    </div>
                    <div class="hazard-list">
                      <ul>
                      <li class="list-item">
                        <span class="name">地物名称</span>
                          <span class="describe">描述</span>
                      </li>
                    </ul>
                    </div>

                    <!-- <ul>
                        <li v-for="(name,index) in hazardStatisticsList" :key="name" class="list-item" :class="{on:index%2==0,off:index%2!=0}">
                          <span class="neme">地物名称</span>
                            <span class="describe">描述</span>

                        </li>
                      </ul> -->
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    3
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-if="cur==1">
              <div class="search">
                <div class="sear-item">
                  <label for="">线路名称</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <label for="">杆塔名称</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <label for="">缺陷类型</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
              </div>
              <div class="clear"></div>
               <div class="search">
                <div class="sear-item">
                  <label for="">缺陷等级</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <label for="">巡视年度</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <label for="">缺陷描述</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <button class="sear-btn">查询</button>
                </div>
              </div>
              <div class="clear"></div>
              <div class="table">
                 <el-table
                  :data="tableData"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
                  <el-table-column
                    width="30">
                    <img src="../../assets/imgaes/location.png" alt="" srcset="">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="线路名称"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="杆塔名称">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="巡视时间">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="缺陷分类">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="缺陷等级">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="缺陷描述">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="缺陷照片">
                  </el-table-column>
                </el-table>
              </div>
            </div>
        </div>
    </div>

    <!-- 杆塔视频 -->
    <div class="Hidden-trouble-statistical defects"  v-if="text == '杆塔'">
      <div class="defects-title">
        <span class="title-text">视频</span>
        <ul class="title-tab">
          <li class="tab-item">今年</li>
          <li class="tab-item">去年</li>
          <li class="tab-item">自定义</li>
        </ul>
      </div>
    </div>
    <!-- 交跨统计、交跨列表 -->
    <div class="Hidden-trouble-statistical" v-else>
        <ul class="tab-tilte">
            <li  @click="cur=0" :class="{active:cur==0}">交跨统计</li>
            <li  @click="cur=1" :class="{active:cur==1}">交跨列表</li>

        </ul>
        <div class="clear"></div>
        <div class="tab-content">
            <div v-if="cur==0" class="hazard-statistics">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <hazardChartCommon :id="hazardStatisticsId"></hazardChartCommon>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <div class="title">
                      <span class="title-text">线路隐患统计</span>
                    </div>
                    <div class="hazard-list">
                      <ul>
                      <li class="list-item">
                        <span class="name">地物名称</span>
                          <span class="describe">描述</span>
                      </li>
                    </ul>
                    </div>

                    <!-- <ul>
                        <li v-for="(name,index) in hazardStatisticsList" :key="name" class="list-item" :class="{on:index%2==0,off:index%2!=0}">
                          <span class="neme">地物名称</span>
                            <span class="describe">描述</span>

                        </li>
                      </ul> -->
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    3
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-if="cur==1">
               <div class="search">
                <div class="sear-item">
                  <label for="">线路名称</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <label for="">交跨类型</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <label for="">三跨类型</label>
                    <span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="sear-item">
                  <button class="sear-btn">查询</button>
                </div>
              </div>
              <div class="clear"></div>
              <div class="table">
                 <el-table
                  :data="tableData"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
                  <el-table-column
                    width="30">
                    <img src="../../assets/imgaes/location.png" alt="" srcset="">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="序号"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="线路名称"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="线路区间">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="交跨类型">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="三跨类型">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="交跨名称">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    width="160"
                    label="据小号侧杆塔距离(m)">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="交跨距离(m)">
                  </el-table-column>
                </el-table>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import hazardChartCommon from "../echarts/hazardChart";
import defectsStatisticsChartCommon from '../echarts/defectsStatisticsChart'
export default {
  props:{
    text: {
		type: String
		}
  },
  data () {
      return {
        isShowRightBox:false,
        cur:0, //默认选中第一个tab
        tableData: [],
        options: [],
        hazardStatisticsId:'hazardChart',
        hazardStatisticsList:[],
        value:''
      }
  },
  components: {
    hazardChartCommon,
    defectsStatisticsChartCommon
  },
  mounted () {
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

@import "../../style/lineStatistics.less";

</style>