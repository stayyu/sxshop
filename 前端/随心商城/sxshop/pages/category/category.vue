<template>
	<view>
	  <custom-nav-bar title="分类"></custom-nav-bar>
	  <view class="category-container">
		<view class="category-header">
		  <view class="dropdown" @click="toggleDropdown">
			<text>{{ selectedCategoryName }}</text>
			<view class="dropdown-icon">{{ dropdownOpen ? '▲' : '▼' }}</view>
		  </view>
		  <view v-if="dropdownOpen" class="dropdown-menu">
			<view
			  v-for="category in categories"
			  :key="category.id"
			  :class="['dropdown-item', { active: category.id === selectedCategoryId }]"
			  @click="selectCategory(category.id)"
			>
			  {{ category.name }}
			</view>
		  </view>
		</view>
		<view class="category-body">
		  <view class="subcategory-list">
			<view
			  v-for="subcategory in subcategories"
			  :key="subcategory.id"
			  :class="['subcategory-item', { active: subcategory.id === selectedSubcategoryId }]"
			  @click="selectSubcategory(subcategory.id)"
			>
			  <text v-html="formatSubcategoryName(subcategory.name)"></text>
			</view>
		  </view>
		  <scroll-view class="goods-list" scroll-y="true">
			<good-item
			  v-for="item in goodsItems"
			  :key="item.id"
			  :obj="item"
			></good-item>
		  </scroll-view>
		</view>
	  </view>
	</view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getCategory, getGoods } from '@/common/api/api.js';
  
  const categories = ref([]);
  const subcategories = ref([]);
  const goodsItems = ref([]);
  const selectedCategoryId = ref(null);
  const selectedSubcategoryId = ref(null);
  const selectedCategoryName = ref('请选择分类');
  const dropdownOpen = ref(false);
  
  const fetchCategories = async () => {
	try {
	  const response = await getCategory({});
	  console.log(response);
	  categories.value = response;
	  if (categories.value.length > 0) {
		selectCategory(categories.value[0].id);
	  }
	} catch (error) {
	  console.error('获取分类失败', error);
	}
  };
  
  const fetchSubcategories = async (categoryId) => {
	try {
	  const category = categories.value.find(cat => cat.id === categoryId);
	  if (category) {
		subcategories.value = category.sub_category;
		if (subcategories.value.length > 0) {
		  selectSubcategory(subcategories.value[0].id);
		} else {
		  goodsItems.value = []; // 如果没有二级分类，清空商品列表
		}
	  }
	} catch (error) {
	  console.error('获取二级分类失败', error);
	}
  };
  
  const fetchGoods = async (subcategoryId) => {
	console.log(subcategoryId);
	try {
	  const response = await getGoods({ c: subcategoryId });
	  goodsItems.value = response.data;
	} catch (error) {
	  console.error('获取商品失败', error);
	}
  };
  
  const selectCategory = (categoryId) => {
	selectedCategoryId.value = categoryId;
	const category = categories.value.find(cat => cat.id === categoryId);
	if (category) {
	  selectedCategoryName.value = category.name;
	}
	fetchSubcategories(categoryId);
	dropdownOpen.value = false;
  };
  
  const selectSubcategory = (subcategoryId) => {
	selectedSubcategoryId.value = subcategoryId;
	fetchGoods(subcategoryId);
  };
  
  const toggleDropdown = () => {
	dropdownOpen.value = !dropdownOpen.value;
  };
  
  const formatSubcategoryName = (name) => {
	if (name.length === 4) {
	  return `${name.slice(0, 2)}<br>${name.slice(2)}`;
	}
	return name;
  };
  
  onMounted(() => {
	fetchCategories();
  });
  </script>
  
  <style scoped>
  .category-container {
	display: flex;
	flex-direction: column;
  }
  
  .category-header {
	background-color: #f5f5f5;
	padding: 10px;
	position: relative;
  }
  
  .dropdown {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background-color: #fff;
	border-radius: 5px;
	cursor: pointer;
  }
  
  .dropdown-icon {
	margin-left: 10px;
  }
  
  .dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 5px;
	z-index: 1000;
  }
  
  .dropdown-item {
	padding: 10px;
	cursor: pointer;
  }
  
  .dropdown-item.active {
	background-color: #4caf50;
	color: #fff;
  }
  
  .category-body {
	display: flex;
	flex-direction: row;
	margin-top: 10px;
  }
  
  .subcategory-list {
	width: 20%;
	background-color: #f5f5f5;
	padding: 10px;
  }
  
  .subcategory-item {
	padding: 10px;
	margin-bottom: 10px;
	background-color: #fff;
	border-radius: 5px;
	cursor: pointer;
  }
  
  .subcategory-item.active {
	background-color: #4caf50;
	color: #fff;
  }
  
  .goods-list {
	width: 80%;
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	height: calc(100vh - 150px); /* Adjust height as needed */
	overflow-y: auto;
  }
  </style>