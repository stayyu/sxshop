"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_api = require("../../common/api/api.js");
const _sfc_main = {
  __name: "shopping_cart",
  setup(__props) {
    const cartItems = common_vendor.ref([]);
    const fetchCartItems = async () => {
      try {
        const response = await common_api_api.getShopCarts();
        cartItems.value = response.data;
      } catch (error) {
        console.error("获取购物车商品失败", error);
      }
    };
    const removeFromCart = async (goodsId) => {
      try {
        await common_api_api.deleteShopCart(goodsId);
        fetchCartItems();
      } catch (error) {
        console.error("删除购物车商品失败", error);
      }
    };
    common_vendor.onMounted(() => {
      fetchCartItems();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: cartItems.value.length === 0
      }, cartItems.value.length === 0 ? {} : {
        b: common_vendor.f(cartItems.value, (item, k0, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.price),
            d: common_vendor.o(($event) => removeFromCart(item.id), item.id),
            e: item.id
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7cc1684a"]]);
wx.createPage(MiniProgramPage);
