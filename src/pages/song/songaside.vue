<template>
    <div class="flex flex-col ml-3 justify-start">
        <span class="font-serif text-lg aside-button">
            Discovering Music
        </span>
        <span  class="font-serif text-lg aside-button">
            Podcast
        </span>
        <span  class="font-serif text-lg aside-button">
                Viedo
        </span>
        <span  class="font-serif text-lg aside-button">
            Follow
        </span>
        <span  class="font-serif text-lg aside-button">
            Live broadcast
        </span>
        <span  class="font-serif text-lg aside-button">
            Recommendation
        </span>
        <span class="font-serif text-gray-500 mt-5 ">
            My Music
        </span>
        <span class="font-serif text-lg aside-button flex items-center">
            <el-icon class="mr-1"><Star /></el-icon> My favorite songs
        </span>
        <span class="font-serif text-lg aside-button flex items-center">
            <el-icon class="mr-1"><Download /></el-icon> Local and download 
        </span>
        <span class="font-serif text-lg aside-button flex items-center">
            <el-icon class="mr-1"><Cloudy /></el-icon> Recent songs
        </span>
    </div>
</template>
<style scoped>
.aside-button{
    @apply cursor-pointer mt-5;
}
.aside-button:hover{
    @apply bg-gray-200;
}
</style>
