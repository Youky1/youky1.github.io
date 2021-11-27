---
category: 后端
tag:
    - Koa
    - Node.js
---

# Koa中间件的原理

## 中间件和洋葱模型
Koa把很多async函数组成一个处理链。每个async函数称为一个中间件（middleware）

每个中间件可以访问`request`对象和`response`对象，执行自己的功能。然后通过`await next()`将控制权交给下一个函数。

直到最后一个中间件不再调用next时沿原路返回，将控制权依次交到上一个中间件。

中间件的执行顺序和注册（即调用`app.use`）顺序一致

![Koa](../../.vuepress/public/koa.png)

## 常用的中间件有哪些

- `koa-router`：实现路由
- `koa-static`：实现静态文件请求
- `koa-body`：解析请求的body
- `koa-cors`：处理跨域