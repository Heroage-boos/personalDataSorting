webpack 项目打包，构建工具，优化项目性能

开发环境 development    生产环境 production

需要掌握五大护发:entry,loader,mode,plugin,output

基本框架搭建

- - 生成 package.json 文件
  - 命令：`npm init -y`

- 安装 webpack

  - npm install webpack webpack-cli -D

  #### 基本结构

- 创建 js 文件

  - src/index.js
  - src/js/module1.js
  - src/js/module2.js
  - src/js/module3.js

  webpack中只能识别js和json文件内容

- 创建主页面:

  - public/index.html

创建配置文件 webpack.config.js

```
const { resolve } = require("path"); // node内置核心模块，用来设置路径。

module.exports = {
  entry: "./src/index.js", // 入口文件
  output: {
    // 输出配置
    filename: "./js/main.js", // 输出文件名
    path: resolve(__dirname, "build"), // 输出文件路径配置
    clean: true, // 清除打包目录的文件
  },
  mode: "development", // 开发环境(二选一)
  // mode: 'production'   // 生产环境(二选一)
};
```

打包 html 文件

- 添加 html 文件

  - src/index.html
  - 注意不要在 html 中引入任何 js 文件

- 安装插件 Plugins

  - `npm install html-webpack-plugin -D`

- 在 webpack.config.js 中引入插件（插件都需要手动引入，而 loader 会自动加载）

  - `const HtmlWebpackPlugin = require('html-webpack-plugin')`

- 配置插件 Plugins

  ```js
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  ```

- 运行指令：`npx webpack

自动编译运行

- 安装

  - `npm install webpack-dev-server -D`

- 修改 webpack 配置对象（注意不是 loader 中）

  ```js
  devServer: {
    contentBase: './build',  // 打包根路径
    port: 8080, // 端口号
    open: true  // 自动打开浏览器
    progress: true, // 进度条
  },
  ```

- 运行指令：`npx webpack serve`

- 简化指令

  - 修改 package.json 中 scripts 指令
    - "start": "npm run dev",
    - "dev": "webpack serve"
  - 运行指令：`npm start / npm run dev`

- 问题：

  - 此时并没有自动刷新浏览器功能
  - 原因：https://github.com/webpack/webpack-dev-server/issues/2758
  - 简单概括，这是一个 webpack BUG，自动刷新浏览器功能和 browserslist 不能同时存在

- 解决办法

  - 添加配置：target: 'web'
  - 问题：那 webpack 等工具打包的代码就有兼容性问题
  - 后面解决

> 以上就是 webpack 开发环境的配置，可以在内存中自动打包所有类型文件并有自动编译运行等功能。

生产环境配置

- 创建文件夹 config，将 webpack.config.js 复制两份

  - webpack.dev.js
  - webpack.prod.js

- 修改 webpack.prod.js 配置，删除 devServer 配置

  ```js
  module.exports = {
    output: {
      filename: "js/[name].[contenthash:8].js", // 添加了hash值, 实现静态资源的长期缓存
      path: resolve(__dirname, "../build"),
      publicPath: "/", // 所有输出资源公共路径
    },
    mode: "production", // 修改为生产环境
    target: "browserslist", // 让webpack兼容生效，但是devServer会失效，但是生产环境不需要devServer
  };
  ```

- 修改 package.json 的指令

  - "start": "npm run dev"
  - "dev": "webpack serve --config ./config/webpack.dev.js"
  - "build": "webpack --config ./config/webpack.prod.js"

- 开发环境指令

  - npm start
  - npm run dev

- 生产环境指令

  - npm run build
  - 注意: 生产环境代码需要部署到服务器上才能运行
    - npm i serve -g
    - serve -s build

其他配置可以参考文档:但是使用什么配置可以解决什么需要记住:

eslint eslint-loader 语法检查，用于规范js语法

less|sass -loader  编译less文件可以在浏览器中运行

style|css	  编译css文件可以在浏览器中运行

babel babel-loader 帮助我们把，es6语法编译成es5语法在浏览器上运行，处理兼容，但并没有完全兼容es6