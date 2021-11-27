---
category: 后端
tag:
    - JS
    - Node.js
---
# 模块

将不同的功能放在不同的js文件中，每个文件就是一个模块（module）；

一些内置功能，依赖于内置的模块



## 引入&导出

```javascript
// module.js
function hello(){
    console.log('hello');
}
function hi(){
    console.log('hi');
}

module.exports = {
    hello,
    hi
}

// 等价于↓
exports.hi = hi;
exports.hello = hello;

// main.js
const {hello, hi} = require('./module.js')
```



## 两种导出方法的区别

### 1. 导出内容的匿名性

- 如果用exports.func1= func1进行导出，则在引入时必须知道func1这个名字才可以引用该内容

- 而使用module.exports = funcName，引入时可以给引入的内容随意赋一个名字

```
const myName = require('./module')
```



### 2. 导出数据的类型

module.exports和exports指向同一个对象，该对象即决定最终导出内容的对象，叫它M

```
console.log(module.exports === exports); // true
```

exports.xxx=xxx即改变M对象的属性。

若直接对exports赋值，因为对引用类型的变量赋值改变了其指向，所以exports不再指向M对象，因此赋值无效

```javascript
// 无效的写法
exports = 'hello';
exports = {
	name:'module.js'
}
```

而对module.exports直接做更改，则是有效的

```javascript
// 两种写法等价，都有效
module.exports = {
    name:'module.js'
}
module.exports.name = 'module.js';
```



# 事件循环

- Node.js是单进程单线程的
- 事件机制使用观察者模式实现。事件相当于主题（subject），处理函数相当于观察者（observer）
- 事件循环机制类似一个while循环，当没有事件观察者时就退出。每个异步事件都生成一个观察者



## 自定义事件模块：events

- 所有事件，都是events.EventEmitter的实例
- 支持事件响应的核心模块，都是events的子类

### 添加监听器

```javascript
const events = require('events');
const emitter = new events.EventEmitter();

const func1 = (arg1,arg2) => {
    console.log('func1',arg1,arg2);
}
const func2 = (arg1,arg2) => {
    console.log('func2',arg1,arg2);
}

// 监听自定义事件
emitter.on('test event',func1)
emitter.on('test event',func2)

// 触发自定义事件，会按监听器顺序依次触发
setTimeout(()=>{emitter.emit('test event','hello','world')},2000);
// func1 hello world
// func2 hello world
```



### 移除监听器

```javascript
emitter.removeListener('test event',func1);

emitter.removeAllListener('test event');
```



### 监听对监听器的改变

```javascript
// 当添加新的监听器时触发
emitter.on('newListener',(event, listener) => {
    console.log(event,listener);
})

// 当移除监听器时触发
emitter.on('removeListener',(event, listener) => {
    console.log(event,listener);
})
```



# 全局对象global

全局对象global对应浏览器中的window。

任何全局变量（内置变量以及未定义直接赋值的变量）都是global的属性

## 常见全局变量

### __dirname

当前文件所在目录的绝对路径

```
C:\node\src
```



### __filename

当前文件的文件名，包含所在的路径

```
C:\node\src\index.js
```



### process

> 用于描述进程状态的对象

- env：环境变量对象
- nextTick(callback)：在下一轮时间循环时执行，会在setTimeout(callback)之前执行
- platform：程序运行平台
- 监听程序的退出：

```javascript
process.on('exit',() => {
    console.log('程序退出')
})
```





# util（工具函数模块）

## callbackify

> 将返回Promise的函数装换为回调函数的形式

```javascript
const util = require('util');

// 原函数：返回Promise
function asyncFunc(){
    return new Promise((resolve,rejected) => {
        let num = Math.random();
        if(num > 0.5){
            resolve(num);
        }else{
            rejected(`${num} is less than 0.5`);
        }
    })
}
// 转换后的函数，接收一个回调函数
const synFunc = util.callbackify(asyncFunc);

// err：rejected的参数
// num：resolve的参数
synFunc(
    (err,num) => console.log(err,num)
)
```



## promisify

> 将以回调函数形式调用的函数转换为返回Promise的函数

