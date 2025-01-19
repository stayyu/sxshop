"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  props: {
    selectArr: {
      type: Array,
      default: []
    },
    // 当前选中
    nowindex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    turntap(e) {
      this.$emit("change", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.selectArr, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.o((...args) => $options.turntap && $options.turntap(...args), index),
        c: index,
        d: index,
        e: common_vendor.n("act " + ($props.nowindex == index ? "active" : "")),
        f: index
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2c87c304"]]);
wx.createComponent(Component);
