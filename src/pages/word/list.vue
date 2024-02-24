<template>
    <div v-if="!isFullscreen" class="header-index">
        <el-icon class="ml-2 mx-3" :size="30" color="#fdfdfd">
            <ArrowLeftBold />
        </el-icon>
        <div class="mr-4 flex items-center ">
            <el-icon :size="30" class="mx-3 cursor-pointer" color="#fdfdfd">
                <Microphone />
            </el-icon>
            <el-icon :size="30" class="mx-3 cursor-pointer" color="#fdfdfd" @click="handletroggle">
                <FullScreen v-if="!isFullscreen" />
                <Aim v-else />
            </el-icon>
            <el-icon :size="30" class="mx-3 cursor-pointer" color="#fdfdfd">
                <Share />
            </el-icon>
            <el-icon :size="30" class="mx-3 cursor-pointer" color="#fdfdfd">
                <Calendar />
            </el-icon>
        </div>
    </div>
    <div v-if="!isFullscreen" class="header-index mt-1">
        <el-icon class="ml-2 mx-3" :size="30" color="#fdfdfd">
            <Setting />
        </el-icon>
        <div class="m-2 flex items-center ">
            <el-button v-if="word == false" type="text" size="default" @click="handleword">单词</el-button>
            <el-button v-else color="#a78bfa" size="default" @click="handleword">单词</el-button>
            <el-button v-if="yinbiao == false" type="text" size="default" @click="handleyinbiao">音标</el-button>
            <el-button v-else color="#a78bfa" size="default" @click="handleyinbiao">音标</el-button>
            <el-button v-if="meaning == false" type="text" size="default" @click="handlemeaning">释义</el-button>
            <el-button v-else color="#a78bfa" size="default" @click="handlemeaning">释义</el-button>
            <el-button v-if="opearting == false" type="text" size="default" @click="handleopearting">操作</el-button>
            <el-button v-else color="#a78bfa" size="default" @click="handleopearting">操作</el-button>

        </div>
    </div>
    <el-card v-if="!isFullscreen" shadow="always" class="header-body border-transparent mt-1">
        <el-table :data="tableData" style="width: 100%" class="bg-transparent" max-height="700">
            <el-table-column type="index" width="50" label="#." />
            <el-table-column label="单词" width="150">
                <template #default="{ row }">
                    <div class="flex justify-center" style="flex-direction:column;">
                        <span v-if="word == true" class="text-sky-500 text-xl font-bold">{{ row.word }}</span>
                        <div v-if="yinbiao == true">
                            <span class="text-light-50 mt-1">/ {{ row.ukphonetic }} /</span>
                            <span class="text-light-50 mt-1">/ {{ row.usphonetic }} /</span>
                        </div>


                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="meaning == true" label="释义" width="450">
                <template #default="{ row }">
                    <div class="flex justify-center" style="flex-direction:column;">
                        <div class="flex items-center " v-if="row.n">
                            <span class="text-orange-500 font-bold text-xl italic"> n. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.n }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.prep">
                            <span class="text-orange-500 font-bold text-xl italic"> prep. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.prep }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.vi">
                            <span class="text-orange-500 font-bold text-xl italic"> vi. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.vi }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.adj">
                            <span class="text-orange-500 font-bold text-xl italic"> adj. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.adj }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.pron">
                            <span class="text-orange-500 font-bold text-xl italic"> pron. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.pron }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.v">
                            <span class="text-orange-500 font-bold text-xl italic"> v. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.v }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.conj">
                            <span class="text-orange-500 font-bold text-xl italic"> conj. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.conj }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.adv">
                            <span class="text-orange-500 font-bold text-xl italic"> adv. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.adv }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.interj">
                            <span class="text-orange-500 font-bold text-xl italic"> interj. </span>
                            <span class="text-light-50 ml-1 text-lg"> {{ row.interj }}</span>
                        </div>


                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="opearting == true" label="记住了" width="70">
                <template #default="scope">
                    <el-button type="success" size="default" @click="handleremember(scope.row)">Ok</el-button>

                </template>
            </el-table-column>

        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager, next" :total="total_page" :current-page="now_page"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-card>
    <el-card v-else shadow="always" class="header-body2 border-transparent mt-50">


        <div class=" h-[800]">

            <el-row :gutter="20">
                <el-col :span="6" :offset="0"> <span class="text-light-50 font-mono text-sm"> 今日复习：{{ totalRemembered_review
                }} / {{
    reviewData2.length + totalRemembered_review }}</span></el-col>
                <el-col :span="6" :offset="0"><span class="text-light-50 font-mono text-sm ">今日新学：{{ totalRemembered_new }}
                        / {{
                            reciteData2.length + totalRemembered_new }}</span></el-col>
                <el-col :span="7" :offset="0"><span class="text-light-50 font-mono text-sm ">学习时间:
                        {{ formattedTime }}</span></el-col>


                <el-col :span="2" :offset="3"><el-icon :size="30" class="mx-3 cursor-pointer" color="#fdfdfd"
                        @click="toggle">
                        <Close />
                    </el-icon></el-col>
            </el-row>

            <span class="flex justify-center items-center text-4xl text-sky-500 font-bold">{{ currentData.word }}</span>
            <div class="flex justify-center mt-6">
                <span class="text-gray-900 text-xl italic">美：{{ currentData.usphonetic }}</span>
                <span class="text-gray-900 text-xl italic ml-2">英：{{ currentData.ukphonetic }}</span>
                <audio :src="currentAudioUrl" ref="audioPlayer"></audio>
                <el-icon :size="30" class="mx-3 cursor-pointer" @click="handleaudio(currentData.pronunciationURL)"
                    color="#fdfdfd">
                    <Headset />
                </el-icon>
            </div>

            <div v-if="tiplevel" class="flex justify-center items-center mt-6" style="flex-direction:column;">
                <div class="flex items-center " v-if="currentData.n">
                    <span class="text-orange-500 font-bold text-xl italic"> n. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.n }}</span>
                </div>
                <div class="flex items-center " v-if="currentData.prep">
                    <span class="text-orange-500 font-bold text-xl italic"> prep. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.prep }}</span>
                </div>
                <div class="flex items-center " v-if="currentData.vi">
                    <span class="text-orange-500 font-bold text-xl italic"> vi. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.vi }}</span>
                </div>
                <div class="flex items-center " v-if="currentData.adj">
                    <span class="text-orange-500 font-bold text-xl italic"> adj. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.adj }}</span>
                </div>
                <div class="flex items-center " v-if="currentData.pron">
                    <span class="text-orange-500 font-bold text-xl italic"> pron. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.pron }}</span>
                </div>
                <div class="flex items-center " v-if="currentData.v">
                    <span class="text-orange-500 font-bold text-xl italic"> v. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.v }}</span>
                </div>
                <div class="flex items-center " v-if="currentData.interj">
                    <span class="text-orange-500 font-bold text-xl italic"> interj. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.interj }}</span>
                </div>
                <div class="flex items-center " v-if="currentData.conj">
                    <span class="text-orange-500 font-bold text-xl italic"> conj. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.conj }}</span>
                </div>
                <div class="flex items-center " v-if="currentData.adv">
                    <span class="text-orange-500 font-bold text-xl italic"> adv. </span>
                    <span class="text-light-50 ml-1 text-lg"> {{ currentData.adv }}</span>
                </div>
            </div>

            <div v-if="aftertip == false" class="flex justify-between operation">
                <el-button class=" w-[200px]" color="#fef3c7" type="primary" size="default" @click="handle_prev">
                    提示</el-button>
                <el-button class=" w-[200px]" color="#34d399" type="primary" size="default" @click="handle_midnext">
                    认识</el-button>
            </div>
            <div v-if="midnext==true"  class="operation2">
                <el-button class=" w-[200px]"  type="primary" size="default" @click="handle_next">下一个</el-button>
            </div>
            <div v-if="aftertip==true&& midnext==false" class="flex justify-between operation">
                <el-button class=" w-[200px]" color="#34d399" type="primary" size="default" @click="handle_next2">
                    没想起来</el-button>
                <el-button class=" w-[200px]" color="#fef3c7" type="primary" size="default" @click="handle_prev2">
                    想起来了</el-button>
            </div>


        </div>
        
    </el-card>
    <Dialog  ref="last10dialogRef" v-model:wordValue="last10words" @notify="handlenotify"></Dialog>
