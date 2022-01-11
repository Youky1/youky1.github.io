# Redux的组成部分

1. `store`：全局唯一的数据源

2. `action`：改变store的唯一方法是触发action
3. `reducer`：描述action是如何改变store的
4. 使用store的组件



# 三大原则

- store是唯一的
- 只有store能改变自己的内容
- reducer必须是纯函数



# Store

## 创建store

创建store，要使用`createStore`方法，并用reducer作为参数：

```js
// 引入createStore方法
import { createStore } from 'redux';
// 引入reducer
import reducer from './reducer'
// 创建store并导出
const store = createStore(reducer);
export default store;
```



## 使用中间件

中间件是位于`Action`和`Store`之间的，是对于`dispatch`方法的包装。

如果使用中间件，则需要使用`applyMiddleware`包装，并作为`createStore`的第二个参数传入：

```js
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
const store = createStore(
    reducer,
    applyMiddleware([thunk /*, ...other*/])
);
export default store;
```



### Redux-thunk

因为reducer必须是纯函数，所以不能进行异步请求。此时需要在创建`action`前（如生命周期函数、回调函数中）进行请求，再将请求结果作为action的字段传入

使用`redux-thunk`后，此时传入`dispatch`的action不再只能是对象，还可以是函数。

```js

const action = (dispatch, getState) => {
    // 异步请求...
    // 使用请求结果触发实际改变state的action
    dispatch({})
}
```

- `dispatch`：Redux的dispatch方法，用于提交其他action
- `getState`：Redux的getState方法，用于获取state数据



### Redux-saga

> 用于管理代码副作用（如异步请求等）的库。

作用：使用`redux-saga`后，`dispatch`派发的action不仅在`reducer`中接收到，**saga函数**中也会对相应的事件作出响应

1. 首先创建并导出**sagas函数**，它是一个generator函数
2. 使用`takeEvery`函数对不同的action作出相应，它接收两个参数，`action.type`和**处理函数**
3. **处理函数**也可以是generator函数。在其中进行异步数据的请求，并利用数据创建实际改变state的action
4. 使用`yield put`触发action

```js
import { takeEvery, put } from 'redux-saga/effects';

function* myFunc(){
    const res = yield someRequest();
    const action = {
        type:'another_type',
        res
    }
    yield put(action)
}

function* mySaga(){
    yield takeEvery('my_type',myFunc )
}
export default mySaga
```

5. 使用`createSagaMiddleware`创建saga中间件

```js
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware()
```

6. 引入saga函数，并调用saga中间件的run方法执行

```js
import todoSagas from "./sagas"; // 自定义的saga函数
sagaMiddleware.run(todoSagas);
```

7. 使用`applyMiddleware`添加

```js
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)
export default store;
```



### 调试工具（redux-devtools）

```js
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware([/*...*/])
    )
);
```



## 引入store

在组件中引入store：

- 要获取store中的数据，使用`getState`方法。
- 要订阅store中数据的更新，使用`subscribe`方法。

```js
import React, {Component} from 'react';
import store from './store';

class Foo extends Component{
    constructor(props){
        super(props);
        // 获取store中的数据
        this.state = store.getState();
        // 订阅更新
        store.subscribe(this.handleUpdate);
    }
    // 每次更新时触发回调
    handleUpdate = () => {
        this.setState(store.getState());
    }
}
```



# Reducer

> 返回state

- reducer是一个**纯函数**，接收state和action作为参数，并返回**新的state**。
    - 不能进行ajax请求，路由跳转
    - 不能直接修改state
    - 必须返回state

- reducer中可以通过默认参数的形式定义store中数据的默认值

```js
// store中数据的默认值
const defaultState = {
    value: 'default'
}
const reducer = (state = defaultState, action) = >{
    const newState = JSON.parse(JSON.stringify(state))
    // ... 根据action对newState做修改，并返回
    return newState;
}
export default reducer
```



## Reducer的拆分

当reducer的内容较多时，可以将其拆分到不同的文件之中，再在根文件中依次引入，并使用`combineReducer`进行聚合

