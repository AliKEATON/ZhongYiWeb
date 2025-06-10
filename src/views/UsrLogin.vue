<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="name">
        <el-input type="text" placeholder="请输入账号" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="管理员模式">
        <el-switch
          v-model="isManager"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/utils/api';
import { mapActions } from 'vuex'; // 使用 Vuex 的 mapActions

export default {
  data() {
    return {
      loading: false,
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      // 新增管理员开关变量
      isManager: false
    };
  },
  methods: {
    ...mapActions(['login']), // 映射 Vuex 的 login action
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            // 根据管理员开关动态选择登录路径
            const loginPath = this.isManager ? '/auth/adminlogin' : '/auth/usrlogin';
            const response = await api.post(loginPath, {
              username: this.form.name,
              password: this.form.password
            })
            const result = response.data;

            if (result.success) {
              // 使用 Vuex 存储 token 和用户名
              this.login({ token: result.data.token, username: result.data.username });

              // 根据角色跳转路径
              const redirectPath = this.isManager ? '/admin' : '/home';
              this.$router.push(redirectPath);
            } else {
              this.$message.error(result.message || '账号或密码错误');
            }
          } catch (error) {
            console.error('登录失败:', error);
            this.$message.error('网络错误，请重试');
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning('请输入用户名和密码');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
.login-container {
  min-height: 98vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 背景图片设置 */
  background: 
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    url('@/assets/background1.jpg') center/cover no-repeat;
  background-attachment: fixed;
  position: relative;
}

.login-box {
  width: 350px;
  margin: 120px auto;
  border: 1px solid #DCDFE6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #DCDFE6;
  /* backdrop-filter: blur(5px); */
  background: rgba(255, 255, 255, 1); 
  border: 1px solid rgba(255, 255, 255, 1);
  z-index: 1;
  position: relative;
}

.login-title {
  text-align: center;
}
</style>