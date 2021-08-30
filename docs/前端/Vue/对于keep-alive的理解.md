# 对于keep-alive的理解

## 基础用法

keep-alive是Vue内置的一个组件，内部包裹动态组件时，可以避免该组件每次切换时重新渲染。

```html
<keep-alive>
  <component :is="currentComponent"></component>
</keep-alive>
```

使用了keep-alive的组件会多出两个生命周期钩子：

- activated：
- deactivated：



## 接收的属性

### include

取值与include的值相等的组件会被缓存。

首先检查组件的`name`属性，若没有则用其父组件中注册时的名称（components选项中的键）。

可以使用正则表达式，此时必须用v-bind绑定（不然会被识别为字符串）

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

数字类型，表示缓存的组件实例的最大数量