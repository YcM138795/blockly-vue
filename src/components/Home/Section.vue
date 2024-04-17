<template>
  <div class="Section">
    <!-- 项目 -->
    <div class="product">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="4">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content "></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
     
    </div>
    <!-- 教程 -->
    <div class="tutorial">
       <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="4">
          <div class="car" >
            <img src="./a70d2f8eda9596ca19f001d0b48b1551.jpg" style="width: 100%;height: 100%; object-fit: cover;" alt="汽车游戏" @click="carGame">
          </div>
        </el-col>
        <el-col :span="4">
          <div class=""></div>
        </el-col>
        <el-col :span="4">
          <div class=""></div>
        </el-col> 
        <el-col :span="4">
          <div class=""></div>
        </el-col>
        <el-col :span="4">
          <div class=""></div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomeSection',
  data(){
    return{}
  },
  methods:{
    carGame(){
      // 跳转到汽车游戏界面
      alert(111)
    }
  }
}
</script>

<style>
.Section {
  width: 100%;
  height: calc(100vh - 330px);
  background-color: bisque;
  /* display: flex; */
  position: absolute;
}

.el-row {
  height: 200px;
  padding: 20px 0;
  margin: 10px 0;
  background-color: rgb(175, 168, 161);
}

.el-col {
  border-radius: 10px;
  background-color: rgb(171, 210, 242);
}

/* 教程的样式 */
/* 汽车 */
.tutorial .car{
  height: 160px;
}


</style>