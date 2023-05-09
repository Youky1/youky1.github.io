---
category: 前端
tag:
  - CSS
---

# BFC

> Block Formatting Contexts 块级格式化上下文

## 定义

具有 BFC 特性的元素，可以看成是隔离了的独立容器，容器里面的元素在布局上不会对外部产生任何影响。

并且，BFC 容器会有一些额外的特性

## 如何触发 BFC

- body 根元素
- 设置了浮动的元素：float 除 none 以外的值
- 绝对定位元素：position 取值为 absolute、fixed
- display 为 inline-block、flex 的元素
- overflow 取值除了 visible 以外的元素

## BFC 容器的特性

- 同一个 BFC 容器内，margin 会进行合并（上下外边距 100 的两个盒子，间距变为 100）
- BFC 容器可以包含浮动元素（清除浮动）。当内部元素设置浮动时，容器高度会坍塌。设置`overflow:hidden`触发 BFC 后，则不会出现坍塌
- 阻止元素被浮动元素覆盖：

```html
<!-- 文字环绕效果 -->
<div style="height: 100px;width: 100px;float: left;background: lightblue">
  我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px;background: #eee">
  我是一个没有设置浮动, 也没有触发 BFC 元素
</div>

<!-- 清除了浮动的覆盖 -->
<div style="height: 100px;width: 100px;float: left;background: lightblue">
  我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px;background: #eee;overflow:hidden">
  我是一个没有设置浮动, 但触发了 BFC 效果的元素
</div>
```
