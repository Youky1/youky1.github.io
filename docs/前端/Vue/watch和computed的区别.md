---
category: 前端
tag:
    - vue
---

# watch和computed的区别

- computed是计算出一个新的属性并挂载到vue实例。watch是监听已存在的属性，所以watch同样可以监听computed计算出的属性
- computed是**惰性的**，**只有当这个计算属性被实际使用时才会进行计算**。否则即使其依赖的值发生了改变，也不会执行
- watch中可以执行异步操作，而computed中不可以（因为要返回一个值，无法等待异步操作完成）
- 使用场景上的不同：computed适用于依赖多个值进行计算；watch适用于当值发生改变时执行某些操作