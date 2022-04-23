#### 1.作用域

  概念:变量可作用的范围

  作用域分为:全局作用域，函数作用域，es6新增块作用域

  es6之前执行上下文会进行函数提升和变量提升，执行入栈是先入后出

​	   -变量提升: 在变量定义语句之前, 就可以访问到这个变量(undefined)

​        -函数  提升: 在函数定义语句之前, 就执行该函数

  es6新增的块级作用域中没有变量提升，同一个作用域中禁止重复声明变量

   作用域链:作用域中的变量沿着父级作用域一级一级向上查找的过程，如果没找到就返回undefiend



#### 2.闭包

概念:闭包是指有权访问另一个函数作用域中的变量

闭包的产生的原因:内部的函数存在外部作用域的引用就会导致闭包(存在上级作用域的引用)，函数最终执行了

闭包的作用:保护函数的私有变量不受外部干扰，形成不被销毁的栈内存，将上级作用域引用保存下来，实现属性或方法的私有化‘

哪些地方使用过闭包:1）使用return 返回函数

​									2）iife自调用函数

​									3)所有的回调函数（使用回调函数就是在使用闭包）

​									4）函数作为参数

使用闭包需要注意什么:容易造成内存泄露，因为其他作用域的引用，过渡使用闭包会使内存占用过多   

js堆栈内存释放:堆内存:存放的是引用类型的值，将引用类型的空间地址变量赋值成null,就释放了

​						    栈内存:存放的基本数据类型的值，一般当函数执行完后函数的私有作用域就会被释放掉

#### 3.原型,原型链

1. 原型是什么

- 原型指的是两个属性：`prototype` 和 `__proto__`
  - `prototype`叫做显示原型属性
  - `__proto__`叫做隐式原型属性

2. 原型属性有什么特点，有什么内容

- 显示原型属性

  - 除了箭头函数以外其他所有函数都有显示原型属性
  - 它的值是一个对象，叫做原型对象
    - `constuctor`方法，指向函数本身
    -  默认指向 `Object.prototype`

- 隐式原型属性
  - 所有对象都有隐式原型属性
  - 它的值指向其构造函数的显示原型属性的值（或者说原型对象的值）

3. 其他内容

- 所有数组都是 new Array 产生的，所以数组的隐式原型属性指向 Array 显示原型属性，显示原型属性上有很多数组的方法：map、reduce、filter、some 等，数组的方法都是继承自 Array 显示原型属性上的
- 所有函数都是 new Function 产生的，所以函数的隐式原型属性指向 Function 显示原型属性，显示原型属性上有很多函数的方法：call、apply、bind 等，数组的方法都是继承自 Function 显示原型属性上的

4. 特殊情况

- `Function.__proto__ === Function.prototype`
- `Object.prototype.__proto__ === null` 这也是原型链的尽头

5. 原型链

- 概念：由多个隐式原型属性组成的结构叫做原型链
- 作用：查找对象的属性/方法
- 规则：
  - 先在自身属性上查找，找到就返回值
  - 再沿着隐式原型属性一层层找，找到就返回值
  - 最终回来到`Object.prototype.__proto__`，返回值是 undefined

6. 原型属性的作用：用来继承属性/方法，从而复用
7. 原型属性的应用：

- 在 React 中，定义类组件，其中实例对象通过原型属性继承父类的方法，比如 setState

  ![](C:\Users\19587\Desktop\整理出来的文件夹\images\流程图，理解知识图集\原型，原型链.webp)

##### instanceof

- 作用: 判断一个任意类型对象的具体类型

- 如何判断?
  - 对于 A instanceof B
  
  - A是实例对象, B是构造函数
  
  - 如果B的prototype属性所指向的原型对象是A实例对象的原型链接上的某个对象, 返回true, 否则返回
  
    

#### 检测数据类型

- typeof

  - typeof: 返回的是数据类型的字符串表达形式

  - 可以区别: 数值, 字符串, 布尔值, undefined, function

  - 不能区别: null与对象, 一般对象与数组

    ```js
    var a
    console.log(a, typeof a, a===undefined) // undefined 'undefined' true
    console.log(a===typeof a) // false
    
    a = 3
    console.log(typeof a === 'number')
    a = 'atguigu'
    console.log(typeof a === 'string')
    a = true
    console.log(typeof a === 'boolean')
    
    a = null
    console.log(typeof a, a===null) // 'object'  trueCopy to clipboardErrorCopied
    ```

- instanceof/constructor

  - 不能判断基本数据类型

  - A instance B:判断 A 是否是 B的实例（后边原型链详细讲解）

  - 使用instanceof/constructor可以检测数组和正则了

    ```js
    console.log([] instanceof Array);//->true
    console.log(/^$/ instanceof RegExp);//->true
    console.log([] instanceof Object);//->true
    
    console.log([].constructor === Array);//->true
    console.log([].constructor === Object);//->false 我们的constructor可以避免instanceof检测的时候,用Object也是true的问题Copy to clipboardErrorCopied
    ```

- ===

  - 可以判断: undefined和null

    ```js
    var a = null;
    var b;
    log(b === undefined) //true
    log(a === null) //true
    
    var a = null;
    console.log(a === null);Copy to clipboardErrorCopied
    ```

- Object.prototype.toString

  - 可以通过`Object.prototype.toString`方法，判断某个对象之属于哪种内置类型。

  - 分为`null`、`string`、`boolean`、`number`、`undefined`、`array`、`function`、`object`、`date`、`math`

    ```js
    console.log(Object.prototype.toString.call(null)); // "[object Null]"
    console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
    console.log(Object.prototype.toString.call("abc")); // "[object String]"
    console.log(Object.prototype.toString.call(123)); // "[object Number]"
    console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
    console.log(Object.prototype.toString.call([])); // "[object Array]"
    console.log(Object.prototype.toString.call({})); // "[object Object]"
    console.log(Object.prototype.toString.call(function () {})); // "[object Function]"
    console.log(Object.prototype.toString.call(/\s/)); // "[object RegExp]"
    console.log(Object.prototype.toString.call(Math)); // "[object Math]"
    console.log(Object.prototype.toString.call(new Date(1212121212))); // "[object Date]"
    ```





#### 4.继承

方式1:基于构造函数的继承 原型链+借用构造函数的组合式继承

借用父类型构造函数:Person.call(this.name,age)

让子类的原型为父类的实例:Student.prototype=new Person()

让子类原型的构造器为子类型:Student.prototype.constructor=Student

```
// 父类型
function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype.fn = function () {}
Person.prototype.sayHello = function () {
	console.log(`我叫${this.name}, 年方${this.age}`)
}
// 子类型
function Student(name, age, price) {
    // this.name = name
    // this.age = age
    // 借用父类型的构造函数
    Person.call(this, name, age)  // 相当于执行this.Person(name, age)
    this.price = price
}
// 让子类的原型为父类的实例
Student.prototype = new Person()
// 让原型对象的构造器为子类型
Student.prototype.constructor = Student

Student.prototype.sayHello = function () {
	console.log(`我叫${this.name}, 年方${this.age}, 身价: ${this.price}`)
}

const s = new Student('tom', 23, 14000)
s.sayHello()
s.fn()
```

方式二:基于class/类的继承

  子类extends 父类:class Teacher extends Person2

  子类构造器中调用父类的构造:super(name,age)

````
- - ***

```js
// 父类
class Person2 {
    constructor (name, age) {
        this.name = name
        this.age = age
    }

    fn () {}

    sayHello () {
    	console.log(`我叫${this.name}, 年方${this.age}`)
    }
}
// 子类
class Teacher extends Person2 {
    constructor (name, age, course) {
        super(name, age)
        this.course = course
    }

    // 重写父类的方法
    sayHello () {
    	console.log(`我叫${this.name}, 年方${this.age}, 课程:${this.course}`)
    }
}

const t = new Teacher('bb', 34, 'CC')
t.sayHello()
t.fn()
```
````



#### 5.dom，bom事件





#### 6.var，const，let

1）全局变量中有变量提升，let和const形成的块作用域中没有变量提升

2）同一个作用域中let和const的变量名不可以重复

3）const的值不可以被修改，但是如果是对象，只要地址值不变，对象内部的属性可以发生改变

3)最大的区别: var 声明的变量，会被挂载到window上，let和const声明的变量不会挂载到window上



#### 7.箭头函数

箭头函数中没有this

不能作为构造函数

构造函数中没有argument

箭头函数没有显示原型



#### 8.promise(async,await,catch)

概念:promise是es新出的解决异步编程的方案，

作用:用来解决回调地狱

构造函数中的两个参数:直接new Promise它的执行是同步的，它的构造函数中接收两个参数，分别resolve，和reject分别用来返回成功和失败的promise

它有两种状态 分别是:未定义pending-->resolve 和pending-->reject ，状态都是不可逆的(缺点)

关于.then()

 .then()的话它接收的是一个失败或者成功的promise，参数中第一个回调函数接收成功返回的promise ，参数二中接收失败的promise
接收，接收失败的等同于.catch()

promise什么时候会返回成功的promise,什么时候返回失败的promise?

成功:1）当promise没有返回值的时候  2)使用resolve()参数

失败:1)promise执行体报错的时候  2）使用reject()参数

特点:每次执行promise都会产生一个全新的promise

什么时候会出现回调地狱问题:菜单栏三级联动时，当移动到菜单栏上才会显示下一级菜单，每次调用下一级菜单都会发送一次请求当前菜单的数据

##### Promise.all([promise1, promise2, promise3])

- 批量/一次性发送多个异步请求
- 当都成功时, 返回的promise才成功
- 一旦有一个失败的, 返回的promise就失败了

问题: 发3请求成功后再4个请求

##### Promise.race([promise1, promise2, promise3])

