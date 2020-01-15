<template>
    <!-- app属性: 设置向下滚动时保持在顶部 -->
    <v-app-bar app flat dense>
        <v-container pa-0>
            <v-layout>
                <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleDrawer"/>
                <v-toolbar-items>
                    <v-img :src="require('@/assets/logo.png')" height="48" width="135" max-width="135" contain/>
                </v-toolbar-items>
                <v-toolbar-items class="ml-4 hidden-sm-and-down">
                    <v-btn v-for="(menu, i) in menus" :key="i" :to="menu.url" v-text="menu.title" text/>
                </v-toolbar-items>
                <v-row align="center" class="mx-4">
                    <v-text-field placeholder="请输入关键字" hide-details single-line v-model.trim="keyword">
                        <template v-slot:append>
                            <v-btn :to="{path: '/video/search', query: {q: keyword}}" target="_blank"
                                   :disabled="!keyword"  text icon small >
                                <v-icon>search</v-icon>
                            </v-btn>
                        </template>
                    </v-text-field>
                </v-row>
                <v-spacer/>
                <v-toolbar-items>
                    <v-btn text @click.stop="loginDialog=true">登录 / 注册</v-btn>
                </v-toolbar-items>
            </v-layout>
        </v-container>
        <!-- Login Dialog -->
        <v-dialog max-width="500" v-model="loginDialog">
            <v-card>
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>请登录</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="pt-4">
                    <v-form>
                        <v-text-field label="账号" name="username" prepend-icon="person" type="text"/>
                        <v-text-field label="密码" name="password" prepend-icon="lock" type="password"/>
                        <v-btn block color="primary">登录</v-btn>
                    </v-form>
                </v-card-text>
                <v-card-text>
                    <a href="javascript:void(0)" class="v-link">忘记密码？</a>
                    <a href="javascript:void(0)" class="v-link float-right">注册一个新账号</a>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppHeader',
    data: () => ({
        keyword: '',
        loginDialog: false,
        menus: require('@/data/menus.json'),
    }),
    methods: {
        toggleDrawer() {
            this.$store.commit('toggleDrawer');
        },
    }
};
</script>

