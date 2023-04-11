---
category: 前端
tag:
  - react
---

# React

## JSX

- JSX 表达式有多行时，在外加一对**括号**

- 注释方法：
  - 单行：`{//注释内容}`，其中`}`必须放在第二行
  - 多行：`{/**/}`
- 插值：用一对括号{}，内部可以使用 JS 表达式

- 必须包裹在一个最外层容器内。不会被渲染的最外层容器标签：`React.Fragment`（或使用空标签`<>`）

- 自定义元素必须大写开头

- 特殊属性名替换：
  - 设置样式时，`calss`替换为 `className`
  - label 标签的`for`替换为`htmlFor`
- JSX 实际上是`React.createElement(component, props, children)`的语法糖，所以老版本中使用 jsx 时必须引入 React

  > Babel 插件会提前注入 jsx 相关的 API

  ```javascript
  <MyButton color="blue" shadowSize={2}>
    Click Me
  </MyButton>;
  // 会编译为：
  React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click Me");
  ```

- 组件的 prop 没有赋值则默认值为 true

## 组件

组件的 props 或 state 发生改变时，组件的 render 函数就会重新执行（所有子组件也会）。

### 为什么类组件中不执行 super(props)就无法使用 this.props

因为对 props 的挂载是在 **React.Component** 中进行的，在基类中同时还注入了 setState 和 forceUpdate 方法。

### 为什么函数组件的 prototype 上挂载属性无效

React 对函数组件的调用是直接执行函数，而不是通过 new。

### 组件间通信方式

1. props 与 callback
2. ref 获取元素
3. context
4. Redux 等全局状态
5. eventbus 事件总线

### State

#### setState 和 useState 的异同

相同：底层调用的方法相同；都会进行批量更新

不同：

- useState 的更新会对变量进行浅层比较，若相同不会进行更新
- setState 可以传入回调函数监听更新完成事件（函数组件中通过 useEffect）
- setState 的逻辑是将传入 state 和老 state 合并。而 useState 的逻辑是重新赋值并覆盖

#### setState 的批处理模式

在 18 版本之后，所有的更新都会使用批处理。

在 18 版本之前，会对内部触发的事件监听函数内的 setState 做批处理；对于 `addEventListenr` 或异步代码则不会。

> 原因，是否批处理是通过 `isBatchingUpdates` 判断的，异步代码切换了函数执行上下文

#### 强制同步更新：flushSync

> 不推荐使用

使用 `flushSync` 将会强制把它接收的函数中的 setState 同步执行，即 DOM 会立即更新。

## 生命周期

### 挂载

1. `constructor`：

   - 类组件的构造函数。必须在开头调用`super(props)`。
   - 构造函数中**不应存在副作用**

2. `getDerivedStateFromProps`

- 返回一个对象来更新`state`。若返回 null 则不进行更新
- 仅适用于`state`的值总取决于`props`的情况

3. `render`：

**必须实现**的方法，应为**纯函数**

4. `componentDidMount`

> componentWillMount 已被删除

- 会在组件挂载（插入 DOM 树）后马上执行
- 适合进行**依赖于 DOM 的操作**
- 适合进行**数据请求**
- 在该钩子里调用`setState`，会触发重新渲染，但用户不会察觉到中间态（即改变数据前第一次 render 的状态）

### 更新

1. `getDerivedStateFromProps`

2. `shouldComponentUpdate(nextProps, nextState)`

   - 根据返回值决定是否更新，默认返回 true
   - 调用`forceUpdate`进行更新时不会调用该方法
   - 返回 false 不会阻止子组件在其 state 改变时重新渲染

3) `render`

4) `getSnapshotBeforeUpdte`

   - 在渲染输出之前被调用
   - **意义：**由于渲染是异步的，在`rende`和`componentDidUpdate`之间会有延迟，而本钩子可以在 DOM 更新前被调用，读取当前的状态并为`componentDidUpdate`返回参数

5. `componentDidUpdate(prevProps, prevState)`

   - 在更新完成后立即执行
   - 可以对比更新前后的`props`和`state`

### 卸载

1. `componentWillUnmount`

   - 在组件销毁时调用
   - 可以进行清理计时器、取消订阅等操作，不应再改变`state`，因为组件不会再渲染了

## 组合

- 通过 props.children 可以取得标签中传入的所有内容。内容不限于可渲染的类型，如可以传递函数

  > 类似于 vue 中的默认插槽

