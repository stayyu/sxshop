<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="handleAddProductCate" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-tree
        :data="list"
        node-key="id"
        :props="{
          children: 'sub_category',
          label: 'name'
        }"
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span class="cat-name">{{ node.label }}</span>
            <span>
              <el-switch
                v-model="data.is_tab"
                active-text="导航栏"
                v-if="node.level === 1"
                @change="handleChange(node)"
              ></el-switch>
              <el-button type="text" size="mini" @click="handleUpdate(data)">
                编辑
              </el-button>
              <el-button type="text" size="mini" @click="handleDelete(data)">
                删除
              </el-button>
            </span>
          </div>
        </template>
      </el-tree>
    </div>
  </div>

  <!-- 对话框 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="action === 'add' ? '新增商品分类' : '编辑商品分类'"
    width="800"
    @close="resetForm"
  >
    <el-form
      :model="productCateInfo"
      :rules="rules"
      ref="productCateFrom"
      label-width="150px"
    >
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="productCateInfo.name"></el-input>
      </el-form-item>
      
      <!-- 选择上级分类 -->
      <el-form-item label="一级分类：" v-if="productCateInfo.level > 1">
        <el-select
          v-model="selectedFirstLevel"
          placeholder="请选择一级分类"
          @change="loadSecondLevelCategories"
        >
          <el-option
            v-for="item in firstLevelCategories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类：" v-if="productCateInfo.level === 3">
        <el-select
          v-model="productCateInfo.parent"
          placeholder="请选择二级分类"
        >
          <el-option
            v-for="item in secondLevelCategories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类层级：" prop="level">
        <el-radio-group v-model="productCateInfo.level" @change="handleLevelChange">
          <el-radio :label="1">一级分类</el-radio>
          <el-radio :label="2">二级分类</el-radio>
          <el-radio :label="3">三级分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示在导航栏：" prop="is_tab">
        <el-radio-group v-model="productCateInfo.is_tab">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import api from '../../api/api'; // 引入API模块
import { ElMessage, ElMessageBox } from 'element-plus'
const list = ref([]);
const dialogFormVisible = ref(false);
const action = ref('add');
const productCateInfo = reactive({
  name: '',
  parent: 0, // 对应 ParentCategory
  level: 1, // 对应 Level
  is_tab: false, // 对应 IsTab
});
const rules = reactive({
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur', min: 1, max: 20 }],
  level: [{ required: true, message: '请选择分类层级', trigger: 'change', type: 'number' }],
  is_tab: [{ required: true, message: '请选择是否显示在导航栏', trigger: 'change', type: 'boolean' }],
});
const productCate = ref([]);
const firstLevelCategories = ref([]);
const secondLevelCategories = ref([]);
const selectedFirstLevel = ref(null);
const isEdit = ref(false);
const productCateFrom = ref(null);
// 获取过滤后的上级分类，根据不同层级显示不同选项
const filteredParentCategories = computed(() => {
  return productCate.value.filter(item => item.level === productCateInfo.level - 1);
});

// 获取分类数据列表
const fetchData = async () => {
  try {
    const data = await api.getCategorys(); // 调用API获取分类数据
    list.value = data;
    productCate.value = data;
    firstLevelCategories.value = data.filter(item => item.level === 1);
  } catch (error) {
    console.error('获取分类数据失败:', error);
  }
};

// 动态加载二级分类选项
const loadSecondLevelCategories = () => {
  const selectedCategory = productCate.value.find(item => item.id === selectedFirstLevel.value && item.level === 1);
  if (selectedCategory) {
    secondLevelCategories.value = selectedCategory.sub_category || [];
  } else {
    secondLevelCategories.value = [];
  }
};

// 打开添加商品分类对话框
const handleAddProductCate = () => {
  dialogFormVisible.value = true;
  action.value = 'add';
  isEdit.value = false;
  resetForm();
};

// 编辑商品分类
const handleUpdate = (data) => {
  Object.assign(productCateInfo, data);
  if (productCateInfo.level === 3) {
    const parentCategory = productCate.value.find(item => item.id === data.parent);
    if (parentCategory) {
      selectedFirstLevel.value = parentCategory.parent;
      loadSecondLevelCategories();
    }
  }
  dialogFormVisible.value = true;
  action.value = 'edit';
  isEdit.value = true;
};

// 删除商品分类
const handleDelete = async (data) => {
  try {
    await ElMessageBox.confirm('确认删除该分类吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
    await api.deleteCategorys(data.id); // 调用API删除分类
    ElMessage.success('删除成功');
    fetchData();
  } catch (error) {
    ElMessage.error('删除失败，请稍后重试');
    console.error('删除失败:', error);
  }
};

// 提交表单
const onSubmit = async () => {
  productCateFrom.value.validate(async (valid) => {
    if (valid) {
      try {
        if (productCateInfo.level === 2) {
          productCateInfo.parent = selectedFirstLevel.value;
        }
        if (action.value === 'add') {
          await api.postCategorys(productCateInfo); // 调用API新增分类
          ElMessage.success('分类添加成功');
        } else {

          await api.putCategorys(productCateInfo.id, productCateInfo); // 调用API更新分类
          ElMessage.success('分类更新成功');
        }
        dialogFormVisible=false;
        fetchData();
      } catch (error) {
        ElMessage.error('操作失败，请稍后重试');
        console.error('操作失败:', error);
      }
    } else {
      ElMessage.error('表单验证失败，请检查输入内容');
      return false;
    }
  });
};

// 重置表单
const resetForm = () => {
  if (productCateFrom.value) {
    productCateFrom.value.resetFields();
  }
  Object.assign(productCateInfo, {
    name: '',
    parent: null,
    level: 1,
    is_tab: false,
  });
  selectedFirstLevel.value = null;
  secondLevelCategories.value = [];
};

// 处理分类层级变化
const handleLevelChange = () => {
  productCateInfo.parent = null; // 当层级变化时，重置上级分类
  selectedFirstLevel.value = null;
  secondLevelCategories.value = [];
};

// 处理导航栏开关的切换
const handleChange = async (node) => {
  try {
    await api.putCategorys(node.data.id, { is_tab: node.data.is_tab, name: node.data.name ,level:node.data.level}); // 调用API更新导航栏显示状态
    ElMessage.success('导航栏显示状态已修改');
  } catch (error) {
    ElMessage.error('修改导航栏显示状态失败');
    console.error('修改导航栏显示状态失败:', error);
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchData();
});
</script>
