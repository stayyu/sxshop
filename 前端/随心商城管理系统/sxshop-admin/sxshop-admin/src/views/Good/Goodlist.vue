<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <!-- 筛选搜索部分 -->
      <div style="margin-bottom:25px">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="handleSearchList" type="primary" size="small">
          查询结果
        </el-button>
        <el-button style="float: right;margin-right: 15px" @click="handleResetSearch" size="small">
          重置
        </el-button>
      </div>

      <div style="margin-top: 15px">
        <el-form :inline="true" :model="goodsParams" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="goodsParams.q" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader clearable v-model="goodsParams.c" @change="getBrand"
              :props="{ value: 'id', label: 'name', children: 'sub_category' }" :options="productCateOptions">
            </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌：">
            <el-select v-model="goodsParams.b" placeholder="请选择品牌" clearable>
              <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddProduct" size="mini">添加</el-button>
    </el-card>

    <!-- 商品列表展示部分 -->
    <div class="table-container">
      <el-table ref="productTable" :data="list" style="width: 100%" @selection-change="handleSelectionChange"
        v-loading="listLoading" border>
        <el-table-column label="编号" align="center" width="80">
          <template #default="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template #default="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品品牌" align="center">
          <template #default="scope">
            <p>{{ scope.row.brand.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="商品分类" align="center">
          <template #default="scope">
            <p>{{ scope.row.category.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template #default="scope">
            <p>价格：￥{{ scope.row.shop_price }}</p>
          </template>
        </el-table-column>
        <el-table-column label="标签" align="center">
          <template #default="scope">
            <p>上架：
              <el-switch @change="handlePublishStatusChange(scope)" :active-value="true" :inactive-value="false"
                v-model="scope.row.on_sale"></el-switch>
            </p>
            <p>新品：
              <el-switch @change="handlePublishStatusChange(scope)" :active-value="true" :inactive-value="false"
                v-model="scope.row.is_new"></el-switch>
            </p>
            <p>推荐：
              <el-switch @change="handlePublishStatusChange(scope)" :active-value="true" :inactive-value="false"
                v-model="scope.row.is_hot"></el-switch>
            </p>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160" align="center">
          <template #default="scope">
            <p>
              <el-button size="mini" @click="handleShowProduct(scope.row)">修改商品信息</el-button>
            </p>
            <p>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </p>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next"
        :total="pageinfo.total" :current-page="pageinfo.pn" :page-size="10" />
    </div>

    <!-- 对话框 -->
    <el-dialog v-model="dialogFormVisible" :title="action === 'add' ? '添加商品' : '修改商品'" width="800" @close="resetForm">
      <div style="margin-top: 50px">
        <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px"
          size="small">
          <el-form-item label="商品名称：" prop="name">
            <el-input v-model="value.name" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="市场价：" prop="market_price">
            <el-input v-model="value.market_price" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="商品库存：" prop="stocks">
            <el-input v-model="value.stocks" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="商品编码" prop="goods_sn">
            <el-input v-model="value.goods_sn" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="销售价：" prop="shop_price">
            <el-input v-model="value.shop_price" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="是否免运费：" prop="ship_free">
            <el-switch v-model="value.ship_free" :disabled="disabled" :active-value="true"
              :inactive-value="false"></el-switch>
          </el-form-item>
          <el-form-item label="商品分类：" prop="first_cate">
            <el-select v-model="value.first_cate" @change="handleCateChange" :disabled="disabled" placeholder="请选择一级分类">
              <el-option v-for="item in selectProductCateValue" :key="item.id" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
            <el-select v-model="value.second_cate" @change="handleSecondCateChange" v-if="value.first_cate"
              :disabled="disabled" placeholder="请选择二级分类">
              <el-option v-for="item in selectProductSecondCateValue" :key="item.id" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
            <el-select v-model="value.category" @change="handleThirdCateChange" v-if="value.second_cate"
              :disabled="disabled" placeholder="请选择三级分类">
              <el-option v-for="item in selectProductThirdCateValue" :key="item.id" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品牌：" prop="brand">
            <el-select v-model="value.brand" @change="handleBrandChange" :disabled="disabled" placeholder="请选择品牌">
              <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品相册：">
            <MultiUpload v-model="img1" @input="multiInput" :disabled="disabled"></MultiUpload>
          </el-form-item>
          <el-form-item label="商品简介：" prop="goods_brief">
            <el-input v-model="value.goods_brief" type="textarea" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="商品详情图片：">
            <MultiUpload v-model="img2" @input="multiInput2" :disabled="disabled"></MultiUpload>
          </el-form-item>
          <el-form-item label="商品封面：">
            <MultiUpload v-model="img3" :multiple="false" @input="multiInput3" :disabled="disabled" :maxCount="1">
            </MultiUpload>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" v-if="!disabled" size="medium"
              @click="finishCommit('productInfoForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, compile } from 'vue';
import api from '../../api/api'; // 调整路径以匹配实际位置
import MultiUpload from '../../components/Upload/multiUpload.vue'; // 导入组件路径
import { ElMessage, ElMessageBox } from 'element-plus'

// 商品参数的响应式状态
const goodsParams = reactive({
  pn: 1,        // 页码
  pnum: 20,     // 每页显示的商品数量
  q: '',        // 搜索关键词
  c: null,      // 分类ID
  b: null,      // 品牌ID
});

const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  brandId: null
};

const pageinfo = reactive({
  pn: 1,
  pnum: 10,
  total: 0,
})

// 定义状态变量
const list = ref([]);  // 商品列表
const total = ref(0);  // 总记录数
const listLoading = ref(false);  // 加载状态
const productCateOptions = ref([]);  // 商品分类选项
const brandOptions = ref([]);  // 品牌选项
const dialogFormVisible = ref(false);  // 对话框可见性
const action = ref('add');  // 当前操作 ('add' 或 'edit')
const isEdit = ref(false);  // 是否为编辑模式
const disabled = ref(false); // 是否禁用表单
const img1 = ref([]); // 商品相册
const img2 = ref([]); // 商品详情图片
const img3 = ref(""); // 商品封面


// 商品表单的响应式状态
const value = reactive({
  id: "", // 商品id
  name: '',  // 商品名称1
  market_price: 0,  // 市场价
  stocks: 0,  // 库存
  goods_sn: '',  // 商品编码1
  shop_price: 0,  // 销售价
  ship_free: false,  // 是否免运费
  first_cate: null,  // 一级分类
  second_cate: null,  // 二级分类
  category: null,  // 三级分类1
  brand: null,  // 品牌1
  goods_brief: '',  // 商品简介1
  images: [],  // 商品相册
  desc_images: [],  // 商品详情图片
  front_image: '',  // 商品封面
});


// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur', min: 2, max: 100 }],
  goods_sn: [{ required: true, message: '请输入商品编码', trigger: 'blur', min: 2, max: 20 }],
  stocks: [{ required: true, message: '请输入库存', trigger: 'blur', min: 1 }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }],
  market_price: [{ required: true, message: '请输入市场价', trigger: 'blur', min: 0 }],
  shop_price: [{ required: true, message: '请输入销售价', trigger: 'blur', min: 0 }],
  goods_brief: [{ required: true, message: '请输入商品简介', trigger: 'blur', min: 3 }],
  images: [{ required: true, message: '请上传商品相册', trigger: 'change', type: 'array', min: 1 }],
  desc_images: [{ required: true, message: '请上传商品详情图片', trigger: 'change', type: 'array', min: 1 }],
  ship_free: [{ required: true, message: '请选择是否免运费', trigger: 'change', type: 'boolean' }],
  front_image: [{ required: true, message: '请上传商品封面', trigger: 'change', type: 'url' }],
  brand: [{ required: true, message: '请选择品牌', trigger: 'change' }],
};
const productInfoForm = ref(null);


const selectProductCateValue = ref([]);
const selectProductSecondCateValue = ref([]);
const selectProductThirdCateValue = ref([]);


// 获取商品列表
const fetchList = async () => {
  listLoading.value = true;
  try {
    const response = await api.getGoods(goodsParams);
    console.log(response);
    list.value = response.data;
    total.value = response.data.total;
  } catch (error) {
    console.error('获取商品列表失败:', error);
  } finally {
    listLoading.value = false;
  }
};

const handleCurrentChange = (page) => {
  pageinfo.pn = page
  fetchList()
}





const handlePublishStatusChange = async (scope) => {
  try {
    console.log(scope);
    let params = {
      id: scope.row.id,
      sale: scope.row.on_sale,
      new: scope.row.is_new,
      hot: scope.row.is_hot
    };
    console.log(params);
    await api.putGoodsStatus(params.id, params);
    ElMessage.success('状态更新成功');
    fetchList(); // 刷新列表
  } catch (error) {
    ElMessage.error('状态更新失败');
  }
};



const handleShowProduct = (row) => {
  action.value = 'view';
  dialogFormVisible.value = true;
  console.log(value);
  console.log(row);
  Object.assign(value, row); // 将当前行数据赋值给表单
  img1.value = row.images || [];
  img2.value = row.desc_images || [];
  img3.value = row.front_image;

};



const handleDelete = (row) => {
  ElMessageBox.confirm(
    '此操作将永久删除该商品, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await api.deleteGoods(row.id); // 假设有一个 `deleteGoods` 的 API 用于删除商品
      ElMessage.success('删除成功');
      fetchList(); // 删除后刷新列表
    } catch (error) {
      ElMessage.error('删除失败');
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};



// 获取商品分类选项
// const extractLevel3Names = (categories) => {
//   const level3Names = [];

//   const traverse = (category) => {
//     if (category.level === 3) {
//       level3Names.push(category.name);
//     }
//     if (category.sub_category && category.sub_category.length > 0) {
//       category.sub_category.forEach(subCat => traverse(subCat));
//     }
//   };

//   categories.forEach(category => traverse(category));
//   return level3Names;
// };



// 转换分类数据为 el-cascader 可用格式
const transformCategoryData = (categories) => {
  return categories.map(category => ({
    id: category.id,
    name: category.name,
    sub_category: category.sub_category ? transformCategoryData(category.sub_category) : []
  }));
};

// 获取商品分类选项
const fetchProductCateOptions = async () => {
  try {
    const response = await api.getCategorys();
    selectProductCateValue.value = response;
    productCateOptions.value = transformCategoryData(response);
  } catch (error) {
    console.error('获取商品分类失败:', error);
  }
};


// 获取品牌选项
const getBrand = async () => {
  try {
    let CateId = { "id": goodsParams.c[2] };
    console.log(CateId);
    const response = await api.getBrandToCateDetail(goodsParams.c[2], CateId);

    brandOptions.value = response;

  } catch (error) {
    console.error('获取品牌失败:', error);
  }
};



// 处理分类变更

const handleCateChange = (val) => {
  value.first_cate = val;
  value.second_cate = null; // 重置二级分类
  value.category = null; // 重置三级分类
  fetchSecondCategories(val); // 加载新的二级分类
};

// 处理二级分类变更
const handleSecondCateChange = (val) => {
  value.second_cate = val;
  value.category = null; // 重置三级分类
  fetchThirdCategories(val); // 加载新的三级分类
};

// 处理三级分类变更
const handleThirdCateChange = async (val) => {
  value.category = val;
  let CateId = { "id": value.category };
  const response = await api.getBrandToCateDetail(value.category, CateId);
  brandOptions.value = response;

};

// 加载二级分类
const fetchSecondCategories = (firstCateId) => {
  try {
    const firstCategory = productCateOptions.value.find(category => category.id === firstCateId);
    if (firstCategory && firstCategory.sub_category) {
      selectProductSecondCateValue.value = firstCategory.sub_category;
    } else {
      selectProductSecondCateValue.value = [];
    }
  } catch (error) {
    console.error('加载二级分类失败:', error);
  }
};

// 加载三级分类
const fetchThirdCategories = (secondCateId) => {
  try {
    let secondCategory = null;
    for (const firstCategory of productCateOptions.value) {
      secondCategory = firstCategory.sub_category.find(category => category.id === secondCateId);
      if (secondCategory) break;
    }
    if (secondCategory && secondCategory.sub_category) {
      selectProductThirdCateValue.value = secondCategory.sub_category;
    } else {
      selectProductThirdCateValue.value = [];
    }
  } catch (error) {
    console.error('加载三级分类失败:', error);
  }
};

// 处理品牌变更
const handleBrandChange = async (val) => {
  // 逻辑可以根据实际需求调整
};

// 处理搜索
const handleSearchList = async () => {
  goodsParams.pn = 1; // 重置页码为第一页
  goodsParams.c = goodsParams.c[2];
  console.log(goodsParams);
  fetchList();
};

// 处理重置搜索
const handleResetSearch = async () => {
  goodsParams.q = '';
  goodsParams.c = null;
  goodsParams.b = null;
  fetchList();
};

// 处理添加商品
const handleAddProduct = async () => {
  dialogFormVisible.value = true;
  action.value = 'add';
  isEdit.value = false;
  resetForm();
};

// 处理编辑商品
const edit = () => {
  isEdit.value = true;
};

const multiInput = async (file) => {

  img1.value = file;
  value.images = file.map((item) => {
    return item.url;
  });

}

const multiInput2 = async (file) => {
  img2.value = file;


  value.desc_images = file.map((item) => {
    return item.url;
  });


}
const multiInput3 = async (file) => {
  img3.value = file;


  value.front_image = file[0].url.toString();
  console.log(value.front_image);
}


// 提交表单

const finishCommit = () => {

  value.ship_free = Boolean(value.ship_free);
  productInfoForm.value.validate(async (valid) => {
    if (valid) {
      try {
        if (action.value === 'add') {
          value.market_price = Number(value.market_price) || 0
          value.shop_price = Number(value.shop_price) || 0
          value.stocks = Number(value.stocks) || 0
          await api.createGoods(value);
          console.log("返回值", value);
          dialogFormVisible.value = false;
          ElMessage.success('添加成功');
          fetchList();
        } else {

          value.market_price = Number(value.market_price) || 0
          value.shop_price = Number(value.shop_price) || 0
          value.stocks = Number(value.stocks) || 0
          await api.putGoods(value.id, value);
          dialogFormVisible.value = false;
          ElMessage.success('修改成功');
          fetchList();
        }
        // 调用 resetUpload 方法清空上传组件的数据
        resetUploadComponents();
      } catch (error) {
        ElMessage.error(res.msg);
      }
    }
  });
};


// 重置表单
const resetForm = () => {
  Object.keys(value).forEach(key => {
    value[key] = '';
  });
  value.ship_free = false;
};



// 重置上传组件数据
const resetUploadComponents = () => {
  const multiUploadComponents = ['multiUpload1', 'multiUpload2', 'multiUpload3'];
  multiUploadComponents.forEach(componentName => {
    const componentRef = this.$refs[componentName];
    if (componentRef && componentRef.resetUpload) {
      componentRef.resetUpload();
    }
  });
};

// 页面加载时执行
onMounted(() => {
  fetchList();
  fetchProductCateOptions();



});
</script>

<style scoped>
.app-container {
  padding: 20px;
  background-color: #f5f7fa;
}

.filter-container {
  margin-bottom: 20px;
}

.operate-container {
  margin-bottom: 20px;
}

.table-container {
  margin-top: 20px;
}

.pagination-container {
  text-align: right;
  margin-top: 20px;
}

.btn-add {
  float: right;
}
</style>
