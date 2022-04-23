这里写自定义目录标题
 element-ui中按需引入
 为什么选择 element-ui 而不是 iview

# 1、按需引入

1. 借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的：
2. 更改.babelrc文件

# 2、 我们将按需引入的代码单独分割一下

1. 在 src 文件夹中新建我们的 element 文件夹，并在里面新建一个 index.js 文件
2. 在index文件中去书写我们需要引入的部分组件
3. 在 main.js 中使用该文件，就大功告成了
    3、为什么要使用 单独分割的方式去按需加载
4. 我们使用常规的方式再来加载一次
5. 我们将引入的 Dialog 做一些修改，如下图
    element-ui中按需引入
    为什么选择 element-ui 而不是 iview
    因为在多次使用两个组件的过程中慢慢发现，iview 的一些组件还是需要再完善，而 element-ui 现在更加的成熟

所以， 这里我们一起来学习一下在 vue 中按需引入 element-ui 一些组件中的坑(Dialog组件)

这里我们使用的版本是 element-ui : 2.4.7，vue: 2.2.2

# 1、按需引入

1. 借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的：



```undefined
    npm install babel-plugin-component -D
```

# 2. 更改.babelrc文件



```csharp
    "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
```

当然这里如果有其他的配置，只需要在 plugins 的数组中继续添加我们需要的配置代码就行了

# 我们将按需引入的代码单独分割一下

1. 在 src 文件夹中新建我们的 element 文件夹，并在里面新建一个 index.js 文件

1. 在index文件中去书写我们需要引入的部分组件



```rust
// 导入自己需要的组件
import { Select, Option, OptionGroup, Input, Tree, Dialog, Row, Col } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
  }
}
export default element
```

这里要使用 Select 组件，必须同时使用 Option 和 OptionGroup
 这里的 install 方法表示在 main.js 中，如果使用 Vue.use() 方法的话，则该方法默认会调用 install 方法

1. 在 main.js 中使用该文件，就大功告成了



```jsx
    // css样式还是需要全部引入
    import 'element-ui/lib/theme-chalk/index.css'
    import element from './element/index'
    Vue.use(element)
```

3、为什么要使用 单独分割的方式去按需加载

1. 我们使用常规的方式再来加载一次
    在 main.js 文件中 直接使用



```rust
import 'element-ui/lib/theme-chalk/index.css'
import { Dialog, Select, Option, OptionGroup, Input, Tree, Row, Col } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Input)
Vue.use(Tree)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
```

不好意思，现在就报错了

我们在 element-ui 的源码中可以看到，的确使用的是 Dialog，但是我们在运行的时候还是报错了

1. 我们将引入的 Dialog 做一些修改，如下图

可以看到，我们现在改成小写，项目是可以正常运行的，应该是不是 element-ui 的一些小失误吧，这样的写法会将我们的 main.js 文件变得很大很复杂，所以我们建议是 使用第一中方式来按需加载 element-ui 的一些组件



作者：yichen_china
链接：https://www.jianshu.com/p/2181f3c263c2
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。