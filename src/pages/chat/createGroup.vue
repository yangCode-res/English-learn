<template>
    <div>
        <el-dialog v-model="createGroupVisible" title="CreateGroup" width="40%" :before-close="handleClose" destroy-on-close draggable>
            <div class="flex flex-col">
                <span class="text-purple-500 font-serif text-lg ">Group Name</span>
            <el-input v-model="groupName" placeholder="Group Name" class="mt-4" />
            <span class="text-purple-500 font-serif text-lg mt-4">Select Avatar</span>
            <el-input v-model="avatarUrl" placeholder="avatarUrl" class="mt-4" />
            <span class="text-purple-500 font-serif text-lg mt-4">Select Friends</span>
            
            </div>
            
            
            <el-transfer v-model="multipleSelection" :data="FriendList" :props="{key:'userId',label:'nickname'}" class="mt-4" >
                <template #default="{ option }">
                    <div class="messageBox  ">
                            <el-avatar :src="option.avatar" />
                            <span class="text-black-50 ml-4">{{ option.nickname }}</span>
                        </div>
                </template>
            </el-transfer>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="createGroupVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleCreateGroup">
                        Create Now
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getAllFriends } from '~/api/chat.js'
import { createGroup } from '~/api/group.js'
import { toast } from '~/composables/util'
const groupName = ref('')
const avatarUrl = ref('')
const handleCreateGroup=()=>{
    let data={}
    data['groupName']=groupName.value
    data['avatarUrl']=avatarUrl.value
    multipleSelection.value.push(props.userId)
    data['userIds']=multipleSelection.value
    createGroup(data).then((res)=>{
        toast("success")
        createGroupVisible.value=false
    })

}
const FriendList = ref(null)
const multipleSelection = ref([])

const props = defineProps({
    userId: Number
});

const initGroupData = () => {
    getAllFriends(props.userId).then((res) => {
        FriendList.value = res
    })
}
const createGroupVisible = ref(false)
const open = () => {
    createGroupVisible.value = true;

}
const close = () => {
    createGroupVisible.value = false;
}
defineExpose({
    open,
    close
})
onMounted(() => {
    initGroupData();
})
</script>
<style scoped>
.messageBox {
    border: 2px solid black;
    width: 150px;
    @apply mt-3 ml-4 mr-4 flex items-center cursor-pointer rounded-xl bg-light-50;
}

/* :deep(el-dialog) {
    height: 80vh;
} */
:deep(.el-transfer-panel) {
    width: 40%;
}
:deep(.el-transfer-panel__item){
    height: 48px;
}
</style>