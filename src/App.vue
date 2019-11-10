<template>
    <v-app>
        <!-- app属性: 设置向下滚动时保持在顶部 -->
        <v-app-bar app flat dense>
            <v-container mx-auto py-0>
                <v-layout>
                    <v-img :src="require('@/assets/logo.png')"
                           class="mr-5" height="48" width="135" max-width="135" contain/>
                    <v-toolbar-items>
                        <v-btn v-for="(menu, i) in menus" :key="i" :to="menu.url"
                               class="ml-0 hidden-sm-and-down" text>
                            {{ menu.name }}
                        </v-btn>
                    </v-toolbar-items>
                    <v-text-field append-icon="mdi-magnify"
                                  flat hide-details single-line
                                  style="max-width: 250px; margin: 8px;"
                                  placeholder="请输入关键字"/>
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
    </v-app>
</template>

<script>
/**
 * @see https://cn.vuejs.org/v2/api/#name
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 */
export default {
    name: 'App',
    data: () => ({
        menus: require('@/data/menus.json')
    })
};
</script>
