package global

import (
	ut "github.com/go-playground/universal-translator"
	"github.com/minio/minio-go/v7"
	"sxshop/goods_web/config"
	"sxshop/goods_web/proto"
)

var (
	Trans ut.Translator

	ServerConfig *config.ServerConfig = &config.ServerConfig{}

	NacosConfig *config.NacosConfig = &config.NacosConfig{}

	GoodsSrvClient proto.GoodsClient

	MinioClient *minio.Client

	InventorySrvClient proto.InventoryClient
)
