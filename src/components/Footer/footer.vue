<template>
  <div class="nav-wrapper">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/index">
          <div class="icon home"></div>
          <div class="text">首页</div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/myclass">
          <div class="icon message"></div>
          <div class="text">班级</div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/teacherinfo">
          <div class="icon mime"></div>
          <div class="text">我的</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>
<style lang='sass'>
@import '~@/common/sass/index/footer.sass'
</style>
