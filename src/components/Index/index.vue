<template>
<transition name="slide">
<div class="wrap">
  <div style="height: 100%; overflow: hidden">
  <div class="header" ref="head">
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
  <div class="content" :style="{top: list + 'px'}">
    <div class="class-title">教学反馈</div>
    <div class="class-list" :style="{top: listtop + 'px'}"  ref="wrapper">
      <ul>
        <li v-show="item.total > 0" class="class-item" v-for="(item, index) in list" :key="index" @click="goDetail(item.ch_type, item.cm_id, item.ch_id, item.class_name, item.class_id, item.ch_name)">
          <div class="sub-title">{{item.class_name}}</div>
          <div class="sub-name">{{item.ch_name}}</div>
          <div class="num" v-if="item.total > item.has_look"><span class="red">{{item.has_look}}</span><span class="grey">/{{item.total}}</span></div>
          <div class="num" v-if="item.total > 0 && item.total === item.has_look" > <img width="20" height="16" style="vertical-align: text-bottom" src="../../common/image/index/true.png" alt=""></div>
        </li>
      </ul>
    </div>
  </div>
  </div>
  <!-- <div class="content">
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
  </div> -->
    <Footer />
    <div class="loading-container" v-show="show" style="position: fixed;top: 60%; left: 50%; transform: translate3d(-50%, -50%, 0)">
        <loading></loading>
      </div>
  </div>

</transition>
</template>

<script>
import { requestPost } from '@/common/js/request'
import loading from '@/components/Loading/loading'
import {mapGetters, mapActions} from 'vuex'
import Bscroll from "better-scroll";
import Footer from '@/components/Footer/footer'
export default {
  data () {
    return {
      list: [],
      top: '',
      show: false,
      listtop: ''
    }
  },
  computed: {
    ...mapGetters(
      ['userInfo']
    ),
  },
  components: {
    Footer,
    loading
  },
  mounted() {
    this.list = this.$refs.head.clientHeight + 25
    this.listtop = this.$refs.head.clientHeight + 80
    this.getIndex()
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, { click: true });
    });
  },
  methods: {
    ...mapActions([
      'removeUserInfo'
    ]),
    getIndex () {
      let _this = this
      let token = this.userInfo.token
      let arr = []
      let arrList = []
      this.show = true
      requestPost('api/teacher/index', { token: token }).then(function(data) {
        if (data.success === true) {
          arr.push(data.data)
          _this.show = false
        }
        arr.forEach(function(item, index) {
          for (let k in item) {
            _this.list = item[k]
          }
        })
      })
    },
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
    },
    goDetail(type, cmid, chid, classname, classid, chname) {
      if (!type || !cmid || !chid || !classname || !classid || !chname) {
        return false
      }
      this.$router.push({path: 'coursestudy', query: {type: type, cm_id: cmid, ch_id: chid, class_name: classname, class_id: classid, name: chname}})
    }
  }
}

</script>
<style lang='sass'>
@import '~@/common/sass/index/index'
@import '~@/common/sass/index/footer'
</style>
