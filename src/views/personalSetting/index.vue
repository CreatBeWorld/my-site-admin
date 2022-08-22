<template>
  <div class="personal-setting-container app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
      <el-form-item label="用户名" style="width: 35%" prop="name">
        <el-input v-model="form.name" placeholder="请输入用户名" type="text" tabindex="1" />
      </el-form-item>
      <el-form-item prop="oldLoginPwd" label="旧密码" style="width: 35%">
        <el-input v-model="form.oldLoginPwd" type="password" placeholder="请输入旧密码" tabindex="2" />
      </el-form-item>
      <el-form-item prop="loginPwd" label="新密码" style="width: 35%">
        <el-input v-model="form.loginPwd" type="password" placeholder="请输入新密码" tabindex="3" />
      </el-form-item>
      <el-form-item prop="confirmPassword" label="新密码确认" style="width: 35%">
        <el-input v-model="form.confirmPassword" type="password" placeholder="请确认新密码" tabindex="4" />
      </el-form-item>
      <div class="operating-area">
        <el-button type="primary" @click="handleEdit">修改</el-button>
        <el-button type="danger" @click="handleBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getInfoAPI, updateInfo } from '@/api/user'
export default {
  name: 'PersonalSetting',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.form.loginPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        loginId: '',
        loginPwd: '',
        oldLoginPwd: '',
        confirmPassword: ''
      },
      confirmPassword: '',
      formRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        oldLoginPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        loginPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请输入确认新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await getInfoAPI()
      this.form.name = data.name
      this.form.loginId = data.loginId
    },
    handleEdit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return
        }
        const { confirmPassword, ...data } = this.form
        let res = await updateInfo(data)
        if (typeof res === 'string') {
          res = JSON.parse(res)
          this.$message.error(res.msg)
        } else {
          if (res.code === 0 && res.data) {
            this.$message.success('修改成功')
            await this.$store.dispatch('user/logout')
            this.$router.push({
              name: 'Login',
              query: {
                redirect: this.$route.fullPath
              }
            })
          }
        }
      })
    },
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.operating-area {
  padding-left: 100px;
}
</style>
