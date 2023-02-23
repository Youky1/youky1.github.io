---
category: 前端
tag:
  - vue
  - vue3
---

# Vue3

## 起步

### 创建应用

每个应用实例都是通过createApp创建的：

```js
import { createApp } from 'vue'
import App from './App.vue' 	// 从一个单文件组件中导入根组件
const app = createApp(App)		// 创建实例
app.mount('#app')				// 调用mount方法后，实例才会进行渲染，返回值是根组件实例
```

>  `.mount()` 方法必须在整个应用**配置**和**资源注册**完成后被调用 

### 应用配置

-  使用 `.config`  方法进行全局配置（如错误处理）
- 使用 `.component` 注册全局组件

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



### 在 setup 中使用生命周期钩子

从`vue`中引入生命周期函数，形如`onMounted`，调用时传入一个函数，则在对应的生命周期时，传入函数会执行。

```typescript
import { ref, onMounted } from 'vue';
setup(){
    const fn = () => {};
	onMonted(fn);
}

```

### 在 setup 中使用 computed

从 vue 中引入 computed，接受一个函数作为参数，返回一个只读的响应式引用（需要用.value 读取值）。

computed可以通过返回对象，定义getter和setter的形式，实现可写。

```typescript
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
```



### 和mixin的区别

解决了mixin的三个缺点：

1. 不清晰的数据来源
2. 多个mixin之间的命名空间冲突
3. 多个mixin间共享属性时的隐式交流

## Provide / Inject

### 使用

在 setup 中使用 `provide` 和 `inject` 时，要先从 vue 中引入。每次调用只能注入或获取一个变量

- provide 接受两个参数：键（String 类型）和值。

- inject 接受两个参数：键和默认值（可选）。

### 响应性

使用 provide 注入的变量默认不是响应性的。在注入时使用 `ref` 或 `reactive` 包裹可解决。

要修改响应式属性，应该在父组件中进行，然后注入另一个修改函数。

要确保注入变量不被修改，可以使用`readonly`包裹注入变量



## 响应式基础

### 引用类型：reactive

使用 `reactive()`创建响应式变量，返回的是原对象的**代理**。默认是**深层响应**的。

对一个变量调用多次，会返回同一个代理。

```typescript
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})
```

**局限性**：

1. 仅对对象类型有效
2. 仅有返回的代理对象具有响应性。即：把对象的属性赋值给其他对象，或解构至本地变量时，将会失去响应性

```typescript
const state = reactive({ count: 0 })
let n = state.count
n++// 不影响原始的 state

let { count } = state
count++// 不会影响原始的 state

// 无法跟踪 state.count 的变化
callSomeFunction(state.count)
```

### 所有类型：ref

| API      | 含义                     | 视图是否更新 | 原对象是否同步更新 |
| -------- | ------------------------ | ------------ | ------------------ |
| `ref`    | 创建响应式引用           | 是           | 否                 |
| `toRef`  | 将对象某属性变为响应式   | 否           | 是                 |
| `toRefs` | 将对象所有属性变为响应式 | 否           | 否                 |

### ref

`ref` 函数创建一个响应式引用，让该值在任何地方变成**响应式**（视图会同步更新）的。

返回值是一个带有 value 属性的对象，更新值时更新 value 属性即可。

> 在模板中访问时会自动解包，不需要.value

```typescript
import { ref } from vue;
const counter = ref(0);

console.log(counter); // { value: 0 }
console.log(counter.value); // 0

counter.value++;
console.log(counter.value); // 1
```

`ref`创建的是对原变量的**拷贝**。用对象创建引用时，修改其返回的对象，原对象不会同步更改。

### toRef

将对象的某属性变为响应式变量。修改引用对象时，**原对象会同步更新，但视图不会更新**

### toRefs

将对象所有属性都变为响应式变量。修改时视图不更新。



## style和class绑定

### 组件上使用class

对于有多个根元素的组件，在组件上绑定的class需要在组件内通过 ` :class="$attrs.class" ` 声明绑定至哪个元素

### 自动前缀

 在 `:style` 中使用了需要[浏览器特殊前缀](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)的 CSS 属性时，Vue 会自动加上相应的前缀。



## 生命周期

和Vue2的区别：

1. `beforeDestroy`和`destroyed`替换为了`beforeUnmount`和`unmounted`
2. 组合式写法中，在钩子前加上`on`前缀

## Watch

接受两个参数：监听的变量和回调函数，**第一个参数可以是数组**

### 监听响应对象属性

