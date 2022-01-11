# 起步

## 创建新项目

```
npx create-react-app 项目名
```



## 引入

每个使用jsx语法的文件，都要引入React

```javascript
import React from react
```



项目的入口文件是index.js

```javascript
import ReactDOM from 'react-dom';
ReactDOM.render(
	<组件>,
	DOM节点
)
```



## 进行自定义配置

`create-react-app`创建的项目默认隐藏了`webpack.config.js`文件，如果要修改默认的配置，首先运行：

```
npm run eject
```

然后根目录中会出现两个文件夹：

- `script`
- `config`



# JSX

- JSX表达式有多行时，在外加一对**括号**

- 注释方法：
    - 单行：`{//注释内容}`，其中`}`必须放在第二行
    - 多行：`{/**/}`
    
- 插值：用一对括号{}，内部可以使用JS表达式

- 必须包裹在一个最外层容器内。不会被渲染的最外层容器标签：`React.Fragment`（或使用空标签`<>`）

- 自定义元素必须大写开头

- 特殊属性名替换：
    - 设置样式时，`calss`替换为 `className`
    - label标签的`for`替换为`htmlFor`
    
- JSX实际上是`React.createElement(component, props, children)`的语法糖，所以使用jsx时必须引入React

    ```javascript
    <MyButton color="blue" shadowSize={2}>
      Click Me
    </MyButton>
    // 会编译为：
    React.createElement(
      MyButton,
      {color: 'blue', shadowSize: 2},
      'Click Me'
    )
    ```

- 组件的prop没有赋值则默认值为true






# 组件

- 组件的props或state发生改变时，组件的render函数就会重新执行（所有子组件也会）



## 分类

- 函数组件

```javascript
import React from 'react'
const element = ''	// 一个jsx元素
function Name(props){
	return (
        element
    )
}
```

- 类组件

```javascript
import Rect from 'react'
class Name{
	constructor(props){
		super(props);
		this.state = {}
	}
	render(){
		return (
			{/*
				组件内容
			*/}
		)
	}
}
```



## props

> 父组件向子组件传递的属性值



### 单向数据流

- 含义：子组件不能更改传来的值
- 需要修改时，使用同样通过props传来的父组件的函数



### 参数校验

#### ProtoTypes

- 引入`PropTypes `
```
import PropTypes from 'prop-types';
```
- 对组件Com进行参数校验：
    - 对每个属性的类型进行约束
    - `isRequired`表示该属性必须传入
- 可用的类型：
	- `object`
	    - 指定对象由某一类型的元素组成：`objectOf()`
	    - 指定对象不同的属性由特定类型的元素组成：`shape({})`
	- `array`
	    - 指定数组由某一类型的元素组成：`arrayOf()`
	- `func`
	- `bool`
	- `number`
	- `string`
- 多种类型中的某一个：`oneOfTypes([])`
- 若干特定值的某一个：`oneOf([])`
- 任意类型：`any`

```js
class Com extends React.Component{
	{/*...*/}
}

// 这里的proto是小写，这是组件的属性
Com.propTypes = {
	// 下面的Proto是大写，代表引入的ProtoTypes
	age:PropTypes.number
    name:PropTypes.string.isRequired,
    optionalObjectWithShape: PropTypes.shape({
  	  	color: PropTypes.string,
    	fontSize: PropTypes.number
  	}),
}
```



#### defaultProps

没有传递该参数时的默认值

```js
Com.defaultProps = {
	age:20
}
```



## state

> 组件自己的数据状态


- 在类组件的`constructor`中声明`this.state`并赋初值

- 更新`state`必须通过`setState`方法，会将传入对象和已有对象进行浅合并：

    ```this.setState({键：值,键2：值2})```

- state的更新是异步的。当对state的更新需要依赖state和props的值时，setState接收一个函数。
        其中参数表示更新前的上一个`state`，此次更新进行时的`props`

    ```javascript
    this.setState((lastState,props) => ({
    	键：值
    }), () => {
    	// 更新完成后的回调函数
    })
    ```





## 生命周期

### 挂载

1. `constructor`：

	- 类组件的构造函数。必须在开头调用`super(props)`。
	- 构造函数中**不应存在副作用**



2. `getDerivedStateFromProps`

	- 返回一个对象来更新`state`。若返回null则不进行更新
	- 仅适用于`state`的值总取决于`props`的情况



