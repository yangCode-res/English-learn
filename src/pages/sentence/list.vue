<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="sentenceHeader flex items-center">
                    <el-checkbox v-model="originDisplay" label="显示原文" />
                    <el-checkbox v-model="translateDisplay" label="显示翻译" />
                    <label class="ml-0 font-bold" style="font-size: 14px; color: #409eff;">字体大小</label>

                    <el-input-number class="ml-5" v-model="font_size" size="normal" :min="1" :max="100" :step="1"
                        :controls="true" @change="">
                    </el-input-number>
                </div>
                <div class="flex items-center">
                    <el-button type="text" size="default" @click="">返回栏目</el-button>
                    <el-button type="text" size="default" @click="">听写历史</el-button>
                    <el-button type="text" size="default" @click="">百度翻译</el-button>
                    <el-button type="text" size="default" @click="">快捷键提示</el-button>
                    <el-button type="text" size="default" @click="">新手指南</el-button>

                </div>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-card shadow="hover" class="header-body border-transparent ">
                            <template #header>
                                <div>
                                    <span class="text-light-50">听写内容</span>
                                </div>
                            </template>
                            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName"
                                :show-header="false" class="bg-transparent" scrollbar-always-on="true"  >
                                <el-table-column prop="english" label="Date" width="1000">
                                    <template #default="scope">
                                        <div v-if="currentTableCulmn == scope.row.id" class="flex justify-center"
                                            style="flex-direction:column;" @click="handleselct(scope.row)">
                                            
                                            <span v-if="originDisplay" class="mt-3 cursor-pointer text-red-200"
                                                :style="{ fontSize: font_size + 'px' }"
                                                @click="handleaudio(scope.row.audioUrlCdn)">{{ scope.row.text }}</span>
                                            <span v-if="translateDisplay" class="mt-3 text-red-200"
                                                :style="{ fontSize: font_size + 'px' }">{{ scope.row.transZh }}</span>
                                        </div>
                                        <div v-else class="flex justify-center" style="flex-direction:column;"
                                            @click="handleselct(scope.row)">
                                            
                                            <span v-if="originDisplay" class="mt-3 cursor-pointer text-light-50"
                                                :style="{ fontSize: font_size + 'px' }"
                                                @click="handleaudio(scope.row.audioUrlCdn)">{{ scope.row.text }}</span>
                                            <span v-if="translateDisplay" class="mt-3 text-light-50"
                                                :style="{ fontSize: font_size + 'px' }">{{ scope.row.transZh }}</span>
                                        </div>
                                    </template>
                                </el-table-column>

                            </el-table>
                            <audio :src="currentAudioUrl" ref="audioPlayer" ></audio>
                        </el-card>

                    </el-col>

                    <el-col :span="12" :offset="0">
                        <el-card shadow="hover" class="header-body border-transparent ">
                            <template #header>
                                <div>
                                    <span class="text-light-50">输入内容</span>
                                </div>
                            </template>
                            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName"
                                :show-header="false" class="bg-transparent" scrollbar-always-on="true" >
                                <el-table-column prop="english" label="Date" width="1000">
                                    <template #default="scope">
                                        <div class="flex justify-center cursor-pointer" style="flex-direction:column;">
                                            <span class="mt-3 cursor-pointer text-light-50"
                                                :style="{ fontSize: font_size + 'px' }">{{ scope.row.user_input }}</span>
                                                <p class="text-light-50" v-html="scope.row.compare"></p>
                                        </div>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </el-card>
                    </el-col>
                </el-row>

            </el-main>
            <el-footer>
                <el-input class="input-text" v-model="inputdialog" placeholder="请输入当前听到的句子" />
                <el-row :gutter="20" class="mt-10">
                    <el-col :span="7" :offset="0">
                        <div class="radio-operation">
                            <el-icon class="mx-2 cursor-pointer" :size="30" color="#22d3ee" @click="handleleft">
                                <ArrowLeftBold />
                            </el-icon>
                            <el-icon  v-if="audioPauseBoolen==true" class="mx-2 cursor-pointer" :size="30" color="#22d3ee" @click="handlepause">
                                <VideoPause />
                            </el-icon>
                            <el-icon  v-else class="mx-2 cursor-pointer" :size="30" color="#22d3ee" @click="handlepause"><VideoPlay /></el-icon>
                            <el-icon class="mx-2 cursor-pointer" :size="30" color="#22d3ee" @click="handleright">
                                <ArrowRightBold />
                            </el-icon>

                        </div>
                    </el-col>
                    <el-col :span="9" :offset="0">
                        <div>
                            <el-progress :text-inside="true" :stroke-width="22" :percentage="progress" status="warning" />
                        </div>
                    </el-col>
                    <el-col :span="5" :offset="3">
                        <div>
                            <el-button type="success" size="default" @click="compare">提交对比</el-button>
                            <el-button type="success" size="default" @click="">通篇播放</el-button>
                            <el-button type="success" size="default" @click="">音频列表</el-button>
                            <el-button type="success" size="default" @click="">听写设置</el-button>

                        </div>
                    </el-col>
                </el-row>






            </el-footer>
        </el-container>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount  ,watchEffect} from 'vue';
