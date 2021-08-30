---
category: "其他"
tags:
    - 博客
    - vuepress
---
# VuePress实战

## 0. 项目初始化

> 由于2.0目前的资料不齐全，所以采用了npm上下载量最多的1.8.2版本

1. 在目标目录中，npm init & npm install -D vuepress@next
2. 在package.json的scripts中添加指令

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

3. 创建.gitignore，并在其中添加node_modules，.temp，.cache
4. 创建docs文件夹
5. 在docs路径下创建.vuepress文件夹，并在.vuepress文件夹中创建```config.js```文件
6. 运行```npm run docs:dev```启动项目



## 1. 目录结构

- docs文件夹存放了项目的所有文件
    - vuepress文件夹：存放了全局的配置、组件、静态资源
        - theme文件夹：存放本地主题
        - styles文件夹：存放样式文件
            - index.styl：将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
            - palette.styl: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
        - public文件夹：存放静态资源目录
        - templates: 存储 HTML 模板文件。
            - dev.html: 用于开发环境的 HTML 模板文件。
        - /config.js: 配置文件的入口文件，也可以是 YML 或 toml。
        - enhanceApp.js: 客户端应用的增强。
    - README.md：跟路由对应的md文件

## 2. 页面路由

docs目录作为根路径。

即docs/README.md对应的URL为 / ；

docs/path/README.md对应的URL为 /path/


## 3. md语法扩展

vuePress为Markdown提供了一些扩展功能：

- 标题锚点。在各级标题前会有一个#，点击这个#或在左侧目录中点击标题，会定位到标题所在位置
- 对相对路径、绝对路径、外链URL做相应的处理
- 支持Emoji表情
- 在md文件中使用```[[toc]]```渲染当前页面的目录
- 代码特定行高亮：在语言后添加```{1,6-8}```来将第一行和第6到8行额外高亮
- 支持在md中使用vue的模板语法
    输入：

```
一加一等于： {{ 1 + 1 }}
<span v-for="i in 3"> span: {{ i }} </span>
```

等价于：

```
一加一等于： 2
span: 1 span: 2 span: 3
```





## 4. 主题配置

### 1.1 默认主题

在默认主题中提供了包括：首页、导航栏、侧边栏、搜索框等等的配置。参考[官方文档](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5)即可

### 1.2 使用第三方主题：vuepress-thee-hope

修改config.js，在其中引入第三方主题即可。以我使用的vuepress-thee-hope为例：

```javascript
const { config } = require("vuepress-theme-hope");
module.exports = config({
    // own config here
});
```


### 1.3 开发自定义主题

#### 最简实现

首先，在.vuepress文件夹下创建theme文件夹，在其中编写一个**Layout.vue**文件。



#### 引用md内容

在vue文件中使用```<Content/>```组件引用md文件的内容。

#### 内容摘录

如果一个 markdown 文件中有一个``` <!-- more --> ```注释，则该注释之前的内容会被抓取并暴露在 $page.excerpt 属性中。

#### 应对复杂内容的约定目录结构

以下为theme文件夹下的目录：

- global-components：该文件夹下的组件自动注册为全局组件
- components：存放组件
- layouts：存放布局组件。其中**Layout.vue**是必须的
- styles：全局的样式和调色板
- templates：修改默认的模板文件
- index.js：入口文件
- enhanceApp.js: 主题水平的客户端增强文件

所有页面都会默认引用**Layout.vue**，并在路由找不到时引用4**04.vue**。

若要在某个页面引用其他布局组件，如在layouts中添加AnotherLayout.vue，然后在其开头添加：

```md
layout: AnotherLayout
```


## 5. vuepress-thee-hope主题的配置

### 5.1 导航栏

可以包含的内容：站点名称、搜索框、 导航栏链接、多语言切换、仓库链接。

通过themeConfig.logo字段可以设置导航栏图标

#### 导航栏连接

```javascript
themeConfig: {
    nav: [
      { text: "指南", link: "/zh/guide/", icon: "creative" },
      { text: "配置", link: "/zh/config/", icon: "config" },
      { text: "常见问题", link: "/zh/FAQ/", icon: "question" },
    ],
},
```


当把link属性替换为一个items数组时，会显示为下拉框。prefix属性可以设置这些连接的共同前缀

