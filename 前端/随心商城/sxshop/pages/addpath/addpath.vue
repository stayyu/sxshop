<template>
	<view class="add-path">
	  <view class="path-item">
		<view>收件人</view>
		<input type="text" value="" placeholder="收件人姓名" v-model="address.addressData.signer_name" />
	  </view>
  
	  <view class="path-item">
		<view>手机号</view>
		<input type="text" value="" placeholder="11位手机号" v-model="address.addressData.signer_mobile" />
	  </view>
  
	  <view class="path-item" @tap="openPicker">
		<view>所在省份</view>
		<input disabled type="text" :value="address.addressData.province" />
	  </view>
  
	  <view class="path-item" @tap="openPicker">
		<view>所在城市</view>
		<input disabled type="text" :value="address.addressData.city" />
	  </view>
  
	  <view class="path-item" @tap="openPicker">
		<view>所在区县</view>
		<input disabled type="text" :value="address.addressData.district" />
	  </view>
  
	  <view class="path-item">
		<view>详细地址</view>
		<input type="text" value="" placeholder="5到60个字符" v-model="address.addressData.address" />
	  </view>
	  
	  <view class="path-item">
		<button @tap="saveAddress">保存地址</button>
	  </view>
	</view>
  
	<!-- 省市区选择 province city area初始省市区设置 show:是否显示  @sureSelectArea：确认事件 @hideShow：隐藏事件-->
	<cc-selectDity :province="address.province" :city="address.city" :area="address.area" :show="address.show" @changeClick="changeClick" @sureSelectArea="onsetCity" @hideShow="onhideShow"></cc-selectDity>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { addAddress, updateAddress, getAddress } from '@/common/api/api.js';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const addressId = route.query.id;
  
  const address = reactive({
	show: false,
	province: "广东省",
	city: "广州市",
	area: "天河区",
	areaCode: "440106",
	addressData: {
		userid: 0,
	  signer_name: '',
	  signer_mobile: '',
	  province: '',
	  city: '',
	  district: '',
	  address: '',
	
	},
	isShow: true
  });
  
  const fetchAddressDetail = async (id) => {
	try {
	  const response = await getAddress(id);
	  Object.assign(address.addressData, response.data);
	} catch (error) {
	  console.error('获取地址详情失败', error);
	}
  };
  
  const openPicker = async () => {
	console.log('执行打开地址选择器');
	address.show = true;
  };
  
  const changeClick = async (value, value2, value3, value4) => {
	console.log('地址选择器 = ' + value + value2 + value3 + value4);
	address.province = value;
	address.city = value2;
	address.area = value3;
	address.areaCode = value4;
  };
  
  const onhideShow = async () => {
	address.show = false;

  };
  
  // 选中省市区
  const onsetCity = async (e) => {
	let data = e.detail.target.dataset;
	address.show = false;
	address.addressData.province = data.province;
	address.addressData.city = data.city;
	address.addressData.district = data.area;
  };
  
  const saveAddress = async () => {
	try {
	  if (addressId) {
		await updateAddress(addressId, address.addressData);
	  } else {

		await addAddress(address.addressData);
	  }
	  uni.navigateBack(); // 保存成功后返回上一页
	} catch (error) {
	  console.error('保存地址失败', error);
	}
  };
  
  onMounted(() => {
	if (addressId) {
	  // 如果有地址ID，则从路由参数中获取数据并绑定到表单
	  address.addressData.signer_name = route.query.signer_name || '';
	  address.addressData.signer_mobile = route.query.signer_mobile || '';
	  address.addressData.province = route.query.province || '';
	  address.addressData.city = route.query.city || '';
	  address.addressData.district = route.query.district || '';
	  address.addressData.address = route.query.more_address || '';
	  address.addressData.userid = parseInt(route.query.userid, 10) || 0; // 转换为 int32 类型

  uni.setNavigationBarTitle({
      title: '编辑地址'
    });

  } else {

    uni.setNavigationBarTitle({
      title: '新增地址'
    });
  }
});
  </script>
  
  <style scoped>
  .add-path {
	padding-left: 20rpx;
  }
  
  .path-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16rpx 0;
	width: 100%;
	border-bottom: 2rpx solid #ccc;
  }
  .path-item input {
	flex: 1;
	text-align: left;
	padding: 10rpx;
  }
  </style>