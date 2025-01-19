<template>
    <view>
        <view class="page">
            <cc-selectBox :select-arr="select" :nowindex="nowindex" @change="turntap"></cc-selectBox>
          
            <view class="tip-box">
                <view class="left">
                    <view class="title">Hello, 尊敬的用户 </view>
                    <view class="subtext">登录注册解锁更多精彩内容</view>
                </view>
                <image lazyLoad class="tip-img" src="https://cdn.pixabay.com/photo/2014/02/17/10/20/statue-of-liberty-267948_1280.jpg"></image>
            </view>
            <form @submit.prevent="handleSubmit">
                <view class="form-mes" v-if="nowindex != 1">
                    <view class="input-item">
                        <view class="num">+86</view>
                        <input
                            @blur="lossstyle"
                            @focus="changestyle"
                            v-model="formData.mobile"
                            class="item"
                            data-inputNum="0"
                            maxlength="11"
                            placeholder="手机号（新号码将自动注册）"
                            placeholderClass="placeholder"
                            type="number"
                        />
                    </view>
                    <view class="input-item">
                        <input
                            @blur="lossstyle"
                            @focus="changestyle"
                            v-model="formData.password"
                            class="item"
                            data-inputNum="2"
                            :type="isPassword ? 'password' : 'text'"
                            placeholder="请输入密码"
                            placeholderClass="placeholder"
                        />
                    </view>
                    <view class="input-item">
                        <input
                            @blur="lossstyle"
                            @focus="changestyle"
                            v-model="formData.code"
                            class="item"
                            data-inputNum="1"
                            maxlength="6"
                            placeholder="请输入验证码"
                            placeholderClass="placeholder"
                            type="number"
                        />
                        <view @tap.stop.prevent="getshortmes" :class="'code-btn ' + (getcode ? 'active' : '') + ' ptp_exposure'" data-ptpid="0a55-1480-8c29-d6e1">
                            {{ getcodemes }}
                        </view>
                    </view>
                    <button type="submit" class="logoin submit ptp_exposure" data-ptpid="50c4-1348-ad62-db8f" @click="handleSubmit()">登录</button>
                    <view @tap="voiceCode" class="send_call ptp_exposure" data-ptpid="eaac-1adf-a790-feac" v-if="sendcall">
                        收不到验证码？试试
                        <text class="green">语音验证</text>
                    </view>
                </view>
                <view class="form-mes" v-if="nowindex != 0">
                    <view class="input-item">
                        <view class="num">+86</view>
                        <input
                            @blur="lossstyle"
                            @focus="changestyle"
                            v-model="formData.mobile"
                            class="item"
                            data-inputNum="0"
                            maxlength="11"
                            placeholder="请输入手机号"
                            placeholderClass="placeholder"
                            type="number"
                        />
                    </view>
                    <view class="input-item">
                        <input
                            @blur="lossstyle"
                            @focus="changestyle"
                            v-model="formData.password"
                            class="item"
                            data-inputNum="2"
                            :type="isPassword ? 'password' : 'text'"
                            placeholder="请输入密码"
                            placeholderClass="placeholder"
                        />
                        <view @tap="changePassType" :class="'iconfont ' + (isPassword ? 'iconeye_off' : 'iconeye')" data-ptpid="8d48-14e8-85ae-6a5f"></view>
                    </view>
                    <img slot="suffix" style="width: 120px; height: 40px; margin-top:60rpx;" :src="formData.captchaurl"
                      @click="captchaimg">
                    点击图片更换验证码
                    <input
                        @blur="lossstyle"
                        @focus="changestyle"
                        v-model="formData.captcha"
                        class="item"
                        data-inputNum="2"
                        :type="isPassword ? 'password' : 'text'"
                        placeholder="请输入验证码"
                        placeholderClass="placeholder"
                    />
                    <button type="submit" class="logoin submit ptp_exposure" @click="handleSubmit()">登录</button>
                    <view @tap="forgetpass" class="forget green ptp_exposure" >
                        <text>忘记密码？</text>
                    </view>
                </view>
            </form>
            <view class="iagree">
                登录注册代表您已同意《
                <text @tap="skipAgreePage" class="green ptp_exposure" data-ptpid="934b-1839-b547-2d42">App用户协议</text>
                》
            </view>
        </view>
        <view @tap="closeImgCode" class="toastbg ptp_exposure" data-ptpid="dad4-159d-ad73-a360" v-if="showimgcode"></view>
        <view class="imagecont" v-if="showimgcode">
            <view class="imagetitle">
                <input @input="getImgCode" class="imagevalue" maxlength="4" placeholder="请输入图片验证码" placeholderClass="placeholder" />
                <image lazyLoad @tap="changeImgCode" class="ptp_exposure" data-ptpid="75db-11fd-a7c2-3fdb" :src="imageCode" style="width: 160rpx; height: 64rpx"></image>
            </view>
            <view @tap="confirmCode" :class="'choosesure ' + (confirmactive ? 'active' : '') + ' ptp_exposure'" data-ptpid="35bd-1312-a0c2-9664">确定</view>
        </view>
    </view>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { getCaptcha, login, register, getMessage } from '@/common/api/api.js';

export default {
    setup() {
        const nowindex = ref(1);
        const isPassword = ref(true);
        const getcode = ref(false);
        const getcodemes = ref('获取验证码');
        const sendcall = ref(false);
        const showimgcode = ref(false);
        const imageCode = ref('');
        const confirmactive = ref(false);
        const select = ref(['立即注册', '密码登录']);
        const formData = reactive({
            mobile: '',
            password: '',
            code: '',
            captchaurl: "",
            captcha_id: '',
            captcha: '',
        });

        const handleSubmit = async () => {
            console.log('Form submitted', formData);
            if (nowindex.value !== 0) {
                try {
                    const res = await login(formData);
					
                    uni.setStorageSync('token', res.token);
                    uni.setStorageSync('account', res.nickname);
                    uni.setStorageSync('id', res.id);
                    console.log('Login successful', res);
                    uni.switchTab({
                     url: '/pages/index/index', // 请根据实际主界面的路径进行修改
            });
                } catch (error) {
                    console.error('Login failed', error);
                }
            } else {
                // 注册逻辑
            }
        };

        const turntap = (e) => {
            nowindex.value = e.target.dataset.num;
        };

        const changestyle = (e) => {};
        const lossstyle = (e) => {};
        const getshortmes = () => {};
        const voiceCode = () => {};
        const changePassType = () => {
            isPassword.value = !isPassword.value;
        };
        const forgetpass = () => {};
        const skipAgreePage = () => {};
        const closeImgCode = () => {
            showimgcode.value = false;
        };
        const getImgCode = (e) => {};
        const changeImgCode = () => {};
        const confirmCode = () => {};

        const captchaimg = async () => {
            const res = await getCaptcha();
            formData.captcha_id = res.captchaId;
            formData.captchaurl = res.picPath;
        };

        onMounted(() => {
            captchaimg();
        });

        return {
            nowindex,
            isPassword,
            getcode,
            getcodemes,
            sendcall,
            showimgcode,
            imageCode,
            confirmactive,
            select,
            formData,
            handleSubmit,
            turntap,
            changestyle,
            lossstyle,
            getshortmes,
            voiceCode,
            changePassType,
            forgetpass,
            skipAgreePage,
            closeImgCode,
            getImgCode,
            changeImgCode,
            confirmCode,
            captchaimg
        };
    }
};
</script>

<style lang="scss" scoped>
    @import "./login.scss";
</style>