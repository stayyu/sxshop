package global

import (
	"gorm.io/gorm"
	"sxshop/user_srv/config"
)

var (
	DB           *gorm.DB
	ServerConfig config.ServerConfig
	NacosConfig  config.NacosConfig
)

func init() {
}
