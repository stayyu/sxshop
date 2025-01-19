<template>
	<view class="detail">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in goodp" key="index">
				<view class="swiper-item">
				<image class="swiper-img" :src="goodp[index]" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 价格信息 -->
		<view class="detail-goods">
			
			<view class="sl">销量 {{goodlist.soldnum}}</view>
					<view class="price"> ￥ {{goodlist.shop_price}}</view>
					<view class="market_price"> 原价 ￥{{goodlist.marketprice}}</view>
			<view class="label">{{goodlist.goods_brief}}</view>
			<view class="name">品牌：[{{goodlist.brand.name}}]</view>

			<view class="name">价格保护 - 闪电退款</view>
		</view>
		<!-- 商品详情图 -->
		<view v-for="(item,index) in descimage" key="index" mode="aspectFit">
			<image :src="descimage[index]"  class="detail-img"></image>

		</view>
		<!-- 底部 -->
		<view class="detail-foot">
			<view @tap="gocart()"><image class="icon" src="../../static/icon/gouwuche.png" ></image></view>
			<view @tap="addcart()" class="add-shopcart">添加购物车</view>
			<view class="purchase">立即购买</view>
			<view @tap="toggleFav()">收藏 
				<image :src="isFav ? '../../static/icon/fav_1.png' : '../../static/icon/fav.png'" style="width: 40rpx; height: 40rpx; float: right;"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref ,reactive} from 'vue';
import {onLoad,onNavigationBarButtonTap} from '@dcloudio/uni-app'
import { getGoodsDetail ,addShopCart,getFav,addFav,delFav} from '../../common/api/api';
const goodp =ref([])

const goodlist=ref([])
const isFav = ref(false);
const descimage=ref([])
const queryParams= reactive({
  id: 1,       
  goods:"",
  nums:1,
});


onLoad((e)=>{

	let {id=null}=e;
	queryParams.id=id;
	checkFavStatus();
	gooddetail()
})

const checkFavStatus = async () => {

    const response = await getFav(queryParams.id,{id:uni.getStorageSync('id')});
	console.log(response)
    isFav.value = response===""

};


const toggleFav = async () => {
  try {
    if (isFav.value) {
      await delFav(queryParams.id,{id:uni.getStorageSync('id')});
      isFav.value = false;
      uni.showToast({
        title: '取消收藏成功',
        icon: 'success'
      });
    } else {
      await addFav({ goods:parseInt(queryParams.id,10),userid:uni.getStorageSync('id')});
      isFav.value = true;
      uni.showToast({
        title: '收藏成功',
        icon: 'success'
      });
    }
  } catch (error) {
    console.error('操作收藏失败', error);
    uni.showToast({
      title: '操作失败',
      icon: 'none'
    });
  }
};

const addcart = async () => {
  try {
    const response = await addShopCart(queryParams);
    
  } catch (error) {
    console.error('添加商品失败', error);
  }
	console.log(goodlist)
}

  const gocart = async () => {

	uni.switchTab({
	         url: '/pages/shopping_cart/shopping_cart', // 请根据实际主界面的路径进行修改
	})
}

const gooddetail=async()=>{
	let res=await getGoodsDetail(queryParams.id);
	
	goodlist.value=res;
	goodp.value=res.images;
	descimage.value=res.desc_images
	queryParams.goods=res.id
	console.log(goodlist.value)
}
onNavigationBarButtonTap((e)=>{
	if(e.type==='share'){
		uni.share({
			"provider":"weixin",
			"type":0,
			"scene":"WXSceneSession",
			"title":goodlist.goods_brief,
			"href":"http://localhost:5173/#/pages/details/details?id="+goodlist.id+"",
			imageUrl:goodlist.front_image,
			success:function(res){
				uni.showTabBar({
					title:"分享成功"
				})
			},
			fail:function(err){
				console.log("fail:"+JSON.stringify(err))
			},
		})
	}

})

</script>

<style scoped lang="scss" >
	swiper{
		width: 100%;
		height: 700rpx;
	}
	.swiper-img{
		width: 100%;
		height: 700rpx;
	}
	.detail-goods{
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
		padding: 10rpx 0;
		border: 1px solid #90a3b3; /* 边框颜色和宽度 */
		          box-shadow: 6 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
				  border-radius: 10rpx;
		.sl{
					
					margin-top: 10rpx;
					margin-right: 30rpx;
					float: right;
		}
		.label{
			margin-top:40rpx;
		}
		.name{
			padding: 30rpx;
			font-size:27rpx;
			color: #8c8c8c;
		}
			
		.price{
			margin-top: 80rpx;
			font-size: 50rpx;
		}
		.market_price{
			text-decoration: line-through;
			font-size:24rpx;
			padding: 20rpx;
		}
	}
	
	.detail{
		padding-bottom:  90rpx; 
	}
	.detail-img{
		width: 100%;
	
	}
.detail-foot{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 90rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	.icon{
		width: 60rpx;
		height: 60rpx;
		background: #8c8c8c;
		border-radius: 100%;
	}
	.add-shopcart{
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #000;
		color: #fff;
		border-radius: 40rpx;
	}
	.purchase{
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #91dada;
		color: #fff;
		border-radius: 40rpx;
	}
}

</style>
