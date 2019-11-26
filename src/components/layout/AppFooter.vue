<template>
    <v-footer dark>
        <v-container>
            <v-layout wrap>
                <v-flex xs12 text-center>
                    <div>免责声明：本站资源来自互联网免费共享，仅供交流学习之用，版权归原作者所有，如有侵权，请联系站长并出示版权证明，本站将在第一时间内处理。</div>
                    <!--<div>站长邮箱：moviebay@vivaldi.net</div>-->
                    <div>Copyright &copy; 2014 - {{ new Date().getFullYear() }} MovieBay All Rights Reserved.</div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: 'AppFooter',
};
</script>