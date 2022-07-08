# 基本语法

## 选择器

- 省略了大括号，用缩进代替

- 省略了冒号，用空格代替

- **父级选择器：**用子集选择器中，用你&代替父级选择器

## 变量

使用@访问属性值：

```
#logo
  position: absolute
  top: 50%
  left: 50%
  width: 150px
  height: 80px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)
```

有条件判断的使用属性值：只有当 z-index 之前从没有设置时，才把 z-index 设置为 1。

此时会向上层冒泡寻找，找到 z-index，或返回 null（设置为 1）

```
position()
  position: arguments
  z-index: 1 unless @z-index
```

## 插值

在{}放置变量或字符串，实现插值。

eg：

`-webkit-{'border' + '-radius'}`等同于`-webkit-border-radius`

使用在函数中：

```
vendor(prop, args)
  -webkit-{prop} args

border-radius()
  vendor('border-radius', arguments)

// 等价于
border-radius()
	-webkit-border-radius arguments
```

## 混入和函数

**区别：**

- 混合在内部设置各项属性，这些属性会复制到调用混合的地方
- 函数在内部进行运算，有返回值。调用时将返回值赋值给需要的属性

**共同点：**

- 定义的语法相同

- 都可以设置默认参数

```
func(c = #fff)
	color c
```

- 支持关键字参数
- 支持设置剩余参数，可以用 args 一次性设置多个值

```
func(arg1，args...)
```

- 支持设置全部参数

  > 意义：当 args 接收的参数是用逗号分开的时，使用时会忽略中间的逗号（用空格连接所有属性值）

```
func()
	font arguments
```

**函数特征**：

- 可以返回多个值，空格隔开即可

- 可以将函数作为参数传入另一个函数

# Vue 全局引入

1. 在 main.js 中引入全局 styl 文件
2. 修改 vue.config.js 文件：

```
module.exports = {
    css:{
        loaderOptions:{
            stylus:{
                import: '~@/assets/main.styl'
            }
        }
    },
}
```
