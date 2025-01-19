<template>
	<view class="searchLayout pageBg" >
		<view class="search">
			<uni-search-bar 
			@confirm="onSearch"
			@cancel="onClear"
			@clear="onClear"
			focus 
			placeholder="搜索"
			v-model="queryParams.keyword">
			</uni-search-bar>
			<view class="tj">
				<input class="input" type="number" placeholder="输入最高价格" />
				<input class="input" type="number" placeholder="输入最低价格" />
			</view>
		</view>
		<view class="content">
		<h-good-item  v-for="item in 8"></h-good-item>
		</view>
	</view>
</template>

<script setup>
import {ref} from "vue";
import {onLoad,onUnload,onReachBottom} from "@dcloudio/uni-app";	
	
//查询参数
const queryParams = ref({	
	pageNum:1,
	pageSize:12,
	keyword:""
})

	//点击搜索
	const onSearch = ()=>{
		historySearch.value=[...new Set([queryParams.value.keyword,...historySearch.value])]
		uni.setStorageSync("historySearch",historySearch.value)
	
	}
	
</script>

<style lang="scss" scoped>
	.searchLayout{
		.tj{
			align-items: center;
			justify-content: center;
			display: flex;
	
		}
	    .search{
	    	padding:0 10rpx;
	    }   
		}
	.content{
				  margin-top: 30rpx;
				  padding: 0 30rpx;
				  display: grid;
				  gap: 15rpx;
				  grid-template-columns: (repeat(1,1fr));
				
				  
	}
</style>
