# 一、搭建新项目的步骤
## 1.1. 准备环境
- 安装 Git/Node/VSCode
  * [Git下载地址](https://git-scm.com/download/)
  * [VSCode下载](https://code.visualstudio.com/download/)
  * -- 必须安装代码格式化插件 : vue-format
  * [Node下载地址](https://nodejs.org/en/download/)

- 全局安装Vue-cli脚手架 (版本号2.9.6)

```shell
npm install -g vue-cli@2.9.6
# 如果安装过慢可使用淘宝镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 然后在使用
cnpm install -g vue-cli@2.9.6
```

- 安装依赖的UI框架

```shell
# 需要在项目根目录下执行本命令
npm install element-ui -S
```

## 1.2. 拉取项目基础框架

```shell
git clone https://github.com/hyrenserv/feedwork-vue.git
```

## 1.3. 编写程序(以登陆功能为例)

- 定义环境变量: .env.development (在项目根目录下)

```ini
VUE_APP_HRDS_A_API = 'http://172.168.0.100:12345'
```

- 在项目根目录的src/hrds/login 目录下创建js和vue文件, 

  * login.js 编写向后台请求登陆的方法

```js
    import request from '@/utils/request'
   /*
    *  @param data.user_id  登陆的用户名
    *  @param data.password  登陆的用户密码
    */
   export function login(data) {
       return request({
           url: '/A/login/login',
           params: data
       })
   }
```

  * login.vue 编写页面布局及调用请求方法

```html
<el-form :model="ruleForm" status-icon :rules="rule" ref="ruleForm" class="demo-ruleForm" label-width="80px">
    <el-form-item label="登录名" prop="user_id" :rules="rule.default">
        <el-input v-model="ruleForm.user_id"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" :rules="rule.default">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
</el-form>
```
   * 请求方法调用

```js
    import {
        mapActions
    } from "vuex";
    import * as addTaskAllFun from "./login"
    import * as validator from "@/utils/js/validator"
    export default {
        name: "Login",
        mounted() {
            // 绑定enter事件
            this.enterKeyup();
        },
        destroyed() {
            // 销毁enter事件
            this.enterKeyupDestroyed();
        },
        data() {
            return {
                link: "",
                ruleForm: {
                    user_id: "",
                    password: ""
                },
                rule: validator.default,
                formLabelWidth: "60px"
            };
        },
        methods: {
            ...mapActions(["login"]),
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //这里项目正式使用时,请根据用户登陆验证的方式自行修改到默认页面
                        this.login(this.ruleForm).then(res => {
                            addTaskAllFun.getDefaultPage().then(res => {
                                this.$router.push(res.data);
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) { //重置
                this.$refs[formName].resetFields();
            },
            enterKey(event) { //Enter回车请求
                const componentName = this.$options.name;
                const code = event.keyCode ?
                    event.keyCode :
                    event.which ?
                    event.which :
                    event.charCode;
                if (componentName == "Login" && code === 13) {
                    this.submitForm("ruleForm");
                }
            },
            enterKeyupDestroyed() { //Enter回车请求销毁
                document.removeEventListener("keyup", this.enterKey);
            },
            enterKeyup() { //Enter回车监听
                document.addEventListener("keyup", this.enterKey);
            }
        }
    }
```

## 1.4. 运行程序
- 安装运行时所需依赖

```shell
# 在项目根目录下执行
npm install
```
安装成功后,在项目的根目录下会生成node_modules目录, 此目录下存放的是运行时的依赖文件

- 启动Web服务

```shell 
# 在项目根目录下执行
npm run serve
```

- 访问Web
在浏览器中输入启动时的地址即可访问Web服务
默认用户: 1000
默认密码: 1000

# 二、详细使用说明

## 项目结构

![image](https://github.com/hyrenserv/vcol/blob/master/image/project-desc.jpg)

 - public 公共模块
   - favicon.ico 项目浏览器访问时的图标
   - index.html 首页入口文件
 - src 项目的源文件目录
   - assets 项目所需要的公共文件. 如: css, image等
   - hrds 所有项目的根目录
   - router 整体项目路由的配置

     - 路由配置说明(index.js)

``` js
     import Vue from 'vue'
     import Router from 'vue-router'
     /**
      *

      * 路由配置信息
      *  routes : [{这里的第一层表示为普通的路由地址,children : [{这个里面的是二级路由配置}]
      * 路由配置如 :
      *  {
      *      @param path: "/home"   表示的是路由匹配路径,
      *      @param name: 'home' 路由的名称
      *      @param component: () => import('@/hrds/login/index') 后面为路由地址的具体页面
      *      @param children: 路由下的子路由
      *  }
      *
      */
     export default new Router({
         routes: [{
                 path: '/',
                 name: 'login',
                 component: () => import('@/hrds/login/login.vue')
             },
             {
                 //菜单路由地址配置
                 path: "/home",
                 name: 'home',
                 component: () => import('@/hrds/components/menu'),
                 children: [{
                     path: '/systemParameters',
                     name: 'systemParameters',
                     component: () => import('@/hrds/a/syspara/syspara.vue')
                 }, ]
             },

             //其他访问连接直接跳转到无效页面
             {
                 path: '*',
                 name: '*',
                 component: () => import('@/hrds/components/notFound.vue')
             },
         ]
     })
```

   - store 存储公共的数据, 如: 保存用户登陆信息, 清空用户登陆信息等
   - util 存放公共js的地方, 如: 验证, 代码项的获取及请求后台的js文件
   - App.vue 是我们的主组件，所有页面都是在App.vue下进行切换的。其实你也可以理解为所有的路由也是App.vue的子组件。所以我将router标示为          App.vue的子组件。 
   - main.js 是我们的入口文件, 主要作用是初始化vue实例并使用需要的插件. 此文件中可以引入公共的js或者第三方的js, 并提供全局使用

     - 第三方文件的安装方式 npm install [插件] -S 或者 cnpm install [插件] -S, -S 表示直接将插件信息保存至package.json和package-lock.json文件中

![image](https://github.com/hyrenserv/vcol/blob/master/image/install-components.jpg)

	

![image](https://github.com/hyrenserv/vcol/blob/master/image/install-components2.jpg)

     - 在main.js的引用方式如: 

 

``` js
       // 引入echarts
       import echarts from 'echarts'
       Vue.prototype.$echarts = echarts
```

     - 引入前端UI, 请先全局安装element-ui( npm install element-ui -S )

 

``` js
     	//在main.js引入UI框架
     	import ElementUI from 'element-ui';
     	// 并注册到Vue的全局中
     	Vue.use(ElementUI);
```

     - 在.vue文件中的使用方式如:

 

``` js
       // 基于准备好的dom，初始化echarts实例
       let myChart = this.$echarts.init(document.getElementById('myChart'));
```

   - .env.development 开发服务地址的配置

 

![image](https://github.com/hyrenserv/vcol/blob/master/image/serverconf.jpg)

 

``` 
       #----A工程代理地址
       VUE_APP_HRDS_A_API = 'http://127.0.0.1:8888' 
```

   - .env.production 生产服务地址配置 (同开发配置一致)
   
   - babel.config.js 对地址下的文件进行转码
   
   - package-lock.json 的作用就是锁定安装依赖时包的版本，以确保其他人npm install时安装的依赖能夠保持一致
   
   - package.json 打包项目时的配置信息, 如: 打包命令, 启动命令及每个插件的版本控制等

 

![image](https://github.com/hyrenserv/vcol/blob/master/image/package.jpg)

 

   - vue.config.js 项目启动时的代理配置, 主要防止出现请求时的跨域及服务器过多配置繁琐的问题

 

![image](https://github.com/hyrenserv/vcol/blob/master/image/proxyconf.jpg)

   

``` js
       module.exports = {
           publicPath: './',
           outputDir: 'dist',
           assetsDir: 'static',
           productionSourceMap: false,
           lintOnSave: process.env.NODE_ENV === 'development',
           devServer: {
               open: false, //启动时,是否自动打开浏览器
               https: false, //是否为 https的方式
               overlay: {
                   warnings: false,
                   errors: true
               },
               proxy: {
                   //工程 A 代理配置规则
                   '/A': {
                       target: process.env.VUE_APP_HRDS_A_API, // 目标 API 地址
                       changeOrigin: true, // 允许websockets跨域
                       ws: true,
                       pathRewrite: { //匹配到 /A时,将/A地址重写为 /A/action/hrds/a/biz
                           '^/A': '/A/action/hrds/a/biz'
                       }
                   }
               }
           }
       }
```

### 请求后台方式

 - 定义请求方式, 假设我定义了个参数请求的方法(syspara.js)
   

![image](https://github.com/hyrenserv/vcol/blob/master/image/rquestjsconf.jpg)

   - 转换请求流程如图:
   

![image](https://github.com/hyrenserv/vcol/blob/master/image/relyconf.jpg)

   syspara.js, 定义方式如:
   

``` js
     //引入封装后请求后台的公共js
     import request from '@/utils/request'
     /**
      * 

      * 获取参数列表信息
      * @param data {JSON}: 向服务器发送的数据信息 
      * @returns {JSON} : 返回JSON数据

      */
     export function getSysPara(data) {
         return request({
             url: '/A/syspara/getSysPara',
         })
     }
```

 -  组件(syspara.vue)请求后台流程如图:
   

![image](https://github.com/hyrenserv/vcol/blob/master/image/requestservice.jpg)

   

### 数据展现方式

 - 定义数据集变量名称
 

``` js
    /**
     * 引入所需的js文件,注意这里有两种引入方式
     *  方式一 : 如果此组件中只使用了js中的一种方法,则使用单个方法的 
     *          引入,写法如: import {getSysPara} from "./syspara"
     *          最终在方法区的使用方式如: getSysPara().then(res=>{}).catch(error => console.log(error))
     *  方式二 : 如果此组件中只使用了js中的多种方法,则导入全部方法
     *          ,写法如: import * as functionAll(这个指的是变量名称) from "./syspara"
     *          最终在方法区的使用方式如: functionAll.getSysPara().then((res) => {}).catch(error => console.log(error))
     *  注意!!! ,如果方法中需要擦传递参数,这参数必须为JSON对象的数据方式,如: {'name':'Tom'}
     */
    import * as functionAll from "./syspara" //这里可以忽略后缀
    export default {
        data() {
            return {
                systemParameters: [], //定义接收数据的变量
                currentPage: 1, //当前页码
                pageSize: 10 //每页的条数
            }
        },
        created() {
            //使用创建钩子函数,进行页面数据的首次请求
            this.getSysPara(this.currentPage);
        },
        methods: {
            // 定义组件数据请求方法
            getSysPara(e) {
                //使用js文件中的请求方法
                functionAll.getSysPara({
                    currPage: e, //分页的首次页码
                    pageSize: this.pageSize //每页显示的数据量
                }).then((res) => {
                    if (res && res.success) {
                        this.systemParameters = res.data.sysParas;
                        this.totalItem = res.data.totalSize;
                    }
                })
            }
        }
    }
```

 - 使用数据进行页面的渲染

``` html
    <el-table stripe :data="systemParameters" size="medium" border>
        <el-table-column type="index" label="序号" width="62" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="para_name" label="系统参数名称" width="140" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="para_value" label="系统参数值" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="para_type" label="系统参数类型 " width="150" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="系统参数备注" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" width="164">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" @keyup.enter.native="searchData" placeholder="系统参数名称">
                </el-input>
            </template>
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="dialogFormVisibleUpdate = true;handleEdit(scope.$index, scope.row);">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
```

## 公共js

### request.js 请求服务器

 - js说明

``` js
// 创建Axios的实例对象,并设置默认默认的属性信息
const service = axios.create({
    withCredentials: true, // 跨域请求时,携带Cookis
    // timeout: 5000 // 请求超时设置
})
// 请求拦截器
service.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.state.user.token; // 从仓库中获取用户登陆信息
        config.method = 'POST' //请求方式为 post 
        if (token) {
            config.headers['Hyren_userCookie'] = getToken();
        }
        return config;

    },
    error => {
        return Promise.error(error);
    })

//响应结果处理
service.interceptors.response.use(

    response => {
        const res = response.data //得到响应数据
        if (res.code !== 200) { //检查请求的状态码,并根据每个状态码提示不同的消息处理
            const headers = response.headers
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '确认登出', {
                    confirmButtonText: '重新登入',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('login')
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            } else if (res.code == 500) { //如果返回的状态是 500表示服务器异常
                Message({
                    message: '服务器异常',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (headers['content-type'] === 'APPLICATION/OCTET-STREAM;charset=utf-8' || headers['content-type'] === 'APPLICATION/OCTET-STREAM') {
                return response

            } else if (res.code == 220) { //如果返回的状态是 500表示服务器异常

                Message({
                    message: res.message,
                    type: 'error',
                    duration: 5 * 1000
                })

                return res;
            }
        } else {
            return res;
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
```

* 使用方式

``` js
//引入
import request from '@/utils/request'
//使用request.js来完成请求,并返回结果
export function test(data) {
    return request({
        url: '/A/login/login',
        params: data
    })
}
```

### codeitems.js 获取代码项参数

 - js说明

``` js
//获取指定代码项的数据信息, 这里只列出了其中的一种
export function getCategoryItems(data) {
    return request({
        url: '/A/codes/getCategoryItems',
        params: data
    })
}
```

 - 使用方式

``` js
//--------------因为在main.js中设置了全局,所以使用方式为-----------
/** 获取代码项类型 */
import * as codeitems from '@/utils/js/codeitems.js'
Vue.prototype.$Code = codeitems;

/*
 *  .vue文件中使用方式如, data的数据格式如 {category:'AgentType'}, 
 *  返回数据格式如:[{"catCode":"35","code":"1","catValue":"Agent类别","value":"数据库Agent"}]
 * 
 */
this.$Code.getCategoryItems(data).then(res => {}).catch(error => console.log(error))
```

### auth.js 设置, 获取, 删除Cookie

 - js说明

``` js
//引入 js-cookie
import Cookies from 'js-cookie'
//定义cookie的key
const TokenKey = 'Hyren_userCookie'
//获取存储的cookie数据
export function getToken() {
    return Cookies.get(TokenKey)
}
//设置cookie信息
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
//清除cookie
export function removeToken() {
    return Cookies.remove(TokenKey)
}
```

 - 使用方式

``` js
//引入
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
//使用方式
getToken() //获取
setToken(data) //设置
removeToken() //清除
```

### base64.js 对组件之间传递的数据经行Base64加密

 - js说明

``` js
const Base64 = {
    //加密
    encode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    },
    //解密
    decode(str) {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
}
```

 - 使用方式

    

``` js
    // Base64
    import Base64 from '@/utils/base64.js'
    Vue.prototype.$Base64 = Base64;
    // vue文件中使用方式

    this.$Base64.encode(data) //加密
    this.$Base64.decode(data) //解密
```

## 扩展插件(已在main.js中注册)

### filter_Rules.js 自定义验证的插件

 - js说明
 

``` js
   /**

    - @param {Object} rule 当前对象
    - @param {String} value 检测的值
    - @param {Function} callback 回调函数

    */
   //引入验证
   import * as validate from '@/utils/js/validator'
   const checkValid = (rule, value, callback) => {
       if (!validate.checkValid(rule.regexType, value)) {
           callback(new Error(regular[rule.regexType]['error']))
       } else {
           callback()
       }
   }

   /**

    - 验证输入项是符合法
    -  @param {string} type 验证类型
    -  @returns {Boolean} 是否符合

    */
   // validator的一个Faction
   export function checkValid(type, value) {
       return regular[type]['regex'].test(value)
   }
```

 - js使用方式

``` html
<el-form-item label="Email验证" prop="email" :rules="filter_rules([{required: true,dataType: 'email'}])"></el-form-item>
```

   - required 是否必输
   - dataType 用某种校验方式

### message.js 操作状态提示

 - 使用方式如

    - 删除成功 : `this.$Msg.deleteSuccess(res);` 
    - 更新成功 : `this.$Msg.updateSuccess(res);` 
    - 保存成功 : `this.$Msg.saveSuccess(res);` 
    - 删除确认 : `this.$Msg.confirmMsg(titleMsg);` 
    - 自定义   : `this.$Msg.customizTitle(titleMsg,type);` ,type有(success,warning,error)三种,或不填写使用默认

### regular.js 校验输入项的合法性正则, 后续请根据情况, 自行添加即可

``` js
/**
 * @param {String} key 表示为对应的验证规则类型名称
 * @param {RegExp} regex 表示为对应的验证规则
 * @param {String} error 表示为验证不通过时的错误提示
 * @param {String} title 表示为验证中文名称描述
 */
const regular = {
    number: {
        regex: /^[0-9]*$/,
        error: '只能填写数字',
        title: '整数'
    },
    chinese: {
        regex: /^[\u4e00-\u9fa5]{0,}$/,
        error: '只能填写中文',
        title: '中文'
    },
    email: {
        regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        error: '邮箱信息填写错误',
        title: '邮箱'
    },
    enAndNum: {
        regex: /^[A-Za-z0-9]+$/,
        error: '只能输入英文和数字',
        title: '英文和数字'
    },
    enAlphabet: {
        regex: /^[A-Za-z]+$/,
        error: '只能填写英文字母',
        title: '英文字母'
    },
    compositions: {
        regex: /^\w+$/,
        error: '只能填写数字、26个英文字母或者下划线组成的字符串',
        title: '英文,数字和下划线组合'
    },
    composition: {
        regex: /^\w{3,20}$/,
        error: '只能填写数字、26个英文字母或者下划线组成的字符串,至少三个字符',
        title: '英文,数字和下划线组合'
    },
    mobilePhone: {
        regex: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
        error: '无效的手机号码',
        title: '手机'
    },
    accountNumber: {
        regex: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
        error: '帐号不合法(以字母开头，允许5-16字符，允许字母数字下划线)',
        title: '账号'
    },
    password: {
        regex: /^[a-zA-Z]\w{5,17}$/,
        error: '密码不合法(以字母开头，长度在6~18字符之间，只能包含字母、数字和下划线)',
        title: '密码'
    },
    dataScourenum: {
        regex: /^[a-zA-Z][a-zA-z0-9]{3}$/,
        error: '编号不合法(以字母开头的不超过四位数的字母数字组合)',
        title: '编号'
    },
    confignum: {
        regex: /^[a-zA-z0-9]{1,4}$/,
        error: '编号不合法(1-4位数的数字或字母组合)',
        title: '任务编号'
    },
    noLengthVaild: {
        regex: /^[a-zA-Z]\w*$/,
        error: '编号不合法(以字母开头)',
        title: '任务编号'
    },
    ip_verification: {
        regex: /^$|^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
        error: '无效IP地址',
        title: 'ip地址'
    },
    port_verification: {
        regex: /^(1(02[4-9]|0[3-9][0-9]|[1-9][0-9]{2})|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
        error: '端口不合法，正确范围1024-65535',
        title: 'agent端口'
    },
    webContext: {
        regex: /^[/]{1}[a-zA-Z]+$/,
        error: '请使用"/"开头,字母结尾',
        title: 'Agent Context路径'
    },
    agent_pattern: {
        regex: /^[/]{1}\w+[/]{1}[*]{1}$/,
        error: '请使用"/"开头,并以"/*"结尾,不能包含特殊符号',
        title: 'Agent访问路径'
    },
}
```

 - 使用方式
 

``` html
 <el-form-item label="Email验证" prop="email" :rules="filter_rules([{required: true,dataType: 'email'}])"></el-form-item>
```

### validator.js 默认的输入项检验, 这里提供默认的三种方式

 - js说明

``` js
    export default {
        default: [{
            required: true,
            message: '该输入项为必填项',
            trigger: 'blur'
        }],
        selected: [{
            required: true,
            message: '请至少选择一项',
            trigger: 'change'
        }],
        checked: [{
            required: true,
            message: '请至少选择一项',
            trigger: 'change'
        }],
    }
```

 - 使用方式
 

``` js
 //引入
 import * as validator from "@/utils/validator"
```

``` html
<!--验证选择-->
<el-form-item label="特殊资源" prop="resource" :rules="validator.default.checked">
    <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
</el-form-item>
<!--验证必须输入项-->
<el-form-item label="活动形式" prop="desc" :rules="validator.default.default">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
</el-form-item>
```

## 模块说明

 - 登陆模块

  

![image](https://github.com/hyrenserv/vcol/blob/master/image/login.jpg)

    

``` html
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="80px">
            <el-form-item label="登录名" prop="user_id">
                <el-input v-model="ruleForm.user_id"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
```

``` js
 //引入组件
 import {
     mapActions
 } from "vuex"
 export default {
     methods: {
         ...mapActions(["login"]), //引入公共登陆方法
         submitForm(formName) {
             this.$refs[formName].validate(valid => {
                 if (valid) {
                     //这里项目正式使用时,请根据用户登陆验证的方式自行修改到默认页面
                     this.login(this.ruleForm).then(res => { //开始登陆认证
                         addTaskAllFun.getDefaultPage().then(res => {
                             //登陆成功后跳转的页面,这里只是个列子
                             this.$router.push("syspara");
                         });
                     });
                 } else {
                     return false;
                 }
             });
         },
     }
 }
```

 - 树模块
 

``` js
 //vue文件中直接引用,并放入组件中...注意这里没有直接引入到index..因为默认会找当前目录下的index.vue,如果是其他名称这需要填写到文件名称
 import Tree from "../../components/tree";

 export default {
     components: {
         Tree
     }
 }
```

 

``` html
    <Tree />
```

 - 请求加载模块
  

``` js
    import Loading from "../../components/loading";

    export default {
        components: {
            Loading
        },
        data() {
            return {
                isLoading: false //当值为 true是,出现加载效果
            }
        }
    }
```

``` html
    <loading v-if="isLoading" />
```

 - 其他模块使用请参照以下链接

    [海云模块使用请阅读](https://github.com/hyrenserv/vcol)

  

## 项目运行

 
 - 安装程序依赖
  

``` 
   根目录下执行 npm install ,此时会在根目录下出现node_modules目录...这个目录下就是依赖所需要的文件
```

![image](https://github.com/hyrenserv/vcol/blob/master/image/install.PNG)

 - 启动程序
 

``` 
 根目录下执行 npm run serve
 ```

![image](https://github.com/hyrenserv/vcol/blob/master/image/running.PNG)

## 项目打包

``` 
根目录下执行 npm run build,此时会在根目录下出现dist目录...这个目录下的文件直接放入对应的web服务即可
```

![image](https://github.com/hyrenserv/vcol/blob/master/image/build.PNG)
