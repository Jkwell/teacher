<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<style lang='sass'>
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: 12px
      color: #ccc
</style>
