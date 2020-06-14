<template>
    <!-- app属性: 设置向下滚动时保持在顶部 -->
    <v-app-bar app flat dense>
        <v-container pa-0>
            <v-layout>
                <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleDrawer"/>
                <v-toolbar-items>
                    <v-img :src="logo" height="48" width="135" max-width="135" contain/>
                </v-toolbar-items>
                <v-toolbar-items class="ml-4 hidden-sm-and-down">
                    <v-btn text v-for="(menu, i) in menus" :key="i" :to="menu.url" v-text="menu.name"/>
                </v-toolbar-items>
                <v-row align="center" class="mx-4">
                    <v-text-field placeholder="请输入片名..." hide-details single-line v-model.trim="keyword">
                        <template v-slot:append>
                            <v-btn text icon small :to="`/video/search?q=${keyword}`" :disabled="!keyword" target="_blank">
                                <v-icon>search</v-icon>
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-row>
                <v-spacer/>
                <v-toolbar-items>
                    <v-btn text @click.stop="activeDialog=true">登录 / 注册</v-btn>
                </v-toolbar-items>
            </v-layout>
        </v-container>
        <!-- Login Dialog -->
        <login-dialog @dismiss="activeDialog=false" v-if="activeDialog"/>
    </v-app-bar>
</template>

<script>
import {LoginDialog} from '@/components/account';
import {MUTATION_TYPES} from '@/plugins/store-types';

export default {
    name: 'AppHeader',
    components: {LoginDialog},
    data: () => ({
        menus: require('@/data/menus.json'),
        logo: require('@/assets/logo.png'),
        activeDialog: false,
        keyword: null
    }),
    methods: {
        toggleDrawer() {
            this.$store.commit(MUTATION_TYPES.TOGGLE_DRAWER);
        }
    }
};
</script>

