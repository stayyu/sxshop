<template>
  <custom-nav-bar title="购物车"></custom-nav-bar>
  <view>
    <view v-if="cartItems.length === 0" class="empty-cart">
      <text>购物车为空</text>
    </view>
    <view v-else>
      <view class="select-all">
        <input type="checkbox" :checked="isAllChecked" @click="toggleAll" /> 全选
      </view>
      <checkbox-group @change="updateItemChecked">
        <view v-for="item in cartItems" :key="item.id" class="cart-item">
          <checkbox :value="item.id" :checked="item.checked"></checkbox>
          <image :src="item.good_image" class="item-image"></image>
          <view class="item-info">
            <text class="item-name">{{ item.good_name }}</text>
            <text class="item-price">￥{{ item.good_price }}</text>
            <view class="item-nums">
              <button @click="changeQuantity(item, -1)" class="quantity-button">-</button>
              <text class="quantity-text">{{ item.nums }}</text>
              <button @click="changeQuantity(item, 1)" class="quantity-button">+</button>
            </view>
          </view>
          <button @click="removeFromCart(item.id)" class="remove-button">删除</button>
        </view>
      </checkbox-group>
      <view class="cart-footer">
        <view class="total-price">总价: ￥{{ totalPrice }}</view>
        <button @click="showCheckoutModal" class="checkout-button">结算</button>
      </view>
    </view>
  </view>

  <!-- 结算模态框 -->
  <view v-if="isCheckoutModalVisible" class="modal">
    <view class="modal-content">
      <view class="modal-header">
        <text>选择收货地址</text>
        <button @click="closeCheckoutModal" class="close-button">×</button>
      </view>
      <view class="modal-body">
        <view v-if="addressList.length === 0" class="empty-address">
          <text>暂无收货地址</text>
        </view>
        <view v-else class="address-list">
          <view v-for="address in addressList" :key="address.id" class="address-item" @click="selectAddress(address)">
            <view class="address-info">
              <text class="address-name">{{ address.signer_name }}</text>
              <text class="address-mobile">{{ address.signer_mobile }}</text>
              <text class="address-detail">{{ address.address }} {{ address.more_address }}</text>
            </view>
          </view>
        </view>
        <view class="form-group">
          <label for="post">留言</label>
          <input v-model="orderForm.post" id="post" type="text" placeholder="请输入留言" />
        </view>
      </view>
      <view class="modal-footer">
        <button @click="checkout" class="confirm-button">确认结算</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { getShopCarts, deleteShopCart, updateShopCart, createOrder, getAddress } from '@/common/api/api.js';

const cartItems = ref([]);
const cartParams = reactive({
  userId: 1,
});

const fetchCartItems = async () => {
  try {
    cartParams.userId = uni.getStorageSync("id");
    const response = await getShopCarts(cartParams);
    cartItems.value = response.data.map(item => ({
      ...item,
    }));
    updateTotalPrice(); // 初始化时更新总价
  } catch (error) {
    console.error('获取购物车商品失败', error);
  }
};

const removeFromCart = async (goodsId) => {
  try {
    await deleteShopCart(goodsId);
    fetchCartItems(); // 重新获取购物车商品
  } catch (error) {
    console.error('删除购物车商品失败', error);
  }
};

const changeQuantity = async (item, amount) => {
  const newQuantity = item.nums + amount;
  if (newQuantity < 1) return;
  try {
    await updateShopCart(item.goods_id, { nums: newQuantity });
    item.nums = newQuantity;
    updateTotalPrice();
  } catch (error) {
    console.error('更新商品数量失败', error);
  }
};

const totalPrice = ref(0);

const updateTotalPrice = () => {
  totalPrice.value = cartItems.value
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.good_price * item.nums, 0);
};

const isAllChecked = computed(() => {
  return cartItems.value.length > 0 && cartItems.value.every(item => item.checked);
});

