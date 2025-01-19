# 仿天猫 淘宝购物车列表页面


#### 使用方法 
```使用方法
引入uni-number-box xg-widget组件		

事件处理如下：		
// 过滤选择的商品
			filterCheckedProduct(products) {
				return products.filter(item => item.checked);
			},
			// 过滤未选择的商品
			filterUncheckedProduct(products) {
				return products.filter(item => !item.checked);
			},
			// 店铺勾选
			onShopCheckboxTap(shop) {
				shop.checked = !shop.checked;

				shop.products.forEach(product => {
					product.checked = shop.checked;
				});
			},
			// 商品勾选
			onProductCheckboxTap(product) {
				product.checked = !product.checked
			},
			// 数量改变
			onNumberBoxChange(product, e) {
				product.count = e;
			},
			// 全选
			onCheckAllTap() {
				const checked = !this.allChecked;
				this.shops.forEach(shop => {
					shop.products.forEach(product => {
						product.checked = checked;
					})
				})
			}
```

#### HTML代码实现部分
```html
<template>
	<view>
		<!-- 空购物车 -->
		<view v-if="isEmptyCart"
			class="bg-color-white border-bottom-left-radius-xl border-bottom-right-radius-xl padding-lg">
			<view class="row-center-center">
				<image class="img-size-xl" src="/static/cart/empty-cart.png" mode="aspectFit"></image>
				<text class="font-size-lg text-color-greyblack">购物车是空的</text>
			</view>
			<view class="row-center-center">
				<text class="empty-button">逛逛秒杀</text>
				<text class="empty-button">看看关注</text>
			</view>
		</view>

		<!-- 非空购物车 -->
		<view v-if="!isEmptyCart">
			<view v-for="(shop, shopIndex) of cartShops" :key="shopIndex"
				class="padding-lg margin-bottom-lg bg-color-white border-radius-xl">
				<!-- 店铺购物车商品 -->
				<!-- 店铺标题 -->
				<view class="" @tap="onShopCheckboxTap(shop)">
					<label class="row-between-center">
						<view class="row-center-center">
							<checkbox class="shop-checkbox" :checked="shop.checked" />
							<image class="img-size-base border-radius-circle" :src="shop.logo" mode="aspectFit"></image>
							<text class="font-size-lg">{{shop.name}}</text>
						</view>
						<!-- <view class=""></view> -->
					</label>
				</view>

				<!-- 店铺产品列表 -->
				<view class="row-between-start margin-top-base" v-for="(product, productIndex) of shop.products"
					:key="productIndex">
					<view class="product-checkbox" @tap="onProductCheckboxTap(product)">
						<checkbox :checked="product.checked" />
					</view>

					<image class="border-radius-lg product-image" :src="product.image" mode=""></image>
					<view class="flex-1 column-center-stretch padding-left-lg">
						<text class="lines-2 font-size-base">{{product.title}}</text>
						<view class="row-start-center margin-v-side-base">
							<view
								class="row-center-center bg-color-grey border-radius-rect-circle padding-side-base padding-v-side-xs">
								<text v-for="(property, propertyIndex) of product.sku" :key="propertyIndex"
									class="font-size-sm">{{property}},</text>
							</view>
						</view>

						<view class="row-between-center">
							<xg-money camel :size="UNI_FONT_SIZE_XL" :money="product.price"></xg-money>

							<view class="number-box">
								<uni-number-box :min="1" :value="product.count"
									@change="onNumberBoxChange(product, $event)"></uni-number-box>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>


		<view class="order-amount-placeholder"></view>
		<view class="row-between-center bg-color-white padding-side-lg order-amount">
			<view class="row-center-center">
				<view class="product-checkbox" @tap="onCheckAllTap">
					<checkbox :checked="allChecked" />
				</view>
				<text class="font-size-base">全选</text>
				<text class="font-size-lg margin-left-lg">合计:</text>
				<text class="font-size-lg font-weight-bold">￥{{totalAmount.toFixed(2)}}</text>
			</view>

			<view class="bg-color-red border-radius-rect-circle padding-side-lg padding-v-side-base">
				<text class="font-size-lg text-color-white">去结算（{{totalCount}}）</text>
			</view>
		</view>
	</view>
</template>

<script>
	// 获取购物车数据来源
	import data from '@/data/cart/cart';

	import mixin from '@/common/mixin';

	const customData = {
		page: 0
	}

	export default {
		mixins: [mixin],
		data() {
			return {
				isEmptyCart: false,
				loadMoreStatus: 'more',

				shops: [],


			};
		},

		computed: {
			// 全选事件
			allChecked() {
				return this.cartShops.filter(item => item.checked).length === this.cartShops.length;
			},

			// 购物车店铺数据
			cartShops() {
				this.shops.forEach(shop => {
					const uncheckedProducts = this.filterUncheckedProduct(shop.products);

					shop.checked = (uncheckedProducts.length === 0);
				})

				return this.shops;
			},

			// 计算数量
			totalCount() {
				let count = 0;

				this.cartShops.forEach(shop => {
					this.filterCheckedProduct(shop.products).forEach(product => {
						count += parseInt(product.count);
					})
				})

				return count;
			},
			// 计算金额
			totalAmount() {
				let amount = 0;

				this.cartShops.forEach(shop => {
					this.filterCheckedProduct(shop.products).forEach(product => {
						amount += Number(product.price * product.count)
					})
				})

				return amount;
			}
		},

		async created() {
			this.loadMoreStatus = 'loading';

			// 获取商铺数据
			const shopPromise = data.shops();

			this.shops = await shopPromise;




		},


		methods: {
			// 过滤选择的商品
			filterCheckedProduct(products) {
				return products.filter(item => item.checked);
			},
			// 过滤未选择的商品
			filterUncheckedProduct(products) {
				return products.filter(item => !item.checked);
			},
			// 店铺勾选
			onShopCheckboxTap(shop) {
				shop.checked = !shop.checked;

				shop.products.forEach(product => {
					product.checked = shop.checked;
				});
			},
			// 商品勾选
			onProductCheckboxTap(product) {
				product.checked = !product.checked
			},
			// 数量改变
			onNumberBoxChange(product, e) {
				product.count = e;
			},
			// 全选
			onCheckAllTap() {
				const checked = !this.allChecked;
				this.shops.forEach(shop => {
					shop.products.forEach(product => {
						product.checked = checked;
					})
				})
			}



		},
	}
</script>

<style lang="scss" scoped>
	.empty-button {
		@include border(1px solid);

		font-size: $uni-font-size-lg;
		border-radius: $uni-border-radius-rect-circle;
		margin: 0 $uni-spacing-col-xl;
		padding: $uni-spacing-row-sm $uni-spacing-col-xl;
	}


	$order-amount-height: 100rpx;

	.product-list {
		/* #ifdef APP-NVUE */

		@include position(fixed, 0 0 $order-amount-height 0);
		/* #endif */

		// width: 500rpx;
	}

	.shop-checkbox {
		transform: scale(0.8);
	}

	.product-checkbox {
		transform: scale(0.75);
	}

	.product-image {
		width: 200rpx;
		height: 200rpx;
	}

	.number-box {
		transform-origin: 100% 50%;
		transform: scale(0.75);
	}



	.order-amount-placeholder {
		height: $order-amount-height;
	}

	.order-amount {
		/* #ifndef APP-NVUE */
		@include position(fixed, none 0 var(--window-bottom) 0);
		/* #endif */
		/* #ifdef APP-NVUE */
		@include position(fixed, none 0 0 0);
		/* #endif */

		height: $order-amount-height;

		/* #ifndef APP-NVUE */
		z-index: 10000;
		/* #endif */
	}
</style>
```

