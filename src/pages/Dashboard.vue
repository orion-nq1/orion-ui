<template>
    <div class="w-full h-full max-w-screen-2xl mx-auto">
        <HeaderComponent />
        <DashboardHero />
    </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue';
import DashboardHero from '@/components/DashboardHero.vue';

export default {
    name: 'DashboardPage',
    components: {
        HeaderComponent,
        DashboardHero,
    },
}
</script>