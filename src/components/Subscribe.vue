<template>
    <div class="w-full rounded-3xl border border-slate-800 p-4 flex flex-col gap-6">
        <div class="rounded-xl bg-slate-800 p-4">
            <div class="flex gap-4">
                <div class="flex w-fit pt-2">
                    <img src="@/assets/imgs/sol.png" alt="sol" class="w-12 h-12 invert"/>
                </div>
                <div class="flex flex-col w-full">
                    <h3 class="text-lg font-bold text-white">Pay with Solana</h3>
                    <p class="text-xs text-slate-400">Use your phantom wallet to pay for your subscription with a quick & easy WEB3 payment.</p>
                </div>
            </div>
        </div>

        <!-- Subscription Details -->
        <div class="flex flex-col gap-2">
            <h3 class="text-lg font-bold text-white">Subscription Details</h3>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center">
                    <p class="text-xs text-slate-400">Status</p>
                    <div class="flex items-center gap-2">
                        <div 
                            class="w-2 h-2 rounded-full"
                            :class="{
                                'bg-green-500': userInfo?.subscriptionStatus === 'ACTIVE',
                                'bg-red-500': userInfo?.subscriptionStatus === 'INACTIVE' || userInfo?.subscriptionStatus === 'EXPIRED'
                            }"
                        ></div>
                        <span class="text-xs text-slate-400">
                            {{ userInfo?.subscriptionStatus || 'INACTIVE' }}
                        </span>
                    </div>
                </div>
                <div class="flex justify-between">
                    <p class="text-xs text-slate-400">Price</p>
                    <p class="text-xs text-slate-400">$97/month</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-xs text-slate-400">Next payment</p>
                    <p class="text-xs text-slate-400">{{ formattedExpiryDate }}</p>
                </div>
            </div>
        </div>

        <!-- Referral Input-->
        <div v-if="paymentStatus" class="w-full h-auto rounded-lg border border-slate-800 px-3 py-2 flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm">
            <input type="text" class="w-full h-auto bg-transparent text-white font-normal text-sm outline-none" :value="referralCode" placeholder="Referral Code">
        </div>

        <!-- Add this before the button -->
        <div v-if="paymentStatus" class="flex items-center justify-center gap-2">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span class="text-sm text-white">
                {{ paymentStatus === 'PENDING' ? 'Confirming payment...' : paymentStatus }}
            </span>
        </div>

        <!-- Subscription Button -->
        <div v-if="userInfo?.subscriptionStatus !== 'ACTIVE'" class="flex">
            <button 
                @click="handleSubscribe" 
                :disabled="isLoading || paymentStatus === 'PENDING'"
                class="bg-slate-800 hover:bg-slate-800/80 text-white px-4 py-2 rounded-full w-auto text-sm disabled:opacity-50"
            >
                {{ 
                    isLoading ? 'Processing...' : 
                    paymentStatus === 'PENDING' ? 'Confirming...' : 
                    'Subscribe' 
                }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { subscriptionApi } from '@/utils/subscriptionUtils';
import { useWallet } from 'solana-wallets-vue';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { useRouter } from 'vue-router';
import { formatDistanceToNow } from 'date-fns';

const store = useStore();
let wallet = null;
const isLoading = ref(false);
const connection = new Connection(clusterApiUrl('mainnet-beta'));
const paymentStatus = ref(null);
const pollInterval = ref(null);
const router = useRouter();

// Initialize wallet in onMounted
onMounted(() => {
  wallet = useWallet();
});

const referralCode = computed(() => {
    const code = store.state.referralCode;
    return code || undefined;
});

const checkPaymentStatus = async (signature) => {
  try {
    const status = await subscriptionApi.getStatus(wallet.publicKey.value.toString());
    const payment = status.paymentHistory.find(p => p.transactionSignature === signature);
    
    if (payment) {
      paymentStatus.value = payment.status;
      
      if (payment.status === 'CONFIRMED') {
        clearInterval(pollInterval.value);
        pollInterval.value = null; // Clear the reference
        paymentStatus.value = null; // Reset status
        alert('Payment confirmed!');
        router.push({ name: 'dashboard' }); // Redirect to dashboard
      } else if (payment.status === 'FAILED') {
        clearInterval(pollInterval.value);
        pollInterval.value = null;
        paymentStatus.value = null;
        throw new Error('Payment failed');
      }
    }
  } catch (error) {
    clearInterval(pollInterval.value);
    pollInterval.value = null;
    paymentStatus.value = null;
    console.error('Payment status check failed:', error);
    throw error;
  }
};

const startPaymentPolling = (signature) => {
  // Clear any existing interval
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
  }
  
  // Poll every 2 seconds
  pollInterval.value = setInterval(async () => {
    await checkPaymentStatus(signature);
  }, 2000);
  
  // Stop polling after 2 minutes
  setTimeout(() => {
    if (pollInterval.value) {
      clearInterval(pollInterval.value);
      if (paymentStatus.value === 'PENDING') {
        paymentStatus.value = 'FAILED';
        alert('Payment verification timed out');
      }
    }
  }, 120000); // 2 minutes
};

const handleSubscribe = async () => {
    if (!wallet?.publicKey?.value) {
        alert('Please connect your wallet first');
        return;
    }

    try {
        isLoading.value = true;
        paymentStatus.value = null;

        // 1. Create payment intent
        const intent = await subscriptionApi.createIntent(
            wallet.signMessage.value,
            wallet.publicKey.value.toString(),
            referralCode.value,
            true
        );

        if (!intent.success) {
            throw new Error('Failed to create payment intent');
        }

        // 2. Process the transaction
        const { success, message, txid } = await subscriptionApi.sendTransaction(
            intent.transaction,
            wallet.publicKey.value.toString(),
            wallet.sendTransaction,
            connection
        );

        if (!success) {
            throw new Error(message);
        }

        // 3. Verify the payment and start polling
        const verification = await subscriptionApi.verifyPayment(
            txid, 
            wallet.publicKey.value.toString()
        ); 

        if (verification.success) {
            paymentStatus.value = 'PENDING';
            startPaymentPolling(txid);
        } else {
            throw new Error('Payment verification failed');
        }

    } catch (error) {
        console.error('Subscription error:', error);
        alert(error.message || 'Failed to process subscription');
    } finally {
        isLoading.value = false;
    }
};

// Clean up on component unmount
onUnmounted(() => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
  }
});

const formattedExpiryDate = computed(() => {
  if (!store.state.userInfo?.subscriptionExpiresAt) return 'N/A';
  return formatDistanceToNow(new Date(store.state.userInfo.subscriptionExpiresAt), { addSuffix: true });
});

</script>
<script>
import { mapState } from 'vuex';
export default {
    name: 'SubscribeComponent',
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
}
</script>