```javascript
{ 
    text: "常见问题",
    icon: "question",
    prefix:'/basic/',
    items:[
        {text: "item1", link: "/zh/item1"}
    ],
     
},
```



### 5.2 侧边栏

#### 5.2.1 最基本的配置

sidebar传入的链接会渲染到左侧。

标题默认为在frontmatter中设置的title。否则就用md中的第一个标题。或在设置中传入数组，第二个字符串会识别为标题

```javascript
themeConfig: {
    sidebar: ["/", "/page-a", ["/page-b", "title for page b"]],
},
```

#### 5.2.2 为不同页面配置不同的侧边栏

配置是按顺序匹配的，所以默认情况要放在最后。

```javascript
module.exports = {
    themeConfig:{
        sideBar:{
            "/path1/": [
                "blog1",
                "blog2",
                // ...
            ],

            // 默认情况
            "": []
        }
    }
}

```

#### 5.2.3 设置博主信息

将```themeConfig.blog.sidebarDisplay```设置为"always"

### 5.3 页面

#### 5.3.1 文章图标

在页面的frontmatter中配置icon字段

```json
---
icon: home
---

```

#### 5.3.2 特定页面的自定义布局

自定义布局的含义时，保留导航栏部分，通过自定义组件渲染区域部分。

在frontMatter中对某篇文章进行设置，将调用```.vuepress/components/SpecialLayout.vue```进行布局

```json
---
layout: SpecialLayout
---

```

#### 5.3.3 页面信息显示

可以在md文件的frontMatter中设置相应的字段，自定义页面信息

> 通过themeConfig.pageInfo: false 进行进行关闭

| 字段       | 对应内容 | 页面 frontmatter 值     |
| ---------- | -------- | ----------------------- |
| ‘author’   | 作者     | author                  |
| ‘time’     | 时间     | time                    |
| ‘category’ | 分类     | category                |
| ‘tag’      | 标签     | tags                    |
| ‘visitor’  | 访问量   | visitor（仅Valine可用） |

- author可以在```themeConfig.author```中进行全局配置，文档中的author会进行覆盖

- time应为xxxx-xx-xx的形式

- 设置category为xx后，该文章会出现在路径/category/xx/分类页面的文章列表中。分类只能设置一个

- tags可以设置多个,该文章会出现在路径/tag/tag1和/tag/tag2页面。格式为：

    ```
    tags:
        - tag1
        - tag2
    ```

#### 5.3.4 页脚

页脚默认不开启显示。所以首先要设置```themeConfig.footer.display```为true

- 全局设置：通过```themeConfig.footer```的```content```和```copyright```字段设置页脚内容和版权信息。
- 页面配置


## 6. 部署

### 6.1 路径问题
这里以部署到github pages为例，有两种情况：
- 部署到```<username>.github.io```，这种情况下不需要修改base字段
- 部署到```/<repo>/```，此时要把base字段修改为```/repo/```，前后带斜线

### 6.2 自动提交
由于github page只能显示master分支根目录下的html，所以我们要提交的build后的```dist```文件夹。而每次build后切换目录提交的话很麻烦，因此可以写一个shell脚本自动执行一系列操作。
>   官方教程中是在shell中运行npm命令，但我遇到了一个npm的报错，因此改为在npm命令中运行该sh文件

首先，创建一个deploy.sh文件
```sh
# 捕捉错误
set -e

# 进入生成的文件夹
cd docs/.vuepress/dist

# 发布到github
git init
git add -A
git commit -m 'deploy'
# 注意将这里的username替换为自己的用户名
git push -f git@github.com:<username>/<username>.github.io.git master

cd -
```

然后修改package.json中的scripts，在每次build后自动运行deploy.sh：
```json
"docs:build": "vuepress build docs && sh deploy.sh"
```

至此，每次build后，会自动将打包后的内容push至github仓库

### 6.3 绑定自定义域名

这一步其实和vuepress无关了，就和任何github pages绑定域名一样的。
1. 首先，在域名的DNS解析中，将域名解析到github pages的域名（比如：youky1.github.io）
2. 在Settings/Pages页面的Custom domain中添加自己的域名

完成双向绑定后，即可通过自己的域名访问到github pages了。

END！