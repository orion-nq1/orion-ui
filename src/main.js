import 'solana-wallets-vue/styles.css'
import store from '@/store'; // Import your Vuex store

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'


import "./assets/css/tailwind.css";
import "./assets/css/main.css";

const app = createApp(App);
app.config.warnHandler = () => {};
app.use(router);
app.use(store); 


app.mount('#app');