<template>
  <div><div class="h_wrap" ref="wrapper" style="background: #1e67fd">
    <div>
    <div class="head">
      <div class="text">
        <img src="../../common/image/report/text@3x.png" width="114" height="25">
      </div>
      <div class="avatar">
        <img src="../../common/image/report/avatar@3x.png" width="189" height="122">
      </div>
      <div class="date">
        <span class="dataText">进入时间:</span>
        <span class="time">{{dateline}}</span>
      </div>
    </div>
    <div class="h_content">
      <div class="inner-h_content">
        <div class="left">
          <img src="../../common/image/report/hLeft.png" width="43" height="303">
        </div>
        <div class="report-h_content">
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
                <span class="name">是否看直播</span>
                <span class="num red">否</span>
              </div>
              <div class="judge">
                <span class="name">当前观看</span>
                <span class="num">点播</span>
              </div>
            </div>
          </div>
          <div class="info">
          <div class="rate">
            <div class="rate-text">学习状况</div>
            <div class="num">{{class_rate}}%</div>
          </div>
          <div class="rate">
            <div class="rate-text">点到率</div>
            <div class="num">{{dd_rate}}%</div>
          </div>
          </div>
        </div>
        <div class="right">
          <img src="../../common/image/report/hRight.png" width="28" height="303">
        </div>
      </div>
    </div>
    </div>
  </div></div>
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
      ch_name: ''
    }
  },
  mounted () {
    let param = this.$route.query
    this.ch_name = param.ch_name
    let obj = {user_id: param.user_id, ch_id: param.ch_id, token: param.token}
    let _this = this
    requestPost('api/teacher/dblookdetails', obj).then(function (data) {
      if (data.success === true) {
        _this.dateline = data.data.dateline
        _this.name = data.data.user_name
        _this.dd_rate = data.data.aa_rate
        _this.class_rate = data.data.class_rate
      }
    })
    _this.$nextTick(() => {
      _this.scroll = new Bscroll(_this.$refs.wrapper, {click: true})
    })
  }
}

</script>
<style>
.h_wrap{width:100%;height:100%;position:fixed}.h_wrap .head{width:100%;height:122px;display:-webkit-box;display:-webkit-flex;display:box;display:flex;align-items:center;position:relative}@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){.h_wrap .head{background-repeat:no-repeat;background-size:100% 122px;background-image:url("../../common/image/report/bg@2x.png")}}@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3){.h_wrap .head{background-repeat:no-repeat;background-size:100% 122px;background-image:url("../../common/image/report/bg@3x.png")}}.h_wrap .head .text{position:absolute;left:20px;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%)}.h_wrap .head .avatar{position:absolute;right:0;top:0}.h_wrap .head .date{position:absolute;top:85px;left:20px;width:80%;height:30px}.h_wrap .head .date .dataText,.h_wrap .head .date .time{font-family:"PingFang-SC-Medium";font-size:14px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:0.6px;color:#ffffff}.h_wrap .h_content{padding:0 20px 0 12px;margin-top:20px}.h_wrap .h_content .inner-h_content{width:100%;height:303px;padding-bottom:20px;display:flex}.h_wrap .h_content .inner-h_content .left{width:43px}.h_wrap .h_content .inner-h_content .right{width:10px}.h_wrap .h_content .inner-h_content .report-h_content{flex:1;background:#fff;position:relative}.h_wrap .h_content .inner-h_content .report-h_content .title{width:100%;text-align:center;position:absolute;left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%)}.h_wrap .h_content .inner-h_content .report-h_content .title .pic{padding:14px 0;right:12px;border-bottom:1px dashed #dfdfdf;position:relative}.h_wrap .h_content .inner-h_content .report-h_content .title .pic .text{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);-webkit-transform:translate(-50%, -50%);font-family:"FZZCHJW--GB1-0";font-size:18px;font-weight:600;font-stretch:normal;line-height:30px;letter-spacing:0.7px;color:#1c38dc}.h_wrap .h_content .inner-h_content .report-h_content .course{position:absolute;top:80px;padding-bottom:10px;border-bottom:1px dashed #dfdfdf;width:100%;right:12px}.h_wrap .h_content .inner-h_content .report-h_content .course .course-title{font-family:"PingFang-SC-Medium";font-size:17px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:0.7px;color:#333333}.h_wrap .h_content .inner-h_content .report-h_content .course .score{display:flex;align-items:center;padding-bottom:15px;margin-top:9px}.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore,.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge{flex:1;padding:5px 0}.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .name,.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .name{font-family:"PingFang-SC-Medium";font-size:15px;font-weight:normal;font-stretch:normal;line-height:30px;letter-spacing:0.6px;color:#333333}.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .num,.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .num{font-family:"ArialMT";font-size:28px;margin-left:15px;font-weight:normal;font-stretch:normal;line-height:28px;letter-spacing:1.2px;color:#00b562}.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .num.red,.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .num.red{color:#f95353}.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore{border-right:1px dashed #dfdfdf;text-align:left}.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .num{margin-right:10px}.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge{text-align:left}.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .name{margin-left:10px}@media screen and (max-width: 330px){.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .num{font-size:20px;margin-left:0}.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .num{font-size:19px;margin-left:0}}@media screen and (min-width: 331px) and (max-width: 340px){.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .num{font-size:22px;margin-left:6px}.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .num{font-size:19px;margin-left:6px}}@media screen and (min-width: 341px) and (max-width: 350px){.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .num{font-size:23px;margin-left:5px}.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .num{font-size:22px;margin-left:5px}}@media screen and (min-width: 351px) and (max-width: 365px){.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .num{font-size:24px;margin-left:6px}.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .num{font-size:24px;margin-left:6px}}@media screen and (min-width: 366px) and (max-width: 385px){.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore .num{font-size:24px}.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge .num{font-size:24px;margin-left:14px}}@media screen and (min-width: 386px){.h_wrap .h_content .inner-h_content .report-h_content .course .score .getScore,.h_wrap .h_content .inner-h_content .report-h_content .course .score .judge{text-align:center}}
.info{position: absolute; top: 225px;width: 100%}@media screen and (max-width: 350px){.info{top: 225px}}
.rate{display: flex; margin-bottom: 10px;margin-right:25px; display: -webkit-flex; justify-content: space-between; font-size: 17px; color: #333; font-family: 'PingFang-SC-Medium';}
.num{color: #00b562; font-size: 17px; font-family: 'PingFang-SC-Bold'; font-weight: 600}
</style>
