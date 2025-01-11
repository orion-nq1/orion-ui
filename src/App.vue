<script setup>
import { ref, onMounted } from 'vue';
import store from './vuex';
import 'solana-wallets-vue/styles.css';
import 'vue3-toastify/dist/index.css';
import { initWallet } from 'solana-wallets-vue';
import {

  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const wallets = [
  new LedgerWalletAdapter(),
];

initWallet({ wallets, autoConnect: store.state.autoConnect });


</script>
<template>
  <router-view />
</template>


