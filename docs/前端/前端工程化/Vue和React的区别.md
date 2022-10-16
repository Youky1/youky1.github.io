---
category: 前端
tag:
  - 前端工程化
---

# Vue 和 React 的区别

## 模板渲染的方式不同

- Vue 通过模板语法进行渲染，对于各种效果使用的是`指令`
- React 通过 JSX，对于各类效果都是使用 JS 的语法实现的
  如：
  - Vue 中的条件渲染使用到 v-if，在 React 的 JSX 中，则是{value && /\*...\*/}的形式。
  - Vue 中渲染列表用到 v-for，React 中使用的是 Array.map

## 监听数据变化的设计思想不一样

- Vue 是`push-based`，通过劫持数据的`getter`和`setter`，数据的改变会推动重新渲染。
- React 是`pull-based`，使用者需要调用`setState`，显式通知系统需要重新渲染

## 数据变化时的渲染过程不同

当数据改变时：

- Vue 通过数据劫持，可以准确判断发生更改的组件，从这个组件开始进行虚拟 DOM 的比较。**在处理大量 UI 变化时性能更好**。
- React 中，从根组件开始 diff 比较

## 组件间通信方式的不同

- Vue 中子组件向父组件通信可以通过**触发自定义事件**
- React 本身并不支持自定义事件

## 生态的不同

- Vue 官方提供了 Vuex 和 Vue-Router
- React 的生态更加丰富，但也更难选择，如对于数据流方案有 redux、MobX、dvajs
