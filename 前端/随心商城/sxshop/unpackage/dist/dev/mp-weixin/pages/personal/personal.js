"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_assets._imports_0$1,
    b: common_assets._imports_1,
    c: common_vendor.p({
      type: "download-filled",
      size: "30"
    }),
    d: common_vendor.p({
      type: "right",
      size: "30"
    }),
    e: common_vendor.p({
      type: "download-filled",
      size: "30"
    }),
    f: common_vendor.p({
      type: "right",
      size: "30"
    }),
    g: common_vendor.p({
      type: "download-filled",
      size: "30"
    }),
    h: common_vendor.p({
      type: "right",
      size: "30"
    }),
    i: common_vendor.p({
      type: "download-filled",
      size: "30"
    }),
    j: common_vendor.p({
      type: "right",
      size: "30"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ae23533"]]);
wx.createPage(MiniProgramPage);
