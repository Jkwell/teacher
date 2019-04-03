<template>
<transition name="slide">

  <div class="study-wrap" ref="wrapper">

    <div>

    <div class="study-head">
      <div class="back" @click="back">
        <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
      </div>
    </div>
    <div class="study-title">{{ch_name}}</div>
    <div class="subTitle">
      <div class="text" v-show="dateShow">
        <span class="clock"></span>
        <span>{{course_duration}}分钟</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="title">
      <div class="className">{{class_name}}</div>
      <div class="sendFamily" @click="sendFamily">
        <span class="ling"></span>
        <span>通知家长</span>
      </div>
    </div>
    <div class="students" v-show="loaded && fg">
      <div class="student-title">
        未学习
        <span>({{doNum}})</span>
        <span @click="send" class="btn">一键发送</span>
      </div>
      <div class="student-list">
        <div class="admire" v-if="courselistDo.length === 0">
          <img src="../../common/image/course/admire.png" width="57" height="57">
          <div class="text">真棒,全部学习啦~</div>
        </div>
        <ul v-if="courselistDo.length !== 0">
          <li v-for="(item, index) in courselistDo" :key="index" @click="goPath(item.user_id, item.has_relooked)">
            <div class="student-avatar">
              <img src="../../common/image/course/student.png" alt="学生头像" @load="loadImg">
              <div class="score" v-show="scoreShow">{{item.class_rate}}%</div>
            </div>
            <div class="text">{{item.user_name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="students" v-show="loaded && fg">
      <div class="student-title">
        已学习
        <span>({{doneNum}})</span>
      </div>
      <div class="student-list">
        <div class="sad" v-if="courselistDone.length === 0">
          <img src="../../common/image/course/sad.png" width="57" height="57">
          <div class="text">还没人学习</div>
        </div>
        <ul v-if="courselistDone.length !== 0">
          <li v-for="(item, index) in courselistDone" :key="index" @click="goPath(item.user_id, item.has_relooked)">
            <div class="student-avatar">
              <img src="../../common/image/course/student.png" alt="学生头像" @load="loadImg">
              <div class="score" v-show="scoreShow">{{item.class_rate}}%</div>
            </div>
            <div class="text">{{item.user_name}}</div>

          </li>
        </ul>
      </div>
    </div>
    <div class="students" style="margin-top: 70px;" v-show="loaded && fg === false">
      <div class="student-avatar">
        <div class="sad" v-if="courselistDone.length === 0" style="text-align: center;">
          <img src="../../common/image/course/none@3x.png" width="57" height="57">
          <div class="text">该课程暂无学生购买</div>
        </div>
    </div>
    </div>
  </div>
  <div class="loading-container" v-show="!loaded">
      <loading></loading>
    </div>

<transition name="fade">
    <div>
      <div v-if="show">
      <div class="mask"></div>
      <div class="sendType">
        <img src="../../common/image/course/success.png" width="205" height="144">
      </div>
      </div>
      </div>
    </transition>
    </div>

    </transition>

</template>

<script>
import Bscroll from 'better-scroll'
import {requestPost} from '@/common/js/request'
import loading from '@/components/Loading/loading'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      courselistDone: [],
      courselistDo: [],
      doNum: 0,
      doneNum: 0,
      course_duration: 0,
      ch_name: '',
      class_name: '',
      show: false,
      dateShow: false,
      scoreShow: false,
      loaded: false,
      fg: false
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
    // let token = this.userInfo.token
    // let obj = {class_id: '67275', ch_id: '19285', cm_id: '70524', token: token}
    // this.getLive(obj)
  },
  activated () {
    let params = this.$route.query
    this.ch_name = params.name
    this.class_name = params.class_name
    this.scroll = null
    let token = this.userInfo.token
    let obj = {class_id: params.class_id, ch_id: params.ch_id, cm_id: params.cm_id, token: token}
    if (!this.$route.meta.isUseCache) {
      if (params.type === '2') {
        this.getDB(obj)
      } else if (params.type === '1') {
        this.getLive(obj)
      }
    }
    this.$route.meta.isUseCache = false
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'zbreport' || to.name === 'dbreport' || to.name === 'hkeport') {
      from.meta.isUseCache = true
    }
    next()
  },
  methods: {
    getDB (obj) {
      let _this = this
      _this.loaded = false
      _this.fg = false
      _this.courselistDo = []
      _this.courselistDone = []
      requestPost('api/teacher/coursehourlooked', obj).then(function (data) {
        if (data.success === true) {
          let lists = data.data.lists
          _this.loaded = true
          _this.fg = true
          _this.courselistDo = []
          _this.courselistDone = []
          if (data.data.ch_duration !== '') {
            _this.course_duration = data.data.ch_duration
            _this.dateShow = true
          }
          lists.forEach(function (item, index) {
            Object.assign(item, {type: 'circle'})
            if (item.class_rate !== '') {
              _this.scoreShow = true
            }
            if (item.has_look === 0) {
              _this.courselistDo.push(item)
              _this.doNum = _this.courselistDo.length
            } else if (item.has_look === 1) {
              _this.courselistDone.push(item)
              _this.doneNum = _this.courselistDone.length
            } else {
              return false
            }
          })
        }
      }).catch(function () {
        _this.loaded = true
      })
    },
    loadImg () {
      if (!this.checkLoad) {
        this.scroll.refresh()
        this.checkLoad = true
      }
    },
    getLive (obj) {
      let _this = this
      _this.fg = false
      _this.loaded = false
      _this.courselistDo = []
      _this.courselistDone = []
      requestPost('api/teacher/livecoursehourlooked', obj).then(function (data) {
        if (data.success === true) {
          let lists = data.data.lists
          _this.loaded = true
          _this.fg = true
          _this.scoreShow = false
          _this.courselistDo = []
          _this.courselistDone = []
          lists.forEach(function (item, index) {
            Object.assign(item, {type: 'circle'})
            if (item.score === 0 && item.has_relooked !== 1) {
              _this.courselistDo.push(item)
              _this.doNum = _this.courselistDo.length
            } else if (item.score > 0 || item.has_relooked === 1) {
              _this.courselistDone.push(item)
              _this.doneNum = _this.courselistDone.length
            } else {
              return false
            }
          })
        }
      }).catch(function () {
        _this.loaded = true
      })
    },
    sendFamily () {
      if (this.courselistDone.length === 0 && this.courselistDo.length === 0) {
        return false
      }
      let params = this.$route.query
      this.$router.push({path: 'sendmsg', query: {ch_name: this.ch_name, courselistDone: this.courselistDone, bg_type: params.type, ch_id: params.ch_id, courselistDo: this.courselistDo}})
    },
    goPath (id, type) {
      let params = this.$route.query
      let token = this.userInfo.token
      let obj = {user_id: id, ch_id: params.ch_id, token: token, ch_name: this.ch_name}
      // let obj = {user_id: id, ch_id: '19285', token: token, ch_name: this.ch_name}
      if (type === undefined) {
        this.$router.push({path: 'dbreport', query: obj})
      } else if (type === 1) {
        this.$router.push({path: 'hkreport', query: obj})
      } else if (type === 0) {
        this.$router.push({path: 'zbreport', query: obj})
      } else {
        return false
      }
    },
    send () {
      if (this.courselistDo.length === 0) {
        return false
      }
      let _this = this
      let flag = true
      let bgtype = this.$route.query.type
      console.log(bgtype)
      let chid = this.$route.query.ch_id
      let name = this.ch_name
      let token = this.userInfo.token
      let arr = [];
      _this.courselistDo.forEach(function (item, index) {
        arr.push(item.user_id)
      })
      let courselistDoJson = arr.join(',')
      this.senmsg = '已发送'
      if (flag) {
        if (this.courselistDo.length > 0) {
          let param = {bg_type: bgtype, ch_name: name, ch_id: chid, token: token, user_id: courselistDoJson}
          console.log(param)
          requestPost('api/teacher/sendMessage', param).then(function (data) {
            if (data.success === true) {
              flag = false
              _this.show = true
              setTimeout(() => {
                _this.show = false
                console.log(_this.$router)
                _this.senmsg = '发送'
              }, 2000)
            }
          })
        }
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='sass'>
@import '~@/common/sass/course/study.sass'
</style>
