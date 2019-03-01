<template>
<transition name="slide">
<div class="wrap">

  <div class="header">
    <div class="header-title">
      <div class="header-left">
        <span class="la_icon"></span>
        <span class="la_title">{{userInfo.sm_name}}</span>
      </div>
      <div class="header-right" @click="goLogin">
        <span class="icon"></span>
        <span class="title">关闭</span>
      </div>
    </div>
    <div class="header-content teacher">
      <div class="text">教师系统</div>
    </div>
  </div>
  <div class="content">
    <ul class="list">
      <li class="item first" @click="goTeacher">
        <div class="info">
          <div class="icon teacher"></div>
          <div class="text">教师信息</div>
        </div>

      </li>
      <li class="item second" @click="goClass">
        <div class="info">
        <div class="icon teacher"></div>
        <div class="text">班级课程统计</div>
        </div>
      </li>
    </ul>
  </div>

  </div>
</transition>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(
      ['userInfo']
    )
  },
  methods: {
    ...mapActions([
      'removeUserInfo'
    ]),
    goLogin () {
      let _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '确认要退出系统吗?',
        // 组件除show外的属性
        onCancel () {
        },
        onConfirm () {
          _this.removeUserInfo()
          _this.$router.push('login')
        }
      })
    },
    goTeacher () {
      this.$router.push('teacherinfo')
    },
    goClass () {
      this.$router.push('myclass')
    }
  }
}

</script>
<style lang='sass'>
@import '~@/common/sass/index/index'
</style>
