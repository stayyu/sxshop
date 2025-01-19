<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h1>管理系统登录</h1>
      <el-form-item>
        <el-input v-model="loginForm.username" type="input" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.captcha" type="input" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <img slot="suffix" style="width: 120px; height: 40px; margin: 10px;" :src="loginForm.captchaurl"
          @click="captchaimg">
        点击图片更换验证码
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, onMounted } from 'vue';
import { userAllDataStore } from '@/stores';
import router from '@/router';

const loginForm = reactive({
  username: '',
  password: '',
  captcha_id: '',
  captcha: '',
  mobile: '',
  captchaurl: "",
});

const store = userAllDataStore();
const { proxy } = getCurrentInstance();

const handleLogin = async () => {
  loginForm.mobile = loginForm.username;

  const res = await proxy.$api.login(loginForm);
  store.state.token = res.token;
  store.state.account = res.nickname;
  store.state.id = res.id;
  router.push('/home');
};

const captchaimg = async () => {
  const res = await proxy.$api.getCaptcha();
  loginForm.captcha_id = res.captchaId;
  loginForm.captchaurl = res.picPath;
};

onMounted(() => {
  captchaimg();
});
</script>

<style scoped lang="less">
.body-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-container {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>