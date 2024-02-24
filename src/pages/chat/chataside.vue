<template>
    <div>
        <div class="chatheader flex justify-between items-center">
            <span>
                <el-badge is-dot class="item" type="success">
                    <el-button type="primary" size="mini" @click="">{{ miniName }}</el-button>
                </el-badge>
            </span>
            <span>
                <el-icon size="20px" class="ml-3 mt-2 text-light-50">
                    <House />
                </el-icon>
                <el-icon size="20px" class="ml-3 text-light-50 cursor-pointer" @click="handleShowSearch">
                    <Search />
                </el-icon>
                <el-icon size="20px" class="ml-3 text-light-50">
                    <Setting />
                </el-icon>
                <el-icon size="20px" class="ml-3 text-light-50 cursor-pointer" @click="handleNewGroup">
                    <Avatar />
                </el-icon>
            </span>
        </div>
        <div class="mainchat">
            <div class=" public_channel chatmenu" @click="publicChannelStatus=!publicChannelStatus">
                Public Channel
            </div>
            <div v-if="publicChannelStatus" v-for="(item, index) in groupChatInfo" :key="index" class="messageBox  " @click="handleSendGroup(item)">
                <el-avatar :src="item.avatar" />
                <span class="text-black-50 ml-4">{{ item.groupName }}</span>
            </div>
            <div class=" public_channel chatmenu" @click="handlePrivateChannelStatus">
                Private Channel
            </div>
            <div v-if="privateChannelStatus" v-for="(item, index) in FriendList" :key="index" class="messageBox  " @click="handleSendUserOrGroup(item)">
                <el-avatar :src="item.avatar" />
                <span class="text-black-50 ml-4">{{ item.nickname }}</span>
            </div>
        </div>
    </div>

    <el-dialog v-model="centerDialogVisible" title="Search Friends" width="30%" center destroy-on-close>
        <div>
            <div>
                Please input the Friend's username or email address
            </div>
            <span class="flex justify-start items-center mt-4">
                <span>Username Or Email</span>
                <el-input class="ml-4" v-model="SearchUserID" placeholder="Input UserID Or Email" size="normal" clearable
                    style="width: 200px;"></el-input>
            </span>
            <div v-if="SearchStatus">
                <el-table :data="tableData" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }">
                    <el-table-column label="Avator" width="100" align="center">
                        <template #default="scope">
                            <el-avatar :src="scope.row.avatar" class="cursor-pointer" :size="50" cover />
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickname" label="Nickname" width="140" align="center" />
                    <el-table-column prop="email" label="Email" align="center" />
                    <el-table-column label="Operations" width="105" align="center">
                        <template #default>
                            <el-button color="#626aef" size="mini" @click="handleAddFriend">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleSearch">
                    Search
                </el-button>
            </span>
        </template>
    </el-dialog>
    <createGroup ref="createGroupRef" :userId="userId"></createGroup>
</template>
<script setup>
import { searchUser } from '~/api/manager.js'
import { requestFriends, addFriends, getAllFriends } from '~/api/chat.js'
import {getGroups} from '~/api/group.js'
import { ref, onBeforeMount } from 'vue';
import { toast } from '~/composables/util'
import createGroup from './createGroup.vue';
//群聊相关信息
const groupChatInfo = ref([])
const publicChannelStatus=ref(true)
const handleSendGroup=(item)=>{
    chatUserOrGroup.value=item
    emit("groupInfo",chatUserOrGroup.value)
}
//新建群聊
const createGroupRef = ref(null)
const handleNewGroup =()=>{
createGroupRef.value.open()
}
const chatUserOrGroup=ref(null)
const emit=defineEmits(['child-event','groupInfo'])
const handleSendUserOrGroup=(item)=>{
    chatUserOrGroup.value=item
    emit("child-event",chatUserOrGroup.value)
}
const props = defineProps({
    userId: Number
})

const handlePrivateChannelStatus=()=>{
    privateChannelStatus.value = !privateChannelStatus.value
}
const FriendList = ref([])
onBeforeMount(() => {
    getAllFriends(props.userId).then(res => {
        FriendList.value = res
    })
    getGroups(props.userId).then(res => {
        groupChatInfo.value = res
        console.log(groupChatInfo.value);
    })
})
const privateChannelStatus = ref(true)
const miniName = ref('Y')
const centerDialogVisible = ref(null)
const SearchUserID = ref(null)
const SearchStatus = ref(false)
const tableData = ref([])
const handleAddFriend = () => {
    requestFriends(props.userId, SearchUserID.value).then(res => {
        toast(res)
    })
}
const handleSearch = () => {
    searchUser(SearchUserID.value).then(res => {
        console.log(SearchUserID.value);
        tableData.value = [res]
        SearchStatus.value = true
    })
}
const handleShowSearch = () => {
    centerDialogVisible.value = true
}
</script>
<style scoped>
.messageBox {
    border: 2px solid black;
    padding: 4px;
    @apply mt-3 ml-4 mr-4 flex items-center cursor-pointer rounded-xl bg-light-50;
}

.chatmenu {
    height: 50px;
    @apply flex items-center;
}

.public_channel {
    border-bottom: 1px solid #d1d5db;

    @apply ml-3 mt-2 text-gray-100 font-serif cursor-pointer;
}

.chatheader {
    height: 50px;
    width: 100%;
    background-color: #111827;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 2px solid #1f2937;
}

.mainchat {
    height: 100%;
}

.el-badge__content.is-fixed.is-dot {
    right: 16px;
}

.el-badge__content.is-dot {
    position: relative;
    height: 8px;
    width: 8px;
    padding: 0;
    right: 16px;
    border-radius: 50%;
    top: 21px;
}

.el-badge__content.is-fixed {
    position: relative;
}

.el-badge__content--danger {
    background-color: #40ff51;
}
</style>