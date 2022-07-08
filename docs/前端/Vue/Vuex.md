---
title: Vuex
category: 前端
tag:
    - vue
    - vue-router
---
## 介绍一下什么是vuex

vuex是一个转为vue开发的**状态管理模式**。主要包括以下几部分：

- ***state***：vuex的核心，定义了数据结构，以及默认值。
- ***getter***：相当于vuex中的计算属性。
- ***mutation***：改变state中数据的**唯一方式**。操作**必须是同步**的。
- ***action***：可以进行异步操作，通过**提交mutation**改变state的数据
- ***module***：将代码拆分成多个store再汇总，以减少单一store的复杂程度

特点：

- vuex的存储是响应式的，数据改变时页面便会更新
- 改变数据的唯一方式是mutation，这使得状态的改变便于跟踪

使用：

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    // ...
});

new Vue({
    store,
    // ...
})
// ...
```

## 模块

modules属性可以将store拆分成多个部分，每个module内的写法和store是相同的。

### 命名空间

不使用命名空间时，可以直接通过：
- `this.$store.state.模块名`访问某个module里的`state`
- `this.$store.getters.模块名`访问某个module里的`getters`

在module中用`namespace:true`可以开启命名空间。
- 多个模块可以对同一`mutation`做出反应
- 当多个模块的`getters`、`actions`重名时会发生冲突


### 创建基于某个命名空间的绑定函数

```js
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
```

## 为什么需要有action而不是在mutation中执行异步请求

对于每一条mutation，devtool都会捕捉其执行前后的状态进行对照。

如果mutation中存在异步请求则无法做到这一点。因为**在回调函数中进行的状态改变是不可追踪的**
