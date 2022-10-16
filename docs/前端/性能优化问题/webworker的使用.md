---
category: 前端
tag:
  - 性能优化
  - JS
---

# Web Worker 的使用

## 1. 意义

由于 JS 是单线程的，费时的 JS 操作将会导致整个页面的阻塞。Web Worker 提供了创建多线程的方法，将一些耗时且 UI 无关的工作交给 worker，可提高页面的使用体验。

限制：

- 同源策略：worker 线程执行的脚本要和当前页面同源
- API 限制：
  - 不能操作 DOM
  - 不能使用 window 的全局变量，但可以使用 navigator 和 location 对象
  - 不能使用 alert、confirm 方法
  - 无法读取本地文件
- 和主线程不在一个上下文环境，通讯要通过 `postMessage` 完成

## 2. 主线程的使用

### 创建

创建一个子线程，要传入一个脚本的 URL。如果该脚本加载失败，则 Worker 会静默失败

```JS
const worker = new Worker('url');
```

如果要在本文件中描述执行的内容，可以用 Blob 和 window.URL.createObjectURL 生成一个 URL

```JS
function createWorker(f) {
  const blob = new Blob(['(' + f.toString() +')()']);
  const url = window.URL.createObjectURL(blob);
  const worker = new Worker(url);
  return worker;
}
```

### 通信

1. 主线程 => 子线程

```JS
worker.postMessage(param);
```

参数可以是任意类型，包括二进制数据。但传递是拷贝形式而不是引用形式。因此对于大数据会存在性能问题。

2. 子线程 => 主线程

```JS
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
}
```

### 错误处理

```JS
worker.onerror(function (e) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});
```

### 关闭

```JS
worker.terminate();
```

## 3. 子线程的使用

子线程中无法使用 window，`self` 代表全局对象

### 和主线程的通信

1. 主线程 => 子线程

```JS
self.addEventListener('message', function (e) {
  self.postMessage('Received: ' + e.data);
}, false);
```

2. 子线程 => 主线程

```JS
self.postMessage('something');
```

### 加载其他脚本

在子线程中加载其他脚本：

```JS
importScripts('script1.js', 'script2.js');
```

### 关闭

```JS
self.close();
```
