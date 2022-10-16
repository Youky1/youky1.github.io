---
category: 前端
tag:
    - JS
---

# EventLoop

## 单线程与异步

### JS为什么是单线程的

与用户的互动和操作DOM决定了JS只能用单线程。如果涉及多个线程，则在执行同步问题（如操作DOM）时需要加锁，非常繁琐



### 单线程带来的问题

**页面阻塞问题**。即进行需要大量耗时的任务时，页面的渲染会卡死，页面无响应，影响用户体验



### JS中有哪些操作是异步的

- 事件监听等各类回调函数
- 定时器操作
- AJAX数据请求
- Promise、async/await



### 为什么回调函数不能用try，catch捕获异常

捕获异常的函数在执行栈内，回调函数在任务队列内。

当回调函数加入执行栈执行的时候，捕获异常的函数已经从栈内退出了。所以异常无法捕获



## Event Loop

主线程从任务队列读取事件，这个过程是不断循环的，所以称为事件循环。

事件任务分为两类：**宏任务**、**微任务**。

事件循环的运行机制：

- 整个脚本作为一个宏任务首先执行
- 执行过程中：
    - 同步代码直接执行
    - 宏任务就加入宏任务队列
    - 微任务就加入微任务队列
- 当前宏任务执行完毕，执行微任务队列的所有任务。
- 从宏任务队列中取出下一个执行，重复上述过程。



### 宏任务

- 整体的script标签里的代码
- setTimeout / setInterval
- IO操作
- ajax请求



### 微任务

- Promise的回调（then/reject），以及以promise为基础开发的API：fetch等
- V8引擎的垃圾回收过程
- MutationObserver （ 用来监测DOM树的变化 ）
```js
var observerOptions = {
    childList: true,  // 观察目标子节点的变化，是否有添加或者删除
    attributes: true, // 观察属性变动
    subtree: true     // 观察后代节点，默认为 false
}
const oberver = new MutationObserver(function(){});
oberver.observe(document.getElementById('container'), observerOptions)
```
