<template>
    <div class="inputArea flex justify-center items-center">
        <el-input class="chatinput  " v-model="input" placeholder="Message input here">
            <template #prepend>
                <el-icon class="text-black" size="20">
                    <FolderOpened />
                </el-icon>
            </template>
            <template #append>
                <el-icon class="text-black cursor-pointer" size="20" @click="handleSend"><Select /></el-icon>
            </template>
        </el-input>

        <!-- <el-button class="sendButton" type="primary" size="default" @click="handeSend">Send</el-button> -->
    </div>
</template>
<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { saveMessageRecord } from '~/api/chat.js'
import { sendMessage } from '~/api/group.js'
const groupStatus = ref(false)
const emit = defineEmits(['footer-event'])
const props = defineProps(
    {
        userInfo: Object,
        UserOrGroup: {
            type: Object,
            default: () => ({
                nickname: "Yang",
            })
        },
        FooterWebsocket: Object,
        groupInfo: Object
    },


)
const input = ref("")
let param = {};
const handleSend = () => {
    if (!groupStatus) {
        param['username'] = props.userInfo['userId']
        param['message'] = input.value;
        param['type'] = '私发';
        param['tousername'] = props.UserOrGroup.userId
        props.FooterWebsocket.send(JSON.stringify(param))
        storeMessage()
    }
    else {
        param['username'] = props.userInfo['userId']
        param['message'] = input.value;
        param['type'] = '群发';
        param['tousername'] = props.groupInfo.groupId
        props.FooterWebsocket.send(JSON.stringify(param))
        storeMessage()
    }

}
function storeMessage() {
    if (!groupStatus) {
        if (props.UserOrGroup != null) {
            saveMessageRecord(props.userInfo['userId'], props.UserOrGroup.userId, input.value).then((res) => {
                emit("footer-event", "An New message was sended")
            })
        }
    }
    else {
        if (props.groupInfo != null) {
            sendMessage({
                "userId": props.userInfo['userId'],
                "groupId": props.groupInfo.groupId,
                "content": input.value
            }
            ).then((res) => {
                emit("footer-event", "An group New message was sended")
            })
        }
    }

}
defineExpose({
    groupStatus
})
</script>
<style scoped>
/* :deep(.el-input__wrapper) {
    border-radius: 95px;
    border: 1 solid black !important;
    box-shadow: 0 0 0 0px;
}

:deep(.el-input-group__append) {
    border-radius: 95px;
    border: 0;
    box-shadow: 0 0 0 0px;
}
/* :deep(el-input-group__prepend){
    border-radius: 95px;
    border: 0;
    box-shadow: 0 0 0 0px;
} */

:deep(.el-input-group__append) {
    box-shadow: 0 1px 0 0 var(--el-input-border-color) inset, 0 -1px 0 0 var(--el-input-border-color) inset, -1px 0 0 0 var(--el-input-border-color) inset;
    @apply bg-light-50;
}

.chatinput {
    width: 40%;
    height: 60px;
}
</style>