批量/一次性发送多个异步请求

谁先回来就用是谁的结果

##### async/await与promise的关系

- async/await是消灭异步回调的终极武器
- 作用: 简化promise对象的使用, 不用再使用then/catch来指定回调函数
- 执行async函数, 返回promise对象
- await相当于promise的then
- try...catch可捕获异常, 相当于promise的catch

promise的缺点:1）状态是不可逆的

​							2）不进行异常捕获的话，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应



#### 9.事件轮询

浏览器的事件轮询机制

事件循环机制的2个重要部分

​		在分线程执行的管理模块(web api管理模块): 定时器/ajax/dom事件

​		保存待执行的回调函数的事件队列(Event queue)/任务队列(Task queue)

有两个队列:宏队列和微队列

​		在分线程执行的管理模块: 定时器/ajax/dom事件

​		保存待执行的回调函数的事件队列(Event queue)/任务队列(Task queue)

宏任务和微任务

- 宏任务: setTimeout, setInterval, Ajax, DOM事件监听,setImmediate(Node)
- 微任务: Promise.then, async/await, mutationobserver(H5,监听dom树的加载和变化),process.nextTick(Node)

宏队列和微队列

- 宏队列: 用来保存n个宏任务的队列容器
- 微队列: 用来保存n个微任务的队列容器

- 执行顺序:
  - 第一步: 先执行script下的所有同步代码
  - 第二步: 再依次取出微列中的所有微任务执行
  - 第三步: 再取出宏队列中第一个宏任务执行
  - 再循环第二步与第三步

![event loop(宏任务与微任务)](D:\FQ\feiq\Recv Files\陈辉鸿资料\sz210223\4.复习\01.课件\note\images\event loop(宏任务与微任务).png)



node事件轮询

事件轮询机制主要分为**六个阶段**(六个宏任务队列)：

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）...

- timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
- I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
- idle, prepare 阶段：仅node内部使用
- poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
- check 阶段：执行 setImmediate() 的回调
- close callbacks 阶段：执行 socket 的 close 事件回调

![node事件轮询](C:\Users\19587\OneDrive\桌面\整理出来的文件夹\images\node事件轮询.webp)



#### 9.es6解构赋值

...对象(数组)

new Set(...[])



#### 10.vue组件



#### 11.vue-router

作用:实现SPA单页面单页面应用，即url地址的变化不会引起ui更新(页面不会刷新)

如何实现前端路由:

在vue中使用，需先下载vue-router插件，然后页面中引入，创建vue-router实例,实例中有两个必要的属性:

​	-mode:'history':'hash'  

​    -routers:[//配置路由

​			-path:‘’，//组件地址

​			-component:引入的外部组件名

​    ]

有两种跳转方式:

  -在页面上使用 router-view 和 router  -link 进行声明式跳转

  -在js中使用push,replate,to，back 进行编程式跳转

原理:

##### hash

hash是url中 # 及后面的那一部分，常用作描点在页面内进行导航，**改变url中的hash部分不会引起页面刷新**，同时#号会影响描点的使用，是通过hashChange事件监听url的变化，改变url的方式只有3种:

​    -通过浏览器的前进和后退

​	-通过a标签

​	-通过window.locaction改变

##### history

history提供了pushState和replaceState两个方法，**这两个方法改变url的path不会引起页面的刷新**

history提供popstate事件监听url变化，和hashChange事件相似，但有些不同:

​	 1)只有浏览器的前进和后退url改变时才会触发popstate

​	 2）可以拦截pushState/replaceState的调用和a标签的点击事件来检测url变化

​     3)通过js调用history的back,go,forward方法触发该事件

 所以监听url变化可以实现，只是没有hashchange那么方便

缺点:

1. 兼容性较差
2. **项目上线时,后端需要进行专门的配置**
   1. 如果用户处于"/home"路由,此时用户刷新页面
   2. 浏览器会将/home地址发送给服务器,作为后端路由解析
   3. 但是后端此时如果没有这个路由,会提示404
      1. 所以在此处,后端需要做的事情就是,将他没有的路由都统一返回index.html文件
   4. 浏览器接收到返回的index.html文件,当前网页中的VueRouter会主动解析地址栏中的/home,并跳转到对应的路由

有个问题：hash模式，也可以用`history.go,back,forward`来触发hashchange事件吗？

A：也是可以的。因为不管什么模式，浏览器为保存记录都会有一个栈。



#### 12.mvvm原理

​       Vue响应式原理最核心的方法便是通过Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的

1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者(Dep)

2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数

3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图

4、mvvm入口函数，整合以上三者

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/9/17297083977dad4d~tplv-t2oaga2asx-watermark.awebp)




#### 13.响应式原理 

1.数据代理:能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者

```
  Object.keys(data).forEach(function (key) {
    // 数据代理的方法
    me._proxyData(key);
  });
```

2.数据劫持:能实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，定义成响应式,数据劫持的次数,是根据data对象内部的属性名多少决定的，



3.模板解析:实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数

4、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图



vue响应式原理分为三部分，数据代理、数据劫持和模板解析
1.数据代理就是将data中的数据代理到this上，可以通过this直接使用
它内部是这样实现的，它会遍历data中的每一个属性，通过Object.defineProperty方法给this定义新的属性，属性名就是data遍历的属性名，而属性值就会定义get和set方法，等我们读取数据的时候，就会触发get方法，读取的是原data中的数据，修改属性的时侯，就会触发set方法，修改的是原data中的数据
2.数据劫持就是将原data中的数据定义成响应式
它也会遍历data中的每一个属性，通过Object.defineProperty方法对它进行重新定义，定义属性的get和set方法，同时每一个属性都会创建一个dep，dep保存在get和set方法中，当我们读取数据时，就会触发get方法，除了返回值，还调用dep.depend()方法建立响应式联系，在响应式联系中，dep会保存watcher，watcher中也会保存dep，当我们修改属性的时侯，就会触发set方法，除了会修改值，还会调用dep.notify()方法，通知dep保存所有的watcher去更新用户界面，做到了响应式联系
3.模板解析是解析模板页面的插值语法和指令语法
它会将根节点里所有的子节点添加到文档碎片节点中，然后遍历所有子节点，判断如果是元素节点，就解析指令语法，如果是文本节点，就解析插值语法。除了事件指令以外的其他模板语法最终会new Watcher，watcher中会保存更新用户界面的方法，new Watcher最终会读取表达式的值（data数据的值），这时侯就会触发数据劫持的get方法，然后触发dep.depend方法，开始建立响应式联系，将解析后的文档碎片节点添加到根节点中生效
更新数据的流程是
我们更新data数据的时侯，首先会触发数据代理的set方法，再触发数据劫持的set方法，这时候就会更新数据，然后通过dep.notify()方法去通知dep保存所有watcher去更新用户界面，这就是更新数据的流程
dep，每一个data数据都有自己的dep，目的就是为了在watcher中找到更新用户界面的方法
watcher，除了事件指令以外（因为事件回调不用更新用户界面），每一个模板语法都有自己的watcher ，目的就是为了防止重复存储dep
dep.depend()方法用来建立响应式联系，响应式联系就是dep中保存watcher，watcher中也会保存dep
dep.notify()方法就是去通知watcher调用更新用户界面





#### 14vue 优化

##### 1.1、v-if 和 v-show 区分使用场景

**v-if** 是 **真正** 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

**v-show** 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。

所以，v-if 适用于在运行时很少改变条件，不需要8件的场景；v-show 则适用于需要非常频繁切换条件的场景。

##### 1.2、computed 和 watch  区分使用场景

**computed，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

**watch：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

**运用场景：**

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

##### 1.3、v-for 遍历必须为 item 添加 key，且避免同时使用 v-if

**（1）v-for 遍历必须为 item 添加 key**

在列表数据进行遍历渲染时，需要为每一项 item 设置唯一 key 值，方便 Vue.js 内部机制精准找到该条列表数据。当 state 更新时，新的状态值和旧的状态值对比，较快地定位到 diff 。

**（2）v-for 遍历避免同时使用 v-if**

v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候，必要情况下应该替换成 computed 属性。

**推荐：**

```
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id">
    {{ user.name }}
  </li>
</ul>
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
	 return user.isActive
    })
  }
}
复制代码
```

**不推荐：**

```
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id">
    {{ user.name }}
  </li>
</ul>
复制代码
```

##### 1.4、长列表性能优化

Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？可以通过 Object.freeze 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

```
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};
复制代码
```

##### 1.5、事件的销毁

Vue 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。 如果在 js 内使用 addEventListene 等方式是不会自动销毁的，我们需要在组件销毁时手动移除这些事件的监听，以免造成内存泄露，如：

```
created() {
  addEventListener('click', this.click, false)
},
beforeDestroy() {
  removeEventListener('click', this.click, false)
}
复制代码
```

##### 1.6、图片资源懒加载

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 Vue 的 vue-lazyload 插件：

（1）安装插件

```
npm install vue-lazyload --save-dev
复制代码
```

（2）在入口文件 man.js 中引入并使用

```
import VueLazyload from 'vue-lazyload'
复制代码
```

然后再 vue 中直接使用

```
Vue.use(VueLazyload)
复制代码
```

或者添加自定义选项

```
Vue.use(VueLazyload, {
preLoad: 1.3,
error: 'dist/error.png',
loading: 'dist/loading.gif',
attempt: 1
})
复制代码
```

（3）在 vue 文件中将 img 标签的 src 属性直接改为 v-lazy ，从而将图片显示方式更改为懒加载显示：

```
<img v-lazy="/static/img/1.png">
复制代码
```

以上为 vue-lazyload 插件的简单使用，如果要看插件的更多参数选项，可以查看 vue-lazyload 的 [github 地址](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fhilongjw%2Fvue-lazyload)。

