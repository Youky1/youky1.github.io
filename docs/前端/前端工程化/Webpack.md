---
category: 前端
tag:
  - 前端工程化
  - webpack
---

# webpack

## 0. webpack 解决了什么问题

如何在前端项目中高效的管理和维护项目中的每一个资源。

对于 webpack 的自定义设置，通过修改根目录的`webpack.config.js`文件

## 1. 模块化的演进过程

### 第一阶段、文件划分

> 将不同模块放在不同的 js 文件中，再在全局依次引入

存在的问题：

- 模块直接在全局工作，污染全局作用域，容易产生命名冲突
- 没有私有空间，模块成员可能在外部被修改
- 无法管理模块间的依赖关系
- 难以分辨某个成员所属的模块

### 第二阶段、命名空间方式

> 将不同模块挂载到 window 的一个属性上

解决了命名空间问题，其他问题依旧存在

### 第三阶段、IIFE

> 利用立即执行函数

- 实现了私有变量
- 通过给立即执行函数传入参数实现依赖，可以在日后方便的判断模块的依赖关系

仍存在的问题：**模块的加载**

## 2. 核心概念

### entry

> 打包的入口

打包项目时，entry 为指定的打包入口，从入口文件开始构建**依赖图**，来将所有被引用的文件进行打包。

entry 的取值分为两种情况：

- 单入口：取值为字符串
- 多入口：取值为对象

### output

> 打包的输出

对于单入口和多入口打包：都只指定一个输出的`filename`和`path`。

当具有多个入口时，默认输出到 dist 目录下，文件名同入口文件名。

可以通过文件占位符（`[name]`）来表示入口文件名，并在此基础上进行修改，来区分打包结果的名称

### mode

用来指定当前的环境，取值有：

- production
- development
- none

**作用：**自动开启 webpack 内置的函数，在不同模式下开启不同的功能

### loader

webpack 默认的 loader 只能加载`js`和`JSON`文件，要加载 css 等其他文件，就要给文件设置对应的 loader。

#### 设置方法

在配置添加`module.rules`字段，取值为一个数组。

每一项是针对某类文件使用的`loader`，包含两个属性：

- `test`：取值为正则表达式，表示匹配的文件类型
- `use`：使用的 loader。
  - 如果只使用一个 loader，取值为一个**字符串**
  - 如果使用多个 loader，取值为一个**数组**。数组中的所有 loader**从后向前**执行

#### 常用的 loader

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

目的：增强 webpack**自动化构建**各方面的能力

#### 配置方法

- 引入插件（一般是一个构造函数）
- 在配置对象的`plugins`数组中添加（用 new 实例化）

#### 常见 plugin

- 打包前清除 dist 目录

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

- 自动生成 HTML

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // 对于输出html的自定义配置对象
      title: "", // 页面title
      meta: {
        // meta信息
      },
    }),
    new HtmlWebpackPlugin({
      // 打包输出多个html
      filename: "", // 输出的html文件名，默认是index.html
    }),
  ],
};
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

- 注入一些会发生变化的值，如 API 地址：`webpack.DefinePlugin`

```js
// webpack.config.js
const { DefinePlugin } = require("webpack");
module.exports = {
  plugins: [
    new DefinePlugin({
      // 注入的值会作为字符串直接替换到代码中使用到的地方
      FOO_BAR: "something",
    }),
  ],
};
```

```js
// src/main.js
console.log(FOO_BAR); // 'something'
```

### loader 和 plugin 的区别

- loader 是加载器，用于将 A 文件编译为 B 文件，即进行**文件转换**。loader 是一个函数，接收源文件为参数，返回目标文件。
- plugin 用于扩展 webpack 的功能，可以控制**打包的每个环节**。是**基于事件机制**工作，会监听打包过程中的某些节点，并执行任务

### 编写 loader 和 plugin 的思路

#### loader

loader 的本质是一个函数，接受源码并返回转换后的代码。

其 this 会被 webpack 填充（因此不能使用箭头函数）；接受一个参数，为 webpack 提供的源码。

返回结果可以是同步或异步的，异步返回是使用 this.callback 进行。

#### plugin

webpack 基于发布订阅模式，运行的生命周期中会发布很多事件，plugin 通过监听具体的事件可完成自己的需求。

- plugin 需要是一个**函数**或是**含有 apply 方法的对象**
- 根据具体的钩子实现自己功能。异步操作后要调用回调函数通知 webpack 进入下一流程

