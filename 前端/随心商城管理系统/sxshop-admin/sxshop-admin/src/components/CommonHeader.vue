<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" @click="handleCollapse()">
                <comment class="icons" is="menu"></comment>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUser('user')" class="user" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLoginout()">退出 </el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import {userAllDataStore} from '@/stores'
import router from '@/router';


const store = userAllDataStore()
const getImageUser = (user) => {
    return new URL(`../assets/images/${user}.jpg`, import.meta.url).href
}
const handleCollapse = () => {
   store.state.isCollapse = !store.state.isCollapse
}

const handleLoginout=() => {
    store.clean()
    router.push('/login')
}

</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #8095a9;
    color: #fff;

    .l-content {
        display: flex;
        align-items: center;
        .el-button {
            background-color: transparent;
            border: none;
            color: #fff;
        }
    }

    .r-content {
        display: flex;
        align-items: center;

        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
.icons {
    width: 20px;
    height: 20px;
  
}
:deep(.bread span) {
    color: #fff !important;
    cursor:  pointer !important;
}
</style>