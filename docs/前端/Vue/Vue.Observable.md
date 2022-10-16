---
category: 前端
tag:
  - vue
---

# Vue.Observable

## 是什么

> 使变量变为响应式的（可观察的）Vue 内部会用它来处理 data 函数返回的对象

- 在 Vue2 中，会在对象自身上进行处理，并返回该对象
- 在 Vue3 中，会返回 Proxy 的代理对象

## 使用场景

在非父子组件通信的场景中，如果数据较少，不使用总线模式，可以在多个组件中导入 observable 对象实现响应式通信。

1. 创建 JS 文件

```JS
// 引入vue
import Vue from 'vue'
// 创建state对象，使用observable让state对象可响应
export const state = Vue.observable({
  name: '张三',
  'age': 38
})
// 创建对应的方法
export const mutations = {
  changeName(name) {
    state.name = name
  },
  setAge(age) {
    state.age = age
  }
}
```

2. 组件中引入

```JS
import { state, mutations } from '@/store'
export default {
  // 在计算属性中拿到值
  computed: {
    name() {
      return state.name
    },
    age() {
      return state.age
    }
  },
  // 调用mutations里面的方法，更新数据
  methods: {
    changeName: mutations.changeName,
    setAge: mutations.setAge
  }
}
```
