import Vue from 'vue'
import App from './App'
import Plugins from './plugins';

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
    ...App,
    ...Plugins
}).$mount('#app');