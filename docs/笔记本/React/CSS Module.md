# CSS Module要解决的问题

CSS没有作用域的概念，因此直接引入的样式文件默认都是全局的。React中的CSS没有局部作用域，因此会带来：

- 全局污染：一个组件中的样式，可能会覆盖全局作用域中其他组件的样式
- 命名冲突：多个样式文件中，相同的类名可能相互覆盖



***CSS Module仅处理类选择器***



# 使用方法

## 局部样式

在最新版的`create-react-app`创建的项目中，已经自带了对于`CSS Module`的支持：

1. 对于局部样式，命名时使用`xxx.module.css`的格式
2. 在引入样式时，引入一个对象的形式，并用它的属性进行赋值

```js
import style from './index.module.css';

<div className={style.title}></div>
```



## 全局样式

- 使用传统的命名方法并直接引入
- 在`xxx.module.css`中，使用`:global()`语法

```css
:global(.title) {
    color: redl;
}
```



