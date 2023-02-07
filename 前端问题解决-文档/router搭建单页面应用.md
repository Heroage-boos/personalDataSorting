1.下载 vue router

1.1引入 vue router

import Vue from "Vue"

import VueRouter from "vue-router"

2.注册vue router

Vue.use(VueRouter)

3.路由配置

const routers=[{

​	path:"/a",

​    name:xxx,

   component:xxx

}]

4.创建vuerouter实例

const router=new VueRouter({

  mode:"history”,

  router

})



5.暴露出去

import default  router



6.全局引入

----main.js

import store from "../router"



new Vue({

   store 

})