##### 1.7、路由懒加载

Vue  是单页面应用，可能会有很多的路由引入 ，这样使用 webpcak 打包后的文件很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样就更加高效了。这样会大大提高首屏显示的速度，但是可能其他的页面的速度就会降下来。

**路由懒加载：**

```
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
复制代码
```

##### 1.8、第三方插件的按需引入

​     我们在项目中经常会需要引入第三方插件，如果我们直接引入整个插件，会导致项目的体积太大，我们可以借助 `babel-plugin-component` ，然后可以只引入需要的组件，以达到减小项目体积的目的。以下为项目中引入 element-ui 组件库为例：

（1）首先，安装 `babel-plugin-component` ：

```
npm install babel-plugin-component -D
复制代码
```

（2）然后，将 .babelrc 修改为：

```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
复制代码
```

（3）在 main.js 中引入部分组件：

```
import Vue from 'vue';
import { Button, Select } from 'element-ui';

 Vue.use(Button)
 Vue.use(Select)
复制代码
```

##### 1.9、优化无限列表性能

如果你的应用存在非常长或者无限滚动的列表，那么需要采用 窗口化 的技术来优化性能，只需要渲染少部分区域的内容，减少重新渲染组件和创建 dom 节点的时间。 你可以参考以下开源项目 [vue-virtual-scroll-list](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftangbc%2Fvue-virtual-scroll-list) 和 [vue-virtual-scroller](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAkryum%2Fvue-virtual-scroller)  来优化这种无限列表的场景的。

##### 1.10、服务端渲染 SSR or 预渲染

服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的 html 片段直接返回给客户端这个过程就叫做服务端渲染。

**（1）服务端渲染的优点：**

- 更好的 SEO： 因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；
- 更快的内容到达时间（首屏加载更快）： SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；

**（2）服务端渲染的缺点：**

- 更多的开发条件限制： 例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；

- 更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。

  

#### 15.vue组件之间通信方式

1.props
	使用场景:一般在父子组件之间通信会考虑使用
	父传子:父组件中,给子组件的标签上添加标签属性,子组件声明props进行接收
	子传父:
		父组件现在自身的methods中定义接收数据的函数,并将该函数传递给子组件
		子组件调用父组件传下来的方法,并传入实参
		父组件将接收到的实参保存或者使用

2.provide/inject
	使用场景:祖孙组件之间通信考虑使用
	祖先组件:祖先组件在配置对象中,创建属性provide,给他提供一个对象,该对象内的属性可以被后代组件获取到
	后代组件:后代组件在配置对象中,创建属性inject,写法与props数组版本相同,只需要声明自己想获取的属性名即可

3.自定义事件
	v-model实现
		对input标签使用++
			1.将data中的某个响应式属性的值作为input框的默认值value
				<input type="text" :value="form.name">
			2.当input框内容发生变化时,会修改对应的响应书属性的值
				事件名:input(默认)
				<input type="text"  @input="(event)=>{form.name = event.target.value}">
		对组件使用
			1.将data中的某个响应式属性的值作为组件的标签属性传递下来,属性名是value
				<input type="text" :value="form.name">
			2.给子组件绑定自定义事件,事件名:input
				子组件可以触发该自定义事件,用来修改父组件对应的状态数据
	$on,$emit,$once,$off
		给一个组件绑定自定义事件有两种方法
			静态绑定	@input
			动态绑定	vm.$on
	.sync修饰符
		实际源码与v-model几乎没有区别,所以在Vue3中,两个指令已经实现二合一
		1.将data中的某个响应式属性的值作为组件的标签属性传递下来,属性名是value
			<Helloworld  :value="form.name">
		2.给子组件绑定自定义事件,事件名:update:value
			子组件可以触发该自定义事件,用来修改父组件对应的状态数据
	事件总线
		1.给Vue原型对象注册属性$bus
			Vue.prototype.$bus = new Vue();
			注意:必须传入一个Vue对象,因为$on和$emit方法都存在与Vue的原型对象上,如果不是Vue的实例对象,无法使用该方法
		2.订阅方,订阅消息用来接收数据
			this.$bus.$on('test',回调函数)
		3.发布方,发布消息用来传递数据
			this.$bus.$emit('test',需要传递的数据)
		注意:在组件销毁之前记得解绑,因为虽然当前组件被卸载了,但是$bus还存在

4.获取对应组件实例对象
	$parent	->	用于获取父组件实例对象
	$root	->	用于获取组件树根组件实例,特指Root组件,不是App
	$children	->	用于获取所有子组件组成的数组
			注意:修改该数组中的顺序或者下标内容,不会影响到子组件渲染
	$refs	->	使用方式不同效果不同
			如果给html标签添加ref属性,找到的结果是真实DOM
			如果给组件添加ref属性,找到的结果是组件实例对象

5.$attrs和$listeners
	$attrs	->	用于收集当前组件没有接收的标签属性
	$listeners	->	用于收集当前组件身上所有的自定义事件

6.插槽
	默认插槽	
	具名插槽
	作用域插槽
7.Vuex

8.Vue.prototype+Vue.observable(相当于简化版Vuex，observable(obj)让一个对象变成可响应式对象)



父子   props，vue自定义事件, .sync,$ref,$children域$parent

祖孙   provide与inject

兄弟或者其他/任意    全局事件总线，vuex

​         

#### 16.cookie,localStor和sessionStorage

区分cookie,sessionStorage,localStorage

1.生命周期

​	1.cookie

​		1.没设置Max-Age，如果浏览器关闭或者标签页关闭，就会销毁cookie(会话cookie)

​		2.设置了Max-Age,只要不超过当前的max-Age的事件就会永久存在(持久化cookie)

​	2.sessionStorage

​		 1.浏览器挂壁或者标签也关闭，会销毁sessionStorage

​	3.localStorage

​		 1. 除非手动删除或者因为电脑清除数据问题，否则永远存在



2.存储位置

​	cookie:服务器

​	sessionStorage:(本地存储)内存中

​	localStorage:（本地存储)硬盘中

3.存储大小

​	cookie:4Kb

​	sessionStorage:5mb

​	localStorage:5mb

4.与服务器的关系

​	1.cookie

​		-1.服务器创建，浏览器存储

​		-2.返回给前端的手段(通过响应头中的set-Cookie属性传入浏览器发现响应头中的该字段，会主动创建文件并保存起来)

​	   -3.每次发送请求都会自动携带

​	  总结:其实cookie对于前端来说没什么用，虽然前端也可以设置和读取但是需要服务器同意

​      2.sessionStorage

​		 1.h5新特性，与服务器没任何关系

​      3.localStorage

​		 1.h5新特性，与服务器没任何关系

5.比较三者，分析优缺点

​	1.cookie体积太小，存储数据数量有限

​	2.cookie会自动被携带上，变相增加了请求的体积，降低了速度

​	3.cookie不安全

​	4.**cookie可能会被用户禁用**,本地存储



#### 17.webpack性能优化

######  2.1、Webpack 对图片进行压缩

在 vue 项目中除了可以在 `webpack.base.conf.js` 中 url-loader 中设置 limit 大小来对图片处理，对小于 limit 的图片转化为 base64 格式，其余的不做操作。所以对有些较大的图片资源，在请求资源的时候，加载会很慢，我们可以用 `image-webpack-loader`来压缩图片：

（1）首先，安装 image-webpack-loader  ：

```
npm install image-webpack-loader --save-dev
复制代码
```

（2）然后，在 webpack.base.conf.js  中进行配置：

```
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use:[
    {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true,
      }
    }
  ]
}
复制代码
```

###### 2.2、减少 ES6 转为 ES5 的冗余代码

Babel 插件会在将 ES6 代码转换成 ES5 代码时会注入一些辅助函数，例如下面的 ES6 代码：

```
class HelloWebpack extends Component{...}
复制代码
```

这段代码再被转换成能正常运行的 ES5 代码时需要以下两个辅助函数：

```
babel-runtime/helpers/createClass  // 用于实现 class 语法
babel-runtime/helpers/inherits  // 用于实现 extends 语法    
复制代码
```

在默认情况下， Babel 会在每个输出文件中内嵌这些依赖的辅助函数代码，如果多个源代码文件都依赖这些辅助函数，那么这些辅助函数的代码将会出现很多次，造成代码冗余。为了不让这些辅助函数的代码重复出现，可以在依赖它们时通过 `require('babel-runtime/helpers/createClass')` 的方式导入，这样就能做到只让它们出现一次。`babel-plugin-transform-runtime` 插件就是用来实现这个作用的，将相关辅助函数进行替换成导入语句，从而减小 babel 编译出来的代码的文件大小。

（1）首先，安装 `babel-plugin-transform-runtime` ：

```
npm install babel-plugin-transform-runtime --save-dev
复制代码
```

（2）然后，修改 .babelrc  配置文件为：

```
"plugins": [
    "transform-runtime"
]
复制代码
```

