<template>
  <div class="about-container app-container">
    <div class="title">关于我</div>
    <el-input
      v-model="url"
      :disabled="isDisabled"
      style="margin-bottom: 15px"
    />
    <el-button type="primary" @click="handleClick">{{ btnText }}</el-button>
  </div>
</template>

<script>
import { getUrl, editUrl } from '@/api/about'
export default {
  name: 'About',
  data() {
    return {
      url: '',
      isDisabled: true
    }
  },
  computed: {
    btnText() {
      return this.isDisabled ? '编辑' : '完成'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await getUrl()
      this.url = data
    },
    async handleClick() {
      this.isDisabled = !this.isDisabled
      if (this.isDisabled) {
        if (!this.url) {
          this.fetchData()
          this.$message.error('url不能为空')
          return
        }
        const res = await editUrl({ url: this.url })
        if (res.code === 0 && res.data) {
          this.fetchData()
          this.$message.success('更改成功')
        } else {
          this.$message.error('更改失败')
        }
      }
    }
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 15px;
}
</style>
