<template>
    <el-aside :width="width">
        <el-menu default-active="/home" class="el-menu-vertical-demo" background-color="#5b82a9" text-color="#fff"
            active-text-color="#ffd04b" :collapse="isCollapse">
            <h4 class="h4" v-show="!isCollapse">随心后台管理系统</h4>
            <h4 class="h4" v-show="isCollapse">后台</h4>
            <el-menu-item v-for="item in noChild" :index="item.path" :key="item.path" @click="handleMenu(item)">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu v-for="item in hasChild" :index="item.path" :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(subItem, subIndex) in (item.children)" :index="subItem.path"
                        :key="subItem.path" @click="handleMenu(subItem)"  >
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>

                </el-menu-item-group>


            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { computed, ref } from 'vue';
import {userAllDataStore} from '@/stores'
import  { useRoute, useRouter } from 'vue-router';

const list = ref([
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'house',
        url: "Home"

    },
    {
        path: 'goods',
        label: "商品管理",
        icon: "Goods",
        children: [{
            path: '/goodslist',
            name: "goodslist",
            label: "商品列表",
            icon: 'Sell',
            url: "GoodsList"
        }, {
            path: "/goodscategory",
            name: "goodscategory",
            label: "商品分类",
            icon: "Scissor",
            url: "GoodsCategory"
        },
        {
            path: "/brand",
            name: "brand",
            label: "品牌管理",
            icon: "Trophy",
            url: "Brands"
        }, {
            path: "/brandsCategory",
            name: "brandsCategory",
            label: "品牌分类",
            icon: "Stopwatch",
            url: "BrandsCategory"
        },
        ]
    },
    {
        path: "/order",
        name: "order",
        label: "订单管理",
        icon: "ShoppingTrolley",
        url: "Order"
    },
    {
        label: "用户管理",
        icon: "User",
        children: [{
            path: '/user',
            name: "user",
            label: "用户列表",
            icon: 'Filter',
            url: "UserList"
        }, {
            path: "/userchat",
            name: "userchat",
            label: "用户聊天",
            icon: "Message",
            url: "Userchat"
        },

        ]
    }
])

const noChild = computed(() => list.value.filter(item => !item.children))
const hasChild = computed(() => list.value.filter(item => item.children))
const store = userAllDataStore()
const isCollapse = computed(() => store.state.isCollapse)

const width = computed(() => {
    return store.state.isCollapse ? '64px' : '180px'
})


const router=useRouter()
const route=useRoute()
const handleMenu = (item) => {
    router.push(item.path)
    store.selectMenu(item)
}
</script>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

.el-menu {
    border-right: none;

}

.h4 {
    text-align: center;
    margin: 20px 0;
    font-size: 20px;
    color: #0e2d3069;
}

.el-aside {
    background-color: #5b82a9;
    color: #fff;
    overflow: hidden;
    height: 100%;
}
</style>