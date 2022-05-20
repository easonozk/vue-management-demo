import Vue from 'vue'
import VueRouter from 'vue-router'
//import MainView from '../views/MainView.vue'
// import home from '../views/home'
// import user from '../views/user'
// import commodity from '../views/commodity'
// import page1 from '../views/other/pageOne.vue'
// import page2 from '../views/other/pageTwo.vue'
//import login from '../views/login'


Vue.use(VueRouter)

// 解决 Vue 重复点击相同路由，出现 Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation 问题 .
// 报错内容：
// Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/home".
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch(err => err);
};

const routes = [{
        path: '/',
        name: 'main',
        component: () =>
            import ('../views/MainView.vue'),
        //路由重定向
        //redirect: '/home',
        children: [
            //{
            //     path: '/home',
            //     name: 'home',
            //     component: home
            // }, {
            //     path: '/user',
            //     name: 'user',
            //     component: user
            // }, {
            //     path: '/commodity',
            //     name: 'commodity',
            //     component: commodity
            // }, {
            //     path: '/page1',
            //     name: 'page1',
            //     component: page1
            // }, {
            //     path: '/page2',
            //     name: 'page2',
            //     component: page2
            //}
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login')
    }
]

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes
})

export default router