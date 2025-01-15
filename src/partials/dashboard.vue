<template>
    <div class="flex flex-col md:flex-row gap-4 pb-4">
        <!-- Left Column (2/3) -->
        <div class="w-full md:w-2/3 flex flex-col lg:flex-row gap-4 h-fit">
            <!-- Content for left column -->
            <Portfolio />  
            <Advantage />
        </div>
        
        <!-- Right Column (1/3) -->
        <div class="w-full md:w-1/3 flex flex-col gap-4">
            <!-- Content for right column -->
            <Referral />
        </div>
    </div>
</template>

<script>
import Portfolio from '@/components/Portfolio.vue';
import Advantage from '@/components/Advantage.vue';
import Referral from '@/components/Referral.vue';

export default {
    name: 'DashboardPartial',
    components: {
        Portfolio,
        Advantage,
        Referral
    },
}
</script>
