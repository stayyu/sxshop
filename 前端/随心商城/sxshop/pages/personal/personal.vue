<template>
	<view class="userLayout pageBg">
		  <custom-nav-bar title="个人中心"></custom-nav-bar>
		<!-- 头部 -->
		<view class="userInfo">
				<br>
				<image src="../../static/icon/yonghuzhongxin_shezhizhongxin.png" @tap="goset()" style="width: 30rpx;height: 30rpx;margin-left: -560rpx;"></image>
				<br>
			<view class="avatrar">
				<image src="../../static/images/mr.png" mode="aspectFill"></image>
			</view>
			<view class="username">用户</view>
		</view>
		<!-- 列表 -->
		<view class="section">
			<view class="list">
					<view class="row" @tap="goorder()">
						<view class="left">
							<uni-icons type="download-filled" size="30"></uni-icons>
							<view class="text">我的订单</view>
						</view>
						<view class="right">
							<uni-icons type="right" size="30"></uni-icons>
						</view>
					</view>
					<view class="row"  @tap="gofav()">
						<view class="left">
							<uni-icons type="download-filled" size="30"></uni-icons>
							<view class="text">我的收藏</view>
						</view>
						<view class="right">
							<uni-icons type="right" size="30"></uni-icons>
						</view>
					</view>
					<view class="row" @tap="goaddress()">
						<view class="left">
							<uni-icons type="download-filled" size="30" ></uni-icons>
							<view class="text">收获地址</view>
						</view>
						<view class="right">
							<uni-icons type="right" size="30"></uni-icons>
						</view>
					</view>
					<view class="row" @tap="gomessage()">
						<view class="left">
							<uni-icons type="download-filled" size="30" ></uni-icons>
							<view class="text">留言板</view>
						</view>
						<view class="right">
							<uni-icons type="right" size="30"></uni-icons>
						</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue';
	
const 	goaddress =async () => {
 uni.navigateTo({
 	url:"/pages/address-list/address-list"
 })
};
const 	goset =async () => {
 uni.navigateTo({
 	url:"/pages/my_set/my_set"
 })
};

const 	gofav =async () => {
 uni.navigateTo({
 	url:"/pages/user-fav/user-fav"
 })
};
const 	gomessage =async () => {
 uni.navigateTo({
 	url:"/pages/message/message"
 })
};

const 	goorder =async () => {
 uni.navigateTo({
 	url:"/pages/my-order/my-order"
 })
};
</script>

<style lang="scss" scoped>
	.userLayout{

		.userInfo{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;
			.avatrar{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.username{
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.section{
			width: 690rpx;
			margin: 50rpx auto;
			border: 1px solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
			.list{
				.row{
					display: flex;
					justify-content: space-between;
					padding: 5 30rpx;
					height: 100rpx;
					border-bottom: 1px solid #eee;
					&:last-child{border-bottom: 0}
					.left{
						display: flex;
						align-items: center;
					}
					.right{
						display: flex;
						align-items: center;
					}
			}
				
			}
		}
		
	}
	       
</style>
