<template>
	<view class="user-info-container">
	  <custom-nav-bar title="设置用户信息"></custom-nav-bar>
	  <view class="form-item">
		<label for="name">姓名</label>
		<input v-model="name" id="name" type="text" placeholder="请输入姓名" class="input-field" />
	  </view>
	  <view class="form-item">
		<label for="profileImg">头像</label>
		<view class="file-upload">
		  <button @click="chooseProfileImg" class="upload-button" type="button">选择头像</button>
		  <image v-if="profileImg" :src="profileImg" class="profile-img" />
		</view>
	  </view>
	  <view class="form-item">
		<label for="birthday">生日</label>
		<picker mode="date" @change="onBirthdayChange">
		  <view class="picker">
			{{ birthday || '请选择生日' }}
		  </view>
		</picker>
	  </view>
	  <button @click="submitUserInfo" class="submit-button">提交</button>
	</view>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { updateUserInfo } from '@/common/api/api.js';
  
  const name = ref('');
  const profileImg = ref('');
  const birthday = ref('');
  
  const chooseProfileImg = () => {
	uni.chooseImage({
	  count: 1,
	  success: (res) => {
		profileImg.value = res.tempFilePaths[0];
	  },
	  fail: (err) => {
		console.error('选择头像失败', err);
	  }
	});
  };
  
  const onBirthdayChange = (event) => {
	birthday.value = event.detail.value;
  };
  
  const submitUserInfo = async () => {
	if (!name.value.trim() || name.value.length < 2 || name.value.length > 10) {
	  uni.showToast({
		title: '姓名长度应在2到10个字符之间',
		icon: 'none'
	  });
	  return;
	}
  
	if (!profileImg.value) {
	  uni.showToast({
		title: '请选择头像',
		icon: 'none'
	  });
	  return;
	}
  
	if (!birthday.value) {
	  uni.showToast({
		title: '请选择生日',
		icon: 'none'
	  });
	  return;
	}
  
	try {
	  const response = await updateUserInfo({
		name: name.value,
		profileimg: profileImg.value,
		birthday: birthday.value
	  });
	 
		uni.showToast({
		  title: '用户信息更新成功',
		  icon: 'success'
		});
	  
	  	} catch (error) {
	  console.error('更新用户信息失败', error);
	  uni.showToast({
		title: '更新用户信息失败',
		icon: 'none'
	  });
	}
  };
  </script>
  
  <style scoped>
  .user-info-container {
	padding: 10px;
	background-color: #f5f5f5;
  }
  
  .form-item {
	margin-bottom: 20px;
  }
  
  label {
	display: block;
	margin-bottom: 5px;
	font-weight: bold;
  }
  
  .input-field {
	width: 100%;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	background-color: #fff;
  }
  
  .file-upload {
	display: flex;
	align-items: center;
  }
  
  .upload-button {
	padding: 10px;
	background-color: #4caf50;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	margin-right: 10px;
  }
  
  .profile-img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	object-fit: cover;
  }
  
  .picker {
	padding: 10px;
	background-color: #fff;
	border-radius: 5px;
	text-align: center;
  }
  
  .submit-button {
	width: 100%;
	padding: 10px;
	background-color: #4caf50;
	color: #fff;
	border: none;
	border-radius: 5px;
	text-align: center;
	font-size: 16px;
	cursor: pointer;
  }
  </style>