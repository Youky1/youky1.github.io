import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Router from "vue-router";
function decode(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      warn(false, 'Error decoding "' + str + '". Leaving it intact.');
    }
  }
  return str;
}

const VueRouterMatch = Router.prototype.match;
Router.prototype.match = function match(raw, currentRoute, redirectedFrom) {
  if (typeof raw === "string") {
    raw = decode(raw);
  }
  return VueRouterMatch.call(this, raw, currentRoute, redirectedFrom);
};

export default ({ Vue }) => {
  Vue.use(ElementUI);
  return {};
};
