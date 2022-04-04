# 核心概念

## entry

> 打包的入口

打包项目时，entry为指定的打包入口，从入口文件开始构建**_依赖图_**，来将所有被引用的文件进行打包。

entry的取值分为两种情况：

- 单入口：取值为字符串
- 多入口：取值为对象



## output

> 打包的输出

对于单入口和多入口打包：都只指定一个输出的`filename`和`path`。

当具有多个入口时，默认输出到dist目录下，文件名同入口文件名。

可以通过文件占位符（`[name]`）来表示入口文件名，并在此基础上进行修改，来区分打包结果的名称



## loader

> 加载资源

webpack原生只支持`js`和`json`两种文件格式，通过loader可以将其他类型的资源转化成有效的模块，添加到依赖图中。



**`loader`的本质是函数**，接收源文件作为参数，返回转换的结果。



**常用的loader：**

- babel-loader：转换ES6语法
- css-loader / less-loader：转换样式文件
- ts-loader：将TS转换为JS
- file-loader：打包文件（图片、字体等）
- raw-loader：将文件以_字符串_的形式导入
- thread-loader：进行多线程打包



**用法：**

在导出对象中，`module.rules`是一个数组，其中的每一项含有两个属性：

- `test`：指定匹配规则（eg：`/.js$/`）
- `use`：指定对该类文件要使用的loader名称



## plugin

> 增强webpack功能

