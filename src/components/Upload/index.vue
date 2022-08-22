<template>
  <div class="upload-container">
    <div v-if="title" class="title" style="margin-bottom: 15px">
      {{ title }}
    </div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
// const { server } = require('@/settings')
export default {
  name: 'Upload',
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    }
  },
  // data() {
  //   return {
  //     server
  //   }
  // },
  computed: {
    headers() {
      const token = getToken()
      return {
        Authorization: `Bearer ${token}`
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        this.$emit('input', res.data)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
