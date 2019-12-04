<template>
    <v-footer dark>
        <v-container text-center>
            <v-row dense no-gutters>
                <v-col cols="12">免责声明：本站资源来自互联网免费共享，仅供交流学习之用，版权归原作者所有，如有侵权，请联系站长并出示版权证明以便在第一时间内处理。</v-col>
                <v-col cols="12">站长邮箱：moviebay@vivaldi.net</v-col>
                <v-col cols="12">Copyright &copy; 2014 - {{ new Date().getFullYear() }} MovieBay. All Rights Reserved.</v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: 'AppFooter',
};
</script>