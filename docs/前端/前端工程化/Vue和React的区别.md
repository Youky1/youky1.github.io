---
category: 前端
tag:
    - 前端工程化
---

# Vue和React的区别

## 模板渲染的方式不同

- Vue通过模板语法进行渲染，对于各种效果使用的是`指令`
- React通过JSX，对于各类效果都是使用JS的语法实现的
如：
  - Vue中的条件渲染使用到v-if，在React的JSX中，则是{value && /\*...\*/}的形式。
  - Vue中渲染列表用到v-for，React中使用的是Array.map

## 监听数据变化的设计思想不一样

- Vue是`push-based`，通过劫持数据的`getter`和`setter`，数据的改变会推动重新渲染。
- React是`pull-based`，使用者需要调用`setState`，显式通知系统需要重新渲染

## 渲染过程不同

当数据改变时：
- Vue通过数据劫持，可以准确判断发生更改的组件，从这个组件开始进行虚拟DOM的比较。**在处理大量UI变化时性能更好**。
- React中，从根组件开始diff比较

## 组件间通信方式的不同

- Vue中子组件向父组件通信可以通过**触发自定义事件**
- React本身并不支持自定义事件

## 生态的不同

- Vue官方提供了Vuex和Vue-Router
- React的生态更加丰富，但也更难选择，如对于数据流方案有redux、redux-saga、dvajs