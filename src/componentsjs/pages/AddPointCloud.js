/**
 * Created by lpy on 2020/01/16.
 *
 * cesium-version 1.52
 *
 * (c)
 *
 */
import Cesium from "cesium/Cesium";
import {Lodecloudpoint, PolesLables} from '../../ipconfig/http'
import {CesiumUtils} from './cesiumutils'

class addcloudFunc {
  constructor(viewer) {
    this.viewer = viewer;
    this.entity_arr = ['structures', 'conductor', 'wire', 'vegetation(high)', 'buildings', 'crossing(down)',
      'insulator', 'crossing(up)', 'Drainage', 'DangerousPoint', 'substations', 'tower(crossing)', 'pipeline', 'cableway', 'underbuild'];
    //保存当前视野范围内的图层
    this.ext_layers;
    this.preExtent;//记录上一个移动点
    this.centre1;
    this.centre2;
    this.centreMoveDistance;
    this.extent;
    this.check;//是否需要加载点云
    this.layerMap = null;//图层树控制
    this.layerType = null;
    this.cesiumUtils = new CesiumUtils(viewer);
  }

  getPreExtent() {
    return this.preExtent;
  }

  setPreExtent(preExtent) {
    this.preExtent = preExtent;
  }

  //加载点云数据
  LodecloudData(baseUrl, primitives, version) {
    var viewer = this.viewer;
    var self = this;

    self.extent = self.cesiumUtils.getCurrentExtent();
    var center = self.cesiumUtils.getCenterPosition()
    // todo
    self.check = self.cesiumUtils.checkIfLoadPointCloud(self.extent,self.preExtent);
    if (!self.check || self.extent.xmin == undefined) {
      return;
    }
    Lodecloudpoint({
      minx: self.extent.xmin,
      maxx: self.extent.xmax,
      miny: self.extent.ymin,
      maxy: self.extent.ymax,
      version: version

    }).then(res => {
      self.ext_layers = res;
      for (let i in res) {
        for (var j = 0; j < self.entity_arr.length; j++) {
          var spath = baseUrl + "/cloud/" + res[i] + "/" + self.entity_arr[j] + "/tileset.json";
          var isExist = 0;
          for (var k = 0; k < primitives.length; k++) {
            var p = primitives.get(j);
            var path = p.path;
            if (p.path != undefined && p.path == spath) {
              isExist = 1;
              break;
            }
          }
          if (isExist)
            break;
          var cloudEntity = new Cesium.Cesium3DTileset({url: spath});
          cloudEntity.path = spath;
          cloudEntity.type = "cloud";
          cloudEntity.style = new Cesium.Cesium3DTileStyle();
          this.cesiumUtils.renderCloud(cloudEntity, self.entity_arr[j]);
          cloudEntity.maximumScreenSpaceError = 16.0;
          cloudEntity.pointCloudShading.maximumAttenuation = 0;
          cloudEntity.pointCloudShading.baseResolution = 0;
          cloudEntity.pointCloudShading.geometricErrorScale = 1.0;
          cloudEntity.pointCloudShading.attenuation = true;
          cloudEntity.pointCloudShading.eyeDomeLighting = true;
          primitives.add(cloudEntity);
          // 同步图层控制展示显隐
          self.layerMap = sessionStorage.getItem("layerMap");
          if (self.layerMap != undefined) {
            self.layerMap = JSON.parse(self.layerMap);
            self.layerMap = self.entity_arr[j];
            if(spath.indexOf("vegetation")!=-1){//高植被、低植被
                cloudEntity.show = layerMap["vegetation"];
            }else if(spath.indexOf("crossing")!=-1){//高交跨、低交跨
                cloudEntity.show = layerMap["crossing"];
            }else if(spath.indexOf("structures")!=-1||spath.indexOf("Drainage")!=-1||spath.indexOf("insulator")!=-1){//杆塔、绝缘子、引流线
                cloudEntity.show = layerMap["structures"];
            }else if(spath.indexOf(layerType)!=-1){
                cloudEntity.show = layerMap[layerType];
            }
          }
        }


      }

    })
    this.preExtent = self.extent;
    this.unloadExtentCloud(primitives,self.ext_layers);
  };
  //卸载掉不在视野范围内的点云图层
  unloadExtentCloud(primitives, ext_layers){
    if (ext_layers==null || ext_layers==undefined) {
      return;
    }
    for (var i = 0; i < primitives.length; i++){
      var isExist = 0;
      var tileLayer = primitives.get(i);
      if  (tileLayer.type!="cloud")
        continue;
      for(var n=0;n<ext_layers.length;n++){
        if(tileLayer.path.indexOf(ext_layers[n])!=-1){//true
          isExist = 1;
          break;
        }
      }
      if (!isExist){
        primitives.remove(tileLayer);
        i--;
      }
    }
  }
  //卸载掉所有点云图层
  unloadAllCloud(primitives) {
    for (var i = 0; i < primitives.length; i++) {
      var tileLayer = primitives.get(i);
      if (tileLayer.type != "cloud")
        continue;
      primitives.remove(tileLayer);
      i--;
    }
  };

  /**
   * 删除所有的杆塔标注
   */
  removeAllsEntities() {
    var viewer = this.viewer;
    for (var i = 0; i < viewer.entities.values.length; i++) {
      var entity = viewer.entities.values[i];
      if (entity.type == "gkmn")//工况模拟所画的点和线不清除.
        continue;
      viewer.entities.remove(entity);
      i--;
    }
  };


  //杆塔标签开始
  Create_Poles_entities() {
    var self = this;
    var extent = self.cesiumUtils.getCurrentExtent();
    if (extent.xmin == undefined) {
      return false;
    }
    PolesLables({
      minx: extent.xmin,
      maxx: extent.xmax,
      miny: extent.ymin,
      maxy: extent.ymax,
    }).then(resp => {
      var geoJson = resp.data;
      var entity;
      for (var i = 0; i < geoJson.length; i++) {
        var lon = geoJson[i]['jd'];
        var lat = geoJson[i]['wd'];
        var ht = geoJson[i]['gc'] + geoJson[i]['gtqg'];
        var text = geoJson[i]['xlmc'] + "#" + geoJson[i]['name'];
        var sxh = geoJson[i]['sxh'];
        entity = self.cesiumUtils.addPole(lon, lat, ht, text, sxh, sxh);
      }
    });
  }


}

export {
  addcloudFunc

}
