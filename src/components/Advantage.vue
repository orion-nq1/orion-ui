<template>
    <div class="w-full rounded-3xl border border-slate-800 p-4 flex flex-col gap-4">
        <div class="flex flex-col gap-3">
            <h2 class="text-xl font-bold text-white">
                The Nova Advantage®
            </h2>

            <div class="w-full h-auto rounded-lg overflow-hidden">
                <img src="@/assets/imgs/nova.png" alt="The Nova Advantage" class="w-full h-auto">
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <p class="text-white font-normal text-sm">
                Beat the market with our proprietary ML algorithm. Our advanced machine learning models analyze millions of data points in real-time, identifying patterns and market inefficiencies that human traders might miss.
            </p>
            <p class="text-white font-normal text-sm">
                Try Nova for free for 7 days.
            </p>
        </div>

        <div>
            <button class="bg-slate-800 hover:bg-slate-800/80 text-white px-4 py-2 rounded-full w-auto text-sm">
                Try it for free
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AdvantageComponent',
}
</script>