如果要看插件的更多详细内容，可以查看babel-plugin-transform-runtime 的 [详细介绍](https://link.juejin.cn?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-plugin-transform-runtime)。

###### 2.3、提取公共代码

如果项目中没有去将每个页面的第三方库和公共模块提取出来，则项目会存在以下问题：

- 相同的资源被重复加载，浪费用户的流量和服务器的成本。
- 每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验。

CommonsChunkplugin呢，就是把这些不同chunk里重复的模块提取出来放到一个公共chunk里。这个公共chunk只需要下载一次，就可以让所有的chunk都使用了。而且这部分代码可以放到缓存里，这样以后就不用再下载了。Webpack 内置了专门用于提取多个Chunk 中的公共部分的插件 CommonsChunkPlugin，我们在项目中 CommonsChunkPlugin 的配置如下：

```
// 所有在 package.json 里面依赖的包，都会被打包进 vendor.js 这个文件中。
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function(module, count) {
    return (
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf(
        path.join(__dirname, '../node_modules')
      ) === 0
    );
  }
}),
// 抽取出代码模块的映射关系
new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest',
  chunks: ['vendor']
})
复制代码
```

如果要看插件的更多详细内容，可以查看 CommonsChunkPlugin 的 [详细介绍](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fcommons-chunk-plugin%2F)。

###### 2.4、模板预编译

当使用 DOM 内模板或 JavaScript 内的字符串模板时，模板会在运行时被编译为渲染函数。通常情况下这个过程已经足够快了，但对性能敏感的应用还是最好避免这种用法。

预编译模板最简单的方式就是使用[单文件组件](https://link.juejin.cn?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Fsingle-file-components.html)——相关的构建设置会自动把预编译处理好，所以构建好的代码已经包含了编译出来的渲染函数而不是原始的模板字符串。

如果你使用 webpack，并且喜欢分离 JavaScript 和模板文件，你可以使用 [vue-template-loader](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fktsn%2Fvue-template-loader)，它也可以在构建过程中把模板文件转换成为 JavaScript 渲染函数。

###### 2.5、提取组件的 CSS

当使用单文件组件时，组件内的 CSS 会以 style 标签的方式通过 JavaScript 动态注入。这有一些小小的运行时开销，如果你使用服务端渲染，这会导致一段 “无样式内容闪烁 (fouc) ” 。将所有组件的 CSS 提取到同一个文件可以避免这个问题，也会让 CSS 更好地进行压缩和缓存。

查阅这个构建工具各自的文档来了解更多：

- [webpack + vue-loader](https://link.juejin.cn?target=https%3A%2F%2Fvue-loader.vuejs.org%2Fzh-cn%2Fconfigurations%2Fextract-css.html) ( vue-cli 的 webpack 模板已经预先配置好)
- [Browserify + vueify](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvueify%23css-extraction)
- [Rollup + rollup-plugin-vue](https://link.juejin.cn?target=https%3A%2F%2Fvuejs.github.io%2Frollup-plugin-vue%2F%23%2Fen%2F2.3%2F%3Fid%3Dcustom-handler)

###### 2.6、优化 SourceMap

我们在项目进行打包后，会将开发中的多个文件代码打包到一个文件中，并且经过压缩、去掉多余的空格、babel编译化后，最终将编译得到的代码会用于线上环境，那么这样处理后的代码和源代码会有很大的差别，当有 bug的时候，我们只能定位到压缩处理后的代码位置，无法定位到开发环境中的代码，对于开发来说不好调式定位问题，因此 sourceMap 出现了，它就是为了解决不好调式代码问题的。

SourceMap 的可选值如下（+ 号越多，代表速度越快，- 号越多，代表速度越慢, o 代表中等速度 ）



![1.png](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/15/16c924653d8000ec~tplv-t2oaga2asx-watermark.awebp)



**开发环境推荐： cheap-module-eval-source-map**

**生产环境推荐： cheap-module-source-map**

原因如下：

- **cheap**： 源代码中的列信息是没有任何作用，因此我们打包后的文件不希望包含列相关信息，只有行信息能建立打包前后的依赖关系。因此不管是开发环境或生产环境，我们都希望添加 cheap 的基本类型来忽略打包前后的列信息；
- **module** ：不管是开发环境还是正式环境，我们都希望能定位到bug的源代码具体的位置，比如说某个 Vue 文件报错了，我们希望能定位到具体的 Vue 文件，因此我们也需要 module 配置；
- **soure-map** ：source-map 会为每一个打包后的模块生成独立的 soucemap 文件 ，因此我们需要增加source-map 属性；
- **eval-source-map**：eval 打包代码的速度非常快，因为它不生成 map 文件，但是可以对 eval 组合使用 eval-source-map 使用会将 map 文件以 DataURL 的形式存在打包后的 js 文件中。在正式环境中不要使用 eval-source-map, 因为它会增加文件的大小，但是在开发环境中，可以试用下，因为他们打包的速度很快。

###### 2.7、构建结果输出分析

Webpack 输出的代码可读性非常差而且文件非常大，让我们非常头疼。为了更简单、直观地分析输出结果，社区中出现了许多可视化分析工具。这些工具以图形的方式将结果更直观地展示出来，让我们快速了解问题所在。接下来讲解我们在 Vue 项目中用到的分析工具：`webpack-bundle-analyzer。

我们在项目中 `webpack.prod.conf.js` 进行配置：

```
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin =   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
复制代码
```

执行  `$ npm run build --report`  后生成分析报告如下：

![](C:\Users\19587\OneDrive\桌面\截图文件\16c924653ef48d24_tplv-t2oaga2asx-watermark.webp)

#### 18.nodejs核心知识点



#### 19.ajax,axios 

```
//1.获取XMLHttpRequest类型的对象
// 兼容问题
var xhr = new XMLHttpRequest();
// 2.打开连接
xhr.open("post","https://jsonplaceholder.typicode.com/users");
// 创建连接
console.log("OPENED",xhr.readyState);

// 设置响应头
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

// 3.执行发送动作
// post方式
xhr.send("name=mh&age=18");

// 4.指定xhr状态变化事件处理函数
xhr.onreadystatechange = function (){
    if(this.readyState === 2){
       // 接收到响应头
       console.log("HEADERS_RECEIVED",xhr.readyState);
    }else if(this.readyState === 3){
        // 响应体加载中
       console.log("LOADING",xhr.readyState);
    }else if(this.readyState === 4){
        // 加载完成
        console.log("DONE",xhr.readyState);
    }
}
```



#### 20.同源和跨域

​     同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

​     同源策略主要的限制内容有:

​         cookie,LocalStorage  

​		 Dom节点

​		 AJax发送请求,结果被浏览器拦截

​        

#### 21.跨域解决

​    jsonp:利用script标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的json数据，jsonp请求一定需要对方的服务器做支持才可以，优点:兼容性比较好;缺点:只能是get请求，不太安全，可能会遭受xss攻击

   cors:需要浏览器和后端同时支持，浏览器会自动cors通信，关键是后端，后端需要配置响应头，配置access-control-allow-origin:*  就完成了跨域

   websoket:是html5的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案，websoket是一种双向通信协议，在建立连接之后，websoket的server与client都能主动向对方发送或接收数据，建立连接时候需要借助http协议，连接建立好了之后client域server之间的双向通信与http无关了

​     服务器代理:浏览器是禁止跨域的，但是服务端不禁止，在本地运行`npm run dev`等命令时实际上是用node运行了一个服务器，IP与后端不一致，所以会产生跨域问题，需要使用如JSONP、跨域代理等手段进行跨域请求，而vue已经帮我们配置好了，只需要设置一下`proxyTable`就行。因此`proxyTable`实际上是将请求发给自己的服务器，再由服务器转发给后台服务器，做了一层代理，因为不会出现跨域问题。



#### 22.小程序项目复习

#### 微信小程序蓝牙功能

1.初始化蓝牙

```
function openBluetooth() {
    wx.openBluetoothAdapter({
        success() {
            setTimeout(()=>{
                getBluetoothAdapterState()
            }, 200)
        },
        fail() {
            console.log('手机蓝牙未打开')
        }
    })
}复制代码
```

2.检测蓝牙是否可用

```
function getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
        success(res) {
            if (res.available) {
                startBluetoothDevicesDiscovery()
            }
        },
        fail(error) {
            
        }
    })
}复制代码
```

3.开始搜索蓝牙设备

```
function startBluetoothDevicesDiscovery() {
    wx.startBluetoothDevicesDiscovery({
        success(res) {
            getBluetoothDevices()
        },
        fail(error) {

        }
    })
}复制代码
```

4.获取搜索的蓝牙，监听搜索蓝牙事件

```
function getBluetoothDevices() {
    wx.getBluetoothDevices({  //获取搜索的蓝牙
        success(res) {
            setTimeout(()=>{
                if(res.devices.length < 1) {
                    wx.stopBluetoothDevicesDiscovery()
                    wx.closeBluetoothAdapter()
                }
            }, 15000)
        }
    })

    wx.onBluetoothDeviceFound(res=>{
        let devices = res.devices
        for(let item of devices) {
            let advertisData = buf2hex(item.advertisData)
            if(advertisData.toUpperCase().indexOf('蓝牙Mac地址') != -1) {
                let deviceId = item.deviceId // 蓝牙设备ID
                wx.stopBluetoothDevicesDiscovery({
                    success(result) {
                        setTimeout(()=>{
                            createBLEConnection(deviceId)
                        }, 200)
                    }
                })
            }
        }
    })
}复制代码
```

5.连接蓝牙

```
function createBLEConnection(deviceId) {
    wx.createBLEConnection({
        deviceId,
        success(res) {
            getBLEDeviceServices(deviceId)
        }
    })
}复制代码
```

6.获取蓝牙的service服务

```
function getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
        deviceId,
        success(res) {
            getBLEDeviceCharacteristics(deviceId)
        }
    })
}复制代码
```

7.获取蓝牙设备特征值，拿到对应的读写的uuid

```
function getBLEDeviceCharacteristics(deviceId) {
    wx.getBLEDeviceCharacteristics({
        deviceId,
        serviceId: '蓝牙的service uuid',
        success(res) {
            setTimeout(()=>{
                notifyChange(deviceId)
            }, 200)
        }
    })
}复制代码
```

8.启用蓝牙notify功能，用来监听蓝牙之间的数据传输

```
function notifyChange(deviceId) {
    wx.notifyBLECharacteristicValueChange({
        deviceId,
        serviceId: '蓝牙的service uuid',
        characteristicId: '蓝牙的notify uuid',
        state: true,
        success(res) {
            onBLECharacteristicValueChange()
        }
    })
}复制代码
```

9.监听蓝牙设备之间的数据传输

```
function onBLECharacteristicValueChange() {
    wx.onBLECharacteristicValueChange(res=>{
        let data = buf2string(res.value) //解析成十进制，正常文本
    })
}复制代码
```

10.向蓝牙发送数据

```
function sendData() {
    let str = '00010203' // 发送的数据
    //转换成ArrayBuffer格式
    let dataBuffer = new ArrayBuffer(str.length)
    let dataView = new DataView(dataBuffer)
    for (var i = 0; i < str.length; i++) {
        dataView.setUint8(i, str.charAt(i).charCodeAt())
    }
    let dataHex = buf2hex(dataBuffer)

    wx.writeBLECharacteristicValue({
        deviceId: '设备ID',
        serviceId: '蓝牙的service uuid',
        characteristicId: '蓝牙的write uuid',
        value: '需要传输的数据，格式为ArrayBuffer'
    })
}复制代码
```

11.工具方法

```
// 转成十进制， 正常文字，不常用
function hexCharCodeToStr(hexCharCodeStr) {
    let trimedStr = hexCharCodeStr.trim()
    let rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
    let curCharCode = ''
    let resultStr = []
    for (let i = 0; i < rawStr.length; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16)
        resultStr.push(String.fromCharCode(curCharCode))
    }
    return resultStr.join('')
}

