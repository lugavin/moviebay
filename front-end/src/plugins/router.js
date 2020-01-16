import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * Router Mode
 * - hash: 即URL中的#符号(此hash不是密码学中的散列运算), 比如 http://localhost/#/home 的hash值为#/home,
 *         它的特点是hash虽然出现在URL中, 但不会被包括在HTTP请求中, 对后端完全没影响, 因此改变hash不会重新加载页面.
 * - history: 利用了HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法.
 *
 * @see https://router.vuejs.org/zh/api/
 * @see https://router.vuejs.org/zh/guide/essentials/passing-props.html
 * @see https://github.com/vuejs/vue-router/blob/next/examples/route-matching/app.js
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/History
 */
export default new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: () => import('@/components/home')},
        {
            path: '/video/list',
            component: () => import('@/components/video/VideoList'),
            props: (route) => ({type: route.query.type}),
        },
        {
            path: '/video/detail/:vid',
            component: () => import('@/components/video/VideoDetail'),
            props: true, // 如果props被设置为true, 那么route.params将会被设置为组件属性
        },
        {
            path: '/video/play/:vid',
            component: () => import('@/components/video/VideoPlay'),
            props: true,
        },
        {
            path: '/video/search',
            component: () => import('@/components/video/VideoSearch'),
            props: (route) => ({keyword: route.query.q}),
        },
    ]
});