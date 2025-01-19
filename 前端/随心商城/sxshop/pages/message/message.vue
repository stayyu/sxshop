<template>
	<view class="message-board">
	  <custom-nav-bar title="用户留言板"></custom-nav-bar>
	  <picker mode="selector" :range="messageTypes" @change="onTypeChange">
		<view class="picker">
		  当前选择: {{ selectedTypeName }}
		</view>
	  </picker>
	  <input v-model="subject" placeholder="请输入主题" class="input-field" />
	  <textarea v-model="messageContent" placeholder="请输入留言内容" class="message-input"></textarea>
	  <view class="file-upload">
		<button @click="chooseFile" class="upload-button">选择文件</button>
		<text v-if="fileName">{{ fileName }}</text>
	  </view>
	  <button @click="submitMessage" class="submit-button">提交留言</button>
	  <view class="message-list">
		<view v-for="item in messages" :key="item.id" class="message-item">
		  <view class="message-header">
			<text class="message-type">
			  <span v-if="item.type === 1">（留言）</span>
			  <span v-if="item.type === 2">（投诉）</span>
			  <span v-if="item.type === 3">（询问）</span>
			  <span v-if="item.type === 4">（售后）</span>
			  <span v-if="item.type === 5">（求购）</span>
			</text>
			<text class="message-date">{{ item.date }}</text>
		  </view>
		  <view class="message-content">
			<text>{{ item.content }}</text>
		  </view>
		</view>
	  </view>
	</view>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { getMessages, addMessage } from '@/common/api/api.js';
  
  const messages = ref([]);
  const selectedType = ref(0);
  const subject = ref('');
  const messageContent = ref('');
  const fileName = ref('');
  const filePath = ref('');
  const messageTypes = ref(['请选择类型', '留言', '投诉', '询问', '售后', '求购']);
  const selectedTypeName = computed(() => messageTypes.value[selectedType.value]);
  
  const fetchMessages = async () => {
	try {
	  const response = await getMessages();
	  messages.value = response.data;
	} catch (error) {
	  console.error('获取留言失败', error);
	}
  };
  
  const onTypeChange = (event) => {
	selectedType.value = event.detail.value;
  };
  
  const chooseFile = () => {
	uni.chooseFile({
	  count: 1,
	  success: (res) => {
		filePath.value = res.tempFiles[0].path;
		fileName.value = res.tempFiles[0].name;
	  },
	  fail: (err) => {
		console.error('选择文件失败', err);
	  }
	});
  };
  
  const submitMessage = async () => {
	if (selectedType.value === 0) {
	  uni.showToast({
		title: '请选择留言类型',
		icon: 'none'
	  });
	  return;
	}
  
	if (!subject.value.trim()) {
	  uni.showToast({
		title: '请输入主题',
		icon: 'none'
	  });
	  return;
	}
  
	if (!messageContent.value.trim()) {
	  uni.showToast({
		title: '请输入留言内容',
		icon: 'none'
	  });
	  return;
	}
  
	if (!filePath.value) {
	  uni.showToast({
		title: '请选择文件',
		icon: 'none'
	  });
	  return;
	}
  
	try {
	  await addMessage({
		type: selectedType.value,
		subject: subject.value,
		message: messageContent.value,
		file: filePath.value
	  });
	  uni.showToast({
		title: '留言提交成功',
		icon: 'success'
	  });
	  subject.value = '';
	  messageContent.value = '';
	  fileName.value = '';
	  filePath.value = '';
	  selectedType.value = 0;
	  fetchMessages();
	} catch (error) {
	  console.error('提交留言失败', error);
	  uni.showToast({
		title: '提交留言失败',
		icon: 'none'
	  });
	}
  };
  
  onMounted(() => {
	fetchMessages();
  });
  </script>
  
  <style scoped>
  .message-board {
	padding: 10px;
	background-color: #f5f5f5;
  }
  
  .picker {
	padding: 10px;
	background-color: #fff;
	border-radius: 5px;
	margin-bottom: 10px;
	text-align: center;
  }
  
  .input-field {
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	background-color: #fff;
  }
  
  .message-input {
	width: 100%;
	height: 100px;
	padding: 10px;
	margin-bottom: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	background-color: #fff;
  }
  
  .file-upload {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
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
	margin-bottom: 20px;
  }
  
  .message-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
  }
  
  .message-item {
	background-color: #fff;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .message-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 5px;
  }
  
  .message-type {
	font-weight: bold;
	color: #4caf50;
  }
  
  .message-date {
	color: #888;
  }
  
  .message-content {
	color: #333;
  }
  </style>