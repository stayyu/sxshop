package oss

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/minio/minio-go/v7"
	uuid "github.com/satori/go.uuid"
	"go.uber.org/zap"

	"net/http"
	"sxshop/goods_web/global"
)

func UploadImg(c *gin.Context) {
	zap.S().Infof("上传文件")
	bucketName := "image"
	contentType := "image/jpeg"
	objectName := uuid.NewV4().String() + ".jpg"

	file, err := c.FormFile("file") // 获取前端上传的文件
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": 1,
			"message": "文件读取失败！"})
		return
	}

	uploadedFile, err := file.Open() // 打开文件
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": 1,
			"message": "文件打开失败！"})
		return
	}
	defer uploadedFile.Close()

	// 使用 minio 的 PutObject 方法直接上传文件
	_, err = global.MinioClient.PutObject(c, bucketName, objectName, uploadedFile, -1, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": 1,
			"message": "文件上传失败！"})
		return
	}

	URL := fmt.Sprintf("192.168.1.130:19000/image/%s", objectName)

	c.JSON(http.StatusCreated, gin.H{"error": 0,
		"data": gin.H{"URL": URL}})
	return
}
