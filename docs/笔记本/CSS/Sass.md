完全兼容 css3（是 css 的超集）。

# 注释

- 多行注释`/**/`会被编译到 css 文件中
- 单行注释`//`不会被编译到 css 中

# 嵌套

支持嵌套的 css 结构：

```scs
.title{
	font-size:20px;
	.icon{
		font-size:22px
	}
}
```

嵌套中可以使用父选择器，用`&`指代父级选择器元素

```css
.title {
  color:#fff &:hover {
    color: #777;
  }
}
```

# 变量

以`$`符号开头，用冒号赋值

```scss
$bg-color: #fff;
div {
  background-color: $bg-color;
}
```

- 在嵌套规则内定义的变量，只能在嵌套作用域内使用。

- scss 支持变量或字面量做加减乘除运算

## 插值语句

使用`#{}`进行插值，可以使用变量的值。

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
```

编译为：

```css
p.foo {
  border-color: blue;
}
```

# @media

媒体选择器可以在 css 的嵌套内部使用：

```scss
#box {
  width: 300px;
  @media screen and (min-width: 900px) {
    width: 500px;
  }
}
```

编译为：

```css
#box {
  width: 300px;
}
@media screen and (min-width: 900px) {
  #box {
    width: 500px;
  }
}
```

# 继承

使用场景：一个选择器的样式是另一个选择器的子集。如错误提示和严重错误提示。一般做法是全部添加`.error`，严重错误添加`.serious-error`。若使用继承可以做到区分使用两种选择器：

```scs
.error {
	color: red;
}
.serious-error {
	@extend .error;
	font-weight: bold;
}
```

这样使用`.serious-error`的地方不必再使用`.error`

可以用来继承任何选择器。

# 混合指令 mixin

用于定义重复的样式，避免使用无意义的 class

- 可以使用参数
- 参数可以赋默认值

```scss
@mixin large-text($color: #000, $family) {
  font-size: 24px;
  color: $color;
  font-family: $family;
}
.title {
  @include large-text;
}
```

# 自定义函数

和 mixin 的区别：函数有返回值，作为某个属性的一部分。而 mixin 直接完整定义了属性。

```scss
$basic-width: 100px;
@function get-width($n) {
  @return $n * $basic-width;
}
#box {
  width: get-width(4);
}
```
