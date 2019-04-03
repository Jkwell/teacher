<template>
  <transition name="slide" mode="out-in">
    <div style="position: fixed; top:0;bottom:0;left:0;right:0;overflow:hidden;">
      <div class="class-head">
        <div class="title">班级列表</div>
      </div>
      <div class="class-content">
        <ul class="list-title">
          <li class="slide" :class="{current: all === true}" @click="toggleChange('all')">
            <a href="#">全部</a>
          </li>
          <li
            class="slide"
            :class="{current: first === true}"
            v-if="sevent"
            @click="toggleChange('sevent')"
          >
            <a href="#">初一</a>
          </li>
          <li
            class="slide"
            :class="{current: second === true}"
            v-if="eight"
            @click="toggleChange('eight')"
          >
            <a href="#">初二</a>
          </li>
          <li
            class="slide"
            :class="{current: three === true}"
            v-if="nine"
            @click="toggleChange('nine')"
          >
            <a href="#">初三</a>
          </li>
        </ul>
        <div class="list-content">
          <div class="list">
            <ul class="itemclass" v-show="all">
              <div class="all-wrap">
                <div class="ft wt10" style="height:100%; overflow:hidden" ref="wrappers">
                  <div>
                  <div class="wt" v-for="(item, index) in allList" :key="index">
                    <li :class="[num==index ? 'current' : '']" @click="getCourseList(index, item.class_id, item.cm_type, item.class_name, 'all')">
                      <div class="txt">{{item.class_name}}</div>
                    </li>
                  </div>
                  </div>
                </div>
              </div>
              <div class="fr" style="float:left;width: 65%">
                <div class="wt-content" ref="wrapper">
                  <div>
                    <div class="course-title">
                      <div class="pic">
                        <img width="15" height="15" src="../../common/image/course/course.png" alt>
                      </div>
                      <div class="text">课程</div>
                    </div>
                    <ul>
                      <li class="course-item" @click="goPath(item.cm_id)" v-for="(item, index) in coursealllist" :key="index">
                        <div class="txt">{{item.cm_name}}</div>
                        <div class="time">课时：{{item.cm_hour_num}}</div>
                        <div class="count"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ul>
            <ul class="itemclass" v-show="first">
              <div class="first-wrap">
                <div class="ft wt10" style="height:100%; overflow:hidden" ref="wrapperseven">
                  <div>
                  <div class="wt" v-for="(item, index) in firstList" :key="index">
                    <li :class="[num==index ? 'current' : '']" @click="getCourseList(index, item.class_id, item.cm_type, item.class_name, 'fir')">
                      <div class="txt">{{item.class_name}}</div>
                      <div class="count"></div>
                    </li>
                  </div>
                  </div>
                </div>
              </div>
              <div class="fr" style="float:left;width: 65%">
                <div class="wt-content" ref="wrapperfir">
                  <div>
                    <div class="course-title">
                      <div class="pic">
                        <img width="15" height="15" src="../../common/image/course/course.png" alt>
                      </div>
                      <div class="text">课程</div>
                    </div>
                    <ul>
                      <li class="course-item" @click="goPath(item.cm_id)" v-for="(item, index) in coursefirlist" :key="index">
                        <div class="txt">{{item.cm_name}}</div>
                        <div class="time">课时：{{item.cm_hour_num}}</div>
                        <div class="count"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ul>
            <ul class="itemclass" v-show="second">
              <div class="second-wrap">
                <div class="ft wt10" style="height:100%; overflow:hidden" ref="wrappereight">
                  <div>
                  <div class="wt" v-for="(item, index) in secondList" :key="index">
                    <li :class="[num==index ? 'current' : '']" @click="getCourseList(index, item.class_id, item.cm_type, item.class_name, 'sec')">
                      <div class="txt">{{item.class_name}}</div>
                      <div class="count"></div>
                    </li>
                  </div>
                  </div>
                </div>
              </div>
              <div class="fr" style="float:left;width: 65%">
                <div class="wt-content" ref="wrappersec">
                  <div>
                    <div class="course-title">
                      <div class="pic">
                        <img width="15" height="15" src="../../common/image/course/course.png" alt>
                      </div>
                      <div class="text">课程</div>
                    </div>
                    <ul>
                      <li class="course-item" @click="goPath(item.cm_id)"  v-for="(item, index) in courseseclist" :key="index">
                        <div class="txt">{{item.cm_name}}</div>
                        <div class="time">课时：{{item.cm_hour_num}}</div>
                        <div class="count"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ul>
            <ul class="itemclass" v-show="three">
              <div class="three-wrap">
                <div class="ft wt10" style="height:100%; overflow:hidden" ref="wrappernine">
                  <div>
                  <div class="wt" v-for="(item, index) in threeList" :key="index">
                    <li :class="[num==index ? 'current' : '']" @click="getCourseList(index, item.class_id, item.cm_type, item.class_name, 'thr')">
                      <div class="txt">{{item.class_name}}</div>
                      <div class="count"></div>
                    </li>
                  </div>
                  </div>
                </div>
              </div>
              <div class="fr" style="float:left;width: 65%">
                <div class="wt-content" ref="wrapperthr">
                  <div>
                    <div class="course-title">
                      <div class="pic">
                        <img width="15" height="15" src="../../common/image/course/course.png" alt>
                      </div>
                      <div class="text">课程</div>
                    </div>
                    <ul>
                      <li class="course-item" @click="goPath(item.cm_id)" v-for="(item, index) in coursethrlist" :key="index">
                        <div class="txt">{{item.cm_name}}</div>
                        <div class="time">课时：{{item.cm_hour_num}}</div>
                        <div class="count"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
      <div class="loading-container" v-show="show">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
