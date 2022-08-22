<template>
  <div class="blog-type-container app-container">
    <!-- 操作区 -->
    <div class="operating-container">
      <el-input
        v-model="operatingData.name"
        placeholder="请输入要添加的分类，左边选择该分类等级"
      >
        <el-select slot="prepend" v-model="operatingData.order">
          <el-option
            v-for="(item, key) in orders"
            :key="key"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-input>
      <el-button type="primary" class="btn" @click="addBlogType"
        >添加</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table :data="blogTypeList" border style="width: 100%">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="博客类别" align="center" />
      <el-table-column prop="articleCount" label="文章数量" align="center" />
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEdit(scope.row)"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDelete(scope.row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改分类对话框 -->
    <el-dialog
      title="请编辑该分类信息"
      :visible.sync="dialogFormVisible"
      width="25%"
    >
      <el-form :model="form" label-width="75px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order">
            <el-option
              v-for="(item, key) in orders"
              :key="key"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogFormComfirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogTypes,
  addBlogType,
  deleteBlogType,
  editBlogType
} from '@/api/blog'
export default {
  name: 'BlogType',
  data() {
    return {
      operatingData: {
        name: '',
        order: 1
      },
      orders: [1, 2, 3, 4, 5], // 排序的等级
      blogTypeList: [], // 分类数据
      dialogFormVisible: false,
      form: {
        name: '',
        order: 1
      },
      editId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await getBlogTypes()
      this.blogTypeList = data
    },
    // 重置数据
    resetOperatingData() {
      this.operatingData = {
        name: '',
        order: 1
      }
    },
    // 添加分类
    async addBlogType() {
      if (!this.operatingData.name) {
        return this.$message.error('请填写分类名称')
      }
      const res = await addBlogType(this.operatingData)
      if (res.code === 0 && res.data) {
        this.fetchData()
        this.$message.success('添加分类成功')
      } else {
        this.$message.error('添加分类失败')
      }
      this.resetOperatingData()
    },
    // 修改分类
    handleEdit(row) {
      this.form.name = row.name
      this.form.order = row.order
      this.editId = row.id
      this.dialogFormVisible = true
    },
    // 删除分类
    handleDelete(id) {
      this.$confirm(
        '删除分类后，分类下的所有文章将变为无分类状态',
        '是否删除该分类？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await deleteBlogType(id)
          if (res.code === 0) {
            this.fetchData()
            this.$message.success('删除成功!')
          } else {
            this.$message.error('删除失败!')
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    async handleDialogFormComfirm() {
      const res = await editBlogType(this.editId, this.form)
      if (res.code === 0 && res.data) {
        this.fetchData()
        this.$message.success('编辑成功')
      } else {
        this.$message.error('编辑失败')
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.operating-container {
  width: 35%;
  display: flex;
  margin-bottom: 20px;
  .btn {
    margin-left: 10px;
  }
}
</style>
