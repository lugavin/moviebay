<template>
    <v-footer padless>
        <v-card dark flat tile width="100%" class="text-center">
            <v-card-text>
                <p class="mb-0">免责声明：本站资源来自互联网免费共享，仅供交流学习之用，版权归原作者所有，如有侵权，请联系站长并出示版权证明以便在第一时间内处理。</p>
                <p class="mb-0">站长邮箱：moviebay@vivaldi.net</p>
                <p class="mb-0">Copyright &copy; 2014 - {{ new Date().getFullYear() }} MovieBay. All Rights Reserved.</p>
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