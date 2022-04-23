1. 请说明`http://www.ceshi.com:80/test/test.html?par1=val1&par2=val2#p`的组成部分都是什么！

2. 使用`<marquee>`标签，其中包含一段文字`helloworld`，要求`hello`和`world`之间要换行，让这段文字循环移动5次，让其背景颜色为绿色。

3. 现在有一篇文章，标题为`hello world`，其中有一段话内容为`hello hello world`，请用适当的HTML标签表示出来，注意要将其放在主体标签中、字符集为`UTF-8`。

4. 定义一个链接链接到`www.baidu.com`，并且在新窗口打开。

5. 有如下目录结构：

   ```
   ├─ 1.html
   ├─ img1
   │   └─ img.jpg
   │   └─ test.html
   └─ src
       └─ 2.html
       └─ html
           └─ 3.html
   ```

   1. 在1.html中使用img.jpg，图片不能正确显示时显示小美女。

   2. 在test.html中使用img.jpg，图片宽度、高度均为200。

   3. 在2.html中使用img.jpg。

   4. 在3.html中使用img.jpg。

6. 有如下一段话：`abcdefghijklmnopq`，其a为语义的斜体，b为语义的粗体，ijk加上普通的删除。

7. 如何使用锚点？

8. 块状元素和行内元素的区别是什么？



1. 有如下HTML结构：

   ```html
   <a href="#">老婆不在家时玩的游戏</a>  
   ```

   请将该链接的下划线去掉，默认时颜色为黑色，当鼠标移动上去时显示下划线。

   a{

   text-decoration:none;

   color:#000;

   }

   a:hover{

   text-decoration:underline;

   }

2. 请说明块级元素、行内块级元素、行内元素的特点都是什么？

   使用display:进行转换  inline 行级  block 块级 inline-block行内块

   块级元素:可以设置宽和高，且独占一行

   行级元素:显示效果呈水平排列，不可以设置宽和高

   行内块元素:可以设置宽和高，且不独占一行

3. 有如下HTML结构：

   ```html
   <span>hello world</span>  
   ```

   不管字体多大，让其设置缩进为2个字。

   span{
   displlay:inline-block;

   text-indent:2em;

   }

4. 有如下HTML结构：

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
       <meta charset="utf-8" />
       <style>
           div{
               width:233px;
               border:1px solid green;
               font-size:14px;
               white-space: nowrap;
           }
       </style>
   </head>
   
   <body>
       <div>The open Web presents incredible opportunities for developers. To take full advantage of these technologies, you need to know how to use them. Below you'll find links to our Web technology documentation.</div>
       <div>开放的 Web 给予开发者不可思议的机会，想全面的利用这些技术，你需要知道如何使用它们。在下方你会找到相关 Web 技术文档链接。</div>
   </body>
   
   </html>
   ```

   1. 如何让其不换行，并且超出部分隐藏？

      ​    div{

      overflow:hidden;

      }

   2. 如果让其在任何情况下都换行？

      去除覆盖white-sapce:nowarp;

      word-brak:break-all;

      

5. 有如下HTML结构：

   ```html
   <h1><a href="#">哈哈</a></h1>
   ```

   请将a链接水平居中。

   h1{

    text-align:center;

   }

6. 有如下HTML结构：

   ```html
     <div>sphinx</div>
   ```

   已知其高度为200px，如何让其中的内容水平、垂直居中？

    div{

   ​        height: 200px;

   ​      line-height:200px;

   ​      text-align: center;

   ​       }

   ​      

7. 解决块状元素只包含一张图片时会有不知名的空白，其原因和解决方法都是什么？

   原因:内容区不知名的幽灵节点

   解决方案:1)转化为块级元素 ，块级没有基线，也就没有了和幽灵节点对齐的基线

   2）加line-height:0px

   3)font-size:0 给父标签

   4）设置底部对齐  vertical-align:buttom;

8. 有如下HTML结构：

   ```html
   <div>
   	<img src="./timg_small.jpg" />
   </div>
   ```

   已知其高度为500px，如何让其中的图片水平、垂直居中于div？

   div{

   heigth:500px;

   line-height:500px;

   text-align:center;

   }

9. 有如下HTML结构：

   ```html
   <div>
       <span>开放的 Web 给予开发者不可思议的机会，想全面的利用这些技术，你需要知道如何使用它们。在下方你会找到相关 Web 技术文档链接。</span>
   </div>
   ```

   已知`div`的宽度为`400px`，高度为`300px`，如何让`div`中的`span`垂直、水平居中于`div`，并且实现绝对的垂直居中？

​     div{

  width:400px;

height:300px；

line-height:300px;

text-align:center;

font-size=0;

}

span{

​      display: inline-block;

​      line-height:normal;

​      vertical-align: middle;

​      font-size:16px;

}



1. 请说明盒子模型的组成部分！

2. 块状元素和行内元素的默认宽度是多少？

3. 块状元素和行内元素的默认高度是多少？

4. 完成如下操作：

   1. 定义一个div，宽度为200px，高度为200px。
   2. 整体的内边距为10px。
   3. 边框宽度为1像素、绿色、实线。
   4. 计算出整个盒子模型的宽度和高度。

5. 有如下HTML结构：

   ```html
   <!DOCTYPE html>
   <html>
       <head>
           <meta charset="utf-8" />
   		<style>
   			div{
   				background-color:yellow;
   			}
   			h1{
   				margin:1em;
   			}
   		</style>
       </head>
       <body>
   		<div>
   			<h1>hello world!</h1>
   		</div>
       </body>
   </html>
   ```

   推算出会出现什么问题，应该如何解决？

6. 有如下HTML结构，请推算出最后的样子!

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
       <meta charset="utf-8" />
       <style>
           #f {
               width: 500px;
               height: 500px;
               border: 1px solid blue;
           }
   
           #z {
               width: 200px;
               height: 200px;
               margin: 0 auto;
           }
       </style>
   </head>
   
   <body>
       <div id="f">
           <div id="z"></div>
       </div>
   </body>
   
   </html>
   ```

