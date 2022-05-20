import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        tabList: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
        }],
        currentMenu: null,
        menu: []
    },
    mutations: {
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        SelectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        },
        //菜单权限
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            // 在这里做路由的动态添加
            if (!Cookie.get('menu')) {
                return
            }
            console.log(Cookie.get('menu'), "Cookie.get('menu')");
            // 如果当前有menu的数据，接下来对menu进行相关的处理。将Cookie中的menu数据转成对象
            const menu = JSON.parse(Cookie.get('menu')) // 将序列化的menu对象的数据拿到
            state.menu = menu // 更新数据
                // 动态添加路由的处理。添加之前对数据进行相关的处理。
            const menuArray = []
                // 拿到menu数据，进行遍历。这里的menu就是permission下的menu数组。数组分为一级菜单和包含children的二级菜单。
            menu.forEach(item => {
                // 这里需要区分一级菜单和二级菜单
                if (item.children) {
                    // 有children就继续往下遍历
                    item.children = item.children.map(item => {
                            item.component = () =>
                                import (`../views/${item.url}`) // 类似于路由里按需引入的component。注意这里用es6的模板字符串的语法进行拼接
                            return item
                        })
                        // 更新完之后，需要给memuArray中children数组进行解构，下面使用es6的扩展运算符，将二维数组扁平化
                    menuArray.push(...item.children)
                } else {
                    item.component = () =>
                        import (`../views/${item.url}`)
                    menuArray.push(item) // 那么menuArray拿到的就是数组对象，里面存入的就是路由相关的文件的数据(类似router/index.js)
                }
            });
            // 路由的动态添加。在下面遍历的时候，每一个对象就是拿到当前的路由的数据
            console.log(menuArray, 'menuArray');
            menuArray.forEach(item => {
                /* 在路由文件中，当前所有页面的上层有一个layout叫做Main，相当于页面都是包裹在layout组件下面。
                所以需要给layout组件添加它所对应的children。这里直接遍历数组，Main是layout名称，然后需要给它下面添加每一个页面item。 */
                router.addRoute('main', item)
                    // 保存完之后，回到Login.vue中。
            })
        }
    }
}