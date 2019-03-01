<template>
<transition name="slide">
  <div class="msg-wrap" ref="wrapper">
    <div>
    <div class="msg-head">
      <div class="back" @click="back">
        <img src="../../common/image/user/left-arrow1.png" width="11" height="18">
      </div>
      <div class="btn" :class="{blue: all_checkedlist.length !== 0 || first_checklist.length !== 0 || second_checklist.length !== 0, dis: senmsg === '已发送'}" @click="send">{{senmsg}}</div>
    </div>
    <div class="msg-title">推送学习报告</div>
    <div class="msg-content">
      <ul class="list-title">
        <li class="slide" :class="{current: all=== true}" @click="change('all')">
          <span>全部</span>
        </li>
        <li class="slide" :class="{current: first=== true}" @click="change('first')">
          <span>未学习</span>
        </li>
        <li class="slide" :class="{current: second=== true}" @click="change('second')">
          <span>已学习</span>
        </li>
      </ul>
      <div class="list-content">
        <div class="list">
          <ul class="all itemclass" v-if="all">
            <div class="item-title" @click="checkALL(c_type)">
              <label for="all">
              <icon :type="type"></icon>
              全选</label>
            </div>
            <li class="item-content" v-for="(item, index) in alllist" :key="index" @click="itemChange(item.user_id)">
              <div class="bt">
              <div class="icon"><icon :type="item.type"></icon></div>
              <div class="avatar"><img src="../../common/image/course/student.png"  width="55" height="55"></div>
              <div class="name">{{item.user_name}}</div>
              <div class="sex">
                <img src="../../common/image/course/men@3x.png" v-if="item.gender === 1" width="15" height="15">
                <img src="../../common/image/course/nv@3x.png" v-if="item.gender === 2" width="15" height="15">
              </div>
              <div class="study" v-if="item.has_look === 0">未学习</div>
              <div class="study" v-if="item.score === 0 && item.has_relooked !== 1">未学习</div>
              <div class="study" :class="{sblue: item.has_look === 1}" v-if="item.has_look === 1">已学习</div>
              <div class="study" :class="{sblue: item.score > 0 || item.has_relooked === 1}" v-if="item.score > 0 || item.has_relooked === 1">已学习</div>
              <div class="score" v-show="item.class_rate !== undefined">{{item.class_rate}}%</div>
              </div>
            </li>
          </ul>
          <ul class="first itemclass" v-if="first">
            <div class="item-title">
              <label for="all" @click="checkFirstAll(f_type)">
              <icon :type="firstType"></icon>
              全选</label>
            </div>
            <li class="item-content" v-for="(item, index) in courselistDo" :key="index" @click="firstChange(item.user_id)">
              <div class="bt">
              <div class="icon"><icon :type="item.type"></icon></div>
              <div class="avatar"><img src="../../common/image/course/student.png"  width="55" height="55"></div>
              <div class="name">{{item.user_name}}</div>
              <div class="sex">
                <img src="../../common/image/course/men@3x.png" v-if="item.gender === 1" width="15" height="15">
                <img src="../../common/image/course/nv@3x.png" v-if="item.gender === 2" width="15" height="15">
              </div>
              <div class="study" v-if="item.has_look === 0">未学习</div>
              <div class="study" v-if="item.score === 0 && item.has_relooked !== 1">未学习</div>
              <div class="study" :class="{sblue: item.has_look === 1}" v-if="item.has_look === 1">已学习</div>
              <div class="study" :class="{sblue: item.score > 0 || item.has_relooked === 1}" v-if="item.score > 0 || item.has_relooked === 1">已学习</div>
              <div class="score" v-show="item.class_rate !== undefined">{{item.class_rate}}%</div>
              </div>
            </li>
          </ul>
          <ul class="second itemclass" v-if='second'>
            <div class="item-title">
              <label for="all" @click="checkSecondAll(s_type)">
              <icon :type="secondType"></icon>
              全选</label>
            </div>
            <li class="item-content" v-for="(item, index) in courselistDone" :key="index" @click="secondChange(item.user_id)">
              <div class="bt">
              <div class="icon"><icon :type="item.type"></icon></div>
              <div class="avatar"><img src="../../common/image/course/student.png"  width="55" height="55"></div>
              <div class="name">{{item.user_name}}</div>
              <div class="sex">
                <img src="../../common/image/course/men@3x.png" v-if="item.gender === 1" width="15" height="15">
                <img src="../../common/image/course/nv@3x.png" v-if="item.gender === 2" width="15" height="15">
              </div>
              <div class="study" v-if="item.has_look === 0">未学习</div>
              <div class="study" v-if="item.score === 0 && item.has_relooked !== 1">未学习</div>
              <div class="study" :class="{sblue: item.has_look === 1}" v-if="item.has_look === 1">已学习</div>
              <div class="study" :class="{sblue: item.score > 0 || item.has_relooked === 1}" v-if="item.score > 0 || item.has_relooked === 1">已学习</div>
              <div class="score" v-show="item.class_rate !== undefined">{{item.class_rate}}%</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-container" v-show="!alllist.length">
      <loading></loading>
    </div>
  <transition name="fade">
      <div v-if="show">
      <div class="mask"></div>
      <div class="sendType">
        <img src="../../common/image/course/success.png" width="205" height="144">
      </div>
      </div>
    </transition>
  </div>
      </transition>