```javascript
const util = require('util');
const fs = require('fs');

// 回调形式读取文件
fs.readFile('./input2.txt',(err,data) => {
    if(err){
        console.log('读取文件出错：',err)
    }else{
        console.log(data);
    }
})

// // 以Promise形式读取文件
const asyncReadFile = util.promisify(fs.readFile);
asyncReadFile('./input.txt')
.then(data => console.log(data))
.catch(err => console.log(err))
```



## deprecate

> 对某个暴露出去的变量建议不在使用。
>
> 引入该变量时会重定向至另一个变量，并给出警告内容

```javascript
// module.js
const util = require('util')

function func2(){
    console.log('func2')
}
function func3(){
    console.log('func3')
}

exports.func2 = util.deprecate(func3,'func2() is deprecated. use func3() instead.');

// index.js
const { func2 } = require('./module');
func2();
// func3
// (node:16952) DeprecationWarning: func2() is deprecated. use func3() instead.
```



## inspect

> 将一个对象转换为字符串。不会调用 toString  方法



# fs（文件模块）



## 读文件

```javascript
const fs = require('fs');

// 异步
fs.readFile('./input.txt','utf8',(err, data) => {
    console.log(data);
})

// 同步
const data = fs.readFileSync('./input.txt','utf8');
console.log('同步读取数据：',data)
```



## 写文件

```javascript
const fs = require('fs');
const str = '文件写入内容'

// 异步
fs.writeFile('./output.txt',str,(err) => {
    console.log('文件写入完成');
})

// 同步
fs.writeFileSync('./output.txt',str);
```



## 删除文件

```javascript
const fs = require('fs');
fs.unlink('./output.txt',() => {
    console.log('删除完成')
})

```



## 按目录读取

> 读取目录下的所有文件（包括文件夹）

```javascript
const fs = require('fs');

// 异步读取
fs.readdir('./',(err,files) => {
    console.log(files.length)
})

// 同步读取
const files = fs.readdirSync('./');
console.log(files)

```





## 创建流

```javascript
const fs = require('fs');

// 读入流
const rs = fs.createReadStream('./input.txt','utf8');
rs.on('data',data => {
    console.log(data);
})

// 写入流
const ws = fs.createWriteStream('./output.txt');
ws.write('hello,');
ws.write('world');
ws.end();
ws.on('finish',() => console.log('写入完成'))

```



# path（路径模块）

> 提供一些处理路径的工具函数



## join

- 用于连接路径，会正确的使用当前系统的路径分隔符

    > Windows中是 \
    >
    > unix中是 /

- 可以将相对路径连接至绝对路径之上

```javascript
const path = require('path');

function log(data){
    console.log(data);
}

log(path.join('C://src/foo/bar','../test.js'));
// C:\src\foo\test.js

```



## resolve

作用：将相对路径转换为绝对路径

```javascript
const path = require('path');

function log(data){
    console.log(data);
}

// 当前文件所在路径：C:\foo\bar\index.js
console.log(path.resolve('../test.js'));
// 输出：C:\foo\test.js
// 等价于：console.log(path.join(__dirname,'../test.js'))

```



# Buffer（缓冲区）

> 用来处理二进制文件流



## 创建



### 指定大小的Buffer

```javascript
const byteSize = 10 // 缓冲区的大小
const buffer = Buffer.alloc(byteSize);

```



### 有默认值的Buffer

```javascript
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer
cosnt buffer = Buffer.from([1,2,3]);

// 创建一个内容为[0x74, 0xc3, 0xa9, 0x73, 0x74]的Buffer，编码方式为utf8
cosnt buffer = Buffer.from('test','utf8');

```



## 写入缓冲区

```javascript
// str是要写入的内容，写入到buffer缓存中以start开始的地方
buffer.write(str,start)

```



## 从缓冲区读取

```javascript
const str = buffer.toString('utf8',0,buffer.length)

```



## 转换为JSON

```javascript
const buffer = Buffer.from([1,2,3,4,5]);
console.log(buffer.toJSON());
// {"type":"Buffer","data":[1,2,3,4,5]}

```



## 合并

```javascript
var buffer1 = Buffer.from(('hello,'));
var buffer2 = Buffer.from(('world'));
var buffer3 = Buffer.concat([buffer1,buffer2],200);

console.log(buffer3.length)
// 200

console.log("buffer3 内容: " + buffer3.toString());
// buffer3 内容: hello,world

```



## 拷贝

