---
category: 前端
tag:
    - CSS
---

# CSS疑难杂症

## BFC
> Block Formatting Contexts 块级格式化上下文

### 定义

具有BFC特性的元素，可以看成是隔离了的独立容器，容器里面的元素在布局上不会对外部产生任何影响。

并且，BFC容器会有一些额外的特性

### 如何触发BFC

- body根元素
- 设置了浮动的元素：float除none以外的值
- 绝对定位元素：position取值为absolute、fixed
- display为inline-block、flex的元素
- overflow取值除了visible以外的元素

### BFC容器的特性

- 同一个BFC容器内，margin会进行合并（上下外边距100的两个盒子，间距变为100）
- BFC容器可以包含浮动元素（清除浮动）。当内部元素设置浮动时，容器高度会坍塌。设置`overflow:hidden`触发BFC后，则不会出现坍塌
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

## 两列自适应布局（左侧固定宽度，右侧自适应占满剩余空间）
> 描述：左侧固定宽度（比如100px），右侧占满剩余宽度

- 左侧元素设置固定width和浮动
- 右侧触发BFC

```html
<div style="height: 100px;width: 100px;float: left;">
    左侧固定元素
</div>
<div style="height: 200px;overflow:hidden;background-color:#777">
    右侧自适应元素
</div>
```

## 三列自适应布局（左右固定宽度，中间自适应），且中间元素要最先加载（标签写在前面）

- 用`order`属性控制元素的顺序
- 用`flex-grow:1`实现中间元素的自适应宽度
```html
<style>
        div{
            height: 200px;
        }
        #container{
            display: flex;
            width: 100vw;
        }
        .left{
            order: 1;
            width: 100px;
        }
        .middle{
            order: 2;
            flex-grow: 1;
        }
        .right{
            order: 3;
            width: 100px;
        }
</style>
<body>
    <div id="container">
        <div class="middle">2</div>
        <div class="left">1</div>
        <div class="right">3</div>
    </div>
</body>
```

## rem、em、rpx等相对单位

- `rem`：相当于html根元素的字号大小（font-size）
- `em`：相对于父级元素的字号大小
- `rpx`（微信小程序）：屏幕宽度始终认为是为750rpx。如在iPhone 6中，屏幕宽度为375px，则在iPhone 6中`1rpx = 0.5px`

## 伪类、伪元素

### 伪类选择器
> 用于选择处于特定状态的元素，表现的就像是给某些元素添加了class一样

特点：以冒号`:`开头

常见伪类：
- `:hover`：鼠标悬停
- `:focus`：元素激活
- `:first-child`：第一个子元素
- `:invalid`：内容未经验证的表单元素
- `:link`、`:active`、`:visited`等用于a标签的不同状态

### 伪元素选择器
> 表现类似是在HTML中添加了一些标签

特点：以双冒号`::`开头

常见伪元素：
- `::first-line`：第一行
- `::before`：在前面插入一些内容
- `::after`：在后面插入一些内容

```css
/* 在末尾添加内容 */
.title::after{
    content:'。'
}

/* 在开头添加内容 */
.title::before{
    content:'  '
}
```

### 二者的区别

- 表示方法的不同：一个用冒号，一个用双冒号
- 定义不同：伪类操作的是文档中已有的元素；伪元素创建一个文档中没有的元素

## 标准盒子模型和IE盒子模型的区别

盒子模型中，宽度（高度同理）一共分为四部分：
- `content`：内容宽度
- `padding`：内边距
- `border`：边框
- `margin`：外边距

两种盒子模型的区别
- **标准盒子模型**中，宽度等于content
- **IE盒子模型**中，宽度等于content + padding + border

更改计算方法：`box-sizing`属性。
- content-box：标准模型
- border-box：IE模型
- inherit：继承父元素的取值



## css像素、设备像素、设备独立像素、DPR、PPI的关系

### css像素

css像素是一种抽象单位，在不同的设备或不同的环境（缩放等级）下会有所不同。

css像素的单位px是一个**相对单位**，当PPI或DPR变化时，`1px`的大小会发生改变

### 设备像素

即设备的物理像素，一块屏幕的物理像素是不变的，单位是`pt`。

### 设备独立像素

与设备无关的**逻辑像素**，是一个总体概念，包括css像素。

一个设备独立像素可能包括一个或多个物理像素点，越多屏幕越清楚。

### DPR

设备像素比，定义为 设备像素 / 设备独立像素

- 当DPR = 1时，用1个设备像素（1 * 1）显示1个css像素（1px * 1px）
- 当DPR = 2时，用4个设备像素（2 * 2）显示1个css像素

### PPI

每英寸像素，表示每英寸包含的像素点数目，即像素密度。数值越高，屏幕越清晰

### 总结

无缩放情况下：
- 1个css像素 == 1个设备独立像素
- 1个设备独立像素 == 1个设备像素（PC端以及移动端的标准屏幕下）

## 最常用的4种居中方法
```html
<div class="container">
    <div class="item"></div>
</div>
```

### 宽高未知

#### flex布局

```css
.container{
    display: flex;
    justify-content: center;
    align-items: center;
}
```

#### top、left + transform

```css
.container{
    position: relative;
}
.item{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### 宽高已知

#### margin: auto

```css
.container{
    width:500px;
    height:300px;
    border:1px solid #0a3b98;
    position: relative;
}
.item{
    /* 若不设置宽高则子元素会占满父容器*/
    width:200px; 
    height:200px;
    background: #f0a238;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
}
```

#### top、left + 负margin
```css
.container{
    position: relative;
}
.item{
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left:-20px;
    position: absolute;
}
```


## link标签的加载会和script一样影响DOM渲染吗？

- CSS的加载**不会阻塞DOM的解析**
- CSS的加载**会阻塞DOM的渲染**
- CSS的加载**会阻塞JS语句的执行**
