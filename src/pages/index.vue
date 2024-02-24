<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" height="1800px" class="aside">

                <el-steps space="400px" direction="vertical" :active="1">
                    <el-step class="text-light-50 " title="Listening">
                    </el-step>
                    <el-step class="text-light-50" title="word dictation" />
                    <el-step class="text-light-50" title="Dialogue" />
                </el-steps>


            </el-aside>
            <el-main class="main">
                <div>
                    <el-row :gutter="20">
                        <el-col :span="24" :offset="0">
                            <span class="text-green-200 text-8xl font-serif  ">
                                Let's start from here
                            </span>
                        </el-col>

                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24" :offset="0">
                            <span class="text-yellow-200 text-2xl font-serif">
                                The world's leading AI-powered english learn platform.
                            </span></el-col>
                    </el-row>
                    <el-row :gutter="10" class="mt-30">
                        <el-col :span="7" :offset="0">
                            <el-input class=" rounded border-transparent w-[400px] cursor-pointer" v-model="Email_address" 
                                placeholder="Email address" size="large"   clearable @change="">
                                <template #append>
                                    <span @click="handleToSignup">
                                        Sign up for EngHub
                                    </span>
                                    
                                </template>
                            </el-input>

                        </el-col>

                        <el-col :span="1" :offset="0" class="" style="height: 40px;">
                            <el-divider class="bg-light-900 font-bold" style="height: 40px;"
                                direction="vertical" /></el-col>

                        <el-col :span="16" :offset="0">
                            <div class="text-light-400  font-bold  spaninput ">
                                start a free student trial
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="mt-36">
                        <el-col :span="12" :offset="0">
                            <div>
                                <span class="text-light-200 hyphens-auto text-xl font-serif">Welcome to our English learning website,
                                    a comprehensive platform designed to enhance your English skills.
                                    Our site offers a variety of interactive learning tools, including:</span>
                                <div>

                                    <div class="demo-collapse mt-15">
                                        <el-collapse accordion >
                                            <el-collapse-item name="1">
                                                <template #title>
                                                    <el-icon class="mr-2"><Check /></el-icon>
                                                    English Word Dictation
                                                </template>
                                                <div>
                                                    Strengthen your spelling and pronunciation of English words through dictation exercises.
                                                </div>

                                            </el-collapse-item>
                                            <el-collapse-item title="" name="2">
                                                <template #title>
                                                    <el-icon class="mr-2"><Check /></el-icon>
                                                    Listening
                                                </template>
                                                <div>
                                                    Listening Comprehension Dictation: Improve your listening skills with dictation exercises based on real conversations and speeches.
                                                </div>
                                            </el-collapse-item>
                                            <el-collapse-item name="3">
                                                <template #title>
                                                    <el-icon class="mr-2"><Check /></el-icon>
                                                    Conversations
                                                </template>
                                                <div>
                                                    AI Conversations: Engage in real-time dialogues with our advanced AI technology to enhance your fluency and conversational skills in English.
                                                </div>
                    
                                            </el-collapse-item>
  
                                        </el-collapse>
                                    </div>
                                </div>
                            </div>



                        </el-col>
                        <!-- <el-col :span="10" :offset="2">
                            <el-image src="https://english-1309979517.cos.ap-nanjing.myqcloud.com/teach.png"
                                class="w-[400px] h-[200px]" fit="fill" :lazy="true"></el-image></el-col> -->
                    </el-row>

                </div>







            </el-main>
        </el-container>
        <!-- <div class="footer">
            <div class="vanta_area" ref="Area" ></div>
       

</div> -->


    </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three'//导入样式
import CLOUDS from "vanta/src/vanta.clouds";
import { useRouter } from 'vue-router'
const router = useRouter()
const handleToSignup=()=>{
    console.log("signup");
        router.push("/signup")
}
const Email_address = ref("")
const props = defineProps({
    icon: {
        type: String,
        default: "incon1.svg"
    }
})
// const Area=ref(null)
// let vantaEffect=null;
// onMounted(()=>{
//     vantaEffect=CLOUDS({
//         el:Area.value,
//         THREE:THREE,
//         //如果需要改变样式，要写在这里
//         //因为这里vantaEffect是没有setOptions这个方法的
//         color: 0x16212a,
//     })
// })

// onBeforeUnmount(()=>{
//     if(vantaEffect){
//         vantaEffect.destroy()
//     }
// })

</script>
<style >
.el-collapse {
    --el-collapse-content-bg-color:none;
    --el-collapse-border-color:none;
    --el-collapse-header-height: 40px;
    @apply bg-transparent font-serif;
}
.el-collapse-item__content{
    color:#fcfcfc;
    padding-bottom: 4px;
    @apply bg-transparent;
}
.el-collapse-item__header{
    font-size: large;
    @apply bg-transparent text-light-50 font-serif;
}
.my-svg-background {
    background-image: url('~/assets/work.svg');
}

.spaninput {
    border-style: solid;
    border-width: 2px;
    border-color: #7C72FF;
    vertical-align: middle;
    height: 40px;
    width: 240px;
    line-height: 37px;
    text-align: center;
    @apply rounded-xl bg-gray-900;
}

.el-input-group__append {
    box-shadow: none;
    @apply bg-purple-500 text-light-400 font-bold;
}

.main {
    left: 210px;
    top: 140px;
    @apply fixed;
}

.font-serif {
    font-family: "Times New Roman";
}

.aside {
    top: 120px;
    left: 21px;
    @apply fixed;
}

.el-step__title.is-process {
    @apply text-light-50 font-bold text-xl font-serif;
    /* color:#fd
    fdfd; */
}

.el-step__line {
    position: absolute;
    border-color: inherit;
    /* Example of a linear gradient from blue to red */
    background: linear-gradient(transparent, #7C72FF 30%);
    @apply rounded;

    /* Other properties */
}

.el-step__title.is-finish {
    color: #f97316;
    @apply font-bold text-xl font-serif;
}

.el-step__title.is-wait {
    @apply text-light-50 font-bold text-xl font-serif;
}

.el-step__head.is-finish {
    color: #fcd3d3;
    border-color: #fda4af;
}

/* .vanta_area {
    position: absolute;
      bottom: 0;
      left: 0;right: 0;
      margin: 0;
    width:100vw;
    height:15%;
} */
</style>