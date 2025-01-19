<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <el-icon style="margin-top: 5px"><Connection /></el-icon>
      <span style="margin-top: 5px">数据列表</span>
      
      <el-button class="btn-add" @click="goAdd()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border>
      <el-table-column v-for="item in tableLable" :key="item.prop" :label="item.label" :prop="item.prop" align="center">
  
      </el-table-column>
  <el-table-column label="图片">
      <template #default="{ row }">
        <el-image
          style="width: 100px; height: 100px"
          :src="row.logo"
          fit="fill"></el-image>
      </template>
    </el-table-column>

      <el-table-column label="操作" align="center">
      <template #="scope">
        <el-button size="mini" @click="updatebrand(scope.row)">编辑</el-button>
        <el-button size="mini" @click="deleteBrandToCate(scope.row)">删除</el-button>
      </template>
      </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :total="pageinfo.total"
        :current-page="pageinfo.pn"
        :page-size="10"
      />
    </div>
    </div>


  <!-- 提示框 -->
  <el-dialog v-model="dialogFormVisible" :title="action === 'add' ? '新增品牌' : '编辑品牌'" width="800" @close="resetForm('brandForm')">
    <el-form :model="brand" :rules="rules" ref="brandForm" label-width="150px">
      <el-form-item label="品牌名称：" prop="name">
        <el-input v-model="brand.name"></el-input>
      </el-form-item>
      
      <el-form-item label="品牌LOGO：" prop="logo">
        <el-upload 
          class="dl-avatar-uploader-min square"
          :action="`http://${dataSet.uploadUrl}`"
          :show-file-list="false"
          :on-success="handleUpImage"
          :before-upload="beforeImageUpload"
          list-type="picture-card"
          accept="image/*"
        >
        <el-image style="width: 100px; height: 100px" :src="brand.logo" :fit="fit" />
          <template #tip>
            <div class="el-upload__tip">只能上传图片，且单张图片大小不能超过10MB</div>
          </template>
        </el-upload>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'



const dataSet = reactive({
  uploadUrl: '192.168.110.1:8022/g/v1/oss/uploadImg', // 上传图片的地址
  addfrom: {
    image: ''
  }
})

const { proxy } = getCurrentInstance()
const action = ref('add')
const dialogFormVisible = ref(false)


const brand = reactive({
  logo: '',
  name: '',
})

const pageinfo=reactive({
    pn: 1,
    pnum: 10,
    total: 0,
})
const rules = {
  name: [
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
  ],
  logo: [
    { required: true, message: '请输入品牌logo', trigger: 'blur' }
  ],
}

const tableData = ref([])
const tableLable = [
  {
    label: '品牌id',
    prop: 'brandid'
  },
  {
    label: '品牌名称',
    prop: 'brand'
  },

]


const handleCurrentChange=(page)=>{
  pageinfo.pn=page
  getBrandData()
}

const getBrandData = async () => {
  console.log(pageinfo.pn);
  console.log(pageinfo.pnum);
  let params = {
        pn: pageinfo.pn,
        psize: pageinfo.pnum
      };
  let date = await proxy.$api.getBrands(params)
  console.log(date);
  tableData.value = date.data.map(item => ({
    ...item,
    brand: item.name,
    brandid: item.id,
    logo: item.logo
  }))
  pageinfo.total = date.total

}



const updatebrand = async (val) => {
  action.value = 'edit'
  dialogFormVisible.value = true
  nextTick(() => {
    Object.assign(brand, val)
    brand.brandid = val.brandid
  })

}


  const deleteBrandToCate = async (row) => {
    const confirmDelete = await ElMessageBox.confirm('确定要删除该品牌吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    if (confirmDelete === 'confirm') {
      const res = await proxy.$api.deleteBrands(row.brandid)
      console.log(res);
      if (res!=="success") {
        ElMessage.success('删除成功')
        getBrandData()
      } else {
        ElMessage.error(res.msg)
      }
    }
  }
 
  


const goAdd = () => {
  dialogFormVisible.value = true
}

  
const onSubmit = async (formName) => {
if (action.value === 'add') {
   const res = await  proxy.$api.createBrand(brand)
    console.log(res);
    if (res) {
      ElMessage.success('添加成功');
      dialogFormVisible.value = false;
      getBrandData();
    } else {
      ElMessage.error(res.msg);
    }
} else {
  console.log(brand.id);
  const res = await proxy.$api.putBrands(brand.id, brand)
  console.log(res);
  if (res!=="success") {
    ElMessage.success('修改成功');
    dialogFormVisible.value = false;
    getBrandData();
  } else {
    ElMessage.error(res.msg);
  }
  }
}

const resetForm = (formName) => {
  const form = proxy.$refs[formName]
  form.resetFields()
}
const beforeImageUpload = async (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error("单张图片大小不能超过10MB!")
    return false
  }
  return true
}

const handleUpImage = async (res) => {
  brand.logo = "http://"+res.data.URL
  dataSet.addfrom.image = "http://"+res.data.URL
}

onMounted(() => {
  getBrandData()
})
</script>

<style scoped>
.imgs {
  width: 50px;
  height: 50px;
}
</style>
