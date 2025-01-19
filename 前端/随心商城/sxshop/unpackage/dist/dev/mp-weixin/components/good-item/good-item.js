"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "good-item",
  props: {
    obj: {
      type: Object,
      default() {
        return { front_image: "默认" };
      }
    }
  },
  setup(__props) {
    const ac = __props;
    common_vendor.onMounted(() => {
    });
    const getDetail = async () => {
      const id = ac.obj.id;
      common_vendor.index.navigateTo({
        url: "/pages/details/details?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: __props.obj.front_image,
        b: __props.obj.is_new,
        c: __props.obj.is_hot,
        d: common_vendor.t(__props.obj.category.name),
        e: common_vendor.t(__props.obj.goods_brief),
        f: common_vendor.t(__props.obj.shop_price),
        g: common_vendor.o(($event) => getDetail())
      };
    };
  }
};
wx.createComponent(_sfc_main);
