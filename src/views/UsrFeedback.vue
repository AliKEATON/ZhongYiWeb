<template>
  <div class="app-container">
    <el-container direction="vertical">
      <!-- 引用 Header 组件 -->
      <Header @logout="Logout" />

      <el-container>
        <!-- 引用 Sidebar 组件 -->
        <Sidebar @toHome="toHome" @toHistory="toHistory" />

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

          <div class="survey-container">
            <h1>问卷反馈</h1>
            <el-form :model="surveyForm" label-width="300px">
              <el-form-item label="检测与你的体质相符吗？">
                <el-radio-group v-model="surveyForm.coldLimbs">
                  <el-radio label="相符"></el-radio>
                  <el-radio label="不太准确"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您手脚发凉吗？">
                <el-radio-group v-model="surveyForm.coldLimbs">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您胃脘部、背部或腰膝部怕冷吗？">
                <el-radio-group v-model="surveyForm.coldSensitivity">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您感到怕冷、衣服比别人穿得多吗？">
                <el-radio-group v-model="surveyForm.feelCold">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您比一般人耐受不了寒冷（冬天的寒冷，夏天的冷空调、电扇等）吗？">
                <el-radio-group v-model="surveyForm.coldIntolerance">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您比别人容易感冒吗？">
                <el-radio-group v-model="surveyForm.easilyCatchCold">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您吃（喝）凉的东西会感到不舒服或怕吃（喝）凉的吗？">
                <el-radio-group v-model="surveyForm.discomfortWithCold">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您受凉或吃（喝）凉的东西后，容易腹泻、拉肚子吗？">
                <el-radio-group v-model="surveyForm.diarrheaAfterCold">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您感到手脚心发热吗？">
                <el-radio-group v-model="surveyForm.feetPalmHeat">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="您感觉身体、脸上发热吗？">
                <el-radio-group v-model="surveyForm.bodyFaceHeat">
                  <el-radio label="没有"></el-radio>
                  <el-radio label="有时"></el-radio>
                  <el-radio label="经常"></el-radio>
                  <el-radio label="总是"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitSurvey">提交问卷</el-button>
              </el-form-item>
            </el-form>
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

const username = localStorage.getItem('username');
export default {
  components: {
    Header,
    Sidebar,
    elDescriptions: Descriptions,
    elDescriptionsItem: DescriptionsItem
  },
  data() {
    return {
      username: username,
      usrmessage: {},
      statis: {},
      surveyForm: {
        bodyFeel: "",
        coldLimbs: '',
        coldSensitivity: '',
        feelCold: '',
        coldIntolerance: '',
        easilyCatchCold: '',
        discomfortWithCold: '',
        diarrheaAfterCold: '',
        feetPalmHeat: '',
        bodyFaceHeat: '',
        willingToParticipate: false
      }
    };
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
    },
    submitSurvey() {
      // 通过put  请求将问卷数据提交给后端
      api.put("/Feedback/questionnaire", this.surveyForm);
    }
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
       this.statis = statisRes.data.data;
     })
     .catch(error => {
       console.error('请求失败:', error);
     });
  },
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

.survey-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #ffffff, #f0f8ff);
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-weight: bold;
  background: linear-gradient(to right, #4CAF50, #81C784);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding: 10px;
  border-radius: 8px;
}

.content-block {
  background-color: #ffffff;
  height: 150px;
  padding: 20px;
  padding-left: 50px;
  padding-right: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
}

.el-button--primary {
  background: linear-gradient(to right, #4CAF50, #81C784);
  border-color: transparent;
  transition: all 0.3s ease;
}

.el-button--primary:hover {
  background: linear-gradient(to right, #388E3C, #66BB6A);
  transform: scale(1.05);
}
</style>