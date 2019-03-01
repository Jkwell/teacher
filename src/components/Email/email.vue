<template>
<transition name="slide">
  <div class="wrapper">
    <div class="phone-head">
    <div class="back" @click="back">
      <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
    </div>
    <div class="title">
      绑定邮箱
    </div>
  </div>
  <div class="phone-content" :style="{height: documentHeight + 'px'}">
    <div class="phone-wrapper">
      <div class="abs">
        <div class="phone-btn" @click="send">更改邮箱</div>
        <div class="phone email">
          <div class="icon email">
            <img src="../../common/image/user/email.png" width="68" height="48">
          </div>
          <div class="text">
            <span class="phone-name">您的邮箱:</span>{{email}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="masks" v-if="show" :class="{show: show}">
    <div class="dialog-wrapper">
      <div class="dialog">
        <h2 class="title">验证原始密码</h2>
        <p class="desc">请在更换原始号码前验证原始密码</p>
        <div class="dialog-input">
            <input type="text" v-model="pwd">
        </div>
        <div class="btn-wrapper">
          <div class="btn left" @click="cancel">取消</div>
          <div class="btn" @click="success">确定</div>
        </div>
      </div>
    </div>
  </div>
  </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {requestPost} from '@/common/js/request'
export default {
  data () {
    return {
      show: false,
      pwd: '',
      email: '',
      documentHeight: document.body.offsetHeight - 40
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
    // email: {
    //   get () {
    //     return this.$store.state.email
    //   },
    //   set (value) {
    //     this.$store.commit('ADD_EMAIL', value)
    //   }
    // }
  },
  mounted () {
    console.log(this.$route)
    this.email = this.$route.query.email
  },
  methods: {
    back () {
      this.$router.push('teacherinfo')
    },
    send () {
      this.show = true
    },
    success () {
      let _this = this
      let param = {
        'token': this.$store.state.userInfo.token,
        'pwd': this.pwd
      }
      requestPost('api/teacher/confirmpassword', param).then(function (data) {
        if (data.success === true) {
          _this.$vux.alert.show({
            title: '提示',
            content: '密码验证成功',
            // 数组监听
            onHide () {
              _this.$router.push('vertifyemail')
            }
          })
        }
      }).catch(function (error) {
        console.log(error)
        _this.$vux.alert.show({
          title: '提示',
          content: '密码验证失败'
        })
      })
      _this.show = false
    },
    cancel () {
      this.show = false
    }
  }
}

</script>
<style lang='sass'>
@import '~@/common/sass/user/changeUser.sass'
</style>
