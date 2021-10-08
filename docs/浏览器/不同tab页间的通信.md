---
category: 浏览器
---

# 不同Tab页间的通信

## Tab页间有依赖关系

方法：通过`window.postMessage`进行通信。

`postMessage`函数是绑定在window全局对象上的，因此必须有一个页面（比如A）可以获取另一个页面（比如B）的window。

这样在B中，可以监听`message`事件，并通过回调函数参数的source获取A的window对象

```js
// B页面
window.addEventListner('message',(e)=>{
    let {data,source,origin} = e;
    source.postMessage('message echo','/');
});
```

## Tab页属于同源范畴

对于互不相关的同源页面，可以对`localStorage`进行读写来实现通信（类似IPC中的共享内存方式）。

为了监听另一个页面对于`localStorage`的改变，可以监听`window`的`storage`事件。

## Tab间完全无关且非同源

引入一个`bridge.html`用于桥接：
- A和B分别通过iframe引入`bridge.html`，即可通过`postMessage`向该页面发送消息或接收消息
- 两个`bridge.html`间通过localStorage进行通信