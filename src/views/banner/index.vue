<template>
  <div class="banner-container app-container">
    <el-table :data="banners" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center"> </el-table-column>
      <el-table-column prop="description" label="描述" align="center"> </el-table-column>
      <el-table-column label="中图" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.midImg" fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.bigImg" fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <el-form-item label="标语">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 2, maxRows: 6 }" resize="none"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图" label-width="70px">
              <Upload v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图" label-width="70px">
              <Upload v-model="form.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormComfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { getBanners, setBanners } from '@/api/banner'
// const { server } = require('@/settings')
export default {
  name: 'Banner',
  data() {
    return {
      banners: [],
      dialogFormVisible: false,
      form: {
        id: '',
        title: '',
        description: '',
        midImg: '',
        bigImg: ''
      },
      // server
    }
  },
  components: {
    Upload
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await getBanners()
      this.banners = data
    },
    handleEdit(row) {
      this.form = { ...row }
      this.dialogFormVisible = true
    },
    async dialogFormComfirm() {
      for (let i = 0; i < this.banners.length; i++) {
        if (this.banners[i].id === this.form.id) {
          this.banners[i] = this.form
          break
        }
      }
      const res = await setBanners(this.banners)
      if (res.code === 0) {
        this.$message.success('编辑信息成功')
        this.fetchData()
      } else {
        this.$message.error('编辑信息失败')
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.upload-container {
  margin-top: 15px;
}
</style>
