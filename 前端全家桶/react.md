# React

1.react简介

   -概念:一个javascript库，声明式编码，组件化编码

   -高效开发原因:1)不直接操作dom

​							2）采用react diff算法，减少页面重绘重排次数

```
<body>
    <div id="root"></div>
    <!-- 在html中运行 需要  react react-dom label包,引入顺序不可变-->
    <script src="js/react.development.js"></script>
    <script src="js/react-dom.development.js"></script>
    <script src="js/babel.min.js"></script>
   	babel.js的作用
      a.	浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行
      b.	只要用了JSX，都要加上type="text/babel", 声明需要babel来处理

    <script type="text/babel">
      /**
       * react 一个javascript库，声明式，组件化编码
       *  react高效原因:1)diff算法，减少页面重绘，重排次数
       *               2)不直接操作dom
       * */
      //创建虚拟dom元素
      const rDom = <h3>china</h3>;
      //渲染虚拟dom对象
      ReactDOM.render(rDom, document.getElementById("root"));
    </script>
  </body>
```



2.创建虚拟dom对象的两种方式

​	-使用原生js创建(不常用)

```
 //使用jsx语法创建dom对象，最终会被解析为原生js
      let RootA = <h1>China</h1>;
```

​	-使用jsx语法创建

```
 //语法 React.createElement("标签名",{属性名:属性值},..."后面的所有都是插入的值")
      let Element = React.createElement(
        "h1",
        { className: "aa" },
        "hello world"
      );
      
     //将虚拟dom 渲染到真实dom元素中取
      ReactDOM.render(RootA, document.getElementById("root"));
```

3.在react中声明使用变量

```
const a = "China";
const hTtile = <h3>{a}</h3>;
```



4.react中定义组件的两种方式

```
    <script type="text/babel">
      /*  react中定义组件的两种方式 */
      //1.工厂函数组件
      function MyContainer() {
        return <h2>工厂函数组件</h2>;
      }

      //方式二: es6类组件(复杂组件)
      class MyContainer2 extends React.Component {
        render() {
          console.log(this);
          const a = "ES6";
          return (
            <div>
              <MyContainer />
              <h2>es6类组件(复杂组件 ){a}</h2>
            </div>
          );
        }
      }
      //将组件渲染到真实dom中去
      ReactDOM.render(<MyContainer2 />, document.getElementById("root"));
    </script>
```

   	-注意:1)组件名首字母必须大写

​				 2)组件中有且只有一个根标签

​				 3）使用标签的形式在页面中展示

​				 4）必须要有结束标签

5.react的三大属性

   state:状态机用来更新状态数据，触发视图更新

```
  <script type="text/babel">
      //组件中的三大属性
      /*  ref 获取真实dom节点，便于操作dom
          state 状态机，通过改变组件中的状态来更新对应页面
          props  父子组件间用来传参 */
      class MyContainer extends React.Component {
        constructor(props) {
          super(props);
          //初始化state
          this.state = {
            name: "小",
            age: "one",
            sex: "man",
          };
        }
        //读取state
        /*  this.state.name */

        //react绑定事件使用
        click = () => {
          //读取state
          /* console.log( this.state.name); */
          this.setState({
            name: "我喜欢你",
          });
        };

        render() {
          const { name, age, sex } = this.state;
          return (
            <h1 onClick={this.click}>
              {name},{age},{sex}
            </h1>
          );
        }
      }
      ReactDOM.render(<MyContainer />, document.getElementById("root"));
   
```



​	ref:获取dom节点，以便操作dom(尽量不操作)

```
deleteTab = () => {
          //获取要删除标签的dom
          console.log(this.refs);
          //操作移除
          this.refs.h1.remove();
        };

        render() {
          const { name, age, sex } = this.state;
          return (
            <div>
              <button ref="inp" onClick={this.deleteTab}>
                删除标签
              </button>
              <h1 ref="h1" className="ddd" onClick={this.click}>
                {name},{age},{sex}
              </h1>
              <MyContainer2 id="d" name={name} />
              <MyContainer3 name={name} />
            </div>
          );
        }
```



​	props:组件标签的所有属性都保存在props中，用来父子组件传递数据，数据是只读的不可修改,在原生js总作为形参进行接收和传递

```
 render() {
          const { name, age, sex } = this.state;
          return (
            <div>
              <h1 onClick={this.click}>
                {name},{age},{sex}
              </h1>
              //在组件内部传参 所有属性都可以被子组件MyContainer2拿到  自定义名字={值}
              <MyContainer2 name={name} />
              <MyContainer3 name={name} />
            </div>
          );
        }
        
     //原生js创建组件
      function MyContainer2(props) {
        console.log(props);
        return <h1>你好,{props.name}</h1>;
      }

      class MyContainer3 extends React.Component {
        constructor(props) {
          super(props);
        }
        render() {
          const { name } = this.props;
          console.log(this.props);
          return <h3>奥特曼{name}</h3>;
        }
      }
```





6.react中触发事件（合成事件）

```
 //如果写成click(){}会报错，原因是没有绑定到react实例上
 click=()=>{
 
 }
 
 //定义到当前react实例上面  on+事件名(事件名开头需大写)
 <h1 onClick={this.click}>{name},{age},{sex} </h1>
```



7.收集表单数据

​	-受控组件:通过state和onChange事件的方法来自动收集表单数据

```
<script type="text/babel">
      class MyFrom extends React.Component {
        //初始化state
        state = {
          password: "",
        };
        getPassword = (event) => {
          //更新state
          this.setState({
            //使用受控组件更新state
            password: event.target.value,
          });
          console.log(this.refs.getUserName.value, this.state.password);
          //非受控组件 使用ref 获取数据，只是在特定的时候需要
          console.log(this.state.password);
        };
        render() {
          let { password } = this.state;
          return (
            <div>
              用户名: <input type="text" ref="getUserName" />
              密码:{" "}
              <input
                type="password"
                value={password}
                onChange={this.getPassword}
              />
              <button type="submit">提交</button>
            </div>
          );
        }
      }
      ReactDOM.render(<MyFrom />, document.getElementById("root"));
    </script>
```

​	-非受控组件：需要时才通过ref收集表单数据

​	

8.组件的声明周期

React旧的生命周期分为三个阶段:

初始化:

constructor

componentWillMount

render

componentDidMount

更新:  

三种方式触发更新:

​		父组件的render:componentWillReactIveProps()-->shouldComponentUpdate()-->componentWillUpdate()-->render()-->componentDidUpdate()-->componentWillUnmount()

​	    this.setState(state状态改变):shouldComponentUpdate()-->componentWillUpdate()-->render()-->componentDidUpdate()-->componentWillUnmount()

​		 this.forceUpdate():componentWillUpdate()-->render()-->componentDidUpdate()-->componentWillUnmount()

​		卸载:componentDidUpdate()-->componentWillUnmount()



