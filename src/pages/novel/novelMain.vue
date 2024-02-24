<template>
    <el-scrollbar>
        <div class="block text-center">
            <el-carousel height="300px">
                <el-carousel-item v-for="item in carouselList" :key="item">
                    <el-image style="width: 2311px; height:300px" :src="item" fit="cover" />
                </el-carousel-item>
            </el-carousel>
            <div class="navaBox">
                <div></div>
                <div class="flex items-center justify-between cursor-pointer">
                    <div class=" flex flex-col justify-center items-start ">
                        <span class="font-bold mb-1 textCursorColor">Writer benefits</span>
                        <span class="text-sm text-neutral-400">Enghub Writer benefits scope</span>
                    </div>
                    <el-icon class="text-black mr-10">
                        <ArrowRight />
                    </el-icon>
                </div>
                <div class="flex items-center justify-between cursor-pointer">
                    <div class=" flex flex-col justify-center items-start ">
                        <span class="font-bold mb-1 textCursorColor">Writer benefits</span>
                        <span class="text-sm text-neutral-400">Enghub Writer benefits scope</span>
                    </div>
                    <el-icon class="text-black mr-10">
                        <ArrowRight />
                    </el-icon>
                </div>

                <div class="flex items-center justify-between cursor-pointer">
                    <div class=" flex flex-col justify-center items-start ">
                        <span class="font-bold mb-1  textCursorColor">Writer benefits</span>
                        <span class="text-sm text-neutral-400">Enghub Writer benefits scope</span>
                    </div>
                    <el-icon class="text-black mr-10">
                        <ArrowRight />
                    </el-icon>
                </div>

                <div></div>
            </div>
            <div class="boxStaff">
                <div class="text-2xl font-serif recommend_title mt-4 ">Recommended by the editor in
                    chief</div>
                <el-row>
                    <el-col :span="20" :offset="0">
                        <div>


                            <el-row>
                                <el-col :span="4" :offset="4">
                                    <div class="bookMain  ml-10">
                                        <el-image style="width: 250px; height: 400px"
                                            src="https://p9-reading-sign.fqnovelpic.com/novel-pic/2e9dbaef02e682e88dd606aee1ff6e5d~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=SSIz%2B65h3lhxA4V9NYq1bvUsq1w%3D" />
                                        <p class="font-bold text-lg flex items-start mt-2">特工易冷</p>
                                        <p class=" text-gray-400 flex items-start mt-2">骁骑校</p>
                                        <el-text class="w-250px mb-2" truncated>
                                            （原名特工易冷）玉梅饭店的厨子黄皮虎是个油腻猥琐的中年大叔，喜欢喝酒抽烟盘串，还经常尾随女学生，没人知道他的真实身份是众多美女心中的一代男神、退役特工易冷，隐于市井只为默默守护已经不认识自己的女儿。
                                        </el-text>

                                    </div>
                                </el-col>
                                <el-col :span="16" :offset="0">
                                    <div class=" main-staff mt-10">
                                        <div v-for="(item, index) in booklist" :key="index" class="bookBox mt-2" @click="handleRouterNovel(item.id)">
                                            <el-image :src="item.imgUrl" fit="fill" :lazy="true"
                                                style="width: 150px; height: 200px"
                                                class="rounded-lg cursor-pointer Book-img"></el-image>
                                            <span class="text-lg mt-1">{{ item.title }}</span>
                                            <span class="text-sm text-gray-400 mt-1">{{ item.author }}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>



                        </div>
                    </el-col>
                    <el-col :span="4" :offset="0">
                        <div class="flex flex-col">
                            <span class="recommend_title_right">Information</span>
                            <div class="mt-15 ">
                                <div v-for="item in 4" class="notice cursor-pointer flex items-center justify-between">

                                    <el-text class="w-350px mb-2 font-serif text-lg" truncated>
                                        This is the latest news for testing placed on the side
                                    </el-text>
                                    <el-icon>
                                        <DArrowRight />
                                    </el-icon>
                                </div>
                            </div>

                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>
    </el-scrollbar>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, } from 'vue-router'
