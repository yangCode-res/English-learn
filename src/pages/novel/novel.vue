<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <novelHeader></novelHeader>
      </el-header>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import novelHeader from './novelHeader.vue';
import novelMain from './novelMain.vue';
import {ref} from 'vue'
</script>
<style scoped>
.el-header {
  position: relative;
  height: 10%;
  width: 100%;
}

.common-layout {
  position: absolute;
  left: 40px;
  width: 95%;
  height: 80%;
}

.el-main {
  position: relative;
  left: 20px;
  width: 98.3%;
  height: 85vh;
  padding-top: 0%;
  @apply bg-light-50;
}
</style>