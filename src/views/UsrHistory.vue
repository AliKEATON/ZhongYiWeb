<template>
  <div class="app-container">
    <el-container direction="vertical">
      <!-- 引用 Header 组件 -->
      <Header @logout="Logout" />

      <el-container>
        <!-- 引用 Sidebar 组件 -->
        <Sidebar @toHome="toHome" @toFeedback="toFeedback" />

        <el-main class="app-main">
          <div class="content-block">
            <el-descriptions class="margin-top" title="用户检测统计" :column="3" size="" border>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  用户名
                </template>
                {{ usrmessage.username }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  用户ID
                </template>
                {{ usrmessage.id }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  总检测次数
                </template>
                {{ statis.count }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  主要体质
                </template>
                {{ statis.somatotype }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  班级
                </template>
                {{ usrmessage.classname }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <br>
          <div style="background-color: #ffffff; height: 500px; align-items: center; padding: 30px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <template>
              <el-table :data="tableData" height=100% border style="width: 100%">
                <el-table-column prop="createtime" label="检测日期" width="180"></el-table-column>
                <el-table-column prop="username" label="姓名" width="180"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="height" label="身高（cm）"></el-table-column>
                <el-table-column prop="weight" label="体重（kg）"></el-table-column>
                <el-table-column prop="finalCorporeity" label="体质"></el-table-column>
                <el-table-column prop="eat" label="建议"></el-table-column>
              </el-table>
            </template>
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
import { Descriptions, DescriptionsItem } from 'element-ui';

export default {
  components: {
    Header,
    Sidebar,
    elDescriptions: Descriptions,
    elDescriptionsItem: DescriptionsItem
  },
  data() {
    return {
      url: '',
      fit: 'fill',
      tableData: [],
      usrmessage: {},
      statis: {},
    };
  },
  mounted() {
   // 并发执行两个 GET 请求
   Promise.all([
     api.get('http://127.0.0.1:4523/m1/6494085-6194282-default/history/data'),
     api.get('http://127.0.0.1:4523/m1/6494085-6194282-default/history/statis')
   ])
     .then(([dataRes, statisRes]) => {
       this.tableData = dataRes.data.data;
       this.usrmessage= dataRes.data.data[0];
       this.url = this.usrmessage.faceImg;
       this.statis = statisRes.data.data;
     })
     .catch(error => {
       console.error('请求失败:', error);
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
}
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

.content-block {
  background-color: #ffffff;
  height: 150px;
  padding: 20px;
  padding-left: 50px;
  padding-right: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>