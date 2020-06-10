import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const RouterType = {
    movies: 'movie',
    series: 'series',
    cartoons: 'cartoon',
    shows: 'show',
    mv: 'mv'
};

const TypeRouter = Object.keys(RouterType).reduce((obj, key) => {
    obj[RouterType[key]] = key;
    return obj;
}, {});

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
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: () => import('@/components/home')
        },
        {
            path: `/(${Object.keys(RouterType).join('|')})`,
            component: () => import('@/components/video/VideoList'),
            props: (route) => ({type: RouterType[route.params.pathMatch]})
        },
        {
            path: `/(${Object.keys(TypeRouter).join('|')})/more`,
            component: () => import('@/components/video/VideoList'),
            props: (route) => ({type: route.params.pathMatch})
        },
        {
            path: '/video/detail/:vid',
            component: () => import('@/components/video/VideoDetail'),
            props: true // 如果props被设置为true, 那么route.params将会被设置为组件属性
        },
        {
            path: '/video/play/:vid',
            component: () => import('@/components/video/VideoPlay'),
            props: true
        },
        {
            path: '/video/search',
            component: () => import('@/components/video/VideoSearch'),
            props: (route) => ({keyword: route.query.q})
        },
        // {
        //     path: '/admin/user',
        //     component: () => import('@/components/user'),
        //     meta: {roles: [Authority.ADMIN]}
        // }
    ]
});