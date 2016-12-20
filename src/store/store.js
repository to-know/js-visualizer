import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  code: null,
  codeI: 0
};

const mutations = {
  UPDATE_CODE_I(state, { i }) {
    state.codeI = i;
  },
  UPDATE_CODE(state, { code }) {
    state.code = code;
  }
};

const actions = {
  getCode: ({ commit }) => {
    Vue.http.get('/test').then((res) => {
      commit('UPDATE_CODE', {
        code: JSON.parse(res.body)
      });
      commit('UPDATE_CODE_I', { i: 1 });
    });
  },
  updateCodeI: ({ commit }, i) => {
    if (state.code && i < state.code.trace.length && i >= 0) {
      commit('UPDATE_CODE_I', { i });
    }
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});