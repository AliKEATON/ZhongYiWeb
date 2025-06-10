// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    username: ''
  },
  mutations: {
    SET_TOKEN(state, { token, username }) {
      state.token = token;
      state.username = username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username); // 存储 username 到 localStorage
    },
    LOGOUT(state) {
      state.token = null;
      state.username = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username'); // 移除 username
    }
  },
  actions: {
    login({ commit }, { token, username }) {
      commit('SET_TOKEN', { token, username });
    },
    logout({ commit }) {
      commit('LOGOUT');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
});
