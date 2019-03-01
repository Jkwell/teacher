<template>
<div class="bj" :style="{height: showHeight + 'px'}">
  <h2 class="title">登录</h2>
  <div class="form-wrapper">

    <div class="form">
      <form id="userForm">
        <div class="item">
            <label for="loginname" class="label-loginname login-label"></label>
            <input id="loginname" ref="user" v-model="username" name="username" type="text" class="itxt" placeholder="请输入账号">
        </div>
        <div class="item">
            <label for="password" class="label-password login-label"></label>
            <input :type="pwdType" v-model="password" id="password" name="password" class="itxt" placeholder="请输入密码">
            <label class="label-eye login-label" @click="changePwdType" :style="bg"></label>
        </div>
        <div class="btn">
          <div class="login-btn" @click="login">
            <a href="#" class="btn-entry">登录</a>
          </div>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import {requestPost} from '@/common/js/request'
import {mapGetters} from 'vuex'
let Base64 = require('js-base64').Base64
export default {
  data () {
    return {
      username: '',
      password: '',
      showHeight: document.body.clientHeight,
      pwdType: 'password',
      bg: {
        'background-image': 'url(' + require('../../common/image/login/eye.png') + ')'
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created () {
    // this.isLogin && this.$router.push('/index')
  },
  mounted () {
    this.$refs.user.focus()
  },
  methods: {
    changePwdType () {
      if (this.pwdType === 'password') {
        this.bg = {
          'background-image': 'url(' + require('../../common/image/login/oeye2.png') + ')'
        }
        this.pwdType = 'text'
      } else {
        this.bg = {
          'background-image': 'url(' + require('../../common/image/login/eye.png') + ')'
        }
        this.pwdType = 'password'
      }
    },
    validate ({ name, pass }) {
      if (name === '') {
        this.$vux.alert.show({
          title: '登录失败',
          content: '账号不能为空'
        })
        return false
      }
      if (pass === '') {
        this.$vux.alert.show({
          title: '登录失败',
          content: '密码不能为空'
        })
        return false
      }
      if (/[\u4E00-\u9FA5]/g.test(name) || /[\u4E00-\u9FA5]/g.test(pass)) {
        this.$vux.alert.show({title: '登录失败', content: '账号或密码不能为中文字符'})
        return false
      }
      return true
    },
    login () {
      const self = this
      let param = { name: this.username, pass: this.password }
      if (!this.validate(param)) return
      let jsonParam = JSON.stringify(param)
      let value = Base64.encode(jsonParam)
      this.$vux.loading.show()
      requestPost('api/pad/login', {key: value}).then(function (data) {
        let loginStatus = {
          'isLogin': 1,
          'userId': data.data.user.user_id
        }
        let userInfo = {
          'sm_name': data.data.user.sm_name,
          'so_id': data.data.user.so_id,
          'oldPwd': self.password,
          'user_name': data.data.user.user_name,
          'user_realname': data.data.user.user_realname,
          'token': data.data.user.token
        }
        if (data) {
          self.callback({ loginStatus, userInfo }, data)
        }
      })
    },
    callback (user, data) {
      if (data.success === true) {
        this.$vux.loading.hide()
        this.$vux.toast.show({
          width: '10em',
          text: '登录成功',
          time: 200
        })
        this.$store.commit('SET_LOGIN', user)
        this.$router.replace('index')
      }
    }
  }
}
</script>

<style lang="sass">
@import '~@/common/sass/login/login'
</style>