3. `render`： 

**必须实现**的方法，应为**纯函数**



4. `componentDidMount`

> componentWillMount已被删除

- 会在组件挂载（插入DOM树）后马上执行
- 适合进行**依赖于DOM的操作**
- 适合进行**数据请求**
- 在该钩子里调用`setState`，会触发重新渲染，但用户不会察觉到中间态（即改变数据前第一次render的状态）




### 更新

1. `getDerivedStateFromProps`

2. `shouldComponentUpdate(nextProps, nextState)`

	- 根据返回值决定是否更新，默认返回true
	- 调用`forceUpdate`进行更新时不会调用该方法
	- 返回false不会阻止子组件在其state改变时重新渲染



3. `render`

4. `getSnapshotBeforeUpdte`

	- 在渲染输出之前被调用
	- **意义：**由于渲染是异步的，在`rende`和`componentDidUpdate`之间会有延迟，而本钩子可以在DOM更新前被调用，读取当前的状态并为` componentDidUpdate `返回参数



5. `componentDidUpdate(prevProps, prevState)`

	- 在更新完成后立即执行
	- 可以对比更新前后的`props`和`state`



### 卸载

1. `componentWillUnmount`

	- 在组件销毁时调用
	- 可以进行清理计时器、取消订阅等操作，不应再改变`state`，因为组件不会再渲染了



## 组合

- 通过props.children可以取得标签中传入的所有内容。内容不限于可渲染的类型，如可以传递函数

    > 类似于vue中的默认插槽

- 当有多个位置需要预留时，可以通过其他自定义props传入

    > 即将JSX对象作为props传入

```react
// 外层组件定义
function OutBox(props){
    return (
    	<div>
        	{props.left}
            {/*
            	一些其他内容
            */}
            {props.right}
        </div>
    )
}

// 使用时：
<OutBox 
	left={<LeftComponent/>}
    right={<RightComponent/>}
/>
```



## memo

- 函数组件不能使用`shouldComponentUpdate`优化更新流程，可以用`React.memo`作为替代。

```js
function Foo(){}
export default React.memo(Foo);
```

- 默认会对`props`做**浅层比较**，并在`props`未改变时**复用**组件。若要自定义对比过程，可以传入第二个函数

```js
function Foo(){}
export default React.memo(Foo,function(prevProps, nextProps){
    // 返回true表示不更新，返回false表示要更新
});
```

- 若函数组件中使用了`useState`、`useEffect`、`useContext`等Hook，`state`和`context`改变时仍会触发更新



# 虚拟DOM

## 渲染流程

- 数据 +  JSX模板生成虚拟DOM

    > 虚拟DOM是一个JS对象

- 用虚拟DOM生成真实DOM

- 当数据（state或props）发生变化时：

    - 数据 + 模板生成新的虚拟DOM
    - 和原来的虚拟DOM进行比对，找出区别
    - 操作DOM更新相应内容



## Diff算法

> 比对原来的虚拟DOM和新生成的虚拟DOM的区别

- 是对同层的DOM节点的比对
    - 若同层的节点不同，则直接替换其之下的所有节点
    - 若相同，则再比较下层的节点



# ref

> 用于获取某个节点元素



## 适用的情况

- 触发强制动画
- 管理焦点
- 文本选择
- 非受控表单（如文件上传）



## 创建

- 使用` React.createRef() `创建，赋值给一个变量r
- 将变量r赋值给组件或DOM的`ref`属性

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

- `ref`属性的取值也可以是一个函数，该函数接收DOM节点或组件实例作为参数，可以将引用赋值给任意变量



## 使用

通过ref实例的`current属性`访问其引用（在`constructor`中定义，**不能马上读取**）

```js
componentDidMount(){
    console.log(this.myRef.current)
}
```

- 对于DOM元素，获取的就是**DOM节点**
- 对于class组件，获取的是组件的**组件实例**
- **不能用于函数组件**（函数组件内部可以使用ref引用其他元素，但ref属性不能用在函数组件上）



## ref转发

在ref引用的组件中，将ref转发到子级组件或DOM元素上：

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
// 使用FancyButton组件时直接获取button这个DOM元素的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```





# Portals

