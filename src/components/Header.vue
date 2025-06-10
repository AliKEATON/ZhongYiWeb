<template>
  <el-header class="app-header">
    <i class="el-icon-s-home"  style="color: #00a2ff;"></i>
    <span style="padding-left: 15px; font-weight: bold;">欢迎您使用中医体制检测系统！</span>
    <span style="padding-left: 1200px;">
      <i class="el-icon-edit" style="padding-right: 20px;"></i>
      <i class="el-icon-share" style="padding-right: 20px;"></i>
      <i class="el-icon-delete" style="padding-right: 20px;"></i>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <i class="el-icon-switch-button" style="padding-left: 20px;" @click="$emit('logout')"></i>
      <span @click="$emit('logout')" class="hover-red">退出登录</span>
    </span>
  </el-header>
</template>

<script>
export default {
  name: 'AppHeader'
};
</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  font-size: 18px;
  color: #333;
  line-height: 60px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  /* box-shadow: 0 2px 4px #333; */
}
.hover-red {
  cursor: pointer; /* 改变鼠标指针为手型 */
}

.hover-red:hover {
  color: red; /* 鼠标悬停时文本变为红色 */
}
</style>