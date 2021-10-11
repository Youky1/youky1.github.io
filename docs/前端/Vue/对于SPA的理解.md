---
category: 前端
tag:
    - vue
---

# 对于SPA的理解

## SPA的优缺点

优点：
- 前后端分离的开发模式
- 开发和维护的成本更低

缺点：
- SEO较差
- 首屏时间较长

## 如何改善SPA的SEO

- 服务端渲染SSR
- 预渲染生成静态页面
- 通过`URL Rewrite`的方法将外部请求的静态地址转换为实际的动态页面
- 使用`Phantomjs`配合`NGINX`对爬虫进行优化。即：
  - 若是户访问，返回正常的SPA应用
  - 若是爬虫，用`Phantomjs`返回页面信息

## 如何改善SPA的首屏时间

- 服务端渲染SSR
- 路由懒加载
```js
const routes = [{
    path:'/foo',
    component: () => import('../components/Foo.vue');
}]
```
- 对于静态资源进行本地缓存
- 针对webpack打包的优化
  - 压缩插件，如`terser-webpack-plugin`
  - Tree Shaking
  - sideEffects