- 当有多个位置需要预留时，可以通过其他自定义 props 传入

  > 即将 JSX 对象作为 props 传入

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
function Foo() {}
export default React.memo(Foo);
```

- 默认会对`props`做**浅层比较**，并在`props`未改变时**复用**组件。若要自定义对比过程，可以传入第二个函数

```js
function Foo() {}
export default React.memo(Foo, function (prevProps, nextProps) {
  // 返回true表示不更新，返回false表示要更新
});
```

- 若函数组件中使用了`useState`、`useEffect`、`useContext`等 Hook，`state`和`context`改变时仍会触发更新

## 虚拟 DOM

### 渲染流程

- 数据 + JSX 模板生成虚拟 DOM

  > 虚拟 DOM 是一个 JS 对象

- 用虚拟 DOM 生成真实 DOM

- 当数据（state 或 props）发生变化时：

  - 数据 + 模板生成新的虚拟 DOM
  - 和原来的虚拟 DOM 进行比对，找出区别
  - 操作 DOM 更新相应内容

### Diff 算法

> 比对原来的虚拟 DOM 和新生成的虚拟 DOM 的区别

- 是对同层的 DOM 节点的比对
  - 若同层的节点不同，则直接替换其之下的所有节点
  - 若相同，则再比较下层的节点

## ref

> 用于获取某个节点元素

### 适用的情况

- 触发强制动画
- 管理焦点
- 文本选择
- 非受控表单（如文件上传）

### ref 赋值的三种方式

- 使用字符串，把 DOM 或组件实例绑定到`this.$refs`的同名属性

```javascript
export default class Index extends React.Component {
  componentDidMount() {
    console.log(this.refs.currentDom);
  }
  render = () => (
    <div>
      <div ref="currentDom">字符串模式获取元素或组件</div>
    </div>
  );
}
```

- 使用函数

```html
<div ref={(node) => myRef.current = node } ></div>
```

- 使用 ref 对象

```html
function Item(){ const myRef = useRef() return
<div ref="{myRef}">MyRef</div>
}
```

### 跨层级转发

在 ref 引用的组件中，将 ref 转发到子级组件或 DOM 元素上：

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

### 合并转发

在转发 ref 时，可以通过赋值的方式将多个 ref 合并到一个对象中

```javascript
function Demo(props, ref) {
  const ref1 = useRef();
  const ref2 = useRef();
  useEffect(() => {
    ref.current = {
      ref1,
      ref2
    };
  }, []);
  return (
    <div>
      <input ref={ref1} />
      <input ref={ref2} />
    </div>
  );
}
```

### 执行时机和处理逻辑

对于 ref 的处理都是在更新的`commit`阶段（实际修改 DOM 的阶段）完成的。

对于 ref 会进行两次处理，分别是 DOM 更新前后进行的，也就是说绑定函数的形式，页面更新一次，会执行两次

- 第一次将原来的 ref 置为 null

> 卸载时处理也是如此

- 第二次是 DOM 更新完之后，为 ref 重新赋值

## Portals

> 提供一种将子组件渲染到父组件 DOM 树之外（任意 DOM 节点）的方案

```js
const ele = <div>element</div>;
class Foo {
  render() {
    return React.createPortal(ele, document.getElementById("ele"));
  }
}
```

使用 Portal 返回的节点虽然**不在父组件的 DOM 树中**，但其仍**存在于 React 树中**。

因此如`context`、`事件冒泡`等特性都是可以使用的。

对于 DOM 结构：

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

挂载于`app-root`的根组件中，可以捕获到`modal-root`中的事件

## 事件处理

- 采用驼峰命名

- 在 JSX 中传入一个函数而不是字符串。`onClick={functionName}`

- React 的事件处理只在`事件冒泡阶段`

- 回调函数接收一个合成事件 e 作为参数

  - 要阻止默认事件，不能用`return false`的方法。要用`e.preventDefault`

- 在类组件中，回调函数要绑定 this

  - 在 constructor 中用 bind 方法绑定 this 指向

  - ```js
    handleClick = () => {};
    ```

- 向回调函数传递参数：

  - ```
      onClick = {(e) => this.func(arg,e)}	// 需要手动传入事件参数e
    ```

  - ```
      onClick = {this.func.bind(this,arg)} // e自动传入，作为最后一个参数
    ```

## Context

### 1. 目的

在一个组件树中共享全局数据（如主题、颜色等变量），避免在组件之间层层传递 props

### 2. 使用流程

#### 创建 Context 对象

```js
const MyContext = React.createContext(defaultValue);
```

只有当 provider 没有提供值时，defaultValue 才起作用

#### 使用 Context 的 Provider 组件

```jsx
<MyContext.Provider value={/*某个自定义的值*/}>
  {/* 在内部的组件中即可使用MyContext传递来的值 */}
  <Title />
</MyContext.Provider>
```

- Provider 接收 value 属性，传递给内部所有组件
- 组件只接收到最近一层的 value。即外层的值会被覆盖
- 当 Provider 的 value 变化时，内部所有使用到 Context 的组件都要重新渲染，并且不受制于`shouldComponentUpdate`

#### 使用 contextType 读取一个 Context（类组件）

```javascript
class Title extends React.Component {
  static contextType = MyContext;
  render() {
    return <H1>{this.context}</H1>;
  }
}

