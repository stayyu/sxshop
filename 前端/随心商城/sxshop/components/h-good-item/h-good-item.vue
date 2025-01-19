<template>
	<view class="themItem">
		<navigator  class="box" @tap="getDetail()">
			 <img :src="obj.front_image" alt="" class="pic"/>
			 <view class="xp" :v-if="obj.is_new">新品</view>
			 <view class="hot" :v-if="obj.is_hot">热销中</view>
			 <view class="name">{{obj.category.name}}</view>
			<view class="name1">{{obj.goods_brief}}</view>
			 <view class="p">优惠后 </view>
			 <view class="price">￥{{obj.shop_price}}</view>
		</navigator>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, compile } from 'vue';
const ac=defineProps({
	obj:{
		type:Object,
		default(){
			return{front_image:"默认"}
		}
	}
})


	
  onMounted(() => {

  });


const getDetail = async () => {
	const id=ac.obj.id
  uni.navigateTo({
  	url:"/pages/details/details?id="+id
  })
};
</script>

<style lang="scss">

.themItem{
	width: 100%;
	border: 1px solid #00b3b3; /* 边框颜色和宽度 */
	          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
			  border-radius: 10rpx;

	.box{
		
		padding: 2rpx;
		position: relative;
		margin-left: 4rpx;
		.xp{
			color: #9e7701;
			font-size: 18rpx;
			border: aquamarine solid dotted dashed double;
			position: absolute;
			bottom: 7rpx;
			right: 20rpx;
		}
		.hot{
			float: right;
			margin-right: 20rpx;
			color: #ff1f0f;
		}
		.pic{
			width: 100%;
		}
		.name{
			font-size: 34rpx;
		}
		.name1{
			font-size: 20rpx;
		}
		.p{
			color: #ff5500;
			font-size: 16rpx;
			border: aquamarine solid dotted dashed double;
		}
		.price{
			color: #ff1f0f;
			font-size: 28rpx;
		}
	}
	
}
</style>