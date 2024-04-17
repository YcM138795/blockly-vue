<template>
  <!-- 轮播图 -->
  <div class="Carousel">
    <template>
  <el-carousel :interval="6000" type="card" height="240px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium">{{ item }}</h3>
      <img src="" alt="">
    </el-carousel-item>
  </el-carousel>
</template>
  </div>
</template>

<script>
export default {
  name:'HomeCarousel'
}
</script>

<style>
.Carousel{
  width: 100%;
  height: 270px;
  background-color: aquamarine;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 20px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>