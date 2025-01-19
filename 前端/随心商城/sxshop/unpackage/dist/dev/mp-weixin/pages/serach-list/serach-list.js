"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_h_good_item2 = common_vendor.resolveComponent("h-good-item");
  (_easycom_uni_search_bar2 + _easycom_h_good_item2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_h_good_item = () => "../../components/h-good-item/h-good-item.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_h_good_item)();
}
const _sfc_main = {
  __name: "serach-list",
  setup(__props) {
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12,
      keyword: ""
    });
    const onSearch = () => {
      historySearch.value = [.../* @__PURE__ */ new Set([queryParams.value.keyword, ...historySearch.value])];
      common_vendor.index.setStorageSync("historySearch", historySearch.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onSearch),
        b: common_vendor.o(_ctx.onClear),
        c: common_vendor.o(_ctx.onClear),
        d: common_vendor.o(($event) => queryParams.value.keyword = $event),
        e: common_vendor.p({
          focus: true,
          placeholder: "搜索",
          modelValue: queryParams.value.keyword
        }),
        f: common_vendor.f(8, (item, k0, i0) => {
          return {
            a: "ae88dc67-1-" + i0
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ae88dc67"]]);
wx.createPage(MiniProgramPage);
