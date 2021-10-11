---
category: 前端
tag:
    - JS
---

# script标签的属性

## async和defer

浏览器默认同步加载script标签中的js脚本，因此当脚本体积较大时，页面会出现卡死的情况。

使用async或defer，可以实现异步加载。

二者的区别
- async：一旦脚本完成下载，会马上执行。**不会按script标签的顺序执行**。
- defer：等到整个页面的渲染正常完成（DOM渲染结束，其他JS脚本执行完成），**会按script标签的顺序执行**。

## type="module"

添加了`type="module"`的标签内的代码可以使用ES Module的`import`、`export`语法

执行顺序的效果等同于`defer`属性，会等渲染完成后按标签顺序执行。

若同时也添加了`async`属性，则会按`async`的逻辑执行
