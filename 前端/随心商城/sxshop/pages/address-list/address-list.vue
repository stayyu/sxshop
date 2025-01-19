<template>
	<view class="my-address-list">
	  <view class="path-list">
		<view class="path-item" v-for="address in addressList" :key="address.id">
		  <view class="item-main">
			<view class="item-name">{{ address.signer_name }}</view>
			<view>{{ address.signer_mobile }}</view>
		  </view>
		  <view class="item-main">
			<view class="active" v-if="address.is_default">默认</view>
			<view>{{ address.address }} {{ address.more_address }}</view>
		  </view>
		  <view class="item-actions">
			<button @tap="editAddress(address)">编辑</button>
			<button @tap="deleteAddress(address.id,address.user_id)">删除</button>
		  </view>
		</view>
	  </view>
	</view>
	<view class="address-path">
	  <view class="add-path-btn" @tap="goAddPath()">新增地址</view>
	</view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getAddress, delAddress } from '@/common/api/api.js';
  
  const addressList = ref([]);
  
  const fetchAddressList = async () => {
	try {
	  const response = await getAddress();
	  console.log('地址列表', response);
	  addressList.value = response.data;
	} catch (error) {
	  console.error('获取地址列表失败', error);
	}
  };
  
  const deleteAddress = async (addressId,address) => {
	try {
	  await delAddress(addressId,address);
	  fetchAddressList(); // 重新获取地址列表
	} catch (error) {
	  console.error('删除地址失败', error);
	}
  };
  
  const goAddPath = async () => {
	uni.navigateTo({
	  url: "/pages/addpath/addpath",
	});
  };
  
  const editAddress = async (address) => {
	uni.navigateTo({
	  url: `/pages/addpath/addpath?id=${address.id}&signer_name=${address.signer_name}&signer_mobile=${address.signer_mobile}&province=${address.province}&city=${address.city}&district=${address.district}&more_address=${address.address}&userid=${address.user_id}`,
	});
  };
  
  onMounted(() => {
	fetchAddressList();
  });
  </script>
  
  <style scoped>
  .address-path {
	padding: 20rpx 0;
	width: 100%;
	display: flex;
	justify-content: center;
  }
  .add-path-btn {
	border: 2rpx solid #49bdfb;
	color: #49bdfb;
	border-radius: 30rpx;
	padding: 6rpx 30rpx;
  }
  .path-list {
	padding-left: 20rpx;
  }
  .path-item {
	padding: 10rpx;
	border-bottom: 2rpx solid #ccc;
	display: flex;
	justify-content: space-between;
	align-items: center;
  }
  .item-main {
	display: flex;
	flex-direction: column;
	flex: 1;
  }
  .item-name {
	padding: 5rpx;
	padding-right: 10rpx;
  }
  .active {
	padding: 0 6rpx;
	background-color: #49bdfb;
	color: #fff;
	border-radius: 10rpx;
	font-size: 24rpx;
  }
  .item-actions {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
  }
  </style>