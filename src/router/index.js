import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'; // 导入 Vuex store

Vue.use(Router);

const routes = [
  {
    //登录页
    path: '/Usrlogin',
    name: 'Usrlogin',
    component: () => import('@/views/UsrLogin.vue')
  },
  {
    //首页
    path: '/home',
    name: 'UsrHome',
    component: () => import('@/views/UsrHome.vue'),
    // meta: { requireAuth: true }
  },
  {
    // 用户历史页
    path: '/history',
    name: 'UsrHistory',
    component: () => import('@/views/UsrHistory.vue'),
    // meta: { requireAuth: true }
  },
  {
    // 反馈页
    path: '/feedback',
    name: 'UsrFeedback',
    component: () => import('@/views/UsrFeedback.vue'),
    // meta: { requireAuth: true }
  },
  {
    // 管理员首页
    path: '/admin',
    name: 'dminhome',
    component: () => import('@/views/AdminHome.vue'),
    // meta: { requireAuth: true }
  },
  {
    // 管理员性别分析看板
    path: '/admin/gender',
    name: 'dmingender',
    component: () => import('@/views/AdminGender.vue'),
    // meta: { requireAuth: true }
  },
  {
    // 管理员问卷分析看板
    path: '/admin/questionnare',
    name: 'dminquestionnare',
    component: () => import('@/views/AdminQuestionnaire.vue'),
    // meta: { requireAuth: true }
  },
  {
    // 重定向到登录页
    path: '/',
    redirect: '/Usrlogin'
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth);

  if (requiresAuth && !store.getters.isAuthenticated) {
    next({ name: 'Usrlogin' });
  } else {
    next();
  }
});

export default router;