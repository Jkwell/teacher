<template>
<transition name="slide">
  <div class="wrapper">
    <div class="vertify-head">
      <div class="back" @click="back">
        <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
      </div>
      <div class="title">验证手机</div>
    </div>
    <div class="vertify-content">
      <div class="password-wrapper">
        <ul class="password-list">
          <li class="password-item">
            <label class="item">手机号:</label>
            <input type="text" placeholder="请输入手机号" v-model="phone" style="width: 70%">
          </li>
          <li class="password-item vertify">
            <label class="item">验证码:</label>
            <input type="text" placeholder="" v-model="msg" maxlength="6">
            <div class="clear-btn">
              <div class="clear"></div>
              <div class="btn" v-if='code' @click="sendCode">获取验证码</div>
              <div class="btn dis" v-else>{{num}}  s</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="vertify-btn-wrapper" @click="sendMsg">
        <div class="vertify-btn">完成</div>
      </div>
    </div>
  </div>
   </transition>
</template>

<script>
import {requestPost} from '@/common/js/request'
export default {
  data () {
    return {
      code: true,
      num: 60,
      timer: '',
      msg: ''
    }
  },
  computed: {
    phone: {
      get () {
        return this.$store.state.phone === undefined ? '' : this.$store.state.phone
      },
      set (value) {
        this.$store.commit('ADD_PHONE', value)
      }
    }
  },
  methods: {
    back () {
      this.$router.push('phone')
    },
    sendCode () {
      if (this.phone === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入手机号'
        })
        return false
      }
      let param = {
        'token': this.$store.state.userInfo.token,
        'data': this.phone,
        'type': 1
      }
      this.code = false
      this.timer = setInterval(() => {
        this.num--
        if (this.num === 0) {
          clearInterval(this.timer)
          this.num = 60
          this.code = true
        }
      }, 1000)
      requestPost('api/teacher/sendcode', param).then(function (data) {
      })
    },
    sendMsg () {
      let _this = this
      let param = {
        'token': this.$store.state.userInfo.token,
        'data': this.phone,
        'type': 1,
        'code': this.msg
      }
      requestPost('api/teacher/editbind', param).then(function (data) {
        if (data.success === true) {
          _this.$vux.alert.show({
            title: '提示',
            content: '绑定成功',
            onHide () {
              _this.$router.push('teacherinfo')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang='sass'>
@import '~@/common/sass/user/changeUser'
</style>
