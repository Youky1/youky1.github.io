---
category: 前端
tag:
  - vue
  - vue3
---

# Vue3

## 组合式 API

### setup 组件选项

在 Vue 实例中可以添加`setup`选项（取值为函数）

- 接受组件的`props`和`context`两个参数
- 在组件被创建之前执行，**不能调用 this**（data、methods 等没有加载）
- 返回值为对象，可以在组件的其他部分使用

> context 是一个普通对象，暴露了可能会用到的值

```typescript
setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs)

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots)

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit)

    // 暴露公共 property (函数)
    console.log(context.expose)
}
```

### 创建响应式变量

| API      | 含义                     | 视图是否更新 | 原对象是否同步更新 |
| -------- | ------------------------ | ------------ | ------------------ |
| `ref`    | 创建响应式引用           | 是           | 否                 |
| `toRef`  | 将对象某属性变为响应式   | 否           | 是                 |
| `toRefs` | 将对象所有属性变为响应式 | 否           | 否                 |

#### ref

`ref` 函数创建一个响应式引用，让该值在任何地方变成**响应式**（视图会同步更新）的。

返回值是一个带有 value 属性的对象，更新值时更新 value 属性即可。

```typescript
import { ref } from vue;
const counter = ref(0);

console.log(counter); // { value: 0 }
console.log(counter.value); // 0

counter.value++;
console.log(counter.value); // 1
```

`ref`创建的是对原变量的拷贝。用对象创建引用时，修改其返回的对象，原对象不会同步更改。

#### toRef

将对象的某属性变为响应式变量。修改引用对象时，**原对象会同步更新，但视图不会更新**

#### toRefs

将对象所有属性都变为响应式变量。修改时视图不更新。

### 在 setup 中使用生命周期钩子

从`vue`中引入生命周期函数，形如`onMounted`，调用时传入一个函数，则在对应的生命周期时，传入函数会执行。

```typescript
import { ref, onMounted } from 'vue';
setup(){
    const fn = () => {};
	onMonted(fn);
}

```

### 在 setup 中使用 watch

从 vue 中引入 watch，传入要进行监听的**响应式引用**和回调函数

```typescript
import { ref, watch } from "vue";

const counter = ref(0);
watch(counter, (newValue, oldValue) => {
  console.log("The new counter value is: " + counter.value);
});
```

### 在 setup 中使用 computed

从 vue 中引入 computed，接受一个函数作为参数，返回一个只读的响应式引用（需要用.value 读取值）

## Provide / Inject

### 使用

在 setup 中使用 `provide` 和 `inject` 时，要先从 vue 中引入。每次调用只能注入或获取一个变量

- provide 接受两个参数：键（String 类型）和值。

- inject 接受两个参数：键和默认值（可选）。

### 响应性

使用 provide 注入的变量默认不是响应性的。在注入时使用 `ref` 或 `reactive` 包裹可解决。

要修改响应式属性，应该在父组件中进行，然后注入另一个修改函数。

要确保注入变量不被修改，可以使用`readonly`包裹注入变量
