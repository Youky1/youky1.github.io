---
title: Vuex
category: 前端
tag:
  - vue
  - vue-router
---

## 介绍一下什么是 vuex

vuex 是一个转为 vue 开发的**状态管理模式**。主要包括以下几部分：

- **_state_**：vuex 的核心，定义了数据结构，以及默认值。
- **_getter_**：相当于 vuex 中的计算属性。
- **_mutation_**：改变 state 中数据的**唯一方式**。操作**必须是同步**的。
- **_action_**：可以进行异步操作，通过**提交 mutation**改变 state 的数据
- **_module_**：将代码拆分成多个 store 再汇总，以减少单一 store 的复杂程度

特点：

- vuex 的存储是响应式的，数据改变时页面便会更新
- 改变数据的唯一方式是 mutation，这使得状态的改变便于跟踪

使用：

```js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  // ...
});

new Vue({
  store,
  // ...
});
// ...
```

## 模块

modules 属性可以将 store 拆分成多个部分，每个 module 内的写法和 store 是相同的。

### 命名空间

不使用命名空间时，可以直接通过：

- `this.$store.state.模块名`访问某个 module 里的`state`
- `this.$store.getters.模块名`访问某个 module 里的`getters`

在 module 中用`namespace:true`可以开启命名空间。

- 多个模块可以对同一`mutation`做出反应
- 当多个模块的`getters`、`actions`重名时会发生冲突

### 创建基于某个命名空间的绑定函数

```js
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("some/nested/module");
```

## 为什么需要有 action 而不是在 mutation 中执行异步请求

对于每一条 mutation，devtool 都会捕捉其执行前后的状态进行对照。

如果 mutation 中存在异步请求则无法做到这一点。因为**在回调函数中进行的状态改变是不可追踪的**

## Vuex 的注入方式

1. Vuex 作为一个 Vue 插件，使用 Vue.use(Vuex)进行注册。该过程会执行 install 方法
2. 通过 mixin 向每个节点注入 `$store`
3. 对于根节点，直接将 `option.store` 赋值给 `this.$store`。若组件的 option 不存在 store 属性则说明不是根节点，则使用父节点的 `$store`
