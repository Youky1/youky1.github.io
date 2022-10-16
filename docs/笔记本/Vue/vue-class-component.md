---
category: 前端
tag:
  - vue
  - vue-class
---

# Vue-class-component

## 项目搭建

### 使用 vue-cli 搭建

```
vue create hello-world
```

- 选择 "Manually select features" 来手动选择特性，勾选上 TypeScript（因为要使用装饰器语法）
- 勾选 "Use class-style component syntax?"

### 手动引入

安装依赖：

```
npm install --save vue vue-class-component
```

创建 `tsconfig.json` 文件，启用 `experimentalDecorators`：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "strict": true,
    "experimentalDecorators": true
  }
}
```

在 babelrc 中使用插件：

```json
{
  "plugins": [
    ["@babel/proposal-decorators", { "legacy": true }],
    ["@babel/proposal-class-properties", { "loose": true }]
  ]
}
```

> legacy 和 loose 属性是必须的，因为 vue-class 只支持 stage 1 的装饰器语法。

## 定义组件

@Component 装饰器将类注册为 Vue 组件

```TypeScript
import Vue from 'vue';
import Component from 'vue-class-component';
@Component
export default class HelloWorld extends Vue {}
```

### Data

类中声明的属性会作为组件的 `data` ，也可以使用 data 这个 hook 来声明：

```TypeScript
@Component
export default class HelloWorld extends Vue {
  message = null

  data() {
    return {
      hello: undefined
    }
  }
}
```

### Methods

组件的方法在类中直接声明：

```TypeScript
@Component
export default class HelloWorld extends Vue {
  // Declared as component method
  hello() {
    console.log('Hello World!')
  }
}
```

### Computed

计算属性通过 `getter` / `setter` 的形式声明：

```TypeScript
@Component
export default class HelloWorld extends Vue {
  firstName = 'John'
  lastName = 'Doe'

  // Declared as computed property getter
  get name() {
    return this.firstName + ' ' + this.lastName
  }

  // Declared as computed property setter
  set name(value) {
    const splitted = value.split(' ')
    this.firstName = splitted[0]
    this.lastName = splitted[1] || ''
  }
}
```

### Hooks

data、render、各类生命周期函数等都可以直接作为类的方法声明，普通方法应避免同名。

在这些 hooks 内部，无法调用自己。

### 其他

对于其他属性（如 `components` ），将其作为一个对象，传入 `@Component` 函数

```TypeScript
@Component({
  components: {
    OtherComponent
  }
})
export default class HelloWorld extends Vue {}
```

## 注册额外 hooks

当使用如 vue-router 等其他库时，要识别它所提供的 Hooks，就需要手动注册（在所有组件声明前）。

```TypeScript
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
@Component
export default class HelloWorld extends Vue {
  // The class component now treats beforeRouteEnter,
  // beforeRouteUpdate and beforeRouteLeave as Vue Router hooks
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    next()
  }

  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  }

  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    next()
  }
}
```

## 自定义装饰器

使用 `createDecorator` 可以注册自定义的装饰器，它接收三个参数：

- options：Vue 组件对象
- key：装饰的属性或方法名称
- parameterIndex：如果自定义装饰器用于装饰一个数组，显示当前元素在数组中的下标

```TypeScript
import { createDecorator } from 'vue-class-component'

// Declare Log decorator.
export const Log = createDecorator((options, key) => {
  // Keep the original method for later.
  const originalMethod = options.methods[key]

  // Wrap the method with the logging logic.
  options.methods[key] = function wrapperMethod(...args) {
    // Print a log.
    console.log(`Invoked: ${key}(`, ...args, ')')

    // Invoke the original method.
    originalMethod.apply(this, args)
  }
})
@Component
class MyComp extends Vue {
  // It prints a log when `hello` method is invoked.
  @Log
  hello(value) {
    // ...
  }
}
```

## 继承

可以用原生 JS 中继承类的方法，继承注册的类组件

```TypeScript
import Vue from 'vue'
import Component from 'vue-class-component'

// Define a super class component
@Component
export default class Super extends Vue {
  superValue = 'Hello'
}

@Component
export default class HelloWorld extends Super {
  created() {
    console.log(this.superValue) // -> Hello
  }
}
```

## Mixin

和继承一样，所有 Mixin 的内容必须**通过类组件形式定义**。然后通过 mixins 函数来使用

```TypeScript
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'

// You can declare mixins as the same style as components.
@Component
export class Hello extends Vue {
  hello = 'Hello'
}

@Component
export class World extends Vue {
  world = 'World'
}

@Component
export class HelloWorld extends mixins(Hello, World) {
  created () {
    console.log(this.hello + ' ' + this.world + '!') // -> Hello World!
  }
}
```

## 注意事项

### 不要在箭头函数中使用 this

this 并不是 Vue 实例，只是初始化过程中的一个代理对象。

注册函数时应使用非箭头函数。

### 不用手动调用 constructor

原始的 constructor 会被调用来收集声明的变量，因此手动调用 constructor 的话，其中的代码会执行两次。
如果需要，应调用生命周期钩子

## 使用 TypeScript

### 定义 props 类型

通过 Vue.extends 定义 props 的类型，并在定义类组件时继承

```TypeScript
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the props by using Vue's canonical way.
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

// Use defined props by extending GreetingProps.
@Component
export default class Greeting extends GreetingProps {
  get message(): string {
    // this.name will be typed
    return 'Hello, ' + this.name
  }
}
```

### 定义方法类型

当方法在类组件之外定义时，使用时要将其传入 @Component 的参数中定义。

同时，要在类组件中进行类型声明。

```TypeScript
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'
@Component({
  computed: mapGetters([
    'posts'
  ]),
  methods: mapActions([
    'fetchPosts'
  ])
})
export default class Posts extends Vue {
  posts!: string[]
  fetchPosts!: () => Promise<void>

  mounted() {
    this.fetchPosts().then(() => {
      console.log(this.posts)
    })
  }
}
```

### 定义 \$refs 类型

当 \$refs 用于具体元素时，可以直接在类中声明其类型：

```TypeScript
$refs!: {
  input: HTMLInputElement
}
```

### Hooks 类型

对于 `data`、`render` 等内置 hooks，vue-class-component 提供了内置的类型，直接引入即可：

```TypeScript
import 'vue-class-component/hooks'
```

### 装饰器中使用组件类型

使用 `@Component` 装饰器时，默认的类型是基于 Vue 的，因此在调用组件方法时会报错（方法是存在于组件上的）。
可以向 `@Component` 传入组件类型来解决问题：

```TypeScript
@Component<Post>({
  watch: {
    postId(id: string) {
      this.fetchPost(id) // -> No errors
    }
  }
})
class Post extends Vue {
  postId: string

  fetchPost(postId: string): Promise<void> {
    // ...
  }
}
```
