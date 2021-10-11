---
category: 前端
tag:
    - 前端工程化
    - webpack
---

# webpack

## webpack解决了什么问题

如何在前端项目中高效的管理和维护项目中的每一个资源。

对于webpack的自定义设置，通过修改根目录的`webpack.config.js`文件

## 模块化的演进过程

### 第一阶段、文件划分
> 将不同模块放在不同的js文件中，再在全局依次引入

存在的问题：
- 模块直接在全局工作，污染全局作用域，容易产生命名冲突
- 没有私有空间，模块成员可能在外部被修改
- 无法管理模块间的依赖关系
- 难以分辨某个成员所属的模块

### 第二阶段、命名空间方式
> 将不同模块挂载到window的一个属性上

解决了命名空间问题，其他问题依旧存在

### 第三阶段、IIFE
> 利用立即执行函数

- 实现了私有变量
- 通过给立即执行函数传入参数实现依赖，可以在日后方便的判断模块的依赖关系

仍存在的问题：**模块的加载**

## loader和plugin的区别

- loader是加载器，用于将A文件编译为B文件，即进行**文件转换**。loader是一个函数，接收源文件为参数，返回目标文件。webpack本身只能处理JS文件，所以对于其他类型的文件就需要使用loader进行加载
- plugin用于扩展webpack的功能，可以控制**loader结束后**，打包的每个环节。是**基于事件机制**工作，会监听过程中的某些节点执行任务

## loader

webpack默认的loader只能加载`js`文件，要加载css等其他文件，就要给文件设置对应的loader。

### 设置方法

在配置的`module`属性中，添加`rules`属性，取值为一个数组。

每一项是针对某类文件使用的`loader`，包含两个属性：
- `test`：取值为正则表达式，表示匹配的文件类型
- `use`：使用的loader。
  - 如果只使用一个loader，取值为一个**字符串**
  - 如果使用多个loader，取值为一个**数组**。数组中的所有loader**从后向前**执行

### 使用css代码

要打包css代码，需要两种loader：
- css-loader：将css代码加载到js中，并不会使用
- style-loader：将css-loader转换后的结果，以style标签的形式，添加到页面

### 常用的loader

- 样式：
  - css-loader
  - style-loader
  - stylus-loader
- 编译：
  - babel-loader
  - ts-loader
  - eslint-loader
- 文件：
  - file-loader
  - url-loader

## plugin

目的：增强webpack**自动化构建**方面的能力

### 配置方法

- 引入插件（一般是一个构造函数）
- 在配置对象的`plugins`数组中添加（用new 实例化）

### 常见plugin

- 打包前清除dist目录
```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin);
module.exports = {
  plugins:[
    new CleanWebpackPlugin()
  ]
}
```
- 自动生成HTML
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins:[
    new HtmlWebpackPlugin({
      // 对于输出html的自定义配置对象
      title:'', // 页面title
      meta:{
        // meta信息
      }
    }),
    new HtmlWebpackPlugin({ // 打包输出多个html
      filename:'', // 输出的html文件名，默认是index.html
    }) 
  ]
}
```
- 将静态资源文件复制到打包后的目录
```js
const CopyWebpackPlugin = require('copy-webpack-plugin);
module.exports = {
  plugins:[
    new CopyWebpackPlugin([
      'public'  // 要打包的静态资源的目录
    ])
  ]
}
```
- 热更新插件：`HotModuleReplacementPlugin`
- 压缩打包后的输出文件：`terser-webpack-plugin`
```js
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```
- 注入一些会发生变化的值，如API地址
```js
// webpack.config.js
const webpack = require('webpack');
module.exports = {
  plugins:[
    new webpack.DefinePlugin({
      // 注入的值会作为字符串直接替换到代码中使用到的地方
      FOO_BAR: 'something'
    })
  ]
}
```
```js
// src/main.js
console.log(FOO_BAR); // 'something'
```
- 将打包结果自动发布到服务器

## webpack-dev-server

官方提供的开发服务器，提供了自动编译、热更新等功能

为了提高构建速度，webpack0-dev-server并不是将打包结果写入磁盘，而是暂存到**内存**中。

配置对象的devServer属性用来提供配置，[详细配置文档](https://webpack.js.org/configuration/dev-server/)
```js
// ./webpack.config.js
const path = require('path');
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
}
```

### 静态资源访问

除了构建过程中会被打包的资源，要让其它资源可访问，就要向contentBase传入静态资源的路径。

> 为什么不通过`copy-webpack-plugin`将静态资源加入打包结果？

使用`copy-webpack-plugin`会进行磁盘文件的写入，在开发过程中影响效率。

### Proxy代理

由于本地应用是运行在localhost的临时服务器上，一些生产环境下能直接访问的API在开发时会产生跨域问题。

在devServer中添加proxy属性，其取值为一个对象。

将`http://localhost:8080/api/foo`代理到`https://api.github.com/foo`
```js
// ./webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': { // 代理/api开头的请求。即为了代理所有请求，将所有请求的开头添加一个/api
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 替换掉代理地址中的 /api
        },
        changeOrigin: true // 确保请求 GitHub 的主机名就是：api.github.com
      }
    }
  }
}
```

