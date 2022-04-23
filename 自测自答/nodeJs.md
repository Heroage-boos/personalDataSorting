###  node01

- nodejs轮询机制
  1.nodeJS使用了第三方库libuv，nodeJS会把一些异步操作（I/O、文件的读写）交给libuv处理。nodejs的主线程没有必要等待，可以继续处理其他事情。
  2.libuv会开启多个线程去执行这些异步操作，当异步代码操作完毕以后，会把回调函数放到回调队列中，主线程在适当的时候回去轮询回调队列。
  3.nodeJs把异步代码分为了两大类，分别是微任务和宏任务。微任务优先宏任务执行。
  4.宏任务也是根据异步代码不同，而产生多种回调队列，nodejs会依次轮询这几个回调队列：timers、pendding callback、idle、poll、check、close
      1).timers阶段：处理setTimeout和setInterval的回调函数
      2).pedding阶段：处理系统级别操作的回调函数
      3).idle阶段：处理nodejs内部的回调函数
      4).poll阶段：处理I/O或者网络请求等异步操作的回调函数
          - 当poll阶段不为空的时候，那么执行完回调函数，就继续执行下个阶段check了
                  - 当poll阶段为空，会一直等待poll中有其他的回调函数
                  - 或者当poll阶段为空的时候，如果 timer阶段的计时器到期了，或者check阶段有setImmediate等待执行的时候，会直接跳入check阶段
      5).check阶段：setImmediate的回调函数
      6).close阶段：执行一些关闭的函数

  


- 微任务和宏任务
  1.nodejs把所有的异步操作代码分为了微任务代码和宏任务代码
  2.nodejs会优先执行微任务代码，然后才执行宏任务代码
  3.微任务：process.nextTick，Promise的then\catch\finally、queueMicrotask
  4.process.nextTick一定是最先执行，其他微任务根据书写代码依次执行
  5.在宏任务每次执行下一个阶段之前，都会去检查微任务队列中是否有微任务需要执行，然后才会执行下一个阶段

  

  

- nodejs模块化的暴露和引入

  - 暴露：使用module.exports.XXX=XXX:给暴露的对象扩展一个XXX方法  
        使用module.exports = XXX:暴露的直接就是XXX方法
        exports.XXX = XXX:给暴露的对象扩展一个XXX方法
        exports = XXX:错误方法不能写！！！！
  - 引入：
    使用require方法引入即可，如果引入的是自定义模块，则方法的参数是模块路径

  

  

- 分析module.exports和exports的区别

  - 模块真正暴露出来的是module.exports指向的对象，module.exports指向的对象可以随意修改。
  - exports指向的是最module.exports对象，可以直接给exports扩展属性和方法，但是如果修改了exports对象的指向（exports = XXX），则exports指向的就不是暴露的对象了，就不能暴露了



### 20. node02

- 分析node的外层函数
  - module
  - exports
  - require
  - __dirname
  - __filename

- 谈一谈Buffer
  Buffer.from()

- 谈谈process

- 谈谈path.resolve()方法

- 谈一谈fs文件系统 



### 21. node03

- 谈一谈加密

- 什么是http协议

- nodejs搭建一个服务端，并返回一个html数据

- 书写一个快速读写文件



### 22. node04

- 请求方式及解析
- 常见响应状态码
- 什么是TCP三次握手
- 什么是TCP四次挥手
- 从输入url到解析出页面 中间经历的过程



### 23. node05

- 谈一谈cookie
  1.“HTTP 是一个无状态的协议”:即使同一个客户端连续两次发送请求给服务器，服务器也识别不出这是同一个客户端发送的请求。为了解决 HTTP 无状态导致的问题，后来出现了 Cookie
  2.Cookie指某些网站为了辨别用户身份而储存在用户本地终端上的数据
  3.Cookie作为一段一般不超过 4KB 的小型文本数据，它由一个名称（Name）、一个值（Value）和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成
  4.Cookie的设置
      - 客户端发送 HTTP 请求到服务器
      - 当服务器收到 HTTP 请求时，在响应头里面添加一个 Set-Cookie 字段
      - 浏览器收到响应后保存下 Cookie
      - 之后对该服务器每一次请求中都通过 Cookie 字段将 Cookie 信息发送给服务器。
  5.一些设置：
      - Expires 用于设置 Cookie 的过期时间
      - Max-Age 用于设置在 Cookie 失效之前需要经过的秒数
      - HTTPOnly：设置 HTTPOnly 属性可以防止客户端脚本通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击。


- 谈一谈缓存
  1.缓存是性能优化中简单高效的一种优化方式。一个优秀的缓存策略可以缩短网页请求资源的距离，减少延迟，并且由于缓存文件可以重复利用，还可以减少带宽，降低网络负荷
  2.缓存分为强缓存和协商缓存
      - 强缓存：不会向服务器发送请求，直接从缓存中读取资源，并且显示from disk cache或from memory cache字样，强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。
          - 协商缓存：协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
          - 描述协商缓存过程

- 谈一谈session
  1.因为 Cookie 可以通过客户端修改，而 Session 只能在服务端设置，所以安全性比 Cookie 高，一般会用于验证用户登录状态
  2 Session 是基于Cookie 实现的另一种记录服务端和客户端会话状态的机制
  3 Session 是存储在服务端，而 SessionId 会被存储在客户端的 Cookie 中
  4 描述Session的过程

- 正则表达式的两种创建方式 案例说明