<template>
    <div>
        <div class="mt-4 ml-4 mb-4 font-serif text-lg">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/shortStory/main' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/shortStory/directory/${id}` }">{{ novelInfo.title }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="bookInfo">
            <el-row>
                <el-col :span="18" :offset="0">
                    <div class="flex ">
                        <el-image :src="novelInfo.coverUrl" fit="fill" :lazy="true" class="rounded-lg"></el-image>
                        <div class="mt-8 ml-8 flex flex-col infoShow">
                            <span class="font-bold text-3xl">{{ novelInfo.title }}</span>
                            <div class="mt-4"><span class="text-2xl ">357.6</span>
                            <span class="ml-2 text-gray-400">Ten thousand of characters</span>
                            <el-divider direction="vertical" />
                            <span class="text-2xl "> 94.8</span>
                            <span class="ml-2 text-gray-400"> People are currently studying</span>
                            </div>
                            <div class="info-Button mt-8">
                            <el-button type="warning" @click="toChapter" round size="large">Read Now</el-button>
                            <el-button  @click="toChapter" round size="large">Download Novel</el-button>
                        </div>
                        </div>
                       
                    </div>
                </el-col>
                <el-col :span="6" :offset="0">
                    <div class="flex">
                        <div class="authorBox text-light-100 font-serif">
                    <el-icon size="25"><Notebook /></el-icon>
                    <span class="ml-2">Author</span>
                </div>
                <span class="text-lg font-bold ml-4">{{ novelInfo.author  }}</span>
                    </div>
               
                </el-col>
            </el-row>

        </div>
        
    </div>
    <div class="charterbg">
        <div class="charterList">
            <h6 class="font-serif text-3xl font-bold m-4">Introduction to the work</h6>
            <el-divider />
            <span class="infoBox">
                世间灵骨，共分四品。 一品，天灵骨。二品，金灵骨。三品，玄灵骨。四品，白灵骨。 余者，皆为凡骨，无缘修行。 一介凡骨许太平，誓要向这修行界证明，凡骨亦能斩妖，凡骨亦能除魔，凡骨亦能登仙！
            </span>
            
        <span class="font-serif text-3xl font-bold m-4">Directory · {{ novelChapterList.length }} &nbsp; chapter</span>
            <div class="listContainer">
                <span v-for="(item, index) in novelChapterList" :key="index" class="font-serif" @click="handleRead(item.chapterId)">
                    No.{{ item.chapterNumber}} chapter
            {{ item.title }}
        </span>
            </div>
       
        </div>
        
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue'
import { getNovelChapterList, getNovelInfo } from "~/api/novel.js"
const novelChapterList = ref([])
const novelInfo = ref({})
import { useRouter, } from 'vue-router'
const router = useRouter()
const handleRead = (chapterId) => {
    router.push(`/read/book/${props.id}/chapter/${chapterId}`)
}
onBeforeMount(() => {
    getNovelChapterList(props.id).then((res) => {
        novelChapterList.value = res
    })
    getNovelInfo(props.id).then((res) => {
        novelInfo.value = res
    })
})
const props = defineProps({
    id: {
        type: Number,
        required: true
    }

})
</script>
<style scoped>
.authorBox{
    width: 100px;
    height: 30px;
    @apply bg-orange-300 flex items-center justify-center;
}
.infoShow{
    white-space:nowrap;
}
.charterbg{
    position: relative;
    top: 5%;
    width: 100%;
    height: 100vh;
    @apply bg-gray-100 ;
}
.charterList{
    position: absolute;
    width: 50%;
    height: 98%;
    left: 25%;

    @apply bg-light-50 mt-2  mb-4 shadow-lg rounded-xl flex flex-col;
}
.infoBox{
    padding: 30px;
}
.listContainer{
    position: relative;
    left: 5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    grid-gap: 20px;
    padding: 20px;
    @apply cursor-pointer ;
}
</style>