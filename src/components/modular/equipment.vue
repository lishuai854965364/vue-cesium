<template>
  <div class="equipment-wrap">
	  <div class="search">
		  <input type="text" class="text" placeholder="请输入">
		  <span class="icon">
			  <img src="../../assets/imgaes/search.png" alt="">
		  </span>
	  </div>
	  <div class="unit">
		  <label for="">主管单位</label>
		  <!-- <span class="input-box">
		  	<input type="text" class="text">
		  </span> -->
      <span >
			   <el-select v-model="ywdwName" placeholder="请选择" multiple  popper-class="select-option" @change = 'getlineList()'>
					<el-option
					v-for="item in operators"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
		  </span>
	  </div>
	  <div class="unit">
		  <label for="">电压等级</label>
		  <span >
			   <el-select v-model="dydjName" placeholder="请选择" multiple popper-class="select-option" @change = 'getlineList()'>
					<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
		  </span>

	  </div>
	  <!-- 线路杆塔信息 -->
	  <div class="line-massage">
		  <div class="title">
			  <span class="line">线路</span>
			  <span class="tower" @click="setisShowState('杆塔')">杆塔</span>
			  <span class="details" @click="setisShowState('')">进入详情</span>
		  </div>
		  <!-- <div class="massage-list" ref="viewBox"> -->
			  <!-- <menuCommon :menus="menus"></menuCommon> -->
      <ul class="nav-list">
         <li v-for="(item,index) in navList" class="nav-item" :key="index"  @click="getTowerList(item.value)">
            <span>{{item.text}}</span>
         </li>
     </ul>
     <div class="tabCon">
       <ul class="tab-tilte">
            <li  @click="cur=0" :class="{active:cur==0}">全部</li>
            <li  @click="cur=1" :class="{active:cur==1}">紧急</li>
            <li  @click="cur=2" :class="{active:cur==2}">严重</li>
            <li  @click="cur=3" :class="{active:cur==3}">一般</li>

        </ul>
        <div class="clear"></div>

        <div class="tab-content">
          <div  v-if="cur==0">
            <ul class="list"  ref="viewBox">
              <li class="list-item"  v-for="(item,index) in TowerList" :key="index" @click="zoomToTower(item)">{{item.text}}</li>
            </ul>
          </div>
          <div  v-if="cur==1">2</div>
          <div  v-if="cur==2">3</div>
          <div  v-if="cur==3">4</div>
        </div>
        <!-- <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="全部"
        align="center"

        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="紧急"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="严重"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="一般"
        align="center"
        >
      </el-table-column>
    </el-table> -->

     </div>
	  </div>
  </div>
  <!-- </div> -->
</template>


<script>
import {getlineData,getOperatorData,getTowerData} from '../../ipconfig/http.js'
import { Viewfunc } from "@/componentsjs/pages/EarthContainer.js";

  export default {

    data() {
      return {
        cur:0,
        isShowRightBox:true,
        isShowTowerDetails:true,
        options:[],
        tableData:[],
        operators:[],
        value: '',
        navList:[],
        page:0,
        onFetching:false,
        dydjName:[],
        ywdwName:[],
        TowerList:[]

      }
  },
  mounted(){
      this.viewfunc = new Viewfunc(earth);
    },
  created(){
    this.getlineList()
    this.getOperatorList()
    // this.$nextTick(function(){
    //   this.box = this.$refs.viewBox
    //   console.log( this.box.addEventlistener())
    //   this.box.addEventlistener('scroll',() => {
    //     var scrollTop = this.$refs.viewBox.scrollTop
    //     var scrollHeight = this.$refs.viewBox.scrollHeight
    //     var clienHeight =  this.$refs.viewBox.clienHeight
    //     if(!onFetching){
    //       if(clienHeight >= scrollHeight - scrollTop - 5){
    //         this.onFetching = true
    //         setTimeout(() => {
    //           this.page += 1
    //           this.onFetching = false

    //         }, 1000);
    //       }
    //     }
    //   },false)
    // })
  },
  methods:{
    // 设置显示线路详情状态和杆塔详情状态
    setisShowState(data){
      this.isShowRightBox = !this.isShowRightBox
      this.$emit('setState', this.isShowRightBox,data)
    },

    getOperatorList(){
      getOperatorData().then(res => {
        let optionList = res.dydj
        let operatorList = res.ywdw
        for (let i = 0; i < optionList.length; i++) {
            this.options.push({value:optionList[i],label:optionList[i]})
        }
        for (let i = 0; i < operatorList.length; i++) {
            this.operators.push({value:operatorList[i],label:operatorList[i]})
        }
      })
    },
    getlineList(){
      // getlineData({
      //   ywdwName: this.ywdwName,
      //   dydjName: this.dydjName
      // }).then(res => {
      //   console.log(res)
      // })
      getlineData().then(res =>{
        this.navList = res
        console.log(this.navList)
      })

    },
    // 获取杆塔列表
    getTowerList(id){
      var xlid = id
      getTowerData({xlid}).then(res => {
        console.log(res)
        this.TowerList = res
      })
    },
    zoomToTower(tower){
      var jd = tower.attributes.jd;
      var wd = tower.attributes.wd;
      var gc = tower.attributes.gc+500;
      this.viewfunc.setCameraPos(parseFloat(jd), parseFloat(wd), parseFloat(gc), 3, -90);
    }
  },
	components:{
	}
  }
</script>

<style lang="less" scoped>
@import "../../style/equipment.less";

</style>