> 提供一种将子组件渲染到父组件DOM树之外（任意DOM节点）的方案

```js
const ele = <div>element</div>
class Foo{
    render(){
        return React.createPortal(ele, document.getElementById('ele'))
    }
}
```



使用Portal返回的节点虽然**不在父组件的DOM树中**，但其仍**存在于React树中**。

因此如`context`、`事件冒泡`等特性都是可以使用的。

对于DOM结构：

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

挂载于`app-root`的根组件中，可以捕获到`modal-root`中的事件



# 事件处理

- 采用驼峰命名

- 在JSX中传入一个函数而不是字符串。`onClick={functionName}`

- React的事件处理只在`事件冒泡阶段`

- 回调函数接收一个合成事件e作为参数

    - 要阻止默认事件，不能用`return false`的方法。要用`e.preventDefault`

- 在类组件中，回调函数要绑定this

    - 在constructor中用bind方法绑定this指向

    - ```js
        handleClick = () => {}
        ```

- 向回调函数传递参数：

    - ```
        onClick = {(e) => this.func(arg,e)}	// 需要手动传入事件参数e
        ```

    - ```
        onClick = {this.func.bind(this,arg)} // e自动传入，作为最后一个参数
        ```



# 渲染

##条件渲染

- 避免组件渲染：
    - 函数组件：return null
    - 类组件：render方法中return null
- 条件渲染：在插值表达式中通过JS进行控制



## 循环渲染

- 将一个列表循环渲染的方法：通过map等遍历方法返回元素数组
- 循环生成的每一项要有一个独一无二的key值
- 设置key值的位置：最靠近数组的上下文中（一般是map方法内）



# 表单

- 受控组件：state作为唯一数据源。
- 控制方法：
    - 监听onChange事件，用`event.target.value`更新state中的数据
    - 表单标签上：`value={this.state.xxx}`
- 对于下拉列表：
    - 在select标签上设置value属性，取值可以是字符串或数组（对应多选）
    - option中value值和select标签相同的项会被选中
    - 在select标签监听onChange事件，通过e.target.event获取点击选项的value值



# Context

## 1. 目的

在一个组件树中共享全局数据（如主题、颜色等变量），避免在组件之间层层传递props



## 2. 使用流程

###  创建Context对象

```js
const MyContext = React.createContext(defaultValue);
```

只有当provider没有提供值时，defaultValue才起作用



### 使用Context的Provider组件

```jsx
<MyContext.Provider value={/*某个自定义的值*/}>
	{/* 在内部的组件中即可使用MyContext传递来的值 */}
    <Title />
</MyContext.Provider>
```

- Provider接收value属性，传递给内部所有组件
- 组件只接收到最近一层的value。即外层的值会被覆盖
- 当Provider的value变化时，内部所有使用到Context的组件都要重新渲染，并且不受制于`shouldComponentUpdate`



### 使用contextType读取一个Context（类组件）

```javascript
class Title extends React.Component{
    static contextType = MyContext;
	render(){
        return <H1>{this.context}</H1>
    }
}

// 等价于
class Title extends React.Component{
	render(){
        return <H1>{this.context}</H1>
    }
}
Title.contextType = MyContext;
```

- 在类组件中，将`Context对象`赋值给类的`contextType`后，可以通过`this.context`取得`Context对象`的值

- 若要对context进行修改，则用context传递一个对象，在其中包括要传递的值以及改变它的函数




### 创建Consumer组件读取多个Context

```javascript
import{ createContext } from 'react';
const ThemeContext = createContext('light');
const ColorContext = createContext('white');
export default {ThemeContext, ColorContext}
```

```javascript
import React, { createContext } from 'react';
import {ThemeContext, ColorContext} from './context.js'
class App extends React.Component{
    render(){
        return (
        	<ThemeContext.Provider>
            	<ColorContext.Provider>
            		<Child />
            	</ColorContext.Provider>
            </ThemeContext.Provider>
        )
    }
}
```

```javascript
import {ThemeContext, ColorContext} from './context.js'
class Child extends React.Component{
    render(){
        return (
        	<ThemeContext.Consumer>
            	{
                    theme => (
                    	<ColorContext.Consumer>
                    		color => (
                    			<div>
                    				theme is: {theme}
                    				color is: {color}
                    			</div>
                    		)
            			</ColorContext.Consumer>
                    )
                }
            </ThemeContext.Consumer>
        )
    }
}
```



