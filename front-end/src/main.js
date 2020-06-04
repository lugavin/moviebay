import Vue from 'vue'
import App from './App'
import {store, router, vuetify} from './plugins';

Vue.config.productionTip = false;

/*
router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
        next('/not-found');
    }
    if (to.meta && to.meta.roles && to.meta.roles.length > 0) {
        authService.hasAnyRole(to.meta.roles).then(value => {
            if (!value) {
                sessionStorage.setItem('requested-url', to.fullPath);
                next('/forbidden');
            } else {
                next();
            }
        });
    } else {
        next();
    }
});
*/


new Vue({
    render: h => h(App),
    store, // 为了在 Vue 组件中访问 this.$store 属性, 你需要为 Vue 实例提供创建好的 store
    router,
    vuetify
}).$mount('#app');