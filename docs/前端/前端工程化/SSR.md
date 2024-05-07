# SSR 原理与实践

## 背景

### 前端渲染方式的发展历程

| 阶段        | 实现方式                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------- |
| 1. 早期 SSR | 基于模板引擎（PHP、JSP）生成静态 HTML 页面                                                      |
| 2. CSR      | 基于 SPA 框架，在客户端进行动态渲染                                                             |
| 3. 同构 SSR | 基于同一套代码在服务端和客户端都能执行的特点实现。**首次进入页面为 SSR，后续交互为 SPA 的体验** |

### 各阶段的优缺点对比

|              |     早期 SSR     | CSR（SPA） | 同构 SSR |
| ------------ | :--------------: | :--------: | :------: |
| 首屏速度     |        好        |     差     |    好    |
| SEO          |        好        |     差     |    好    |
| 页面跳转体验 | 差，跳转需要刷新 |     好     |    好    |
| 服务器压力   |        高        |     低     |    高    |

![渲染过程对比](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd0b2ba631fb35~tplv-t2oaga2asx-jj-mark:2268:0:0:0:q75.awebp)

### 为什么需要同构 SSR

- **加快首屏加载速度**。首页为直接返回的完整 HTML，能更快看到内容
- **优化 SEO**。SSR 生成的 HTML 页面可以被搜索引擎爬虫直接解析
- **更好的渐进增强体验：**。 用户在加载页面时首先会看到服务器端渲染的内容，然后再下载并激活客户端 JS 代码

## 同构应用的实现原理

#### 如何让 React 代码在双端运行

React 的虚拟 Dom 为跨端提供了可能性，虚拟 Dom 是一个 JS 对象，不依赖浏览器，Node 端可以通过 `react-dom/server` 提供了相应的 API 将虚拟 Dom 转换成 HTML 字符串

```js
import App from "./App.jsx";
import { renderToString } from "react-dom/server";

const appHtml = renderToString(<App />);

export default (ctx, next) => {
  const html = renderToString(<Index />);
  ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>my react ssr</title>
</head>
<body>
    <div id="root">
       ${appHtml}
    </div>
</body>
</html>
<script type="text/javascript"  src="index.js"></script>//这里绑定了 index.js代码，浏览器会下载后执行
`;

  return next();
};
```

在前端，使用 `hydrateRoot` API 完成水合，进行 JS 加载和执行、绑定事件监听、绑定客户端路由等：

```jsx
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";

const root = hydrateRoot(document.getElementById("root"), <App />);
```

### 路由同构

**路由同构可以实现的原理**：

- react-router-dom 提供了服务端和浏览器端的 API：`StaticRouter`。其内部通过 Route 匹配路由，写法和浏览器端 API 相同
- 公共目录内定义路由配置，在服务端代码和客户端代码中引用同一份配置

**路由工作效果**：

- 浏览器中初次访问页面时，`StaticRouter` 根据路径，选取对应的页面组件，直出 HTML
- 后续路径切换，浏览器端控制，不会再向服务端发送请求（避免了早期 SSR 切换页面需要请求服务端带来的体验问题）

#### 路由定义

首先定义路由，前后端共用：

```js
// route.js
export default [
  {
    path: "/index",
    component: Index,
    exact: true,
  },
  {
    path: "/home",
    component: Home,
    exact: true,
  },
];
```

#### 后端部分

服务端使用 `StaticRouter` 。它不依赖浏览器，通过传入的 `location` 属性判断当前的路由，选取当前要展示的页面。

其内部仍通过 Route 组件进行路由匹配，和浏览器端的写法完全一致
  
```js
export default (ctx, next) => {
  console.log("ctx.request.path", ctx.request.path);
  const path = ctx.request.path;
  const otherData = {
    // ...
  };
  const html = renderToString(
    <StaticRouter location={path} context={otherData}>
      <App routeList={routeList}></App>
    </StaticRouter>
  );

  ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>my react ssr</title>
</head>
<body>
    <div id="root">${html}</div>
</body>
</html>
<script type="text/javascript"  src="/index.js"></script>
`;

  return next();
};
```

#### 前端部分

前端根据需要使用 `BrowserRouter` 或 `HashRouter` 。内部的路由配置和 `StaticRouter` 是一致的。

```js
ReactDom.hydrate(
  <BrowserRouter>
    <Switch>
      <App routeList={routeList}></App>
      {routeList.map((item) => {
        return <Route exact key={item.path} {...item}></Route>;
      })}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
```

### 数据同构
