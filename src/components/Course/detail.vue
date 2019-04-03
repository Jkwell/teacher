<template>
<transition name="slide">
  <div class="detail-wrapper" ref="wrapper">
    <div>
    <div class="detail-head">
      <div class="back" @click="back">
        <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
      </div>
    </div>
    <div class="title">{{course_name}}</div>
    <div class="subTitle">
      <div class="text">
        <span>章节:</span><span>{{zj}}</span>
      </div>
      <div class="text">
        <span>课时:</span><span>{{ks}}</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="course-title">
      目录
    </div>
    <div class="course-list"  v-for="(item, index) in courselist" :key="index">
      <div class="sTitle"  @click.stop.prevent="toggle(index)">
        第{{index + 1}}章    {{item.name}}
        <div class="arrow" :class='{down: down}'></div>
      </div>
      <div class="sList" v-show="item.showContent">
        <ul>
          <li v-for="(sitem, sindex) in item.list" :key="sindex" @click="goPath(sitem.status, sitem.ch_type, sitem.ch_id, sitem.ch_name)">
            <div class="num" :class="{cur: sitem.status === 0 || sitem.status === 2 ? 'cur' : ''}"><span>{{index + 1}}.{{sindex + 1}}</span><span>{{sitem.ch_name}}</span></div>
            <div class="dis" v-if="sitem.status === 0">未开放</div>
            <div class="diss" v-else-if="sitem.status === 2">查看</div>
            <div class="red" v-else>进行中</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="loading-container" v-show="!courselist.length">
      <loading></loading>
    </div>
  </div>
     </transition>
</template>

<script>
import Bscroll from 'better-scroll'
import {requestPost} from '@/common/js/request'
import loading from '@/components/Loading/loading'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      course_name: '',
      courselist: [],
      zj: 0,
      ks: 0,
      class_id: '',
      class_name: '',
      cm_id: '',
      down: false
    }
  },
  components: {
    loading
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    toggle (index) {
      this.down = !this.down
      this.courselist[index].showContent = !this.courselist[index].showContent
    },
    goPath (status, type, id, name) {
      if (status === 0 || status === 1) {
        return false
      } else {
        this.$router.push({path: 'coursestudy', query: {type: type, cm_id: this.cm_id, ch_id: id, class_name: this.class_name, class_id: this.class_id, name: name}})
      }
    },
    getCourseDetail (param) {
      let _this = this
      requestPost('api/teacher/coursehourlist', param).then(function (data) {
        if (data.success === true) {
          _this.courselist = []
          let response = data.data.lists
          _this.course_name = data.data.cm_name
          for (let k in response) {
            let value = {name: k, list: response[k], showContent: true}
            _this.courselist.unshift(value)
          }
          _this.zj = _this.courselist.length
        }
        _this.courselist.forEach(function (item, index) {
          let sum = 0
          sum += item.list.length
          _this.ks = sum
        })
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {click: true})
    })
  },
  activated () {
    let params = this.$route.query
    this.class_id = params.class_id
    this.cm_id = params.cm_id
    this.class_name = params.class_name
    let token = this.userInfo.token
    let param = {token: token, cm_id: params.cm_id, class_id: params.class_id}
    if (!this.$route.meta.isUseCache) {
      this.getCourseDetail(param)
    }
    this.$route.meta.isUseCache = false
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'CourseStudy') {
      from.meta.isUseCache = true
    }
    next()
  }
}
</script>
<style lang='sass'>
@import '~@/common/sass/course/detail.sass'
</style>