```javascript
const target = Buffer.from('123456');
const source = Buffer.from('abc');
source.copy(target,2)
console.log(target.toString())
// 12abc6

```



# Stream（流）

Stream是一个抽象接口。

所有Stream对象都是EventEmitter的实例，都有的事件包括：

- data：有数据可读时触发
- end：数据读取完成
- finish：数据全部写入完成
- error：IO过程中发生错误



## 读

```javascript
const fs = require('fs');

const rs = fs.createReadStream('test.txt','UTF8');

rs.on('data',data => {
    console.log('read data:',data);
})

rs.on('end',() => {
    console.log('end')
})

```



## 写

```javascript
const fs = require('fs');

const ws = fs.createWriteStream('./test.txt','UTF8');

ws.write('hello nodejs')
// 需要手动触发end方法表示写入完成
ws.end()

ws.on('finish', function() {
    console.log("写入完成。");
});

```



## 管道流（读取流 -> 写入流）

将一个输入流连接到一个输出流，实现数据的复制

在这个过程中，data、end、finish事件都会依次触发

```javascript
const fs = require('fs');
const rs = fs.createReadStream('./input.txt');
const ws = fs.createWriteStream('./output.txt');
rs.pipe(ws);

```



### 链式流操作

多用于管道流操作中，一个流操作的返回值仍是一个Stream对象，因此可以实现链式调用。

```javascript
var fs = require("fs");
var zlib = require('zlib');
const ws = fs.createWriteStream('input.txt.gz');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(ws);

ws.on('finish',() => {
    console.log('文件压缩完成')
})

```





# WebSocket

> 目的：浏览器和服务器间建立无限制的全双工通信



## 特点

- 不是全新的协议，用HTTP来建立首次连接，必须由浏览器发起

- 请求的地址以ws://开头

- 请求头中设置Upgrade：websocket和Connection：Upgrade

      

## 简单实现

### 服务器端

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port:3000
})

// 监听连接事件
wss.on('connection',ws => {
    // 服务器主动向浏览器发消息
    setTimeout(() => {
        ws.send('connect successfully', err => {
            if(err) console.log(err);
        },2000)
    })

    // 服务器接收到浏览器发来的消息
    ws.on('message',msg => {
        console.log(`get message ${msg} successfully`);
        ws.send('get message already', err => {
            if(err) console.log(err);
        })
    })

    // 监听连接的退出
    ws.on('close',() => {
        // 此时连接已关闭，不能再使用send方法
        console.log('close');
    })
})



```



### 浏览器端

```javascript
// 打开一个WebSocket:
var ws = new WebSocket('ws://localhost:3000/test');

// 响应onmessage事件，每次收到服务器发来的消息时执行：
ws.onmessage = function(msg) { console.log(msg) };

// 给服务器发送消息:
ws.send('Hello!');

// 结束连接
ws.close();

```



# NPM

> node package manager，Node包管理器

## 常用命令



### 下载依赖



#### 默认下载

- 安装至当前文件夹下的node_modules文件夹下

- 自动在package.json文件的dependencies属性中添加该条目（npm5之前需要在末尾添加 --save）

```
npm install xxx

```



#### 下载为开发依赖项

> 开发依赖是仅用于开发环境的包，如用于测试的包、Babel等

```
npm install xxx -D

```



#### **下载特定版本**

```
npm install xxx@2.0.1

```



#### 下载package.json中的全部依赖

**下载全部依赖：**

```
npm install

```



**下载生产环境依赖：**

```
npm install --production

```



#### 全局下载

```
npm install -g xxx

```



#### 查看全局下载时下载到的位置

```
npm root -g

```



### 卸载依赖

```
npm uninstall xxx

```



 **移除 `package.json` 文件中的引用 :**

```
npm uninstall xxx -S

```



**若该包是开发依赖项（列在`devdependencies`中）：**

```
npm uninstall xxx -D

```





### 更新依赖

**更新补丁版本和次版本：**

```
npm update

```



**更新主版本：**

1. 安装npm-check-updates包

    ```
    npm install -g npm-check-updates
    
    ```

2. 升级 package.json 文件的 dependencies 和 devDependencies 中的所有版本

    ```
    ncu -u
    
    ```

3. 进行更新

    ```
    npm update
    
    ```





### 运行任务

这里的xxx是命令，往往代表一串更长的指令

```
npm run xxx