</template>
<script setup>
import { useFullscreen } from '@vueuse/core'
import { ref, watchEffect } from 'vue';
import { words, cet4words, recitewords, rememberedwords } from "~/api/words.js"
import { toast } from "~/composables/util.js"
import Dialog from './dialog.vue';
const { isFullscreen, toggle } = useFullscreen()
const last10dialogRef=ref(null)
const word = ref(true)
const yinbiao = ref(true)
const meaning = ref(true)
const opearting = ref(true)
const tiplevel = ref(false)
const currentAudioUrl = ref(null)
const audioPlayer = ref(null)
const total_page = ref(null)
const now_page = ref(0)
const limit = ref(10)
const aftertip = ref(false)
const midnext=ref(false)
const displayList = ref([])
const totalRemembered_review = ref(0)
const totalRemembered_new = ref(0)
const handle_midnext=()=>{
tiplevel.value=true
midnext.value=true
aftertip.value=true
}
const last10words=ref([])
const remindwords = (newstatus) => {
    if (newstatus == false) {
        totalRemembered_review.value += 1
    }
    else {
        totalRemembered_new.value += 1
    }
}
const handleaudio = (url) => {
    currentAudioUrl.value = url
    if (audioPlayer.value) {
        audioPlayer.value.play()
    }
}

