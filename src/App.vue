<template>
    <v-app>
        <!-- app属性: 设置向下滚动时保持在顶部 -->
        <v-app-bar app flat dense>
            <v-container>
                <v-layout>
                    <v-toolbar-items>
                        <v-img :src="require('@/assets/logo.png')"
                               contain class="mr-5" height="48"/>
                        <v-btn text to="/home">首页</v-btn>
                        <v-btn text to="/movie">电影</v-btn>
                        <v-btn text to="/tv">连续剧</v-btn>
                        <v-btn text to="/variety">综艺</v-btn>
                        <v-btn text to="/anime">动漫</v-btn>
                        <v-btn text to="/news">资讯</v-btn>
                        <v-btn text to="/comments">留言</v-btn>
                        <v-text-field placeholder="请输入关键字" append-icon="mdi-magnify"
                                      flat hide-details solo-inverted dense
                                      style="max-width: 240px; padding: 5px 15px;"/>
                        <v-spacer/>
                        <v-btn text to="/login">
                            <span class="mr-2">登录</span>
                        </v-btn>
                        <v-btn text to="/register">
                            <span class="mr-2">注册</span>
                        </v-btn>
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
 */
export default {
    name: 'App',
    data: () => ({
    })
};
</script>
