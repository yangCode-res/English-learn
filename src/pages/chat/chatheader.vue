<template>
    <div class="headerBox">
        <span class="header-left" v-if="!groupStatus">
            <el-icon size="25">
                <Star />
            </el-icon>
            <el-avatar class="ml-2"
                :src="UserOrGroup ? UserOrGroup.avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
            <span class="flex flex-col ml-2">
                <small class="text-black">@{{ UserOrGroup ? UserOrGroup.nickname : "DefaultName" }}</small>
                <span>
                    <span class="circle" :style="circleStyle"></span>
                    <small class="ml-1">Online</small>
                </span>
            </span>
        </span>
        <span class="header-left" v-if="groupStatus">
            <el-icon size="25">
                <Star />
            </el-icon>
            <el-avatar class="ml-2"
                :src="groupChatInfo.avatar" />
            <span class="flex flex-col ml-2">
                <small class="text-black">@{{ groupChatInfo.groupName }}</small>
                <span>
                    <span class="circle" :style="circleStyle"></span>
                    <small class="ml-1">Online</small>
                </span>
            </span>
        </span>
        <span class="header-right">
            <el-icon class="m-2 cursor-pointer" @click="handleMainToBottom">
                <Bottom />
            </el-icon>
            <el-icon class="m-2 cursor-pointer">
                <UserFilled />
            </el-icon>
            <el-icon class="m-2 cursor-pointer" @click="handleCall">
                <Phone />
            </el-icon>
            <el-icon class="m-2 cursor-pointer">
                <Setting />
            </el-icon>

        </span>
    </div>
    <CellPhone ref="cellPhoneRef" :UserOrGroup="callingUserInfo" @close="handleClose"></CellPhone>
    <callingRequest ref="callingRef" :UserOrGroup="callingUserInfo" @close="callingAgree"></callingRequest>
    <audio ref="remoteAudio" autoplay></audio>
</template>

<script setup>
import { computed, ref, onMounted,watch } from 'vue';
import Peer from 'peerjs';
import {searchUser} from '~/api/manager.js'
import CellPhone from './cellphone.vue';
import callingRequest from './callingRequest.vue'
const remoteAudio = ref(null)
const callingRef=ref(null)
const callingUserInfo=ref(null)
const groupStatus=ref(false)
defineExpose({
    groupStatus})
let peer
let localStream
let callActive=false
let currentCall= null
async function startCall2() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const call = peer.call(props.CallingRequestVisable.from.toString() ,localStream); // 这里的 'remote-peer-id' 需要替换成实际的远程 Peer ID
        currentCall=call
        call.on('stream', (remoteStream) => {
            remoteAudio.value.srcObject = remoteStream;
        });
        callActive=true
    } catch (error) {
        console.error('获取媒体设备错误:', error);
    }
}
function initPeer() {
    peer = new Peer(props.userInfo['userId']);

    peer.on('open', (id) => {
    });

    peer.on('call', (call) => {
        call.answer(localStream);
        call.on('stream', (remoteStream) => {
            remoteAudio.value.srcObject = remoteStream;
        });
    });
}
onMounted(()=>{
    initPeer()
})


const props = defineProps({
    UserOrGroup: {
        type: Object,
        default: () => ({
            nickname: "Yang",
        })
    },
    FooterWebsocket: Object,
    userInfo: Object,
    AudioBuffer: Float32Array,
    CallingRequestVisable:Object,
    groupChatInfo:Object,
})
watch(() => props.CallingRequestVisable, (old,newValue) => {
if(old.visiable==true){
    
    searchUser(old.from).then((res)=>{
        callingUserInfo.value=res
        callingRef.value.open()
    }
)
} 


}
)
//语音通话设置
const handleClose=()=>{
    if (currentCall) {
        currentCall.close();
      }

      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }

      callActive = false;
      emit('callingClose')
}
const callingAgree = () => {
    cellPhoneRef.value.open()
    startCall2()
}



const cellPhoneRef = ref(null);
const handleCall = () => {
    if(!groupStatus.value){
        let param = {}
        param['username'] = props.userInfo['userId']
        param['message'] = "请求电话沟通"
        param['type'] = '语音';
        param['tousername'] = props.UserOrGroup.userId
        props.FooterWebsocket.send(JSON.stringify(param));
    }
  else{
        let param = {}
        param['username'] = props.userInfo['userId']
        param['message'] = "请求电话沟通"
        param['type'] = '群体语音';
        param['tousername'] = props.groupChatInfo.groupId
        props.FooterWebsocket.send(JSON.stringify(param));
  }
    // cellPhoneRef.value.open()
    // startCall2()
}
const emit = defineEmits(['header-event','callingClose'])
const handleMainToBottom = () => {
    emit('header-event')
}
const color = ref('green');
const circleStyle = computed(() => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color.value,
    display: 'inline-block'
}));



</script>

<style scoped>
.headerBox {
    @apply flex items-center justify-between mt-2;
}

.header-left {
    @apply flex items-center;
    /* 确保左侧内容也是flex布局 */
}

.ml-2 {
    margin-left: 8px;
    /* 调整间距 */
}
</style>
