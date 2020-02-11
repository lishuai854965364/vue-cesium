
<template>
<div class="coverage-box">
	<el-tree
  :data="setTree"
  show-checkbox
  node-key="id"
  :default-expanded-keys="['1','11','14']"
  :default-checked-keys="['1']"
  :props="defaultProps"
  @check-change="onTreeCheck">
</el-tree>

</div>
</template>

<script>
import {getCoverageTreeData} from '../../ipconfig/http.js'
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        setTree:null,
        viewer: earth
      };
    },
    mounted(){
      this.getCoverageTreeList()
    },
    methods: {
      // 获取图层目录树
      getCoverageTreeList(){
        getCoverageTreeData().then(res => {
          // this.setTree = JSON.stringify(res)
           this.setTree = res
           console.log(this.setTree)
        })
      },
      onTreeCheck(node, checked, obj){
        switch(Number(node.id))
        {
          case 1: //图层管理

            break;
          case 11:  //点云
            // this.getSubChildren(11,checked);
            break;
          case 12: //地形图
            // scene.terrainProvider._layers[0].show=checked;
            break;
          case 13: //影像图
            this.viewer.scene.imageryLayers._layers[0].show=checked;
            break;
          case 14:  //工况
            // getSubChildren(14,checked);
            break;
          case 111:  case 112:  case 113:  case 114:  case 115:  case 116:
          case 141: case 142: case 143: case 144://点云数据图层
          var primitives = this.viewer.scene.primitives;
          var length = primitives.length;
          for (var i = 0; i < length; ++i) {
            var p = primitives.get(i);
            if (p._url && p._url.indexOf(node.type) != -1){
              p.show = checked;
            }
            if(p._url && node.type=="structures"&&(p._url.indexOf("insulator") != -1 || p._url.indexOf("Drainage") != -1)){
              p.show = checked;
            }
          }
          //todo
          // layerMap = sessionStorage.getItem("layerMap");
          // layerMap = JSON.parse(layerMap);
          // layerMap[node.type] = checked;
          // sessionStorage.setItem("layerMap",JSON.stringify(layerMap));
          break;
          case 114://杆塔，同时控制绝缘子和引流线

          default:
            break;
        }
      }

    }
  };
</script>

<style>
	.el-tree{
		margin-top: 22px;
		position: relative;
		cursor: default;
		background:none !important;
		color: #26fff7;
		font-size: 14px;
		margin-left: 28px;
  }
  .el-tree-node.is-current>.el-tree-node__content:hover {
  background-color: none !important;
}

  .el-checkbox__input.is-checked+.el-checkbox__label {
    background-color: none !important;

    color: black;
}
 .el-tree-node.is-current >.el-tree-node__content:hover{
	background-color: none !important;
}
</style>
