# Vue2

1.vue简介

​	Vue.js是什么?是一套用于构建用户的渐进式框架和自底向上增量开发的设计

​			 -渐进式的含义，我的理解是：没有多做职责之外的事。

2.声明式渲染

```
<div id="app">{{message}}</div>

var app =new Vue({
	el:”#app",
	data:{
	 message:"hello"
	}
})

//---页面
hello

```

3.



vue-cli:基于Node.js构建工具

为什么vue-cli脚手架data不是用对象，而使用函数返回值:vue-cli使用组件开发，data如果使用对象表示的话组件间通信

## 指令

v-bind，：xxx="xxx", 当向数据绑定

v-model  双向数据绑定

v-text:  标签内的数据当做data数据解析

v-html:

v-for:遍历渲染  :  v-for="(item,index) in arr" :key=“index" 

v-if/v-else-if/v-else:显示隐藏dom,影藏是通过卸载(移除)dom 

v-show:控制元素的显示和隐藏，通过改变display的样式

v-cloat:防止闪屏

v-once:更新的时候触发一次

v-slot :插槽，用来传递标签数据



## 全局API





## 实例(原型)上属性，方法



## 生命周期钩子



## 组件通信方案

参考:https://juejin.cn/post/6903796293445877773#heading-6

1.父组件通过`prop的方式向子组件传递数据，而通过`$emit` 子组件可以向父组件通信。

prop :

$emit :



2.通过`$parent`和`$children`在vue的实例上，可以访问组件的实例，通过`$parent`和`$children`关联，  拿到实例可以访问此组件的所有方法和`data`    （理论上可以访问任意组件，但是无法精确匹配到目标组件     适用于父子组件间通信)

$parent 

$children



3.`provide`/ `inject` 是`vue2.2.0`新增的api, 简单来说就是父组件中通过`provide`来提供变量, 然后再子组件中通过`inject`来注入变量。  (祖-->孙组件间通信, 父级组件无法主动通信)

`provide`/ `inject`：



4.`ref/refs：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据。(适用于父子组件通信)



5.EventBus`事件总线, `EventBus` 所有事件统一调度，有一个统一管理事件中心，一个组件绑定事件，另一个组件触发事件，所有的组件通信不再收到父子组件的限制，那个页面需要数据，就绑定事件，然后由数据提供者触发对应的事件来提供数据，这种通讯场景不仅仅应用在`vue`,而且也应用在`react`。（适用于任何组件间通信）



6.vuex:专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态. 根本解决复杂组件的通信问题, 支持异步组件通信



7.`$attrs`与 `listeners`

没有声明接收的props会在$Attrs上显示，可以通过inheritAttrs为false去掉



8.使用插槽传递标签数据

默认插槽  :  -父组件:<tepalate  slot>标签数据</tepalate>

​					-子组件<slot>

​					父组件的所有标签会在slot处全部展示

具名（命名)插槽:-父组件:<tepalate  slot:header>标签数据</tepalate>

​					-子组件<slot name="header">

​					父组件的只展示header命名的插槽，不写header里面的不展示

作用域插槽:子向父传递数据

父组件:<tepalate  v-slot="data">标签数据  {{data}}</tepalate>

​					-子组件<slot :data="data">

9. .sync

   10.浏览器存储  cookie， localstorage,sessionstorage

​    11.服务器存储:session

#### 总结

常见使用场景可以分为三类:

- 父子组件通信: `props`; `$parent` / `$children`; `provide` / `inject` ; `ref` ;  `$attrs` / `$listeners`,.sync
- 兄弟组件通信: `eventBus` ; 	vuex
- 跨级通信:  `eventBus`；Vuex；`provide` / `inject` 、`$attrs` / `$listeners`



## 路由跳转

vue中使用路由需要先进行下载  npm i   vue-router   

书写配置文件  router-->  index.js

```
import vue from "vue"
import vueRouter from "vue-router"

//引入组件
import  xxx from "XXXX"

//注册vueRouer
vue.use(vueRouter)
//配置
const router=new vueRouter({
    mode:"history",//模式
    routers:[
    {
       path:"指向地址"
       component:组件名
	},
	 {
       path:"指向地址/:xxx"  //实现多对跳转
       component:组件名
	},
	{
	  path:"*"//没有匹配到地址时跳转的路由
      redirect:"路径"
	}
    ]
})

//暴露出去
export default router
    
```

在main.js入口文件中  引入 router 在，new Vue({router,}) 应用



路由跳转方式:

1.使用router-link 定义路由连接，  <router-link to="路由地址"></router-link>  

​    		属性:- active-class="active" ：切换颜色展示

​            使用router-view 展示路由切换，哪里需要展示哪里用		<router-view/>

2.编程式跳转

​			this.$router.history.push(“url路由地址")  跳转新地址可以是当前url

​			this.$router.history.replatce(“url路由地址")  跳转新地址不可以是当前url

​			this.$router.history.go(1)   进入下一页

​			this.$router.history.go(-1)  返回上一页



路由跳转是携带参数:

1.params和query

  传递:   this.$router.history.push/replatce("url路由地址/:_id?xxx=${"xxx"}")

  获取query:   this.$route.query.xxx

 获取params:   this.$route.$params._id

2.通过router-view携带  <router-view :data="data"/>





## vue脚手架

element   需要先下载一次全局

下载   npm i @vue/cli  -g

创建  vue create 









# Vue3

1.比较vue2，vue3的主要变化

vue3以vue2为底层，vu3不兼容ie浏览器,性能提升

1)操作的数据都是响应式的

2)优化了diff算法(和vue2不太一样)

4)更好的支持typescript(vue3项目可以配合typescript使用)

5)框架使用Vite取代webpack(减少了webpack无用代码，缩小体积，减少打包时间)



2.具体变化

1)所有全局的api都使用app使用 

2)模板可包含不止一个根节点

3)在同一元素上使用的 `v-if` 和 `v-for` 优先级已更改， (vue2中是v-for比较高)

4)自定义事件必须使用emits声明，不声明就是原生事件

5)v-model用法已更改，替换v-bind,sync

6)更改声明周期中卸载名字分别为: BeforDestroy--> beforeUnmount   和 Destroy-->unMounted    

7)data始终被声明为一个函数

8)移除keyCode按键事件直接定义，只能使用按键字母方式

9)移除了$on，$off 和 $once 实例方法,无法使用全局事件总线



新增了API:





3.模板入口

3.模板入口

  使用 createApp.mount("#app")



4.组合式API基本用法



5.响应式实现