function receiveData(buffer) {
    return hexCharCodeToStr( buf2hex(buffer) )
}

//转成十进制，正常文字，常用
function buf2string(buffer) {
    let arr = Array.prototype.map.call(new Uint8Array(buffer), x => x)
    return arr.map((char, i) => {
        return String.fromCharCode(char)
    }).join('')
}

// 转成二进制
function buf2hex(buffer) {
    let hexArr = Array.prototype.map.call(new Uint8Array(buffer), bit=>{
        return ('00' + bit.toString(16)).slice(-2)
    })
    return hexArr.join('')
}
```

1. 关闭蓝牙，释放系统资源 `wx.openBluetoothAdapter(OBJECT)`
2. 获取蓝牙适配器状态，判断设备蓝牙是否可用 `wx.openBluetoothAdapter(OBJECT)`
3. 开始搜索蓝牙 `wx.startBluetoothDevicesDiscovery(OBJECT)`
4. 获取所有已发现的蓝牙设备`wx.getBluetoothDevices(OBJECT)`
5. 监听寻找到新设备的事件`wx.onBluetoothDeviceFound(CALLBACK)`
6. 开启获取已连接蓝牙设备，获取设备成功后根据特征值连接低功耗蓝牙设备`wx.createBLEConnection(OBJECT)`
7. 获取蓝牙设备所有 service（服务) `wx.getBLEDeviceServices(OBJECT)`
8. 获取蓝牙设备某个服务中的所有 characteristic（特征值）`wx.getBLEDeviceCharacteristics(OBJECT)`
9. 启用低功耗蓝牙设备特征值变化时的 notify 功能 `wx.notifyBLECharacteristicValueChange(OBJECT)`
10. 蓝牙写入功能`wx.writeBLECharacteristicValue(OBJECT)`

#### 开发流程图

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c2fb24abd404719a8b88bde3255b402~tplv-k3u1fbpfcp-watermark.awebp)

## 

#### 1、简单描述下微信小程序的相关文件类型?

微信小程序项目结构主要有四个文件类型

- **WXML**（WeiXin Markup Language）是框架设计的一套标签语言，结合基础组件、事件系统，可以构建出页面的结构。内部主要是微信自己定义的一套组件
- **WXSS** (WeiXin Style Sheets)是一套样式语言，用于描述 WXML 的组件样式
- **js** 逻辑处理，网络请求
- **json** 小程序设置，如页面注册，页面标题及tabBar

主要文件

- **app.json** 必须要有这个文件，如果没有这个文件，项目无法运行，因为微信框架把这个作为配置文件入口，整个小程序的全局配置。包括页面注册，网络设置，以及小程序的 window 背景色，配置导航条样式，配置默认标题
- **app.js** 必须要有这个文件，没有也是会报错！但是这个文件创建一下就行 什么都不需要写以后我们可以在这个文件中监听并处理小程序的生命周期函数、声明全局变量
- **app.wxss** 可选

#### 2、小程序的双向绑定和vue哪里不一样?

小程序直接 this.data 的属性是不可以同步到视图的，必须调用：

```js
this.setData({
    // 这里设置
})
复制代码
```

#### 3、小程序页面间有哪些传递数据的方法?

**使用全局变量实现数据传递**
 在 app.js 文件中定义全局变量 globalData， 将需要存储的信息存放在里面

```js
// app.js
App({
     // 全局变量
  globalData: {
    userInfo: null
  }
})
复制代码
```

使用的时候，直接使用 getApp() 拿到存储的信息

**使用 wx.navigateTo 与 wx.redirectTo 的时候，可以将部分数据放在 url 里面，并在新页面 onLoad 的时候初始化**

```js
// Navigate
wx.navigateTo({
  url: '../pageD/pageD?name=raymond&gender=male',
})

// Redirect
wx.redirectTo({
  url: '../pageD/pageD?name=raymond&gender=male',
})