import {getSentensByAudioID,getSentensByAudioIDandUserId} from "~/api/sentences.js";
import {getHighLightDiff} from "~/composables/diff.js"
const originDisplay = ref(true)
const translateDisplay = ref(true)
const font_size = ref(16);
const currentAudioUrl = ref(null)
const audioPlayer = ref(null)
const inputdialog = ref("")
const currentTableCulmn = ref(0)
const audioPauseBoolen=ref(false)
const tableData = ref([])
const progress = ref(0)
const props=defineProps({
    id:Number
})
const compare=()=>{
    tableData.value.map((o)=>{
        if (o.user_input!=""){
            o.compare=getHighLightDiff(o.user_input,o.text)
            return o
        }
        
    })
}
watchEffect(  ()=>{
    if(tableData.value){
        progress.value =Math.ceil( (currentTableCulmn.value ) /( tableData.value.length -1)* 100)
    }
}
)
function searchCurrentData(){
    var result = tableData.value.find(function (item, index, arr) {
        if (item.id == currentTableCulmn.value) {
            return item
        }
    })
    return result
}
const handleleft=()=> {
    currentTableCulmn.value-=1 
    var result=searchCurrentData()
    currentAudioUrl.value=result.audioUrlCdn
    handlePlay()
    audioPauseBoolen.value=true
    
}
const handleright=()=> {
    currentTableCulmn.value+=1 
    var result=searchCurrentData()
    currentAudioUrl.value=result.audioUrlCdn
    if (audioPauseBoolen.value==false){
        handlePlay()
    audioPauseBoolen.value=true
    }
    else{
        handlepause()
    }

    
}

const handlePlay=()=>{
    if (currentAudioUrl.value) {
    }
    else{
        var result = searchCurrentData()
    currentAudioUrl.value=result.audioUrlCdn
    }
    audioPlayer.value.play().then(() => {
              // 音频加载成功
              setTimeout(() => {
                audioPauseBoolen.value=false
              }, audioPlayer.value.duration * 1000);
}).catch((e)=>{
    console.log(e);
    handlePlay()
}).finally(()=>{
    
})

}
const handlepause=()=>{
    if(audioPauseBoolen.value==false){
    audioPlayer.value.pause()
      handlePlay()
    }
    else{
        audioPlayer.value.pause()
    }
    audioPauseBoolen.value=!audioPauseBoolen.value
}

const handleselct = (row) => {
    currentTableCulmn.value = row.id
    var result=searchCurrentData()
    inputdialog.value=result.user_input
}
const onSubmit = () => {
    
    var result = tableData.value.find(function (item, index, arr) {
        if (item.id == currentTableCulmn.value) {
            return item
        }
    })
    console.log(result);
    result.user_input = inputdialog.value;
    inputdialog.value = ""
    currentTableCulmn.value += 1
    audioPauseBoolen.value=false
    var result=searchCurrentData()
    currentAudioUrl.value=result.audioUrlCdn
    handlePlay()
}
const handleaudio = (url) => {
    audioPauseBoolen.value=true
    currentAudioUrl.value = url
    handlePlay()
}
//监听回车事件
function onkeyUP(e) {
    if (e.code == "Enter") {
        onSubmit()
    }
    if(e.code=="Tab"){
        handlepause()
    }
    
}
//添加键盘监听
onMounted(() => {
    document.addEventListener("keyup", onkeyUP)
})
onBeforeUnmount(() => {
    document.removeEventListener("keyup", onkeyUP)
})
let id=9557
const getData=()=>{
    getSentensByAudioID(props.id).then((res)=>{
        tableData.value=res.map(o=>{
            o.compare=""
            return o
        })
        console.log(res);
    })
}
getData()
</script>
<style scoped>
.el-table {
    --el-table-header-bg-color: #134e4a;
    --el-table-tr-bg-color: #134e4a;
    --el-table-header-text-color: #fff;
    --el-table-row-hover-bg-color: #115e59;
}


.el-button--text {

    @apply flex bg-teal-900 items-center shadow-md opacity-90 justify-between rounded-xl;
}

.el-table .hidden-columns {
    visibility: none;
}

.el-table__inner-wrapper::before {
    content: none;
    height: none;
    background-color: none !important;
}

.el-header {
    width: calc(100vw);
    align-items: center;
    @apply flex items-center justify-between border bg-teal-900 border-dark-500;
}

.el-main {
    width: calc(100vw);
    align-items: center;
    height: calc(68vh);
    @apply bg-teal-900 border-dark-100 mt-0;
}

.input-text {
    width: calc(98vw);
    height: calc(10vh);
    @apply bg-green-500;
}

.el-input__inner {
    font-size: large !important;
}

.el-input {
    --el-input-bg-color: #2e4e5e;
    --el-input-text-color: #fdfdfd;
    --el-input-font-size: 50px;
    font-size: x-large;
}


.el-footer {
    width: calc(100vw);
    height: calc(20vh);
    align-items: center;
    top: calc(80vh);
    @apply fixed bg-teal-900 border-dark-100 mt-0;
}

.inputspan {
    font-size: 14px;
    color: #409eff;
}

.el-card {
    width: calc(49vw);
    ;
}

.header-body {
    @apply bg-teal-900;
}</style>