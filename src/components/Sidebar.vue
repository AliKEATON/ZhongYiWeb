<template>
  <el-aside class="app-aside">
    <div class="aside-item" @click="$emit('toHome')">
      <i class="el-icon-s-order" style="padding-right: 20px; "></i>
      检测报告
    </div>
    <div class="aside-item" @click="$emit('toHistory') ">
      <i class="el-icon-date" style="padding-right: 20px; "></i>
      用户历史
    </div>
    <div class="aside-item" @click="$emit('toFeedback')">
      <i class="el-icon-s-promotion" style="padding-right: 20px; "></i>
      问卷反馈
    </div>
  </el-aside>
</template>

<script>
export default {
  name: 'AppSidebar'
};
</script>

<style scoped>
.app-aside {
  width: 200px;
  height: 830px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px #333;
}

.aside-item {
  text-align: center;
  padding: 15px;
  height: 29px;
  cursor: pointer; /* 改变鼠标指针为手型 */
  transition: background-color 0.3s;
  background-color: white;
  /* border-radius: 5px; */
  box-shadow: 0 2px 4px #333;
}

.aside-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #00a2ff; /* 鼠标悬停时文本变色 */
}

</style>