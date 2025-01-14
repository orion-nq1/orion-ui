<template>
    <div class="border-2 border-blue-500 rounded-3xl p-4 bg-blue-700/60 backdrop-blur-sm">
        <div class="w-full h-auto overflow-hidden rounded-2xl border border-slate-800">
            <img src="@/assets/imgs/referral.png" alt="referral" class="w-full h-auto">
            <div class="p-4 flex flex-col gap-4">
                <h2 class="text-xl font-semibold text-white">
                    Refer friends and earn rewards
                </h2>

                <p class="text-white font-normal text-sm">
                    Get airdrops in crypto every week when you refer friends to Nova.
                    <span class="text-blue-400 cursor-pointer">Learn more</span>
                </p>

                <!-- Input with referral link populated -->
                <div class="w-full h-auto rounded-lg border border-slate-800 px-3 py-2 flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm">
                    <input type="text" class="w-full h-auto bg-transparent text-white font-normal text-sm outline-none" :value="referralUrl" readonly>
                    <button class="text-white" @click="copyReferralLink">
                        <Icon icon="clarity:copy-line" class="w-4 h-4" />
                    </button>
                </div>

                <!-- Button to copy referral link -->
                <div class="flex flex-row gap-2">
                    <button class="bg-slate-800 hover:bg-slate-800/80 text-white px-4 py-2 rounded-full w-auto text-sm" @click="copyReferralLink">
                        Refer friends
                    </button>

                    <button class="bg-slate-900 hover:bg-slate-900/80 text-white px-4 py-2 rounded-full w-auto text-sm">
                        View rewards
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { toast } from 'vue3-toastify';
import { store } from '@/store/store';

const baseUrl = process.env.VUE_APP_BASE_URL || 'https://nova.com';

const referralUrl = computed(() => {
    const code = store.state.userInfo?.referralCode;
    return code ? `${baseUrl}/referral/${code}` : '';
});

const copyReferralLink = () => {
    if (!referralUrl.value) {
        toast.error('No referral code available', {
            autoClose: 2000,
            position: 'bottom-right',
            theme: 'dark',
        });
        return;
    }

    navigator.clipboard.writeText(referralUrl.value);
    toast.success('Referral link copied to clipboard', {
        autoClose: 2000,
        position: 'bottom-right',
        theme: 'dark',
    });
}
</script>

<script>
export default {
    name: 'ReferralComponent',
}
</script>