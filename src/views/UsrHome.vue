<template>
  <div class="app-container">
    <el-container>
      <el-header class="app-header">
          <i class="el-icon-s-home"></i>
          <span style="padding-left : 15px; font-weight: bold;">欢迎您使用中医体制检测系统！</span>
          <span style="padding-left : 1200px;" >
            <i class="el-icon-edit" style="padding-right: 20px;"></i>
            <i class="el-icon-share" style="padding-right: 20px;"></i>
            <i class="el-icon-delete" style="padding-right: 20px;"></i>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <i class="el-icon-switch-button" style="padding-left: 20px;"></i>
            <span @click="Logout">退出登录</span> 
          </span>
        </el-header>

      <el-container>
        <el-aside class="app-aside">
          <div class="aside-item" >检测报告</div>
          <div class="aside-item" @click="toHistory">用户历史</div>
          <div class="aside-item" @click="toFeedback">问卷反馈</div>
        </el-aside>

        <el-main class="app-main">
          <div class="content-block">
            <el-image class="user-image" :src="url" :fit="fit"></el-image>
            <div> 
              <p>姓名：{{ usrmessage.username }}</p>
              <p>身高：{{ usrmessage.height }} cm</p>
            </div>
            <div> 
              <p>性别：{{ usrmessage.gender }}</p>
              <p>体重：{{ usrmessage.weight }} kg</p>
            </div>
            <div> 
              <p>检测时间：{{ usrmessage.createtime }}</p>
              <p>状态：{{ usrmessage.finalCorporeity }}</p>
            </div>
          </div>
          <br>
          <div style="background-color: #ffffff; padding: 20px;">
            <el-table :data="tableData" height="500px" cell-style="font-size: 18px;" header-cell-style="font-size: 20px;" >
            <el-table-column prop="analyze" label="体制解析" width="350px"></el-table-column>
            <el-table-column prop="expression" label="体制表现" width="350px"></el-table-column>
            <el-table-column prop="sick" label="患病倾向" width="350px"></el-table-column>
            <el-table-column prop="eat" label="建议"></el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import api from '@/utils/api';

export default {
  data() {
    return {
      url: '',
      fit: 'fill',
      tableData: [],
      usrmessage: {}
    };
  },
  mounted() {
    api.get("http://127.0.0.1:4523/m1/6494085-6194282-default/home/data")
      .then(resp => {
        this.tableData = [resp.data.data];
        this.usrmessage = resp.data.data;
        this.url = this.usrmessage.faceImg;
      });
  },
  methods: {
    toHome() {
      this.$router.push('/home');
    },
    toHistory() {
      this.$router.push('/history');
    },
    toFeedback() {
      this.$router.push('/feedback');
    },
    Logout() {
      this.$store.dispatch('logout'); // 调用 Vuex 的 logout action
      this.$router.push('/Usrlogin');
    }
  }
};
</script>

<style scoped>
.app-container {
  height: 98vh;
}

.el-container {
  height: 100%;
}

.app-aside {
  width: 200px;
  background-color: #ffffff;
}

.aside-item {
  text-align: center;
  padding: 15px;
  height: 29px;
  border-bottom: 1px solid skyblue;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: white;
}

.aside-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.app-header {
  /* background-color: #B3C0D1; */
  background-color: #ffffff;
  font-size: 18px;
  color: #333;
  line-height: 60px;
}

.app-main {
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 30px;
  background-color: rgba(0, 0, 0, 0.1);
}

.content-block {
  background-color: #ffffff;
  height: 200px;
  padding-left: 70px;
  align-items: center;
  display: flex;
  gap: 50px;
}

.user-image {
  width: 100px;
  height: 125px;
}


</style>