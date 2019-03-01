<template>
<transition name="slide">
<div class="wrapper">
    <div class="head-top">
      <div class="back" @click="back">
        <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
      </div>
      <div class="title">请修改昵称</div>
      <div class="save" @click="save">保存</div>
    </div>
    <div class="user-content" :style="{height: documentHeight + 'px'}">
      <div class="name">
        <input type="text" v-model="message" name="user">
        <div class="delete" @click="del"></div>
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
      oName: '',
      documentHeight: document.body.offsetHeight - 40
    }
  },
  computed: {
    message: {
      get () {
        return this.$store.state.userInfo.user_realname
      },
      set (value) {
        this.$store.commit('UPDATE_USERINFO', value)
      }
    }
  },
  methods: {
    back () {
      if (this.message === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '昵称不能为空'
        })
        return false
      } else {
        // if (this.getOldName() === false) {
        //     this.$vux.alert.show({
        //     title: '提示',
        //     content: '昵称还没有保存呢'
        //   })
        // }
        this.$router.push('teacherinfo')
      }
    },
    del () {
      this.message = ''
    },
    // getOldName () {
    //   let _this = this
    //   requestPost('api/teacher/teacherinfo', {'token': this.$store.state.userInfo.token}).then(function (data) {
    //     _this.oName = data.data.name
    //   })
    //   if (_this.oName !== this.message) {
    //     return false
    //   }
    // },
    save () {
      let _this = this
      let param = {
        'token': this.$store.state.userInfo.token,
        'user_realname': this.message
      }
      if (this.message === '') {
        this.$vux.alert.show({
          title: '保存失败',
          content: '昵称不能为空'
        })
        return false
      }
      requestPost('api/teacher/editname', param).then(function (data) {
        if (data.success === true) {
          _this.$vux.alert.show({
            title: '提示',
            content: '保存成功',
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