## 3. 常见文件的解析

### ES6

webpack 可以加载 JS 代码，但对于 ES6 的高级语法，需要使用`babel-loader`进行转换。

1. 首先，在`module.rules`中添加`{ test: /.js$/, use: "babel-loader" }`
2. 创建`.babelrc`文件：

```js
{
  "presets": ["@babel/preset-env"]
}
```

### 样式

#### CSS

解析 css 需要至少两个 loader，必须的是`css-loader`，负责加载.css 文件，并转换为 commonjs 对象。此时样式并没有被真正应用，还需要以下二者之一

- `style-loader`：将样式通过 style 标签插入`head`标签中（JS 代码中完成）

```js
{
    test: /.css$/,
    use: [
        'style-loader',
        'css-loader',
    ]
},
```

- `MiniCssExtractPlugin.loader`：将 css 提取到独立的 css 文件

```js
{
    module:{
        rule:[{ test: /.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },]
    },
    plugins: [new MiniCssExtractPlugin()],
}
```

#### sass/stylus/less

对于`sass`等预处理器代码，需在末尾再添加一个对应处理器的 loader：

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

也可以使用`url-loader`，其作用和 file-loader 类似，但是可以将小图片转换为 base64 格式：

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

## 4. 文件监听

### 原理

持续轮询，判断文件的**最后编辑时间**是否发生变化。检测到变化后不会立即告诉监听者，而是先进行**缓存**，等待一个`aggregateTimeout` 后统一处理。

**缺点**：需要手动刷新浏览器才能更新。

**解决办法**：热更新（`dev-server`）

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

## 5. webpack-dev-server

官方提供的开发服务器，提供了自动编译、热更新等功能

为了提高构建速度，webpack-dev-server 并不是将打包结果写入磁盘，而是存到**内存**中。

