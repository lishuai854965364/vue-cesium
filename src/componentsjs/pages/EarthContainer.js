/**
 * Created by lpy on 2020/01/07.
 *
 * cesium-version 1.55
 *
 * (c)
 *
 */
import Cesium from "cesium/Cesium";
import axios from 'axios';
import {
  InitDataUrl1
} from '../../ipconfig/http';
import {
  addcloudFunc
} from './AddPointCloud';
import {
  CesiumUtils
} from './cesiumutils'

class Viewfunc {
  constructor(viewer) {
    this.viewer = viewer;
    this.baseUrl = ""; //点云数据、影像、地形、图片总路径
    this.url_local = ""; //内网网址
    this.url_intranet = ""; //外网网址
    this.twoUrl = ""; //是否启用内外网访问
    this.dataBasePath = ""; //数据物理地址
    this.cloudVersion = ""; //当前点云版本
    this.init_x, this.init_y, this.init_height, this.init_pitch; //初始化相机的位置
  }

  /**
   * 加载天地图影像
   */
  loadTdtLayer() {
    var viewer = this.viewer;
    var tdtLayer = new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=43267af0dad651b13bfdb47c0476ee48',
      layer: 'img',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18
    });
    viewer.imageryLayers.addImageryProvider(tdtLayer);
  }

  /**
   * 加载arcgis影像
   */
  loadArcgisLayer() {
    var viewer = this.viewer;
    var arcgisLayer = new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
    });
    viewer.imageryLayers.addImageryProvider(arcgisLayer);
  }

  /**
   * 加载本地地图影像
   */
  loadLocalLayer() {
    var viewer = this.viewer;
    var imageryUrl = this.baseUrl + '/img/{z}/{x}/{y}.jpg'; //影响数据
    var imageryProvider = new Cesium.WebMapServiceImageryProvider({
      url: imageryUrl,
      layers: '0',
      visible: true
    });
    viewer.imageryLayers.addImageryProvider(imageryProvider);
  }

  /**
   * 加载Google影像
   */
  loadGoogleLayer() {
    var viewer = this.viewer;
    var googleLayer = new Cesium.UrlTemplateImageryProvider({
      url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
    })
    viewer.imageryLayers.addImageryProvider(googleLayer);
  }

  /**
   * 加载本地地形
   */
  loadLocalTarrain() {
    var viewer = this.viewer;
    var terrainUrl = this.baseUrl + '/terrain/'; //地形数据 ctb方式
    var terrainProvider = new Cesium.CesiumTerrainProvider({
      url: terrainUrl
    });
    viewer.terrainProvider = terrainProvider;



  }

  /**
   * 设置相机位置北京
   */
  setCameraPos(lon, lat, height, duration, pitch) {
    var viewer = this.viewer;
    // 创建相机初始位置和朝向
    var cruPictch = pitch;
    if (!cruPictch) {
      cruPictch = -30;
    }
    //var newPosition=ViewCoordinateUtil.getCameraNewPosition(lon,lat,height,50,0,cruPictch);
    viewer.scene.camera.flyTo({
      //destination : Cesium.Cartesian3.fromDegrees(newPosition.lon,newPosition.lat,newPosition.height),
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-90),
        roll: Cesium.Math.toRadians(0)
      },
      complete: function () {},
      duration: duration
    });
  };


  //初始化加载数据路径1
  InitDataUrl() {
    var self = this;
    InitDataUrl1().then(res => {
      console.log(res)
      var data = res.data;
      if (res.code) {
        //数据路径
        self.url_intranet = data.data_wai_url;
        self.url_local = data.data_nei_url;
        self.twoUrl = data.twoUrl;
        self.dataBasePath = data.dataBasePath;

        //相机位置
        self.init_x = data.x;
        self.init_y = data.y;
        self.init_height = data.height;
        self.init_pitch = data.pitch;
        //点云版本
        self.cloudVersion = data.curVersion;
      };
      if (self.twoUrl) {
        //检测domain
        self.baseUrl = self.getNetDomain();
      } else {
        self.baseUrl = self.url_intranet;
      };
      //加载本地影像数据
      self.loadLocalLayer();
      //加载本地地形数据
      self.loadLocalTarrain();
      //加载适量线
      self.AddVectorData();
      //相机初始化定位
      self.setCameraPos(parseFloat(self.init_x), parseFloat(self.init_y), parseFloat(self.init_height), 3, parseInt(self.init_pitch))
    })
  };


  //检测内网、外网访问数据的url
  getNetDomain() {
    var self = this;
    var ip = "";
    var dataurl = "secdepoly/getClientIp";
    axios.get(dataurl, {
      dateType: 'JSON'
    }).then(res => {
      /* 缺少判断是否能拿到值 */
      console.log(res)
      ip = res.data;
    });

    if (ip.indexOf("192.168") != -1) { //部署电脑ip
      return self.url_intranet;
    } else if (ip.indexOf("20.") != -1) { //大屏ip
      return self.url_local;
    } else { //部署电脑ip
      return self.url_intranet;
    }
  }


  //初始化加载矢量数据
  AddVectorData() {
    var viewer = this.viewer;
    var chinaUrl = this.baseUrl + '/geojson/china.json'; //国界
    var provinceUrl = this.baseUrl + '/geojson/province.json'; //省界
    var line_500 = this.baseUrl + '/geojson/line500j.json'; //500直流
    var line_500_1 = this.baseUrl + '/geojson/line500z'; //500直流
    var line_400 = this.baseUrl + '/geojson/line800z'; //800直流
    var line_660 = this.baseUrl + '/geojson/直流660kV.json'; //800直流
    var line_800 = this.baseUrl + '/geojson/直流800kV.json'; //500交流
    var line_1000 = this.baseUrl + '/geojson/交流1000kV.json'; //500交流
    var line_1100 = this.baseUrl + '/geojson/直流1100kV.json'; //500交流
    var line_cl = this.baseUrl + '/geojson/柴拉线.json'; //500交流
    //添加行政区边界
    var province = viewer.dataSources.add(Cesium.GeoJsonDataSource.load(provinceUrl, {
      stroke: Cesium.Color.YELLOW,
      strokeWidth: 1
    }));
    //加载线路矢量线
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(line_500, {
      stroke: Cesium.Color.BLUE,
      strokeWidth: 2
    }));

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(line_500_1, {
      stroke: Cesium.Color.BLUE,
      strokeWidth: 2
    }));

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(line_400, {
      stroke: Cesium.Color.GREEN,
      strokeWidth: 2
    }));

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(line_660, {
      stroke: Cesium.Color.BLUE,
      strokeWidth: 2
    }));

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(line_800, {
      stroke: Cesium.Color.RED,
      strokeWidth: 2
    }));

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(line_1000, {
      stroke: Cesium.Color.PINK,
      strokeWidth: 2
    }));


    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(line_1100, {
      stroke: Cesium.Color.BLUE,
      strokeWidth: 2
    }));

    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(line_cl, {
      stroke: Cesium.Color.BLUE,
      strokeWidth: 2
    }));

  };

  // 加载地图注记1
  AddMapLables() {
    var viewer = this.viewer
    var scene = viewer.scene;
    var addCity = function (name, jd, wd, labels) {
      var scene = viewer.scene;
      var offsetX = 0,
        offsetY = 0;
      var pos = Cesium.Cartesian3.fromDegrees(jd, wd);
      var scaleByDistance = new Cesium.NearFarScalar(100, 1, 1.5e7, 0.0);
      var translucencyByDistance = new Cesium.NearFarScalar(10000, 1.0, 100000, 0.0);
      //
      labels.add({
        position: pos,
        text: name,
        pixelOffset: new Cesium.Cartesian2(offsetX, offsetY),
        scaleByDistance: scaleByDistance
      });
    };
    var labels = scene.primitives.add(new Cesium.LabelCollection());
    addCity('广州市', 113.25606999, 23.13462399, labels);
    addCity('南宁市', 108.31206999, 22.806145, labels);
    addCity('海口市', 110.33967999, 20.033791, labels);
    addCity('贵阳市', 106.71282141, 26.57892863, labels);
    addCity('昆明市', 102.71035, 25.045914, labels);
    addCity('福州市', 119.30529905, 26.07148439, labels);
    addCity('台北市', 121.51527, 25.050467, labels);
    addCity('拉萨市', 91.12212814, 29.66947, labels);
    addCity('成都市', 104.07006676, 30.6538394, labels);
    addCity("合肥市", 117.27645999, 31.864456, labels);
    addCity("武汉市", 114.27442001, 30.585052, labels);
    addCity("南昌市", 115.90752912, 28.67530771, labels);
    addCity("上海市", 121.45934, 31.230141, labels);
    addCity("杭州市", 120.16862001, 30.29412501, labels);
    addCity("郑州市", 113.63294616, 34.75911054, labels);
    addCity("南京市", 118.76899001, 32.05256301, labels);
    addCity("西宁市", 101.78394, 36.60885599, labels);
    addCity("银川市", 106.27396999, 38.46697199, labels);
    addCity("兰州市", 103.84714, 36.04703099, labels);
    addCity("太原市", 112.56932167, 37.86115848, labels);
    addCity("乌鲁木齐市", 87.604065, 43.790722, labels);
    addCity("呼和浩特市", 111.66416001, 40.81548299, labels);
    addCity("长春市", 125.3259193, 43.88159971, labels);
    addCity("沈阳市", 123.41987999, 41.78825, labels);
    addCity("哈尔滨市", 126.64548001, 45.742336, labels);
    addCity("重庆市", 106.55996726, 29.56895914, labels);
    addCity("西安市", 108.94421001, 34.26660499, labels);
    addCity("北京市", 116.38475992, 39.90230163, labels);
    addCity("济南市", 116.99649518, 36.65387169, labels);
    addCity("石家庄市", 114.49272999, 38.04344599, labels);
    addCity("天津市", 117.18782001, 39.136971, labels);
    addCity("柴拉线", 92.357513, 33.856037, labels);
    addCity("芒澜一线", 97.633045, 30.651304, labels);
    addCity("塘芒二线", 98.930726, 29.600993, labels);
    addCity("乡水一二线", 100.136798, 28.840331, labels);
    addCity("锦苏线", 105.057843, 28.634299, labels);
    addCity("复奉线", 112.137767, 29.870280, labels);
    addCity("宾金线", 111.843375, 28.437976, labels);
  };


  //按照camera高度加载点云数据
  AddCloudByCH() {
    var viewer = this.viewer;
    var primitives = viewer.scene.primitives;
    var cesiumUtils = new CesiumUtils(viewer);
    var addclouddata = new addcloudFunc(viewer);
    var self = this;
    viewer.scene.camera.moveEnd.addEventListener(function () {
      var centerPosition = cesiumUtils.getCenterPosition();
      if (centerPosition == null)
        return;

      //相机高度
      var camera_height = centerPosition.height;
      if (camera_height > 1500) {
        addclouddata.unloadAllCloud(primitives);
        //删除所有实体，包括杆塔标注
        addclouddata.removeAllsEntities();
        cesiumUtils.setLineViewer(true);
      } else {
        addclouddata.LodecloudData(self.baseUrl, primitives);
        //添加杆塔标注
        addclouddata.Create_Poles_entities();
        //删除矢量线
        cesiumUtils.setLineViewer(false);
      }

      //存储当前地图四至，二维地图跳转调用
      //var extent = getCurrentExtent();
      //extent = JSON.stringify(extent);
      //window.name = extent;
      //witeFile("static/config/extent.json",extent);//将坐标写到文件中
    });
  };



  //获取鼠标坐标并显示
  CreateStatuBar() {
    var viewer = this.viewer;
    var canvas = viewer.scene.canvas;
    var scene = viewer.scene;
    //得到当前三维场景的椭球体
    var ellipsoid = scene.globe.ellipsoid;
    var handler = new Cesium.ScreenSpaceEventHandler(canvas); //处理用户输入事件。
    var longitude_show = document.getElementById("longitude_show");
    var latitude_show = document.getElementById("latitude_show");
    var height_show = document.getElementById("height_show");
    var currentTerrain = viewer.terrainProvider;
    handler.setInputAction(function (movement) {
      // var cartesian = viewer.scene.pickPosition(movement.endPosition);
      var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
      if (cartesian) {
        /*var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        //将笛卡尔三维坐标转为地图坐标（弧度）
        var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
        //将地图坐标（弧度）转为十进制的度数
        var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
        if(viewer.terrainProvider===currentTerrain){
          var hei_String =0;
       }else{
          var hei_String = cartographic.height.toFixed(3);
       }*/
        //将笛卡尔坐标转换为地理坐标
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        //将弧度转为度的十进制度表示
        var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(3);
        var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(3);
        //获取相机高度
        var hei_String = Math.ceil(viewer.camera.positionCartographic.height).toFixed(3);
        // entity.position = cartesian;
        // entity.label.show = true;
        // entity.label.text = '(' + longitudeString + ', ' + latitudeString + "," + height + ')' ;


        longitude_show.innerHTML = log_String;
        latitude_show.innerHTML = lat_String;
        height_show.innerHTML = hei_String;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  }



}
export {
  Viewfunc
}
