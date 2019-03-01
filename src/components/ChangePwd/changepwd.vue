<template>
<transition name="slide">
  <div class="wrapper">
    <div class="pwd-head">
      <div class="back" @click="back">
        <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
      </div>
      <div class="title">修改密码</div>
      <div class="save" @click="save">保存</div>
    </div>
    <div class="pwd-content" :style="{height: documentHeight + 'px'}">
      <div class="password-wrapper">
        <ul class="password-list">
          <li class="password-item">
            <label class="item">旧密码:</label>
            <input type="text" :value="userInfo.oldPwd">
          </li>
          <li class="password-item">
            <label class="item">新密码:</label>
            <input type="text" placeholder="请输入新密码" v-model="newPwd">
          </li>
          <li class="password-item">
            <label class="item">确认密码:</label>
            <input type="text" placeholder="请再次输入新密码" v-model="nPwd">
          </li>
        </ul>
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
      newPwd: '',
      nPwd: '',
      documentHeight: document.body.offsetHeight - 40
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    back () {
      this.$router.push('teacherinfo')
    },
    save () {
      let _this = this
      if (this.newPwd !== this.nPwd) {
        this.$vux.alert.show({
          title: '提示',
          content: '密码不一致,请重新输入'
        })
        return
      }
      let param = {
        'token': this.$store.state.userInfo.token,
        'oldpwd': this.userInfo.oldPwd,
        'newpwd0': this.newPwd,
        'newpwd1': this.nPwd
      }
      requestPost('api/teacher/editpassword', param).then(function (data) {
        if (data.success === true) {
          _this.$vux.alert.show({
            title: '提示',
            content: '密码修改成功',
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