```js
import { combineReducer } from 'redux';
import fooReducer from './foo.js';
import barReducer from './bar.js';

export default combineReducer({
    foo: fooReducer,
    bar: barReducer
})
```

最终store中的数据，也会多加一个层级，即：

```
state.xx --> state.foo.xx
```



## Immutable

目的：将数据变为不可改变的，防止意外的在reducer中修改state

- 使用`fromJS`方法将JS数据变为immutable（不可改变的）对象，此后数据不能进行直接读取或修改，必须通过`get`和`set`方法
- `fromJS`方法进行转换后，对象的引用类型变量也会变为`immutable对象`。此时要用`set`方法做修改时，用于修改的引用型变量也要先转为`immutable对象`
	
	> set方法不会修改原始的数据，而是结合修改返回一个新的对象

```js
import { fromJS } from "immutable";
const defaultState = fromJS({
    inputValue: 'default',
    list: [],
})
function reducer(state = defaultState, action) {
    const vlaue = state.get('inputValue');
    return state.set('list', fromJS([1,2,3]));
}
```

- 改变多个内容，使用`merge`方法

```js
state.merge({
    inputValue: 'newValue',
    list: fromJS([1,2,3])
})
```

- `toJS`方法：将`immutable对象`转换为普通JS对象



## React-immutable

> 将根state也变为immutable对象

```js
import { combineReducers } from "redux-immutable";
const reducer = combineReducers({
	// ...
})
```





# Action

用来描述store变化，通过`dispatch`方法触发。action内必须用一个`type`字段描述变化的类型，除此之外的结构完全自定义。

```js
store.dispatch({
    type: 'foo',
    value: 'bar'
})
```



# React-redux

## 使用connect()

1. 在全局跟组件App外，使用`react-redux`提供的`Provider`组件进行包裹。
2. 引入store，并作为prop传入`Provider`

```js
import { Provider } from 'react-redux';
import store from './store'
const App = (
	<Provider store={store}>
    	<Com>
    </Provider>
)
```

3. 在使用到store的组件中，引入`connect`方法，将store关联到组件的props并导出

```js
import React, {Component} from 'react'
import { connect } from 'react-redux'

class TodoList extends Component{
    render(){
        return <input value={this.props.value} onChange={this.props.handleChange}/>
    }
}
const mapStateToProps = (state) => {
    return {
        value: state.inputValue
    }
}
const mapDispatchToProps = (dispatch) => ({
    handleChange(e){
        console.log(e.target.value);
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
```

`connect`方法接收两个参数，分别将state和dispatch关联到组件的props。

在这之后，组件内使用`state`的值，以及触发`action`，就都可以从`props`中取值。



## 使用Hooks

> 可以替代`connect` API

使用时，仍然是首先使用Provider组件进行包裹，并传入store



### useSelector()

> 用于从store获取数据，等价于connect方法的第一个参数

```js
const result = useSelector(
    selector: Function,
    equalityFn?:Function
)
const selector = state => {
    // return ...
}
```



#### 和connect的mapState参数的异同

**相同点：**第一个参数都应该是纯函数

**不同：**

- `selector`可以返回任何值，不只是`Object`。其返回值会作为`useSelector`的返回值
- 当派发了action后，会比较selector前后的返回值。如果不同，则强制组件重新渲染，否则组件不会重新渲染。
- `selector`不接收ownProps作为第二个参数。
- 缺省equalityFn函数时使用`===`进行比较，connect中使用浅比较。
- 在一个组件内可以多次调用`useSelector`。（action被触发时只会进行一次重渲染）



当selector返回对象时，每次都触发重渲染。解决方法：

- 多次调用useSelector，每次返回基本类型的值
- 使用equalityFn进行比较（react-redux提供了`shallowEqual`进行浅比较）
- 创建immutable类型的对象



### useDispatch()

> 返回Redux的dispatch函数的引用，可以用来派发action

```js
const dispatch = useDispatch();
dispatch({
    type:'action_type'
})
```



只要传给`<Provider/>`组件的`store`不发生变化，`useDispatch`返回的dispatch引用就不会发生变化。



### useStore()

> 返回store实例

```js
const store = useStore();
funcs.reduce(
    (a, b) => (...args) => a(b(...args))
)
```

