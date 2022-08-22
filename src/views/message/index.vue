<template>
  <div class="comment-container app-container">
    <el-table :data="messageList" border style="width: 100%" v-loading="isLoading" element-loading-text="加载数据中">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (page - 1) * limit + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="90" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="30" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"> </el-table-column>
      <el-table-column prop="content" label="评论内容" align="center"> </el-table-column>
      <el-table-column prop="createDate" label="创建日期" align="center" width="240"> </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next,total,->,sizes,jumper" :total="total" style="margin-top: 20px" :page-sizes="[1, 5, 10, 20]" :page-size="limit" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"> </el-pagination>
  </div>
</template>

<script>
import { getMessages, deleteMessage } from '@/api/message'
// const { server} = require('@/settings')
import { formatDate } from '@/utils/tools'
export default {
  name: 'Message',
  data() {
    return {
      messageList: [],
      page: 1, //当前页
      limit: 5, //页容量
      total: 0, //数据总数
      pageTotal: 0, //页总数
      isLoading:false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取留言数据
    async fetchData() {
      this.isLoading = true
      const { data } = await getMessages(this.page, this.limit)
      this.total = data.total
      this.pageTotal = Math.ceil(this.total / this.limit)
      this.messageList = data.rows.map((r) => ({
        ...r,
        // avatar: server + r.avatar,
        createDate: formatDate(r.createDate)
      }))
      this.isLoading = false
      if (this.page > this.pageTotal) {
        this.page = this.pageTotal
        this.fetchData()
      }
    },
    // 删除留言
    handleDelete(id) {
      this.$confirm('是否删除该留言', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteMessage(id)
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