const toggleAll = async () => {
  const newValue = !isAllChecked.value;

  try {
    for (const item of cartItems.value) {
      item.checked = newValue;
      await updateShopCart(item.goods_id, { nums: item.nums, checked: item.checked });
    }
    updateTotalPrice();
  } catch (error) {
    console.error('更新商品勾选状态失败', error);
  }
};

const updateItemChecked = async (event) => {
  const selectedIds = event.detail.value;

  try {
    for (const item of cartItems.value) {
      item.checked = false; // 默认设置为 false
      for (const id of selectedIds) {
        if (item.id.toString() === id.toString()) {
          item.checked = true;
          break;
        }
      }
      await updateShopCart(item.goods_id, { nums: item.nums, checked: item.checked });
    }
    await fetchCartItems(); // 更新勾选状态后刷新购物车数据
  } catch (error) {
    console.error('更新商品勾选状态失败', error);
  }
};

const isCheckoutModalVisible = ref(false);
const addressList = ref([]);
const selectedAddress = ref(null);
const orderForm = reactive({
  post: ''
});

const fetchAddressList = async () => {
  try {
    const response = await getAddress();
    addressList.value = response.data;
  } catch (error) {
    console.error('获取地址列表失败', error);
  }
};

const showCheckoutModal = () => {
  fetchAddressList(); // 显示模态框时获取地址列表
  isCheckoutModalVisible.value = true;
};

const closeCheckoutModal = () => {
  isCheckoutModalVisible.value = false;
};

const selectAddress = (address) => {
  selectedAddress.value = address;
};

const checkout = async () => {
  const selectedItems = cartItems.value.filter(item => item.checked);
  console.log("11111111111111111111111111")
  if (selectedItems.length === 0) {
    uni.showToast({
      title: '请选择商品',
      icon: 'none',
    });
    return;
  }

  if (!selectedAddress.value) {
    uni.showToast({
      title: '请选择收货地址',
      icon: 'none',
    });
    return;
  }

  const orderParams = {
    userId: uni.getStorageSync("id"),
    items: selectedItems.map(item => ({
      goods_id: item.goods_id,
      nums: item.nums,
    })),
    total_price: totalPrice.value,
    address: selectedAddress.value.address,
    name: selectedAddress.value.signer_name,
    mobile: selectedAddress.value.signer_mobile,
    post: 350100
  };

  try {
    const response = await createOrder(orderParams);
    uni.showToast({
      title: '订单创建成功',
      icon: 'success',
    });
    // 清空购物车中已结算的商品
    for (const item of selectedItems) {
      await deleteShopCart(item.goods_id);
    }
    fetchCartItems(); // 重新获取购物车商品
    closeCheckoutModal(); // 关闭模态框
  } catch (error) {
    console.error('创建订单失败', error);
    uni.showToast({
      title: '订单创建失败',
      icon: 'none',
    });
  }
};

onMounted(() => {
  fetchCartItems();
});
</script>

<style lang="scss" scoped>
.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: #888;
}

.select-all {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}

.cart-item {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.item-checkbox {
  margin-right: 10px;
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
  margin-bottom: 5px;
  color: #333;
}

.item-price {
  color: #e91e63;
  margin-bottom: 5px;
  font-size: 14px;
}

.item-nums {
  display: flex;
  align-items: center;
}

.quantity-button {
  background-color: #ddd;
  border: none;
  padding: 5px;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-button:hover {
  background-color: #ccc;
}

.quantity-text {
  font-size: 16px;
  width: 30px;
  text-align: center;
}

.remove-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #e43e3e;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #eee;
  background-color: #fff;
  position: fixed;
  bottom: 5%;
}

.total-price {
  margin-left: 15%;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.checkout-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-button:hover {
  background-color: #45a049;
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.confirm-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #45a049;
}

.empty-address {
  text-align: center;
  color: #888;
  margin-top: 20px;
}

.address-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.address-item {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.address-item:hover {
  background-color: #e0e0e0;
}

.address-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.address-name {
  font-size: 16px;
  font-weight: bold;
}

.address-mobile {
  font-size: 14px;
  color: #888;
}

.address-detail {
  font-size: 14px;
  color: #333;
}
</style>