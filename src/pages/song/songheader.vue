<template>
    <div class="mt-3">
        <el-row>
            <el-col :span="8" :offset="0">
                <span class="left flex items-center">
                    <el-icon class="text-light-50 " size="20px">
                        <Headset />
                    </el-icon>
                    <span class="text-light-50 font-serif text-xl ml-2" style="white-space: nowrap;">
                        EngHub Music
                    </span>

                </span></el-col>
            <el-col :span="4" :offset="0">
                <div class="elinputdiv">
                    <el-input v-model="input" placeholder="Music name" clearable>
                    <template #prepend>
                        <el-icon class=" ml-1 mr-2 text-light-50"><Search /></el-icon>
                    </template></el-input>
                </div>
                
            </el-col>
            <el-col :span="1" :offset="11">
                <span class="right flex items-center mt-1">
                    <el-icon class="text-light-50 " size="20px"><FullScreen /></el-icon>
                    <el-icon class="text-light-50 ml-3 " size="25px"><Link /></el-icon>
                    <el-icon class="text-light-50 ml-3 " size="23px"><List /></el-icon>
                </span></el-col>
        </el-row>



    </div>
</template>
<script setup>

import { ref } from 'vue'
const input = ref("")
</script>
<style scoped>
:deep(.el-input-group__prepend){
    padding-left: 0%;
    padding-right: 0%;
    background-color: transparent;
    box-shadow: none;
}
:deep(.el-input__wrapper){
    padding: 0%;
    box-shadow: none;
    background-color: transparent;
}
:deep(.el-input){
    /* border-radius: 15%; */
    @apply bg-red-600 rounded-3xl;
}
</style>