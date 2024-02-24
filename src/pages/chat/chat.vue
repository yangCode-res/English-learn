<template>
  <div class="common-layout ">
    <el-container class="overflow-auto">
      <el-aside class="elaside" width="300px">
        <chataside :userId="userInfo['userId']" @child-event="handleChildEvent" @groupInfo="handleGroupEvent"></chataside>
      </el-aside>
      <el-container>
        <el-header class="elheader">
          <chatheader ref="chatHeaderComponent" :UserOrGroup="PassUserOrObject" @header-event="handleToBottom"
            @vue:mounted="handleToBottom" :userInfo="userInfo" :FooterWebsocket="websocket" :AudioBuffer="audioBuffer"
            :CallingRequestVisable="callingRequestVisiable"
            @callingClose="callingRequestVisiable = { visiable: false, from: null }" :groupChatInfo="groupInfo"></chatheader>
        </el-header>

        <el-container>
          <el-main class="elmain">
            <chatmain :userInfo="userInfo" :UserOrGroup="PassUserOrObject" ref="chatMainComponent" :groupInfo="groupInfo">
            </chatmain>
          </el-main>
          <el-footer class="elfooter">
            <chatFooter ref="chatFooterComponent" :userInfo="userInfo" :UserOrGroup="PassUserOrObject"
              @footer-event="handleFooterEvent" :FooterWebsocket="websocket" :groupInfo="groupInfo"></chatFooter>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref, computed, h, onMounted } from 'vue';

import chataside from './chataside.vue';
import chatFooter from './chatFooter.vue';
import chatheader from './chatheader.vue';
import chatmain from './chatmain.vue';
import { ElNotification } from 'element-plus'
//群聊信息
const chatFooterComponent = ref(null)
const chatHeaderComponent = ref(null)
const groupInfo = ref(null)
const handleGroupEvent = (data) => {
  groupInfo.value = data;
  chatMainComponent.value.groupStatus = true
  chatHeaderComponent.value.groupStatus = true
  chatMainComponent.value.selectStatus = false
  chatFooterComponent.value.groupStatus = true
}
//peer语音通话
const userInfo = ref([])
const userId = ref(null)
const chatMainComponent = ref(null)
const audioBuffer = ref(null)
let websocket
const callingRequestVisiable = ref(false)

// const websocket = ref(null)
async function getinfo() {
  userInfo.value = JSON.parse(localStorage.getItem('userInfo'));
}
async function connectWebSocket() {
  await getinfo()
  userId.value = userInfo.value["userId"]
  websocket = new WebSocket(`ws://localhost:8080/websocket/` + userId.value)
  websocket.onopen = function (event) {
    console.log("建立连接" + event);
  }
  websocket.onmessage = function (event) {
    let data = JSON.parse(event.data)
    if (data.messageType == 4) {
      ElNotification({
        title: 'You have a new message!',
        message: h('i', { style: 'color: teal' }, data.textMessage),
      })
    }
    if (data.messageType == 5) {
      ElNotification({
        title: 'You have a new message!',
        message: h('i', { style: 'color: teal' }, data.textMessage),
      })
      callingRequestVisiable.value = { visiable: true, from: data.username }
    }

    updateMessage()
  }
}

connectWebSocket()

function updateMessage() {
  setTimeout(() => {
    chatMainComponent.value.queryChatRecordsRemote();
  }, 4000);
}




const PassUserOrObject = ref(null)
function handleChildEvent(data) {
  if (!data) {
    console.log("没有数据");
  }
  PassUserOrObject.value = data
  chatMainComponent.value.selectStatus = true
  chatMainComponent.value.groupStatus = false
  chatHeaderComponent.value.groupStatus = false
  chatFooterComponent.value.groupStatus = false
}
function handleFooterEvent(message) {
  if (message === 'An New message was sended') {
    chatMainComponent.value.queryChatRecordsRemote()
  }
  else if (message == 'An group New message was sended') {
    chatMainComponent.value.queryGroupMessageRemote()
  }

}
const handleToBottom = () => {
  chatMainComponent.value.scrollToBottom()
}
</script>
<style scoped>
.common-layout {
  position: absolute;
  left: 40px;
  height: 90%;
  width: 95%;
  @apply bg-red-50;
}

.elaside {
  height: 90vh;
  background-color: #111827;
}

.elheader {
  position: relative;
  height: 5vh;
  @apply bg-gray-50;
}

.elheader {
  border-bottom: 2px solid #f5f5f4;
  @apply bg-light-50;
}

.elmain {
  height: 80vh;
  padding-top: 0%;
  @apply bg-light-50;
}

.elfooter {
  height: 10%;
  padding: 0%;
  @apply bg-light-50;
}
</style>
