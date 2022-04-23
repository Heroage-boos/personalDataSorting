uni-app

1.概念:





2.想要变成h5项目,在浏览器上运行

​	工具:HBuilder X

​	流程:HBuilderX编译器-->工具-->运行配置-->浏览器运行配置-->Chrome浏览器安装路径配置



3.想要变成小程序项目，在开发工具上运行

​     工具:HBuilder X

​	 流程1:HBuilderX编译器-->工具-->运行配置-->小程序配置-->微信开发者工具安装路径(注意不需要点.exe)

​	流程2:微信开发者工具 设置-->安全-->服务端口 -->开启



4.统一配置

​	微信开发者工具-->设置-->编辑设置-->取消勾选 修改文件自动保存	(注意。如果出现HBuilderX中代码已经修改，但是小程序开发者工具中，页面效果没有更新，注意检查代码更新)



5.uni-app项目结构

-pages 页面存放

-static  静态媒体资源

-unpackage  

  -dist

​	-dev

​		-m.automator

​		-.sourcemap

​	 	-mp-weixin

-App.vue   vue首页(App.vue=app.wxss)

-main.js  入口文件(main.js=app.js)

-maniifest.json   当前项目的说明书,一以及脚手架的配置文件(注意es5转es6勾选起来，将小程序appip填入)

-pages.json(pages对应文件中的pages,globalStyle对应window)，app.json+所有页面json(全局配置+页面配置)



6.搭建koa服务器





7.使用Vuex

  1.创建store文件夹

  2.创建modules夹-->xxx.js,具体状态文件

```
const state={}//初始化用来集中管理的状态

const actions={
	//commit用来触发mutations
	//data接收的数据只能有一个，多个使用对象或者数组
	getIndexData({commit},data){
	
	//GETINDEXDATA触发的mutations方法
	//data接收的数据只能有一个，多个使用对象或者数组
	  commit("GETINDEXDATA",data)
   }
}//用来间接更新的方法

const getters={}

const mutations={
  //state 旧的state中管理的数据
  //data新传入的data数据
  GETINDEXDATA(state,data){
  }

}
export default{
state,
actions,
getters,
mutations
}
```

  3.创建一个index.js，用来引入创建的状态文件

```
//1.引入vue
import vue from 'vue'
//2.引入vuex
import vuex from 'vuex'
//3.引入modules
import home from "./modules/home"
//4.创建store实例

//4.暴露出去
export default {
   home
}
```



  4.将vuex引入vue入口文件中

   --下面在具体页面中进行操作

   5.读取state   this.$store.home.state()

​	  读取actions  

​	  读取mutations  

​		

