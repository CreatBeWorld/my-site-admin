<template>
  <div class="project-list-container app-container">
    <el-table :data="projectList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
      <el-table-column label="项目名称" width="180" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="a-hover">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="项目描述" align="center"> </el-table-column>
      <el-table-column label="预览图" align="center" width="150">
        <template slot-scope="scope">
          <el-image style="width: 120px" :src="scope.row.thumb" fit="fit" :preview-src-list="srcList"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="github" placement="top">
            <el-button type="primary" icon="iconfont icon-github" circle size="mini" @click="handleGithub(scope.row.github)" class="github-icon"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请编辑该项目信息" :visible.sync="dialogFormVisible" fullscreen class="dialog">
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以英文逗号分隔）">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="Github地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-form-item label="预览图">
          <Upload v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order">
            <el-option v-for="(item, key) in orders" :key="key" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
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
import { getProjects, editProject, deleteProject } from '@/api/project'
// const { server } = require('@/settings')
export default {
  name: 'ProjectList',
  data() {
    return {
      projectList: [],
      srcList: [],
      dialogFormVisible: false,
      form: {
        name: '', // 项目名称
        description: '', // 项目描述
        github: '', // github地址
        url: '', // 项目链接
        thumb: '', // 预览图地址
        order: 1 // 排序等级
      },
      orders: [1, 2, 3, 4, 5]
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
      const { data } = await getProjects()
      this.projectList = data.map((d) => {
        // const thumb2 = server + d.thumb
        // this.srcList.push(thumb2)
        return {
          ...d,
          description: d.description.toString(),
          // thumb2
        }
      })
    },
    handleGithub(url) {
      window.open(url)
    },
    handleEdit(projectInfo) {
      this.form = { ...projectInfo }
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      this.$confirm('是否删除该项目？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteProject(id)
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
    async dialogFormComfirm() {
      const { id, ...data } = this.form
      data.description = data.description.split(',')
      const res = await editProject(id, data)
      if (res.code === 0 && res.data) {
        this.fetchData()
        this.dialogFormVisible = false
        this.$message.success('编辑项目成功')
      } else {
        this.dialogFormVisible = false
        this.$message.error('编辑项目失败')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.a-hover:hover {
  color: rgb(163, 163, 163);
}
.github-icon {
  background-color: rgb(163, 163, 163);
  border-color: rgb(163, 163, 163);
}
</style>