7. 有如下`HTML结构`，子元素`width`值应该是多少？

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
       <meta charset="utf-8" />
       <style>
           #f {
               width: 500px;
               height: 500px;
               border: 1px solid blue;
           }
   
           #z {
               width: auto;
               height: 200px;
               margin: 0 50px;
               border:1px solid green;
           }
       </style>
   </head>
   
   <body>
       <div id="f">
           <div id="z"></div>
       </div>
   </body>
   
   </html>  
   ```

8. 有如下HTML，其div的宽度为多少？

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
       <meta charset="utf-8" />
       <style>
           #f {
               width: 500px;
               height: 500px;
               border: 10px solid blue;
               padding-left:10px;
               padding-right:10px;
               margin-left:10px;
               margin-right:10px;
           }
       </style>
   </head>
   
   <body>
       <div id="f">
       </div>
   </body>
   
   </html>
   ```

   加上`box-sizing:border-sizing`之后宽度是多少？



1. 请说明float形成文字环绕效果的原理。

   1. 父元素压塌，让浮动元素和正常元素在一条水平线上。
   2. 块级元素重叠，但是行内块状元素不重叠。

2. 有如下代码：

   ```html
   <!DOCTYPE html>
   <html>
       <head>
           <meta charset="utf-8" />
           <style>
               b{
                   float:left;
                   width:100px;
                   height:100px;
                   border:1px solid green;
               }
           </style>
       </head>
       <body>
           <b></b>
       </body>
   </html>
   ```

   b的宽度为多少？

   102*102

3. 如下代码会导致的结果是什么？

   ```html
   <!DOCTYPE html>
   <html>
       <head>
           <meta charset="utf-8" />
           <style>
               #f{
                   width:500px;
                   border:1px solid red;
               }
               #z{
                   float:left;
                   width:300px;
                   height:300px;
                   border:1px solid blue;
               }
           </style>
       </head>
       <body>
           <div id="f">
               <div id="z"></div>
           </div>
       </body>
   </html>
   ```

   上面的结果就是高度会塌陷。

   给`#f`加上`float:left`之后结果是什么？

   父类的高度被撑开了。 

