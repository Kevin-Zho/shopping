# shopping

>一个Vue.js项目

【前端】
Vue：用于构建用户界面的 MVVM 框架。它的核心是响应的数据绑定和组系统件
vue-router：为单页面应用提供的路由系统，项目上线前使用了 Lazy Loading Routes 技术来实现异步加载优化性能
vuex：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
vue-infinite-scroll：第三方下拉加载库，优化页面加载
less：css 预编译处理器
ES6：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用
【后端】
Node.js：利用 Express 起一个本地测试服务器
axios：服务端通讯。结合 Node.js 代理后端请求，
【自动化构建及其他工具】
webpack：项目的编译打包
vue-cli：Vue 脚手架工具，快速搭建项目
eslint：代码风格检查工具，规范代码格式

主要页面：商城首页、购物车页、收货地址页、确认订单页、付款成功页等等。

核心页面：购物车页
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
