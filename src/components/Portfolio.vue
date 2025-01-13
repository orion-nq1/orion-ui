<template>
    <div class="w-full rounded-3xl border border-slate-800 p-4 flex flex-col gap-6">
        <div class="flex flex-col gap-3">
            <h2 class="text-xl font-bold text-white">
                Portfolio
            </h2>

            <p class="text-white font-medium text-sm">
                Your account balance is 
                <span class="bg-green-500/70 backdrop-blur-sm text-white px-2 py-1 rounded-full mr-1">
                    up ${{ formatAmount(userInfo.last24HoursChange?.amount) || 0 }} 
                    ({{ userInfo.last24HoursChange?.percentage || 0 }}%)
                </span> 
                today
            </p>
        </div>

        <div class="flex flex-col">
            <p class="text-white font-normal text-sm">
                Total balance
            </p>

            <p class="text-white font-bold text-3xl">
                ${{ formatAmount(userInfo.pendingRewards || 0) }} <span class="font-normal text-sm">USD</span>
            </p>
        </div>
        <div class="flex flex-col">
            <div class="flex justify-between items-center text-white font-normal text-sm pt-3 border-b border-slate-800 pb-3">
                <p>
                    Referrals
                </p>

                <p>
                    {{ userInfo.referralCount || 0 }}
                </p>
            </div>
            <div class="flex justify-between items-center text-white font-normal text-sm pt-3">
                <p>
                    Earnings
                </p>

                <p>
                    ${{ formatAmount(userInfo.totalRewards || 0) }} USD
                </p>
            </div>
        </div>

        <div>
            <button class="bg-slate-800 hover:bg-slate-800/80 text-white px-4 py-2 rounded-full w-auto text-sm">
                View portfolio
            </button>
        </div>
    </div>
</template>

<script>
import { store } from '@/store/store';

export default {
    name: 'PortfolioComponent',
    computed: {
        userInfo() {
            return store.state.userInfo;
        }
    },
    methods: {
        formatAmount(amount) {
            return (amount || 0).toFixed(2);
        }
    }
}
</script>