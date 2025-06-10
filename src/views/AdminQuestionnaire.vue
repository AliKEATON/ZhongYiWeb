<template>
    <el-container class="tcm-admin-home">
      <!-- 引用 Header 组件 -->
      <Header @logout="Logout" />

      <el-main class="main-content">
        <!-- 根据班级号和问卷号查询 -->
         <!-- 班级与问卷选择器 -->
          <el-row :gutter="20" style="margin-bottom: 20px;">
            <el-col :span="6">
              <el-select v-model="selectedClassId" placeholder="请选择班级号" @change="fetchQuestionnaireStatus">
                <el-option
                  v-for="cls in availableClasses"
                  :key="cls.class_id"
                  :label="'班级 ' + cls.class_id"
                  :value="cls.class_id">
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="6">
              <el-select v-model="selectedQuestionnaireId" placeholder="请选择问卷ID" @change="fetchQuestionnaireStatus">
                <el-option
                  v-for="q in availableQuestionnaires"
                  :key="q.questionnaire_id"
                  :label="'问卷ID ' + q.questionnaire_id"
                  :value="q.questionnaire_id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <!-- 学生填写情况表格 -->
          <el-row :gutter="20">
            <el-col :span="24">
              <el-card>
                <template slot="header">
                  <h3>学生问卷填写情况</h3>
                </template>
                <div class="table-wrapper">
                  <el-table :data="studentQuestionnaireData" border style="width: 100%">
                  <el-table-column prop="stu_id" label="学号"></el-table-column>
                  <el-table-column prop="stu_name" label="姓名"></el-table-column>
                  <el-table-column label="是否填写">
                    <template slot-scope="{ row }">
                      <span v-if="row.is_filled" style="color: green;">✓</span>
                      <span v-else style="color: red;">×</span>
                    </template>
                  </el-table-column>
                </el-table>
                </div>
              </el-card>
            </el-col>
          </el-row>
          
      </el-main>

      <!-- 底部部标题和导航 -->
      <el-footer class="header">
        <!-- <h1>中医体质检测系统</h1> -->
        <el-menu mode="horizontal" :default-active="activeMenu" @select="handleMenuSelect">
          <el-menu-item index="dashboard">仪表盘</el-menu-item>
          <el-menu-item index="gender_analysis">性别分析</el-menu-item>
          <el-menu-item index="questionnaire">问卷面板</el-menu-item>
        </el-menu>
      </el-footer>

    </el-container>
</template>

<script>
import api from '@/utils/api';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      activeMenu : 'questionnaire',

      selectedClassId: '',
      selectedQuestionnaireId: '',
      availableClasses: [], // 示例数据，应从API获取
      availableQuestionnaires: [], // 示例数据，应从API获取
      studentQuestionnaireData: []
    }
  },
  methods: {
    // 这里可以添加路由跳转逻辑
    handleMenuSelect(index) {
      this.activeMenu = index
      if (index === 'dashboard') {
        this.$router.push('/Admin') // 跳转到 Admingender.vue
      } else if (index === 'gender_analysis') {
        this.$router.push('/admin/gender') // 跳转到 Admingender.vue
      }
    },
    async fetchQuestionnaireStatus() {
      if (!this.selectedClassId || !this.selectedQuestionnaireId) {
        this.studentQuestionnaireData = [];
        return;
      }

      try {
        const response = await api.get(
          // `http://127.0.0.1:4523/m1/6494085-6194282-default/admin/questionnaire-status?class_id=${this.selectedClassId}&questionnaire_id=${this.selectedQuestionnaireId}`
          'http://127.0.0.1:4523/m1/6484613-6184374-default/admin/questionnaire'
        );
        
        this.studentQuestionnaireData = response.data.data.map(student => ({
          stu_id: student.stu_id,
          stu_name: student.stu_name,
          is_filled: student.is_filled // boolean: true/false
        }));
      } catch (error) {
        console.error('获取问卷填写状态失败:', error);
      }
    },

    Logout() {
      this.$store.dispatch('logout'); // 调用 Vuex 的 logout action
      this.$router.push('/Usrlogin');
    }
  },
  mounted() {
    Promise.all([
      api.get('http://127.0.0.1:4523/m1/6484613-6184374-default/admin/classes'),
      api.get('http://127.0.0.1:4523/m1/6484613-6184374-default/admin/questionnaires')
    ]).then(([classesRes, questionnairesRes]) => {
      this.availableClasses = classesRes.data.data || [];
      this.availableQuestionnaires = questionnairesRes.data.data || [];
    });
  }
  
}
</script>

<style scoped>
.tcm-admin-home {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.table-wrapper {
  max-height: 480px; /* Set a fixed height */
  overflow-y: auto;   /* Enable vertical scroll if needed */
}

</style>