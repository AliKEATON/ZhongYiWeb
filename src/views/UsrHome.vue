<template>
  <div class="app-container">
    <el-container direction="vertical">
      <!-- 引用 Header 组件 -->
      <Header @logout="Logout" />

      <el-container>
        <!-- 引用 Sidebar 组件 -->
        <Sidebar @toHistory="toHistory" @toFeedback="toFeedback" />

        <el-main class="app-main">
          <div style="background-color: #ffffff; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); display: flex; gap: 80px; padding-left: 80px;">
            <el-image class="user-image" :src="url" :fit="fit"></el-image>
            <el-descriptions title="基本信息" :column="3" border size="medium">
              <el-descriptions-item label="姓名" label-class-name="my-label">{{ usrmessage.username}}</el-descriptions-item>
              <el-descriptions-item label="身高">{{ usrmessage.height }}</el-descriptions-item>
              <el-descriptions-item label="体重">{{ usrmessage.weight }}</el-descriptions-item>
              <el-descriptions-item label="性别">{{ usrmessage.gender }}</el-descriptions-item>
              <el-descriptions-item label="状态" :contentStyle="{'text-align': 'right'}">{{ usrmessage.finalCorporeity }}</el-descriptions-item>
              <el-descriptions-item label="检测时间">{{ usrmessage.createtime }}</el-descriptions-item>
            </el-descriptions>
          </div>

          <br>
          <div style="background-color: #ffffff; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <el-table :data="tableData" height="550px" cell-style="font-size: 18px;" header-cell-style="font-size: 20px;" border stripe>
              <el-table-column prop="analyze" label="体制解析" width="350px">
                <template #default="{ row }">
                  <div class="cell-content">{{ row.analyze }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="expression" label="体制表现" width="350px">
                <template #default="{ row }">
                  <div class="cell-content">{{ row.expression }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="sick" label="患病倾向" width="350px">
                <template #default="{ row }">
                  <div class="cell-content">{{ row.sick }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="eat" label="建议">
                <template #default="{ row }">
                  <div class="cell-content">{{ row.eat }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import api from '@/utils/api';
// 引入 Header 和 Sidebar 组件
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Header,
    Sidebar
  },
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

.app-main {
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 30px;
  background-color: #f5f7fa;
}

.user-image {
  width: 100px;
  height: 120px;
  border-radius: 10%;
  border: 2px solid #00a2ff;
  padding: 2px; 
  background: #f0f0f0;
}

.my-label {
    background: #E1F3D8;
  }

.cell-content {
  display: flex;
  align-items: center; /* 垂直居中 */
  height: 500px; /* 固定高度 */
  overflow: auto; /* 内容超出时显示滚动条 */
  white-space: pre-wrap;
  word-break: break-word;
  padding: 8px;
  line-height: 1.5;
}
</style>