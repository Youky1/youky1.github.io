> 使用js的方式写css样式

# 基础用法

## 全局样式

1. 使用`createGlobalStyle`方法生成一个组件，它会将样式注入全局作用域

```js
import { createGlobalStyle } from 'styled-components';
export const Body =  createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
    }
`
```

2. 在项目的APP根组件中引入样式组件并使用

```js
import { Body } from './style.js'
function App() {
  return (
    <div>
      <Body />
      <Header/>
    </div>
  );
}
```



## 局部样式

1. 首先引入`styled`，利用`styled`可以创建附带样式的组件，可以指定为各种标签

```js
import styled from 'styled-components';
export const HeaderWrapper = styled.div`
    height: 55px;
    border: 1px solid #f0f0f0;
`
```

2. 在组件中，引入样式组件，像正常组件一样使用



# 引用图片的方法

在样式组件中直接使用`url()`的方法引入图片的话，会出现路径的问题，此时要先用import引入图片，再用插值表达式的形式插入样式字符串中

```js
import logo from './logo.png';
import styled from 'styled-components';
export const Logo = styled.div`
	background: url(${logo})
`
```



# 引用其他组件

在组件中使用插值表达式的方法可以引用其他组件，达到修改其他组件样式的目的

```js
export const StyledA = styled.a`
    font-size: 20px
`
// 鼠标悬停后，超链接文字变为红色
export const Button = styled.button`
    &:hover + ${StyledA}{
        color: red;
    }
`
<Button></Button>
<StyledA></StyledA>
```



# 对象形式的样式

除了使用字符串，还可以使用对象传入styled的一系列构造函数

```js
const Box = styled.div({
  background: 'palevioletred',
  height: '50px',
  width: '50px'
});
```

或是传入一个函数，以便使用props：

```js
const PropsBox = styled.div(props => ({
  background: props.background,
  height: '50px',
  width: '50px'
}));
```





# 给标签添加属性

要创建一个带样式的a标签，给它添加href的方法有两种：

1. 在导出的组件上添加属性

```js
<StyledA href = 'url'>
```

2. 使用`attrs`方法直接为样式组件添加属性。之后仍是正常的添加其他属性

```js
export const Link = styled.a.attrs({
    href: '/'
})`
	color: #000
`
```



## 动态效果

`attrs`函数还可以接收一个函数，读取组件的props以实现动态的样式效果

```js
const button = styled.button.attrs(props => {
    font-size: props.size || 14px
})`
	border: none;
`
```



## 覆盖

如果使用了继承，则子组件的`attrs`会覆盖父组件的`attrs`



# 给组件传递属性

因为用styled创建的实际上就是`React组件`，因此可以在创建时读取其props属性，用插值表达式实现动态的样式

```js
const Title = styled.div`
	color: ${props => props.color ? props.color : '#000'};
`
```

使用时：

```html
// 黑色标题
<Title>title</Title>

//红色标题
<Title color='red'>red title</Title>
```



# 共享样式

使用`css`API，可以创建一个css片段，在其他组件中使用插值表达式的方式引入该片段，可以实现公共样式的抽离

```js
import {css} from 'styled-components'
const red = css`
    color: red;
`
export const RedTittle = styled.div`
    font-size: 1.5rem;
    ${green}
`
```



# 继承已有样式

以一个组件作为父类，创建继承其样式的组件：

```js
const Button = styled.button`
	color: #777;
`
const BigButton = styled(Button)`
	font-size: 24px;
`
```



如果要继承样式，但是需要更改标签名，则可以在使用时传入一个`as`属性，来动态更改标签。`as`的取值可以是标签名，也可以是自定义组件

```js
const RedText = styled.p`
	color: red
`
const RedButton = styled(RedText)`
	font-size: 20px
`

// 使用：
<RedButton as='button'>button</RedButton>
```

```js
const ReversedButton = props => 
				<Button {...props} children{props.children.split('').reverse()} />

<Button as={ReversedButton}>123</Button>
// 显示321
```



# 嵌套、伪元素、伪类

- styled-components使用的预处理器`stylis`支持样式的直接嵌套（类似`sass`）。

- 在嵌套层级中，使用`&`符号代表父级元素，以此来添加其伪元素和伪类选择器
- 样式覆盖：两个`&`符号可以表示当前为当前元素增添高优先级的样式（两个class的优先级，大于class小于id）

```js
const Container = styled.div`
	display: flex;
	.item{
		flex: 1;
	}
	&:hover{
		border: 1px solid #777
	}
	&&{
		margin: 0;
	}
`
```



# keyframe动画

keyframe动画不属于某一个组件，但为了不定义到全局作用域形成命名污染，提供了`keyframes`API进行动画的定义。然后在组件中引用该动画，即可将动画效果封装至组件

```js
const rotate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
  }
`

export const RotateWrapper = styled.div`
    animation: ${rotate} 1s infinite;
`
```



# 主题

> 为组件注入某一系列的主题变量

1. 使用props.theme.xx变量为样式赋值。对于组件可以设置默认主题

```js
const Button = styled.button`
	color: $(props => props.theme.color);
`
Button.defaultProps = {
    theme: {
        color: '#000'
    }
}
```

2. 引入`ThemeProvider组件`，并传入`theme属性`，其内部的组件的`props.theme`都可以读取到这个theme对象的值。`ThemeProvider组件`支持嵌套
3. `theme属性`的取值可以是对象，也可以是函数，当取值为函数时，接收其父级`ThemeProvider组件`提供的`theme对象`，并返回本级的`theme对象`
4. 在组件上也可以直接使用`theme属性`，可用于覆盖`ThemeProvider组件`提供的主题

```jsx
const themeObj = {
    color: 'red'
}
const func = (pre) => {
    return {
        colro: 'green'
    }
}
<div>
    <Button>此处颜色为defaultProps中的颜色#000</Button>
    <ThemeProvider theme={theme}>
        <Button>此处颜色为red</Button>
        <ThemeProvider theme={func}>
            <Button>此处颜色为green</Button>
        </ThemeProvider>
    </ThemeProvider>
</div>
```



## 在普通组件中使用主题

- 引入`withTheme`方法
- 导出组件时，调用`withTheme`方法并导出其结果

```js
import { withTheme } from 'styled-components';
class MyComponent extends React.Component {
  render() {
    console.log('Current theme: ', this.props.theme);
    // ...
  }
}
export default withTheme(MyComponent);
```



## 在useContext中使用主题

```js
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const MyComponent = () => {
  const themeContext = useContext(ThemeContext);

  console.log('Current theme: ', themeContext);
  // ...
}
```

