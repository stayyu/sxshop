if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _imports_0$1 = "/static/images/6dpirgjo.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$5 = {};
  function _sfc_render$4(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "themItem" }, [
      vue.createElementVNode("navigator", {
        url: "",
        class: "box"
      }, [
        vue.createElementVNode("img", {
          src: _imports_0$1,
          alt: "",
          class: "pic"
        }),
        vue.createElementVNode("view", { class: "sl" }, "销量：15"),
        vue.createElementVNode("view", { class: "name" }, "火龙果"),
        vue.createElementVNode("view", { class: "p" }, "优惠后 | 已优惠3元"),
        vue.createElementVNode("view", { class: "price" }, "￥15")
      ])
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-473cc923"], ["__file", "C:/Users/stay/Desktop/毕业设计/商城项目/前端/随心商城/sxshop/components/good-item/good-item.vue"]]);
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _imports_0 = "/static/icon/fangdajing.png";
  const _imports_1 = "/static/images/1.png";
  const _sfc_main$4 = {};
  function _sfc_render$3(_ctx, _cache) {
    const _component_good_item = resolveEasycom(vue.resolveDynamicComponent("good-item"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "homeLayout" }, [
      vue.createElementVNode("view", { class: "title" }, "随心商城"),
      vue.createElementVNode("view", { class: "top" }, [
        vue.createElementVNode("image", {
          src: _imports_0,
          class: "image-view"
        })
      ]),
      vue.createElementVNode("view", { class: "banner" }, [
        vue.createElementVNode("swiper", {
          "indicator-dots": "",
          circular: "",
          "indicator-color": "#c0c0c0",
          "indicator-active-color": "#3F536E",
          autoplay: ""
        }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(3, (item) => {
              return vue.createElementVNode("swiper-item", null, [
                vue.createElementVNode("image", {
                  src: _imports_1,
                  mode: "aspectFill"
                })
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "category" }),
      vue.createElementVNode("view", { class: "content" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(8, (item) => {
            return vue.createVNode(_component_good_item);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/stay/Desktop/毕业设计/商城项目/前端/随心商城/sxshop/pages/index/index.vue"]]);
  const _sfc_main$3 = {};
  function _sfc_render$2(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "iconfont icon-fangdajing" }, "111")
    ]);
  }
  const PagesCategoryCategory = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "C:/Users/stay/Desktop/毕业设计/商城项目/前端/随心商城/sxshop/pages/category/category.vue"]]);
  const _sfc_main$2 = {};
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesShoppingCartShoppingCart = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/Users/stay/Desktop/毕业设计/商城项目/前端/随心商城/sxshop/pages/shopping_cart/shopping_cart.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesPersonalPersonal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/stay/Desktop/毕业设计/商城项目/前端/随心商城/sxshop/pages/personal/personal.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/category/category", PagesCategoryCategory);
  __definePage("pages/shopping_cart/shopping_cart", PagesShoppingCartShoppingCart);
  __definePage("pages/personal/personal", PagesPersonalPersonal);
  const _sfc_main = {};
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/stay/Desktop/毕业设计/商城项目/前端/随心商城/sxshop/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
