---
category: 前端
tag:
  - TS
---

# type 和 interface 的异同点

> interface 就是描述对象对外暴露的接口，其不应该具有过于复杂的类型逻辑，最多局限于泛型约束与索引类型这个层面。而 type alias 就是用于将一组类型的重命名，或是对类型进行复杂编程

相同：

1. 都可以用于描述对象类型、函数类型、Class 类型

不同：

1. 在进行扩展时：interface 使用 extends，type 使用交叉类型（接口继承的性能更好）
2. 同名的 interface 会合并，type 不会
3. interface 无法表示元组、联合类型等其他类型或复杂的类型工具
