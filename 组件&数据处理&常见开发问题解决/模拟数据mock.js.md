官网http://mockjs.com/

mockjs是用来模拟产生一些虚拟的数据，可以让前端在后端接口还没有开发出来时独立开发。我们可以使用真实的url，mockjs可以拦截ajax请求，返回设定好的数据。

```
Mock.mock( rurl, rtype, template|function( options ) )
rurl可选。
表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 '/domian/list.json'。

rtype可选。
表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。

template可选。表示数据模板，可以是对象或字符串。
数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
例如：'name|1-10':1 会产生一个1-10之间的整数，详细规则参见官方文档

function(options)可选。
表示用于生成响应数据的函数。
options
指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性

```





要是没在使用的页面引入mock就会报404

import "../../mock/index";





# 前端自行模拟Mock数据提高开发效率

**前言**：前后端交互时后端，在没有得到后端数据时，需要自行模拟数据，来展示到页面，这样提高我们的开发效率，同时也向后端请求我们想要的数据格式，最后得到后端数据仅需改变接口即可，这时候用到我们强大的数据模拟 **Mock数据：模拟数据**

## 一、Mock数据：模拟数据

**mockjs官网**：[mockjs.com/](https://link.juejin.cn/?target=http%3A%2F%2Fmockjs.com%2F)

**mockjs官方文档**：[github.com/nuysoft/Moc…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnuysoft%2FMock%2Fwiki%2FGetting-Started)

**具体使用方法**

**第一步 安装mockjs**

> npm install mockjs

**第二步 创建一个mock目录生成mock数据**

```javascript
例如：course.js
import Mock from "mockjs";

//mock课程数据
var result=Mock.mock({
  code: 200,
  msg: "操作成功",
  data: {
    current_page: 1,
    last_page: 18,
    total: 178,
    "list|10": [
      {
        id: "@id",  //模拟id
        "price|100-200.1-2": 100, //模拟小数，在计算机中也称浮点数
        "has_buy|1": [0, 1], //模拟状态值,0,1,2,
        title: "@ctitle",  //模拟中文标题
        address: "@county(true)",  //模拟省市县
        "teachers_list|1": [
          {
            course_basis_id: "@id",
            id: "@id",
            teacher_avatar: "@image('150x120', '#ff0000', '1909A')",  //模拟图片
            teacher_name: "@cname"  //模拟中文姓名
          }
        ]
      }
    ]
  }
});


export default result;

//创建mock的入口文件，并配置请求的接口地址，提交方式，返回的假数据
import Mock from 'mockjs'
//导入的模拟数据
import courseData from "./course";

/**
 * Mock.mock( rurl, rtype, template )
 * rurl:请求的接口地址
 * rtype:提交方式
 * template:返回数据
 */

Mock.mock("http://www.1909A.com/coureslist", "get", courseData);
复制代码
```

** 第三步：将模拟的数据注入到main.js**

```javascript
//注入mock
import './mock'
复制代码
```

**第四步：在要请求的组件中请求数据**

```javascript
 axios.get('http://www.1909A.com/coureslist').then(res=>{
        console.log(res)
 })
复制代码
```

## 二、easy-mock

easy-mock：基于mockjs生成在线假数据,是一款可以在线上编辑的数据的工具 但是请求的原因不稳定访问，不建议大家去使用

**总结：这样模拟数据插件，更多的是提高了我们前端开发的效率，我们前端即掌握到产品的原型到ui的设计再到后端的接口调节，忽然发现我们前端一人独大了，只要我们充分了解到业务需求我们就可以自行模拟数据，来提高我们的效率，为开发节省时间，给老板省成本，我们获奖金，为用户加体验，认可我们好团队，加油！！！**





