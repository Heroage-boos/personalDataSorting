下载vuex  npm  i vuex

新建文件夹 store或vuex

​		index.js  

```
//引入vue
import vue from “vue"
//vuex
import vuex from "vuex"
//引入modules
import modules from "modules"
//应用vuex
vue.use(vuex)
//暴露出去
export default new vuex.store({modules,})

```

在store下新建文件夹modules

​		index.js

```
//引入users
import users from "./modules/users"
//暴露出去
export default {users}
```

​	具体模块名xxx.js

users.js

```
const state={} //用来保存通信的数据
const getter={}//只读的 获取state的修饰
const actions={}//用来间接更新的方法
const mutations={}//用来存放更新通信数据的方法


//暴露出去
export default {state,actions,mutations}

```

在入口文件中应用 

//引入store

import store from “./store”

//全局应用

new Vue({

​	store,

})



具体文件中使用

//引入

import {mapActions,mapMutations,mapGetter，mapState}

//使用 在方法methods中引入方法，在computed中引入数据



