<template>
	<view class="order-container">
	  <custom-nav-bar title="我的订单"></custom-nav-bar>
	  <view v-if="orders.total === 0" class="empty-order">
		暂无订单
	  </view>
	  <view v-else class="order-list">
		<view v-for="order in orders" :key="order.id" class="order-item" @click="goToOrderDetail(order.id)">
		  <view class="order-info">
			<text class="order-id">订单号：{{ order.id }}</text>
			<text class="order-status">{{ order.status }}</text>
			<text class="order-total">总金额：￥{{ order.total }}</text>
		  </view>
		</view>
	  </view>
	</view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getOrders } from '@/common/api/api.js';
  
  const orders = ref([]);
  
  const fetchOrders = async () => {
	try {
	  const response = await getOrders();
	  console.log('获取订单成功', response);
	  orders.value = response;
	} catch (error) {
	  console.error('获取订单失败', error);
	}
  };
  
  const goToOrderDetail = (orderId) => {
	uni.navigateTo({
	  url: `/pages/order-detail/order-detail?id=${orderId}`
	});
  };
  
  onMounted(() => {
	fetchOrders();
  });
  </script>
  
  <style scoped>
  .order-container {
	padding: 20px;
	background-color: #f9f9f9;
	min-height: 100vh;
  }
  
  .empty-order {
	text-align: center;
	color: #888;
	margin-top: 50px;
	font-size: 18px;
  }
  
  .order-list {
	display: flex;
	flex-direction: column;
	gap: 15px;
  }
  
  .order-item {
	background-color: #fff;
	padding: 15px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .order-item:hover {
	transform: translateY(-5px);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .order-info {
	display: flex;
	flex-direction: column;
	gap: 5px;
  }
  
  .order-id, .order-status, .order-total {
	font-size: 16px;
	color: #333;
  }
  </style>