<template>
    <div class="w-full rounded-3xl border border-slate-800 p-4 flex flex-col gap-6">
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold text-white">
                Portfolio
            </h2>

            <p class="text-white font-medium text-sm">
                Your account balance is 
                <span class="bg-green-500/70 backdrop-blur-sm text-white px-2 py-1 rounded-full mr-1">
                    up ${{ formatAmount(userInfo?.last24HoursChange?.amount) }} 
                    ({{ userInfo?.last24HoursChange?.percentage || 0 }}%)
                </span> 
                today
            </p>
        </div>

        <div class="flex flex-col">
            <p class="text-white font-normal text-sm">
                Total balance
            </p>

            <p class="text-white font-bold text-3xl">
                ${{ formatAmount(userInfo?.pendingRewards) }} <span class="font-normal text-sm">USD</span>
            </p>
        </div>
        <div class="flex flex-col">
            <div class="flex justify-between items-center text-white font-normal text-sm pt-3 border-b border-slate-800 pb-3">
                <p>
                    Referrals
                </p>

                <p>
                    {{ userInfo?.referralCount || 0 }}
                </p>
            </div>
            <div class="flex justify-between items-center text-white font-normal text-sm pt-3">
                <p>
                    Earnings
                </p>

                <p>
                    ${{ formatAmount(userInfo?.totalRewards) }} USD
                </p>
            </div>
        </div>

        <div class="flex justify-between items-center mt-4">
            <button class="bg-slate-800 hover:bg-slate-800/80 text-white px-4 py-2 rounded-full w-auto text-sm">
                View portfolio
            </button>
            <div class="flex flex-col">
                <p class="text-white font-normal text-sm text-right">Last signed in</p>
                <p class="text-white font-bold text-sm text-right">{{ formatDate(userInfo?.lastLoginAt) || 'Never' }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'PortfolioComponent',
    computed: {
        ...mapState({
            userInfo: state => {
                return state.userInfo;
            }
        })
    },
    mounted() {
        console.log('Component Mounted, UserInfo:', JSON.stringify(this.userInfo, null, 2));
    },
    methods: {
        formatAmount(amount) {
            return (amount || 0).toFixed(2);
        },
        formatDate(dateString) {
            if (!dateString) return 'Never';
            
            const date = new Date(dateString);
            const now = new Date();
            const diff = Math.floor((now - date) / 1000); // difference in seconds

            if (diff < 60) return '1 min ago';
            if (diff < 3600) return Math.floor(diff / 60) + ' mins ago';
            if (diff < 7200) return '1 hour ago';
            if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago';
            if (diff < 172800) return '1 day ago';
            if (diff < 2592000) return Math.floor(diff / 86400) + ' days ago';
            if (diff < 7776000) return '30+ days ago';
            return '100+ days ago';
        }
    }
}
</script>