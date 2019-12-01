<template>
    <v-app>
        <app-header/>
        <app-main/>
        <app-footer/>
    </v-app>
</template>

<script>
import { AppHeader, AppMain, AppFooter } from '@/components/layout';
/**
 * @see https://cn.vuejs.org/v2/api/#name
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 * @see https://vuetifyjs.com/zh-Hans/getting-started/pre-made-layouts
 */
export default {
    name: 'App',
    components: {
        AppHeader,
        AppMain,
        AppFooter
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

.text-small {
    font-size: 80%;
    font-weight: 400;
}

ul.list {
    margin: 0 !important;
    padding: 0 !important;
    list-style: none;
    line-height: 40px;
}

ul.list li.list-item {
    display: block;
    float: left;
}

.v-card--reveal {
    width: 100%;
    height: 100%;
    opacity: .5;
    bottom: 0;
    position: absolute;
    align-items: center;
    justify-content: center;
}
</style>
