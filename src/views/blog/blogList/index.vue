<template>
  <div class="blog-list-container app-container">
    <el-table :data="blogList" border style="width: 100%">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (page - 1) * limit + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180" align="center">
        <template slot-scope="scope">
          <el-popover placement="bottom" width="150" trigger="hover">
            <el-image style="width: 120px" :src="scope.row.thumb" fit="fit" :preview-src-list="previewImages"></el-image>
            <a :href="frontEndServer + '/article/' + scope.row.id" slot="reference" target="_blank">{{ scope.row.title }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center"> </el-table-column>
      <el-table-column prop="scanNumber" label="浏览数" align="center" width="120"> </el-table-column>
      <el-table-column prop="commentNumber" label="评论量" align="center" width="120"> </el-table-column>
      <el-table-column label="所属分类" align="center">
        <template slot-scope="scope">
          {{ scope.row.category === null ? '未分类' : scope.row.category.name }}
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期" align="center"> </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next,total,->,sizes,jumper" :total="total" style="margin-top: 20px" :page-sizes="[5, 10, 15, 20]" :page-size="limit" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"> </el-pagination>
  </div>
</template>

<script>
import { getBlogs, deleteBlog } from '@/api/blog'
import { formatDate } from '@/utils/tools'
const {frontEndServer } = require('@/settings')
export default {
  name: 'BlogList',
  data() {
    return {
      blogList: [],
      previewImages: [],
      page: 1, // 当前页码数
      limit: 5, // 页容量
      total: 0, // 总数据条数
      totalPages: 0, // 总页数
      frontEndServer
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { data } = await getBlogs(this.page, this.limit)
      this.blogList = data.rows.map((d) => {
        this.previewImages.push(d.thumb)
        return {
          ...d,
          // thumb: server + d.thumb,
          createDate: formatDate(d.createDate)
        }
      })
      this.total = data.total
      this.totalPages = Math.ceil(this.total / this.limit)
      //当前页码数大于总页数时，重新获取数据
      if (this.page > this.totalPages) {
        this.page = this.totalPages
        this.fetchData()
      }
    },
    // 编辑文章
    handleEdit(id) {
      this.$router.push({
        name: 'EditBlog',
        params: {
          id
        }
      })
    },
    // 删除文章
    handleDelete(id) {
      this.$confirm('删除文章后，该文章下的所有评论将会被一同删除', '是否删除该文章？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteBlog(id)
          if (res.data && res.code === 0) {
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
    // 修改每页显示的条数时触发该函数
    handleSizeChange(pageNumber) {
      this.page = 1
      this.limit = pageNumber
      this.fetchData()
    },
    // 修改当前页时触发该函数
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    }
  }
}
</script>

<style></style>
