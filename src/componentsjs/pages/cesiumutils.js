import Cesium from "cesium/Cesium";

class CesiumUtils {
  constructor(viewer) {
    this.viewer = viewer;

  };

  getCurrentExtent() {
    var viewer = this.viewer;
    // 范围对象
    var extent = {};
    // 得到当前三维场景
    var scene = viewer.scene;
    // 得到当前三维场景的椭球体
    var ellipsoid = scene.globe.ellipsoid;
    var canvas = scene.canvas;

    // canvas左上角
    var car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);

    // canvas右下角
    var car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);

    // 当canvas左上角和右下角全部在椭球体上
    if (car3_lt && car3_rb) {
      var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
      var carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
      extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
      extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
      extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
      extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
    }

    // 当canvas左上角不在但右下角在椭球体上
    else if (!car3_lt && car3_rb) {
      var car3_lt2 = null;
      var yIndex = 0;
      do {
        // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
        yIndex <= canvas.height ? yIndex += 10 : canvas.height;
        car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
      } while (!car3_lt2);
      var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
      var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
      extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
      extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
      extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
      extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
    }
    //经验公式，1公里之内的点云可见
    /*var yoffset= 1/111;
    if (extent.ymax-extent.ymin > yoffset)
        extent.ymax = extent.ymin + yoffset;

        extent.xmin = extent.xmin - 0.1;
        //extent.ymax = extent.ymax + 0.1;
        extent.xmax = extent.xmax + 0.1;
        extent.ymin = extent.ymin  - 0.1;*/

    /*使用Cesium自带的方法
    var extent1 = viewer.camera.computeViewRectangle();
    var extent2={};
    extent2.xmin = Cesium.Math.toDegrees(extent1.west);
    extent2.xmax = Cesium.Math.toDegrees(extent1.east);
    extent2.ymin = Cesium.Math.toDegrees(extent1.south);
    extent2.ymax = Cesium.Math.toDegrees(extent1.north);*/
    return extent;
  };

  /* 获取camera高度  */
  getHeight() {
    var viewer = this.viewer;
    if (viewer) {
      var scene = viewer.scene;
      var ellipsoid = scene.globe.ellipsoid;
      var height = ellipsoid.cartesianToCartographic(viewer.camera.position).height;
      var height1 = Math.ceil(viewer.camera.positionCartographic.height);
      return height;
    }
  }

  //获取中心点坐标
  getCenterPosition() {
    var viewer = this.viewer;
    // 得到当前三维场景
    var scene = viewer.scene;
    var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas
      .clientHeight / 2));
    if (result == undefined)
      return;

    var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
    var lon = curPosition.longitude * 180 / Math.PI;
    var lat = curPosition.latitude * 180 / Math.PI;
    //相机高度
    var height = this.getHeight();

    //相机距离地面高度
    var cart = new Cesium.Cartographic(Cesium.Math.toRadians(lon), Cesium.Math.toRadians(lat), height);
    var h = height - scene.globe.getHeight(cart);

    return {
      lon: lon,
      lat: lat,
      height: h
    };
  };


  checkIfLoadPointCloud(extent,preExtent) {
    var viewer = this.viewer;
    var primitives = viewer.scene.primitives;
    var t = false;
    for (var i = 0; i < primitives.length; i++) {
      var tileLayer = primitives.get(i);
      if (tileLayer.type == "cloud") {
        t = true;
        break;
      }
    }
    if (t) {
      //计算移动距离，当距离够大时重新加载数据
      var centre1 = {x: (extent.xmax + extent.xmin) / 2, y: (extent.ymax + extent.ymin) / 2};
      if (preExtent) {
        var centre2 = {x: (preExtent.xmax + preExtent.xmin) / 2, y: (preExtent.ymax + preExtent.ymin) / 2};
        var centreMoveDistance = this.getDistance(centre1, centre2);
        if (centreMoveDistance < 1000) {
          return false;
        } else {
          return true;
        }
      } else {
        return true
      }
    } else {
      return true;
    }
  };


  //控制矢量高压线的可视性及显示范围，直流电压前面加a
  setLineViewer(isShow) {
    var viewer = this.viewer;
    var ds = viewer.dataSources._dataSources;
    for (var line of ds) {
      line.show = isShow;
      //viewer.dataSources.remove(line);
    }
  };

