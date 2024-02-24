<template>
    <div class="mt-5">
        <audio :src="songInfo.musicFilePath" ref="audioPlayer" @timeupdate="updateProgress"></audio>
        <span class="ml-4 flex items-center">

            <el-image class="rounded-lg cursor-pointer" style="width: 63px; height: 63px"
                src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' fit="fill"
                @click="playStatus = !playStatus" />
            <span class="flex flex-col ml-3">
                <small class="text-gray-600 text-xl" style="white-space: nowrap;">{{ songInfo.title }}</small>
                <small>{{ songInfo.artistName }}</small>
            </span>
            <span class="flex flex-col ml-160">


                <span>
                    <el-row :gutter="20">
                        <el-col :span="6" :offset="4"> <el-icon size="25px">
                                <ArrowLeftBold />
                            </el-icon></el-col>
                        <el-col :span="6" :offset="0">
                            <el-icon v-if="audioPauseBool" size="25px" @click="handlePause" class="cursor-pointer">
                                <VideoPause />
                            </el-icon>
                            <el-icon v-if="!audioPauseBool" size="25px" @click="handlePause" class="cursor-pointer">
                                <VideoPlay />
                            </el-icon>

                        </el-col>
                        <el-col :span="6" :offset="0"><el-icon size="25px">
                                <ArrowRightBold />
                            </el-icon></el-col>
                    </el-row>



                </span>
                <span class=" flex items-center">

                    <small class="text-gray-300">{{ currentTime }}</small>
                    <el-progress class="ml-3" :percentage="playbackPercentage" status="exception">
                        <small class="text-gray-300">{{ songInfo.duration }}</small>
                    </el-progress>

                </span>

            </span>
            <span class="flex  ml-180">
                <div class="slider" v-if="volumeStatus" >
                    <el-slider  v-model="volumeValue" vertical height="100px" @change="handleVolumeChange" />
                    <el-divider  class="divider"/>
                    <small class="text-black font-serif text-lg volumeNumber">{{ volumeValue }}</small>
                </div>
                
                <el-icon size="25px" class="cursor-pointer" >
                    <Microphone @click="volumeStatus = !volumeStatus" />
                </el-icon>
                <el-icon class="ml-3" size="25px">
                    <List />
                </el-icon>
            </span>
        </span>
    </div>

    <div class="play" v-if="playStatus">
        <el-row>
            <el-col :span="12" :offset="2">
                <div class="outer-circle">
                    <div class="inner-circle">
                        <img src="https://english-1309979517.cos.ap-nanjing.myqcloud.com/6455d1bfafd151cd19db3c2a744b6bf.jpg"
                            alt="Inner Image" />
                    </div>
                </div>
            </el-col>
            <el-col :span="8" :offset="2">
                <div class="playTitle">
                    <p class="text-black-300 text-4xl  font-sans">{{songInfo.title}}</p>
                <p> 歌手:{{ songInfo.artistName }}&nbsp; &nbsp;  &nbsp; 专辑:{{ songInfo.albumTitle }}</p>
                </div>
                
                <el-scrollbar height="50vh" class="lyric" ref="scrollbarRef">
                    <div ref="innerRef" >
                        <div v-for="(line, index) in lyric" :key="index"  :class="index===currentLyricIndex ? 'active' : 'noActive'"  >
                        {{ line.text }}
                    </div>
                    </div>
                   
                </el-scrollbar>
            </el-col>
        </el-row>



    </div>
</template>
<script setup>
import { ref, watch,computed,onMounted  ,onBeforeUnmount} from 'vue';
import { getSongLyric } from '~/api/song.js'
//音量调节
const volumeStatus=ref(false)
const volumeValue=ref(0.5)
const handleVolumeChange=()=>{
    console.log("volumeValue",volumeValue.value)
    audioPlayer.value.volume=volumeValue.value/100
}
//播放器
let currentAudioUrl = ref('')
const searchCurrentData = async () => {
    let res = await getSongLyric(props.songInfo.id)
    return res
}
const audioPlayer = ref(null)
const audioPauseBool = ref(true)
const playbackPercentage = ref(0)
const currentTime = ref('')
const lyricTime = ref(0)
const playStatus = ref(false)
const props = defineProps({
    songInfo: Object
})
const lyric = ref({})
const handlePlay = () => {
    if (props.songInfo) {
    }
    else {
        var result = searchCurrentData()
        currentAudioUrl.value = result.audioUrlCdn
    }
    audioPlayer.value.play().then(() => {
        // 音频加载成功
        setTimeout(() => {
            audioPauseBool.value = false
        }, audioPlayer.value.duration * 1000);
    }).catch((e) => {
        console.log(e);
        handlePlay()
    }).finally(() => {

    })
}
const handlePause = () => {
    console.log(props.songInfo);
    if (audioPauseBool.value == false) {
        audioPlayer.value.pause()
        handlePlay()
    }
    else {
        audioPlayer.value.pause()
    }
    audioPauseBool.value = !audioPauseBool.value
}
const updateProgress = () => {
    if (audioPlayer.value) {
        const current = audioPlayer.value.currentTime;
        lyricTime.value = current
        currentTime.value = formatTime(current);
        const duration = audioPlayer.value.duration;
        playbackPercentage.value = (current / duration) * 100;
    }
};


