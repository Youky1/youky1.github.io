# SSR 原理与实践

## 背景

### 前端渲染方式的发展历程

| 阶段        | 实现方式                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------- |
| 1. 早期 SSR | 基于模板引擎（PHP、JSP）生成静态 HTML 页面                                                      |
| 2. CSR      | 基于 SPA 框架，在客户端进行动态渲染                                                             |
| 3. 同构 SSR | 基于同一套代码在服务端和客户端都能执行的特点实现。**首次访问页面为 SSR，后续交互为 SPA 的体验** |

### 各阶段的优缺点对比

|              |     早期 SSR     | CSR（SPA） | 同构 SSR |
| ------------ | :--------------: | :--------: | :------: |
| 首屏速度     |        好        |     差     |    好    |
| SEO          |        好        |     差     |    好    |
| 页面跳转体验 | 差，跳转需要刷新 |     好     |    好    |
| 服务器压力   |        高        |     低     |    高    |

![渲染过程对比](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/23/16fd0b2ba631fb35~tplv-t2oaga2asx-jj-mark:2268:0:0:0:q75.awebp)

### 为什么需要同构 SSR

- **更快的首屏加载速度**。首页为直接返回的完整 HTML，能更快看到内容
- **更好的 SEO**。SSR 生成的 HTML 页面可以被搜索引擎爬虫直接解析
- **更好的渐进增强体验：**。 用户在加载页面时首先会看到服务器端渲染的内容，然后再下载并激活客户端 JS 代码

## 实现原理

### 将 React 组件转换为 HTML 字符串

React 的虚拟 Dom 为跨端提供了可能性，虚拟 Dom 是一个 JS 对象，不依赖浏览器，Node 端可以通过 `react-dom/server` 提供了相应的 API 将虚拟 Dom 转换成 HTML 字符串

```js
import App from "./App.jsx";
import { renderToString } from "react-dom/server";

export default (ctx, next) => {
  const html = renderToString(<App />);
  ctx.body = `<!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <title>my react ssr</title>
              </head>
              <body>
                  <div id="root">
                     ${html}
                  </div>
              </body>
              </html>
              <script type="text/javascript"  src="index.js"></script>//这里绑定了 index.js代码，浏览器会下载后执行`;
  return next();
};
```

前端代码中，使用 `hydrateRoot` 替代 `render`，进行水合。

1. 首先根据服务端渲染出的 DOM 树生成 Fiber 树
2. 开始初始渲染，这个过程会生成客户端的 Fiber 树
3. 进行双端对比，如果对比结果有差异则更新 DOM，使其与客户端渲染结果一致

```jsx
// index.js 文件
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";

const root = hydrateRoot(document.getElementById("root"), <App />);
```

双端对比的方式：

- React 16 之前：对每个节点生成 id，对比服务端和客户端计算出的 ID 值
- React 16 之后：对比双端生成的 Fiber 树

利用双端对比机制，如果 SSR 项目中某个页面不需要做 SSR，则可以在服务端渲染时返回一个最小 DOM 结构（如只有根节点），然后在双端对比后采用 CSR 的内容，这样可以减轻服务器的压力。

### 流式渲染

通过 `renderToPipeableStream` 可以将 React 组件树渲染为[Node.js 流](https://nodejs.org/api/stream.html)，实现流式传输。
流式传输不必等整个 Dom 树全部渲染完成，实现渐进式的传输。流式传输不需要等待 React 本身在浏览器中的加载，也不需要等待页面变为可交互。在任何 script 标签加载之前，服务端发送的 HTML 内容就会开始渐进式地显示。

在渲染过程中，常用的功能点如下

- **渐进式传输内容**：`onShellReady` 在 shell 内容渲染完成时触发，可以在此处使用 pipe 方法开始进行流式传输。

  > Shell 内容是指 `Suspense` 组件 之外的所有内容

  此时 Suspense 内容会用 template 标签作为占位符。当 Suspense 内容渲染完成时，会连同一个 JS 函数一起传输至浏览器。

  一旦开启传输 Shell 内容，就不能再更改状态码

- **完整传输内容**: `onAllReady` 在所有内容渲染完成时触发，在此处开启流式传输，所有的 HTML 都会被包含在流中直接返回，而不会有任何渐进的加载。可以用于**爬虫和 SSG （静态内容生成）**。
- **渲染兜底处理**：
  - Shell 内容渲染失败：此时默认不会返回任何内容，可以在 `onShellError` 中设置兜底内容
  - Suspense 内容渲染失败：
    - 服务端将会用 Suspense 的 fallback 内容
    - 客户端将会重试渲染这部分，如果加载成功，会替换 fallback 内容；如果仍然失败，则会抛出错误，由错误边界决定最终的渲染情况
- **异常处理**：打印日志，设置状态码等操作
  - onShellError 会在 Shell 内容渲染出错时触发
  - onError 在 Shell 内容和非 Shell 内容出错时都会触发
- **终止渲染**：使用返回的 abort 方法，可以终止剩余内容的渲染。通常用于超时处理

```js
app.use("/", (request, response) => {
  const { pipe, abort } = renderToPipeableStream(<App />, {
    // 需要嵌入页面的JS文件，index.js中会完成客户端的水合
    bootstrapScripts: ["/index.js"],

    // 在壳内容渲染完成时触发
    onShellReady() {
      response.setHeader("content-type", "text/html");
      pipe(response);
    },

    // 所有内容渲染完成时触发
    onAllReady() {},

    // 发生错误时触发
    onError(error) {},

    // 加载Shell内容时出错会触发
    onShellError(error) {
      response.statusCode = 500;
      response.setHeader("content-type", "text/html");
      response.send("<h1>出错了</h1>");
    },
  });
});
```

## 路由同构

**路由同构可以实现的原理**：

- react-router-dom 提供了服务端和浏览器端的 API：`StaticRouter`。其内部通过 Route 匹配路由，写法和浏览器端 API 相同
- 公共目录内定义路由配置，在服务端代码和客户端代码中引用同一份配置

**路由工作效果**：

- 浏览器中初次访问页面时，`StaticRouter` 根据路径，选取对应的页面组件，直出 HTML
- 后续路径切换，浏览器端控制，不会再向服务端发送请求（避免了早期 SSR 切换页面需要请求服务端带来的体验问题）

### 路由定义

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

// App.jsx
function App({ routeList }) {
  return (
    <>
      {routeList.map((item) => {
        return <Route exact key={item.path} {...item}></Route>;
      })}
    </>
  );
}
```