//添加杆塔
  addPole(currentClickLon, currentClickLat, height, text, sxh, pid) {
    var viewer = this.viewer;
    var obj = viewer.entities.getById(text);
    if (obj) {
      // viewer.entities.remove(obj);
      return;
    }
    var lbl = viewer.entities.add({
      id: text,
      name: 'pole',
      position: Cesium.Cartesian3.fromDegrees(currentClickLon, currentClickLat, height + 6),
      label: {
        text: text,
        scale: 1.0,
        //font : '12px bold sans-serif',
        font: "15px SimHei",
        Width: 8,
        fillColor: Cesium.Color.WHITE,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineColor: Cesium.LabelStyle.GRAY,
        outlineWidth: 2,
        //垂直位置
        verticalOrigin: Cesium.VerticalOrigin.BUTTOM,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        //按照距离缩放文字标注
        scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e4, 0.0),
        //中心位置
        pixelOffset: new Cesium.Cartesian2(5, 0)
      },
      sxh: sxh,
      pid: pid
    });
    return lbl;
  }

  /**
   * 点云赋色,设置点大小
   * @param cloudEntity 点云模型
   * @param cloudType 点云类型 structures,conductor
   */
  renderCloud(cloudEntity, cloudType) {
    switch (cloudType) {
      case "fengshu":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("#E46D0A")';
        break;
      case "lishu":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("#0070C0")';
        break;
      case "maozhu":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("#00B050")';
        break;
      case "paoliu":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("#CC0000")';
        break;
      case "shanmu":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("#75923C")';
        break;
      case "songshu":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("#8DB4E3")';
        break;
      case "zamu":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("#FFC000")';
        break;
      case "qita":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("#888888")';
        break;

      case "vegetation(high)":
        cloudEntity.style.pointSize = 4;
        //cloudEntity.style.color = 'color("WHITE")';
        break;
      case "structures":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("WHITE")';
        break;
      case "conductor":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("YELLOW")';
        break;
      case "wire":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("WHITE")';
        break;
      case "DangerousPoint":
        cloudEntity.style.pointSize = 5;
        cloudEntity.style.color = 'color("RED")';
        break;
      case "DF":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("GREEN")';
        break;
      case "GW":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("RED")';
        break;
      case "ZB":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("BLUE")';
        break;
      case "DF_DangerousPoint":
        //
        cloudEntity.style.pointSize = 7;
        cloudEntity.style.color = 'color("RED")';
        break;
      case "GW_DangerousPoint":
        cloudEntity.style.pointSize = 7;
        cloudEntity.style.color = 'color("RED")';
        break;
      case "ZB_DangerousPoint":
        cloudEntity.style.pointSize = 7;
        cloudEntity.style.color = 'color("RED")';
        break;
      case "crossing(down)":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("BLACK")';
        break;
      case "crossing(up)":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("BLACK")';
        break;
      case "insulator":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("WHITE")';
        break;
      case "Drainage":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("YELLOW")';
        break;
      case "railway":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("BLACK")';
        break;
      case "road":
        cloudEntity.style.pointSize = 2;
        cloudEntity.style.color = 'color("BLACK")';
        break;
    }
  }

  getDistance(point1, point2) {
    if (!point1 || !point2) {
      return 0;
    }
    if (point1.x >= -180 && point1.x <= 180) {
      point1 = this.wgs842WebMercator(point1.x, point1.y);
    }
    if (point2.x >= -180 && point2.x <= 180) {
      point2 = this.wgs842WebMercator(point2.x, point2.y);
    }
    return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
  }

  /**
   * wgs84转WebMercator
   * @param lon 经度
   * @param lat 纬度
   * @constructor
   */
  wgs842WebMercator(lon, lat) {
    let x = lon * 20037508.34 / 180;//纬线方向
    let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);//经线方向
    y = y * 20037508.34 / 180;
    return {x: x, y: y};
  }
}


export {
  CesiumUtils
}
