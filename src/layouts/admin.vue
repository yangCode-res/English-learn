<template>
    <el-container id="building">
        <el-header>
          <FHeader v-if="!isFullscreen"/>
        </el-header>
        <el-main>
            <router-view v-slot="{Component}">
            </router-view>
        </el-main>
    </el-container>
</template>
<script setup>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
import FHeader from '~/layouts/components/FHeader.vue';
</script>
<style scoped>
#building {
    background: url("~/assets/index6.png");
    width: 100%;			
    height: 100%;			
    position: fixed;
    background-size: cover; /* 更好的背景图适配 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* 堆叠元素 */
}
.el-aside{
  transition: all 0.2s;
}
.fade-enter-from{
  opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
.fade-enter-to{
  opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
.fade-leave-from{
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}
.fade-enter-active,
.fade-leave-active{
    transition: all 0.3s;
}
.fade-enter-active{
  transition-delay: 0.3s;
}
</style>