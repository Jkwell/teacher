<template>
  <div>
    <div class="z_wrap" ref="wrapper" style="background: #1e67fd">
      <div>
    <div class="head">
      <div class="text">
        <img src="../../common/image/report/text@3x.png" width="114" height="25">
      </div>
      <div class="avatar">
        <img src="../../common/image/report/avatar@3x.png" width="189" height="122">
      </div>
    </div>
    <div class="d_content">
      <div class="inner-d_content">
        <div class="left">
          <img src="../../common/image/report/left@2x.png" width="43" height="522">
        </div>
        <div class="report-d_content">
          <div class="title">
            <div class="pic">
              <img src="../../common/image/report/circle@2x.png" width="143" height="30">
              <div class="text">{{name}}</div>
            </div>
          </div>
          <div class="course">
            <h2 class="course-title">课时：{{ch_name}}</h2>
            <div class="score">
              <div class="getScore">
                <span class="name">得分(分)</span>
                <span class="num" id="num">{{score}}</span>
              </div>
              <div class="judge">
                <span class="name">评价</span>
                <span class="num">{{evaluate}}</span>
              </div>
            </div>
            <ul class="list">
              <li class="item">
                <div class="text">无迟到</div>
                <div class="count"><span>+</span><span class="sz">{{late}}</span></div>
              </li>
              <li class="item">
                <div class="text">无早退</div>
                <div class="count"><span>+</span><span class="sz">{{leave}}</span></div>
              </li>
              <li class="item bt">
                <div class="text">签到</div>
                <div class="count red"><span>+</span><span class="sz">{{sign_score}}</span></div>
              </li>
              <div class="qd" v-if="sign_in">
                <span>{{sign_in}}</span>
              </div>
              <li class="item">
                <div class="text">观看课程</div>
                <div class="count"><span>+</span><span class="sz">{{look_score}}</span></div>
              </li>
            </ul>
            <div class="bottom">
              <div class="text first">观看情况:</div>
              <div class="text">{{info}}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <img src="../../common/image/report/right@2x.png" width="10" height="522">
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {requestPost} from '@/common/js/request'
export default {
  data () {
    return {
      name: '',
      dd_rate: 0,
      class_rate: 0,
      dateline: '',
      ch_name: '',
      score: 0,
      evaluate: '',
      leave: '',
      late: '',
      sign_score: '',
      look_score: 0,
      sign_in: '',
      info: ''
    }
  },
  mounted () {
    let param = this.$route.query
    this.ch_name = param.ch_name
    let obj = {user_id: param.user_id, ch_id: param.ch_id, token: param.token}
    let _this = this
    requestPost('api/teacher/zblookdetails', obj).then(function (data) {
      if (data.success === true) {
        _this.dateline = data.data.dateline
        _this.name = data.data.user_name
        _this.dd_rate = data.data.aa_rate
        _this.class_rate = data.data.class_rate
        _this.score = data.data.score
        _this.evaluate = data.data.evaluate
        if (data.data.re_leave === '') {
          data.data.re_leave = 0
        }
        _this.leave = data.data.re_leave
        if (data.data.re_late === '') {
          data.data.re_late = 0
        }
        _this.late = data.data.re_late
        if (data.data.sign_score === '') {
          data.data.sign_score = 0
        }
        _this.sign_score = data.data.sign_score
        _this.look_score = data.data.look_score
        _this.sign_in = data.data.sign_in
        if (data.data.other) {
          _this.info = data.data.other
        } else {
          _this.info = data.data.evaluate
        }
      }
    })
    _this.$nextTick(() => {
      _this.scroll = new Bscroll(_this.$refs.wrapper, {click: true})
    })
  }
}

