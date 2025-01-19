<template>
	<view class="order-detail-container">
	  <custom-nav-bar title="订单详情"></custom-nav-bar>
	  <view v-if="!order" class="loading">
		加载中...
	  </view>
	  <view v-else class="order-detail">
		<text class="order-id">订单号：{{ order.id }}</text>
		<text class="order-status">状态：{{ order.status }}</text>
		<text class="order-total">总金额：￥{{ order.total }}</text>
		<view class="order-items">
		  <view v-for="item in order.items" :key="item.id" class="order-item">
			<image :src="item.image" class="item-image" />
			<view class="item-info">
			  <text class="item-name">{{ item.name }}</text>
			  <text class="item-price">￥{{ item.price }}</text>
			  <text class="item-quantity">数量：{{ item.quantity }}</text>
			</view>
		  </view>
		</view>
	  </view>
	</view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getOrderDetail } from '@/common/api/api.js';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const orderId = route.query.id;
  const order = ref(null);
  
  const fetchOrderDetail = async () => {
	try {
	  const response = await getOrderDetail(orderId);
	  order.value = response;
	} catch (error) {
	  console.error('获取订单详情失败', error);
	}
  };
  
  onMounted(() => {
	fetchOrderDetail();
  });
  </script>
  
  <style scoped>
  .order-detail-container {
	padding: 20px;
	background-color: #f9f9f9;
	min-height: 100vh;
  }
  
  .loading {
	text-align: center;
	color: #888;
	margin-top: 50px;
	font-size: 18px;
  }
  
  .order-detail {
	display: flex;
	flex-direction: column;
	gap: 15px;
  }
  
  .order-id, .order-status, .order-total {
	font-size: 16px;
	color: #333;
  }
  
  .order-items {
	display: flex;
	flex-direction: column;
	gap: 10px;
  }
  
  .order-item {
	display: flex;
	background-color: #fff;
	padding: 15px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .item-image {
	width: 80px;
	height: 80px;
	border-radius: 5px;
	object-fit: cover;
  }
  
  .item-info {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 10px;
	flex: 1;
  }
  
  .item-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
  }
  
  .item-price {
	color: #e91e63;
	font-size: 14px;
  }
  
  .item-quantity {
	font-size: 14px;
	color: #888;
  }
  </style>