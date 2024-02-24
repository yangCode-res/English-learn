<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <songheader></songheader>
      </el-header>
      <el-container>
        <el-aside width="200px" class="el-aside">
          <songaside></songaside>
        </el-aside>
        <el-container>
          <el-main class="el-main" >
            <songmain @clickSong="clickSong"></songmain>
          </el-main>
          <el-footer class="el-footer">
            <songfooter :songInfo="songInfo"></songfooter>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import songaside from './songaside.vue';
import songheader from './songheader.vue';
import songfooter from './songfooter.vue';
import songmain from './songmain.vue';
import { ref } from 'vue'
const playStatus = ref(false)
const songInfo = ref({})
function clickSong(data){
  console.log("ok");
  songInfo.value = data
  console.log(songInfo.value);
}
</script>
<style scoped>
.common-layout {
  position: absolute;
  left: 40px;
  height: 80%;
  width: 95%;
  @apply bg-red-50;
}

.el-header {
  position: relative;
  height: 5vh;
  border-bottom: 2px solid #f5f5f4;
  @apply bg-red-500;
}

.el-main {
  height: 30vh;
  padding-top: 0%;
  border-bottom: 1px solid #d1d5db;
  @apply bg-light-50;
}

.el-footer {
  height: 10%;
  padding: 0%;
  @apply bg-light-50 ;
}

.el-aside {
  height: 85vh;
  border-right: 1px solid black;
  @apply bg-light-50;
}</style>