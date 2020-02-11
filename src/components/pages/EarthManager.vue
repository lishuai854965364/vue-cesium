<template>
  <div class="viewposition">
    <div style="width:135px;height:30px;float:left;margin-left:10px;margin-top: 5px;">
      <font>
        经度：
        <span id="longitude_show" style="color:white"></span>
      </font>
    </div>
    <div style="width:135px;height:30px;float:left;margin-top: 5px;">
      <font>
        纬度：
        <span id="latitude_show" style="color:white"></span>
      </font>
    </div>
    <div style="width:150px;height:30px;float:left;margin-top: 5px;">
      <font>
        高度：
        <span id="height_show" style="color:white"></span>
        <!-- <span>米</span> -->
      </font>
    </div>
  </div>
</template>
<script>
export default {
  name: "earthManager",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.viewposition {
  width: 436px;
  height: 35px;
  background-color: #030a67;
  border: solid 1px #009cff;
  font {
    font-size: 18px;
    color: #26e1ff;
  };

}
</style>
<style lang="less">
</style>