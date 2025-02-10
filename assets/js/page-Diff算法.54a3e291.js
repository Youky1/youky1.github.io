(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{621:function(v,_,t){"use strict";t.r(_);var a=t(1),s=Object(a.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"diff-算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#diff-算法"}},[v._v("#")]),v._v(" Diff 算法")]),v._v(" "),_("p",[v._v("Diff 算法要解决的问题："),_("strong",[v._v("尽可能复用 DOM 节点，减少 DOM 操作")]),v._v("。")]),v._v(" "),_("h2",{attrs:{id:"简单-diff-算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#简单-diff-算法"}},[v._v("#")]),v._v(" 简单 Diff 算法")]),v._v(" "),_("p",[v._v("为了复用 DOM 节点，需要遍历更新前后的新旧节点列表进行比较。")]),v._v(" "),_("p",[v._v("考虑到元素数量不同的情况，应该遍历二者中较短的列表。然后判断新增元素还是删除元素。")]),v._v(" "),_("h3",{attrs:{id:"流程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#流程"}},[v._v("#")]),v._v(" 流程")]),v._v(" "),_("ol",[_("li",[v._v("通过 key 找到能复用的元素，并对旧节点完成 patch（此时节点顺序仍是旧节点顺序）")]),v._v(" "),_("li",[v._v("找到需要移动的元素，移动至目标位置。")]),v._v(" "),_("li",[v._v("添加新元素")]),v._v(" "),_("li",[v._v("移除不存在的元素")])]),v._v(" "),_("h3",{attrs:{id:"key-的使用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#key-的使用"}},[v._v("#")]),v._v(" Key 的使用")]),v._v(" "),_("p",[v._v("Key 的作用：当元素可以通过移动复用时，确定元素在更新前后的对应关系。")]),v._v(" "),_("p",[v._v("当两个节点的 type 和 key 都相同时，认为该节点可以复用。")]),v._v(" "),_("blockquote",[_("p",[v._v("复用"),_("strong",[v._v("不代表")]),v._v("不更新，仍需对两个节点进行 patch 操作")])]),v._v(" "),_("h3",{attrs:{id:"寻找需要移动的元素"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#寻找需要移动的元素"}},[v._v("#")]),v._v(" 寻找需要移动的元素")]),v._v(" "),_("p",[v._v("判断新节点在旧节点列表中的索引，若索引全为增序，即不需要移动，否则需要。")]),v._v(" "),_("p",[v._v("在遍历过程中，记录在旧节点中寻找到的索引最大值 lastIndex。若之后遇到索引值小于 lastIndex，即需要移动。")]),v._v(" "),_("h3",{attrs:{id:"如何移动元素"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#如何移动元素"}},[v._v("#")]),v._v(" 如何移动元素")]),v._v(" "),_("p",[v._v("通过 vdom 的 el 属性获取真实 DOM 的引用。移动后的位置即新节点中的位置。")]),v._v(" "),_("p",[v._v("对于旧节点 old1，在新节点中找到对应的 new1，然后找到它前一个元素 new0，将其插入到 new0 之后。")]),v._v(" "),_("h2",{attrs:{id:"双端-diff-算法-vue2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#双端-diff-算法-vue2"}},[v._v("#")]),v._v(" 双端 Diff 算法（Vue2）")]),v._v(" "),_("p",[v._v("对于新旧节点列表的首尾元素共四个节点分别进行四次比较：")]),v._v(" "),_("ol",[_("li",[v._v("若有可复用元素，进行 patch 和移动。")]),v._v(" "),_("li",[v._v("若无可复用元素，遍历旧元素列表，寻找对于新元素队头节点的可复用元素。")]),v._v(" "),_("li",[v._v("若步骤 2 仍没有可复用元素，则新增该节点并移动头指针")]),v._v(" "),_("li",[v._v("当新节点列表全部处理完，旧节点列表中头指针仍小于尾指针，说明有元素被移除。")])]),v._v(" "),_("h2",{attrs:{id:"快速-diff-算法-vue3"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#快速-diff-算法-vue3"}},[v._v("#")]),v._v(" 快速 Diff 算法（Vue3）")]),v._v(" "),_("h3",{attrs:{id:"预处理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#预处理"}},[v._v("#")]),v._v(" 预处理")]),v._v(" "),_("p",[v._v("借用文本 diff 的思想，在比较前先找出新旧列表的 key 值相同的前/后缀，该部分不需要进行移动，直接进行 patch 即可。")]),v._v(" "),_("p",[v._v("当预处理之后，有可能的情况：")]),v._v(" "),_("ol",[_("li",[v._v("新列表为空，即只有元素被删除")]),v._v(" "),_("li",[v._v("旧列表为空，即只有元素被添加")]),v._v(" "),_("li",[v._v("都不为空，需要继续进行 diff 比较")])]),v._v(" "),_("h3",{attrs:{id:"构建-source-数组"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#构建-source-数组"}},[v._v("#")]),v._v(" 构建 source 数组")]),v._v(" "),_("p",[v._v("source 数组记录新节点（排除掉前/后缀节点）在旧列表中的下标，若是新增元素则为-1。")]),v._v(" "),_("p",[v._v("source 数组后续会用来寻找 "),_("em",[v._v("最长递增子序列")]),v._v("。")]),v._v(" "),_("blockquote",[_("p",[v._v("呈递增趋势的子序列，不需连续，这些元素对应的 DOM 不需要移动")])]),v._v(" "),_("h3",{attrs:{id:"构建索引表"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#构建索引表"}},[v._v("#")]),v._v(" 构建索引表")]),v._v(" "),_("p",[v._v("要判断节点在旧列表中的下标，如果用双层 for 循环的形式，时间复杂度为 O(n²)。")]),v._v(" "),_("p",[v._v("使用索引表的优化思路：")]),v._v(" "),_("ul",[_("li",[v._v("遍历新节点列表，将 key 值和索引的映射关系记录到索引表")]),v._v(" "),_("li",[v._v("遍历旧节点列表，对于每个节点，用其 key 值在索引表中寻找对应下标，并相应的填充 source 数组")])]),v._v(" "),_("p",[v._v("此时两个 for 循环是并列的，因此时间复杂度降为 O(n)。")]),v._v(" "),_("h3",{attrs:{id:"判断元素移动"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#判断元素移动"}},[v._v("#")]),v._v(" 判断元素移动")]),v._v(" "),_("p",[v._v("在前两步之后，使用两个变量：")]),v._v(" "),_("ul",[_("li",[v._v("i，指向新节点队尾元素")]),v._v(" "),_("li",[v._v("s，指向 "),_("em",[v._v("最长递增子序列")]),v._v(" 的尾元素")])]),v._v(" "),_("p",[_("img",{attrs:{src:"https://res.weread.qq.com/wrepub/CB_3300028078_image00604.jpeg",alt:"imga"}})]),v._v(" "),_("p",[v._v("然后循环，使 i 递减（即从后向前遍历），判断 i 和 s 指向的元素是否相等：")]),v._v(" "),_("ul",[_("li",[v._v("若相等，说明改元素不需要移动，"),_("code",[v._v("s--")])]),v._v(" "),_("li",[v._v("若不相等，说明该元素需要移动。\n"),_("ul",[_("li",[v._v("若 source 数组中该元素对应的下标为-1，则作为新节点挂载。")]),v._v(" "),_("li",[v._v("若不为-1，则判断其真实位置作为锚点，移动 DOM")])])])])])}),[],!1,null,null,null);_.default=s.exports}}]);