// pageB.js
...
Page({
  onLoad: function(option){
    console.log(option.name + 'is' + option.gender)
    this.setData({
      option: option
    })
  }
})
复制代码
```

需要注意的问题：wx.navigateTo 和 wx.redirectTo 不允许跳转到 tab 所包含的页面 onLoad 只执行一次
 `使用本地缓存 Storage 相关`

#### 4、小程序的生命周期函数

- onLoad 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数
- onShow() 页面显示/切入前台时触发
- onReady() 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
- onHide() 页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等
- onUnload() 页面卸载时触发。如 redirectTo 或 navigateBack 到其他页面时

#### 5、微信小程序的优劣势

**优势**

- 即用即走，不用安装，省流量，省安装时间，不占用桌面
- 依托微信流量，天生推广传播优势
- 开发成本比 App 低

**缺点**

- 用户留存，即用即走是优势，也存在一些问题
- 入口相对传统 App 要深很多
- 限制较多,页面大小不能超过2M。不能打开超过10个层级的页面

#### 6、**如何实现下拉刷新**

首先在全局 config 中的 window 配置 enablePullDownRefresh
 在 Page 中定义 onPullDownRefresh 钩子函数,到达下拉刷新条件后，该钩子函数执行，发起请求方法
 请求返回后，调用 wx.stopPullDownRefresh 停止下拉刷新

#### 7、bindtap和catchtap的区别是什么?

**相同点**：首先他们都是作为点击事件函数，就是点击时触发。在这个作用上他们是一样的，可以不做区分
 **不同点**：他们的不同点主要是bindtap是不会阻止冒泡事件的，catchtap是阻值冒泡的

#### 8、简述下 wx.navigateTo(), wx.redirectTo(), wx.switchTab(), wx.navigateBack(), wx.reLaunch()的区别?

wx.navigateTo()：保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面 wx.redirectTo()：关闭当前页面，跳转到新的页面（类似重定向）。但是不允许跳转到 tabbar 页面
 wx.switchTab()：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 wx.navigateBack():关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
 wx.reLaunch()：关闭所有页面，打开到应用内的某个页面

#### 9、**登录流程？**

登录流程是调wx.login获取code传给后台服务器获取微信用户唯一标识openid及本次登录的会话密钥（session_key）等）。拿到开发者服务器传回来的会话密钥（session_key）之后，前端要保存wx.setStorageSync('sessionKey', 'value')

持久登录状态：session信息存放在cookie中以请求头的方式带回给服务端，放到request.js里的wx.request的header里



#### 23.typescript泛型接口



#### 24.git基本命令

git add . 将工作区代码提交到版本区

git commit -m 'aa'  将暂存区代码提交到版本区

git status 查看库管理状态，绿色暂存区，红色工作区

git pull 更新代码

git clone git地址  从远程服务器更新代码

git remote add origin 分支名

git push -u origin 分支名



#### 25.react全家桶





#### 26.vue全家桶,element_ui





#### 27.路由导航守卫

全局前置守卫:router.beforeEach

全局解析守卫:router.beforeResolve：**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用

全局后置钩子:router.afterEach  

路由独享的守卫:beforeEnter  路由跳转前触发，常用于登录验证

组件内的守卫:-beforeRouterEnter,// 在渲染该组件的对应路由被 confirm 前调用 // 不能！获取组件实例 `this` // 因为当守卫执行前，组件实例还没被创建

​                        -beforeRouterUpdate  // 在当前路由改变，但是该组件被复用时调用// 可以访问组件实例 `this`

​                        -beforeRouteLave: // 导航离开该组件的对应路由时调用 // 可以访问组件实例 `this`

- **`to: Route`**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#路由对象)

- **`from: Route`**: 当前导航正要离开的路由

- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。

  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

  注意:**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**

生命周期:

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。





#### 28.路由匹配(权限管理)

页面权限控制分为两种:

​       菜单中的页面能否被访问

​       菜单中的增删改查是否能被访问

按钮权限暂且不提，页面访问权限在实现中又可以分为两种方式：

- 显示所有菜单，当用户访问不在自己权限内的菜单时，提示权限不足
- 只显示当前用户能访问的权限内菜单，如果用户通过URL进行强制访问，则会直接进入404



#### 29.搜索功能



#### 30.防抖和节流原理

防抖原理:就是触发事件n秒后才执行事件，如果n秒内又触发了事件，则会重新计算防抖的时间

节流原理:就是值连续触发事件但是在n秒钟执行一次函数，节流会稀释函数的执行频率

总结:函数防抖是某一段时间内只执行一次，而函数节流是间隔时间执行。

debounce

- search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
- window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

throttle

- 鼠标不断点击触发，mousedown(单位时间内只触发一次)

- 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

  

#### 31.发送一次htpp请求到页面渲染?

1. DNS 解析（查询）：将域名地址解析 ip 地址(域名的用处是方便记录,缺点是浪费性能)

- 浏览器 DNS 缓存
- 计算机 DNS 缓存
- 路由器 DNS 缓存
- 网络运营商 DNS 缓存
- 递归查询

2. TCP 链接：TCP 三次握手  ===> 建立连接

- 客户端发送服务端：我准备好了，请你准备一下
- 服务端发送客户端：我也准备好了，请你确认一下
- 客户端发送服务端：确认完毕

![TCP三次握手_通俗版](D:\FQ\feiq\Recv Files\陈辉鸿资料\sz210223\4.复习\01.课件\note\images\TCP三次握手_通俗版.jpeg)

3. 发送请求

- 将请求报文发送过去

4. 返回响应

- 将响应报文发送过来

5. 解析渲染页面(js解析会阻塞页面渲染)

- 遇到 HTML，调用 HTML 解析器，解析成 DOM 树
- 遇到 CSS，调用 CSS 解析器，解析成 CSSOM 树
- 遇到 JS，调用 JS 解析器（JS 引擎），解析 JS 代码
  - 可能要修改元素节点，重新调用 HTML 解析器，解析更新DOM 树
  - 可能要修改样式节点，重新调用 CSS 解析器，解析更新 CSSOM 树
- 将 DOM + CSSOM = Render Tree（渲染树）
- layout 布局：计算元素的位置和大小信息(计算布局排版,重排)
- render 渲染：将颜色/文字/图片等渲染上去(绘制页面内容,重绘)

6. 断开链接：TCP 四次挥手
   (断开请求链接 2 次, 断开响应链接 2 次)

- 客户端发送服务端：请求数据发送完毕，可以断开了
- 服务端发送客户端：请求数据接受完毕，可以断开了
- 服务端发送客户端：响应数据发送完毕，可以断开了
- 客户端发送服务端：响应数据接受完毕，可以断开了

![四次挥手_通俗版](D:\FQ\feiq\Recv Files\陈辉鸿资料\sz210223\4.复习\01.课件\note\images\四次挥手_通俗版.jpeg)

tcp3次握手:确认双方的接受能力、发送能力是否正常。



#### 32.移动端适配

​     每个品牌的手机都有着不同的物理分辨率，这样就会导致，每台设备的逻辑分辨率也不尽相同，目的:让拥有不同屏幕大小的终端设备拥有一致的ui界面，让拥有更大屏幕的终端展示

1.rem布局

​    -1.设值viewport(配置理想视口)

```
<!-- 框架已经帮我们设置了，这里可以忽略 -->
<meta name="viewport" content="width=device-width,initial-scale=1">
```

​    -2.动态设置rem的值

```
// rem-demo/util/rem.js
// 设置基准大小
const baseSize = 32
function setRem () {
  // 当前页面宽度相对于 750 宽的缩放比例
  const scale = document.documentElement.clientWidth / 750
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
window.onresize = function () {
  setRem()
}
```

​    -3.在入口函数中引入rem.js文件

```
// rem-demo/src/main.js
import './utils/rem'
```

​    -4.安装并使用postcss-pxtorem

```
npm i postcss-pxtorem
```

   -5.如果是vue脚手架的话，vue.config.js中进行配置，如果是react的比如Ant Design Mobile，在craco.config.js中配置

```
// rem-demo/vue.config.js
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue : 16, //（数字，函数） 根元素字体大小
            unitPrecision: 5, //（数字）允许REM单位增长的十进制数字
            replace: true, // （布尔值）替换包含rems的规则，而不添加后备
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px
            minPixelValue: 0, // （数字）设置要替换的最小像素值
            selectorBlackList  : [], // 忽略转换正则匹配项
            propList   : ['*'], // 可以从px转换为rem的属性，匹配正则
            exclude: /node_modules/i // （字符串，正则表达式，函数）要忽略并保留为px的文件路径
          }),
        ]
      }
    }
  }
}
```

#### ---总结

​    优点：rem 布局能很好的实现在不同尺寸的屏幕横向填满屏幕，且在不同屏幕元素大小比例    一致

​     缺点：在大屏设备（Pad）上，元素尺寸会很大，页面显示更少的内容。

​     针对大屏改进方案：

​          -1.限制 rem 的最大值

​          -2.通过媒体查询，限制内容最大宽度

2.vw/vh布局

3.百分比布局

4.响应式布局



#### 33.nuxt.js 和 next.js

nust.js是一个基于vue.js的服务端渲染应用框架

使用 SSR（也称为 "universal" 或 "isomorphic" 模式），将使用 Node.js 服务器将基于 Vue 组件的 HTML 传递给客户端，而不是纯 JavaScript。与传统的 Vue SPA 相比，使用 SSR 将带来更大的 SEO 提升

next.js 是一个基于React的服务端渲染应用框架



#### 34.深拷贝

创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

实现深拷贝:

​       1)JSON.parse(json.stringify())

 第二种   对象和数组的深拷贝

```
  var obj1 = { a: 1, b: 2 };
      //封装判断数据类型的对象
      function classType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
      }
      function clone(content) {
        //1.判断对象是否是一个对象或者数组  精确判断
        //2。如果是对象和数组，创建一个新数组或对象，进行for in 遍历 赋值返回新数组
        if (classType(content) === "object") {
          var newObje = {};
        } else if (classType(content) === "array") {
          var newObje = [];
        } else {
          //3.如果不是 那就是基本数据类型 直接return
          return content;
        }
        for (var key in content) {
          newObje[key] = content[key];
        }
        return newObje;
      }
     const newObj= clone(obj1);
     newObj.a=3;
     console.log(obj1,newObj)
```



#### 35.keep-alive的使用(页面缓存)

 keep-alive 在开发Vue项目的时候，大部分组件是没必要多次渲染的，所以Vue提供了一个内置组件`keep-alive`'抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中

使用`keep-alive`可以将所有路径匹配到的路由组件都缓存起来

`keep-alive`大多数使用场景就是这种。

```
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
```

在被`keep-alive`包含的组件/路由中，会多出两个生命周期的钩子:`activated` 与 `deactivated`。

**activated在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用**。

**activated调用时机：**

第一次进入缓存路由/组件，在`mounted`后面，`beforeRouteEnter`守卫传给 next 的回调函数之前调用：

```
    beforeMount=> 如果你是从别的路由/组件进来(组件销毁destroyed/或离开缓存deactivated)=>
    mounted=> activated 进入缓存组件 => 执行 beforeRouteEnter回调
复制代码
```

因为组件被缓存了，**再次进入缓存路由/组件时，不会触发这些钩子**：

```
    // beforeCreate created beforeMount mounted 都不会触发。
复制代码
```

所以之后的调用时机是：

```
    组件销毁destroyed/或离开缓存deactivated => activated 进入当前缓存组件 
    => 执行 beforeRouteEnter回调
    // 组件缓存或销毁，嵌套组件的销毁和缓存也在这里触发
复制代码
```

**deactivated：组件被停用(离开路由)时调用**

**使用了`keep-alive`就不会调用`beforeDestroy`(组件销毁前钩子)和`destroyed`(组件销毁)，因为组件没被销毁，被缓存起来了**。

这个钩子可以看作`beforeDestroy`的替代，如果你缓存了组件，要在组件销毁的的时候做一些事情，你可以放在这个钩子里。

如果你离开了路由，会依次触发：

```
    组件内的离开当前路由钩子beforeRouteLeave =>  路由前置守卫 beforeEach =>
    全局后置钩子afterEach => deactivated 离开缓存组件 => activated 进入缓存组件(如果你进入的也是缓存路由)
    // 如果离开的组件没有缓存的话 beforeDestroy会替换deactivated 
    // 如果进入的路由也没有缓存的话  全局后置钩子afterEach=>销毁 destroyed=> beforeCreate等
