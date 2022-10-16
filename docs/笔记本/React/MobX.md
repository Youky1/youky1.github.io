---
category: 前端
tag:
  - react
  - MobX
---



# 一、起步

## 1.1 下载

安装本体：

```
yarn add mobx
```

对于React应用绑定包有两种，只支持函数组件的 ` mobx-react-lite ` 和同时也支持类组件的 ` mobx-react ` 。

```
yarn add mobx-react-lite
```



## 1.2 装饰符

在MobX6版本中，默认移除了 `@observable` 等修饰符写法来最大限度的兼容JS，若要使用修饰符可以手动开启。



## 1.3 生产环境检测

通过环境变量 `process.env.NODE_ENV`  来检测是否出于生产环境。此时一些安全检查将不会生效。



## 1.4 核心概念

MobX将应用分为三个核心概念：

- State（状态）：驱动应用程序的数据，可以是任意类型
- Actions（动作）：改变State的代码
- Derivations（派生）：依托于 `State` 的代码，主要分为两种
   -  *Computed* ：由一个**纯函数**从State中计算得来
   -  *Reactions* ：State变化时自动执行的副作用（包括对于React组件的更新，和类似Vue中的watch的效果）

## 1.5 基本原则

1. 所有的 `derivations`  将会在 `state` 改变后自动、同步更新，在其中可以安全的使用 `computed` 
2.  `computed` 是**惰性**的，在使用它们的副作用发生前都是不激活的
3.  `computed` 是纯函数，并且不能修改 `state`



# 二、State

## 2.1 makeObservable

任何JS变量都可以变为可观察对象。

最基本的转换方法是 `makeObservable`  ，传入一个对象，并对每个值进行注解：

- `observable` 定义一个存储 state 的可追踪字段。
- `action` 将一个方法标记为可以修改 `state` 的 `action`。
- `computed` 标记一个可以由 `state` 派生出新的值并且缓存其输出的 getter。

```javascript
import { makeObservable, observable, computed, action } from "mobx"

class Doubler {
    value
    constructor(value) {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action,
        })
        this.value = value
    }
    get double() {
        return this.value * 2
    }
    increment() {
        this.value++
    }
}
```

## 2.2 makeAutoObservable

```javascript
makeAutoObservable(target, overrides?, options?)
```

自动对所有属性做推断，可以在 `overrides` 中对具体属性做特殊注解，标记为false的成员不会添加注解

```javascript
import { makeAutoObservable } from "mobx"
function createDoubler(value) {
    return makeAutoObservable({
        value,
        get double() {
            return this.value * 2
        },
        increment() {
            this.value++
        }
    })
}
```



## 2.3 observable

```javascript
observable(source, overrides?, options?)
```

调用后会克隆 source 参数并将其所有属性变为可观察的。

与上面两种方法的区别：使用Proxy创建一个可观察的副本对象，因此**调用后添加的属性也是可观察的**。



# 三、Actions

