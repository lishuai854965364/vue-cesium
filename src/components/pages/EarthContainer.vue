<template>
  <div id="earthview">
    <div id="cesiumContainer"></div>
    <img
      src="../../assets/imgaes/funclog_img.png"
      title="三维分析功能"
      class="funclog"
      @click="showAnalysisFunc()"
    />
  <!-- 工具栏 -->
  <div class="tool">
    <ul class="tool-list">
      <li class="tool-item"></li>
      <li class="tool-item" title="空间测量"></li>
      <li class="tool-item" title="距离测量"></li>
      <li class="tool-item" title="对地距离测量"></li>
      <li class="tool-item" title="面积测量"></li>
      <li class="tool-item" title="定位"></li>
      <li class="tool-item"></li>
    </ul>
  </div>
  </div>
</template>
<script>
/**
 * 引入cesium
 */
// import Cesium from "cesium/Cesium";
/**
 * 引入样式表
 */
// import "cesium/Widgets/widgets.css";
/**
 * 引入自定义js
 */
import { Viewfunc } from "@/componentsjs/pages/EarthContainer.js";
//指北针
import CesiumNavigation from "cesium-navigation-es6";
export default {
  name: "cesiumContainer",
  data() {
    return {
      options: {
        // terrainProvider : new this.Cesium.CesiumTerrainProvider( {
        //   url: "http://192.168.8.101:8088/cesiumData" + '/terrain/'//地形数据 ctb方式
        // } ),
        // imageryProvider : new this.Cesium.WebMapServiceImageryProvider({
        //   url: "http://192.168.8.101:8088/cesiumData" + '/img/{z}/{x}/{y}.jpg', //影响数据
        //   visible:true
        // }),
        animation: false, //是否创建动画小器件，左下角仪表
        baseLayerPicker: false, //是否显示图层选择器
        fullscreenButton: false, //是否显示全屏按钮
        geocoder: false, //是否显示geocoder小器件，右上角查询按钮
        homeButton: false, //是否显示Home按钮
        infoBox: false, //是否显示信息框
        sceneModePicker: false, //是否显示3D/2D选择器
        selectionIndicator: false, //是否显示选取指示器组件
        timeline: false, //是否显示时间轴
        navigationHelpButton: false, //是否显示右上角的帮助按钮
        scene3DOnly: true //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      },
      do3DAnalysis: false //是否执行全屏分析功能，默认初始化不执行
    };
  },
  methods: {
    /* *
     *执行分析功能
     * */
    showAnalysisFunc() {
      var self = this;
      if (!self.do3DAnalysis) {
        var left_div = document.getElementsByClassName("left-wrap")[0];
        var right_div = document.getElementsByClassName("right-wrap")[0];
        var center_div = document.getElementsByClassName("center-wrap")[0];
        left_div.style.display = "none";
        right_div.style.display = "none";
        center_div.style.marginLeft = "0";
        center_div.style.marginRight = "0";
        center_div.style.width = "3840px";
        self.do3DAnalysis = !self.do3DAnalysis;
      } else {
        var left_div = document.getElementsByClassName("left-wrap")[0];
        var right_div = document.getElementsByClassName("right-wrap")[0];
        var center_div = document.getElementsByClassName("center-wrap")[0];
        left_div.style.display = "inline";
        right_div.style.display = "inline";
        center_div.style.marginLeft = "960px";
        center_div.style.marginRight = "950px";
        center_div.style.width = "1920px";
        self.do3DAnalysis = !self.do3DAnalysis;
      }
    }
  },
  mounted() {
    /**
     * 创建viewer实例
     */
    this.Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYWNlZDBkYi03YjI2LTRkYTktYjFiYy04NWE4MWZmNDhmOGIiLCJpZCI6NDY4Mywic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MTQxMzIwMn0.fStL4-0EDEITW2mgmHODsPpGq8qRVo0XCAESKSXGLwA";
    let viewer = new this.Cesium.Viewer("cesiumContainer", this.options);
    window.earth = viewer;
    /**
     * 删除默认的影像图层
     */
    earth.imageryLayers.remove(earth.imageryLayers.get(0));

    /**
     * 设置全球光照
     */
    earth.scene.globe.enableLighting = false;
    earth.shadows = false;
    var viewfunc = new Viewfunc(earth);
    /**
     * 加载天地图影像

    viewfunc.loadTdtLayer();*/

    /**
     * 获取服务器数据初始化
     */

    viewfunc.InitDataUrl();

    /* *
     *初始化加载地图注记
     */
    viewfunc.AddMapLables();
    /* *
     *加载鼠标位置
     */
    viewfunc.CreateStatuBar();

    /* *
     *根据相机高度加载或卸载点云
     */
    viewfunc.AddCloudByCH();

    /* *
     *设置鼠标事件
     */
    //改变默认鼠标事件类型，左键平移，中间键缩放，右键旋转改变角度
    //earth.scene.screenSpaceCameraController.tiltEventTypes =Cesium.CameraEventType.RIGHT_DRAG;
    //earth.scene.screenSpaceCameraController.zoomEventTypes =Cesium.CameraEventType.WHEEL;

    /* *
     *加载指北针控件
     */
    var options1 = {};
    // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
    options1.defaultResetView = this.Cesium.Rectangle.fromDegrees(
      80,
      22,
      130,
      50
    );
    // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
    options1.enableCompass = true;
    // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
    options1.enableZoomControls = true;
    // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
    options1.enableDistanceLegend = false;
    // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
    options1.enableCompassOuterRing = true;
    CesiumNavigation(earth, options1);
  }
};
</script>
<style lang="less" scoped>
#earthview {
  position: relative;
  width: 100%;
  height: 100%;
  #cesiumContainer {
    width: 100%;
    height: 100%;
  }
  .funclog {
    position: absolute;
    bottom: 5%;
    right: 3%;
    width: 300px;
    cursor: pointer;
  }
  .tool{
    width: 35px;
    position: absolute;
    right: 30px;
    top: 36px;
    .tool-item:first-child{
      height: 35px;
      background: url('../../assets/imgaes/break.png');
      background-size: cover;
    }
    .tool-item:nth-child(2){
      height: 34px;
      margin-top: 10px;
      background: url('../../assets/imgaes/measuring-tool.png');
      background-size: cover;
      background-position: 0 0;
    }
    .tool-item:nth-child(3){
      height: 34px;
      background: url('../../assets/imgaes/measuring-tool.png');
      background-size: cover;
      background-position: 0 -39px;
    }
    .tool-item:nth-child(4){
      height: 34px;
      background: url('../../assets/imgaes/measuring-tool.png');
      background-size: cover;
      background-position: 0 -75px;
    }
    .tool-item:nth-child(5){
      height: 34px;
      background: url('../../assets/imgaes/measuring-tool.png');
      background-size: cover;
      background-position: 0 -108px;
    }
    .tool-item:nth-child(6){
      width: 36px;
      height: 34px;
      margin-top: 10px;
      background: url('../../assets/imgaes/position-tool.png');
      background-size: 100%;
      background-position: 0 0;
    }
    .tool-item:nth-child(7){
      width: 36px;
      height: 34px;
      background: url('../../assets/imgaes/position-tool.png');
      background-size: 100%;
      background-position: 0 -34px;
    }
  }
}
</style>
<style lang="">
/* 删除cesium底部标签 */
.home .cesium-viewer-bottom {
  display: none;
}
.home .cesium-viewer-toolbar {
  line-height: 3rem;
}
</style>