// 等价于
class Title extends React.Component {
  render() {
    return <H1>{this.context}</H1>;
  }
}
Title.contextType = MyContext;
```

- 在类组件中，将`Context对象`赋值给类的`contextType`后，可以通过`this.context`取得`Context对象`的值

- 若要对 context 进行修改，则用 context 传递一个对象，在其中包括要传递的值以及改变它的函数

#### 创建 Consumer 组件读取多个 Context

```javascript
import { createContext } from "react";
const ThemeContext = createContext("light");
const ColorContext = createContext("white");
export default { ThemeContext, ColorContext };
```

```javascript
import React, { createContext } from "react";
import { ThemeContext, ColorContext } from "./context.js";
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider>
        <ColorContext.Provider>
          <Child />
        </ColorContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
```

```javascript
import { ThemeContext, ColorContext } from "./context.js";
class Child extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <ColorContext.Consumer>
            color => (
            <div>
              theme is: {theme}
              color is: {color}
            </div>
            )
          </ColorContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}
```

#### 函数组件使用 context

```javascript
const A = memo(() => {
  const { time } = useContext(context);
  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
});
```

#### 三种使用 context 方法的区别

- A 组件中使用 Consumer 组件消费 context 时，当 context 内容改变，不会导致 A 组件重新渲染
- 其他两种方式，A 组件会重新渲染

## Hooks

**定义**：用于在函数组件中钩入`state`和`生命周期`的**_函数_**

**调用规则：**

- 只能在函数最外层调用，不能在循环语句、条件判断、子函数中使用
- 只能在**函数组件**和**自定义 Hook**中调用
- 需要从 react 中引入

### useState

**目的**：在函数组件中使用`state`

**用法**：

```js
const [value, setValue] = useState("defaultValue");
```

- `useState`返回一个数组，两个元素分别是状态值（`state`），和改变这个状态的函数（`setState`）
  - 此处的 state**不一定**是一个对象，可以是任意类型的
  - 返回的更新函数不会将新旧值合并，而是**直接替代**
- `useState`接收一个参数，作为状态的默认值
- **惰性初始化**：该参数也可以是一个函数，返回默认值。该函数只会在初次加载时执行
- 同一组件内，可以多次调用`useState`

### 副作用

#### useEffect

**目的**：

- 执行副作用操作，可以作为 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 三个函数的组合。
- 实现关注点分离。将不相关的行为拆分到不同的 useEffect 中，而不是杂糅到同一个声明周期钩子里

**用法：**

```js
useEffect(() => {
  // 执行异步操作
  return () => {}; // 返回清除函数
}, []);
```

- 第一个参数是**函数**（effect），初次渲染（`componentDidMount`）以及更新（`componentDidUpdate` ）时执行。
- 第二个参数是一个**数组**。默认情况下每次渲染 effect 都会调用。传入第二个数组后，若数组中所有元素在渲染前后都相等（===），则会跳过此次 effect 的执行。**传入空数组，即只执行一次**
- 返回一个函数（可选），会在**组件卸载时**（`componentWillUnmount`）执行。
- **执行时机**：DOM 更新完成，**浏览器渲染之后**
- 和生命周期函数的区别：**异步执行**，不会阻塞浏览器绘制

#### useLayoutEffect

> 需要在副作用中修改 DOM，就用 `useLayoutEffect` ，否则用`useEffect`

用法和 useEffect 相同。

区别在于：

- 会同步执行（会造成阻塞）
- **执行时机**：DOM 更新完成，**浏览器渲染之前**

#### useInsertionEffect

执行时机：DOM 更新之前。

使用场景：仅建议`css in JS`库的开发中使用，解决注入样式的性能问题。

`css in JS`库的原理是动态生成选择器，并通过 style 标签插入。如果在 `useLayoutEffect` 或`useEffect`中进行操作，DOM 已经更新完毕，插入 style 会造成重绘和重排

### useContext

**目的：**在函数组件中读取`Context对象`的值

**用法：**

```js
const value = useContext(MyContext);

