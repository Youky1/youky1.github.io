(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{681:function(t,v,_){"use strict";_.r(v);var e=_(1),a=Object(e.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"tcp报文的时间戳"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#tcp报文的时间戳"}},[t._v("#")]),t._v(" TCP报文的时间戳")]),t._v(" "),v("p",[t._v("作用有两个：")]),t._v(" "),v("ol",[v("li",[t._v("计算往返时间RTT")]),t._v(" "),v("li",[t._v("防止序列号回绕")])]),t._v(" "),v("h2",{attrs:{id:"计算rtt"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#计算rtt"}},[t._v("#")]),t._v(" 计算RTT")]),t._v(" "),v("p",[t._v("以a向b发送为例")]),t._v(" "),v("ol",[v("li",[t._v("a发送的报文1中，"),v("code",[t._v("timestamp")]),t._v("字段存放的是发送时的时间"),v("code",[t._v("timeA")])]),t._v(" "),v("li",[t._v("b向a回复的报文2中，"),v("code",[t._v("timestamp")]),t._v("字段存放的是发送时的时间"),v("code",[t._v("timeB")]),t._v("，"),v("code",[t._v("timestamp echo")]),t._v("字段存放的是"),v("code",[t._v("timeA")])]),t._v(" "),v("li",[t._v("a收到报文2时，时间为"),v("code",[t._v("timeA'")]),t._v("，再从报文中读取"),v("code",[t._v("timeA")]),t._v("，即可计算RTT")])]),t._v(" "),v("h2",{attrs:{id:"防止序列号回绕"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#防止序列号回绕"}},[t._v("#")]),t._v(" 防止序列号回绕")]),t._v(" "),v("p",[t._v("序列号"),v("code",[t._v("Sequence Number")]),t._v("是0~2^31-1范围内循环的，即达到最大值后从0重新开始循环。")]),t._v(" "),v("p",[t._v("序列号用于确认报文的顺序，以便按正确的顺序进行组装。若出现回绕，则会造成疑惑。")]),t._v(" "),v("p",[t._v("而通过时间戳，则可以分辨不同数据包发送的先后顺序。")])])}),[],!1,null,null,null);v.default=a.exports}}]);