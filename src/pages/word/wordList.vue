<template>
  <div class="main_container">
    <el-row :gutter="20">
      <el-col :span="4" :offset="0">
        <el-scrollbar height="950px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff" @open="handleOpen" @close="handleClose">
            <el-menu-item v-for="item in menuList" :key="item.id" @click="handleSelect(item)">
              <span>{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-col>
      <el-col :span="20" :offset="0">
      <div v-if="!selectStatus">
          <span>请在左侧选择目录</span>
      </div>
      <el-scrollbar height="950px"  v-if="selectStatus">
        <div class="gridContainer" v-if="selectStatus">
        
        <div v-for="(item,index) in audioList" :key="index" class="audioBox" @click="handleClickAudio(item)">
          <el-icon size="30" class="mb-2"><Flag /></el-icon>
        {{ item.name }}
        </div>
        </div>
      </el-scrollbar>
      
      </el-col>
    </el-row>

  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import { getMenuList,getAudioList } from "~/api/sentences.js"
import { useRouter, } from 'vue-router'
const router = useRouter()
const handleClickAudio=(item)=>{
  router.push(`/sentencedictation/${item.id}`)
}
const audioList=ref([])
const handleSelect =(item)=>{
      getAudioList(item.id).then((res)=>{
        audioList.value=res
        console.log(res);
        selectStatus.value=true
      })
}
const menuList = ref([])
const selectStatus=ref(false)
onBeforeMount(() => {
  getMenuList().then((res) => {
    menuList.value = res

  })
})
</script>
<style scoped>
.audioBox{
  height: 100px;
  background-color: #f0f0f0;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
  @apply flex flex-col justify-center items-center mt-8;
}
.main_container {
  height: 90vh;
  width: 90vw;
  padding: 30px;
  border-radius: 1%;
  @apply bg-light-50 ;
}
.gridContainer{
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}

</style>