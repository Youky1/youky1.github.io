(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{658:function(v,_,t){"use strict";t.r(_);var l=t(1),i=Object(l.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"从输入-url-到页面显示-经历了哪些过程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#从输入-url-到页面显示-经历了哪些过程"}},[v._v("#")]),v._v(" 从输入 URL 到页面显示，经历了哪些过程")]),v._v(" "),_("h2",{attrs:{id:"一、网络部分"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、网络部分"}},[v._v("#")]),v._v(" 一、网络部分")]),v._v(" "),_("ol",[_("li",[v._v("根据输入的 URL 构建 HTTP 请求")]),v._v(" "),_("li",[v._v("查找缓存：如果命中直接使用，否则进入下一步")]),v._v(" "),_("li",[v._v("DNS 解析：将域名映射为 IP 地址")]),v._v(" "),_("li",[v._v("建立 TCP 连接，发送 HTTP 请求")])]),v._v(" "),_("h2",{attrs:{id:"二、浏览器解析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、浏览器解析"}},[v._v("#")]),v._v(" 二、浏览器解析")]),v._v(" "),_("ol",[_("li",[_("p",[v._v("根据 HTML 代码，构建 DOM 树")])]),v._v(" "),_("li",[_("p",[v._v("根据 CSS 代码，构建样式树。\n这一步涉及的内容：")])])]),v._v(" "),_("ul",[_("li",[v._v("格式化样式表。将 link 标签引入的外部样式、style 标签中的样式、标签的内嵌样式进行整合")]),v._v(" "),_("li",[v._v("标准化样式属性。如将"),_("code",[v._v("em")]),v._v("转换为"),_("code",[v._v("px")]),v._v("，颜色"),_("code",[v._v("red")]),v._v("转换为"),_("code",[v._v("#ff0000")])]),v._v(" "),_("li",[v._v("计算每个节点的具体属性")])]),v._v(" "),_("ol",{attrs:{start:"3"}},[_("li",[_("p",[v._v("生成 render 树，和 DOM 树基本对应，但只包含可见元素")])]),v._v(" "),_("li",[_("p",[v._v("生成布局树。在这一步确定了节点的坐标位置和尺寸")])])]),v._v(" "),_("h2",{attrs:{id:"三、渲染过程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#三、渲染过程"}},[v._v("#")]),v._v(" 三、渲染过程")]),v._v(" "),_("ol",[_("li",[v._v("建立图层树。\n"),_("blockquote",[_("p",[v._v("目的：显示 3D 动画的变换效果，以及当元素含有层叠上下文时如何控制显示和隐藏。")])])])]),v._v(" "),_("p",[v._v("一般的节点会默认属于父节点的图层（父节点的图层称为"),_("strong",[v._v("合成层")]),v._v("），但有些情况下，会将其自身提升为合成层：")]),v._v(" "),_("ul",[_("li",[v._v("设置了"),_("code",[v._v("position")]),v._v("属性，且设置了"),_("code",[v._v("z-index")])]),v._v(" "),_("li",[_("code",[v._v("opacity")]),v._v("取值不为 1")]),v._v(" "),_("li",[_("code",[v._v("transform")]),v._v("不为 none")]),v._v(" "),_("li",[_("code",[v._v("isolation")]),v._v("取值为"),_("code",[v._v("isolation")])]),v._v(" "),_("li",[v._v("内容需要剪裁（如文字溢出）")]),v._v(" "),_("li",[v._v("隐式合成："),_("strong",[v._v("层叠等级低的节点")]),v._v("提升后，"),_("strong",[v._v("所有层级比它高的节点")]),v._v("都会提升")])]),v._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[_("p",[v._v("生成绘制列表：将图层的绘制拆分为一个个绘制指令。")])]),v._v(" "),_("li",[_("p",[v._v("将图层分块。由"),_("strong",[v._v("合成线程")]),v._v("生成低分辨率的"),_("em",[v._v("图块")])])]),v._v(" "),_("li",[_("p",[_("strong",[v._v("栅格化线程")]),v._v("生成高分辨率的"),_("em",[v._v("位图")])])]),v._v(" "),_("li",[_("p",[v._v("栅格化操作完成后，显示器显示内容")])])])])}),[],!1,null,null,null);_.default=i.exports}}]);