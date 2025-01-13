<template>
  <header class="w-full text-white">
    <div class="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-4">
        <div class="flex items-center">
            <a href="/" class="text-xl font-bold">
                <img src="@/assets/imgs/logo.png" alt="logo" class="w-6 h-auto">
            </a>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6 text-xs font-semibold">
            <router-link to="/" class="text-gray-300 hover:text-white">Home</router-link>
            <router-link to="/" class="text-gray-300 hover:text-white">About</router-link>
            <router-link to="/" class="text-gray-300 hover:text-white">Services</router-link>
        </nav>
      </div>

      <!-- Connect Wallet Button -->
      <button 
        v-if="!connected" 
        @click.stop="openLoginModal" 
        class="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-semibold border border-slate-700"
      >
        Sign Up
      </button>
      <WalletMultiButton v-else />
    </div>

    <!-- Login Modal -->
    <Login 
      id="login-modal"
      :modal-open="showLoginModal"
      :is-processing="isProcessing"
      v-model:active-tab="activeTab"
      @close-modal="handleCloseModal"
    >
      <div class="p-5 relative" @click.stop>
        <!-- Loading overlay -->
        <div v-if="isProcessing" class="absolute inset-0 bg-gray-900/50 z-10 flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>

        <!-- Not Connected State -->
        <div v-if="!connected">
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Connect your wallet to get started
          </p>
          
          <WalletMultiButton 
            class="w-full" 
            :disabled="isProcessing"
          />
        </div>

        <!-- Connected State -->
        <div v-else>
          <!-- Sign Up Tab Content -->
          <div v-if="activeTab === 'signup'">
            <p class="text-gray-600 dark:text-gray-300 mb-4 font-normal">
              Enter optional referral code to continue
            </p>
            
            <!-- Referral Code Input -->
            <div class="mb-4">
              <label for="referralCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Referral Code (Optional)
              </label>
              <input
                v-model="referralCode"
                type="text"
                id="referralCode"
                :disabled="isProcessing"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       text-gray-900 dark:text-gray-100 
                       bg-white dark:bg-gray-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       placeholder-gray-400 dark:placeholder-gray-500
                       disabled:opacity-50"
                placeholder="Enter referral code"
              >
            </div>

            <div class="w-fit">
                <button 
                @click="handleSignup"
                :disabled="isProcessing"
                class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                Sign Up
                </button>
            </div>
          </div>

          <!-- Login Tab Content -->
          <div v-else>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Click below to login with your wallet
            </p>

            <div class="w-fit">
                <button 
                @click="handleLogin"
                :disabled="isProcessing"
                class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                Login
                </button>
            </div>
          </div>
        </div>
      </div>
    </Login>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import { store } from '@/store/store';
import { referralApi } from '@/utils/utils';
import Login from '@/modals/Login.vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const { connected, connect, disconnect, signMessage, publicKey } = useWallet()
const showLoginModal = ref(false);
const referralCode = ref('');
const isProcessing = ref(false);
const activeTab = ref('signup');

// Check for stored referral code on mount
onMounted(async () => {
  const storedCode = localStorage.getItem('referralCode');
  if (storedCode) {
    // If user is connected, disconnect them first
    if (publicKey) {
      await disconnect();
      // Wait a bit for disconnect to complete
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    referralCode.value = storedCode;
    localStorage.removeItem('referralCode');
    showLoginModal.value = true;
    activeTab.value = 'signup'; // Ensure we're on signup tab
  }
});

function openLoginModal() {
    showLoginModal.value = true;
}

function handleCloseModal() {
    showLoginModal.value = false;
    isProcessing.value = false;
}

async function handleSignup() {
    if (!publicKey.value || isProcessing.value) return;
    
    try {
        isProcessing.value = true;
        const response = await referralApi.signup(signMessage.value, publicKey.value, referralCode.value);
        if (response.success) {
            store.state.isLoggedIn = true;
            showLoginModal.value = false;
            router.push({ name: 'dashboard' });
            toast.success('Signup successful', {
                autoClose: 3000,
                position: 'bottom-right',
                theme: 'dark',
            });
        }
    } catch (error) {
        console.error('Signup failed:', error);
        store.state.isLoggedIn = false;
        toast.error('Signup failed', {
            autoClose: 3000,
            position: 'bottom-right',
            theme: 'dark',
        });
    } finally {
        isProcessing.value = false;
    }
}

async function handleLogin() {
    if (!publicKey.value || isProcessing.value) return;
    
    try {
        isProcessing.value = true;
        const response = await referralApi.login(signMessage.value, publicKey.value);
        if (response.success) {
            store.state.isLoggedIn = true;
            showLoginModal.value = false;
            router.push({ name: 'dashboard' });
            toast.success('Login successful', {
                autoClose: 3000,
                position: 'bottom-right',
                theme: 'dark',
            });
        }
    } catch (error) {
        console.error('Login failed:', error);
        store.state.isLoggedIn = false;
        toast.error('Login failed', {
            autoClose: 3000,
            position: 'bottom-right',
            theme: 'dark',
        });
    } finally {
        isProcessing.value = false;
    }
}

// Watch for wallet disconnection
watch(connected, (isConnected) => {
    if (!isConnected) {
        isProcessing.value = false;
        store.state.isLoggedIn = false;
    }
});
</script>

<script>
export default {
  name: 'HeaderComponent'
}
</script>