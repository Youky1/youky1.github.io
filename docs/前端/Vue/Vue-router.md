---
category: 前端
tag:
  - vue
  - vue-router
---

# Vue-Router

## 导航原理

1. 监听`location.hash`，并劫持`_routerRoot._route`变量
2. 在 router-view 组件的 render 函数中使用了`parent.$route`，间接触发了`this._routerRoot._route`的 getter，因此对其产生订阅
3. URL 改变时，会匹配最新的 route，并修改`this._routerRoot._route`，触发 setter，router-view 做出响应

## 动态路由匹配

在路径中，用双引号开头的部分会作为路由参数，在`$route.params`中可以获取。

一个路径中，可以有多个参数。动态参数不同的路径，匹配同一个路由。
例如对于路径`/foo/:name/:id`

| path        | \$route.params        |
| ----------- | --------------------- |
| `/foo/a/20` | `{name:'a',age:'20'}` |
| `/foo/c/30` | `{name:'b',age:'30'}` |

路径中只有路由参数发生改变时，组件会进行复用。为了监听路由参数的改变，可以在`watch`中添加\$route，或是使用`beforeRouteUpdate`导航守卫

### 通配符

\*可以代表任意路径，即：

- `*`可以匹配任意路径
- `bar-*`可以匹配 bar-开头的任意路径。

在`$param.pathMatch`中可以获取通配符匹配的内容。

要设置 404 页面，在 routes 的**最后**添加`{path:'*',component:NotFound}`即可。

> 因为当一个路径可以匹配多个路由时，会匹配写在前面的

## 嵌套路由

```js
const routes = [{
    path:'/foo',
    // Foo组件会渲染到根router-view中，而Foo组件中也可以包含router-view组件
    component:Foo,
    children:[
        {path:'', component:Default}    // /foo时在Foo组件的出口中显示Default组件
        {path:'bar', component:Bar},    // /foo/bar时显示Bar组件
    ]
}]
```

为 route 对象添加`children`属性，其取值和 route 对象的格式相同。

以`/`开头的路径时绝对路径，否则是相对路径。

## 编程式的导航

即不使用`router-link`组件，而是使用在 JS 代码中使用`$router`进行跳转。

### push、replace 方法

`router.push(location, onComplete?, onAbort?)`接收三个参数，分别是：

- 跳转的路径
- 导航完成后的回调：所有异步钩子被解析之后
- 导航中止后的回调：导航到相同的路由、或在当前路由完成之前跳转到另一个路由。

replace 方法和 push 的唯一区别是不会向 history 栈添加记录。在 router-link 中使添加 replace 属性可以达到同样效果

如果不传入第 2、3 个参数，push 和 replace 都会返回一个 Promise。

```js
// 字符串
router.push("home");

// 对象
router.push({ path: "home" });

// 命名的路由
router.push({ name: "user", params: { userId: "123" } });

// 带查询参数，变成 /register?plan=private
router.push({ path: "register", query: { plan: "private" } });
```

### go 方法

在 history 栈中前进或后退类似于`window.history.go`

## 命名路由

给路由记录添加`name`属性，在跳转时也可以通过 name 进行跳转。

```js
const routes = [
  {
    path: "/user/:userId",
    name: "user",
    component: User,
  },
];
```

给 router-link 的`to`属性绑定一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

或使用等价的编程式导航：

```js
this.$router.push({ name: "user", params: { userId: 123 } });
```

## 命名视图

**_用途_**：通过多个`router-view`出口**同级**展示多个视图，如 sidebar 和 main 都需要随路由切换的场景

**_做法_**：

- 给 router-view 组件添加 name 属性。没有 name 属性的默认是 default

```html
<div>
  <router-view></router-view>
  <router-view name="bar"></router-view>
</div>
```

- 在路由记录中，`component`属性替换为`components`，并对每个视图分别指定组件

```js
const routes = [
  {
    path: "foo",
    components: {
      default: DefaultCom,
      bar: Bar,
    },
  },
];
```

## 重定向和别名

### 重定向

- 从一个路径到另一个路径：

```js
const routes = [{ path: "/foo", redirect: "/bar" }];
```

- 重定向到一个命名路由：

```js
const routes = [{ path: "/foo", redirect: { name: "bar" } }];
```

- 通过一个方法动态选择重定向的目标：

```js
const routes = [
  {
    path: "/foo",
    redirect: (to) => {
      // 接收原本的路径作为参数，返回重定向的路径字符串或路径对象
      return "bar";
    },
  },
];
```

**路由守卫不会作用于重定向的路径（foo），而只是作用于目标路径（bar）**

### 别名

别名的含义是，用户访问`/foo`时，路径仍然显示`/foo`，但是路由匹配为`/bar`，即页面显示的内容和`/bar`相同。

```js
const routes = [{ path: "/foo", component: Foo, alias: "/bar" }];
```

通过别名，可以把 UI 映射到任意的路径上，而不受 URL 嵌套关系的限制。

## 路由组件传参

在组件内使用`$route`会导致组件和路径耦合，如组件内通过`$route.params.id`获取 id 并显示，那么该组件就只能在 URL 带有 id 查询参数时才能使用。将 id 作为 prop 则可以实现**解耦**。

