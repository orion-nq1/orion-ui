<template>
    <div>
        <Header />
        <div class="w-full h-[185px] lg:h-[150px] flex items-center">
            <div class="w-full grid px-2 justify-center">
                <h1 class="text-lg lg:text-2xl font-bold text-gray-200 text-center">Connect Wallet</h1>
                <p class="text-xs lg:text-base text-gray-500 text-center">You need to connect your wallet to continue</p>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
export default {
  name: 'ConnectWallet',
  components: {
    Header
  }
};
</script>