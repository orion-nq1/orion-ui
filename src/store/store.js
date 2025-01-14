import { createStore } from 'vuex';
import { referralApi } from '@/utils/referralUtils';

// Load initial state from localStorage
const savedState = localStorage.getItem('store') 
  ? JSON.parse(localStorage.getItem('store'))
  : {
      autoConnect: true,
      isLoggedIn: false,
      referralCode: null,
      userInfo: null,
      isLoadingUser: false,
      userError: null
    };

export const store = createStore({
  state() {
    return savedState;
  },

  mutations: {
    setAutoConnect(state) {
      state.autoConnect = !state.autoConnect;
    },
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setReferralCode(state, value) {
      state.referralCode = value;
    },
    setUserInfo(state, value) {
      state.userInfo = value;
    },
    setIsLoadingUser(state, value) {
      state.isLoadingUser = value;
    },
    setUserError(state, value) {
      state.userError = value;
    }
  },

  actions: {
    setIsLoggedIn(context, value) {
      context.commit('setIsLoggedIn', value);
    },
    setReferralCode(context, value) {
      context.commit('setReferralCode', value);
    },
    async fetchUserInfo({ commit }, publicKey) {
      if (!publicKey) return;

      try {
        commit('setIsLoadingUser', true);
        commit('setUserError', null);
        const data = await referralApi.getUserInfo(publicKey);
        console.log('user info', data);
        commit('setUserInfo', data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        commit('setUserError', error.message);
      } finally {
        commit('setIsLoadingUser', false);
      }
    }
  },

  getters: {
    getUserInfo: state => state.userInfo,
    isLoadingUser: state => state.isLoadingUser,
    userError: state => state.userError
  }
});

// Subscribe to store mutations to save state to localStorage
store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});
