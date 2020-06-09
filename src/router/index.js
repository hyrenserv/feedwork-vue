import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

/**
 *
 * 路由配置信息
 *  routes : [{这里的第一层表示为普通的路由地址,children : [{这个里面的是二级路由配置}]
 * 路由配置如 :
 *  {
 *      @param path: "/home"   表示的是路由匹配路径,
 *      @param name: 'home' 路由的名称
 *      @param component: () => import('@/hrds/login/index') 后面为路由地址的具体页面
 *  }
 *
 */
export default new Router({
    routes: [
        { path: '/', name: 'login', component: () => import('@/hrds/login/login.vue') },
        {
            //菜单路由地址配置
            path: "/home", name: 'home', component: () => import('@/hrds/components/menu'), children: [
                { path: '/systemParameters', name: 'systemParameters', component: () => import('@/hrds/a/syspara/syspara.vue') },
            ]
        },

        //其他访问连接直接跳转到无效页面
        { path: '*', name: '*', component: () => import('@/hrds/components/notFound.vue') },
    ]
})
