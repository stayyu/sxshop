package router

import (
	"github.com/gin-gonic/gin"
	"sxshop/goods_web/api/oss"
	"sxshop/goods_web/middlewares"
)

func InitOssMinioRouter(Router *gin.RouterGroup) {
	GoodsRouter := Router.Group("/oss").Use(middlewares.Trace())
	{
		GoodsRouter.POST("uploadImg", oss.UploadImg) //上传图片

	}
}
