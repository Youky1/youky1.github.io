---
category: 前端
tag:
  - JS
---

# ES6 有哪些新特性

- const、let
- Symbol
- Map、Set
- Promise
- async/await
- Class
- Proxy
- Reflect
- 解构赋值
- 模板字符串
- 箭头函数
- 扩展运算符
- ES Module

## 如何理解 Decorator

### 定义

Decorator 即装饰器语法，用于扩展类的属性、方法。在 `nestjs`、`vue-class-component` 中都有广泛使用。

装饰器是一个函数，装饰器语法本质上等于对类调用装饰器函数

```JS
@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;
```

### 用法

### 修饰类

修饰类的装饰器，会接受一个 target 参数，表示其修饰的类。

```JS
@testable
class MyTestableClass {
  // ...
}
function testable(target) {
  target.isTestable = true;
}
MyTestableClass.isTestable // true
```

如果装饰器函数要接受参数，则嵌套一个外层函数。

```JS
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```

### 修饰类属性

接受原型对象（当前对象还未实例化）、属性名、该属性的描述对象

```JS
function readonly(target, name, descriptor){
  descriptor.writable = false; // 将可写属性设为false
  return descriptor;
}
class Person {
  @readonly
  name = 'read only name'
}
```
