<template>
    <el-container class="tcm-admin-home">
      <!-- 引用 Header 组件 -->
      <Header @logout="Logout" />

      <el-main class="main-content">
        
        <!--性别分析 -->
        <el-row :gutter="20" class="analysis-row">
          <el-col :span="12">
            <el-card>
              <template slot="header">
                <h3>男性体质分布</h3>
              </template>
              <div ref="maleChart" style="height: 300px;"></div>
            </el-card>
          </el-col>
          
          <el-col :span="12">
            <el-card>
              <template slot="header">
                <h3>女性体质分布</h3>
              </template>
              <div ref="femaleChart" style="height: 300px;"></div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 年份选择器 -->
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :span="4" :offset="20">
            <el-select v-model="selectedYear" placeholder="请选择年份" @change="handleYearChange">
              <el-option
                v-for="year in availableYears"
                :key="year"
                :label="year + '年'"
                :value="year">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <!-- 某年每月各体质人数变化折线图 -->
        <el-row :gutter="20" class="chart-row">
          <el-col :span="24">
            <el-card>
              <template slot="header">
                <h3>某年每月各体质人数变化折线图</h3>
              </template>
              <div ref="lineChart" style="height: 300px;"></div>
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
          <el-menu-item index="questionnare">问卷面板</el-menu-item>
        </el-menu>
      </el-footer>

    </el-container>
</template>

<script>
import * as echarts from 'echarts';
import api from '@/utils/api';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      activeMenu: 'gender_analysis',
      
      maleData: [],
      femaleData: [],
      maleChart: null,
      femaleChart: null,
      lineData: [],
      lineChart: null,

      selectedYear: new Date().getFullYear(), // 默认当前年
      availableYears: (() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 5 }, (_, i) => currentYear - 4 + i); // 最近五年
      })()
    }
  },
  methods: {
    // 这里可以添加路由跳转逻辑
    handleMenuSelect(index) {
      this.activeMenu = index
      if (index === 'dashboard') {
        this.$router.push('/Admin') // 跳转到 Admingender.vue
      } else if (index === 'questionnare') {
        this.$router.push('/admin/questionnare') // 跳转到 AdminFeedback.vue
      }
    },
    initGenderCharts() {
      this.maleChart = echarts.init(this.$refs.maleChart)
      this.maleChart.setOption(this.getGenderChartOption('男性'))
      
      this.femaleChart = echarts.init(this.$refs.femaleChart)
      this.femaleChart.setOption(this.getGenderChartOption('女性'))
      
      this.lineChart = echarts.init(this.$refs.lineChart)
      this.lineChart.setOption(this.getLineChartOption())
      
      window.addEventListener('resize', () => {
        this.maleChart.resize()
        this.femaleChart.resize()
        this.lineChart.resize()
      })
    },
    getGenderChartOption(gender) {
      const isMale = gender === '男性'
      const chartData = isMale ? this.maleData : this.femaleData
  
      return {
        tooltip: {
        trigger: 'item'
        },
        legend: {
        top: '5%',
        left: 'center'
        },
        series: [
          {
            name: '体质分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '18',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: chartData.map(item => ({
                name: item.type,
                value: item.value
            }))
          }
        ]
      }
    },
    getLineChartOption() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.lineData.map(item => item.count),
          type: 'line',
          smooth: true
        }]
      }
    },

    async handleYearChange(year) {
      try {
        const response = await api.get(`http://127.0.0.1:4523/m1/6494085-6194282-default/admin/selectYear?year=${year}`);
        this.lineData = response.data.data || [];
        this.lineChart.setOption(this.getLineChartOption());
      } catch (error) {
        console.error('获取年度数据失败:', error);
      }
    },

    Logout() {
      this.$store.dispatch('logout'); // 调用 Vuex 的 logout action
      this.$router.push('/Usrlogin');
    }
  },
  mounted() {
    // 并发执行3个get请求
    Promise.all([
        api.get('http://127.0.0.1:4523/m1/6494085-6194282-default/admin/male'),
        api.get('http://127.0.0.1:4523/m1/6494085-6194282-default/admin/male'),
        api.get(`http://127.0.0.1:4523/m1/6494085-6194282-default/admin/selectYear?year=${this.selectedYear}`)
    ]).then(([resp2, resp3, resp4]) => {
            this.maleData = resp2.data.data;
            this.femaleData = resp3.data.data;
            this.lineData = resp4.data.data;
            this.$nextTick(() => {
                this.initGenderCharts()
        })
    }).catch(error => {
        console.error('请求失败:', error);
    });
  },
  beforeDestroy() {
    // 销毁图表实例
    this.maleChart && this.maleChart.dispose()
    this.femaleChart && this.femaleChart.dispose()
    this.lineChart && this.lineChart.dispose()
    
    // 移除事件监听
    window.removeEventListener('resize', this.handleResize)
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

.header h1 {
  margin-bottom: 10px;
  color: #333;
}

.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  height: 100%;
}

.el-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-card__header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}
</style>