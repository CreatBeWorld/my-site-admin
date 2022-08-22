<template>
  <div class="set-container app-container">
    <div class="info-show">
      <div class="setting-item">
        <h3 class="title">网站信息</h3>
        <div class="sub-title">网站标题</div>
        <el-input v-model="settings.siteTitle" disabled class="input"> </el-input>
        <div class="sub-title">邮箱</div>
        <el-input v-model="settings.mail" disabled class="input"> </el-input>
        <div class="sub-title">备案号</div>
        <el-input v-model="settings.icp" disabled class="input"> </el-input>
      </div>
      <div class="setting-item">
        <h3 class="title">网站头像信息</h3>
        <el-image :src="settings.avatar" class="site-avatar"></el-image>
      </div>
      <div class="setting-item">
        <h3 class="title">网址图标信息</h3>
        <div class="sub-title">网址图标地址</div>
        <el-input v-model="settings.favicon" disabled class="input"> </el-input>
        <div class="sub-title">网址图标预览</div>
        <el-avatar shape="square" :size="50" :src="settings.favicon" class="m-b"></el-avatar>
      </div>
      <div class="setting-item">
        <h3 class="title">github信息</h3>
        <div class="sub-title">github名字</div>
        <el-input v-model="settings.githubName" disabled class="input"> </el-input>
        <div class="sub-title">github地址</div>
        <el-input v-model="settings.github" disabled class="input"> </el-input>
      </div>
      <div class="setting-item">
        <h3 class="title">QQ信息</h3>
        <div class="sub-title">QQ号码</div>
        <el-input v-model="settings.qq" disabled class="input"> </el-input>
        <div class="sub-title">QQ二维码图片预览</div>
        <el-image :src="settings.qqQrCode" class="site-avatar"></el-image>
      </div>
      <div class="setting-item">
        <h3 class="title">微信信息</h3>
        <div class="sub-title">微信号</div>
        <el-input v-model="settings.weixin" disabled class="input"> </el-input>
        <div class="sub-title">微信二维码图片预览</div>
        <el-image :src="settings.weixinQrCode" class="site-avatar"></el-image>
      </div>
      <el-button type="primary" style="margin-top: 15px" @click="handleEdit">进入编辑模式</el-button>
    </div>
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" fullscreen class="dialog">
      <el-form :model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form.siteTitle"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.mail"></el-input>
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form.icp"></el-input>
        </el-form-item>
        <el-form-item label="网站头像地址">
          <Upload v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="网站图标地址">
          <el-input v-model="form.favicon"></el-input>
        </el-form-item>
        <el-form-item label="github名字">
          <el-input v-model="form.githubName"></el-input>
        </el-form-item>
        <el-form-item label="github地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>
        <el-form-item label="QQ二维码图片地址">
          <Upload v-model="form.qqQrCode" />
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form.weixin"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码图片地址">
          <Upload v-model="form.weixinQrCode" />
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
import { getSettings, editSettings } from '@/api/setting'
import Upload from '@/components/Upload'
// const { server } = require('@/settings')
export default {
  name: 'Setting',
  data() {
    return {
      settings: {},
      // server,
      dialogFormVisible: false,
      form: {}
    }
  },
  components:{
    Upload
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await getSettings()
      this.settings = data
    },
    handleEdit() {
      const { id, ...data } = this.settings
      this.form = data
      this.dialogFormVisible = true
    },
    async dialogFormComfirm() {
      const res = await editSettings(this.form)
      if(res.code===0&&res.data){
        this.fetchData()
        this.dialogFormVisible =false
        this.$message.success('编辑成功')
      }else{
         this.dialogFormVisible =false
        this.$message.success('编辑失败')
      }
    }
  }
}
</script>

<style scoped lang="scss">
$marginBottom: 15px;
.setting-item {
  border-bottom: 1px solid rgb(163, 163, 163);
  .title {
    font-weight: normal;
  }
  .site-avatar {
    width: 100px;
    margin-bottom: $marginBottom;
  }
  .sub-title {
    font-size: 14px;
    margin-bottom: $marginBottom;
  }
  .input {
    width: 40%;
    margin-bottom: $marginBottom;
  }
  .m-b {
    margin-bottom: $marginBottom;
  }
}
</style>
