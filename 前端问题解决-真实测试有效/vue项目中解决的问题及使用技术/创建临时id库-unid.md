官网地址:https://www.npmjs.com/package/uuid

模拟创建一个id,真实项目中一般服务器会返回一个给你

1.下载

npm i uuid

2.封装

untis-->uid.js

```
//临时的id库
import { v4 as uuidv4 } from "uuid";

//先读取本地的uid
let uid = localStorage.getItem("userTempId");

export default function getUid() {
  //如果没有再重新生成新的uid
  if (!uid) {
    uid = uuidv4();
    localStorage.setItem("userTempId", uid);
  }
  return uid;
}

```

3.其他组价或js中调用使用

这里是在拦截器中使用

untis-->request.js

```
//引入  临时id 封装
import getUid from "../../utils/uid";


//使用
//每次用户请求页面的时候都会携带临时id
 config.headers.userTempId = getUid();
```



