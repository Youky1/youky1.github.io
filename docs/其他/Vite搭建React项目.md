---
category: 其他
tags:
  - Vite
---

# 使用 Vite 从零搭建 React 项目

## 项目初始化

首先根据技术选型，挑选相应的模板。这里是使用 typescript 的 React 项目，因此初始化命令为：

```shell
npm create vite@latest my-app -- --template react-ts
```

然后下载依赖：

```shell
cd my-app
npm i
```

运行项目：

```shell
npx vite
```

整个过程非常之快，运行也非常流畅。Vite 的快名不虚传。

## 使用 eslint

这里选用 google 的 gts 作为规则，运行初始化命令：

```shell
npx gts init
```

然后一路按 y，下载完相关依赖。

然后，此时就可以运行 gts 提供的相关命令了，如检查代码是否符合规范：

```shell
npm run lint
```

### 可能的坑

1. 如果 eslint 出现报错"vite" is not published 和"@vitejs/plugin-react" is not published，则需要在 package.json 中把这两个依赖从 `devDependencies`移到 `dependencies` 内。

2. 如果报错不能使用 jsx，则需要`tsconfig.compilerOptions`中配置`"jsx": "react"`
3. 如果使用 document 的地方报错`找不到名称“document”`，则需要配置`"lib": ["esnext", "DOM"]`

## 使用 Prettier

`Prettier`用于格式化代码，在成熟的项目中都会用它来达到代码风格的统一。

添加首先在 vscode 中下载 `Prettier - Code formatter` 插件，是为了便于我们在开发过程中时刻注意规范代码。这里也可以打开 vscode 的保存时自动格式化功能

安装 gts 后，会生成 `.prettierrc.js` 文件，引用 gts 的规则：

```js
module.exports = {
  ...require("gts/.prettierrc.json"),
};
```

## 使用 husky

`husky` 用于使用 git 钩子，来在某些阶段自动执行某些操作（比如在 commit 前执行 gts lint）。

首先下载依赖：

```shell
npm install husky -D
```

添加 npm 命令：

```shell
npm set-script prepare "husky install"
npm run prepare
```

添加自定义钩子。`pre-commit` 表示钩子执行时机。后面的`npm run lint` 代表每次钩子执行的操作。

```shell
npx husky add .husky/pre-commit "npm run lint"
```

来测试一下，我们首先在文件中添加一行无效代码`let a = 0;`

```shell
git add .
git commit -m 'husky error test'
```

运行结果：

```shell
  4:5  warning  'a' is assigned a value but never used        @typescript-eslint/no-unused-vars
  4:5  error    'a' is never reassigned. Use 'const' instead  prefer-const

✖ 2 problems (1 error, 1 warning)
  1 error and 0 warnings potentially fixable with the `--fix` option.

husky - pre-commit hook exited with code 1 (error)
```

可见正确执行了 pre-commit 钩子，进行了检查，并且在检查不通过的情况下 commit 没有成功。

对于可以自动修复的错误（比如末尾没加分号），`gts lint`会进行自动修复，因此开发者是没有感知的。