</script>
<style>
.z_wrap{width:100%;height:100%;position:fixed}.z_wrap .head{width:100%;height:122px;display:-webkit-box;display:-webkit-flex;display:box;display:flex;align-items:center;position:relative}@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){.z_wrap .head{background-repeat:no-repeat;background-size:100% 122px;background-image:url("../../common/image/report/bg@2x.png")}}@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3){.z_wrap .head{background-repeat:no-repeat;background-size:100% 122px;background-image:url("../../common/image/report/bg@3x.png")}}.z_wrap .head .text{position:absolute;left:20px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%)}.z_wrap .head .avatar{position:absolute;right:0;top:0}.z_wrap .d_content .inner-d_content{width:100%;height:522px;padding-bottom:20px;display:flex}.z_wrap .d_content .inner-d_content .left{width:43px}.z_wrap .d_content .inner-d_content .right{width:10px}.z_wrap .d_content .inner-d_content .report-d_content{flex:1;background:#fff;position:relative}.z_wrap .d_content .inner-d_content .report-d_content .title{width:100%;text-align:center;position:absolute;left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%)}.z_wrap .d_content .inner-d_content .report-d_content .title .pic{border-bottom:1px dashed #dfdfdf;right:12px;padding:18px 0;position:relative}.z_wrap .d_content .inner-d_content .report-d_content .title .pic .text{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);font-family:"FZZCHJW--GB1-0";font-size:18px;font-weight:600;line-height:30px;letter-spacing:0.7px;color:#1c38dc}.z_wrap .d_content .inner-d_content .course{position:absolute;top:70px;padding-top:10px;width:100%;right:12px}.z_wrap .d_content .inner-d_content .course .course-title{font-family:"PingFang-SC-Medium";font-size:17px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:0.7px;color:#333333}.z_wrap .d_content .inner-d_content .course .score{display:flex;margin-top:15px;align-items:center;padding-bottom:15px;border-bottom:1px dashed #dfdfdf}.z_wrap .d_content .inner-d_content .course .score .getScore,.z_wrap .d_content .inner-d_content .course .score .judge{flex:1;padding:15px 0;text-align:center}.z_wrap .d_content .inner-d_content .course .score .getScore .name,.z_wrap .d_content .inner-d_content .course .score .judge .name{font-family:"PingFang-SC-Medium";font-size:15px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:0.6px;color:#333333}.z_wrap .d_content .inner-d_content .course .score .getScore .num,.z_wrap .d_content .inner-d_content .course .score .judge .num{font-family:"ArialMT";font-size:30px;margin-left:15px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:1.2px;color:#00b562}.z_wrap .d_content .inner-d_content .course .score .getScore{border-right:1px dashed #dfdfdf}@media screen and (max-width: 350px){.z_wrap .d_content .inner-d_content .course .score .getScore .num{font-size:26px;margin-right:5px}.z_wrap .d_content .inner-d_content .course .score .judge .num{font-size:26px;margin-left:5px}}.z_wrap .d_content .inner-d_content .course .list{margin-top:20px;padding-bottom:0;border-bottom:1px dashed #dfdfdf}.z_wrap .d_content .inner-d_content .course .list .item{display:flex;align-content:center;justify-content:space-between;margin-bottom:15px}.z_wrap .d_content .inner-d_content .course .list .item .text{font-family:"PingFang-SC-Medium";font-size:17px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:0.7px;color:#333333}.z_wrap .d_content .inner-d_content .course .list .item .count{font-family:"PingFang-SC-Bold";font-size:17px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:0.7px;color:#00b562}.z_wrap .d_content .inner-d_content .course .list .item .count.red{color:#f95353}.z_wrap .d_content .inner-d_content .course .list .qd{margin-top:-12px;margin-bottom:15px}.z_wrap .d_content .inner-d_content .course .list .qd span{margin-right:7px;font-family:"PingFang-SC-Medium";font-size:15px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:0.6px;color:#777777}.z_wrap .d_content .inner-d_content .bottom{display:flex;align-items:center;margin-top:10px;font-family:"PingFang-SC-Bold";font-size:16px;font-weight:600;font-stretch:normal;line-height:30px;letter-spacing:0.6px;color:#333333}.z_wrap .d_content .inner-d_content .bottom .text.first{margin-right:8px}
.z_wrap .d_content{padding: 0 20px 0 12px;}
</style>
