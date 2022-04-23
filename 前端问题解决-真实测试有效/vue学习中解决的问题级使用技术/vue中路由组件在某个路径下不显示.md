需求：

方法1：利用$router，的路径进行判断,

```
 <Header v-if="$route.path !== '/login' && $route.path !== '/register'" />
 
 
 进行跳转的路由中 this.$route的状态
 {name: "Register", meta: {…}, path: "/register", hash: "", query: {…}, …}

```

方法2：

路由router中，利用$meta参数定义boolean参数

```
修改router.js中路由跳转参数添加上meta

 {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      isShow: true,
    },
  },


此时路由跳转到设置meta参数的路由时会携带有meta参数的值，可以依据此进行判断 
this.$route

{name: "Register", meta: {…}, path: "/register", hash: "", query: {…}, …}
fullPath: "/register"
hash: ""
matched: [{…}]
meta: {isShow: true}
name: "Register"
params: {}
path: "/register"
query: {}
__proto__: Object
```



页面中使用，

```
<Header v-if="!$route.meta.isShow" />
```

