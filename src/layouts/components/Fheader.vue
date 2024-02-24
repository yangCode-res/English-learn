<template>
    <div class="f-header">
        <span class="logo">
            <el-tooltip class="logoimage" content="Return Index" placement="bottom" effect="dark">
                <el-avatar size="large" class="w-[40px] h-[40px]"
                    src="https://english-1309979517.cos.ap-nanjing.myqcloud.com/logo.png" />
            </el-tooltip>
        </span>

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">

            <el-menu-item index="/l">
                <span class="text-light-400 text-xl font-serif"> Dialogue Platform</span>
            </el-menu-item>
            <el-sub-menu index="2" class="text-light-50">
                <template #title>
                    <span class="text-light-400 text-xl font-serif">Exercise</span></template>
                <div class="bg-light-50">
                    <el-menu-item index="/worddictation">Word dictation</el-menu-item>
                    <el-menu-item index="/wordList">Sentence dictation</el-menu-item>
                    <el-menu-item index="/chat">Char room</el-menu-item>
                    <el-sub-menu index="2-4" class="bg-light-50">
                        <template #title>Interest English</template>
                        <div class="bg-light-50">
                            <el-menu-item index="/shortStory/main">Learning vocabulary in short stories</el-menu-item>
                            <el-menu-item index="/songs">Listening to songs and learning vocabulary</el-menu-item>
                        </div>

                    </el-sub-menu>
                </div>

            </el-sub-menu>
        </el-menu>


        <div class=" flex items-center " style="margin-left: auto;">

            <span class="mr-6 cursor-pointer" v-if="messageCount > 0">
                <el-badge :value=messageCount class="item">
                    <el-icon class="text-light-50 cursor-pointer" size="34px" @click="handleMessageVisable">
                        <Message />
                    </el-icon>
                </el-badge>
            </span>
            <span class="mr-6 cursor-pointer" v-else>
                <el-icon class="text-light-50" size="34px" @click="handleMessageVisable">
                    <Message />
                </el-icon>
            </span>
            <span>
                <el-dropdown>
                    <el-avatar :src="userInfo['avatar']" class="cursor-pointer" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleSettingInfo">Setting Info</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
                
            </span>
            <span class="ml-6">
                <el-button v-if="!Logstatus" class="text-light-50 w-[60px] mr-4 text-xl font-serif" type="text" size="large"
                    @click="handleLogin">Sign in</el-button>
                <el-button v-if="!Logstatus"
                    class="bg-transparent w-[80px] h-[30px] text-light-500 mr-8  text-xl font-serif" size="default"
                    @click="handleSignup">Sign up</el-button>
                <el-button v-else class="bg-transparent w-[80px] h-[30px] text-light-500 mr-8  text-xl font-serif"
                    size="default" @click="handleSignout">Sign out</el-button>
            </span>


        </div>

    </div>
    <div class="messageDialog">
        <el-dialog v-model="messageDialog" title="Notification" width="20%" show-close="false">
            <div v-for="(item, index) in  messageArray" :key="index" class="flex items-center massageBox"
                @click="handleSelectMessage(item.notificationType, item.referenceId, item.latestMessage, item.nickname)">
                <el-avatar :src="item.avatar" class="cursor-pointer" :size="50" cover />
                <div class="smallBox ml-3">
                    <span class="text-light-50">
                        {{ item.nickname }}
                    </span>
                    <span>
                        {{ item.latestMessage }}
                    </span>
                </div>
                <span>
                    <el-badge :value=item.unreadCount class="item ml-6">
                        <el-icon class="text-red-600" size="20px">
                            <Bell />
                        </el-icon>
                    </el-badge>
                </span>
            </div>
        </el-dialog>
    </div>
    <div>
        <el-dialog v-model="MessageShow" :title=selectMessageTip width="15%">
            <span>{{selectMessageContent}}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="MessageShow = false">No</el-button>
                    <el-button type="primary" @click="AgreeFriendRequest">
                        Yes
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, watch, onBeforeMount } from 'vue';
import { useRouter, } from 'vue-router'
import { unreadMessages ,markMessageRead} from '~/api/chat.js'
import { getToken, removeToken } from "~/composables/auth"
import { addFriends } from '~/api/chat.js'
import { toast } from '~/composables/util'

