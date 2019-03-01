<template>
<transition name="slide">
  <div class="crs-wrap" ref='wrapper'>
    <div>
    <div class="course-head">
      <div class="back" @click="back">
        <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
      </div>
      <div class="title">班级列表</div>
    </div>
      <div class="course-list">
        <div class="wt" v-if="item.cm_hour_num > 0" @click=goPath(item.cm_id) v-for="(item, index) in courselist" :key="index">
        <div class="course">
          <img v-lazy="item.cm_img" :alt="item.cm_img">
        </div>
        <div class="course-content">
          <h3 class="title">{{item.cm_name}}</h3>
          <div class="course-time">
            <span>
              <i class="fa fa-clock-o"></i>
            </span>
            <span class="course-count">{{item.cm_hour_num}}课时</span>
          </div>
        </div>
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
      courselist: [],
      class_id: '',
      class_name: '',
      errorImg: 'this.src = "' + require('../../common/image/teacher/courseImg.jpg') + '"'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    loading
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {click: true})
    })
  },
  activated () {
    let token = this.userInfo.token
    let params = this.$route.query
    this.class_id = params.class_id
    this.class_name = params.name
    let param = {token: token, cm_type: params.cm_type, class_id: params.class_id}
    if (!this.$route.meta.isUseCache) {
      this.courselist = []
      this.getCourseList(param)
    }
    this.$route.meta.isUseCache = false
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'CourseDetail') {
      from.meta.isUseCache = true
    }
    next()
  },
  methods: {
    back () {
      this.$router.push('myclass')
    },
    goPath (id) {
      this.$router.push({path: 'coursedetail', query: {class_id: this.class_id, cm_id: id, class_name: this.class_name}})
    },
    getCourseList (param) {
      let _this = this
      requestPost('api/teacher/courselist', param).then(function (data) {
        if (data.success === true) {
          _this.courselist = data.data.lists
          _this.$nextTick(() => {
            _this.scroll = new Bscroll(_this.$refs.wrapper, {click: true})
          })
        }
      })
    }
  }
}
</script>
<style lang='sass'>
@import '~@/common/sass/course/courseList.sass'
</style>
