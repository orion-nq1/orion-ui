<script setup>
import store from '@/store';
import 'solana-wallets-vue/styles.css';
import 'vue3-toastify/dist/index.css';
import { initWallet, useWallet } from 'solana-wallets-vue';
import {
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// First, define wallets
const wallets = [
  new LedgerWalletAdapter(),
];

// Then initialize wallet
initWallet({ wallets, autoConnect: store.state.autoConnect });

// Only after initialization, use the wallet
const { publicKey } = useWallet();

// Watch for public key changes
watch(publicKey, async (newPublicKey) => {
  const wasLoggedIn = store.state.isLoggedIn;
  store.state.isLoggedIn = !!newPublicKey;
  
  if (newPublicKey) {
    // Fetch user info when wallet connects
    await store.dispatch('fetchUserInfo', newPublicKey.toString());
  } else {
    // Clear user info when wallet disconnects
    store.commit('setUserInfo', null);
    
    // Handle logout
    if (wasLoggedIn) {
      router.push({ name: 'connectWallet' });
    }
  }
  // Login redirect will be handled after successful API signup
});
</script>

<template>
  <router-view />
</template>
