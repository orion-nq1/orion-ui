<template>
    <div class="w-full">
        <div class="mx-auto px-4 h-full flex flex-col gap-6">
            <h1 class="text-xl font-bold text-white mt-12">
                Welcome back, Tenji.
            </h1>

            <DashboardPartial />
        </div>
    </div>
</template>

<script>
import DashboardPartial from '@/partials/dashboard.vue';

export default {
    name: 'DashboardHero',
    components: {
        DashboardPartial,
    }
}
</script>