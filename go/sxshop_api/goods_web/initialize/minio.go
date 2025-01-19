package initialize

import (
	"fmt"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"strconv"
	"sxshop/goods_web/global"
)

func InitMinio() {
	a := global.ServerConfig.MinioInfo
	// 初始化 Minio 客户端

	useSSL, err := strconv.ParseBool(a.UseSSL)
	if err != nil {
		fmt.Println("Error parsing UseSSL to bool:", err)
		return
	}
	global.MinioClient, _ = minio.New(a.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(a.AccessKeyID, a.SecretAccessKey, ""),
		Secure: useSSL,
	})

	fmt.Println("Minio 客户端初始化成功")

}
