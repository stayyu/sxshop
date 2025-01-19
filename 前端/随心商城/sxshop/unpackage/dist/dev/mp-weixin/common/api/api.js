"use strict";
const common_vendor = require("../vendor.js");
let goodsUrl = "http://192.168.110.1:8022";
let orderUrl = "http://192.168.110.1:8023";
let userUrl = "http://192.168.110.1:8021";
const request = (options) => {
  return new Promise((resolve, reject) => {
    if (options.header) {
      options.header["Authorization"] = "Bearer " + common_vendor.index.getStorageSync("token");
      options.header["x-token"] = common_vendor.index.getStorageSync("token");
    } else {
      options.header = {
        "Authorization": "Bearer " + common_vendor.index.getStorageSync("token"),
        "x-token": common_vendor.index.getStorageSync("token")
      };
    }
    common_vendor.index.request({
      ...options,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
function getCaptcha(params) {
  return request({
    url: `${userUrl}/u/v1/base/captcha`,
    method: "GET"
  });
}
const getGoods = (params) => {
  return request({
    url: `${goodsUrl}/g/v1/goods`,
    method: "GET",
    data: params
  });
};
const getGoodsDetail = (goodId) => {
  return request({
    url: `${goodsUrl}/g/v1/goods/${goodId}`,
    method: "GET"
  });
};
const getShopCarts = (params) => {
  return request({
    url: `${orderUrl}/o/v1/shopcarts`,
    method: "GET"
  });
};
const deleteShopCart = (goodsId) => {
  return request({
    url: `${orderUrl}/o/v1/shopcarts/${goodsId}`,
    method: "DELETE"
  });
};
const login = (params) => {
  return request({
    url: `${userUrl}/u/v1/user/pwd_login`,
    method: "POST",
    data: params
  });
};
exports.deleteShopCart = deleteShopCart;
exports.getCaptcha = getCaptcha;
exports.getGoods = getGoods;
exports.getGoodsDetail = getGoodsDetail;
exports.getShopCarts = getShopCarts;
exports.login = login;
