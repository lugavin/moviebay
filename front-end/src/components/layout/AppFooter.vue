<template>
    <v-footer dark padless>
        <v-card flat tile width="100%" class="text-center">
            <v-card-text class="white--text">
                <p class="mb-0">免责声明：本站资源来自互联网免费共享，仅供交流学习之用，版权归原作者所有，如有侵权，请<a href="mailto:admin@moviebay.top" class="v-link">联系站长</a>并出示版权证明以便在第一时间内处理。</p>
                <p class="mb-0">Copyright &copy; {{ new Date().getFullYear() }} <a href class="v-link">MovieBay</a>. All Rights Reserved.</p>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
/**
 * @see https://vuetifyjs.com/zh-Hans/components/footer
 */
export default {
    name: 'AppFooter',
};
</script>