// 相当于类组件中的
static contextType = MyContext
```

- 接收的是**Context 对象本身**
- 返回的是**Context 对象的当前值**
- 当`MyContext.Provider`提供的值更新时，该 hook 会触发重新渲染（即使父组件通过`shouldComponentUpdate`跳过了更新）

### useReducer

**目的：**

- `useReducer`是用来以类似 redux 的逻辑（数据作为 state，改变数据通过 reducer）处理组件内的复杂`state`
- `useReducer`并**不负责组件间共享**，可以配合`useContext`使用实现共享

**用法：**

```js
const defaultState = {
  value: "",
  list: []
};
function reducer(state, action) {
  if (action.type == "change") {
    const newState = JSON.parse(JSON.stringify(state));
    // ...和redux一样，复制一份state并做修改，最后返回
    return newState;
  }
}
function initFunction(val) {
  return {
    value: val,
    list: []
  };
}
function App() {
  // 使用state中的数据，使用dispatch提交更改
  const [state, dispatch] = useReducer(reducer, defaultState);

  // 惰性初始化
  const [state, dispatch] = useReducer(reducer, defaultState, initFunction);
}
```

- `useReducer`接收三个参数

  - `reducer`函数
  - `state`默认值
  - 惰性初始化函数：将 state 初始化的逻辑抽离为一个函数，会接受第二个参数作为函数的参数，并返回 state 的默认值

- 若需要在其他组件中触发变更，则将`dispatch`函数通过`props`或`Context`传递给子组件

### 持久化

#### useCallback

**目的：**返回一个`memoized函数`

> 即依赖的数据不变时，函数（的引用）不变

**用法：**

```js
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

- 第一个参数是需要记忆的函数
- 第二个参数是数组，应列出函数所依赖的所有变量，这些变量**不会传递给函数作为参数**
- 若没有提供依赖数组，则每次都重新计算

#### useMemo

**目的：**返回一个`memoized值`

> 依赖的数据不变，不会重新进行计算，值也不变

**用法：**

```js
const memoValue = useMemo(() => {
  // do something...
  return "";
}, [a, b]);
```

- 两个参数的含义和`useCallback`一样
- 若没有提供依赖数组，则每次都重新计算

### Ref

#### useRef

**目的：**

- 返回一个可变的 ref 对象，其 current 属性用于存储变量（可以是对于 DOM 的引用，或其他任何值）

**用法：**

```js
function Test() {
  const [renderIndex, setRenderIndex] = useState(1);
  const ref1 = createRef();
  const ref2 = useRef();
  console.log(ref1.current, ref2.current); // null <h2>xxx</h2>
  return (
    <div className="App">
      <h1 ref={ref1}>{renderIndex}</h1>
      <h2 ref={ref2}>{renderIndex}</h2>
      <button onClick={() => setRenderIndex((prev) => prev + 1)}>
        Cause re-render
      </button>
    </div>
  );
}
```

和`createRef`的区别：

- 存储 DOM 节点并在回调中引用时，和`createRef`基本一致（除了在函数顶层直接使用）

  - `createRef`每次都会重新执行并赋值
  - 而`useRef`返回的始终是同一个引用

- 可以用于存储**与渲染无关但后续会改变的值**，因为`useRef`返回的变量改变后，**不会触发**重新渲染

  - 由于**`createRef`每次都返回新的引用**，所以无法保存原来的状态。所以点击按钮后，h1 标签中仍未空
  - `useRef`每次返回同一个引用，点击按钮对其赋值后，h2 标签中的内容会改变

  ```js
  function Test() {
    const createRefValue = React.createRef();
    const useRefValue = useRef();
    const [, setDummyState] = useState();
    return (
      <div>
        <h1>{createRefValue.current}</h1>
        <h2>{useRefValue.current}</h2>
        <button
          onClick={() => {
            createRefValue.current = 123;
            useRefValue.current = 123;
            setDummyState({});
          }}
        >
          Set Value
        </button>
      </div>
    );
  }
  ```

- 可以用于在更新时保存上一次的状态：

  ```js
  function Foo() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef(count);
    useEffect(() => {
      prevCountRef.current = count;
    });
    return (
      <div>
        <h1>
          Now: {count}, before: {prevCountRef.current}
        </h1>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    );
  }

  // 或是抽取为一个自定义Hooks
  function usePre(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  // 使用：
  const [count, setCount] = useState(0);
  const prevCountRef = usePre(count);
  ```

#### useImperativeHandle

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

## 自定义 Hooks

> 将组件逻辑提取到可复用的函数中

- 定义一个函数（**必须以 useXxx 形式命名**）
- 在函数内调用其他 Hooks 函数
- 可以在自定义 Hooks 中接收任意参数，返回任意值

```js
function usePre(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

## 样式处理

### 需要处理的问题

CSS 没有全局作用域，会带来**全局污染**、**命名冲突**的问题

### 解决思路

1. `CSS in JS`： 如`styled-components`
2. `CSS Module`

### CSS Module

> **_CSS Module 仅处理类选择器_**

在最新版的`create-react-app`创建的项目中，已经自带了对于`CSS Module`的支持

#### 局部样式

1. 对于局部样式，命名时使用`xxx.module.css`的格式
2. 在引入样式时，引入一个对象的形式，并用它的属性进行赋值

```js
import style from "./index.module.css";

<div className={style.title}></div>;
```

#### 全局样式

- 使用传统的命名方法并直接引入
- 在`xxx.module.css`中，使用`:global()`语法

```css
:global(.title) {
  color: redl;
}
```
