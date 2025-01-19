<template>
    <div class="common-layout">
        <el-container class="el-container">
            <!-- 定义左侧导航栏组件 -->
            <common-aside />
            <el-container>
                <el-header class="el-header">
                    <common-header />
                </el-header>
                <common-tab />
                <el-main class="right-main">
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTab from '@/components/CommonTab.vue'
</script>

<style scoped lang="less">
.common-layout {
    height: 100vh;

    .el-container {
        height: 100%;
    }

    .el-header {
        background-color: #8095a9;
        color: #fff;
        line-height: 60px;
        padding: 0 20px;
    }

    .right-main {
        padding: 20px;
    }
}
</style>