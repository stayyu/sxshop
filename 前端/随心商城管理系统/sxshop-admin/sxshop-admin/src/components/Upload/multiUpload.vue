<template>
  <div>
    <el-upload :action="useOss ? host : minioUploadUrl" :data="useOss ? dataObj : null" list-type="picture-card"
      :file-list="value" :before-upload="beforeUpload" :on-remove="handleRemove" :on-success="handleUploadSuccess"
      :on-preview="handlePreview" :limit="maxCount" :on-exceed="handleExceed" :disabled="disabled" ref="load"
      :multiple="multiple">
      <!-- :http-request="requestImg" -->
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs';
import axios from 'axios';

export default {
  name: 'multiUpload',
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    maxCount: {
      type: Number,
      default: 5
    },
    disabled: Boolean
  },
  data() {
    return {
      dataObj: {
        signature: '',
        key: '',
        key: '',
      },
      host: '',
      dir: '',
      dialogVisible: false,
      dialogImageUrl: null,
      useOss: false,
      ossUploadUrl: '',
      minioUploadUrl: 'http://192.168.110.1:8022/g/v1/oss/uploadImg',
      url: '',
    };
  },
  computed: {
    fileList() {
      return this.value || [];
    }
  },
  methods: {
    emitInput(value) {
      this.$emit('input', value);
    },
    handleRemove(file, value) {
      this.emitInput(value);
    },
    handlePreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    beforeUpload(file) {
      let _self = this;
      _self.dataObj.name = file.name;
      if (!this.useOss) {
        return true;
      }
    },
    requestImg(file) {
      console.log(file, axios);
      let params = file.data;
      params.file = file.file;
      const rep = axios.post(this.dataObj.host, qs.stringify(params), { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
        console.log(rep);
      });
    },
    handleUploadSuccess(res, file, fileList) {
      let imgList = [];
      fileList.forEach(item => {
        if (item.size) {
          imgList.push({ url: "http://" + item.response.data.URL });
        } else {
          imgList.push(item);
        }
      });
      this.emitInput(imgList);
    },
    handleExceed(files, value) {
      this.$message({
        message: '最多只能上传' + this.maxCount + '张图片',
        type: 'warning',
        duration: 1000
      });
    },
    resetUpload() {
      this.emitInput([]);
    }
  }
};
</script>

<style></style>