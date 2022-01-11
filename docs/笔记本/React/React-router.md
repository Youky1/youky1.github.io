# 基本使用

1. 首先安装依赖

```
npm i react-router-dom
```

2. 引入实现路由所需的组件，以及页面组件

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Foo from './Foo';
import Bar from './Bar';
function App(){
    return (
    	<BrowserRouter>
        	<Routes>
        		<Route path='/foo' element={<Foo/>} />
				<Route path='/bar' element={<Bar/>} />
        	</Routes>
        </BrowserRouter>
    )
}
```

- `path`：路径
- `element`：要渲染的组件

**注意**：`BrowserRouter`组件最好放在最顶层所有组件之外，这样能确保内部组件使用Link做路由跳转时不出错



# 路由跳转

在跳转路由时，如果路径是`/`开头的则是绝对路由，否则为**相对路由**，即**相对于当前URL**进行改变



## Link组件

`Link组件`只能在`Router`内部使用，因此使用到`Link组件`的组件一定要放在顶层的Router之内

```js
import { Link } from 'react-router-dom';

<Link to='foo'>to foo</Link>
```



## NavLink组件

- `NavLink组件`和`Link组件`的功能是一致的，区别在于可以判断其`to属性`是否是当前匹配到的路由
- `NavLink组件`的`style`或`className`可以接收一个函数，函数接收一个`isActive参数`，可根据该参数调整样式

```js
import { NavLink } from 'react-router-dom';

function Foo(){
    return (
    	<NavLink
        	style={ ({isActive}) => ({color: isActive ? 'red' : '#fff'}) }
        >Click here</NavLink>
    )
}
```



## 编程式跳转

使用`useNavigate`钩子函数生成`navigate函数`，可以通过JS代码完成路由跳转

> `useNavigate`取代了原先版本中的`useHistory`

```js
import { useNavigate } from 'react-router-dom';

function Foo(){
    const navigate = useNavigate();
    return (
        // 上一个路径：/a； 	当前路径： /a/a1
    	<div onClick={() => navigate('/b')}>跳转到/b</div>
		<div onClick={() => navigate('a11')}>跳转到/a/a1/a11</div>
		<div onClick={() => navigate('../a2')}>跳转到/a/a2</div>
		<div onClick={() => navigate(-1)}>跳转到/a</div>
    )
}
```

- 可以直接传入要跳转的目标路由（可以使用相对路径，语法和JS相同）
- 传入`-1`表示后退



# 动态路由参数

## 路径参数

- 在`Route组件`中的`path属性`中定义路径参数
- 在组件内通过`useParams`  hook访问路径参数

```js
<BrowserRouter>
	<Routes>
		<Route path='/foo/:id' element={Foo} />
	</Routes>
</BrowserRouter>

import { useParams } from 'react-router-dom';
export default function Foo(){
    const params = useParams();
    return (
        <div>
            <h1>{params.id}</h1>
        </div>
    )
}
```



在以前版本中，组件的`props`会包含一个`match对象`，在其中可以取到路径参数。

但在最新的6.x版本中，无法从props获取参数。



并且，针对类组件的`withRouter`高阶组件已被移除。因此对于类组件来说，使用参数有两种兼容方法：

1. 将类组件改写为函数组件
2. 自己写一个HOC来包裹类组件，用useParams获取参数后通过props传入原本的类组件



## search参数

- 查询参数不需要在路由中定义
- 使用`useSearchParams` hook来访问查询参数。其用法和useState类似，会返回当前对象和更改它的方法
- 更改searchParams时，必须传入所有的查询参数，否则会覆盖已有参数

```js
import { useSearchParams } from 'react-router-dom';

// 当前路径为 /foo?id=12
function Foo(){
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('id')) // 12
    setSearchParams({
        name: 'foo'
    }) // /foo?name=foo
    return (
    	<div>foo</div>
    )
}
```





# 嵌套路由

- 通过嵌套的书写`Route组件`实现对嵌套路由的定义，嵌套的相对路径开头不用`/`

```jsx
<Routes>
  <Route path="/" element={<Home/>} ></Route>
  <Route path="/father" element={<Father/>} >
    <Route path='child' element={<Child/>}></Route>
  </Route>
</Routes>
```

- 在父组件中使用`Outlet`**来显示匹配到的子组件**

```js
import {Outlet} from 'react-router-dom';
function Father(){
    return (
    	<div>
        	// ... 自己组件的内容
        	// 留给子组件Child的出口
        	<Outlet />
        </div>
    )
}
```



# 默认路由

**定义：**在嵌套路由中，如果URL仅匹配了父级URL，则`Outlet`中会显示带有`index`属性的路由

```jsx
<Routes>
    <Route path='/foo' element={Foo}>
    	<Route index element={Default}></Route>
		<Route path='bar' element={Bar}></Route>
    </Route>
</Routes>
```

- 当url为`/foo`时：Foo中的Outlet会显示Default组件
- 当url为`/foo/bar`时：Foo中的Outlet会显示为Bar组件



# 全匹配路由

**定义：** `path`属性取值为`*`时，可以匹配任何（非空）路径，同时该匹配拥有最低的优先级。可以用于设置404页面。



```jsx
<Routes>
    <Route path='/foo' element={Foo}>
		<Route path='bar' element={Bar}></Route>
    	<Route path='*' element={NotFound}></Route>
    </Route>
</Routes>
```



# 多组路由

通常，一个应用中只有一个`Routes`组件。

但根据实际需要也可以定义多个路由出口（如侧边栏和主页面都要随URL而变化）

```jsx
<Router>
    <SideBar>
    	<Routes>
    		<Route></Route>
    	</Routes>
    </SideBar>
	<Main>
    	<Routes>
    		<Route></Route>
    	</Routes>
    </Main>
</Router>
```



# 重定向

当在某个路径`/a`下，要重定向到路径`/b`时，可以通过`Navigate`组件进行重定向到其他路径

> 等价于以前版本中的`Redirect`组件

```js
import { Navigate } from 'react-router-dom';
function A(){
    return (
    	<Navigate to='/b' />
    )
}
```



# 权限管理

> 指根据不同的权限，有权访问不同的页面

