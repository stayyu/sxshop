<template>
    <view class="layout">
        <view class="navbar">
            <view class="statuBar" :style="{height:getStatusBarHeight()+'px'}"></view>
            <view class="titleBar" :style="{height:getTileBarHeight()+'px'}">
                <view class="title">{{title}}</view>
                <navigator v-if="title === '随心商城'" url="/pages/serach/serach" class="serach">
                    <uni-icons type="search" color="#888" size="18"></uni-icons>
                    <text>搜索</text>
                </navigator>
            </view>
        </view>
        <view class="fill" :style="{height:getNavBarHeight()+'px'}"></view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
import { getStatusBarHeight, getTileBarHeight, getNavBarHeight } from '@/utils/system.js';

defineProps({
    title: {
        type: String,
        default: "随心商城"
    }
});
</script>

<style lang="scss" scoped>
    .layout {
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 10;
            background:
            linear-gradient(to bottom, transparent, #fff 600rpx),
            linear-gradient(to right, #bae1ec 1%, #f4e2d8);
            .statuBar { }
            
            .titleBar {
                display: flex;
                align-items: center;
                padding: 0 30rpx;
                height: 100rpx;
                .title {
                    font-size: 32rpx;
                    font-weight: 700;
                }
                .serach {
                    width: 200rpx;
                    height: 50rpx;
                    border-radius: 60rpx; 
                    background: rgba(255, 255, 255, 0.4);
                    border: 1px solid #fff;
                    border-left: 30rpx;
                    color: #999;
                    font-size: 28rpx;
                    display: flex;
                    align-items: center;
                    margin-left: 20rpx;
                    .text {
                        padding-left: 10rpx;
                    }
                }
            }
        }
    }
</style>