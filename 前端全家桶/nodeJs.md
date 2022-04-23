# **NodeJs**

**NodeJs概念**

基于chrome浏览器v8引擎的一个javascript的运行环境

特点:事件轮询机制 ，单线程，

优点:处理异步非阻塞的Io

缺点:不适合处理密集型



**NodeJs模块化**

什么是模块化:把一个大功能拆分成许多个小的功能所组成，这一个一个小功能可以称为模块

模块化解决两个问题: 1）形成js模块区域，防止全局变量污染  2）解决模块和模块之间的依赖问题

模块化规范:CMD,依赖就近     AMD，依赖前置，CmomonJs,ES6

ES6: 导出:统一导出:export {导出的变量（内容)}   可以导出多条，内容可以是变量名，方法名等

​				 分开导出 export  直接内容(类型 变量=值，fn...)  可以导出多条，直接导出内容

​				默认导出  export default 内容   1)默认导出只可以导出一条，要放到最前面导出

导入:   统一导入: import {}  from  '/路径'

​			分开导入：import  {} from    '/路径'

​						--统一导入和分开导入变量名重命名使用: 属性 as 自定义属性名

​			默认导入:  import  xxx from  '/路径'





**包和包管理**











**Node.js核心模块**

Node package Manager，Node的包管理

Npm的常用指令:

```
npm -v:查看npm的版本
npm init:初始化项目的package.json文件
npm init -y:初始化一个默认配置package.json
npm install/i 包名  1）安装指定的包2）包会下载到node_modules文件夹中 下载的包会自动添加到						package.json中的开发依赖	
npm  istall 包名 --save 或 npm i xxx -S下载并安装到项目的生产依赖中
npm install / i 包名 --save--dev 或 npm install /i 包名 -D 下载包并添加到package.json中															的开发依赖里
npm install /i 安装项目中的所有依赖
npm i xxx@1.12.1 下载指定的包
npm install / i 包名 -g 全局安装 (全局安装都是安装一些工具)
npm remove/r 包名 删除指定的包
```





**Http模块**





**HTTP课程**





**静态资源服务器**



**mongoDB**



**express**



**缓存机制**



**浏览器存储**

浏览器所有的存储方式:Local Storage，Session Storage，IndexdDB,Web SQL，Cookie



**ajax**‘







**GuIp**

自动化构建工具，Grunt、Gulp、FIS是最常见的自动化构建工具。

GuIP是基于流(内存)的自动化构建系统，特点:1）任务化(所有构建操作，在guip中都称为任务)，2）基于流

GuIP的作用:将繁多的代码文件进行整理，使其变得整洁



























