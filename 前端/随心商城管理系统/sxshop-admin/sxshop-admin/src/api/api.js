
import request from "./request";
let goodsUrl = "http://192.168.110.1:8022"
let orderUrl = "http://192.168.110.1:8023"
let userUrl = "http://192.168.110.1:8021"
let userOpUrl = "http://192.168.110.1:8027"

export default {
    login(params) {
        return request({
            url: userUrl + '/u/v1/user/pwd_login',
            method: 'post',
            data: params
        })
    },
    getCaptcha(params) {
        return request({
            url: userUrl + '/u/v1/base/captcha',
            method: 'get'
        })
    },
       // 品牌
   getBrands(params) {
        return request({
          url:goodsUrl+'/g/v1/brands',
          method:'get',
          params:params
        })
      },
      createBrand(data) {
        return request({
          url:goodsUrl+'/g/v1/brands',
          method:'post',
          data:data
        })
      },
   
      putBrands(id,params) {
        return request({
          url:goodsUrl+'/g/v1/brands/'+id,
          method:'put',
          data:params
        })
      },
      deleteBrands(id,params) {
        return request({
          url:goodsUrl+'/g/v1/brands/'+id,
          method:'delete',
          data:params
        })
      },
      // 品牌+分类关系
      getBrandToCate(params) {
        return request({
          url:goodsUrl+'/g/v1/categorybrands',
          method:'get',
          params:params
        })},
        getBrandToCateDetail(id,params) {
          return request({
            url:goodsUrl+'/g/v1/categorybrands/'+id,
            method:'get',
            params:params
          })
        },
        createBrandToCate(data) {
          return request({
            url:goodsUrl+'/g/v1/categorybrands',
            method:'post',
            data:data
          })
        },
        putBrandToCate(id,params) {
          return request({
            url:goodsUrl+'/g/v1/categorybrands/'+id,
            method:'put',
            data:params
          })
        },
        deleteBrandToCate(id,params) {
          return request({
            url:goodsUrl+'/g/v1/categorybrands/'+id,
            method:'delete',
            data:params
          })
        },
 
      // 分类
      getCategorys(params) {
        return request({
          url:goodsUrl+'/g/v1/categorys',
          method:'get',
          params:params
        })
      },
      postCategorys(params) {
        return request({
          url:goodsUrl+'/g/v1/categorys',
          method:'post',
          data:params
        })
      },


      putCategorys(id,params) {
        return request({
          url:goodsUrl+'/g/v1/categorys/'+id,
          method:'put',
          data:params
        })
      },

      deleteCategorys(id,params) {
        return request({
          url:goodsUrl+'/g/v1/categorys/'+id,
          method:'delete',
          data:params
        })
      },
     // 商品管理
 getGoods(params) {
  return request({
    url:goodsUrl+'/g/v1/goods',
    method:'get',
    params:params
  })
},
 getGoodsEach(params) {
  return request({
    url:goodsUrl+'/g/v1/goods/'+params,
    method:'get',
  })
}
,
 createGoods(data) {
  return request({
    url:goodsUrl+'/g/v1/goods',
    method:'post',
    data:data
  })
},
 putGoods(id,params) {
  return request({
    url:goodsUrl+'/g/v1/goods/'+id,
    method:'put',
    data:params
  })
},
 deleteGoods(id,params) {
  return request({
    url:goodsUrl+'/g/v1/goods/'+id,
    method:'delete',
    data:params
  })
},
 putGoodsStatus(id,params) {
  return request({
    url:goodsUrl+'/g/v1/goods/'+id,
    method:'patch',
    data:params
  })
},
 getGoodsDetail(id,params) {
  return request({
    url:goodsUrl+'/g/v1/goods/'+id,
    method:'get',
    data:params
  })
},


// 订单
 getOrder(params) {
  return request({
    url:orderUrl+'/o/v1/orders',
    method:'get',
    params:params
  })
},
 getOrderEach(id,params) {
  return request({
    url:orderUrl+'/o/v1/orders/'+id,
    method:'get',
    params:params
  })
},

 createOrder(data) {
  return request({
    url:orderUrl+'/orders',
    method:'post',
    data:data
  })
},
 putOrder(id,params) {
  return request({
    url:orderUrl+'/orders/'+id,
    method:'put',
    data:params
  })
},
 deleteOrder(id,params) {
  return request({
    url:orderUrl+'/orders/'+id,
    method:'delete',
    data:params
  })
},

      
}