### 布尔模式

当 props 取值为 true，`route.params`的所有查询参数会作为同名的 props 传入。
对于命名视图，需要对每个视图设置 props 属性

```js
const routes = [
  { path: "/foo", component: Foo, props: true },
  {
    path: "/user/:id",
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false },
  },
];
```

### 对象模式

当 props 取值为对象，这个对象中所有的属性会作为 props 传入。此时的 props 要是**静态的**，即与当前路由无关

```js
const routes = [
  {
    path: "/foo",
    component: Foo,
    props: {
      name: "bar",
      age: 20,
    },
  },
];
```

```js
// 组件中
{
    props:['name', 'age'],
}
```

### 函数模式

当 props 取值为函数，它接收当前的 route 对象作为参数，返回一个对象，在其中即可设置静态值和动态值。

```js
const routes = [
  {
    path: "/foo",
    component: SearchUser,
    props: (route) => {
      return {
        query: route.query.q, // 通过route读取的动态值
        name: "bar", // 静态属性值
      };
    },
  },
];
```

## 导航守卫

定义：路径跳转是一个**过程**，其中的某些截阶段会触发一些钩子函数，就像组件的生命周期函数一样。

### 分类

#### 全局守卫

直接在 router 上设置，有三个

- beforeEach
- beforeResolve
- afterEach（不能调用 next 方法）

```js
const router = new VueRouter({
  /*...*/
});
// 必须调用next方法，否则导航无法继续下去
router.beforeEach((to, from, next) => {});

// 不接收next方法，因为导航已经完成了
router.afterEach((to, from) => {});
```

#### 路由独享的守卫

在 route 对象上定义，只有一个`beforeEnter`

```js
const routes = [
  {
    path: "/foo",
    component: Foo,
    beforeEnter: (to, from, next) => {
      // ...
    },
  },
];
```

#### 组件独享的守卫

在组件内定义，某个组件专用：

- beforeRouteEnter（不能使用 this，可以给 next 传入回调）
- beforeRouteUpdate
- beforeRouteLeave

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 不能使用this，此时组件实例还没被创建
    // next可以传入一个回调，在导航被确认后会执行
    next((vm) => {});
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用。如动态路由参数改变时
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用。
    // 通常用来防止用户未保存数据时突然离开
  },
};
```

在跳转页面需要请求数据的时候，可以选择在 beforeRouteEnter 里进行数据请求，请求完成后再进行跳转

```js
beforeRouteEnter(to, from, next){
    // ...
    axios.request({
        // ...
    }).then(res => {
        next(vm => vm.setRes(res));
    })
}
```

### 完整的解析流程

1. _路由被激活_
2. 在失活的组件里调用`beforeRouteLeave`
3. 调用全局的`beforeEach`
4. 在重用的组件里调用 beforeRouteUpdate
5. 调用路由独享的 beforeEnter
6. _解析异步路由组件_
7. 调用被激活的组件里的 beforeRouteEnter
8. 调用全局的 beforeResolve
9. _导航被确认_
10. 调用全局的 afterEach
11. _DOM 更新_
12. 如果在 beforeRouteEnter 中给 next 传入了回调，则执行

## 路由元信息

在路由记录中，可以添加`meta`字段，作为这个路由的元信息。

通过`$route.matched`可以获取当前匹配的路由，取值为一个数组（因为嵌套路由的情况下，回匹配多个路由记录）。可以通过其中的每一项的 meta，获取其元信息对象。

## 滚动行为

> 仅在支持 history API 的浏览器中适用

创建 router 实例时，可以提供一个`scrollBehavior`方法，通过返回值控制滚动行为：

- 返回一个 falsy 值或空对象：不发生滚动
- 返回一个带有 x、y 属性的对象：滚动至指定位置
- 返回 savedPosition：滚动至跳转前的位置
- 返回带有 selector 属性的对象：滚动到锚点

**异步滚动**：返回一个 Promise，在其中将上面几种类型的值传入 resolve

**平滑滚动**：将`behavior: 'smooth'`加入到返回的对象中

```js
const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
        // return 返回期望滚动到哪个的位置
    }
})
```

## 导航故障（navigation failures）

如果导航出现故障（如被中止），router.push 方法返回的 Promise 中，会被 rejected。

因此在其 catch 方法中可以获取这个 failure，它有`to`和`from`属性来显示路由情况

```js
import { isNavigationFailure, NavigationFailureType } from "vue-router";

// 正在尝试访问 admin 页面
router.push("/admin").catch((failure) => {
  // 传入的第二个参数用来判断故障的类型
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // 打印出提示，或是进行其他需要的操作
    console.log("Login in order to access the admin panel");
  }
});
```

**故障类型**：也即`NavigationFailureType`的属性

- redirected：在导航守卫中调用 next(newLocation)进行了重定向
- aborted：在导航守卫中调用 next(false)中断了本次导航
- cancelled：当前导航还未完成时又有一个新的导航，如在守卫中调用`router.push`
- duplicated：导航被阻止，因为已经在目标位置了
