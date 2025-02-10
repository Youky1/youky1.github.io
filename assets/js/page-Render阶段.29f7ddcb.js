(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{598:function(t,s,a){"use strict";a.r(s);var r=a(1),e=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"render-阶段"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#render-阶段"}},[t._v("#")]),t._v(" Render 阶段")]),t._v(" "),s("p",[t._v("reconciler 工作的阶段，称为 render 阶段。\n类组件的 render 函数，函数组件的自身，都在这个阶段执行")]),t._v(" "),s("h2",{attrs:{id:"流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#流程"}},[t._v("#")]),t._v(" 流程")]),t._v(" "),s("p",[t._v("render 阶段开始于 "),s("code",[t._v("performSyncWorkOnRoot")]),t._v(" 或 "),s("code",[t._v("performConcurrentWorkOnRoot")]),t._v("，二者的区别是后者会判断是否进行中断。")]),t._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("performSyncWorkOnRoot")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("workInProgress "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("performUnitOfWork")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("workInProgress"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("performConcurrentWorkOnRoot")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("workInProgress "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("shouldYield")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("performUnitOfWork")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("workInProgress"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br")])]),s("p",[s("code",[t._v("workInProgress")]),t._v(" 代表当前“生成 Fiber 树”工作已经进行到的节点。\n"),s("code",[t._v("performUnitOfWork")]),t._v(" 方法会对其创建 FiberNode 并赋值给 wip，并将其和已有的 Fiber Tree 连接起来。")]),t._v(" "),s("p",[t._v("构建 Fiber 树的过程主要分为两个阶段")]),t._v(" "),s("h3",{attrs:{id:"_1-从根节点下的构建过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-从根节点下的构建过程"}},[t._v("#")]),t._v(" 1. 从根节点下的构建过程")]),t._v(" "),s("p",[t._v("在阶段 1 中，会对遍历到的节点执行 beginWork 方法，创建下一级 FiberNode。\n当子节点有多个时，第一个子节点和父级节点连接，其 sibling 指向下一个兄弟节点。兄弟节点的 return 指向上一个兄弟节点。\n当遍历到叶子结点时，就会进入第二个阶段")]),t._v(" "),s("h3",{attrs:{id:"_2-从叶子节点向上-return-的过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-从叶子节点向上-return-的过程"}},[t._v("#")]),t._v(" 2. 从叶子节点向上 return 的过程")]),t._v(" "),s("p",[t._v("在第二阶段会对节点执行 complete 方法。然后判断其是否有兄弟节点。")]),t._v(" "),s("ul",[s("li",[t._v("如果有，则进入兄弟节点的构建过程")]),t._v(" "),s("li",[t._v("如果没有，则进入其父节点的 return 流程。直到进行至 "),s("code",[t._v("HostRootFiber")]),t._v("，流程结束。")])]),t._v(" "),s("h2",{attrs:{id:"beginwork"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#beginwork"}},[t._v("#")]),t._v(" beginWork")]),t._v(" "),s("p",[t._v("beginWork 中首先通过 wip FiberNode 对应的 current FiberNode 是否存在，来判断当前是 mount 还是 update。")]),t._v(" "),s("p",[t._v("如果是 update，则判断其是否可复用，如果能则进入优化路径；如果不能则和 mount 时流程类似")]),t._v(" "),s("ol",[s("li",[t._v("根据 tag 进入不同类型元素的处理分支")]),t._v(" "),s("li",[t._v("生成下一级的 FiberNode")])]),t._v(" "),s("p",[t._v("区别在于 update 时会标记副作用 flags（针对节点的插入、删除、移动），mount 时不会。")]),t._v(" "),s("p",[t._v("renderer 中，会根据 flags 对 Fiber 对应的 DOM 节点执行操作。")]),t._v(" "),s("blockquote",[s("p",[t._v("beginWork 在 mount 时不标记 flags，如何更新元素？")])]),t._v(" "),s("p",[t._v("如果对节点都插入 flags 标记，则在首屏渲染时会有很多的 DOM 插入操作。\n因此只在 completeWork 中，对 HostRootFiber 节点进行更新标记，构建完整颗离屏 DOM 树后，再一次性插入")]),t._v(" "),s("h2",{attrs:{id:"completework"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#completework"}},[t._v("#")]),t._v(" completeWork")]),t._v(" "),s("p",[t._v("completeWork 的工作主要是两部分")]),t._v(" "),s("ol",[s("li",[t._v("创建或标记元素更新")]),t._v(" "),s("li",[t._v("对元素进行标记 flags")])]),t._v(" "),s("h3",{attrs:{id:"标记-flags"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#标记-flags"}},[t._v("#")]),t._v(" 标记 flags")]),t._v(" "),s("p",[t._v("completeWork 中的标记针对节点的更新。至此，flags 的标记流程结束。\n但为了在 renderer 中解析 flags，还需要进行 flags 冒泡，即在每个 fiberNode.subtreeFlags 中，会记录其"),s("strong",[t._v("所有子孙节点")]),t._v("上被标记的 flags。\n因此通过任意一级 fiberNode.subtreeFlags 都可以确定它所在子树是否存在副作用需要执行。")]),t._v(" "),s("h3",{attrs:{id:"mount-流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mount-流程"}},[t._v("#")]),t._v(" mount 流程")]),t._v(" "),s("ol",[s("li",[t._v("首先通过 createInstance 方法创建 fiberNode 对应的 DOM 元素（renderer 提供的方法，也可能是其他平台对应的 UI 元素）。")]),t._v(" "),s("li",[t._v("然后执行 appendAllChildren 方法，将下一层的 DOM 元素插入前一步创建的 DOM 元素中")]),t._v(" "),s("li",[t._v("执行 finalizeInitialChildren 方法完成属性初始化，包括 style、innerHTML、文本类型 children、不会冒泡的事件等等")]),t._v(" "),s("li",[t._v("进行 flags 冒泡")])]),t._v(" "),s("h3",{attrs:{id:"update-流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#update-流程"}},[t._v("#")]),t._v(" update 流程")]),t._v(" "),s("p",[t._v("update 流程的任务是标记属性的更新，该过程有了两次遍历：")]),t._v(" "),s("ol",[s("li",[t._v("标记删除属性（更新前有，更新后无）")]),t._v(" "),s("li",[t._v("标记更新属性（更新后有，和更新前不同）")])]),t._v(" "),s("p",[t._v("属性的变化会保存到 fiberNode.updateQueue 中（数组以属性的 key、value 为相邻的两项 ），同时对该 fiberNode 标记 Update")]),t._v(" "),s("div",{staticClass:"language-javascript line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("workInProgress"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("flags "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|=")]),t._v(" Update\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);