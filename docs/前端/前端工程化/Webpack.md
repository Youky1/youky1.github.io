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



## 核心概念

### entry

> 打包的入口

打包项目时，entry为指定的打包入口，从入口文件开始构建**_依赖图_**，来将所有被引用的文件进行打包。

entry的取值分为两种情况：

- 单入口：取值为字符串
- 多入口：取值为对象



### output

> 打包的输出

对于单入口和多入口打包：都只指定一个输出的`filename`和`path`。

当具有多个入口时，默认输出到dist目录下，文件名同入口文件名。

可以通过文件占位符（`[name]`）来表示入口文件名，并在此基础上进行修改，来区分打包结果的名称



### mode

用来指定当前的环境，取值有：

- production
- development
- none

**作用：**自动开启webpack内置的函数，在不同模式下开启不同的功能



### loader

webpack默认的loader只能加载`js`和`JSON`文件，要加载css等其他文件，就要给文件设置对应的loader。

#### 设置方法

在配置的`module`属性中，添加`rules`属性，取值为一个数组。

每一项是针对某类文件使用的`loader`，包含两个属性：
- `test`：取值为正则表达式，表示匹配的文件类型
- `use`：使用的loader。
  - 如果只使用一个loader，取值为一个**字符串**
  - 如果使用多个loader，取值为一个**数组**。数组中的所有loader**从后向前**执行

#### 使用css代码

要打包css代码，需要两种loader：
- css-loader：将css代码加载到js中，并不会使用
- style-loader：将css-loader转换后的结果，以style标签的形式，添加到页面

#### 常用的loader

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

### plugin

目的：增强webpack**自动化构建**方面的能力

#### 配置方法

- 引入插件（一般是一个构造函数）
- 在配置对象的`plugins`数组中添加（用new 实例化）

#### 常见plugin

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



### loader和plugin的区别

- loader是加载器，用于将A文件编译为B文件，即进行**文件转换**。loader是一个函数，接收源文件为参数，返回目标文件。
- plugin用于扩展webpack的功能，可以控制**打包的每个环节**。是**基于事件机制**工作，会监听打包过程中的某些节点，并执行任务



## 常见文件的解析

### ES6

webpack可以加载JS代码，但对于ES6的高级语法，需要使用`babel-loader`进行转换。

1. 首先，在`module.rules`中添加`{ test: /.js$/, use: "babel-loader" }`
2. 创建`.babelrc`文件：

```js
{
  "presets": ["@babel/preset-env"]
}
```



### css / sass

解析css需要至少两个loader：

- `css-loader`：加载.css文件，并转换为commonjs对象
- `style-loader`：将样式通过style标签插入`head`标签中
- `MiniCssExtractPlugin.loader`：将css提取到独立的css文件

```js

{
    test: /.css$/, 
    use: [
        'style-loader',
        'css-loader',
    ]
},

```



#### sass/stylus/less

对于`sass`等预处理器代码，需在末尾再添加一个对应处理器的loader：

```js
{
    test: /.sass$/, 
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
}
```



#### 前缀自动补齐

使用`postcss-loader`可以自动生成如`-webkit-`等兼容性样式前缀

```js
{
    test: /.sass$/, 
    use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => require('autoprefixer')({
                    browsers: ['>1%', 'IOS 7']	// 需要兼容的浏览器类型
                })
            }
        }
    ]
}
```



### 图片 / 字体

对于非代码文件，可以使用`file-loader`

```js
{
    test: /.(jpg|png)$/,
    use: "file-loader",
},
{
    test: /.woff$/,
    use: "file-loader",
}
```

也可以使用`url-loader`，其作用和file-loader类似，但是可以将小图片转换为base64格式：

```js
{
  test: /.(jpg|png)$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 10240, // 10KB以下的图片会转为base64格式
    },
  },
},
```



## 文件监听

### 原理

持续的轮询判断文件的**最后编辑时间**是否发生变化，检测到变化后不会立即告诉监听者，而是先进行缓存，等待一个`aggregateTimeout` 后统一处理。

**缺点：**需要手动刷新浏览器才能更新。

解决办法：热更新（dev-server）



### 配置

```js
{
    watch: true,					// 开启文件监听，默认false
    watchOptions: {
    	ignored: /node_module/,		// 忽略这部分的变化
    	poll: 1000,					// 每秒轮询次数，默认1000次
    	aggregateTimeout: 300,		// 监听到变化后的延迟，默认300ms
  	},
}
```





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

使用`copy-webpack-plugin`会进行磁盘IO，在开发过程中影响效率。

### Proxy代理

由于本地应用是运行在localhost的临时服务器上，一些生产环境下能直接访问的API在开发时会产生跨域问题。

在devServer中添加proxy属性，其取值为一个对象。

将`http://localhost:8080/api/foo`代理到`https://api.github.com/foo`
```js
// ./webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': { 		// 代理/api开头的请求。即为了代理所有请求，将所有请求的开头添加一个/api
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' 					// 替换掉代理地址中的 /api
        },
        changeOrigin: true 				// 确保请求 GitHub 的主机名就是：api.github.com
      }
    }
  }
}
```

### 热更新

对于文件的热更新，提供了开箱即用的plugin
```js
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



## 文件指纹

> 打包后输出文件名的后缀

#### 目的

- 便于版本管理
- 未修改的文件名称不变，便于使用浏览器缓存

#### 常见类型

- `hash`：和整个项目的构建相关。只要项目中有文件修改，hash值就会改变
- `chunkhash`：和打包的chunk相关。不同的entry会生成不同的chunk。即一个入口内的文件改变后，该入口下引用的文件的chunkhash会变
- `contenthash`：根据文件内容定义hash。文件内容不变则contenthash不变

#### 使用

**对于JS文件：**修改output选项即可

```js
output: {
    filename: "[name]_[chunkhash].js"
},
```



**对于图片/字体等：**修改loader的option

- `[ext]`表示文件后缀
- `[hash:8]`表示取前八位的文件hash值（由md5生成）

```js
{
  test: /.(jpg|png)$/,
  use: {
    loader: "file-loader",
    options: {
      name: "[name]_[hash:8].[ext]"
    },
  },
},
```



## 页面公共资源的分离

### CDN形式引入基础库

默认情况下，使用React/Vue等框架开发的项目打包时会将框架代码一并打包到结果中。

使用 `html-webpack-externals-plugin` 可以将公共库提取出来，单独通过CDN引入，以减少打包结果的大小。

```js
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
module.exports = {
    plugins: [
    	new HtmlWebpackExternalsPlugin({
    	  externals: [
    	    {
    	      module: "react",
    	      entry: "https://unpkg.com/react@16/umd/react.production.min.js",
    	      global: "React",
    	    },
    	    {
    	      module: "react-dom",
    	      entry:
    	        "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    	      global: "ReactDOM",
    	    },
    	  ],
    	}),
  	],
}
```



### 提取公共资源

使用 `optimization.splitChunks` 设置。可以自定义要提取的公共包的大小、类型等

```js
optimization: {
    splitChunks: {
      
    },
},
```









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

## SideEffects
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

