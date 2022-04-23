新建assets文件夹下新建style下新建index.suss文件里面引入各种样式文件的集合

```
@import './common';//公共样式
@import './vue-transition';//动画样式
@import './ui-reset';//功能样式
html,
...
video {
  box-sizing: border-box;//统一盒子模型
}
html,
body {
  min-height: 600px;
}
@import '../cusstyle/base.scss';

```



在main.js中全局引入使用

```
import './assets/style/index.scss'
```





2.配置ui默认样式assets下新建 xxxui名下继续新建config.json 和theme下新建index.css和fonts文件夹

详细参考地址:D:\companyProject\microCustomer-v.6.0\we_customer_operation\src\assets\weikeElementTheme0520\theme

在main.js中全局引入使用

```
import '../src/assets/weikeElementTheme0520/theme/index.css'
```