import { requestPost } from '@/common/js/request'
import loading from '@/components/Loading/loading'
import { mapGetters } from 'vuex'
import Footer from '@/components/Footer/footer'
import Bscroll from 'better-scroll'
export default {
  data () {
    return {
      allList: [],
      firstList: [],
      secondList: [],
      threeList: [],
      coursealllist: [],
      coursefirlist: [],
      courseseclist: [],
      coursethrlist: [],
      sevent: false,
      eight: false,
      nine: false,
      first: false,
      second: false,
      three: false,
      all: true,
      num: 0,
      class_id: '',
      class_name: '',
      show: false
    }
  },
  components: {
    loading,
    Footer
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  activated () {
    let token = this.userInfo.token
    if (!this.$route.meta.isUseCache) {
      this.allList = []
      this.firstList = []
      this.secondList = []
      this.threeList = []
      this.getClassList(token)
      this.$nextTick(() => {
      if (!this.scrolls) {
        this.scrolls = new Bscroll(this.$refs.wrappers, {
          click: true
        });
      } else {
        this.scrolls.refresh();
      }
    });

    }
    this.$route.meta.isUseCache = false
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'coursedetail') {
      from.meta.isUseCache = true
    }
    next()
  },
  methods: {
    back () {
      this.$router.push('index')
    },
    goPath (id) {
      this.$router.push({path: 'coursedetail', query: {class_id: this.class_id, cm_id: id, class_name: this.class_name}})
    },
    getClassList (token) {
      let _this = this
      requestPost('api/teacher/classlist', { token: token }).then(function(data) {
        if (data.success === true) {
          let response = data.data;
          for (let key in response) {
            if (key === "7") {
              _this.firstList = response[key];
              _this.sevent = true;

            } else if (key === "8") {
              _this.secondList = response[key];
              _this.eight = true;

            } else if (key === "9") {
              _this.threeList = response[key];
              _this.nine = true;

            }
          }
          for (let i = 0; i < _this.firstList.length; i++) {
            _this.allList.push(_this.firstList[i]);
          }
          for (let i = 0; i < _this.secondList.length; i++) {
            _this.allList.push(_this.secondList[i]);
          }
          for (let i = 0; i < _this.threeList.length; i++) {
            _this.allList.push(_this.threeList[i]);
          }
          let id = _this.allList[0].class_id;
          let type = _this.allList[0].cm_type;
          let name = _this.allList[0].class_name;
          _this.class_name = name
          _this.class_id = id
          _this.getCourseList(0, id, type, name, 'all')
        }
      });
    },
    toggleChange(type) {
      if (type === "all") {
        this.all = true;
        this.first = false;
        this.second = false;
        this.three = false;
        this.num = 0
        this.$nextTick(() => {
          if (!this.scrolls) {
            this.scrolls = new Bscroll(this.$refs.wrappers, {
              click: true
            });
          } else {
            this.scrolls.refresh();
          }
        });
      } else if (type === "sevent") {
        let id = this.firstList[0].class_id;
        let type = this.firstList[0].cm_type;
        let name = this.firstList[0].class_name;
        this.class_name = name
        this.class_id = id
        this.getCourseList(0, id, type, name, 'fir')
        this.all = false;
        this.first = true;
        this.second = false;
        this.three = false;
        this.num = 0
        this.$nextTick(() => {
        if (!this.scrollseven) {
          this.scrollseven = new Bscroll(this.$refs.wrapperseven, {
            click: true
          });
        } else {
          this.scrollseven.refresh();
        }
      });
      } else if (type === "eight") {
        let id = this.secondList[0].class_id;
        let type = this.secondList[0].cm_type;
        let name = this.secondList[0].class_name;
        this.class_name = name
        this.class_id = id
        this.getCourseList(0, id, type, name, 'sec')
        this.all = false;
        this.first = false;
        this.second = true;
        this.three = false;
        this.num = 0
        this.$nextTick(() => {
          if (!this.scrolleight) {
            this.scrolleight = new Bscroll(this.$refs.wrappereight, {
              click: true
            });
          } else {
            this.scrolleight.refresh();
          }
        });
      } else if (type === "nine") {
        let id = this.threeList[0].class_id;
        let type = this.threeList[0].cm_type;
        let name = this.threeList[0].class_name;
        this.class_name = name
        this.class_id = id
        this.getCourseList(0, id, type, name, 'thr')
        this.all = false;
        this.first = false;
        this.second = false;
        this.three = true;
        this.num = 0
        this.$nextTick(() => {
        if (!this.wrappernine) {
          this.wrappernine = new Bscroll(this.$refs.wrappernine, {
            click: true
          });
        } else {
          this.wrappernine.refresh();
        }
      });
      }
    },
    getCourseList(index, id, type, name, flag) {
      this.class_name = name
      this.class_id = id
      this.num = index;
      this.show = true
      let _this = this;
      let token = this.userInfo.token;
      let param = { token: token, cm_type: type, class_id: id };
      requestPost("api/teacher/courselist", param).then(function(data) {
        if (data.success === true) {
          _this.show = false
          if (flag === "all") {
            _this.coursealllist = data.data.lists;
            _this.$nextTick(() => {
              if (!_this.scroll) {
                _this.scroll = new Bscroll(_this.$refs.wrapper, {
                  click: true
                });
              } else {
                _this.scroll.refresh();
              }
            });
          } else if (flag === "fir") {
            _this.coursefirlist = data.data.lists;
            _this.$nextTick(() => {
              if (!_this.scrollone) {
                _this.scrollone = new Bscroll(_this.$refs.wrapperfir, {
                  click: true
                });
              } else {
                _this.scrollone.refresh();
              }
            });
          } else if (flag === "sec") {
            _this.courseseclist = data.data.lists;
            _this.$nextTick(() => {
              if (!_this.scrolltwo) {
                _this.scrolltwo = new Bscroll(_this.$refs.wrappersec, {
                  click: true
                });
              } else {
                _this.scrolltwo.refresh();
              }
            });
          } else if (flag === "thr") {
          _this.coursethrlist = data.data.lists;
          _this.$nextTick(() => {
            if (!_this.scrollsan) {
              _this.scrollsan = new Bscroll(_this.$refs.wrapperthr, {
                click: true
              });
            } else {
              _this.scrollsan.refresh();
            }
          });
          }
        }
      });
    }
  }
};
</script>
<style lang='sass'>
@import '~@/common/sass/Class/classList.sass'
</style>
