<template>
<transition name="slide">
  <div class="class-wrap" ref="wrapper">
    <div>
    <div class="class-head">
      <div class="back" @click="back">
        <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
      </div>
      <div class="title">班级列表</div>
    </div>
    <div class="class-content">
      <ul class="list-title">
        <li class="slide" :class="{current: all === true}" @click="toggleChange('all')">
          <a href="#">全部</a>
        </li>
        <li class="slide" :class="{current: first === true}" v-if="sevent" @click="toggleChange('sevent')">
          <a href="#">初一</a>
        </li>
        <li class="slide" :class="{current: second === true}" v-if="eight" @click="toggleChange('eight')">
          <a href="#">初二</a>
        </li>
        <li class="slide" :class="{current: three === true}" v-if="nine" @click="toggleChange('nine')">
          <a href="#">初三</a>
        </li>
      </ul>
      <div class="list-content">
        <div class="list">
          <ul class="itemclass" v-if="all">
            <div class="wt"  v-for="(item, index) in allList" :key="index">
              <li @click="goPath(item.class_id, item.cm_type, item.class_name)">
                <div class="txt">{{item.class_name}}</div>
                <div class="count"></div>
              </li>
            </div>
          </ul>
          <ul class="itemclass" v-if="first">
            <div class="wt"  v-for="(item, index) in firstList" :key="index">
              <li @click="goPath(item.class_id, item.cm_type, item.class_name)">
                <div class="txt">{{item.class_name}}</div>
                <div class="count"></div>
              </li>
            </div>
          </ul>
          <ul class="itemclass" v-if="second">
            <div class="wt"  v-for="(item, index) in secondList" :key="index">
              <li @click="goPath(item.class_id, item.cm_type, item.class_name)">
                <div class="txt">{{item.class_name}}</div>
                <div class="count"></div>
              </li>
            </div>
          </ul>
          <ul class="itemclass" v-if="three">
            <div class="wt"  v-for="(item, index) in threeList" :key="index">
              <li @click="goPath(item.class_id, item.cm_type, item.class_name)">
                <div class="txt">{{item.class_name}}</div>
                <div class="count"></div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
    </div>
    <div class="loading-container" v-show="!allList.length">
      <loading></loading>
    </div>
  </div>
  </transition>
</template>

<script>
import {requestPost} from '@/common/js/request'
import loading from '@/components/Loading/loading'
import {mapGetters} from 'vuex'
import Bscroll from 'better-scroll'
export default {
  data () {
    return {
      allList: [],
      firstList: [],
      secondList: [],
      threeList: [],
      sevent: false,
      eight: false,
      nine: false,
      first: false,
      second: false,
      three: false,
      all: true
    }
  },
  components: {
    loading
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
    let token = this.userInfo.token
    if (!this.$route.meta.isUseCache) {
      this.allList = []
      this.firstList = []
      this.secondList = []
      this.threeList = []
      this.getClassList(token)
    }
    this.$route.meta.isUseCache = false
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'CourseList') {
      from.meta.isUseCache = true
    }
    next()
  },
  methods: {
    back () {
      this.$router.push('index')
    },
    getClassList (token) {
      let _this = this
      requestPost('api/teacher/classlist', {'token': token}).then(function (data) {
        if (data.success === true) {
          let response = data.data
          for (let key in response) {
            if (key === '7') {
              _this.firstList = response[key]
              _this.sevent = true
            } else if (key === '8') {
              _this.secondList = response[key]
              _this.eight = true
            } else if (key === '9') {
              _this.threeList = response[key]
              _this.nine = true
            }
          }
          for (let i = 0; i < _this.firstList.length; i++) {
            _this.allList.push(_this.firstList[i])
          }
          for (let i = 0; i < _this.secondList.length; i++) {
            _this.allList.push(_this.secondList[i])
          }
          for (let i = 0; i < _this.threeList.length; i++) {
            _this.allList.push(_this.threeList[i])
          }
        }
      })
    },
    toggleChange (type) {
      if (type === 'all') {
        this.all = true
        this.first = false
        this.second = false
        this.three = false
      } else if (type === 'sevent') {
        this.all = false
        this.first = true
        this.second = false
        this.three = false
      } else if (type === 'eight') {
        this.all = false
        this.first = false
        this.second = true
        this.three = false
      } else if (type === 'nine') {
        this.all = false
        this.first = false
        this.second = false
        this.three = true
      }
    },
    goPath (id, type, name) {
      this.$router.push({path: 'mycourse', query: {class_id: id, cm_type: type, name: name}})
    }
  }
}
</script>
<style lang='sass'>
@import '~@/common/sass/Class/classList.sass'

</style>
