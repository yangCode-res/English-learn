<template>
    <el-scrollbar ref="scrollbarRef" max-height="800px" >
        <div v-if="selectStatus && !groupStatus" ref="innerRef">
            <div v-for="(item, index) in chatRecordList" :key="index"
                :class="{ 'my-message': item.isMe, 'other-message': !item.isMe }">
                <span v-if="item.isMe" class="m-2 main-messageBox">{{ item.message }}</span>
                <el-avatar :size="50" :src="item.isMe ? userInfo['avatar'] : UserOrGroup.avatar" />
                <span v-if="!item.isMe" class="m-2 main-messageBox">{{ item.message }}</span>
            </div>
        </div>
        <div v-if="groupStatus && !selectStatus" ref="innerRef">
            <el-row>
                <el-col :span="21" :offset="0">
                    <div v-for="(item, index) in chatRecordList" :key="index"
                        :class="{ 'my-message': item.isMe, 'other-message': !item.isMe }">
                        <span v-if="item.isMe" class="m-2 main-messageBox">{{ item.content }}</span>
                        <el-avatar :size="50" :src="item.isMe ? userInfo['avatar'] : item.avatar" />
                        <span v-if="!item.isMe" class="m-2 main-messageBox">{{ item.content }}</span>
                    </div>
                </el-col>
                <el-col :span="3" :offset="0" >
                    <el-affix :offset="120">
                        <div class="fixed-element">
                        <div class="announcement"><span class="font-serif">Group announcement</span></div>
                        <div class="members  ">
                            <div class="font-serif members-name mb-2">Group members</div>
                            <div class="flex flex-col justify-start">
                                <div v-for="(item, index) in groupUserInfo" :key="index" class="messageBox  ">
                                    <el-avatar :src="item.avatar" />
                                    <span class="text-black-50 ml-4 font-serif">{{ item.nickname }}</span>
                                    <span><el-button type="text" size="large" @click="handleAddFriend(item.userId)">+</el-button>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    </el-affix>
                  

                </el-col>
            </el-row>


        </div>
        <el-empty v-if="!selectStatus && !groupStatus" description="Welcome to EngHub" ref="innerRef" />
    </el-scrollbar>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { queryChatRecords,requestFriends } from '~/api/chat.js'
import { getUserByGroupId, getChatHistory } from '~/api/group.js'
import { toast } from '~/composables/util'
const selectStatus = ref(false)
const groupStatus = ref(false)
const groupUserInfo = ref([])
const handleAddFriend = (userId) => {
    requestFriends(props.userInfo['userId'], userId).then(res => {
        toast(res)
    })
}
const props = defineProps({
    UserOrGroup: Object,
    userInfo: Object,
    groupInfo: Object
})
const scrollbarRef = ref(null);
const innerRef = ref(null);
const scrollToBottom = () => {
    scrollbarRef.value.setScrollTop(innerRef.value.clientHeight)
}
const chatRecordList = ref([])
const queryChatRecordsRemote = () => {
    if (props.UserOrGroup != null) {
        queryChatRecords(props.userInfo['userId'], props.UserOrGroup.userId).then(res => {
            res.map((item) => {
                if (item.senderUserId != props.userInfo['userId']) {
                    item['isMe'] = false
                }
                else {
                    item['isMe'] = true
                }
            })
            chatRecordList.value = res
            scrollToBottom()
        })
    }
}
const queryGroupMessageRemote = () => {
    if (props.groupInfo != null) {
        getChatHistory(props.groupInfo.groupId).then(res => {
            res.map((item) => {
                if (item.userId != props.userInfo['userId']) {
                    item['isMe'] = false
                }
                else {
                    item['isMe'] = true
                }
                const matchItem = groupUserInfo.value.find(itemUser => itemUser.userId == item.userId)
                if (matchItem) {
                    item.avatar = matchItem.avatar
                }
            }
            )
            chatRecordList.value = res
            console.log(chatRecordList.value);
            scrollToBottom()

        }
        )
    }
}
watch(() => props.UserOrGroup, (newVal, oldVal) => {
    queryChatRecordsRemote();
})
watch(() => props.groupInfo, (newVal, oldVal) => {
    getUserByGroupId(props.groupInfo.groupId).then(res => {
        groupUserInfo.value = res
        queryGroupMessageRemote()
    })
})
onMounted(() => {
    queryChatRecordsRemote();
    scrollToBottom()
})
defineExpose({
    queryChatRecordsRemote,
    scrollToBottom,
    selectStatus,
    groupStatus,
    queryGroupMessageRemote
})

</script>
<style scoped>
.announcement {
    padding: 0%;
    border: 2px solid #f5f5f4;
    border-top: 0cap;
    border-right: 0;
    height: 300px;
    @apply flex justify-center;

}

.members-name {
    width: 100%;
    display: block;
}

.members {
    padding: 0%;
    border: 2px solid #f5f5f4;
    border-top: 0cap;
    border-right: 0;
    height: 300px;
    display: block;
    text-align: center;
}

.my-message {
    @apply flex justify-end;
}

.other-message {
    @apply flex justify-start;
}

.messageBox {
    border: 2px solid black;
    padding-right: 4px;
    justify-content: space-between;
    @apply mt-1 ml-2 mr-1 flex items-center cursor-pointer rounded-xl bg-light-50;
}

.main-messageBox {

    border: 1px solid #ccc;
    max-width: 300px;
    /* 最大宽度 */
    padding: 10px;
    /* 内边距 */
    border: 1px solid #ccc;
    /* 边框样式 */
    word-wrap: break-word;
    /* 自动换行 */
    margin: 10px;
    /* 外边距 */
    @apply bg-gray-50 rounded-xl;

}


</style>