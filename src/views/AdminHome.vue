<template>
    <el-container class="tcm-admin-home">
      <!-- 引用 Header 组件 -->
      <Header @logout="Logout" />

      <el-main class="main-content">
        <!-- 图表 -->
        <el-row :gutter="20" class="chart-row">
          <el-col :span="12">
            <el-card class="chart-card">
              <template slot="header">
                <h3>体质柱形图</h3>
              </template>
              <div ref="barChart" style="height: 537px;"></div>
            </el-card>
          </el-col>
          
          <el-col :span="12">
            <el-card class="chart-card">
              <template slot="header">
                <h3>体质测试榜单</h3>
              </template>
              <el-table :data="rankingData" style="width: 100%" border>
                <el-table-column prop="rank" label="排名" width="80" align="center" />
                <el-table-column prop="type" label="体质类型" width="120" />
                <el-table-column prop="count" label="人数" width="100" align="center" />
                <el-table-column prop="percentage" label="占比" align="center">
                  <template slot-scope="{ row }">
                    <el-progress 
                      :percentage="(row.count / row.total) * 100" 
                      :show-text="false"
                      :color="getProgressColor(row.type)"
                    />
                    {{ ((row.count / row.total) * 100).toFixed(1) }}%
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <!-- 底部部标题和导航 -->
      <el-footer class="header">
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
      activeMenu: 'dashboard',
      rankingData: [],
      barChart: null,
    }
  },
  methods: {
    // 这里可以添加路由跳转逻辑
    handleMenuSelect(index) {
      this.activeMenu = index
      if (index === 'gender_analysis') {
        this.$router.push('/admin/gender') // 跳转到 Admingender.vue
      } else if (index === 'questionnaire') {
        this.$router.push('/admin/questionnare') // 跳转到 AdminFeedback.vue
      }
    },
    getProgressColor(type) {
      const colors = {
        '阴虚质': '#f56c6c',
        '平和质': '#67c23a',
        '阳虚质': '#e6a23c',
        '气郁质': '#73c0de',
        '湿热质': '#b88230',
        '气虚质': '#a6a9ad',
        '痰湿质': '#9a60b4',
        '血瘀质': '#f78989',
        '特禀质': '#d4237a'
      }
      return colors[type] || '#409eff'
    },
    initBarChart() {
      this.barChart = echarts.init(this.$refs.barChart)
      console.log("rankingData",this.rankingData)
      const chartData = this.rankingData.slice(0, 8)
      console.log("111",chartData)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: chartData.map(item => item.type),
          axisLabel: {
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          max: 125,
          interval: 25,
          name: '人数',
          nameLocation: 'top',
          nameTextStyle: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        series: [{
          data: chartData.map(item => item.count),
          type: 'bar',
          barWidth: '40%',
          itemStyle: {
            color: (params) => {
              const colorList = ['#fac858', '#91cc75', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
              return colorList[params.dataIndex]
            }
          }
        }]
      }
      this.barChart.setOption(option)
      
      window.addEventListener('resize', () => this.barChart.resize())
    },
    Logout() {
      this.$store.dispatch('logout'); // 调用 Vuex 的 logout action
      this.$router.push('/Usrlogin');
    }
  },
  mounted() {
    // 并发执行三个get请求
        api.get('http://127.0.0.1:4523/m1/6494085-6194282-default/admin/rankdata').then((resp1) => {
            this.rankingData = resp1.data.data;
            this.$nextTick(() => {
                this.initBarChart()
        })
    }).catch(error => {
        console.error('请求失败:', error);
    });
  },
  beforeDestroy() {
    // 销毁图表实例
    this.barChart && this.barChart.dispose()
    
    // 移除事件监听
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.tcm-admin-home {
  padding: 20px;
  background-color: #f5f7fa; 
  background-size: cover;
  min-height: 100vh;
}
/* .tcm-admin-home {
  padding: 20px;
  position: relative;
  min-height: 100vh;
  background: url('@/assets/background2.jpg') center/cover no-repeat fixed;
}

.tcm-admin-home::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  filter: blur(100px); 
  z-index: -1; 
} */


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