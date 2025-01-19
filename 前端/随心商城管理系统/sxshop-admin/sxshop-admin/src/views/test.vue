<template>
    <el-card class="form-container" shadow="never">
      <el-form :model="brand" :rules="rules" ref="brandFrom" label-width="150px">
        <el-form-item label="品牌名称：" prop="name">
          <el-input v-model="brand.name"></el-input>
        </el-form-item>
      
        <el-form-item label="品牌LOGO：" prop="logo">
          <single-upload v-model="brand.logo"></single-upload>
        </el-form-item>
      
        <el-form-item>
          <el-button type="primary" @click="onSubmit('brandFrom')">提交</el-button>
          <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  import { createBrand, putBrands, getBrand } from '@/apis/goods';
  import SingleUpload from '@/components/Upload/singleUpload';
  
  const defaultBrand = {
    letter: '',
    logo: '',
    name: '',
    sort: 0
  };
  
  export default {
    name: 'BrandDetail',
    components: { SingleUpload },
    props: {
      edit: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const brand = reactive(Object.assign({}, defaultBrand));
      const isEdit = ref(false);
      const rules = {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
        ],
        logo: [
          { required: true, message: '请输入品牌logo', trigger: 'blur' }
        ],
      };
  
      const onSubmit = (formName) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (isEdit.value) {
                putBrands(this.$route.query.id, brand).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createBrand(brand).then(response => {
                  // this.$refs[formName].resetFields();
                  // brand = Object.assign({}, defaultBrand);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.push('/brand')
                });
              }
            });
  
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      };
  
      const resetForm = (formName) => {
        this.$refs[formName].resetFields();
        brand = Object.assign({}, defaultBrand);
      };
  
      return {
        brand,
        isEdit,
        rules,
        onSubmit,
        resetForm
      };
    },
    created() {
      if (this.$route.query.id) {
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
      console.log('编辑平拍');
      if (this.isEdit) {
        getBrand(this.$route.query.id).then(response => {
          this.brand = response;
        });
      } else {
        this.brand = Object.assign({}, defaultBrand);
      }
    }
  }
  </script>
  
  <style></style>
  