配置对象的 devServer 属性用来提供配置，[详细配置文档](https://webpack.js.org/configuration/dev-server/)

```js
// ./webpack.config.js
const path = require("path");
module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // 静态资源路径
    },
    compress: true, // 是否开启压缩
    port: 9000, // 端口号
  },
};
```

### 使用

- 安装依赖：

```shell
npm install -D webpack-dev-server
```

- 启动服务：

```shell
npx webpack serve
```

### 静态资源访问

除了构建过程中会被打包的资源，要让其它资源可访问，就要向 contentBase 传入静态资源的路径。

> 为什么不通过`copy-webpack-plugin`将静态资源加入打包结果？

使用`copy-webpack-plugin`会进行磁盘 IO，在开发过程中影响效率。

### Proxy 代理

由于本地应用是运行在 localhost 的临时服务器上，一些生产环境下能直接访问的 API 在开发时会产生跨域问题。

在 devServer 中添加 proxy 属性，其取值为一个对象。

将`http://localhost:8080/api/foo`代理到`https://api.github.com/foo`

```js
// ./webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // 代理/api开头的请求。即为了代理所有请求，将所有请求的开头添加一个/api
        target: "https://api.github.com",
        pathRewrite: {
          "^/api": "", // 替换掉代理地址中的 /api
        },
        changeOrigin: true, // 确保请求 GitHub 的主机名就是：api.github.com
      },
    },
  },
};
```

### 热更新

对于文件的热更新，提供了开箱即用的 plugin

```js
devServer: {
  hot: true,      // 开启 HMR 特性，如果资源不支持或代码报错，会回退到直接刷新
  hotOnly: true   // 只使用 HMR，不会回退
},
```

> 回退到直接刷新会怎么样？

直接刷新后，将无法看到代码中的报错

## 6. 文件指纹

> 打包后输出文件名的后缀

#### 目的

- 便于版本管理
- 未修改的文件名称不变，便于使用浏览器缓存

#### 常见类型

- `hash`：和整个项目的构建相关。只要项目中有文件修改，hash 值就会改变
- `chunkhash`：和打包的 chunk 相关。不同的 entry 会生成不同的 chunk。即一个入口内的文件改变后，该入口下引用的文件的 chunkhash 会变
- `contenthash`：根据文件内容定义 hash。文件内容不变则 contenthash 不变

#### 使用

**对于 JS 文件**：修改 output 选项即可

- `[name]`表示文件名

```js
output: {
    filename: "[name]_[chunkhash].js"
},
```

**对于图片/字体等：**修改 loader 的 option

- `[ext]`表示文件后缀
- `[hash:8]`表示取前八位的文件 hash 值（由 md5 生成）

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

## 7. 页面公共资源的分离

> module、bundle、chunk 分别是什么含义？

Webpack 的作用是将任意模块依赖（js 和非 js 资源如 css、图片等）打包成静态资源，其中：

- **module**：js 文件、css 文件、jpg 文件等打包前的文件
- **bundle**：打包后生成的产物
- **chunk**：对于 bundle 进行拆分，bundle 的一部分

### 基础库分离（CDN 形式引入）

默认情况下，使用 React/Vue 等框架开发的项目打包时会将框架代码一并打包到结果中。

使用 `html-webpack-externals-plugin` 可以将公共库提取出来，单独通过 CDN 引入，以减少打包结果的大小。

- `module`：公共库的名字、
- `entry`：库的 CDN 地址
- `global`：公共库全局导出的变量名

```js
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
module.exports = {
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react", // 公共库的名字
          entry: "https://unpkg.com/react@16/umd/react.production.min.js",
          global: "React", // 公共库全局导出的变量名
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
};
```

### 提取公共资源

使用 `optimization.splitChunks` 设置。可以自定义要提取的公共包的大小、类型等

```js
{
	optimization: {
      splitChunks: {
      	chunks: "all", 					// 对所有引入方式的包都做分包
      	minSize: 20000, 				// 打包前体积小于20k的包不会做分包处理
      	minChunks: 1, 					// 最小被引用次数
      	enforceSizeThreshold: 50000, 	// 如果某个包超过了50K则强制进行拆分
      },
  	},
}
```

​

## 8. Tree Shaking

> 在打包结果中筛选掉未引用的代码（**不是整个模块，其中的副作用代码仍会生效**）

在`production`模式下会自动开启。在非生产模式下设置`optimization`：

- `usedExports`设置为 true，表示只导出使用到的成员
- `minimize`设置为 true，表示压缩代码

```js
module.exports = {
  optimization: {
    usedExports: true,
    minimize: true,
  },
};
```

### 使用 babel-loader 后失效的问题

在某些版本的`babel-loader`中，会将 ESModule 代码编译为 CommonJS 形式。

> 最新版的 babel-loader 中，会根据环境禁用对 ES Module 的转换，因此不会带来这个问题

而 webpack 中 Tree Shaking 的前提是 ES Module 代码，因此可能导致其失效

## 9. SideEffects

> 完整移除整个没有使用的模块

在`production`模式下会自动开启。在非生产模式下：

- 设置`optimization.sideEffects:true`
- 在`package.json`中添加`sideEffects`属性
  - 取值为 false，表示所有模块都没有副作用
  - 取值为数组，每个元素表示需要保留副作用的路径

## 10. SourceMap

> 提供源代码和打包后代码间的映射关系

目的：在有报错时能找到源码中对应的位置

通常 sourceMap 文件以.map 结尾，是一个 JSON 格式的对象。

在打包后的代码中，通过注释的形式引入 SourceMap 文件

```
//# sourceMappingUrl=xxx
```

配置方法：修改配置对象的`devtool`属性决定选用的模式。不同的模式决定了构建速度和品质的不同。

### eval

将模块放在 eval 函数中，通过添加注释的方法来判断属于哪个源文件。

优点：没有生成 sourceMap，构建速度最快

缺点：只能定位到文件，不能定位到具体的行列

### eval-source-map

生成了 sourceMap，可以反推到源码中的行列信息

### cheap-eval-source-map

只能定位到行，不能定位到列。构建速度比`eval-source-map`更快

### cheap-module-eval-source-map

定位到的是未经转换的源码

### nosources-source-map

能看到错误位置，但点进去看不到源代码

### 总结

- 带 source-map 的是生成了 sourceMap 文件的
- 带 cheap 的构建更快，但只能定位到行，不能定位到列
- 带 module 的是定位到未经过 Loader 加工的源码，不带 module 的是经过 loader 加工的

在开发中，优先选用`cheap-module-eval-source-map`：

- 对于 React 和 Vue 等框架，经过 loader 转换后的代码会有很大的变化，无法定位问题
- 养成良好的编码习惯，一行不会有太多内容，定位到行足够找出问题了

在上线版本中，选用`none`，即不生成 sourceMap：

- 调试应该是开发中的事，不应在上线代码中 debug
- 生成 sourceMap 会暴露源代码，带来安全隐患

## 11. Code Splitting（分块打包）

### 分包的原因

**打包结果太过集中的弊端：**

- 打包结果的体积太大
- 不能做到按需加载，影响首屏时间

**打包结果太过分散的弊端：**

- 多次请求本身会有延迟
- 每次请求的请求头带来额外的带宽消耗

webpack 实现分包的方式有两种：

1. 多入口，多出口
2. 根据 ES Module 的动态导入特性，按需加载模块

### 多入口打包

多用于传统的`多页应用`，一个页面对应一个打包入口。对于不同页面的公共部分，提取到公共结果中。

1. 首先，在 entry 中设置多个入口
2. 修改`output`，`[name]`作为占位符表示入口名称
3. 设置`HtmlWebpackPlugin`的`chunks`属性，使其只加载对应的文件
4. 设置`optimization.splitChunks.chunks`为`'all'`，表示将公共部分自动分包

```js
module.exports = {
  entry: {
    index: "./src/index.js",
    foo: "./src/foo.js",
  },
  output: {
    filename: "[name].bundle.js", // [name] 是入口名称
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: ["index.html"],
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: ["foo.html"],
      chunks: ["foo"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

### 动态导入

使用 ES Modules 的`import`函数，无需其他配置即可完成。

#### 魔法注释

如果需要给动态导入的模块命名，可以在 import 函数中添加行内注释。格式为`/* webpackChunkName: 'name' */`。

```js
import(/* webpackChunkName: 'foo' */ "./foo/foo").then(({ default: foo }) => {
  // do something with foo...
});
```

如果两个模块的注释一样的话，会打包到一个文件中，借助这个特点可以自己更加细致的控制分包的结果。

## 12. Scope hoisting

### 要解决的问题

构建后的代码中存在大量的闭包代码，导致：

1. 打包产物的体积增大
2. 运行时创建的函数作用域变多，增大内存开销

### 原理

将**只被引用了一次的模块**按引用顺序放在**一个函数作用域**里。

### 使用

- `production`模式下会默认开启
- 手动添加`new webpack.optimize.ModuleConcatenationPlugin()`

## 13. 打包基础库

对于基础库的打包，一般会打包出未压缩和压缩后的两种版本。

- entry 中设置两个入口，指向同一个文件
- output 中，`library`属性指明库的导出情况
- `mode`设为 none，利用`TerserPlugin`选择性进行压缩

```js
module.exports = {
  mode: "none",
  entry: {
    sum: "./src/index.js",
    "sum.min": "./src/index.js",
  },
  output: {
    filename: "[name].js",
    library: {
      name: "sum", // 暴露的库的名称
      type: "umd", // 允许在所有模块定义下暴露本库
      export: "default", // 使用默认导出，否则引入时需要使用.default获取默认导出的内容
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ include: /\.min\.js$/ })],
  },
};
```

`package.json`中的`main`字段指向 index.js，在其中通过判断环境参数，返回 dist 中对应的文件

## 14. 构建过程分析

### 初级分析：内置的 stats

在 package.json 中添加命令：

```shell
webpack --config src/ --json > stats.json
```

构建后会在目录下生成 stats.json 文件。

### 速度分析：speed-measure-webpack-plugin

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap({
  // ...
});
```

### 体积分析：webpack-bundle-analyzer

打包后默认在 8888 端口打开页面显示各个 bundle 大小情况

## 15. 构建优化

### 多进程并行构建：thread-loader

#### 原理

将打包任务划分为多个 node 进程，将任务依次分配给这些进程。

#### 使用

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["thread-loader", "expensive-loader"],
      },
    ],
  },
};
```

### 多进程并行压缩：TerserWebpackPlugin

webpack5 开箱即带，但如果需要自定义配置，仍需自己安装：

```
npm install terser-webpack-plugin -D
```

```javascript
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```

### 利用缓存：提升二次构建速度

#### babel-loader

```js
module: {
    rules: [{ test: /\.js$/, use: ["babel-loader?cacheDirectory"] }],
},
```

#### HardSourceWebpackPlugin

```js
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
module.exports = {
  // ...
  plugins: [new HardSourceWebpackPlugin()],
};
```

### 优化查找策略

通过`resolve`字段优化模块解析的策略：

```js
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, "src/utilities/"), // 引用时可以使用别名
    },
    mainFields: ["main"], // 使用package.json中的main字段作为入口
    modules: [path.resolve(__dirname, "node_modules")], // 以node_modules作为查找入口
  },
};
```