### 后端部分

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

### 前端部分

```js
ReactDom.hydrate(
  <BrowserRouter>
    <Switch>
      <App routeList={routeList}></App>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
```

## 数据同构

数据同构是指服务端渲染时和客户端初始渲染时，使用同一份数据。

服务端渲染时会遇到两个问题

1. 客户端请求使用的 API（如 fetch）可能不支持 Node 环境
2. 组件使用的 `useEffect`、`componentDidMount` 等生命周期不会执行。此外

问题 1 的结局方式是引入同时支持两种环境的请求库，如 axios。

对于问题 2，需要在渲染组件前执行数据预取，将请求得到的数据传入组件 props。

参考 Next.js 的设计，可以让组件提供一个 `getInitialProps` 方法。将请求后的数据挂载到组件的 `props.initialData`。

> 相关属性的命名并没有特殊含义，形成约定即可

### 后端实现

数据预取的结果可以通过 StaticRouter 的 context 传递，或通过 React 的 context、redux 等都可以。

```js
// 基于react-router 的 matchPath匹配当前路由，寻找匹配的组件targetComponent，省略具体实现
const getInitialProps = targetComponent.getInitialProps;
let initialData = {};
if (getInitialProps) {
  initialData = await getInitialProps();
}

const context = {
  initialData: fetchResult,
};

const html = renderToString(
  <StaticRouter location={path} context={context}>
    <App routeList={routeList}></App>
  </StaticRouter>
);
```

### 前端实现

```js
function App(props) {
  // ...
  const [data, setData] = useState(props.initialData);
}
App.getInitialProps = async () => {
  const res = await axios.get("/xxx");
  return res;
};
```

### 数据脱水

进行数据预取后，页面上的内容只会一闪而过。这是因为只在服务端进行了请求，导致双端节点对比失败，最终使用了客户端渲染的无数据版本。

要解决这个问题，可以将请求的数据连同 HTML 一起发送到浏览器。

将数据注入 HTML 的方式有很多，如作为 JSON 数据放入 script 标签（Next.js）、挂载到 window 对象（egg-react-ssr）、放入 textarea 标签等等。

### 数据注水

客户端注水，即在开始渲染前先获取 HTML 中携带的数据，将其用于渲染。

- 首先获取数据，这一步根据数据脱水的实现方式有所不同
- 将数据传给匹配当前路由的页面，这一步可以通过 React 的 context、redux 等实现

### 完善 TDK 信息

TDK 信息是指网页的标题（Title）、描述（Description）、关键词（Keywords），其目的是优化 SEO。

如果网页的 TDK 信息是固定的，在 HTML 模板中直接写死即可。如果需要通过接口获取动态生成，则可以在数据预取的时候，固定在某个字段中保留 TDK 信息。使用 `react-helmet` 可以方便的实现双端同构

前端通过数据预取存储的数据，通过 Helmet 组件设置 TDK 信息，无需手动修改 DOM

```js
import { Helmet } from "react-helmet";

function App() {
  // ...

  // 获取信息，这一步基于数据预取的实现方式会有所不同
  const { tdk = {} } = this.props.initialData || {};

  return (
    <div>
      <Helmet>
        <title>{tdk.title}</title>
        <meta name="description" content={tdk.description} />
        <meta name="keywords" content={tdk.keywords} />
      </Helmet>
      首页
    </div>
  );
}
```

后端通过 Helmet.renderStatic 方法获取数据。

renderStatic 必须在 renderToString 方法之后调用，Helmet 内部会存储 Helmet 组件内传入的 TDK 信息

```js
import { Helmet } from "react-helmet";

const html = renderToString(<App />);

const tdkInfo = Helmet.renderStatic();

ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    <meta name="keywords" content="${tdk.keywords}" />
    <meta name="description" content="${tdk.description}" />
</head>
//....
`;
```
