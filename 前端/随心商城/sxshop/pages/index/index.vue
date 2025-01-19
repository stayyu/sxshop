<template>
    <view class="homeLayout pageBg">
      <custom-nav-bar title="随心商城"></custom-nav-bar>
        <view class="banner">
            <swiper indicator-dots circular indicator-color="#c0c0c0" indicator-active-color="#3F536E"
            autoplay="">
                <swiper-item v-for="item in 3">
                        <image src="../../static/images/1.png" mode="aspectFill"></image>
                </swiper-item>
            </swiper>
        </view>
        <view class="category">
            
        </view>
        <view class="content">
            <good-item v-for="(item,index) in goodsItems" :obj="item"></good-item>
        </view>
    </view>
</template>

<script setup>
import { getGoods } from '../../common/api/api';
import { ref, reactive, onMounted } from 'vue';

// 商品参数的响应式状态
const goodsParams = reactive({
  pn: 1,        // 页码
  pnum: 10,     // 每页显示的商品数量
  q: '',        // 搜索关键词
  c: null,      // 分类ID
  b: null,      // 品牌ID
});
const goodsItems = ref([]);

// 检查用户是否已登录
const checkLogin = () => {
  const token = uni.getStorageSync('token');
  if (!token) {
    uni.navigateTo({
      url: '/pages/login/login' // 请根据实际登录界面的路径进行修改
    });
  }
};

const fetchCartItems = async () => {
  try {
    const response = await getGoods(goodsParams);
    goodsItems.value = response.data;
  } catch (error) {
    console.error('获取商品失败', error);
  }
};

onMounted(() => {
  checkLogin();
  fetchCartItems();
});
</script>

<style lang="scss" scoped>
.homeLayout {
  .banner {
    margin-top: 90rpx;
    width: 96%;
    padding: 3%;
    swiper {
      width: 98%;
      height: 340rpx;
      &-item {
        width: 100%;
        height: 100%;
        image {
          width: 100%;
          height: 100%;
          border-radius: 1%;
        }
      }
    }
  }
}
.content {
  margin-top: 30rpx;
  padding: 0 30rpx;
  display: grid;
  gap: 15rpx;
  grid-template-columns: repeat(2, 1fr);
}
</style>