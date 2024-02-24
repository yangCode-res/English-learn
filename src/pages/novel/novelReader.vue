<template>
    <div class="parentContainer" :class="{ 'bg-night': colorMode.isNightMode, 'bg-day': !colorMode.isNightMode }">
        <div class="contentContainer" :class="{ 'bg-night-content': colorMode.isNightMode, 'bg-day-content': !colorMode.isNightMode }">
            <div class="navigation flex justify-start items-center m-6">
                <div class="flex items-center">
                    <el-icon size="30" @click="handleBack" class="cursor-pointer"><ArrowLeft /></el-icon>
                    <span class="text-xl">{{ novelInfo.title }}</span>
                </div>
            </div>
            <el-divider direction="horizontal" content-position="left"></el-divider>
            <el-scrollbar height="90vh">
                <div v-for="(item, index) in novelContent" :key="index" class="content">
                    <span>{{ item.text }}</span>
                </div>
            </el-scrollbar>
        </div>
        <div class="affix flex flex-col items-center justify-center cursor-pointer " @click="handleColorMode">
            <el-icon><MoonNight /></el-icon>
            <span class="font-serif mt-1 text-sm">Night</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { getNovelContent, getNovelInfo } from '~/api/novel.js'

const colorMode = reactive({
    isNightMode: false
});

const handleColorMode = () => {
    colorMode.isNightMode = !colorMode.isNightMode; // Toggle the mode
}

const handleBack = () => {
    router.back()
}

const novelContent = ref({})
const novelInfo = ref({})

onBeforeMount(() => {
    getNovelContent(props.chapterId).then(res => {
        novelContent.value = res
        console.log(res);
    })
    getNovelInfo(props.bookId).then(res => {
        novelInfo.value = res
        console.log(res);
    })
})

const props = defineProps({
    bookId: {
        type: Number,
        required: true
    },
    chapterId: {
        type: Number,
        required: true
    }
})
</script>



<style scoped>
.bg-night {
    background-color: #333; /* Dark background for night mode */
}

.bg-day {
    background-color: #e5e5e5; /* Light background for day mode */
}

.bg-night-content {
    background-color: #424242; /* Dark background for content in night mode */
    color: #fff; /* Light text for night mode */
}

.bg-day-content {
    background-color: #f5f5f4; /* Light background for content in day mode */
    color: #000; /* Dark text for day mode */
}

.affix {
    position: absolute;
    top: 50%;
    right:21%;
    width: 70px;
    height: 70px;
    background-color: #f5f5f4; /* Use the parent's background color */
    border-radius: 10%;
}

.affix:hover {
    @apply animate-bounce;
}

:deep(.el-scrollbar__view) {
    padding-right: 20px;
}

.content {
    line-height: 4em !important;
    @apply text-xl font-medium tracking-2px text-justify indent-lg;
}

.parentContainer {
    position: relative;
    width: 100%;
    height: 100vh;
    transition: background-color 0.3s; /* Smooth transition for background color */
}

.contentContainer {
    position: absolute;
    width: 50%;
    height: auto;
    left: 25%;
    padding-left: 8%;
    padding-right: 8%;
    transition: background-color 0.3s; /* Smooth transition for background color */
}

/* ... (rest of your styles) */
</style>
