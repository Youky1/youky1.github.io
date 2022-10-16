---
category: 前端
tag:
  - 前端工程化
---

# CommonJS 与 ES Module

## 模块化方案要解决的问题

- JS 文件的组织和维护问题
- 私有空间问题
- 作用域污染问题
- 理清管理模块间的依赖关系

## CommonJS

CommonJS 是一种社区提出的规范。以**同步阻塞**的方式加载模块

### 导出

导出一个对象

```js
module.exports = {
  key: value,
};
```

可以导出单独的属性

```js
module.exports.key = value;
```

此时可以省略 module

```js
exports.key = value;
```

省略 module 时，在用 exports 导出单个变量后，就无法在导出整个对象了

```js
exports.key = value;
exports.key2 = value2;
module.exports = {
  key3: value3,
};
// 只导出了key1和key2
```

### 导入

导入的值是其原始值的拷贝，可以对其进行修改。

```js
const { value } = require("./module.js");
const { value } = require("./module.js"); // 重复的导入会被忽略
value = "newValue"; // 修改不会改变原始值
```

### 缓存机制

为了防止多次导入使模块反复执行带来的问题，CommonJS 提供了缓存机制。

以模块绝对路径为 key，module 对象为 value 写入 cache 缓存。在引入模块时，会首先判断模块是否在 cache 内，若在则直接返回。

```js
// foo.js
module.exports = {
  foo: 1,
};

// bar.js

const foo = require("./foo");
foo.foo = 2;

const foo2 = require("./foo");
console.log(foo2.foo); // 2
console.log(foo == foo2); // true
```

## ES Module

在 ES6 中官方支持的模块系统。会在程序开始前先根据依赖关系找到所有模块，生成一个无环关系图

### 导出

在导出时定义：

```js
export let value = 1;
```

定义后一起导出：

```js
const v = 1;
const func = function() {
  ++v;
};
export { v, func };
```

### 导入

ES Module 的 import 导入是静态的，必须放在文件的开头。

导入的是原本值的引用。

```js
import { v, func } from "./module.js";
func();
console.log(v); // 2
```

## 二者区别

- CommonJS 的导入是动态的运行时导入，ESModule 的导入是静态的编译时导入（ES2020 新加了动态 import 函数）
- CommonJS 导入的值是原始值的拷贝，可以修改。ESModule 导入的值是存在映射关系的引用，不可修改
- 使用混合导出的语法时，CommonJS 会出现覆盖问题，而 ESModule 不会
- 兼容性：CommonJS 兼容性更好

## 为什么开发中两种方式可以混用

ESModule 会被打包工具处理为 CommonJS