# Hooks

**定义**：用于在函数组件中钩入`state`和`生命周期`的***函数***



**调用规则：**

- 只能在函数最外层调用，不能在循环语句、条件判断、子函数中使用
- 只能在**函数组件**和**自定义Hook**中调用
- 需要从react中引入



## useState

**目的**：在函数组件中使用`state`

**用法**：

```js
const [value, setValue] = useState('defaultValue');
```

- `useState`返回一个数组，两个元素分别是状态值（`state`），和改变这个状态的函数（`setState`）
    - 此处的state**不一定**是一个对象，可以是任意类型的
    - 返回的更新函数不会将新旧值合并，而是**直接替代**
- `useState`接收一个参数，作为状态的默认值
- **惰性初始化**：该参数也可以是一个函数，返回默认值。该函数只会在初次加载时执行
- 同一组件内，可以多次调用`useState`



## useEffect

**目的**：

- 执行副作用操作，可以作为 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 三个函数的组合。
- 实现关注点分离。将不相关的行为拆分到不同的useEffect中，而不是杂糅到同一个声明周期钩子里

**用法：**

```js
useEffect(() => {
    // 执行异步操作
    return () => {} // 返回清除函数
},[])
```

- 第一个参数是**函数**（effect），初次渲染（`componentDidMount`）以及更新（`componentDidUpdate` ）时执行。
- 第二个参数是一个**数组**。默认情况下每次渲染effect都会调用。传入第二个数组后，若数组中所有元素在渲染前后都相等（===），则会跳过此次effect的执行。**传入空数组，即只执行一次**
- 返回一个函数（可选），会在**组件卸载时**（`componentWillUnmount`）执行。
- **执行时机**：DOM更新完成，**浏览器渲染之后**，不会阻塞页面布局（异步执行）



### useLayoutEffect

用法和useEffect相同。

区别在于：

- 会同步执行（会造成阻塞）
- **执行时机**：DOM更新完成，**浏览器渲染之前**



## useContext

**目的：**在函数组件中读取`Context对象`的值

**用法：**

```js
const value = useContext(MyContext);

// 相当于类组件中的
static contextType = MyContext
```

- 接收的是**Context对象本身**
- 返回的是**Context对象的当前值**
- 当`MyContext.Provider`提供的值更新时，该hook会触发重新渲染（即使父组件通过`shouldComponentUpdate`跳过了更新）



## useReducer

**目的：**

- `useReducer`是用来以类似redux的逻辑（数据作为state，改变数据通过reducer）处理组件内的复杂`state`
- `useReducer`并**不负责组件间共享**，可以配合`useContext`使用实现共享

**用法：**

```js
const defaultState = {
    value: '',
    list:[]
}
function reducer(state, action){
    if(action.type == 'change'){
        const newState = JSON.parse(JSON.stringify(state))
        // ...和redux一样，复制一份state并做修改，最后返回
        return newState;
    }
}
function initFunction(val){
    return {
        value: val,
        list: []
    }
}
function App(){
    // 使用state中的数据，使用dispatch提交更改
    const [state, dispatch] = useReducer(reducer, defaultState);
    
    // 惰性初始化
    const [state, dispatch] = useReducer(reducer, defaultState, initFunction);
}
```

- `useReducer`接收三个参数
    - `reducer`函数
    - `state`默认值
    - 惰性初始化函数：将state初始化的逻辑抽离为一个函数，会接受第二个参数作为函数的参数，并返回state的默认值

- 若需要在其他组件中触发变更，则将`dispatch`函数通过`props`或`Context`传递给子组件



## useCallback

**目的：**返回一个`memoized函数`

> 即依赖的数据不变时，函数（的引用）不变

**用法：**

```js
const memoizedCallback = useCallback(
  () => doSomething(a, b),
  [a, b],
);
```

- 第一个参数是需要记忆的函数
- 第二个参数是数组，应列出函数所依赖的所有变量，这些变量**不会传递给函数作为参数**
- 若没有提供依赖数组，则每次都重新计算



## useMemo

**目的：**返回一个`memoized值`

> 依赖的数据不变，不会重新进行计算，值也不变

**用法：**

