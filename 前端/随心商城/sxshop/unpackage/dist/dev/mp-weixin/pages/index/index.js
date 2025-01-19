"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const common_api_api = require("../../common/api/api.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_good_item2 = common_vendor.resolveComponent("good-item");
  (_easycom_custom_nav_bar2 + _easycom_good_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_good_item = () => "../../components/good-item/good-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_good_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.reactive({
      pn: 1,
      // 页码
      pnum: 10,
      // 每页显示的商品数量
      q: "",
      // 搜索关键词
      c: null,
      // 分类ID
      b: null
      // 品牌ID
    });
    const goodsItems = common_vendor.ref();
    common_vendor.onMounted(() => {
      fetchCartItems();
    });
    const fetchCartItems = async (goodsParams) => {
      try {
        const response = await common_api_api.getGoods(goodsParams);
        console.log(response.data);
        goodsItems.value = response.data;
        console.log(goodsItems.value);
      } catch (error) {
        console.error("获取商品失败", error);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "随心商城"
        }),
        b: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        c: common_assets._imports_0,
        d: common_vendor.f(goodsItems.value, (item, index, i0) => {
          return {
            a: "1cf27b2a-1-" + i0,
            b: common_vendor.p({
              obj: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