```

可以在package.json中自己设置命令。如自己添加了一个go命令，内容为执行src目录下的index.js：

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "go":"node src/index.js"
},

```



### 列举依赖

列举所有包：

这样会显示包自身的所有依赖

```
npm list

```



只列举顶层的包：

```
npm list --depth=0

```



### 查看依赖版本

**查看当前的版本：**

```
npm view xxx version

```



**查看历史版本：**

```
npm view xxx versions

```





## package-lock.json

> 解决用户依赖库版本和原始依赖库版本不同的问题

- package.json中，对于依赖的版本采用 semver  表示法：
    - 如果写入的是 `〜0.13.0`，则只更新补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。
    - 如果写入的是 `^0.13.0`，则要更新补丁版本和次版本：即 `0.13.1`、`0.14.0`、依此类推。
    - 如果写入的是 `0.13.0`，则始终使用确切的版本。
- 用户初始化项目时npm install下载的依赖，和开发者所用的版本不一定是完全一致的
- package-lock.json会固化当前安装的每个包的版本，当使用npm install时会下载确定的版本
- 当运行npm update时，package-lock.json中的版本信息会被更新



## npx

> 用于运行本地命令

运行npx  xxx会自动在项目的 `node_modules` 文件夹中找到命令的正确引用， 而无需知道确切的路径，也不需要在全局和用户路径中安装软件包。 

在运行npx命令前，不需要先下载命令对应的依赖

eg：

```
npx create-react-app my_app

```



# 爬虫

使用的库：

- https

    > 发送网络请求，获取网页源码

- **cheerio**

    > 处理HTML，相当于服务端的jQuery



## 请求网页代码

```javascript
const https = require('https');
https.get('https://movie.douban.com/top250', res => {
    let html = '';
    res.on('data',chunk => {
        html += chunk
    })
    res.on('end',() => {
        console.log(html);
    });
})

```



## 加载HTML代码

```javascript
const cheerio = require('cheerio');

// html是前面请求得到的html源码
const $ = cheerio.load(html);

// 输出为html字符串
$.html();

```



## 获取DOM节点

方式和jQuery类似

- selector是选择器，规则和jQuery相同
- context是上下文（即父级节点），可以省略
- root通常省略，默认为HTML文档字符串

```
$(selector, [context], [root]);

```



## 属性操作

### 获取节点的innerText

```javascript
$('li').text();

```



### 获取节点的属性值

```javascript
$('li').attr('class');
$('li').attr('src');

```



### 获取input框的value

```javascript
$('input[type=text]').val();

```



## 遍历

### each

迭代一个 cheerio对象，内部的this指向DOM节点。可以用$(this)生成cheerio对象



### find

在匹配的元素中选择过滤后的后代



### children&parent

获得匹配元素的子级/父级元素



### pre&preALL

本元素之前的一个 / 所有 同级元素



### next&nextALL

本元素之后的一个 / 所有同级元素



## eg：武汉房价

> 数据来源：链家

```javascript
const cheerio = require('cheerio');
const https = require('https');

const start = 1, end = 100;

(async function getPrice(){
    let avg = 0, total = 0;
    for(let i = start; i <= end; i++){
        let n = 1;
        await new Promise((resolve) => {
            console.log(`----------------第${i}页----------------\n`)
            https.get(`https://wh.fang.lianjia.com/loupan/pg${i}/`,res => {
                let html = '';
                res.on('data',chunk => {
                    html += chunk;
                })
                res.on('end',() => {
                    const $ = cheerio.load(html);
                    $('ul.resblock-list-wrapper li').each(function(){
                        
                        const unitPrice = $(this).find('div.main-price span.number').text();
                        const totalPrice = $(this).find('div.resblock-price div.second').text();
                        if(!Number.isNaN(Number(unitPrice))){
                            total++;
                            avg += Number(unitPrice);
                        }
                        console.log(`第${n++}间，单价：${unitPrice}/平米，总价：${totalPrice || '暂无'}`)
                        console.log('-----------------------------------------------------\n')
                        resolve();
                    })
                })
            })
        })
    }
    console.log(`共分析${total}套房；\n\n均价为：${Math.floor(avg / total)}元/平米`)
})()


```