</template>

<script>
import Bscroll from 'better-scroll'
import {mapGetters} from 'vuex'
import loading from '@/components/Loading/loading'
import {requestPost} from '@/common/js/request'
import {Icon} from 'vux'
export default {
  data () {
    return {
      alllist: [],
      courselistDone: [],
      courselistDo: [],
      all_checkedlist: [],
      first_checklist: [],
      second_checklist: [],
      all: true,
      first: false,
      second: false,
      c_type: 'circle',
      f_type: 'circle',
      s_type: 'circle',
      show: false,
      senmsg: '发送'
    }
  },
  computed: {
    type: {
      get () {
        let tp = this.c_type
        if (this.all_checkedlist.length > 0 && this.all_checkedlist.length === this.alllist.length) {
          tp = 'success'
        } else {
          tp = 'circle'
        }
        return tp
      }
    },
    firstType: {
      get () {
        let tp = this.f_type
        if (this.first_checklist.length > 0 && this.first_checklist.length === this.courselistDo.length) {
          tp = 'success'
        } else {
          tp = 'circle'
        }
        return tp
      }
    },
    secondType: {
      get () {
        let tp = this.s_type
        if (this.second_checklist.length > 0 && this.second_checklist.length === this.courselistDone.length) {
          tp = 'success'
        } else {
          tp = 'circle'
        }
        return tp
      }
    },
    // secondType () {
    //   let type = this.second_checklist.length > 0 && this.second_checklist.length === this.courselistDone.length ? this.s_type = 'success' : this.s_type = 'circle'
    //   return type
    // },
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.courselistDone = this.$route.query.courselistDone
    this.courselistDo = this.$route.query.courselistDo
    this.alllist = this.courselistDone.concat(this.courselistDo)
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {click: true})
    })
  },
  methods: {
    back () {
      this.$router.go(-2)
    },
    itemChange (id) {
      let aIndex = this.find(this.alllist, id)
      if (this.all_checkedlist.indexOf(id) > -1) {
        let index = this.all_checkedlist.indexOf(id)
        this.all_checkedlist.splice(index, 1)
        this.alllist[aIndex].type = 'circle'
      } else if (this.all_checkedlist.indexOf(id) === -1) {
        this.all_checkedlist.push(id)
        this.alllist[aIndex].type = 'success'
      }
    },
    firstChange (id) {
      let aIndex = this.find(this.courselistDo, id)
      if (this.first_checklist.indexOf(id) > -1) {
        let index = this.first_checklist.indexOf(id)
        this.first_checklist.splice(index, 1)
        this.courselistDo[aIndex].type = 'circle'
      } else if (this.first_checklist.indexOf(id) === -1) {
        this.first_checklist.push(id)
        this.courselistDo[aIndex].type = 'success'
      }
    },
    secondChange (id) {
      let aIndex = this.find(this.courselistDone, id)
      if (this.second_checklist.indexOf(id) > -1) {
        let index = this.second_checklist.indexOf(id)
        this.second_checklist.splice(index, 1)
        this.courselistDone[aIndex].type = 'circle'
      } else if (this.second_checklist.indexOf(id) === -1) {
        this.second_checklist.push(id)
        this.courselistDone[aIndex].type = 'success'
      }
    },
    change (type) {
      if (type === 'all') {
        this.all = true
        this.all_checkedlist = []
        this.first_checklist = []
        this.second_checklist = []
        this.alllist.forEach(function (item, index) {
          item.type = 'circle'
        })
        this.first = false
        this.second = false
      } else if (type === 'first') {
        this.all = false
        this.first = true
        this.all_checkedlist = []
        this.first_checklist = []
        this.second_checklist = []
        this.courselistDo.forEach(function (item, index) {
          item.type = 'circle'
        })
        this.second = false
      } else if (type === 'second') {
        this.all = false
        this.first = false
        this.second = true
        this.all_checkedlist = []
        this.first_checklist = []
        this.second_checklist = []
        this.courselistDone.forEach(function (item, index) {
          item.type = 'circle'
        })
      }
    },
    find (array, id) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].user_id === id) {
          return i
        }
      }
    },
    checkALL (type) {
      let _this = this
      if (type === 'success') {
        this.c_type = 'circle'
        this.all_checkedlist = []
        this.alllist.forEach(function (item, index) {
          item.type = 'circle'
        })
      } else {
        this.c_type = 'success'
        this.alllist.forEach(function (item, index) {
          if (_this.all_checkedlist.indexOf(item.user_id) === -1) {
            _this.all_checkedlist.push(item.user_id)
            item.type = 'success'
          }
        })
      }
    },
    send () {
      if (this.all_checkedlist.length === 0 && this.first_checklist.length === 0 && this.second_checklist.length === 0) {
        return false
      }
      let _this = this
      let flag = true

      let bgtype = this.$route.query.bg_type
      console.log(bgtype)
      let chid = this.$route.query.ch_id
      let name = this.$route.query.ch_name
      let token = this.userInfo.token
      let json = this.all_checkedlist.slice(0)
      let fjson = this.first_checklist.slice(0)
      let sjson = this.second_checklist.slice(0)
      let strJson = json.join(',')
      let fstrJson = fjson.join(',')
      let sstrJson = sjson.join(',')
      this.senmsg = '已发送'
      if (flag) {
        if (this.all_checkedlist.length > 0) {
          let param = {bg_type: bgtype, ch_name: name, ch_id: chid, token: token, user_id: strJson}
          requestPost('api/teacher/sendMessage', param).then(function (data) {
            if (data.success === true) {
              flag = false
              _this.show = true
              setTimeout(() => {
                _this.show = false
                console.log(_this.$router)
                _this.senmsg = '发送'
                _this.$router.go(-2)
              }, 2000)
            }
          })
        } else if (this.first_checklist.length > 0) {
          let param = {bg_type: bgtype, ch_name: name, ch_id: chid, token: token, user_id: fstrJson}
          requestPost('api/teacher/sendMessage', param).then(function (data) {
            if (data.success === true) {
              flag = false
              _this.show = true
              setTimeout(() => {
                _this.show = false
                _this.senmsg = '发送'
                _this.$router.go(-2)
              }, 2000)
            }
          })
        } else if (this.second_checklist.length > 0) {
          let param = {bg_type: bgtype, ch_name: name, ch_id: chid, token: token, user_id: sstrJson}
          requestPost('api/teacher/sendMessage', param).then(function (data) {
            if (data.success === true) {
              flag = false
              _this.show = true
              setTimeout(() => {
                _this.show = false
                _this.senmsg = '发送'
                _this.$router.go(-2)
              }, 2000)
            }
          })
        }
      }
    },
    checkFirstAll (type) {
      let _this = this
      if (type === 'success') {
        this.f_type = 'circle'
        this.first_checklist = []
        this.courselistDo.forEach(function (item, index) {
          item.type = 'circle'
        })
      } else {
        this.f_type = 'success'
        this.courselistDo.forEach(function (item, index) {
          if (_this.first_checklist.indexOf(item.user_id) === -1) {
            _this.first_checklist.push(item.user_id)
            item.type = 'success'
          }
        })
      }
    },
    checkSecondAll (type) {
      let _this = this
      if (type === 'success') {
        this.s_type = 'circle'
        this.second_checklist = []
        this.courselistDone.forEach(function (item, index) {
          item.type = 'circle'
        })
      } else {
        this.s_type = 'success'
        this.courselistDone.forEach(function (item, index) {
          if (_this.second_checklist.indexOf(item.user_id) === -1) {
            _this.second_checklist.push(item.user_id)
            item.type = 'success'
          }
        })
      }
    }
  },
  components: {
    Icon,
    loading
  }
}
</script>
<style lang='sass'>
@import '~@/common/sass/send/send.sass'
</style>