function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}
//歌词解析
const scrollbarRef =ref(null)
const innerRef=ref(null)
function parseLyrics(lyrics) {
    const lines = lyrics.split('\n');
    const pattern = /\[(\d{2}):(\d{2}).(\d{2})\](.*)/;
    return lines.map(line => {
        const result = pattern.exec(line);
        if (!result) return null;
        return {
            time: parseInt(result[1]) * 60 + parseInt(result[2]) + parseInt(result[3]) / 100,
            text: result[4].trim(),
        };
    }).filter(line => line !== null);
}
// 计算当前应该显示的歌词行

const currentLyricIndex = computed(() => {
    if (!Array.isArray(lyric.value)) {
        return -1; // 或其他合理的默认值
    }
    const index = lyric.value.findIndex((line, index) => {
        const nextLineTime = lyric.value[index + 1]?.time ?? Infinity;
        return lyricTime.value >= line.time && lyricTime.value < nextLineTime;
    });
    return index;
});
// watch(currentLyricIndex,()=>{
//     console.log(currentLyricIndex);
// })
watch(() => props.songInfo, () => {
    getSongLyric(props.songInfo.songId).then(res => {
        lyric.value = parseLyrics(res.content)
    }
    )
})
//监听回车事件
function onkeyUP(e) {
    if (e.code == "Enter") {
        onSubmit()
    }
    if(e.code=="Tab"){
        handlePause()
    }
    
}
//添加键盘监听
onMounted(() => {
    document.addEventListener("keyup", onkeyUP)
})
onBeforeUnmount(() => {
    document.removeEventListener("keyup", onkeyUP)
})

const lineHeight = 50; // 每行歌词的高度

watch(currentLyricIndex, (newIndex) => {
  if (newIndex !== -1) {
    const containerHeight = scrollbarRef.value.$el.clientHeight; // el-scrollbar容器的高度
    const targetScrollTop = newIndex * lineHeight - containerHeight / 2 +lineHeight  // 计算滚动的目标位置
    scrollbarRef.value.setScrollTop(targetScrollTop); // 更新滚动位置
  }
});

</script>
<style scoped>
.volumeNumber{
    position: relative;
    bottom: -10%;
}
.divider{
    position: relative;
    bottom: -10%;
}
.slider{
    padding-top: 10px;
    float: left;
    z-index: 1100;
    height: 160px;
    position: absolute;
    bottom:-50px;
    right: 100px;
    @apply bg-blue-200 rounded-lg flex flex-col items-center;
;
}
:deep(.el-divider){
    margin: 0;
}
.active {
  @apply text-black font-bold text-2xl;
}
.noActive{
    @apply text-gray-500 text-xl;
}
.playTitle{
    position: relative;
    top: 25%;
}
.play {
    position: absolute;
    top: 0vh;
    left: 0vh;
    width: 100%;
    z-index: 1000;
    height: 101%;
    background: linear-gradient(to bottom, #d3d3d3, #fdfdfd);
}
.lyric{
    position: relative;
    top: 30%;
}
:deep(.el-progress) {
    width: 380px;
}

:deep(el-progress__text) {
    display: none;
}

:deep(.el-drawer.btt) {
    width: none;
}

:deep(.el-drawer) {
    width: 95%;
    left: 38px;
    right: 40px;
    bottom: 30px;
}

.outer-circle {
    position: relative;
    width: 430px;
    /* 外圈的大小 */
    height: 430px;
    border-radius: 50%;
    border: 15px solid #d3d3d3;
    background: radial-gradient(circle, #000 60%, #777 70%, #333 85%, #000 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 35%;
    left: 30%;
}

.inner-circle {
    position: relative;
    width: 360px;
    /* 内圈图片的大小，应小于外圈大小 */
    height: 360px;
    border-radius: 50%;
    overflow: hidden;
    /* 确保图片不会超出这个圆形区域 */
}

.inner-circle img {
    width: 100%;
    height: auto;
    animation: rotate 40s linear infinite;
    /* 应用旋转动画 */
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
.lyric div {
  height: 50px; /* 或其他固定高度 */
}
</style>