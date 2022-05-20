import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入样式
import './assets/less/index.less'
//引入axios
import axios from 'axios'
//引入mock
import '../api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios



//导航守卫，登录后才能去往其他页面
router.beforeEach((to, from, next) => {
    //防止页面刷新，vuex丢失token信息
    store.commit('getToken')
    console.log(store.state.userToken.token, 'router.beforeEach');
    const token = store.state.userToken.token
    if (!token && to.name !== 'login') {
        next({ name: 'login' })

    } else if (token && to.name === 'login') {
        next({ name: 'home' }) // 重定向到首页
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.commit('addMenu', this.$router)
    }
}).$mount('#app')