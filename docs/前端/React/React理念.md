---
category: 前端
tag:
  - React
---

# React 理念

## 制约网页快速响应的两个场景

两者的核心都在于：将同步的更新变为可中断的异步更新。

### CPU 瓶颈

**原因**：

由于 JS 线程和 GUI 线程不能同时执行，当页面复杂，显示内容多时，一次渲染中 JS 执行需要的时间超过浏览器刷新一帧的时间，就可能导致掉帧。

**解决办法**：

时间切片

即在浏览器每一帧的时间中，预留一些时间给 JS 线程（[默认是 5ms](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)）。
当预留的时间不够用时，React 将线程控制权交还给浏览器使其有时间渲染 UI，等待下一帧继续未完成的工作

### IO 瓶颈

IO 瓶颈受限于网络延迟，是前端无法解决的。一种优化思路是触发异步 IO 时，间隔“一小段时间”，再跳转。
如果这个间隔足够短，就不显示 loading，以达到让用户无感的目的。
为此，React 实现了 Suspense 组件，用于控制异步组件加载。及配套的 [useDeferredValue](https://react.dev/reference/react/useDeferredValue)

#### 关于 useDeferredValue

useDeferredValue 用于延迟更新一部分的 UI。

useDeferredValue 接收一个原始值 A，返回这个值的延迟版本 B：

- 首次渲染时，B 和 A 一样
- 当 A 改变触发更新时，React 会进行两次 re-render，第一次时 B 还是更新前的 A，第二次 re-render 时 B 会变为更新后的 B

保留延迟版本的使用场景（也是官网给的两个例子）：

- 在新数据加载过程中，显示原来的老数据

```js
export default function App() {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  )
}
```

- 对于一部分渲染比较耗时的 UI，将其延迟更新，以保证其他部分流畅渲染。比如根据输入框内容渲染长列表，每次输入时都会整个重新渲染导致输入卡顿。使用 useDeferredValue 可以将列表的渲染延迟，保证输入框的输入流畅

```js
import { useState, useDeferredValue } from "react"
import SlowList from "./SlowList.js"

export default function App() {
  const [text, setText] = useState("")
  const deferredText = useDeferredValue(text)
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  )
}
```
