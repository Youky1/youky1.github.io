# SSR原理与实践

## 背景

### 前端渲染方式的发展历程

| 阶段       | 实现方式                                                     |
| ---------- | ------------------------------------------------------------ |
| 1. 早期SSR | 基于模板引擎（PHP、JSP）生成静态HTML页面                     |
| 2. CSR     | 基于SPA框架，在客户端进行动态渲染                            |
| 3. 同构SSR | 基于同一套代码在服务端和客户端都能执行的特点实现。**首次进入页面为SSR，后续交互为SPA的体验** |

### 各阶段的优缺点对比

|              |     早期SSR      | CSR（SPA） | 同构 SSR |
| ------------ | :--------------: | :--------: | :------: |
| 首屏速度     |        好        |     差     |    好    |
| SEO          |        好        |     差     |    好    |
| 页面跳转体验 | 差，跳转需要刷新 |     好     |    好    |
| 服务器压力   |        高        |     低     |    高    |

![渲染过程对比](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd0b2ba631fb35~tplv-t2oaga2asx-jj-mark:2268:0:0:0:q75.awebp)

### 为什么需要同构 SSR

- **加快首屏加载速度**。首页为直接返回的完整HTML，能更快看到内容
- **优化SEO**。SSR 生成的 HTML 页面可以被搜索引擎爬虫直接解析 
- **更好的渐进增强体验：**。 用户在加载页面时首先会看到服务器端渲染的内容，然后再下载并激活客户端JS代码



## 同构应用的实现原理

#### 如何让React代码在双端运行

React的虚拟Dom为跨端提供了可能性，虚拟Dom是一个JS对象，不依赖浏览器，Node端可以通过 `react-dom/server` 提供了相应的API将虚拟Dom转换成HTML字符串

```js
import App from './App.jsx';
import { renderToString} from 'react-dom/server';

const appHtml = renderToString(<App />);

export default  (ctx,next)=>{

    const html = renderToString(<Index/>);
    ctx.body=`<!DOCTYPE html>
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
}
```

在前端，使用 `hydrateRoot` API完成水合，进行JS加载和执行、绑定事件监听、绑定客户端路由等：

```jsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';

const root = hydrateRoot(document.getElementById('root'), <App />)
```



### 路由同构

`react-router-dom` 提供了服务端API  `StaticRouter`  ，它不依赖浏览器的API，而是通过传入的location属性判断当前的路由，选取当前要展示的页面。

前端使用 `BrowserRouter` 或 `HashRouter`  ，内部的路由配置和 `StaticRouter` 是一致的。

后端：

```js
export default  (ctx,next)=>{
    console.log('ctx.request.path', ctx.request.path);
    const path = ctx.request.path;
    const html = renderToString(<StaticRouter location={path}><App routeList={routeList}></App></StaticRouter>);

    ctx.body=`<!DOCTYPE html>
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
}
```

前端：

```js
ReactDom.hydrate(<BrowserRouter>
    <App routeList={routeList} /></BrowserRouter>
, document.getElementById('root'))
```

App组件内，通过

**路由工作原理**：

- 浏览器中初次访问页面时，`StaticRouter`  根据路径，选取对应的页面组件，直出HTML
- 后续路径切换，浏览器端控制，不会再向服务端发送请求（避免了早期SSR切换页面需要请求服务端带来的体验问题）



### 数据同构

