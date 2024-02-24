<template>
    <div class="ml-4 mt-10">
        <div>
            <el-row :gutter="20">
                <el-col :span="6" :offset="6">
                    <el-image class="rounded-lg cursor-pointer" style="width: 200px; height: 200px"
                        src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' fit="fill" />
                </el-col>
                <el-col :span="10" :offset="0">
                    <div flex flex-col>
                        <span class="font-serif text-4xl flex items-center">
                            <span class="smallbox text-red-500 text-xl"> Songs</span>
                            <span class=" ml-3">
                                My favorite Songs
                            </span>
                        </span>
                        <div class="mt-4">
                            2024-08-20 created
                        </div>
                        <div class="mt-4">
                            <el-button type="danger" round size="large" @click=""> Play All</el-button>
                            <el-button round size="large">Star</el-button>
                            <el-button round size="large">Share</el-button>
                            <el-button round size="large">Download All</el-button>
                        </div>
                        <div class="mt-4">
                            <span class="text-gray-500 font-serif">
                                songs:662 &nbsp; &nbsp; play count:14056
                            </span>
                        </div>
                    </div>
                </el-col>
            </el-row>


        </div>
        <div class="mt-4">
            <h6 class="text-black font-bold text-3xl font-serif">
                Song Sheet
            </h6>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%" @row-dblclick="handleRowClick">
                <el-table-column type="index" width="50" />
                <el-table-column  label="Operation" width="180" >
                    <template #default="scope">
                        <el-icon size="20px"><Star /></el-icon>
                        <el-icon class="ml-4" size="20px"><Download /></el-icon>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="Title" width="580" />
                <el-table-column prop="artistName" label="Author" width="520" />
                <el-table-column prop="albumTitle" label="Album" width="500" />
                <el-table-column prop="duration" label="Time" width="180" />
            </el-table>
        </div>
    </div>
</template>
<script setup>
import {ref,onBeforeMount} from 'vue'
import {getAllSongs} from "~/api/song.js"
const tableData = ref([])
const emit=defineEmits(['clickSong'])
const handleRowClick=(row)=>{
    console.log(row);
    emit('clickSong',row)
}
onBeforeMount(()=>{
        getAllSongs().then((res) => {
                tableData.value=res
})
})

</script>
<style scoped>
.smallbox {
    border: 1px solid red;
    border-radius: 10%;
}
</style>