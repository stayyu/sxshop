<template>
	<view class="fav-container">
	  <custom-nav-bar title="我的收藏"></custom-nav-bar>
	  <view v-if="favs.total === 0" class="empty-fav">
		暂无收藏的商品
	  </view>
	  <view v-else class="fav-list">
		<view v-for="item in favs.data" :key="item.id" class="fav-item" @click="goToGoodsDetail(item.id)">
		  <image :src="item.image" class="fav-image" />
		  <view class="fav-info">
			<text class="fav-name">{{ item.name }}</text>
			<text class="fav-price">￥{{ item.shop_price }}</text>
			<button @click.stop="removeFav(item.id)" class="remove-button">取消收藏</button>
		  </view>
		</view>
	  </view>
	</view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getAllFavs, delFav } from '@/common/api/api.js';
  
  const favs = ref({ data: [], total: 0 });
  
  const fetchFavs = async () => {
	try {
	  const response = await getAllFavs();
	  console.log(response);
	  favs.value = response;
	  console.log(favs.value.data);
	} catch (error) {
	  console.error('获取收藏失败', error);
	}
  };
  
  const removeFav = async (goodsId) => {
	try {
	  await delFav(goodsId);
	  fetchFavs();
	  uni.showToast({
		title: '取消收藏成功',
		icon: 'success'
	  });
	} catch (error) {
	  console.error('取消收藏失败', error);
	  uni.showToast({
		title: '取消收藏失败',
		icon: 'none'
	  });
	}
  };
  
  const goToGoodsDetail = (goodsId) => {
	uni.navigateTo({
		url:"/pages/details/details?id="+goodsId
	});
  };
  
  onMounted(() => {
	fetchFavs();
  });
  </script>
  <style scoped>
  .fav-container {
	padding: 20px;
	background-color: #f9f9f9;
	min-height: 100vh;
  }
  
  .empty-fav {
	text-align: center;
	color: #888;
	margin-top: 50px;
	font-size: 18px;
  }
  
  .fav-list {
	display: flex;
	flex-direction: column;
	gap: 15px;
  }
  
  .fav-item {
	display: flex;
	background-color: #fff;
	padding: 15px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .fav-item:hover {
	transform: translateY(-5px);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .fav-image {
	width: 100px;
	height: 100px;
	border-radius: 10px;
	object-fit: cover;
  }
  
  .fav-info {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 15px;
	flex: 1;
  }
  
  .fav-name {
	font-size: 18px;
	font-weight: bold;
	color: #333;
  }
  
  .fav-price {
	color: #e91e63;
	font-size: 16px;
  }
  
  .remove-button {
	background-color: #ff4d4f;
	color: white;
	border: none;
	padding: 8px 15px;
	border-radius: 5px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s;
	align-self: flex-start;
  }
  
  .remove-button:hover {
	background-color: #e43e3e;
  }
  </style>