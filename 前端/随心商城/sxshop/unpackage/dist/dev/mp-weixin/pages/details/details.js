"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const common_api_api = require("../../common/api/api.js");
const _sfc_main = {
  __name: "details",
  setup(__props) {
    const goodp = common_vendor.ref([]);
    const goodlist = common_vendor.ref([]);
    const descimage = common_vendor.ref([]);
    const queryParams = common_vendor.reactive({
      id: 1
    });
    common_vendor.onLoad((e) => {
      let { id = null } = e;
      queryParams.id = id;
      gooddetail();
    });
    const gooddetail = async () => {
      let res = await common_api_api.getGoodsDetail(queryParams.id);
      goodlist.value = res;
      goodp.value = res.images;
      descimage.value = res.desc_images;
      console.log(goodlist.value);
    };
    common_vendor.onNavigationBarButtonTap((e) => {
      if (e.type === "share") {
        common_vendor.index.share({
          "provider": "weixin",
          "type": 0,
          "scene": "WXSceneSession",
          "title": goodlist.goods_brief,
          "href": "http://localhost:5173/#/pages/details/details?id=" + goodlist.id,
          imageUrl: goodlist.front_image,
          success: function(res) {
            common_vendor.index.showTabBar({
              title: "分享成功"
            });
          },
          fail: function(err) {
            console.log("fail:" + JSON.stringify(err));
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(goodp.value, (item, index, i0) => {
          return {
            a: goodp.value[index]
          };
        }),
        b: common_vendor.t(goodlist.value.soldnum),
        c: common_vendor.t(goodlist.value.shop_price),
        d: common_vendor.t(goodlist.value.marketprice),
        e: common_vendor.t(goodlist.value.goods_brief),
        f: common_vendor.t(goodlist.value.brand.name),
        g: common_vendor.f(descimage.value, (item, index, i0) => {
          return {
            a: descimage.value[index]
          };
        }),
        h: common_assets._imports_0$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4b799d2f"]]);
wx.createPage(MiniProgramPage);
