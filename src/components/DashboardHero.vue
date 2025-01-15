<template>
    <div class="w-full">
        <div class="mx-auto px-4 h-full flex flex-col gap-6">
            <h1 class="text-xl font-bold text-white mt-12">
                Welcome back!
            </h1>

            <DashboardPartial />
        </div>
    </div>
</template>

<script>
import DashboardPartial from '@/partials/dashboard.vue';
import { mapState } from 'vuex';

export default {
    name: 'DashboardHero',
    components: {
        DashboardPartial,
    },
    computed: {
        ...mapState({
            userInfo: state => {
                console.log('UserInfo State:', JSON.stringify(state.userInfo, null, 2));
                return state.userInfo;
            }
        })
    }
}
</script>