const tableData = ref([
]
)
//最开始的单词整体表数据获取
const getData = (p = null) => {
    if (typeof p == "number") {
        now_page.value = p;
    }
    cet4words(now_page.value).then((res) => {
        tableData.value = res.content
        total_page.value = res.totalElements

    })
}
getData()
const handletroggle = () => {
    toggle()
    //display和currentData的数据初始化
    displayList.value = reviewData2.value
    currentData.value = displayList.value[current_page.value]
}
const currentData = ref([])
const current_page = ref(0)
//点击全屏后的背单词模式数据获取
const reciteData2 = ref([])
const reviewData2 = ref([])
const getData2 = () => {
    recitewords(1).then(res => {
        console.log(res);
        reciteData2.value = res.wordData.newWords.map((o) => {
            o.isFirst = true;
            o.reviewNum = 3;
            return o
        })
        reviewData2.value = res.wordData.reviewWords.map((o) => {
            o.isFirst = true;
            o.reviewNum = 3;
            return o
        })
    })



}

getData2()
const handlenotify=()=>{
    last10words.value=[]
}
//弹出最近10个单词
watchEffect(() => {
if(last10words.value.length%10==0 && last10words.value.length!=0 ){
    last10dialogRef.value.open()
}
})
let newstatus = false;
const handle_next = () => {
    if (newstatus == true && displayList.value.length == 0) toast("恭喜你，你已经背完了今天的单词！")
    if (currentData.value.isFirst == true) {
        rememberedwords(1, currentData.value.word_id).then(res => {
            
            currentData.value.reviewNum = 0
            displayList.value.splice(current_page.value, 1)
            remindwords(newstatus)
        })
    }
    else {
        if (currentData.value.reviewNum != 1)
            currentData.value.reviewNum - 1
        else {
            rememberedwords(1, currentData.value.word_id).then(res=>{
                
            currentData.value.reviewNum = 0
            displayList.value.splice(current_page.value, 1)
            remindwords(newstatus)
            })
            
        }
    }
    last10words.value.push(currentData.value)
    tiplevel.value=false
    midnext.value=false
    aftertip.value=false
    //更新currentdata
    if (displayList.value.length > 0) {
        var randomIndex = Math.floor(Math.random() * displayList.value.length)
        current_page.value = randomIndex
        currentData.value = displayList.value[current_page.value]
    }
    else {
        if (newstatus == false) {
            last10dialogRef.value.open()
            newstatus = true
            displayList.value = reciteData2.value
            current_page.value = 0
        }

    }





}
//没想起来
const handle_next2 = () => {
    tiplevel.value = false
    aftertip.value = false
    currentData.value.reviewNum=3
    var randomIndex = Math.floor(Math.random() * displayList.value.length)
    current_page.value = randomIndex
    currentData.value = displayList.value[current_page.value]
    last10words.value.push(currentData.value)


}
//提示一下
const handle_prev = () => {
    currentData.value.isFirst=false
    tiplevel.value = !tiplevel.value
    aftertip.value = !aftertip.value

}
//想起来了
const handle_prev2 = () => {
    tiplevel.value = false
    aftertip.value = false
    currentData.value.isFirst = false
    currentData.value.reviewNum-=1
    var randomIndex = Math.floor(Math.random() * displayList.value.length)
    current_page.value = randomIndex
    currentData.value = displayList.value[current_page.value]
    last10words.value.push(currentData.value)
}
//删除主列表里的词
const handleremember = (row) => {

    row.isok = false;
    tableData.value = tableData.value.filter(o => o.isok != false)
}

const handleword = () => {
    word.value = !word.value
}
const handleyinbiao = () => {
    yinbiao.value = !yinbiao.value
}
const handlemeaning = () => {
    meaning.value = !meaning.value
}
const handleopearting = () => {
    opearting.value = !opearting.value
}

// 定义计时器变量
let seconds = 0;
let minutes = 0;
let hours = 0;
const formattedTime = ref(null)
// 更新计时器显示
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    // 格式化时间
    formattedTime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 启动计时器
setInterval(updateTimer, 1000);
</script>
<style scoped>
.el-table_1_column_1 {
    @apply text-light-50;
}

.operation1 {
    top: 720px;
    left: 800px;
    @apply fixed;
}

.operation2 {
    position: absolute;
    bottom: 10px;
    left: 5px;
    right: 5px;
    display: flex;
    justify-content: center;
    
}

.operation {
    position: absolute;
    bottom: 10px;
    left: 5px;
    right: 5px;
    display: flex;
    justify-content: space-between;
}

.el-table {
    --el-table-header-bg-color: #134e4a;
    --el-table-tr-bg-color: #134e4a;
    --el-table-border: 2px solid;
    --el-table-border-color: #c026d3;
    --el-table-header-text-color: #fff;
    --el-table-row-hover-bg-color: #115e59;
    --el-table-current-row-bg-color: var(--el-color-primary-light-9);
}

.el-button--text {
    @apply text-light-50;
    @apply flex bg-teal-900 items-center shadow-md opacity-90 justify-between rounded-xl;
}

.header-body {
    width: 800px;
    @apply bg-teal-900;
}

.header-body2 {
    position: relative;
    width: 600px;
    height: 500px;
    @apply bg-teal-900 rounded-xl;
}

.header-index {
    width: 800px;
    height: 50px;
    @apply flex bg-teal-900 items-center shadow-md opacity-90 justify-between rounded-xl;
}</style>