```js
const memoValue = useMemo(
    () => {
        // do something...
        return '';
    },
    [a, b]
)
```

- 两个参数的含义和`useCallback`一样
- 若没有提供依赖数组，则每次都重新计算



## useRef

**目的：**

- 返回一个可变的ref对象，其current属性用于存储变量（可以是对于DOM的引用，或其他任何值）

**用法：**

```js
function Test(){
    const [renderIndex, setRenderIndex] = useState(1);
    const ref1 = createRef();
    const ref2 = useRef();
    console.log(ref1.current, ref2.current) // null <h2>xxx</h2>
    return (
        <div className="App">
            <h1 ref={ref1}>{renderIndex}</h1>
            <h2 ref={ref2}>{renderIndex}</h2>
            <button onClick={() => setRenderIndex(prev => prev + 1)}>
                Cause re-render
            </button>
            
        </div>
    );
}
```

和`createRef`的区别：

- 存储DOM节点并在回调中引用时，和`createRef`基本一致（除了在函数顶层直接使用）
    - `createRef`每次都会重新执行并赋值
    - 而`useRef`返回的始终是同一个引用

- 可以用于存储**与渲染无关但后续会改变的值**，因为`useRef`返回的变量改变后，**不会触发**重新渲染

    - 由于**`createRef`每次都返回新的引用**，所以无法保存原来的状态。所以点击按钮后，h1标签中仍未空
    - `useRef`每次返回同一个引用，点击按钮对其赋值后，h2标签中的内容会改变

    ```js
    function Test(){
        const createRefValue = React.createRef()
        const useRefValue = useRef();
        const [,setDummyState] = useState()
        return (
            <div>
                <h1>{createRefValue.current}</h1>
                <h2>{useRefValue.current}</h2>
                <button onClick={()=> {
                    createRefValue.current = 123;
                    useRefValue.current = 123;
                    setDummyState({})
                }}>Set Value</button>
            </div>
        )
    }
    ```

- 可以用于在更新时保存上一次的状态：

    ```js
    function Foo(){
        const [count, setCount] = useState(0);
        const prevCountRef = useRef(count);     
        useEffect(() => {
            prevCountRef.current = count;
        });
        return (
            <div>
                <h1>Now: {count}, before: {prevCountRef.current}</h1>
                <button onClick={() => setCount(count+1)}>+</button>
            </div>
        )
    }
    
    // 或是抽取为一个自定义Hooks
    function usePre(value){
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        })
        return ref.current;
    }
    
    // 使用：
    const [count, setCount] = useState(0);
    const prevCountRef = usePre(count);  
    ```

    

## useImperativeHandle

**目的：**自定义`ref`给父组件暴露的内容，即暴露某些可操作方法，而不是直接暴露引用

**用法：**

```js
function Input(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
const FancyInput = forwardRef(Input);
function App(){
    const myRef = useRef();
    return(
    	<FancyInput ref={myRef} />
		<button onClick={() => myRef.current.focus()}></button>
    )
}
```

- 配合`React.forwardRef`使用
- 第一个参数是`ref`（从`forwardRef`包装的组件函数中接收的第二个参数）
- 第二个参数是一个函数，返回一个对象，这个对象会赋值给`ref.current`



## 自定义Hooks

> 将组件逻辑提取到可复用的函数中

- 定义一个函数（**必须以useXxx形式命名**）
- 在函数内调用其他Hooks函数
- 可以在自定义Hooks中接收任意参数，返回任意值

```js
function usePre(value){
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })
    return ref.current;
}
```



# 样式处理



## 需要处理的问题

CSS没有全局作用域，会带来**全局污染**、**命名冲突**的问题



## 解决思路

1. `CSS in JS`： 如`styled-components`
2. `CSS Module`



## CSS Module

> ***CSS Module仅处理类选择器***

在最新版的`create-react-app`创建的项目中，已经自带了对于`CSS Module`的支持



### 局部样式

1. 对于局部样式，命名时使用`xxx.module.css`的格式
2. 在引入样式时，引入一个对象的形式，并用它的属性进行赋值

```js
import style from './index.module.css';

<div className={style.title}></div>
```



### 全局样式

- 使用传统的命名方法并直接引入
- 在`xxx.module.css`中，使用`:global()`语法

```css
:global(.title) {
    color: redl;
}
```