复制代码
```

那么，如果我只是想缓存其中几个路由/组件，那该怎么做？

##### 缓存你想缓存的路由：

##### Vue2.1.0之后:

Vue新增了两个属性配合`keep-alive`来有条件地缓存 路由/组件

- `include`：匹配的 路由/组件 会被缓存

- `exclude`：匹配的 路由/组件 不会被缓存

  

#### 36.大数据冻结

Object.freeze(obj)



#### 37.7天免登陆



#### 38.token的存储有效期



#### 39.watch的使用和computed的使用及其区别

**computed：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

**watch：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

使用`immediate: true`选项, 这样它就会在组件创建时立即执行.

`watch`中还有一个属性: `deep`, 默认值为: `false`, 即是否需要开启深度监听. 

**运用场景：**

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。



#### 40.vue的生命周期

vue中一共有11个生命周期函数，其中常用的有3个

分别为:

初始化阶段:

**beforeCreate**  vue实例的挂载元素el和数据对象data都为undefined，还未初始化

**created**   vue实例的数据对象data有了，el为undefined，还未初始化。

​				-可以在这里发送请求，但是如果发送请求体积过大的话js线程会一直进行等待直到接收完毕才会继续执行

**beforeMounted**  vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。
**mounted**  vue实例挂载完成，data.message成功渲染

​				-操作swiper，元素的拖拽    操作dom ，发送请求

更新阶段:当data变化时，会触发beforeUpdate和updated方法

**beforeUpdate** 二次操作dom发送请求

**updated**

卸载阶段:

**BeforeDestroy**   清除定时器，解绑全局事件总线

**Destroyed**

销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

特殊三个:

**errorCaptured**:捕获子孙组件错误的

**activated **在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用。(在`mounted`后面)

**deacivated**:组件被停用(离开路由)时调用

- 加载渲染过程

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

- 子组件更新过程

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

- 父组件更新过程

父 beforeUpdate->父 updated

- 销毁过程

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

![vue生命周期](C:\Users\19587\Desktop\整理出来的文件夹\images\流程图，理解知识图集\vue生命周期.webp)

#### 41.垂直居中布局

  -flex布局 

 -margin

 -绝对定位加margin

 -绝对定位+transfrom

#### 42.rem，em  vh,vw

  rem,em相对定位，rem相对于html根标签定位，em相对于它的最近父元素字体大小

  vh，vw相对于屏幕大小的宽度和高度，1vw=屏幕宽度的100/1



#### 43.同步和异步

​      同步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，那么这个进程会
一直等待下去，直到消息返回，才会继续向下执行。
​      异步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，这个时候进程会继续往下执行，不会阻塞等，待消息返回时系统再通知进程进行处理



#### 44.正确判断this指向

普通函数 this 指向，主要看调用方式，而箭头函数看定义方式

1. 普通函数

- 直接调用，this 指向 window，在严格模式下，指向 undefined
- 隐式调用（对象调用方法），this 指向调用的对象
- 显示调用（通过 call、apply 调用函数），this 指向传入的第一个参数
- new 调用，this 指向生成实例对象

2. 箭头函数

- this 指向，离他最近的外层函数的 this
- 和调用无关

3. 回调函数

- 定时器回调函数、ajax 回调函数
  - this 指向 window，在严格模式下，指向 undefined
- DOM 事件回调函数
  - this 指向绑定事件的 DOM 元素
- React 中的生命周期函数
  - this 指向组件实例对象
- React 中事件回调函数
  - 定义普通函数形式：this 指向 undefined
  - 定义箭头函数形式：this 指向组件实例对象

#### 45.项目的开发流程

用户提出需求-->产品经理会将根据用户需求制作概念图-->开会讨论开发模块可行性(评估)-->ui设计号视图效果

-->将页面设计图交给前端 (将页面设计图交给前后端)-->前端和后端进行api的连接-->每天将代码提交给测试进行测试(审核 )有bug话测试会将代码返回并提出bug交给自己修改--->没有问题会放到测试服务器上进行运行-->邀请用户进行测试了-->没有问题交互给用户



#### 46.vuex

概念:vuex是一个专门为vue.js应用程序开发的状态管理工具，采用集中式存储管理应用的所有组件状态，更改状态唯一方法是提交mutation

State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。

Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。

Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。

Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。

Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

原理:Vuex的双向绑定通过调用 new Vue实现，然后通过 Vue.mixin 注入到Vue组件的生命周期中，再通过劫持state.get将数据放入组件中

vuex解决了什么问题(什么时候用): 

​         -多个组件依赖于同一状态时 

​         -来自不同的组件的行为需要变更同一状态

怎么引入vuex

​    先安装依赖 npm i vuex 

​	在项目目录src中简历store文件夹

​	在store文件夹下新建index.文件

```
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})

```

在store文件夹下面 再新建一个modules文件夹，下面新建index.js,用于管理所有模块

```
// 汇总所有vuex的模块
import search from './search'
import detail from './detail'
import user from './user'

// 统一暴露出去
export default {
  search,
  detail,
  user
}
```

modules-->xxx.js  具体的模块

```
//在里面定义
const state={}//定义集中管理的状态
const getters={}//直接获取state中管理的状态数据
const actions={}//用来间接更新state
const mutations={}	//更新state
//暴露出去
export default {
 state,
 getters,
 actions,
 mutations
}
```

在全局vue实例中引入 main.js

```
import store from "./store"

new Vue={
  store
}
```



```
this.$store.commit('toShowLoginDialog', true);
this.$store.dispatch('toShowLoginDialog',false)
复制代码
```

主要区别是：

dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)

commit：同步操作，写法：this.$store.commit('mutations方法名',值)

触发mutations:     this.$store.mutations.模块名.commit(同步触发mutations,值)

调用修改state:   this.$store.state.模块名     修改 this.$store.state.模块名=“val”

调用actions :this.$store.actions.模块名.dispatch("异步触发actions",值)

##### 47.虚拟dom的优势

1. DOM 引擎、JS 引擎 相互独立，但又工作在同一线程（主线程） JS 代码调用 DOM API 必须 挂起 JS 引擎、转换传入参数数据、激活 DOM 引擎，DOM 重绘后再转换可能有的返回值，最后激活 JS 引擎并继续执行若有频繁的 DOM API 调用，且浏览器厂商不做“批量处理”优化， 引擎间切换的单位代价将迅速积累若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。

   其次是 VDOM 和真实 DOM 的区别和优化：

   1. 虚拟 DOM 不会立马进行排版与重绘操作
   2. 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多DOM节点排版与重绘损耗
   3. 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部



48. #### keep-alive

   keep-alive 在开发Vue项目的时候，大部分组件是没必要多次渲染的，所以Vue提供了一个内置组件`keep-alive`'抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中

使用`keep-alive`可以将所有路径匹配到的路由组件都缓存起来

`keep-alive`大多数使用场景就是这种。

```
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
```

在被`keep-alive`包含的组件/路由中，会多出两个生命周期的钩子:`activated` 与 `deactivated`。

**activated在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用**。

**activated调用时机：**

第一次进入缓存路由/组件，在`mounted`后面，`beforeRouteEnter`守卫传给 next 的回调函数之前调用：

```
    beforeMount=> 如果你是从别的路由/组件进来(组件销毁destroyed/或离开缓存deactivated)=>
    mounted=> activated 进入缓存组件 => 执行 beforeRouteEnter回调
复制代码
```

因为组件被缓存了，**再次进入缓存路由/组件时，不会触发这些钩子**：

```
    // beforeCreate created beforeMount mounted 都不会触发。
复制代码
```

所以之后的调用时机是：

```
    组件销毁destroyed/或离开缓存deactivated => activated 进入当前缓存组件 
    => 执行 beforeRouteEnter回调
    // 组件缓存或销毁，嵌套组件的销毁和缓存也在这里触发
复制代码
```

**deactivated：组件被停用(离开路由)时调用**

**使用了`keep-alive`就不会调用`beforeDestroy`(组件销毁前钩子)和`destroyed`(组件销毁)，因为组件没被销毁，被缓存起来了**。

这个钩子可以看作`beforeDestroy`的替代，如果你缓存了组件，要在组件销毁的的时候做一些事情，你可以放在这个钩子里。

如果你离开了路由，会依次触发：

```
    组件内的离开当前路由钩子beforeRouteLeave =>  路由前置守卫 beforeEach =>
    全局后置钩子afterEach => deactivated 离开缓存组件 => activated 进入缓存组件(如果你进入的也是缓存路由)
    // 如果离开的组件没有缓存的话 beforeDestroy会替换deactivated 
    // 如果进入的路由也没有缓存的话  全局后置钩子afterEach=>销毁 destroyed=> beforeCreate等
复制代码
```

那么，如果我只是想缓存其中几个路由/组件，那该怎么做？

##### 缓存你想缓存的路由：

##### Vue2.1.0之后:

Vue新增了两个属性配合`keep-alive`来有条件地缓存 路由/组件

- `include`：匹配的 路由/组件 会被缓存
- `exclude`：匹配的 路由/组件 不会被缓存



#### 49.diff算法

Diff算法实现的是最小量更新虚拟DOM

虚拟DOM：虚拟DOM指的就是将真实的DOM树构造为js对象的形式，从而解决浏览器操作真实DOM的性能问题。

最小量:新老虚拟DOM之间找到最小更新的部分，从而将该部分对应的DOM进行更新。

![vue-diff算法](C:\Users\19587\Desktop\整理出来的文件夹\images\流程图，理解知识图集\vue-diff算法.webp)



#### 50.token

首次登录时，后端服务器判断用户账号密码正确之后，根据用户id、用户名、定义好的秘钥、过期时间生成 token ，返回给前端；

前端拿到后端返回的 token ,存储在 localStorage 和 Vuex 里；

前端每次路由跳转，判断 localStorage 有无 token ，没有则跳转到登录页，有则请求获取用户信息，改变登录状态；

每次请求接口，在 Axios 请求头里携带 token;

后端接口判断请求头有无 token，没有或者 token 过期，返回401；

前端得到 401 状态码，重定向到登录页面。



#### 51.vue中更新是异步还是同步的，为什么?

​      /数据更新必须是同步的，视图是异步更新，如果视图更新是同步的，那会导致多次渲染，那会导致多次渲染浪费造成不必要的性能，没必要，内部做了去重(重新更新的值)和防抖(只更新最后一次)

  

#### 52.vue中nextTick的原理是什么?

​      nextTick 中的回调是在下次 DOM 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM

​      因为视图更新是异步的，有时候外界可能会在数据更新之后想要拿到最新的dom元素进行操作，vue为了让用户达到统一的效果，响应式内部使用了nixtTick，也要让用户使用nextTick，vue2中的nextTick做了兼容，如果promise支持，就用promise.resolve().then()来处理，如果不支持，就用mutationObserve来处理，如果还不支持就用settimediate来处理，最后还不支持就用setITimeout



#### 53.Vue中data为什么必须是一个函数?

​     组件中的data写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data

​     而写成对象形式，就是所以组件实例共用了一个data,这样一个改的话都改了，new Vue的时候data可以写成对象，因为产生的是实例



#### 54.vue中的name属性好处是什么?

1.项目中有用到keep-alive时:name可以用作include和exclude的值

2.递归组件，顾名思义，就是自己的内部实现又调用自己的组件

3.在vue-devtools调试工具中，写了name，name作为调试工具中组件的名字



#### 55.xss https://github.com/dwqs/blog/issues/68

​      xss,跨站脚本攻击，是一种代码注入攻击，攻击者通过在目标网站上注入恶意脚本，使之在浏览器上运行，利用这些恶意脚本，攻击者可获取用户的敏感信息如cookie,sessionId等，进而危害数据安全, 简单来说，任何可以输入的地方都有额能引起，包括url

​      xss攻击有三种类型:存储型xss，反射型xss,dom型xss

​      存储型:存储型 XSS 会把用户输入的数据 "存储" 在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。这种 XSS 攻击具有很强的稳定性。

​       反射型:反射型 XSS 只是简单地把用户输入的数据 “反射” 给浏览器，这种攻击方式往往需要攻击者诱使用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站

​       dom型:基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。

​     防范:

​          -httpOnly:在cookie中设置httponly属性后，js脚本将无法读取到cookie信息(并非阻止了攻击，只是使攻击拿不到cookie)

​		  -输入检查，对 于输入格式的检测，例如邮箱，后端也要做，因为攻击者可能绕开正常的输入流程，直接利用相关接口向服务器发送设置

​         现在主流的浏览器内置了防范 XSS 的措施，例如 [CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)。(csp是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括xss),为使CSP可用, 你需要配置你的网络服务器返回  [`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy) 

 

