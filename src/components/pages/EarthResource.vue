<template>
  <div class="earthresource">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</template>
<script>
export default {
  name: "earthresource",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.earthresource {
  width: 100%;
  height: 100%;
}
.box {
  float: left;
  width: 90%;
  height: 22%;
  background-color: #fff;
  border: 1px solid rgb(59, 59, 59);
  box-shadow: 2px 2px 2px rgb(85, 84, 84), 2px -2px 2px rgb(80, 80, 80),
    -2px 2px 2px rgb(61, 59, 59), -2px -2px 2px rgb(83, 83, 83);
  margin: 5% 5%;
}
</style>