监听reactive返回的响应对象的属性时，不能将该属性直接作为第一个参数（这样将会得到一个数字），而要使用一个getter

```typescript
const obj = reactive({ count: 0 })

// 错误做法：因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})

// 正确做法：
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```



### 深层监听

> 对于大型数据开销很大

直接监听响应对象，则会对所有属性进行监听。所有嵌套的属性改变时都会触发。



###  watchEffect 

- 自动追踪副作用代码的依赖
- 在创建以及依赖变量改变时，都进行执行

>  只追踪同步执行期间的依赖。（异步代码只有在第一个 `await` 正常工作前访问到的属性才会被追踪 ）



### 后置监听

默认的watch会在DOM更新前执行。要将执行时机放在DOM更新后：

- 给watch或 watchEffect 传入第三个参数，{ flush: 'post' }
- 将 watchEffect 替换为 watchPostEffect  



### 停止侦听器

在异步代码中创建的侦听器需要手动停止已防止内存泄漏。

停止方法：调用watch返回的函数

```typescript
let watchRef = ref(null)
setTimeout(() => {
  watchRef.value = watchEffect(() => {})
}, 100)
unwatch.value()// ...当该侦听器不再需要时
```


## 在组件上使用ref

- 当子组件没有使用setup时，ref获得的是子组件的this，即对子组件的所有属性拥有绝对访问权
- 当子组件使用了setup时，默认是私有的。子组件中可以通过 `defineExpose` 显式暴露内容，父组件无法访问此外的任何内容



## 组件

### 声明props

> ` defineProps `、 `defineEmits`  都是编译宏命令，不需要显式导入

使用 ` defineProps ` 声明组件接受的所有变量。

接收一个数组，返回一个对象（props）



### 声明抛出事件

> 用 `defineEmits`   声明抛出事件是**可选的**

使用 `defineEmits`   声明组件能抛出的所有自定义事件。使用TS时可以仅通过类型标注来声明事件。

返回一个emit方法，用于触发自定义事件（setup中无法直接使用$emit）

```typescript
// JS写法：
const emit = defineEmits(['change', 'update'])
// TS标注写法：
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```

如果声明抛出了一个和原生事件同名的事件，则其监听器只会监听该自定义事件和忽略原生DOM事件



### 组件的v-modal

在组件上使用v-modal时，默认会被展开为 `modelValue` 和 `@update:modelValue `

```vue
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

在组件内部可以使用一个计算属性将v-modal转移至原生input上：

```typescript
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
```

#### 修改默认的绑定属性名

可以改变v-modal绑定的属性值（此时子组件应接受名为 `title` 的prop 并通过触发 `update:title` 事件更新父组件 ）

```vue
<MyComponent v-model:title="bookTitle" />
```

利用这一点，可以在一个组件上使用多个v-modal绑定，绑定至不同的prop即可

#### v-modal的自定义修饰符

- 默认情况下，通过 `modelModifiers` 这个props获得
- 修改了自定义属性名的v-modal（如title），通过 titleModifiers 获得

```vue
<MyComponent v-model:title.capitalize="myText">
```

```typescript
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])
console.log(props.titleModifiers) // { capitalize: true }
```



### 异步组件

` defineAsyncComponent ` 接受一个返回Promise的异步加载函数，可以从服务端请求或通过import函数动态加载组件

```typescript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)

// 也可以全局注册
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

最终得到的AsyncComp组件，使用时和普通组件没有区别



## 自定义指令

在setup中，以字母v开头的驼峰命名的变量，可以作为自定义指令：

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>
<template>
  <input v-focus />
</template>
```

也可以全局声明自定义指令：

```typescript
const app = createApp({})
// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```



每个自定义指令对象，属性即是生命周期函数。其值的函数可以接受DOM元素以及给指令绑定的变量等参数



## Teleport

> 将组件内部的一部分模板，传送至组件DOM结构的外层去

`Teleport`组件接收一个to属性，取值为一个css选择器字符串，表示将其内部的结构渲染至目标元素之下。

但逻辑上该部分内容仍属于当前组件（传入的props和触发的事件都会正常工作）

给`Teleport`传入disabled属性，可以将其禁用



## Suspence

> 作为父级组件，等待异步子组件的加载

异步子组件有两种情况：

1. 在`setup`中使用了await的组件
2. ` defineAsyncComponent ` 定义的异步组件

Suspence会等待异步子组件的加载，可在此期间可通过 **fallback 插槽**显示 Loading 状态。

当所有的依赖都完成后，会进入**完成状态**，显示**默认插槽**中的内容

