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
                        <v-text-field append-icon="mdi-magnify" placeholder="请输入关键字"
                                      hide-details single-line class="mx-4"/>
                    </v-row>
                    <v-spacer/>
                    <v-toolbar-items>
                        <v-btn text to="/register">注册</v-btn>
                        <v-btn text to="/login">登录</v-btn>
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
            <div class="mx-auto">&copy; 2015 - 2019</div>
        </v-footer>
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
        menus: require('@/data/menus.json')
    })
};
</script>
