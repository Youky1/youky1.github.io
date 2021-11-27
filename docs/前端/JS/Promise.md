---
category: 前端
tag:
    - JS
---

# Promise

## 基本概念

- Promise共有三种可能的状态，一个Promise只能出现两种：初始化状态、成功状态、失败状态。状态**只能改变一次**
- Promise构造函数中的代码为**同步代码**，回调函数为**微任务**



## Promise为什么能解决回调地狱

### 回调地狱主要代表两个问题

1. 多层嵌套
2. 每个任务的处理结果存在两种可能性，在每种任务结束后都要分别处理这两种情况

### Promise的解决方法

- **返回值穿透**：在回调函数中返回Promise，可以实现链式调用（*解决多层嵌套问题*）
- **错误冒泡**：前面产生的错误会一直向后传递，被catch接收到（*解决重复处理两种情况的问题*）

## 为什么Promise的回调是微任务

如果不引入`微任务`，则回调中的异步任务会加入宏任务队列，也就是所有宏任务的末尾，这会导致回调函数间隔很长时间才能执行。

理想情况应该是添加到**当前宏任务**的后面，因此引入了微任务。

## then和catch的位置关系

```js
new Promise((resolve, reject) => {
    reject(1)
}).catch(() => {
    console.log('catch')
}).then(() => console.log('then'))
// 输出：catch then
```

```js
new Promise((resolve, reject) => {
    reject(1)
}).then(() => console.log('then'))
.catch(() => {
    console.log('catch')
})
// 输出：catch
```

原因：`then`和`catch`执行后都会返回一个promise，所以这两个方法都可以链式调用。

`catch`中只要没有显示抛出错误，其返回的promise都是成功状态。

## 其他API

### Promise.resolve

接收一个参数value，返回一个`resolved`状态的promise实例，value会作为其成功回调函数的参数。

### Promise.reject

接收一个参数reason，返回一个`rejected`状态的promise实例，reason会作为其失败回调函数的参数

### Promise.all

- 接收一个元素为Promise（若不是，使用`Promise.resolve`进行转换）的数组。返回也是一个Promise
- 全部变为成功状态，执行then回调，接收参数为一个数组，即各个Promise元素提供的value。
- 只要有一个失败，则立即停止Promise.all的执行，并执行catch回调，接收reject提供的reason。


### Promise.race

- 接收一组promise，但只获取第一个执行完毕的实例的状态
