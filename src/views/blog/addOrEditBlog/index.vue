<template>
  <el-form :model="form" label-position="top">
    <el-form-item label="文章标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <!-- 文章编辑 -->
    <el-form-item label="文章编辑">
      <!-- toast-ui editor组件 -->
      <Editor
        ref="toastuiEditor"
        :initialValue="form.htmlContent"
        height="600px"
        :options="editorOptions"
      />
    </el-form-item>
    <el-form-item label="文章描述">
      <el-input
        v-model="form.description"
        type="textarea"
        :rows="6"
        resize="none"
      />
    </el-form-item>
    <el-form-item label="文章头图" style="width: 180px">
      <Upload v-model="form.thumb" />
    </el-form-item>
    <el-form-item label="选择分类">
      <el-select v-model="form.categoryId">
        <el-option
          v-for="item in blogTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-button type="primary" @click="addOrEdit">{{
      mode === 'add' ? '发布文章' : '确认修改'
    }}</el-button>
    <el-button
      v-if="mode === 'edit'"
      @click="$router.push({ name: 'BlogList' })"
      >取消</el-button
    >
  </el-form>
</template>

<script>
import { getBlogTypes, editBlog, getOneBlog, addBlog } from '@/api/blog'
import Upload from '@/components/Upload'
// 引入toast ui editor组件
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
export default {
  name: 'AddOrEditBlog',
  props: {
    mode: {
      // 判断当前组件是用于新增博客还是修改博客
      // 'add'---新增文章 'edit'---编辑文章
      type: String,
      required: true
    }
  },
  components: {
    Upload,
    Editor
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  data() {
    return {
      form: {
        title: '', // 文章标题
        description: '', // 文章描述
        htmlContent: '', // 文章编辑的内容
        thumb: '', // 文章头图
        categoryId: '' // 分类Id
      },
      blogTypes: [], // 文章分类
      editorOptions: {
        language: 'zh-CN' // 设置markdown编辑器的语言
      }
    }
  },
  async created() {
    this.fetchBlogTypes()
    if (this.mode === 'edit') {
      this.fetchData()
    }
  },
  methods: {
    // 获取博客分类
    async fetchBlogTypes() {
      const { data } = await getBlogTypes()
      this.blogTypes = data
    },
    // 获取单个博客
    async fetchData() {
      const { data } = await getOneBlog(this.id)
      this.$refs.toastuiEditor.invoke('setHTML', data.htmlContent)
      data.categoryId = data.category ? data.category.id : ''
      this.form = data
    },
    // 新增或修改博客
    addOrEdit() {
      console.log('first')
      const htmlContent = this.$refs.toastuiEditor.invoke('getHTML')
      const markdownContent = this.$refs.toastuiEditor.invoke('getMarkdown')
      const data = {
        ...this.form,
        htmlContent,
        markdownContent,
        createDate: Date.now()
      }
      if (
        data.title &&
        data.description &&
        data.htmlContent &&
        data.categoryId
      ) {
        if (this.mode === 'add') {
          this.add(data)
        } else {
          this.edit(data)
        }
      } else {
        this.$message.error('请填写所有内容')
      }
    },
    // 新增博客
    async add(data) {
      const res = await addBlog(data)
      if (res.code === 0 && res.data) {
        this.$router.push({
          name: 'BlogList'
        })
        this.$message.success('添加文章成功')
      } else {
        this.$message.error('添加文章失败')
      }
    },
    // 修改博客
    async edit(data) {
      const res = await editBlog({ id: this.id, data })
      if (res.code === 0 && res.data) {
        this.$router.push({
          name: 'BlogList'
        })
        this.$message.success('编辑文章成功')
      } else {
        this.$message.error('编辑文章失败')
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
