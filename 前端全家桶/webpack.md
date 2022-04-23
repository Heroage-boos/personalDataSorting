下载webpack

npm init -y



webpack的五大核心概念:

1.入口

2.出口:output

​		-输出的文件名称

​		-输出的文件路径

3.loader

4.plugin

5.mode模式



loader和plugin的区别?

   webpack只认识js文件，那么就就是说在我们项目引入的过程中，会出现很多文件webpack无法识别

​     例如:less文件

​      less官方出了一个核心库可以解析less文件编程css文件，核心库名称叫做less

​	   webpack想要调用less的核心库，需要loader，例如less-loader

​		而plugin一般是用于因引入插件、





webpack.config.js

```
const {resolve} =require('path')
module.exports={
 entry:""./src/main.js,
 output:{
  filename:"index.js",
  path:resolve(__dirname,'./build')
 }
 module:{
	rules:[
	{
	  test:/\.less$/,
	  use:[
	    'style-loader',
	    "css-loader",
	    "less-loader"
	  ]
     }
	]
  },
  plugins:[
   new HtmlwebpackPlugsh({
     template:“./public/index.html"
    })
  ],
  mode:"development",
  devServer:{
  	port:8089,
  	proxy:{
  	
  	},
  	//热模替换，hot热模替快，还会刷新当前项目   //hotOnly 不会刷新项目
 //hot:true,
  	hotOnly:true,
  }
}
```



