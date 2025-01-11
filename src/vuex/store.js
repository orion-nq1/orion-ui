import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      autoConnect: true,
    };
  },

  mutations: {
    setAutoConnect(state) {
      state.autoConnect = !state.autoConnect;
    }
  },

  actions: {
  },
});
