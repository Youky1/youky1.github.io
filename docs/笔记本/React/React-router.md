---
category: 前端
tag:
  - react
  - react-router
---

# 一、基本使用

1. 首先安装依赖

```
npm i react-router-dom
```

2. 引入实现路由所需的组件，以及页面组件

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Foo from "./Foo";
import Bar from "./Bar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/foo" element={<Foo />} />
        <Route path="/bar" element={<Bar />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- `path`：路径
- `element`：要渲染的组件

**注意**：`BrowserRouter`组件最好放在最顶层所有组件之外，这样能确保内部组件使用 Link 做路由跳转时不出错

# 二、路由跳转

在跳转路由时，如果路径是`/`开头的则是绝对路由，否则为**相对路由**，即**相对于当前 URL**进行改变

## 2.1 Link 组件

`Link组件`只能在`Router`内部使用，因此使用到`Link组件`的组件一定要放在顶层的 Router 之内

```js
import { Link } from "react-router-dom";

<Link to="foo">to foo</Link>;
```

## 2.2 NavLink 组件

- `NavLink组件`和`Link组件`的功能是一致的，区别在于可以判断其`to属性`是否是当前匹配到的路由
- `NavLink组件`的`style`或`className`可以接收一个函数，函数接收一个含有`isActive`字段的对象为参数，可根据该参数调整样式

```js
import { NavLink } from "react-router-dom";

function Foo() {
  return (
    <NavLink style={({ isActive }) => ({ color: isActive ? "red" : "#fff" })}>
      Click here
    </NavLink>
  );
}
```

## 2.3 编程式跳转

使用`useNavigate`钩子函数生成`navigate函数`，可以通过 JS 代码完成路由跳转

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

- 可以直接传入要跳转的目标路由（可以使用相对路径，语法和 JS 相同）
- 传入`-1`表示后退



# 四、动态路由参数

## 4.1 路径参数

- 在`Route组件`中的`path属性`中定义路径参数
- 在组件内通过`useParams` hook 访问路径参数

```js
<BrowserRouter>
  <Routes>
    <Route path="/foo/:id" element={<Foo/>} />
  </Routes>
</BrowserRouter>;

import { useParams } from "react-router-dom";
export default function Foo() {
  const params = useParams();
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
}
```



### 路径匹配规则

当URL同时匹配到含有路径参数的路径和无参数路径时，有限匹配没有参数的”具体的“（specific）路径。

```react
<Route path="teams/:teamId" element={<Team />} />
<Route path="teams/new" element={<NewTeamForm />} />
```

如上的两个路径，将会匹配 `teams/new` 。

路径的正则匹配已被移除。



### 兼容类组件

在以前版本中，组件的`props`会包含一个`match对象`，在其中可以取到路径参数。

但在最新的 6.x 版本中，无法从 props 获取参数。

并且，针对类组件的 `withRouter` 高阶组件已被移除。因此对于类组件来说，使用参数有两种兼容方法：

1. 将类组件改写为函数组件
2. 自己写一个 HOC 来包裹类组件，用 `useParams` 获取参数后通过 props 传入原本的类组件



## 4.2 search 参数

- 查询参数不需要在路由中定义
- 使用 `useSearchParams` hook 来访问和修改查询参数。其用法和 `useState` 类似，会返回当前对象和更改它的方法
- 使用 `setSearchParams` 时，**必须传入所有的查询参数**，否则会覆盖已有参数

```js
import { useSearchParams } from "react-router-dom";

// 当前路径为 /foo?id=12
function Foo() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("id")); // 12
  setSearchParams({
    name: "foo",
  }); // /foo?name=foo
  return <div>foo</div>;
}
```



# 五、嵌套路由

## 5.1 路由定义

通过嵌套的书写`Route组件`实现对嵌套路由的定义。

> `path` 开头为 `/` 的为绝对路径，反之为相对路径。

```jsx
<Routes>
  <Route path="/" element={<Home />}></Route>
  <Route path="/father" element={<Father />}>
    <Route path="child" element={<Child />}></Route>
    <Route path=":name" element={<Another />}></Route>
  </Route>
</Routes>
```

## 5.2 在父组件中展示

在父组件中使用`Outlet`**来显示匹配到的子组件**

```js
import { Outlet } from "react-router-dom";
function Father() {
  return (
    <div>
      // ... 自己组件的内容 // 留给子组件Child的出口
      <Outlet />
    </div>
  );
}
```

## 5.3 在组件中定义

可以在任何组件中使用 `Routes` 组件，且组件内的Routes中，路径默认带上当前组件的路径作为前缀。

注意：此时定义父组件的路由时，要在后面加上 `/*` ，否则父组件将无法渲染。

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="dashboard/*" element={<Dashboard />} />
</Routes>
function Dashboard() {
  return (
    <div>
      <p>Look, more routes!</p>
      <Routes>
        <Route path="/" element={<DashboardGraphs />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}
```



# 六、默认路由

**定义：**在嵌套路由中，如果 URL 仅匹配了父级 URL，则`Outlet`中会显示带有`index`属性的子路由。可以使用在路由的任何层级

```jsx
<Routes>
  <Route path="/foo" element={Foo}>
    <Route index element={Default}></Route>
    <Route path="bar" element={Bar}></Route>
  </Route>
</Routes>
```

- 当 url 为`/foo`时：Foo 中的 Outlet 会显示 Default 组件
- 当 url 为`/foo/bar`时：Foo 中的 Outlet 会显示为 Bar 组件



# 七、全匹配路由

**定义：** `path`属性取值为`*`时，可以匹配任何（非空）路径，该匹配拥有**最低的优先级**。可以用于设置 404 页面。

```jsx
<Routes>
  <Route path="/foo" element={Foo}>
    <Route path="bar" element={Bar}></Route>
    <Route path="*" element={NotFound}></Route>
  </Route>
</Routes>
```



# 八、多组路由

通常，一个应用中只有一个`Routes`组件。

但根据实际需要也可以定义多个路由出口（如：侧边栏和主页面都要随 URL 而变化）

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



# 九、路由重定向

当在某个路径`/a`下，要重定向到路径`/b`时，可以通过`Navigate`组件进行重定向到其他路径

> 等价于以前版本中的`Redirect`组件

```js
import { Navigate } from "react-router-dom";
function A() {
  return <Navigate to="/b" />;
}
```



# 十、布局路由

当多个路由有共同的父级组件时，可以将父组件提取为一个没有 `path` 和 `index` 属性的Route组件（Layout Route）

```jsx
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
```

这种写法等价于：

```jsx
<Route
  path="/privacy"
  element={
    <PageLayout>
      <Privacy />
    </PageLayout>
  }
/>
<Route
  path="/tos"
  element={
    <PageLayout>
      <Tos />
    </PageLayout>
  }
/>
```





# 十一、订阅和操作 history stack的原理

浏览器会记录导航堆栈，以实现浏览器中的前进后退功能。在传统的前端项目中，URL的改变意味着向服务器重新请求数据。

在现在的客户端路由（ client side routing ）中，可以做到编程控制URL改变后的反应。如在点击a标签的回调函数中使用 `event.preventDefault()` 阻止默认事件，此时URL的改变不会带来任何UI上的更新。

```html
<a
  href="/contact"
  onClick={(event) => {
    // stop the browser from changing the URL and requesting the new document
    event.preventDefault();
    // push an entry into the browser history stack and change the URL
    window.history.pushState({}, undefined, "/contact");
  }}
/>
```

## 11.1 History对象

浏览器没有直接提供监听URL改变（push、pop、replace）的接口，因此 `react-router` 对原生的 `history` 对线进行了包装，提供了监听URL改变的API。

```js
let history = createBrowserHistory();
history.listen(({ location, action }) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
});
```

使用 `react-router` 时不需操作History对象（`Routes` 组件会进行操作）

## 11.2 Location对象

 `react-router` 对 `window.location` 进行包装后，提供了一个形式简洁的Location对象，形如：

```js
{
  pathname: "/bbq/pig-pickins",		// 主机名之后的URL地址
  search: "?campaign=instagram",	// 查询参数
  hash: "#menu",					// 哈希值，用于确定页面滚动的具体位置
  state: null,						// 对于 window.history.state 的包装
  key: "aefz24ie"					// 
}
```

### state

不显示在页面上，不会引起刷新，只由开发人员操作。

可用于记录用户的跳转详情（从哪跳到当前页面）或在跳转时携带信息。

可以用在 `Link` 组件或 `navigate` 方法中

```html
<Link to="/pins/123" state={{ fromDashboard: true }} />
```

```js
let navigate = useNavigate();
navigate("/users/123", { state: partialUser });
```

在目标的组件中，可以用 `useLocation` 方法获取该对象

```js
let location = useLocation();
console.log(location.state);
```

> state中的信息会进行序列化，因此如日期对象等信息会变为string

### key

每个Location对象拥有一个唯一的key，可以据此来实现基于Location的滚动管理，或是数据缓存。

如：将 `location.key` 和 URL 作为键，每次请求数据前，先查找缓存是否存在来判断是否实际发送请求，来实现客户端数据缓存。



# 十二、 各类Router组件详解

## 12.1 HashRouter和BrowserRouter的区别

- `HashRouter` 只会修改URL中的哈希值部分；而 `BrowserRouter` 修改的是URL本身
- `HashRouter` 是**纯前端**路由，可以通过输入URL直接访问；使用时 `BrowserRouter` 直接输入URL会显示404，除非配置Nginx将请求指向对应的HTML文件。初次进入 `/` 路径时或点击 `Link` 组件跳转时不会发送请求

## 12.2 unstable_HistoryRouter

使用 ` unstable_HistoryRouter  ` 需要传入一个 `history` 库的实例，这将允许在非react作用于下操作history对象。

> 由于项目使用的history和react-router中使用的history版本可能不一样，该API目前标为unstable状态



## 12.3  MemoryRouter

`HashRouter` 和 `BrowserRouter` 都是依据外部对象（history）进行导航，而 `MemoryRouter` 则是自己存储和管理状态堆栈，多用于测试场景。



## 12.4  NativeRouter 

推荐的用于 React Native的Router组件



## 12.5  StaticRouter  

在nodejs端使用，渲染react应用。

```js
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import http from "http";

function requestHandler(req, res) {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      {/* The rest of your app goes here */}
    </StaticRouter>
  );

  res.write(html);
  res.end();
}

http.createServer(requestHandler).listen(3000);
```



# 十三、使用JS对象定义路由：useRoutes

使用 `useRoutes` hook，可以使用一个JS对象而不是Routes组件与Route组件来定义路由。其功能类似于[react-router-config](https://www.npmjs.com/package/react-router-config)

 `useRoutes` 的返回是 React Element，或是 null。

对于传入的配置对象， 其类型定义如下：

```typescript
interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    element?: React.ReactNode;
    index?: boolean;
    path?: string;
}
```

