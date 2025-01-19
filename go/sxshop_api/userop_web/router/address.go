package router

import (
	"github.com/gin-gonic/gin"
	"sxshop/userop_web/api/address"
	"sxshop/userop_web/middlewares"
)

func InitAddressRouter(Router *gin.RouterGroup) {
	AddressRouter := Router.Group("address")
	{
		AddressRouter.GET("", middlewares.JWTAuth(), address.List)                  // 地址列表页
		AddressRouter.DELETE("/:id/:userid", middlewares.JWTAuth(), address.Delete) // 删除 地址
		AddressRouter.POST("", middlewares.JWTAuth(), address.New)                  //新建 地址
		AddressRouter.PUT("/:id", middlewares.JWTAuth(), address.Update)            //修改 地址
	}
}
