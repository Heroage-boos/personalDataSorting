vue项目，ui框架elment-ui

创建vue项目

vue create 项目名

按需引入element-ui (https://element.eleme.io/#/zh-CN/component/quickstart)

​    1）npm i element-ui

​	2）npm install babel-plugin-component -D

​    3)将 .babelrc 修改为：

```json
 "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
```

   4) main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```
