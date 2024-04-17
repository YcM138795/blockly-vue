<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="topNav">
      <!-- eslint-disable-next-line vue/no-unused-components -->
        <TopNav></TopNav>
    </div>
    <!-- 轮播图 -->
    <div class="carousel">
      <HomeCarousel></HomeCarousel>
    </div>
    <!-- 栏目 -->
    <div class="section">
      <HomeSection></HomeSection>
    </div>
  </div>
</template>

<script>
// 引入三个组件
import TopNav from '../components/Home/TopNav.vue'
import HomeCarousel from '../components/Home/Carousel.vue'
import HomeSection from '../components/Home/Section.vue'

export default {
  name:'HomeLayout',
  components: {
    TopNav,
    HomeCarousel,
    HomeSection
  },
}
</script>

<style>

</style>