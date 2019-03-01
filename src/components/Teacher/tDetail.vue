<template>
<transition name="slide">
  <div class="teacherwrap" ref="wrapper">
    <div>
    <div class="heads">
      <div class="icon left" @click="back">
        <img src="../../common/image/teacher/back@2x.png" width="11" height="18">
      </div>
    </div>
    <div class="contents" v-if="userInfos.length">
      <div class="wraps">
        <div class="pic">
            <div class="avatar">
              <img :src="avatars" width="89" height="89">
            </div>
            <div class="name">
              <div class="text">
                <span>{{username}}</span><span class="icon" :style="icon"></span>
              </div>
            </div>
          </div>
          <div class="list-scroll">
            <div class="list-title">教师信息</div>
            <ul class="list">
              <a href="#" class="href" v-for="(item, index) in teacherInfos" :key="index">
                <li class="list-item" @click="goChange(item.info, item.title)">
                  <div class="icon">
                    <img :src="item.img" class="picImg" width="18" height="18">
                    <span class="title">{{item.title}}</span>
                  </div>
                  <div class="tag">
                    <div class="upload" v-if="item.title === '头像'"><img :src="avatars" width="35" height="35" @click="uploadHeadImg" style="margin-right:15px">
                    <input type="file" accept="image/png,image/jpg,image/jpeg" name="file_data" @change="handleFile" style="display:none" class="hiddenInput"></div>
                    <span class="num" v-if="item.title !== '头像'">{{item.info}}</span>
                    <span class="arrow"></span>
                  </div>
                </li>
              </a>
          </ul>
        </div>
      </div>
    </div>
    </div>
    <div class="loading-container" v-show="!userInfos.length">
      <loading></loading>
    </div>
    <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>
  </div>
  </transition>
</template>

