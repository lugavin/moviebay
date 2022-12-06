import {createRouter, createWebHistory} from 'vue-router'

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
const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: () => import('@/components/home')
        },
        {
            path: '/video/search',
            component: () => import('@/components/video/VideoSearch'),
            props: (route) => ({keyword: route.query.q})
        },
        {
            path: '/movies',
            component: () => import('@/components/movie/MovieList')
        },
        {
            path: '/movie/more',
            redirect: '/movies'
        },
        {
            path: '/movie/play/:vid',
            component: () => import('@/components/movie/MoviePlay'),
            props: true // 如果props被设置为true, 那么route.params将会被设置为组件属性
        },
        {
            path: '/movie/detail/:vid',
            component: () => import('@/components/movie/MovieDetail'),
            props: true
        },
        {
            path: '/series',
            component: () => import('@/components/series/SeriesList')
        },
        {
            path: '/series/more',
            redirect: '/series'
        },
        {
            path: '/series/play/:vid',
            component: () => import('@/components/series/SeriesPlay'),
            props: true // 如果props被设置为true, 那么route.params将会被设置为组件属性
        },
        {
            path: '/series/detail/:vid',
            component: () => import('@/components/series/SeriesDetail'),
            props: true
        },
        {
            path: '/comments',
            component: () => import('@/components/comment/CommentList')
        },
        // {
        //     path: '/forbidden',
        //     component: Error,
        //     meta: {statusCode: 403}
        // },
        // {
        //     path: '/not-found',
        //     component: Error,
        //     meta: {statusCode: 404}
        // },
        // {
        //     path: '/admin/user',
        //     component: () => import('@/components/user'),
        //     meta: {roles: [Authority.ADMIN]}
        // }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (!to.matched.length) {
//         next('/not-found');
//     }
//     if (to.meta && to.meta.roles && to.meta.roles.length > 0) {
//         authService.hasAnyRole(to.meta.roles).then(value => {
//             if (!value) {
//                 sessionStorage.setItem('requested-url', to.fullPath);
//                 next('/forbidden');
//             } else {
//                 next();
//             }
//         });
//     } else {
//         next();
//     }
// });

export default router;
