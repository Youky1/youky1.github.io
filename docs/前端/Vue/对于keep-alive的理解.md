---
category: 前端
tag:
  - vue
---

# 对于 keep-alive 的理解

## 基础用法

keep-alive 是 Vue 内置的一个组件，内部包裹动态组件时，可以避免该组件每次切换时重新渲染。

```html
<keep-alive>
  <component :is="currentComponent"></component>
</keep-alive>
```

使用了 keep-alive 的组件会多出两个生命周期钩子：

- activated：
- deactivated：

## 接收的属性

### include

取值与 include 的值相等的组件会被缓存。

首先检查组件的`name`属性，若没有则用其父组件中注册时的名称（components 选项中的键）。

可以使用正则表达式，此时必须用 v-bind 绑定（不然会被识别为字符串）

```html
<!-- 使用字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 使用正则表达式 (必须要使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 使用数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

### exclude

任何名称匹配的组件不会被缓存

### max

数字类型，表示缓存的组件实例的最大数量

## 缓存后如何获取数据？

1. 通过路由钩子 `beforeRouteEnter`
2. 通过缓存组件特有的 `actived` 钩子（SSR 中无法使用）

## 实现原理是什么？

> keep-alive 会在组件树中生成节点吗？

不会，因为设置了 abstract:true，因此不会在组件树中生成节点。

缓存组件的原理：

1. `create` 钩子中，缓存 VNode 和对应的 key。
2. `mounted` 钩子中，对 `include` 属性和 `exclude` 属性进行监听，以实时更新缓存对象。
3. `render` 时，对组件进行缓存。该过程还涉及对已有的缓存 VNode 的排序以及更替。
4. 当再次访问被包裹组件时，执行 insert 逻辑将缓存的 VNode 插入到父元素中。