const router = useRouter()
const handleRouterNovel = (id) => {
    router.push(`/shortStory/directory/${id}`)

}
const booklist = ref([
    {
        "title": "凡骨",
        "author": "壹更大师",
        "imgUrl": "https://p6-reading-sign.fqnovelpic.com/novel-pic/p2obb133cb5a48be531dcd0fbad46a5ef34~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=8LsceQJXYtHHNqhx2uh%2BgNOCMBc%3D",
        "id": 1
    },
    {
        "title": "凡骨",
        "author": "壹更大师",
        "imgUrl": "https://p6-reading-sign.fqnovelpic.com/novel-pic/p2obb133cb5a48be531dcd0fbad46a5ef34~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=8LsceQJXYtHHNqhx2uh%2BgNOCMBc%3D",
        "id": 1
    },
    {
        "title": "凡骨",
        "author": "壹更大师",
        "imgUrl": "https://p6-reading-sign.fqnovelpic.com/novel-pic/p2obb133cb5a48be531dcd0fbad46a5ef34~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=8LsceQJXYtHHNqhx2uh%2BgNOCMBc%3D",
        "id": 1
    },
    {
        "title": "凡骨",
        "author": "壹更大师",
        "imgUrl": "https://p6-reading-sign.fqnovelpic.com/novel-pic/p2obb133cb5a48be531dcd0fbad46a5ef34~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=8LsceQJXYtHHNqhx2uh%2BgNOCMBc%3D",
        "id": 1
    },
    {
        "title": "凡骨",
        "author": "壹更大师",
        "imgUrl": "https://p6-reading-sign.fqnovelpic.com/novel-pic/p2obb133cb5a48be531dcd0fbad46a5ef34~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=8LsceQJXYtHHNqhx2uh%2BgNOCMBc%3D",
        "id": 1
    },
    {
        "title": "凡骨",
        "author": "壹更大师",
        "imgUrl": "https://p6-reading-sign.fqnovelpic.com/novel-pic/p2obb133cb5a48be531dcd0fbad46a5ef34~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=8LsceQJXYtHHNqhx2uh%2BgNOCMBc%3D",
        "id": 1
    },
    {
        "title": "凡骨",
        "author": "壹更大师",
        "imgUrl": "https://p6-reading-sign.fqnovelpic.com/novel-pic/p2obb133cb5a48be531dcd0fbad46a5ef34~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=8LsceQJXYtHHNqhx2uh%2BgNOCMBc%3D",
        "id": 1
    },
    {
        "title": "凡骨",
        "author": "壹更大师",
        "imgUrl": "https://p6-reading-sign.fqnovelpic.com/novel-pic/p2obb133cb5a48be531dcd0fbad46a5ef34~tplv-resize:225:0.image?lk3s=5b7047ff&x-expires=1706860977&x-signature=8LsceQJXYtHHNqhx2uh%2BgNOCMBc%3D",
        "id": 1
    },

])
const carouselList = ref([
    "https://p3-novel.byteimg.com/origin/novel-static/28928ff95ec47fd72261ff0c4add7236",
    "https://p6-novel.byteimg.com/origin/novel-static/0922b2be1c6751527b54ab2a5cab3490",
    "https://p3-novel.byteimg.com/origin/novel-static/293a0b3fcb2d13aa790ba450728625f2"
])
</script>
<style scoped>
.notice {
    width: 400px;
    height: 60px;
}

.main-staff {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

}

.Book-img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease-in-out;
    /* 平滑的变换效果 */
}

.Book-img:hover {
    transform: scale(1.1);
}

.bookBox {
    width: 180px;
    height: 250px;
    position: relative;
    overflow: hidden;
    @apply flex flex-col justify-start items-start;
}

.navaBox {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    height: 100px;
    @apply bg-gray-100 mt-2;
}

.textCursorColor:hover {
    cursor: pointer;
    @apply text-orange-400;
}

.boxStaff {
    position: relative;
    width: 95%;
    height: 100%;
    @apply mt-2
}

.recommend_title {
    position: absolute;
    left: 20px;
    @apply font-bold text-2xl font-serif;
}

.recommend_title_right {
    position: absolute;
    right: 20px;
    @apply font-bold text-2xl font-serif flex items-start justify-start;
}

.bookMain {
    position: absolute;
    top: 20%;
    width: 300px;
    height: 600px;
    left: -5px;
    padding: 20px;
    background-color: rgba(0, 0, 0, .02);
    border-radius: 3%;
}</style>