4. 子元素浮动时撑开父元素高度的方法迄今为止有哪些，有什么特点？

   1. 直接设置高度。

      特点：设置的不妥当还是会让块状元素重叠，行内元素不重叠。

   2. 父级也设置`float:left`

      特点：适用的情况较少。很多时候他爹不浮动。

   3. 最后加上一个空的div，然后设置：

      ```css
      div.clearboth{
      	width:100%;
        	height:0px;
        	clear:both;
      }
      ```

      特点：会在末尾加一个无意义的标签。

   4. 适用`::after`。

      ```css
      div::after{
        content:'';
        display:block;
        clear:both;
      }
      ```

      特点：这种不会增加无意义的标签。有利于搜索引擎。



1. 有如下HTML结构：

   ```html
   <!DOCTYPE html>
   <html>
       <head>
           <style>
               #f{
                   position:absolute;
                   bottom:0;
                   right:0;
                   width:500px;
                   height:500px;
                   border:1px solid pink;
               }
               #f1,#f2,#f3{
                   width:200px;
                   height:200px;
                   border:1px solid green;
               }
   
               #f1 div,#f2 div,#f3 div{
                   width:100px;
                   height:100px;
                   border:1px solid red;
               }
   
           </style>
       </head>
       <body>
           <div id="f">
               <div id="f1">
                   <div style="position:absolute;right:0px;bottom:0px;"></div>
               </div>
               <div id="f2" style="position:absolute;right:10px;">
                   <div style="position:absolute;right:0px;bottom:0px;"></div>
               </div>
           </div>
       </body>
   </html>  
   ```

   1. `#f`相对于谁来进行定位？
   2. `#f1 div`相对于谁来进行定位？
   3. `#f2 div`相对于谁来进行定位？

2. 有如下结构：

   ```html
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <style>
           #f {
               position: absolute;
               box-sizing:border-box;
               border: 4px solid green;
           }
   
           #f div {
               float: left;
               width: 100px;
               height: 100px;
               border: 1px solid pink;
           }
       </style>
   </head>
   
   <body>
       <div id="f">
           <div>1</div>
           <div>2</div>
           <div>3</div>
       </div>
   </body>
   
   </html>
   ```

   `#f`的高度是多少?

3. 有如下代码

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
       <style>
           #f{
               position:relative;
               width:600px;
               height:600px;
               border:1px solid green;
           }
           #z{
               position:absolute;
               left:10px;
               right:10px;
               top:0;
               bottom:0;
               width:auto;
               height:auto;
               margin:10px;
               padding:10px;
               border:1px solid yellow;
           }
       </style>
   </head>
   
   <body>
       <div id="f">
           <div id="z"></div>
       </div>
   </body>
   
   </html>
   ```

   `#z`的`width`和`height`自动计算之后是多少？

4. 有如下结构：

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
   	<meta charset="utf-8" />
   	<style>
   		#f{
   			width:400px;
   			height:400px;
   			border:1px solid green;
   		}
   		#z {
   			width:100px;
   			height:100px;
   			border:1px solid yellow;
   		}
   	</style>
   </head>
   
   <body>
   	<div id="f">
   		<div id="z"></div>
   	</div>
   </body>
   
   </html>
   ```

   如何让`#z`水平、垂直居中于`#f`？



1. 有如下结构：

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
   	<meta charset="utf-8" />
   	<style>
   		#f{
   			width:400px;
   			height:400px;
   			border:1px solid green;
   		}
   		#z {
   			width:100px;
   			height:100px;
   			padding:10px;
   			border:1px solid yellow;
   		}
   	</style>
   </head>
   
   <body>
   	<div id="f">
   		<div id="z"></div>
   	</div>
   </body>
   
   </html>
   ```

   如何让`#z`水平、垂直居中于`#f`？

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
   	<meta charset="utf-8" />
   	<style>
   		#f{
               position:relative;
   			width:400px;
   			height:400px;
   			border:1px solid green;
   		}
   		#z {
               position:absolute;
               top:50%;
               left:50%;
               margin-top:-61px;
               margin-left:-61px;
   			width:100px;
   			height:100px;
   			padding:10px;
   			border:1px solid yellow;
   		}
   	</style>
   </head>
   
   <body>
   	<div id="f">
   		<div id="z"></div>
   	</div>
   </body>
   
   </html>
   ```

   

2. 有如下代码：

   ```html
   <!DOCTYPE html>
   <html>
       <head>
           <meta charset="utf-8" />
           <style>
               div{
                   position:absolute;
                   width:100px;
                   height:100px;
                   border:1px solid green;
               }
               #f1{
                   border-color:yellow;
                   background-color:yellow;
                   top:10px;
                   left:10px;
               }
   
               #f2{
                   border-color:blue;
                   background-color:blue;
                   top:0px;
                   left:0px;
               }
           </style>
       </head>
       <body>
           <div id='f1'>
           </div>
           <div id='f2'>
           </div>
       </body>
   </html>  
   ```

   上面代码中`#f1`和`#f2`是否会重叠，如果不会说明原因，如果会说明谁在上谁在下!

   会重叠，小蓝在上面。

