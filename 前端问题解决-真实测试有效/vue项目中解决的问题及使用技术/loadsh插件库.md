Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

官网:https://www.lodashjs.com/docs/lodash

下载

```
npm i lodash
```

引入

```
全部引入
import loadsh from "loadsh"
推荐使用按需引入  例如:节流 
import { _.throttle } from "loadsh";
简写,
import { throttle } from "loadsh";
```

使用  方式1:

```
_.throttle(func, [wait=0], [options=])
```

方式2,vue 项目方法中使用

```
 methods: {
    move: throttle(function (e) {
         ....
   	})
 }
```

