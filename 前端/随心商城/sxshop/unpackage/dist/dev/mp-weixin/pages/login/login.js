"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_api = require("../../common/api/api.js");
const _sfc_main = {
  setup() {
    const nowindex = common_vendor.ref(1);
    const isPassword = common_vendor.ref(true);
    const getcode = common_vendor.ref(false);
    const getcodemes = common_vendor.ref("获取验证码");
    const sendcall = common_vendor.ref(false);
    const showimgcode = common_vendor.ref(false);
    const imageCode = common_vendor.ref("");
    const confirmactive = common_vendor.ref(false);
    const select = common_vendor.ref(["立即注册", "密码登录"]);
    const formData = common_vendor.reactive({
      phone: "",
      password: "",
      code: "",
      captchaurl: "",
      captcha_id: "",
      captcha: ""
    });
    const handleSubmit = async () => {
      console.log("Form submitted", formData);
      if (nowindex.value != 0) {
        try {
          const res = await common_api_api.login(formData);
          common_vendor.index.setStorageSync("token", res.token);
          common_vendor.index.setStorageSync("account", res.nickname);
          common_vendor.index.setStorageSync("id", res.id);
          console.log("Login successful", res);
          common_vendor.index.navigateTo({
            url: "/pages/index/index"
            // 请根据实际主界面的路径进行修改
          });
        } catch (error) {
          console.error("Login failed", error);
        }
      }
    };
    const turntap = (e) => {
      nowindex.value = e.target.dataset.num;
    };
    const changestyle = (e) => {
    };
    const lossstyle = (e) => {
    };
    const getshortmes = () => {
    };
    const voiceCode = () => {
    };
    const changePassType = () => {
      isPassword.value = !isPassword.value;
    };
    const forgetpass = () => {
    };
    const skipAgreePage = () => {
    };
    const closeImgCode = () => {
      showimgcode.value = false;
    };
    const getImgCode = (e) => {
    };
    const changeImgCode = () => {
    };
    const confirmCode = () => {
    };
    const captchaimg = async () => {
      const res = await common_api_api.getCaptcha();
      formData.captcha_id = res.captchaId;
      formData.captchaurl = res.picPath;
    };
    common_vendor.onMounted(() => {
      captchaimg();
    });
    return {
      nowindex,
      isPassword,
      getcode,
      getcodemes,
      sendcall,
      showimgcode,
      imageCode,
      confirmactive,
      select,
      formData,
      handleSubmit,
      turntap,
      changestyle,
      lossstyle,
      getshortmes,
      voiceCode,
      changePassType,
      forgetpass,
      skipAgreePage,
      closeImgCode,
      getImgCode,
      changeImgCode,
      confirmCode,
      captchaimg
    };
  }
};
if (!Array) {
  const _easycom_cc_selectBox2 = common_vendor.resolveComponent("cc-selectBox");
  _easycom_cc_selectBox2();
}
const _easycom_cc_selectBox = () => "../../components/cc-selectBox/cc-selectBox.js";
if (!Math) {
  _easycom_cc_selectBox();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.turntap),
    b: common_vendor.p({
      ["select-arr"]: $setup.select,
      nowindex: $setup.nowindex
    }),
    c: $setup.nowindex != 1
  }, $setup.nowindex != 1 ? common_vendor.e({
    d: common_vendor.o((...args) => $setup.lossstyle && $setup.lossstyle(...args)),
    e: common_vendor.o((...args) => $setup.changestyle && $setup.changestyle(...args)),
    f: $setup.formData.phone,
    g: common_vendor.o(($event) => $setup.formData.phone = $event.detail.value),
    h: common_vendor.o((...args) => $setup.lossstyle && $setup.lossstyle(...args)),
    i: common_vendor.o((...args) => $setup.changestyle && $setup.changestyle(...args)),
    j: $setup.isPassword ? "password" : "text",
    k: $setup.formData.password,
    l: common_vendor.o(($event) => $setup.formData.password = $event.detail.value),
    m: common_vendor.o((...args) => $setup.lossstyle && $setup.lossstyle(...args)),
    n: common_vendor.o((...args) => $setup.changestyle && $setup.changestyle(...args)),
    o: $setup.formData.code,
    p: common_vendor.o(($event) => $setup.formData.code = $event.detail.value),
    q: common_vendor.t($setup.getcodemes),
    r: common_vendor.o((...args) => $setup.getshortmes && $setup.getshortmes(...args)),
    s: common_vendor.n("code-btn " + ($setup.getcode ? "active" : "") + " ptp_exposure"),
    t: $setup.sendcall
  }, $setup.sendcall ? {
    v: common_vendor.o((...args) => $setup.voiceCode && $setup.voiceCode(...args))
  } : {}) : {}, {
    w: $setup.nowindex != 0
  }, $setup.nowindex != 0 ? {
    x: common_vendor.o((...args) => $setup.lossstyle && $setup.lossstyle(...args)),
    y: common_vendor.o((...args) => $setup.changestyle && $setup.changestyle(...args)),
    z: $setup.formData.phone,
    A: common_vendor.o(($event) => $setup.formData.phone = $event.detail.value),
    B: common_vendor.o((...args) => $setup.lossstyle && $setup.lossstyle(...args)),
    C: common_vendor.o((...args) => $setup.changestyle && $setup.changestyle(...args)),
    D: $setup.isPassword ? "password" : "text",
    E: $setup.formData.password,
    F: common_vendor.o(($event) => $setup.formData.password = $event.detail.value),
    G: common_vendor.o((...args) => $setup.changePassType && $setup.changePassType(...args)),
    H: common_vendor.n("iconfont " + ($setup.isPassword ? "iconeye_off" : "iconeye")),
    I: $setup.formData.captchaurl,
    J: common_vendor.o((...args) => $setup.captchaimg && $setup.captchaimg(...args)),
    K: common_vendor.o((...args) => $setup.lossstyle && $setup.lossstyle(...args)),
    L: common_vendor.o((...args) => $setup.changestyle && $setup.changestyle(...args)),
    M: $setup.isPassword ? "password" : "text",
    N: $setup.formData.captcha,
    O: common_vendor.o(($event) => $setup.formData.captcha = $event.detail.value),
    P: common_vendor.o((...args) => $setup.forgetpass && $setup.forgetpass(...args))
  } : {}, {
    Q: common_vendor.o((...args) => $setup.handleSubmit && $setup.handleSubmit(...args)),
    R: common_vendor.o((...args) => $setup.skipAgreePage && $setup.skipAgreePage(...args)),
    S: $setup.showimgcode
  }, $setup.showimgcode ? {
    T: common_vendor.o((...args) => $setup.closeImgCode && $setup.closeImgCode(...args))
  } : {}, {
    U: $setup.showimgcode
  }, $setup.showimgcode ? {
    V: common_vendor.o((...args) => $setup.getImgCode && $setup.getImgCode(...args)),
    W: common_vendor.o((...args) => $setup.changeImgCode && $setup.changeImgCode(...args)),
    X: $setup.imageCode,
    Y: common_vendor.o((...args) => $setup.confirmCode && $setup.confirmCode(...args)),
    Z: common_vendor.n("choosesure " + ($setup.confirmactive ? "active" : "") + " ptp_exposure")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