### 热更新

对于样式文件的更新，提供了开箱即用
```js
// ./webpack.config.js
const webpack = require('webpack')
module.exports = {
  devServer: {
    hot: true,      // 开启 HMR 特性，如果资源不支持或代码报错，会回退到直接刷新
    hotOnly: true   // 只使用 HMR，不会回退
  },
  plugins: [
    // HMR 特性所需要的插件
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

> 回退到直接刷新会怎么样？

直接刷新后，将无法看到代码中的报错

## Tree Shaking
> 在打包结果中筛选掉未引用的代码（**不是整个模块，其中的副作用代码仍会生效**）

在`production`模式下会自动开启。在非生产模式下设置`optimization`：
- `usedExports`设置为true，表示只导出使用到的成员
- `minimize`设置为true，表示压缩代码
```js
module.exports = {
  optimization:{
    usedExports: true,
    minimize: true
  }
}
```

### 使用babel-loader后Tree Shaking失效问题

在某些版本的`babel-loader`中，会将ESModule代码编译为CommonJS形式。
> 最新版的babel-loader中，会根据环境禁用对ES Module的转换，因此不会带来这个问题

而webpack中Tree Shaking的前提是ES Module代码，因此可能导致其失效

## sideEffects
> 完整移除整个没有使用的模块

在`production`模式下会自动开启。在非生产模式下：
- 设置`optimization.sideEffects:true`
- 在`package.json`中添加`sideEffects`属性
  - 取值为false，表示所有模块都没有副作用
  - 取值为数组，每个元素表示需要保留副作用的路径

## SourceMap
> 提供源代码和打包后代码间的映射关系

目的：在有报错时能找到源码中对应的位置

通常sourceMap文件以.map结尾，是一个JSON格式的对象。

在打包后的代码中，通过注释的形式引入SourceMap文件
```
//# sourceMappingUrl=xxx
```

配置方法：修改配置对象的`devtool`属性决定选用的模式。不同的模式决定了构建速度和品质的不同。


### eval模式

将模块放在eval函数中，通过添加注释的方法来判断属于哪个源文件。

优点：没有生成sourceMap，构建速度最快

缺点：只能定位到文件，不能定位到具体的行列

### eval-source-map模式

生成了sourceMap，可以反推到源码中的行列信息

### cheap-eval-source-map模式

只能定位到行，不能定位到列。构建速度比`eval-source-map`更快

### cheap-module-eval-source-map

定位到的是未经转换的源码

### nosources-source-map

能看到错误位置，但点进去看不到源代码

### 总结

- 带source-map的是生成了sourceMap文件的
- 带cheap的构建更快，但不能定位到列
- 带module的是定位到未经过Loader加工的源码，不带module的是经过loader加工的

在开发中，优先选用`cheap-module-eval-source-map`：
- 对于React和Vue等框架，经过loader转换后的代码会有很大的变化，无法定位问题
- 养成良好的编码习惯一行不会有太多内容，定位到行足够找出问题了

在上线版本中，选用`none`，即不生成sourceMap：
- 调试应该是开发中的事，不应在上线代码中debug
- 生成sourceMap会暴露源代码，带来安全隐患


## Code Splitting（分块打包）

### 分包的原因

打包结果太过集中的弊端：
- 打包结果的体积太大
- 不能做到按需加载，影响首屏时间

打包结果太过分散的弊端：
- 多次请求本身会有延迟
- 每次请求的请求头带来额外的带宽消耗

webpack实现分包的方式有两种：
1. 多入口，多出口
2. 根据ES Module的动态导入特性，按需加载模块

### 多入口打包

多用于传统的`多页应用`，一个页面对应一个打包入口。对于不同页面的公共部分，提取到公共结果中。

1. 首先，在entry中设置多个入口
2. 修改output，`[name]`作为占位符表示入口名称
3. 设置HtmlWebpackPlugin的chunks属性，使其只加载对应的文件
4. 设置`optimization.splitChunks.chunks`为`'all'`，表示将公共部分自动分包

```js
module.exports = {
  entry: {
    index: './src/index.js',
    foo: './src/foo.js'
  },
  output: {
    filename: '[name].bundle.js' // [name] 是入口名称
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:['index.html'],
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      filename:['foo.html'],
      chunks:['foo']
    })
  ],
  optimization:{
    splitChunks:{
      chunks: 'all'
    }
  }
}
```

### 动态导入

使用ES Modules的`import`函数，无需其他配置即可完成。

#### 魔法注释

如果需要给动态导入的模块命名，可以在import函数中添加行内注释。格式为`/* webpackChunkName: 'name' */`。

```js
import(/* webpackChunkName: 'foo' */'./foo/foo')
.then(({ default: foo }) => {
  // do something with foo...
})
```

如果两个模块的注释一样的话，会打包到一个文件中，借助这个特点可以自己更加细致的控制分包的结果。

