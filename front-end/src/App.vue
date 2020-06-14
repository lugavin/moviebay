<template>
    <v-app>
        <app-header/>
        <app-drawer/>
        <app-main/>
        <app-footer/>
    </v-app>
</template>

<script>
import {AppHeader, AppDrawer, AppMain, AppFooter} from '@/components';

/**
 * @see https://cn.vuejs.org/v2/api/#name
 */
export default {
    name: 'App',
    components: {
        AppHeader,
        AppDrawer,
        AppMain,
        AppFooter
    }
}
</script>

<!--
vue-html-loader and css-loader translates non-root URLs to relative paths.
In order to treat it like a module path, prefix it with ~
Ref => https://github.com/vuejs/vue-loader/issues/193
-->
<style>
.v-link {
    color: inherit !important;
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

/*
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
*/
</style>
