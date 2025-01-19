package global

import (
	ut "github.com/go-playground/universal-translator"
	"sxshop/user_web/config"
	"sxshop/user_web/proto"
)

var (
	Trans ut.Translator

	ServerConfig *config.ServerConfig = &config.ServerConfig{}

	NacosConfig *config.NacosConfig = &config.NacosConfig{}

	UserSrvClient proto.UserClient
)