#### 56.CSRF

​		CSRF,跨站请求伪造，是一种劫持受信任用户向服务器发送非预期请求的攻击方式

​         通常情况下，CSRF 攻击是攻击者借助受害者的 Cookie 骗取服务器的信任，可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击服务器，从而在并未授权的情况下执行在权限保护之下的操作。

​       防范:

​        -验证码，某些重要的地方加验证码，比如修改密码，执行某些重要操作可以做，但是不能什么地方都做，所以只能作为一种辅助方案

​        -CSRF之所以能够攻击成功，是因为攻击者可以完全伪造用户的请求，该请求中所有的永有的验证信息都是存储在cookie中，因此攻击者可以在不知道这些验证信息的情况下直接利用用户自己的cookie来通过安全验证，要抵御csrf关键在于请求中放入攻击者不能伪造的信息，并且该信息不在cookie中，可以在htpp请求中以参数的形式加入一个随机产生的token，并在服务器端建立一个拦截器来验证一个token，如果请求中没有token或者token内容不正确，则认为可能是csrf攻击而拒绝该请求。

​     

#### 57.Object.assign()

Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

应用场景:执行取消按钮

```
 cancel() {
      //关闭这个显示由数据穿下来
      this.$emit("update:skuIsShow", false);
      //清除这个界面代码
       this.resetDate(); 
    },
    resetDate() {
    // this.$options用于当前 Vue 实例的初始化选项
      Object.assign(this.$data, this.$options.data());
    },
```





#### 58.RestLess api和 RestFul api

​      Restless API是传统的api:然后我的理解是，restless api在请求服务器接口的时候，因为服务器把接口写死了所以我们只能通过一种url请求执行一个操作，就比如我请求单个商品数据，它们的请求接口是相同的，但是请求方式是不同的，传统的restLess api的话一个url请求都只是是一个操作，获取商品数据需要发送单独的get请求，而删除也有单独的接口

​      而使用RestFul api这种新型的api的话，只需用通过不同的请求方式，就能操作同一个url请求的添加post,修改put，删除delete,查询get，就能执行不同的操作

####  59.深度选择器

`scoped` 是通过使用 PostCSS 来进行转换，给 DOM 节点增加一个 `data-v-xxx` 的唯一属性，再利用 CSS 的属性选择器，来达到样式隔离的效果

```
<style scoped> 
  .a {
    color: red;
  }
</style>

// 编译后
.a[data-v-xxx] {
    color: red;
}
```



所以在使用 `scoped` 属性后，父组件只能修改**子组件根节点**样式，那么怎样才能修改更深层级的子元素呢？

深度作用选择器的目的，就是为了修改更深层级的子元素样式。

scoped` 是为了避免样式污染而添加的属性，原理是通过给 DOM 增加 `data-v-xxx` 的唯一属性，再通过 CSS 属性选择器来达到效果。

如果遇到需要更改深层元素样式的情况，我们可以使用深度作用选择器，但需要区分版本和使用场景，大致如下：

**Vue 2**

- 不推荐使用 `/deep/`
- 在 Sass 之类的预处理器中使用 `::v-deep`
- 没有预处理器的情况下使用 `>>>`
- 使用上面的操作符，`<style>` 必须有 `scoped` 属性

**Vue 3**

- 不支持 `/deep/`
- 不支持 `>>>`
- 推荐使用 `::v-deep(.class)` 代替 `::v-deep .class`
- 针对 `<slot>` 可以使用 `::v-slotted` 选择器
- 可以使用 `::v-global` 注册全局样式
- 使用上面的操作符，`<style>` 必须有 `scoped` 属性



#### 60.购买商品支付流程(扫码支付，银行卡支付)

点击购买商品-->加入购物车-->判断是否携带token(是否是登录状态)-->点击加入购物车:如果没登录:一般用户进入本页面发送请求时候(拦截器会给其一个临时id),使用临时id将购物信息存储到SessionStorage中-->点击去购物车，获取临时id中购物信息

​                                                -->如果携带token(登录状态)--->跳转购物车-->获取用户的购物车列表-->

​                                                                                                 --->加入购物车,发送请求购物车列表的请求,将用户临时id中的购物信息合并

点击支付--->请求购物详情页(请求地址新，这里可以添加删除，和设置默认),选择微信支付-->请求一个支付图片，拿到图片，使用qrcode插件将图片转换为base64格式，dialog显示出支付图片，我们需要使用定时器监视支付是否成功的接口，成功的话就关闭dialog



#### 61.webpack的常用配置

webpack作用:模块化打包，编译兼容，能力扩展



#### 62.express

Express是一个最小且灵活的Web应用程序框架，为Web和移动应用程序提供了一组强大的功能，它的行为就像一个中间件，可以帮助管理服务器和路由



#### 63.权限管理

**登录权限控制**

​        登录访问权限控制是对用户的校验。在用户登录成功之后，后台将返回一个token，之后前端每次进行接口请求的时候，都要带上这个token。后台拿到这个token后进行判断，如果此token确实存在并且没有过期，则可以通过访问。如果token不存在或后台判断已过期，则会跳转到登录页面，要求用户重新登录获取token。

**菜单中的页面是否可以被访问**

​         只挂载当前用户拥有的路由，如果用户通过URL进行强制访问，则会直接进入404，相当于从源头上做了控制

1.权限涉及到的meta属性

- ​	
- manageFree: true 不在操作权限树中展示

2.router.beforeEach()拦截路由的钩子

- 不需要权限的路由直接放行。meta内noRequireAuth和manageFree不受权限控制
- 进入路由前，从后端请求获取需要展示的菜单。后端根据token判断当前用户权限，返回对应菜单。前端递归对比确定最终要显示的菜单列表

3.router.addRoutes()

- 通过router.addRoutes()动态添加所有符合权限的路由

  

##### 按钮级权限控制(Vue指令v-permission)

1.每个模块对应有四种权限，查询(get)，添加(post)，更新(put)，删除(delete)

2.利用十进制和二进制来表示当前模块所拥有的权限。1111(15)，转换后的二进制与权限的关系表示：从右至左数(1代表拥有该权限，0代表不拥有)，第一位代表查询，第二位代表添加，第三位代表更新，第四位代表删除。如eg：二进制1111(15)，代表用于查询，添加，更新，删除四种权限。

3.判断对应模块没有此权限时，移除当前按钮dom元素。



##### 接口访问权限控制

前后端约定接口采用RESTful风格，同样对应四种权限，包括查询（get），添加（post），更新（put），删除（delete）。对于查询操作，正常如果参数只有一个，应该用get请求，如果有多个参数，需要改为post请求，但是需要在url后面添加/query以告诉服务端当前进行的是查询操作，用于和正常的添加(post)请求区分。同样的是，删除用户时如果有多个参数，DELETE请求同样改为POST请求，在后面添加/delete用于和正常的删除（delete）操作进行区分。



![权限管理](C:\Users\19587\OneDrive\桌面\优鲜\截图文件\权限管理.webp)



#### 63.小程序复习





#### 64.http和https区别

HTTP是`明文传输`，不安全的，HTTPS是`加密传输`，安全的多

HTTP标准端口是`80`，HTTPS标准端口是`443`

HTTP不用认证证书`免费`，HTTPS需要认证证书`要钱`

`连接方式不同`，HTTP三次握手，HTTPS中TLS1.2版本7次，TLS1.3版本6次

HTTP在OSI网络模型中是在`应用层`，而HTTPS的TLS是在`传输层`

HTTP是`无状态`的，HTTPS是`有状态`的



65.小程序购物车的购物流程





66.上线项目中遇到的问题，详细描述，解决
咱们前端一般不会出什么问题!
非要说的话 ,前端路由写的跟nginx配置的不一样 所以导致路由跳转的时候页面报错

##### **项目上线时,后端需要进行专门的配置**

1. 如果用户处于"/home"路由,此时用户刷新页面
2. 浏览器会将/home地址发送给服务器,作为后端路由解析
3. 但是后端此时如果没有这个路由,会提示404
   1. 所以在此处,后端需要做的事情就是,将他没有的路由都统一返回index.html文件
4. 浏览器接收到返回的index.html文件,当前网页中的VueRouter会主动解析地址栏中的/home





#### 65.权限 https://juejin.cn/post/6981031288803164173