//修改个人信息
const handleSettingInfo=()=>{
    router.push("/userInfo")
}
const token = ref(getToken())
const router = useRouter()
const messageDialog = ref(false);
const MessageShow = ref(false);
const selectMessageTip = ref("")
const selectMessageContent = ref("")
const selectMessageReferenceId=ref(null)
const userInfo = ref([])
const getinfo = () => {
    userInfo.value = JSON.parse(localStorage.getItem('userInfo'))
}
getinfo()
const AgreeFriendRequest=()=>{
    console.log(userInfo.value['userId'],selectMessageReferenceId.value);
    addFriends(userInfo.value['userId'], selectMessageReferenceId.value).then(res=>{
        addFriends(selectMessageReferenceId.value,userInfo.value['userId']).then(res=>{
        
    })
    }
    )
    markMessageRead(selectMessageReferenceId.value,userInfo.value['userId'],"friend_request").then(res=>{
        const userId = JSON.parse(localStorage.getItem('userInfo'))['userId']
    unreadMessages(userId).then(res => {
        messageArray.value = res
        messageCount.value = messageArray.value.reduce((sum, notification) => {
            return sum + notification.unreadCount;
        }, 0);
        MessageShow.value=false
        toast("SUCCESS")
    })

    })

}
const handleSelectMessage = (type, referenceId, message, nickname) => {
    if (type == 'friend_request') {
        MessageShow.value = true
        selectMessageTip.value = "Friend request"
        selectMessageContent.value = "Do you agree to " + nickname + " 's friend request";
        selectMessageReferenceId.value=referenceId
    }
}
const handleMessageVisable = () => {
    messageDialog.value = true
}

const messageArray = ref([
])
onBeforeMount(() => {
    const userId = JSON.parse(localStorage.getItem('userInfo'))['userId']
    unreadMessages(userId).then(res => {
        messageArray.value = res
        messageCount.value = messageArray.value.reduce((sum, notification) => {
            return sum + notification.unreadCount;
        }, 0);
    })
})
const Logstatus = ref(false)
const messageCount = ref()
const checkLogstatus = () => {
    if (token) {
        Logstatus.value = true
    } else {
        Logstatus.value = false
    }
}
checkLogstatus()
watch(token, checkLogstatus)

const handleLogin = () => {
    router.push("\login")
}
const handleSignout = () => {
    removeToken()
    token.value = getToken()
    router.push("\l")
}
const handleSignup = () => {
    router.push("\signup")
}
const handleSelect = (e) => {
    router.push(e)
}

</script>
<style scoped>
.massageBox {
    /* border: #9ca3af solid 0.5px; */
    border-radius: 10px;
    padding: 4px;
    @apply cursor-pointer;
}

.massageBox:hover {
    background-color: #dde1e3;
}

.smallBox {
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
}

:deep(.el-dialog) {
    background-color: #231f1f;
    position: absolute;
    top: -10%;
    right: 10px;
    @apply text-light-50;
}

:deep(.el-dialog__title) {
    @apply text-light-50;
}

:deep(.el-dialog__header) {
    border-bottom: 0.5px solid #9ca3af;
}

:root {
    --el-menu-hover-bg-color: null;
    --el-menu-bg-color: null;
}

/* .el-menu-item{
    @apply bg-light-100;
} */
.el-menu-item:hover span {
    @apply text-red-300;
}

.el-sub-menu:hover span {
    @apply text-red-300;
}

.el-menu--horizontal.el-menu {
    border-bottom: none;
}

.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
}

.el-menu {
    border-bottom: none;
    width: 275px;
    height: 64px;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.1);
    /* 黑色背景，20% 的透明度 */
    @apply border-current;
    /* 其他样式保持不变 */
}

.f-header {
    margin-left: 0 px;
    @apply flex items-center fixed top-0 left-0 right-0 m-0;
    height: 64px;
    z-index: 1000;
}

.logo {
    width: 50px;
    @apply flex items-center font-thin ml-4;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    size: 30;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64 px;
    cursor: pointer;
    @apply felx justify-center items-center mx-5
}
</style>