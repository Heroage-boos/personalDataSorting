



##  创建虚拟 DOM 对象的两种方式

1. js 语法
   `React.createElement(type, props, ...children)`

2. jsx 语法
   `<h1>title</h1>`

## 2. 谈谈 JSX 语法

1. 全称：javascript xml
2. 作用：用来简化创建虚拟 DOM 对象
3. 语法

- 以<开头，会当做标签语法解析。
  - 如果标签首字母如果是小写，会当做 html 元素解析
  - 如果标签首字母如果是大写，会当做组件解析
- 以{开头，内部代码会当做 js 代码解析

4. jsx 不能被浏览器解析，需要被 babel 编译才行

## 3. 创建组件的两种方式

1. 工厂函数组件

```js
function MyComponent() {
  return <h1>title</h1>;
}
```

2. ES6 类组件

```js
class MyComponent extends React.Component {
  render() {
    return <h1>title</h1>;
  }
}
```

3. 定义组件三个注意事项

- 组件首字母必须大写
- 组件渲染的内容有且只有一个根标签
- 所有标签必须有结束符

## 4. 谈谈 state（有什么用，怎么用）

1. 作用：用来决定用户界面的更新的
2. 使用：

- 初始化

  ```js
  // 在constructor中初始化
  // 简写
  state = {
    xxx: yyy,
  };
  ```

- 获取
  `this.state.xxx`

- 更新
  `this.setState({ xxx: zzz })`

## 5. 谈谈 props

1. 作用：

- 用来存储所有组件标签属性数据
- 组件标签属性数据：用来组件外向组件内传递变化数据

2. 使用：

- 设置标签属性
  `<MyComponent xxx={xxx} yyy={yyy} />`

- 声明接受属性：对属性的类型、必要性限制，设置默认值等

  ```js
  static propTypes = {
    xxx: PropTypes.number.isRequired,
    yyy: PropTypes.string
  }
  
  static defaultProps = {
    yyy: 'defaultValue'
  }
  ```

- 获取标签属性
  `this.props.xxx`

## 6. 谈谈 refs

1. 作用：

- 用来获取真实 DOM 元素或组件实例对象

2. 使用：

- 初始化 ref 容器
  `xxxRef = React.createRef()`

- 设置 ref 属性
  `<h1 ref={this.xxxRef}>xxx</h1>`

- 获取 ref 的值
  `this.xxxRef.current`





## 1. 谈谈受控组件

通过 state 和 change 事件的方式来自动收集表单数据的组件

## 2. 谈谈生命周期函数

1. 旧版本

- 初始化挂载阶段

  - constructor
  - componentWillMount
  - render
  - componentDidMount

- 更新阶段

  - 父组件更新导致子组件重新渲染
    - componentWillReceiveProps
    - shouldComponentUpdate
    - componentWillUpdate
    - render
    - componentDidUpdate
  - this.setState
    - shouldComponentUpdate
    - componentWillUpdate
    - render
    - componentDidUpdate
  - this.forceUpdate
    - componentWillUpdate
    - render
    - componentDidUpdate

- 卸载阶段
  - componentWillUnmount

2. 新版本

- 初始化挂载阶段

  - constructor
  - static getDerivedStateFromProps
  - render
  - componentDidMount

- 更新阶段

  - this.setState 和 父组件更新导致子组件重新渲染

    - static getDerivedStateFromProps
    - shouldComponentUpdate
    - render
    - getSnapshotBeforeUpdate
    - componentDidUpdate

  - this.forceUpdate
    - static getDerivedStateFromProps
    - render
    - getSnapshotBeforeUpdate
    - componentDidUpdate

- 卸载阶段
  - componentWillUnmount

3. 重要的生命周期函数

- render
  - 返回要渲染的虚拟 DOM 对象
- componentDidMount
  - 发送请求、设置定时器、绑定事件等一次性任务
- shouldComponentUpdate
  - 性能优化：减少组件重新渲染的次数
  - 通过比较 state 和 props 有没有变化，来决定要不要重新渲染
- componentWillUnmount
  - 收尾工作：清除定时器、解绑事件等
  - 防止内存泄漏





## 虚拟 DOM Diff 算法

React 对新旧虚拟 DOM 树比较时，进行了三种优化，来提升比较的速度

## tree diff

1. 原因：开发时，我们进行跨层级移动节点较少，可以忽略不计，所以我们生成的 DOM 树结构很稳定

2. tree diff 策略

- 只进行相同层级的节点比较，从上到下依次比较
- 如果比较新旧 DOM 节点相同，继续比较子节点，如果不同，就不对比子节点了

3. 避免跨层级移动节点，如果真的需要，通过 css 去控制

## component diff

1. 原因：相同类的组件生成相似的结构，不同类的组件生成不同的结构

2. component diff 策略

- 比较时，如果对比的节点时组件，走 component diff
- 对比组件是否是同一类的组件
  - 是
    - 默认会对组件子节点进行 tree diff
    - 此时可以优化，定义 shouldComponentUpdate 函数
      - 内部判断新旧 state 和 props 是否发生变化，如果有变化就返回 true，如果都没有变化就返回 false（返回 false 就会跳过子节点的比较）
  - 不是，就删除旧组件，替换成新组件

3. 尽量复用组件

## element diff

1. 原因：相同层级的多个子节点进行操作时，性能不好（往前面追加元素）

2. element diff 策略

- 给相同层级的多个子节点都要添加一个 key 属性，值是唯一的
- 比较新旧 DOM 节点时，优先比较 key，key 相同还要看位置，都相等，就不动，位置不同就要移动位置，key 不同就要重新创建节点

3. key 的值能用 id 用 id，如果想使用 index，只能用于数组最后面的操作



setState是同步还是异步的