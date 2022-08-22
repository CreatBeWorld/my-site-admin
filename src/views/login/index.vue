<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">个人博客后台管理系统</h3>
      </div>
      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- tabindex:按tab键跳的顺序 -->
        <el-input ref="loginId" v-model="loginForm.loginId" placeholder="请输入管理员账号" name="loginId" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>
      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <!-- .native修饰符：监听组件根元素上的原生事件 -->
        <el-input :key="passwordType" ref="loginPwd" v-model="loginForm.loginPwd" :type="passwordType" placeholder="请输入管理员密码" name="loginPwd" tabindex="2" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="captcha-container">
        <el-form-item prop="captcha" class="captcha-input">
          <span class="svg-container">
            <svg-icon icon-class="nested" />
          </span>
          <el-input v-model="loginForm.captcha" type="text" placeholder="请输入验证码" name="captcha" tabindex="3" />
        </el-form-item>
        <div class="captcha-img" @click="handleGetCaptcha" v-html="captchaImg"></div>
      </div>
      <el-checkbox v-model="loginForm.checked" class="remember">七天内免登录</el-checkbox>
      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginId: '',
        loginPwd: '',
        captcha: '',
        checked: true
      },
      loginRules: {
        loginId: [{ required: true, trigger: 'blur', message: '请输入管理员账号' }],
        loginPwd: [{ required: true, trigger: 'blur', message: '请输入管理员密码' }],
        captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      captchaImg: '',
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      test:''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,//立即执行，一开始数据没变也执行
    }
  },
  created() {
    this.handleGetCaptcha()
  },
  methods: {
    // 密码显示与隐藏
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      //dom更新完成之后，调用回调函数，并且回调函数中this指向调用回调函数的实例上
      this.$nextTick(() => {
        this.$refs.loginPwd.focus()
      })
    },
    // 获取验证码
    async handleGetCaptcha() {
      this.captchaImg = await getCaptcha()
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) {
          return
        }
        this.loading = true
        const { checked, ...data } = this.loginForm
        data.loginId = data.loginId.trim()
        data.loginPwd = data.loginPwd.trim()
        if (checked) {
          data.remember = 7
        }
        const res = await this.$store.dispatch('user/login', data)
        if (res) {
          this.$message.error(res)
          this.loginForm.captcha = ''
          this.handleGetCaptcha()
          this.loading = false
        } else {
          this.loading = false
          this.$router.push(this.redirect ? this.redirect : '/')
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.captcha-container {
  display: flex;
  .captcha-input {
    width: 70%;
  }
  .captcha-img {
    width: 30%;
    margin-left: 10px;
    height: 50px;
    cursor: pointer;
  }
}
.remember {
  margin-bottom: 10px;
}
</style>
