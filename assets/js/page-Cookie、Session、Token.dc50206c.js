(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{668:function(v,_,t){"use strict";t.r(_);var e=t(1),a=Object(e.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"cookie、session、token"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#cookie、session、token"}},[v._v("#")]),v._v(" Cookie、Session、Token")]),v._v(" "),_("h2",{attrs:{id:"cookie"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#cookie"}},[v._v("#")]),v._v(" Cookie")]),v._v(" "),_("h3",{attrs:{id:"作用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#作用"}},[v._v("#")]),v._v(" 作用")]),v._v(" "),_("p",[v._v("解决HTTP协议无状态的特点，在客户端和服务器的交互过程中，记录用户特征。")]),v._v(" "),_("h3",{attrs:{id:"cookie的工作流程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#cookie的工作流程"}},[v._v("#")]),v._v(" cookie的工作流程")]),v._v(" "),_("ol",[_("li",[v._v("用户访问网站，站点对该用户生成一个唯一的标识（假设为123），以该标识作为索引在后端数据库中生成一个表项")]),v._v(" "),_("li",[v._v("服务器返回的"),_("strong",[v._v("响应报文")]),v._v("中，包含一个cookie首部行："),_("code",[v._v("Set-cookie:123")])]),v._v(" "),_("li",[v._v("用户接收到该响应后，在它管理的"),_("em",[v._v("cookie文件")]),v._v("中添加一行，包括该服务器的主机名称和cookie值（123）")]),v._v(" "),_("li",[v._v("该用户后续访问该域名时，会附带一个"),_("strong",[v._v("cookie首部行")]),v._v("："),_("code",[v._v("cookie:123")])]),v._v(" "),_("li",[v._v("网站根据接收到的cookie值，做出相应的响应")])]),v._v(" "),_("h3",{attrs:{id:"有效时间"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#有效时间"}},[v._v("#")]),v._v(" 有效时间")]),v._v(" "),_("p",[v._v("cookie的有效时间通过"),_("code",[v._v("Expires")]),v._v("和"),_("code",[v._v("Max-Age")]),v._v("属性来设置。")]),v._v(" "),_("ul",[_("li",[v._v("Expires定义的是过期的时间戳，是相对于服务器的时间的。如果客户端时间和服务器不一致，或是手动更改了时间，就没有意义了")]),v._v(" "),_("li",[v._v("max-age定义的是时间间隔，单位为秒，从浏览器收到报文开始计算")])]),v._v(" "),_("h3",{attrs:{id:"作用域"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#作用域"}},[v._v("#")]),v._v(" 作用域")]),v._v(" "),_("p",[v._v("通过domain和path两个属性确定cookie的有效域名和路径。")]),v._v(" "),_("ul",[_("li",[v._v("父域名的cookie子域名可以使用，"),_("strong",[v._v("反之不成立")])]),v._v(" "),_("li",[v._v("与域名对应的IP地址不能共享")]),v._v(" "),_("li",[v._v("指定路径的子路径，都可以共享cookie")])]),v._v(" "),_("h3",{attrs:{id:"安全性"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#安全性"}},[v._v("#")]),v._v(" 安全性")]),v._v(" "),_("ul",[_("li",[v._v("设置"),_("code",[v._v("secure")]),v._v("属性的cookie，只允许使用https发送。")]),v._v(" "),_("li",[v._v("设置"),_("code",[v._v("HttpOnly")]),v._v("属性的cookie，不能通过JS进行操作")]),v._v(" "),_("li",[v._v("设置"),_("code",[v._v("SameSite")]),v._v("属性，来控制跨站请求时不能携带cookie")])]),v._v(" "),_("h3",{attrs:{id:"缺点"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#缺点"}},[v._v("#")]),v._v(" 缺点")]),v._v(" "),_("ul",[_("li",[v._v("容量上，cookie的容量只有4KB，存储内容有限")]),v._v(" "),_("li",[v._v("性能上，域名下的页面无论是否需要都会发送cookie，造成浪费")]),v._v(" "),_("li",[v._v("安全性上，cookie通过明文传输，容易被拦截窃取")])]),v._v(" "),_("h2",{attrs:{id:"session"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#session"}},[v._v("#")]),v._v(" Session")]),v._v(" "),_("h3",{attrs:{id:"特点"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#特点"}},[v._v("#")]),v._v(" 特点")]),v._v(" "),_("ul",[_("li",[v._v("存储在服务器端")]),v._v(" "),_("li",[v._v("对每一个用户，生成唯一的Session ID，每个ID对应一份用户信息。并将ID返回给用户")]),v._v(" "),_("li",[v._v("用户在后续请求时附带这个Session ID，服务端即可识别用户的身份")])]),v._v(" "),_("h3",{attrs:{id:"与cookie的区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#与cookie的区别"}},[v._v("#")]),v._v(" 与cookie的区别")]),v._v(" "),_("ul",[_("li",[v._v("cookie是将信息直接全部存入cookie中")]),v._v(" "),_("li",[v._v("session方法只将ID放入cookie，而用户信息存在服务器上，避免了信息泄露")])]),v._v(" "),_("h3",{attrs:{id:"缺点-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#缺点-2"}},[v._v("#")]),v._v(" 缺点")]),v._v(" "),_("ul",[_("li",[v._v("大量用户信息会占用服务器资源")]),v._v(" "),_("li",[v._v("如果Session信息存储在一台服务器上，则访问集群中其他服务器时无法获取登录状态")]),v._v(" "),_("li",[v._v("如果将所有Session信息集中到一台服务器上，则该服务器一旦出现故障所有登录状态会出现丢失")])]),v._v(" "),_("h2",{attrs:{id:"token"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#token"}},[v._v("#")]),v._v(" Token")]),v._v(" "),_("h3",{attrs:{id:"流程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#流程"}},[v._v("#")]),v._v(" 流程")]),v._v(" "),_("ol",[_("li",[v._v("用户登录")]),v._v(" "),_("li",[v._v("认证成功后，生成一个JSON对象（JSON Web Token，简称jwt）")]),v._v(" "),_("li",[v._v("对jwt使用自己的秘钥进行加密，然后返回给客户端")]),v._v(" "),_("li",[v._v("客户端再次请求时，附带这个jwt\n"),_("ul",[_("li",[v._v("可以附带在Cookie中，但不能跨域。解决方法是放在POST请求的body里")]),v._v(" "),_("li",[v._v("可以放在请求头的"),_("code",[v._v("Authorization")]),v._v("字段中")])])]),v._v(" "),_("li",[v._v("服务端对jwt的合法性进行验证，若合法则返回相关数据")])]),v._v(" "),_("h3",{attrs:{id:"jwt的结构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#jwt的结构"}},[v._v("#")]),v._v(" jwt的结构")]),v._v(" "),_("h4",{attrs:{id:"header-头部"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#header-头部"}},[v._v("#")]),v._v(" Header（头部）")]),v._v(" "),_("p",[v._v("一个JSON对象，包含两部分：")]),v._v(" "),_("ol",[_("li",[v._v("使用的签名算法")]),v._v(" "),_("li",[v._v("Token类型（JWT）")])]),v._v(" "),_("h4",{attrs:{id:"payload-负载"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#payload-负载"}},[v._v("#")]),v._v(" Payload（负载）")]),v._v(" "),_("p",[v._v("一个JSON对象，用于存放需要传递的数据。官方定义了七个字段：")]),v._v(" "),_("ul",[_("li",[v._v("iss (issuer)：签发人")]),v._v(" "),_("li",[v._v("exp (expiration time)：过期时间")]),v._v(" "),_("li",[v._v("sub (subject)：主题")]),v._v(" "),_("li",[v._v("aud (audience)：受众")]),v._v(" "),_("li",[v._v("nbf (Not Before)：生效时间")]),v._v(" "),_("li",[v._v("iat (Issued At)：签发时间")]),v._v(" "),_("li",[v._v("jti (JWT ID)：编号")])]),v._v(" "),_("h4",{attrs:{id:"signature-签名"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#signature-签名"}},[v._v("#")]),v._v(" Signature（签名）")]),v._v(" "),_("p",[v._v("对前两部分的签名，是为了"),_("strong",[v._v("防止数据被篡改")])]),v._v(" "),_("ol",[_("li",[v._v("首先指定一个只有服务端自己知道的秘钥secret")]),v._v(" "),_("li",[v._v("使用Header里指定的算法对Header、Payload、secret进行签名。")])]),v._v(" "),_("h3",{attrs:{id:"缺点-3"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#缺点-3"}},[v._v("#")]),v._v(" 缺点")]),v._v(" "),_("ul",[_("li",[v._v("默认不加密，此时不能写入私密信息")]),v._v(" "),_("li",[v._v("无法在token到期前终止token的权限，除非在服务端部署额外逻辑")]),v._v(" "),_("li",[v._v("jwt一旦被盗用，则盗用者可以获得权限")])])])}),[],!1,null,null,null);_.default=a.exports}}]);