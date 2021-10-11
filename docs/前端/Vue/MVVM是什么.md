---
category: 前端
tag:
    - vue
---

# MVC、MVP、MVVM分别是什么

## MVC

> 模型Model、视图View、控制器Controller

- View传送指令到Controller
- Controller完成业务逻辑，并要求Model改变状态
- Model将新的数据发送给View，即用户得到了反馈 



## MVP

将MVC中的Controller改成了**Presenter**，同时改变了通信方向。

- View和Presenter之间，Presenter和Model之间进行双向通信
- View层非常薄，不负责任何逻辑，称为被动视图。
- Presenter层非常厚，负责了所有的业务逻辑



## MVVM

> Model–View–ViewModel 

源自于MVC模式，促进了前后端业务逻辑的分离。

### View

View是视图层，负责构建页面并与用户交互

### Model

Model是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的api接口

### ViewModel

ViewModel是MVVM的核心。

在这一层，对Model层获取的数据进行转换和二次封装，来满足View层的需要。

ViewModel所封装的数据模型包括视图的**状态**和**行为**两部分。而Model层只包含状态信息

- 视图状态：页面某个位置显示的内容
- 视图行为：页面和用户的交互

在MVVM框架中，ViewModel层和View层实现了双向绑定，即ViewModel中的内容会自动显示在View中，开发者只需要维护ViewModel层，视图即可自动更新