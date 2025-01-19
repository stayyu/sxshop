<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-icon style="margin-top: 5px"><Connection /></el-icon>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="goAdd()" size="mini">添加</el-button>
    </el-card>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column v-for="item in tableLable" :key="item.prop" :label="item.label" :prop="item.prop" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="scope">
            <el-button size="mini" @click="goDetail(scope.row)">查看</el-button>
            <el-button size="mini" @click="deleteBrandToCate(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>

  <!-- 对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="action === 'add' ? '新增品牌分类' : '查看品牌分类'" width="800" @close="resetForm">
    <div class="brand-cate">
      <el-form :model="productCateInfo" ref="productCateFrom" label-width="150px">
        <el-form-item label="分类：" prop="name">
          <el-select v-model="productCateInfo.category_id" placeholder="请选择分类">
            <el-option v-for="item in productCateOptions" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="品牌：">
          <el-select v-model="productCateInfo.brand_id" placeholder="请选择品牌">
            <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('productCateFrom')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '../../api/api'; // 引入API模块

// 表格数据
const tableData = ref([]);

// 表头信息
const tableLable = ref([
  { label: 'ID', prop: 'id' },
  { label: '分类', prop: 'category.name' },
  { label: '品牌', prop: 'brand.name' },
]);

// 对话框显示状态
const dialogFormVisible = ref(false);

// 当前操作类型 ('add' 或 'edit')
const action = ref('add');

// 表单数据
const productCateInfo = reactive({
  id: null, // ID
  category_id: null, // 对应分类ID
  brand_id: null, // 对应品牌ID
});

// 分类和品牌选项数据
const productCateOptions = ref([]);
const brandOptions = ref([]);
const levelThreeNames = ref([]);
// 表单引用
const productCateFrom = ref(null);

// 分页数据
const total = ref(0);
const pageSize = ref(10);
const currentPage = ref(1);

// 获取表格数据
const fetchData = async (page = 1) => {
  try {
    const { data, total: totalItems } = await api.getBrandToCate({ pn:page, psize: pageSize.value });
    tableData.value = data;
    total.value = totalItems;
  } catch (error) {
    console.error('获取表格数据失败:', error);
  }
};

function getLevel3Categories(categories) {
  let result = [];

  function findLevel3(subCategories) {
    subCategories.forEach((category) => {
      if (category.level === 3) {
        result.push(category);
      }
      if (category.sub_category && category.sub_category.length > 0) {
        findLevel3(category.sub_category);
      }
    });
  }

  findLevel3(categories);
  return result;
}

// 获取分类和品牌数据用于表单选项
const fetchOptions = async () => {
  try {
    const categoryRes = await api.getCategorys();
    levelThreeNames.value = getLevel3Categories(categoryRes);

    productCateOptions.value = levelThreeNames.value;

    const brandRes = await api.getBrands();
    brandOptions.value = brandRes.data;
  } catch (error) {
    console.error('获取分类或品牌数据失败:', error);
  }
};

// 提交表单
const onSubmit = async () => {
  productCateFrom.value.validate(async (valid) => {
    if (valid) {
      try {
        if (action.value === 'add') {
          await api.createBrandToCate(productCateInfo); // 新增品牌分类关系
        } else {
          if (productCateInfo.id) {
            await api.putBrandToCate(productCateInfo.id, productCateInfo); // 编辑品牌分类关系
          } else {
            console.error('编辑操作时缺少ID');
          }
        }
        alert('提交成功');
        dialogFormVisible.value = false;
        fetchData(currentPage.value); // 重新获取表格数据
      } catch (error) {
        console.error('提交表单失败:', error);
      }
    }
  });
};

// 打开添加对话框
const goAdd = () => {
  dialogFormVisible.value = true;
  action.value = 'add';
  resetForm();
};

// 打开查看详情
const goDetail = (row) => {
  if (row && row.id) {
    action.value = 'edit';
    dialogFormVisible.value = true;
    resetForm();
    // 将选中的行数据赋值给表单
    productCateInfo.id = row.id;
    productCateInfo.category_id = row.category_id;
    productCateInfo.brand_id = row.brand_id;
  } else {
    console.error('查看详情时缺少行数据或ID');
  }
};

// 删除品牌分类关系
const deleteBrandToCate = async (row) => {
  try {
    if (confirm('确认删除该品牌分类关系吗？')) {
      await api.deleteBrandToCate(row.id); // 调用API删除
      alert('删除成功');
      fetchData(currentPage.value); // 重新获取表格数据
    }
  } catch (error) {
    console.error('删除失败:', error);
  }
};

// 重置表单
const resetForm = () => {
  productCateInfo.id = null;
  productCateInfo.category_id = null;
  productCateInfo.brand_id = null;
};

// 处理分页变化
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchData(page);
};

// 在组件挂载时，获取数据
onMounted(() => {
  fetchData();
  fetchOptions();
});
</script>

<style scoped lang="less">
.cat-name {
  margin-right: 50px;
}
</style>