3. 有如下代码：

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
   	<meta charset="utf-8" />
   	<style>
   		div {
   			width: 100px;
   			height: 100px;
   			border: 1px solid green;
   
   		}
   
   		#f1 {
   			border-color: yellow;
   			background-color: yellow;
   			top: 10px;
   			left: 10px;
   			position:absolute;
   		}
   
   		#f2 {
   			border-color: blue;
   			background-color: blue;
   			top: 10px;
   			left: 10px;
   
   		}
   	</style>
   </head>
   
   <body>
   	<div id='f1'>
   	</div>
   	<div id='f2'>
   	</div>
   </body>
   
   </html>  
   ```

   上面代码中`#f1`和`#f2`是否会重叠，如果不会说明原因，如果会说明谁在上谁在下!

   会重叠，小黄在上面。

4. 有如下代码：

   ```html
   <!DOCTYPE html>
   <html>
       <head>
   
       </head>
       <body>
           <form action="" method="post">
               用户名：<input type="text" name="userName" autofocus placeholder="请输入邮箱、手机号"/>
               密码：<input type="password" name="passwd"/>
               <input type="submit" value="登录"/>
           </form>
       </body>
   </html>  
   ```

   1. 如何当载入页面时自动在文本框（用户名）中获得光标？
   2. 如何在文本框中默认显示`请输入邮箱、手机号`

5. 请说明`position属性`中`fixed值`相对于谁来进行定位？

   相对于浏览器的视口。

6. 有如下代码：

   ```html
   <!DOCTYPE html>
   <html>
       <head>
           <style>
           </style>
       </head>
       <body>
           <div>
               <p>
                   <b>凡是用钱可以解决的问题，我现在都解决不了。</b>
               </p>
               <b>小时候家里穷，洗不起澡，只能站在窗户外面看别人洗澡</b>
               <div>
                   <p>
                       <b>我这种整天什么都不干，就知道吃喝玩乐，连门都不肯出的生活，跟活在天堂有什么区别？</b>
                   </p>
               </div>
           </div>
       </body>
   </html>
   ```

   1. 如果样式表为： 

      ```css
      div b{
          color:blue;
      }
      ```

      将会选中哪些元素？ 所有的b都会被选中。

   2. 如果样式表为：

      ```css
      div > b{
          color:red;
      }
      ```

      将会选中哪些元素？只会选中第二个b标签。

7. 请说明`E+F`和`E~F`的区别在哪里？

   * `E+F`，相邻兄弟选择器，选中指定的F元素，并且F元素紧位于E元素的后面。
   * `E~F`，兄弟选择器，选中指定的F元素，并且F元素要在E元素的后面（选中所有的F元素）

8. 有如下代码：

   ```html
   <!DOCTYPE html>
   <html>
       <head>
           <style>
   
           </style>
       </head>
       <body>
           <div>
               <b>hello</b>
               <a herf="#">hello</a>
               <a herf="#">hello</a>
               <a herf="#">hello</a>
               <a herf="#">hello</a>
               <a herf="#">hello</a>
           </div>
       </body>
   </html>
   ```

   1. 如果样式表为：

      ```css
      a:first-child{
          color:pink;
      }
      ```

      将会选中哪些元素？ 谁都选不中。

   2. 如果样式表为：

      ```css
      a:first-of-type{
          color:pink;
      }
      ```

      将会选中哪些元素？ 选中第一个出现的a标签。