<script>
import {requestPost} from '@/common/js/request'
import Bscroll from 'better-scroll'
import {mapGetters, mapMutations} from 'vuex'
import loading from '@/components/Loading/loading'
import { Actionsheet } from 'vux'
import lrz from 'lrz'
let Base64 = require('js-base64').Base64
export default {
  data () {
    return {
      username: '',
      show2: false,
      userInfos: [],
      menus2: {
        menu1: '男',
        menu2: '女'
      },
      avatars: require('../../common/image/index/stuAvatar.png'),
      icon: {
        'background-image': ''
      },
      teacherInfos: [
        {'title': '头像', 'img': require('../../common/image/teacher/savatar@3x.png'), 'info': ''},
        {'title': '姓名', 'img': require('../../common/image/teacher/name@3x.png'), 'info': ''},
        {'title': '性别', 'img': require('../../common/image/teacher/sex@3x.png'), 'info': ''},
        {'title': '手机', 'img': require('../../common/image/teacher/phone@3x.png'), 'info': ''},
        {'title': '邮箱', 'img': require('../../common/image/teacher/email@3x.png'), 'info': ''},
        {'title': '修改密码', 'img': require('../../common/image/teacher/pwd@3x.png'), 'info': ''}
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'phone'])
  },
  mounted () {
    this.getTeacherInfo()
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {click: true})
    })
  },
  components: {
    Actionsheet,
    loading
  },
  watch: {
    'userInfos': {
      handler (newValue, oldValue) {
        let _this = this
        this.userInfos.forEach(function (item, index) {
          _this.teacherInfos[index].info = item
        })
        this.delwith(this.teacherInfos)
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      'add_avatar': 'ADD_AVATAR'
    }),
    getTeacherInfo () {
      let _this = this
      let token = this.userInfo.token
      requestPost('api/teacher/teacherinfo', {'token': token}).then(function (data) {
        if (data.success === true) {
          _this.username = data.data.name
          if (data.data.sex === '2') {
            _this.icon = {'background-image': 'url(' + require('../../common/image/teacher/nvv@3x.png') + ')'}
          } else if (data.data.sex === '1') {
            _this.icon = {'background-image': 'url(' + require('../../common/image/teacher/nan@3x.png') + ')'}
          }
          _this.avatars = data.data.avatar
          _this.userInfos = [data.data.avatar, data.data.name, data.data.sex, data.data.phone, data.data.email]
          _this.userInfos.forEach(function (item, index) {
            _this.teacherInfos[index].info = item
          })
          _this.delwith(_this.teacherInfos)
        }
      })
    },
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    handleFile (e) {
      let _this = this
      let token = this.userInfo.token
      let file = e.target.files[0]
      if (!(/image\/\w+/).test(file.type)) {
        _this.$vux.alert.show({
          title: '提示',
          content: '请选择图片'
        })
        return false
      }
      let formData = new FormData()
      formData.append('file_data', file)
      if (file.size > 1024 * 200) {
        lrz(file, {fieldName: 'file_data'}).then(function (rst) {
          _this.$vux.loading.show({'text': '上传中...'})
          requestPost('/up.php', rst.formData).then(function (data) {
            if (data.success === true) {
              let src = data.url
              let baseSrc = Base64.encode(src)
              _this.$vux.loading.hide()
              _this.$vux.alert.show({
                title: '提示',
                content: '上传成功',
                // 数组监听
                onHide () {
                  requestPost('api/teacher/editavatar', {user_avatar: baseSrc, token: token}).then(function (data) {
                    console.log(data)
                    // _this.add_avatar(src)
                  })
                  _this.avatars = src
                }
              })
            }
          })
        })
      } else {
        formData.append('file_data', file)
        _this.$vux.loading.show({'text': '上传中...'})
        requestPost('/up.php', formData).then(function (data) {
          if (data.success === true) {
            let src = data.url
            let baseSrc = Base64.encode(src)
            _this.$vux.loading.hide()
            _this.$vux.alert.show({
              title: '提示',
              content: '上传成功',
              // 数组监听
              onHide () {
                requestPost('api/teacher/editavatar', {user_avatar: baseSrc, token: token}).then(function (data) {
                  console.log(data)
                  // _this.add_avatar(src)
                })
                _this.avatars = src
              }
            })
          }
        })
      }
      console.log(formData.get('file_data'))
    },
    delwith (teacherInfos) {
      for (let i = 0; i < teacherInfos.length; i++) {
        let item = teacherInfos[i]
        if (item.info === '0') {
          item.info = '未知'
        } else if (item.info === '1') {
          item.info = '男'
        } else if (item.info === '2') {
          item.info = '女'
        } else if (item.title === '手机' && item.info === '') {
          item.info = '去绑定'
        } else if (item.title === '邮箱' && item.info === '') {
          item.info = '去绑定'
        }
      }
    },
    click (key) {
      let gender = 0
      if (this.menus2[key] === '男') {
        gender = 1
        this.icon = {'background-image': 'url(' + require('../../common/image/teacher/nan@3x.png') + ')'}
      } else if (this.menus2[key] === '女') {
        gender = 2
        this.icon = {'background-image': 'url(' + require('../../common/image/teacher/nvv@3x.png') + ')'}
      } else {
        gender = 0
        return
      }
      let _this = this
      let param = {
        'token': this.userInfo.token,
        'gender': gender
      }
      requestPost('api/teacher/sexchange', param).then(function (data) {
        if (data.success === true) {
          _this.$vux.alert.show({
            title: '提示',
            content: '修改成功',
            // 数组监听
            onHide () {
              _this.$set(_this.userInfos, 2, _this.menus2[key])
            }
          })
        }
      })
    },
    back () {
      this.$router.push('index')
    },
    goChange (name, type) {
      if (type === '姓名') {
        this.$router.push('changeuser')
      } else if (type === '性别') {
        this.show2 = true
      } else if (type === '手机') {
        this.$router.push({path: '/phone', query: {phone: name}})
      } else if (type === '邮箱') {
        this.$router.push({path: '/email', query: {email: name}})
      } else if (type === '修改密码') {
        this.$router.push('changepwd')
      }
    }
  }
}
</script>
<style lang='sass'>
@import '~@/common/sass/teacher/detail.sass'
</style>
