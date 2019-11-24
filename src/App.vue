<template>
    <v-app>
        <!-- app属性: 设置向下滚动时保持在顶部 -->
        <v-app-bar app flat dense>
            <v-container>
                <v-layout>
                    <v-img :src="require('@/assets/logo.png')" height="48" width="135" max-width="135"
                           class="mr-5" contain/>
                    <v-toolbar-items>
                        <v-btn v-for="(menu, i) in menus" :key="i" :to="menu.url" text>
                            {{menu.name}}
                        </v-btn>
                    </v-toolbar-items>
                    <v-row align="center">
                        <v-text-field append-icon="search" placeholder="请输入关键字"
                                      hide-details single-line class="mx-4"/>
                    </v-row>
                    <v-spacer/>
                    <v-toolbar-items>
                        <v-btn text @click.stop="login">登录 / 注册</v-btn>
                    </v-toolbar-items>
                </v-layout>
            </v-container>
        </v-app-bar>
        <v-content>
            <v-container>
                <router-view/>
            </v-container>
        </v-content>
        <v-footer dark>
            <v-container>
                <v-layout wrap>
                    <v-flex xs12 text-center>
                        <div>免责声明：本站资源来自互联网免费共享，仅供交流学习之用，版权归原作者所有，如有侵权，请联系站长并出示版权证明，本站将在第一时间内处理。</div>
                        <div>&copy; 2014 - {{ new Date().getFullYear() }} moviebay.top All Rights Reserved. Powered by 影视湾 | 站长邮箱：moviebay@vivaldi.net</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-footer>
        <v-dialog  max-width="500px" v-model="showLoginDialog">
            <v-card>
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>请登录</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="pt-5">
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
    </v-app>
</template>

<script>
/**
 * @see https://cn.vuejs.org/v2/api/#name
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 * @see https://vuetifyjs.com/zh-Hans/getting-started/pre-made-layouts
 */
export default {
    name: 'App',
    data: () => ({
        menus: require('@/data/menus.json'),
        showLoginDialog: false,
    }),
    methods: {
        login() {
            this.showLoginDialog = true;
        },
    }
}
</script>

<style>
    .v-link {
        color: #424242 !important;
        text-decoration: none;
    }

    .v-link:hover,
    .v-link:focus {
        color: #337ab7 !important;
        /*text-decoration: underline;*/
    }
</style>
