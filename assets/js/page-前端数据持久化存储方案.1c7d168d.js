(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{587:function(t,a,s){"use strict";s.r(a);var n=s(1),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"总览"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总览"}},[t._v("#")]),t._v(" 总览")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("技术")]),t._v(" "),a("th",[t._v("有效时长")]),t._v(" "),a("th",[t._v("存储内容")]),t._v(" "),a("th",[t._v("容量限制")]),t._v(" "),a("th",[t._v("不同 tab 页能否共享")]),t._v(" "),a("th",[t._v("作用域")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("cookie")]),t._v(" "),a("td",[t._v("关闭页面前")]),t._v(" "),a("td",[t._v("字符串")]),t._v(" "),a("td",[t._v("几 K")]),t._v(" "),a("td",[t._v("√")]),t._v(" "),a("td",[t._v("当前路径及其子路径")])]),t._v(" "),a("tr",[a("td",[t._v("sessionStorage")]),t._v(" "),a("td",[t._v("关闭页面前")]),t._v(" "),a("td",[t._v("字符串")]),t._v(" "),a("td",[t._v("几 M")]),t._v(" "),a("td",[t._v("×")]),t._v(" "),a("td",[t._v("当前标签页")])]),t._v(" "),a("tr",[a("td",[t._v("localStorage")]),t._v(" "),a("td",[t._v("永久")]),t._v(" "),a("td",[t._v("字符串")]),t._v(" "),a("td",[t._v("几 M")]),t._v(" "),a("td",[t._v("√")]),t._v(" "),a("td",[t._v("同源策略")])]),t._v(" "),a("tr",[a("td",[t._v("indexedDB")]),t._v(" "),a("td",[t._v("永久")]),t._v(" "),a("td",[t._v("多种类型")]),t._v(" "),a("td",[t._v("无")]),t._v(" "),a("td",[t._v("√")]),t._v(" "),a("td",[t._v("同源策略")])]),t._v(" "),a("tr",[a("td",[t._v("localForage")]),t._v(" "),a("td",[t._v("永久")]),t._v(" "),a("td",[t._v("多种类型")]),t._v(" "),a("td",[t._v("取决于浏览器兼容性")]),t._v(" "),a("td",[t._v("√")]),t._v(" "),a("td")])])]),t._v(" "),a("blockquote",[a("p",[t._v("同源策略：相同的协议、主机名、端口")])]),t._v(" "),a("h2",{attrs:{id:"cookie"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie"}},[t._v("#")]),t._v(" cookie")]),t._v(" "),a("blockquote",[a("p",[t._v("服务器为了识别用户而存储在用户本地的文件。以键值对形式存储在本地，在浏览器请求"),a("strong",[t._v("相应")]),t._v("web 页面的时候携带在 HTTP 头中")])]),t._v(" "),a("h3",{attrs:{id:"缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缺点"}},[t._v("#")]),t._v(" 缺点")]),t._v(" "),a("ul",[a("li",[t._v("可能被禁用")]),t._v(" "),a("li",[t._v("与浏览器相关。同一个用户用不同浏览器访问同一个页面的数据不能互通")]),t._v(" "),a("li",[t._v("可能被用户删除")]),t._v(" "),a("li",[t._v("安全性没有保障，因为是以纯文本保存的，信息需要事先加密")]),t._v(" "),a("li",[t._v("性能缺陷：cookie 和域名绑定，不管其下的某个子地址是否需要，都会携带")])]),t._v(" "),a("h3",{attrs:{id:"操作-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#操作-api"}},[t._v("#")]),t._v(" 操作 API")]),t._v(" "),a("p",[t._v("在 JS 中利用 document.cookie 进行操作")]),t._v(" "),a("h4",{attrs:{id:"创建-修改"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建-修改"}},[t._v("#")]),t._v(" 创建 & 修改")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cookie "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"userName=xxx; age=xx; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("ul",[a("li",[t._v("开头的键值对表示 cookie 的内容,可以包含多个键值对")]),t._v(" "),a("li",[t._v("expires 表示过期时间（以 UTC 或 GMT 时间）。"),a("strong",[t._v("默认在浏览器关闭时删除")])]),t._v(" "),a("li",[t._v("path 表示 cookie 对应的路径。"),a("strong",[t._v("默认为当前页面")])])]),t._v(" "),a("p",[t._v("修改方式和创建相同，即对同名的键重新赋值将旧的值覆盖。\n注意：多次为 document.cookie 赋值，新的键值对会添加到原本的键值对之中，而不会直接覆盖")]),t._v(" "),a("h4",{attrs:{id:"读取"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#读取"}},[t._v("#")]),t._v(" 读取")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回所有cookie键值对：userName=xxx; age=xx;")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cookie"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("h4",{attrs:{id:"删除"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#删除"}},[t._v("#")]),t._v(" 删除")]),t._v(" "),a("p",[t._v("不必显式删除，将有效时间改为过去即可。")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cookie "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"userName; expires=Thu, 18 Dec 2000 12:00:00 GMT; path=/"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"sessionstorage-localstorage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sessionstorage-localstorage"}},[t._v("#")]),t._v(" sessionStorage & localStorage")]),t._v(" "),a("h3",{attrs:{id:"特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特点"}},[t._v("#")]),t._v(" 特点")]),t._v(" "),a("ul",[a("li",[t._v("都是全局对象 window 的属性。在本地创建键值对存储数据")]),t._v(" "),a("li",[t._v("操作的 API 基本相同")]),t._v(" "),a("li",[t._v("有效时间不同：\n"),a("ul",[a("li",[t._v("localStorage 有效期为永久，除非手动删除")]),t._v(" "),a("li",[t._v("sessionStorage 有效期为窗口打开期间。关闭时自动清除")])])])]),t._v(" "),a("h3",{attrs:{id:"缺点-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#缺点-2"}},[t._v("#")]),t._v(" 缺点")]),t._v(" "),a("ul",[a("li",[t._v("存储容量受限，一般只有几 M")]),t._v(" "),a("li",[t._v("仅支持字符串，存储对象时需要转换")]),t._v(" "),a("li",[t._v("读取是同步的。可能出现延迟影响用户体验")])]),t._v(" "),a("h3",{attrs:{id:"操作-api-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#操作-api-2"}},[t._v("#")]),t._v(" 操作 API")]),t._v(" "),a("h4",{attrs:{id:"创建-修改-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建-修改-2"}},[t._v("#")]),t._v(" 创建 & 修改")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("localStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setItem")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"key"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"someValue"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 或直接用等号赋值")]),t._v("\nlocalStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("key "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"someValue"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("修改方式即同名覆盖")]),t._v(" "),a("h4",{attrs:{id:"读取-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#读取-2"}},[t._v("#")]),t._v(" 读取")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" localStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getItem")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"key"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"someValue"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 或直接读取属性名")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" localStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("h4",{attrs:{id:"删除-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#删除-2"}},[t._v("#")]),t._v(" 删除")]),t._v(" "),a("ul",[a("li",[t._v("删除某一个键值对")])]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("localStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeItem")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"key"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("ul",[a("li",[t._v("清空所有键值对")])]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("localStorage"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clear")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h2",{attrs:{id:"indexeddb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#indexeddb"}},[t._v("#")]),t._v(" indexedDB")]),t._v(" "),a("ul",[a("li",[t._v("一种"),a("strong",[t._v("非关系型数据库")]),t._v("，存储的内容不再受字符串类型的限制，同时大小也不再受限。")]),t._v(" "),a("li",[a("strong",[t._v("支持异步读写")]),t._v("。")])]),t._v(" "),a("p",[t._v("由于其 API 需要额外的学习成本，使用"),a("strong",[t._v("localForage")]),t._v("进行操作即可。")]),t._v(" "),a("h2",{attrs:{id:"localforage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#localforage"}},[t._v("#")]),t._v(" localForage")]),t._v(" "),a("ul",[a("li",[t._v("智能的存储方案：indexedDB -> WebSQL -> localStorage，优先级从高到低，保证了兼容所有主流浏览器")]),t._v(" "),a("li",[t._v("异步 API，支持回调函数形式和 Promise 形式")]),t._v(" "),a("li",[t._v("读取、创建、删除等 API 都与 localStorage 相同")])]),t._v(" "),a("h3",{attrs:{id:"遍历所有键值对"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#遍历所有键值对"}},[t._v("#")]),t._v(" 遍历所有键值对")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("localforage\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("iterate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" iterationNumber")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此回调函数将对所有 key/value 键值对运行")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Iteration has completed"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("catch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 当出错时，此处代码运行")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);