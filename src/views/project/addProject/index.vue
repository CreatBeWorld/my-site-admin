<template>
  <div class="add-project-container app-container">
    <el-form :model="form" class="form">
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
      <el-form-item label="预览图地址" style="width:150px">
        <Upload v-model="form.thumb"  style="margin-left:15px"/>
      </el-form-item>
      <el-form-item label="排序等级">
        <el-select v-model="form.order">
          <el-option v-for="(item, key) in orders" :key="key" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">发布项目</el-button>
        <el-button @click="$router.push({name:'ProjectList'})">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import { addProject } from '@/api/project'
export default {
  name: 'AddProject',
  data() {
    return {
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
  methods:{
    async handleAdd(){
      const data = {...this.form}
      data.description =data.description.split(",")
      const res = await addProject(data)
      if(res.code===0&&res.data){
        this.$router.push({name:'ProjectList'})
        this.$message.success('新增项目成功')
      }else{
        this.$router.push({name:'ProjectList'})
        this.$message.success('新增项目失败')
      }
    }
  }
}
</script>

<style></style>
