let host = 'http://localhost:5173';
let goodsUrl = "http://192.168.110.1:8022"
let orderUrl = "http://192.168.110.1:8023"
let userUrl = "http://192.168.110.1:8021"
let userOpUrl = "http://192.168.110.1:8027"
export const ossUrl = "http://192.168.110.1:8029"

// 封装请求方法，添加拦截器
const request = (options) => {
  return new Promise((resolve, reject) => {
    // 请求拦截器
    if (options.header) {
      options.header['Authorization'] = 'Bearer ' + uni.getStorageSync('token');
      options.header['x-token'] = uni.getStorageSync('token');
    } else {
      options.header = {
        'Authorization': 'Bearer ' + uni.getStorageSync('token'),
        'x-token': uni.getStorageSync('token')
      };
    }

    uni.request({
      ...options,
      success: (res) => {
        // 响应拦截器
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
}

// 上传文件
export const upload = (url, params) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: url,
      filePath: params.filePath,
      name: params.name,
      formData: params.formData,
      header: {
        'Authorization': 'Bearer ' + uni.getStorageSync('token'),
        'x-token': uni.getStorageSync('token')
      },
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    });
  });
}

// 获取商品类别信息
export const queryCategorygoods = params => {
  return request({
    url: `${host}/indexgoods/`,
    method: 'GET'
  });
}

// 获取轮播图
export const bannerGoods = params => {
  return request({
    url: `${goodsUrl}/g/v1/banners`,
    method: 'GET'
  });
}

// 获取商品类别信息
export const getCategory = params => {
  let url = `${goodsUrl}/g/v1/categorys`;
  if ('id' in params) {
    url += `/${params.id}`;
  }
  return request({
    url: url,
    method: 'GET',
    data: params
  });
}

// 获取热门搜索关键词
export const getHotSearch = params => {
  return request({
    url: `${host}/hotsearchs`,
    method: 'GET'
  });
}

// 获取验证码
export function getCaptcha(params) {
  return request({
    url: `${userUrl}/u/v1/base/captcha`,
    method: 'GET'
  });
}

// 获取商品列表
export const getGoods = params => {
  return request({
    url: `${goodsUrl}/g/v1/goods`,
    method: 'GET',
    data: params
  });
}

// 商品详情
export const getGoodsDetail = goodId => {
  return request({
    url: `${goodsUrl}/g/v1/goods/${goodId}`,
    method: 'GET'
  });
}

// 获取购物车商品
export const getShopCarts = params => {
  return request({
    url: `${orderUrl}/o/v1/shopcarts`,
    method: 'GET'
  });
}

// 添加商品到购物车
export const addShopCart = params => {
  return request({
    url: `${orderUrl}/o/v1/shopcarts`,
    method: 'POST',
    data: params
  });
}

// 更新购物车商品信息
export const updateShopCart = (goodsId, params) => {
  return request({
    url: `${orderUrl}/o/v1/shopcarts/${goodsId}`,
    method: 'PATCH',
    data: params
  });
}

// 删除某个商品的购物记录
export const deleteShopCart = goodsId => {
  return request({
    url: `${orderUrl}/o/v1/shopcarts/${goodsId}`,
    method: 'DELETE'
  });
}

// 收藏
export const addFav = params => {
  return request({
    url: `${userOpUrl}/up/v1/userfavs`,
    method: 'POST',
    data: params
  });
}

// 取消收藏
export const delFav = (goodsId, userId)  => {
  return request({
    url: `${userOpUrl}/up/v1/userfavs/${goodsId}`,
    method: 'DELETE',
    data: userId
  });
}

// 获取所有收藏
export const getAllFavs = () => {
  return request({
    url: `${userOpUrl}/up/v1/userfavs`,
    method: 'GET'
  });
}

// 判断是否收藏
export const getFav = (goodsId, userId)  => {
  return request({
    url: `${userOpUrl}/up/v1/userfavs/${goodsId}`,
    method: 'GET',
    data: userId
  });
}

// 登录
export const login = params => {
  return request({
    url: `${userUrl}/u/v1/user/pwd_login`,
    method: 'POST',
    data: params
  });
}

// 注册
export const register = params => {
  return request({
    url: `${userUrl}/u/v1/user/register`,
    method: 'POST',
    data: params
  });
}

// 短信
export const getMessage = params => {
  return request({
    url: `${userUrl}/u/v1/base/send_sms`,
    method: 'POST',
    data: params
  });
}

// 获取用户信息
export const getUserDetail = () => {
  return request({
    url: `${userUrl}/u/v1/user/detail`,
    method: 'GET'
  });
}

// 修改用户信息
export const updateUserInfo = params => {
  return request({
    url: `${userUrl}/u/v1/user/update`,
    method: 'PATCH',
    data: params
  });
}

// 获取订单
export const getOrders = () => {
  return request({
    url: `${orderUrl}/o/v1/orders`,
    method: 'GET'
  });
}

// 删除订单
export const delOrder = orderId => {
  return request({
    url: `${orderUrl}/o/v1/orders/${orderId}`,
    method: 'DELETE'
  });
}

// 添加订单
export const createOrder = params => {
  return request({
    url: `${orderUrl}/o/v1/orders`,
    method: 'POST',
    data: params
  });
}

// 获取订单详情
export const getOrderDetail = orderId => {
  return request({
    url: `${orderUrl}/o/v1/orders/${orderId}`,
    method: 'GET'
  });
}

// 获取留言
export const getMessages = () => {
  return request({
    url: `${userOpUrl}/up/v1/message`,
    method: 'GET'
  });
}

// 添加留言
export const addMessage = params => {
  return request({
    url: `${userOpUrl}/up/v1/message`,
    method: 'POST',
    data: params
  });
}

// 删除留言
export const delMessages = messageId => {
  return request({
    url: `${userOpUrl}/up/v1/message/${messageId}`,
    method: 'DELETE'
  });
}

// 添加收货地址
export const addAddress = params => {
  return request({
    url: `${userOpUrl}/up/v1/address`,
    method: 'POST',
    data: params
  });
}

// 删除收货地址
export const delAddress = (addressId,id) => {
  return request({
    url: `${userOpUrl}/up/v1/address/${addressId}/${id}`,
    method: 'DELETE'
  });
}

// 修改收货地址
export const updateAddress = (addressId, params) => {
  return request({
    url: `${userOpUrl}/up/v1/address/${addressId}`,
    method: 'PUT',
    data: params
  });
}

// 获取收货地址
export const getAddress = () => {
  return request({
    url: `${userOpUrl}/up/v1/address`,
    method: 'GET'
  });
}