src-->utils-->index.js 存放拦截器配置  

拦截器用来解决:

封装一个请求的方法，将来所有api都通过这个方法去发送请求
  实现：

          1. 复用公共的请求地址前缀 /api
                自动携带公共的请求参数 token、userTempId
          2. 获取响应的数据太麻烦了，需要res.data.data
          3. 使用时直接得到data数据
          4. 请求成功（响应状态码2xx）并不代表功能成功，例如：有可能登陆失败
                当我们封装好了，外面使用时，then方法得到就是功能成功
                catch方法得到就是请求失败或功能失败
          5.   对请求失败的错误进行更加详细错误提示
                进度条提示



发送请求工作流程：(上一步的返回值会自动传递给下一步)
    1.触发请求拦截器的回调（接受参数：config，返回值：config）
      设置公共的请求参数
    2.发送请求（接受参数：config，返回值：response）
      发送请求的配置对象由请求拦截器的回调返回值指定
    3.触发响应拦截器的回调（接受参数：response，返回值：response.data.data）
      处理响应结果
    4.触发then/catch的回调（接受参数：response.data.data）
      then接收到的参数由上一步的返回值的指定



utils-->request-->index.js

```
1）引入axios
import axios from "axios"

2）创建axios实例
const requstAxios=axios.create({
  3）配置拦截器
  baseURL:"/api",//请求拦截器的公共地址
  headers:{},//请求拦截头携带的公共参数
  timeouts:1000,//超时时间，超过这个时间没响应则会相应提示
})

4）请求拦截器
requstAxios.interceptors.request.use((config)=>{
	//请求成功执行的回调函数  config是指定的返回值
	return config;
},
()=>{
	//请求失败执行的回调函数  一般不需要写什么
})

// 所有错误对象
const messages = {
  401: '未授权',
  403: '禁止访问',
  404: '资源找不到',
  500: '服务器内部错误'
}

//5.响应拦截器
requstAxios.interceptors.response.use(
  (res) => {
  
   //请求成功触发的回调函数
    //用户未登录携带临时id   如果之前登录过用之前的临时id 没有就重新创建临时id
    //每次用户请求页面的时候都会携带临时id
    config.headers.userTempId = getUid();
    //用户登录了
    const token = store.state.user.token;
    if (token) {
      //将token添加到请求头里面 每次请求时都会携带上去 token资源凭证
      config.headers.token = token;
    }
    /* 用户登录了就会携带token  用户没有登录只会携带临时id */

  
    //请求成功和失败也要关闭进度条
    NProgress.done();

    //请求成功不代表功能成功 所以需要判断
    if (res.data.code === 200) {
      //返回指定的参数 使用时不同res.data.data。。。。

      return res.data.data;
    } else {
      //响应失败触发的回调函数
      //返回肯定是返回失败的promise
      return Promise.reject(res.data.message || "未知错误，请联系管理员");
    }
  },
  (error) => {
    //请求成功和失败也要关闭进度条
    NProgress.done();
    //请求返回失败后  需要精确的给用户提示错误
    //返回查看是有响应的还是没响应的
    let message = "未知错误，请重试";

    //返回查看是有响应的
    if (error.response) {
      message = tips[error.response.status];
    } else {
      //没响应的
      if (error.message.indexOf("exceeded") > -1) {
        message = "请求超时";
      } else if (error.message.indexOf("Network") > -1) {
        message = "断网了，请重试";
      }
    }
    return Promise.reject(message);
  }
);

6）暴露出去
export default requstAxios



```



完成拦截器后在需要的api中使用

```
/* import axios from "axios"; */
/* 引入拦截器  */
import requstAxios from "./Interceptor";
//首页三级分类请求
function navList() {
  return requstAxios({
    method: "get",
    //请求地址
    url: "/product/getBaseCategoryList",
    params: {
      //请求参数为空
    },
  });
}

export default navList;
```







