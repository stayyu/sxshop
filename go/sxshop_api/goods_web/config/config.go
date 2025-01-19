package config

type GoodsSrvConfig struct {
	Host string `mapstructure:"host" json:"host"`
	Port int    `mapstructure:"port" json:"port"`
	Name string `mapstructure:"name" json:"name"`
}

type JWTConfig struct {
	SigningKey string `mapstructure:"key" json:"key"`
}

type JaegerConfig struct {
	Host string `mapstructure:"host" json:"host"`
	Port int    `mapstructure:"port" json:"port"`
	Name string `mapstructure:"name" json:"name"`
}

type ConsulConfig struct {
	Host string `mapstructure:"host" json:"host"`
	Port int    `mapstructure:"port" json:"port"`
}

type MinioConfig struct {
	Endpoint        string `mapstructure:"endpoint" json:"endpoint"`
	AccessKeyID     string `mapstructure:"accessKeyID" json:"accessKeyID"`
	SecretAccessKey string `mapstructure:"secretAccessKey" json:"secretAccessKey"`
	UseSSL          string `mapstructure:"useSSL" json:"useSSL"`
}

type ServerConfig struct {
	Name             string         `mapstructure:"name" json:"name"`
	Host             string         `mapstructure:"host" json:"host"`
	Port             int            `mapstructure:"port" json:"port"`
	Tags             []string       `mapstructure:"tags" json:"tags"`
	UserSrvInfo      GoodsSrvConfig `mapstructure:"goods_srv" json:"goods_srv"`
	JWTInfo          JWTConfig      `mapstructure:"jwt" json:"jwt"`
	ConsulInfo       ConsulConfig   `mapstructure:"consul" json:"consul"`
	JaegerInfo       JaegerConfig   `mapstructure:"consul" json:"jaeger"`
	MinioInfo        MinioConfig    `mapstructure:"minio" json:"minio"`
	InventorySrvInfo GoodsSrvConfig `mapstructure:"order_srv" json:"inventory_srv"`
}

type NacosConfig struct {
	Host      string `mapstructure:"host"`
	Port      uint64 `mapstructure:"port"`
	Namespace string `mapstructure:"namespace"`
	User      string `mapstructure:"user"`
	Password  string `mapstructure:"password"`
	DataId    string `mapstructure:"dataid"`
	Group     string `mapstructure:"group"`
}
