<template>
    <div class="">
        <div class="card ">
            <p class="font-serif text-4xl text-black flex items-center justify-center">Personal profile settings</p>
            <div class="user  mt-4">
                <el-row>
                    <el-col :span="6" :offset="0">
                        <div class="mt-6"><el-avatar :src="userInfo.avatar" style="width: 150px; height: 150px;"
                                class="ml-2" /></div>

                    </el-col>
                    <el-col :span="18" :offset="0">
                        <div class="mt-14">
                            <el-row>
                                <el-col :span="9" :offset="0">
                                    <span class="font-serif text-2xl"> UserId: &nbsp;{{ userInfo.userId }}</span>
                                </el-col>
                                <el-col :span="15" :offset="0">
                                    <span class="font-serif text-2xl ml-9"> E-mail: &nbsp;{{ userInfo.email }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mt-4">
                                <el-col :span="9" :offset="0">
                                    <span class="font-serif text-2xl"> Phone: &nbsp;{{ userInfo.phone }}</span>
                                </el-col>
                                <el-col :span="15" :offset="0">
                                    <span class="font-serif text-2xl ml-9"> Nickname: &nbsp;{{ userInfo.nickname }}</span>
                                </el-col>
                            </el-row>


                        </div>
                    </el-col>
                </el-row>

                <el-button class="modify" type="danger" size="default" @click="dialogVisible = true"
                    rounded>Modify</el-button>

            </div>
            <div class="vipCard">

                <div class="mt-6 gird-container">

                    <div class="container">
                        <el-avatar alt="Background" :src="userInfo.avatar" style="width: 150px; height: 150px;"
                            class=" background-image" />
                        <img v-if="userInfo.status" alt="Top Right" class="top-right-image"
                            src="https://english-1309979517.cos.ap-nanjing.myqcloud.com/king.svg" />
                    </div>
                    <div v-if="!userInfo.status" class="ml-4">
                        <div class="mt-4 mb-6 ml-4 font-serif text-3xl text-rose-500">You are not a VIP yet!</div>
                        <div class="mt-4 mb-6 ml-4 font-serif text-xl flex items-center text-orange-500">
                            <span>
                                Become a VIP and you will have:
                            </span>
                            <span class="ml-4">
                                <el-button type="success" size="small" @click="handleStatus">Know Next</el-button>

                            </span>
                        </div>
                        <el-steps :space="300" :active="showStatus" finish-status="success">
                            <el-step title="Word dictation" />
                            <el-step title="Sentence dictation" />
                            <el-step title="Chat room " />
                            <el-step title="Interest english" />
                        </el-steps>
                    </div>
                    <div v-if="userInfo.status" class=" flex items-center">
                        <div class="flex items-center ">
                            <span class="font-serif text-xl text-blue-500"> Vip expiration date:</span>
                            <span class="ml-4 text-red-700 text-xl">2024-01-24</span>
                            <span class="button"> <el-button type="success" size="medium" @click="">renew</el-button>
                            </span>
                        </div>
                        
                    </div>
                </div>
                <div v-if="!userInfo.status" class="mt-15  flex items-center justify-center">
                    <el-card class="box-card">
                        <span v-if="showStatus == 1" class="font-serif text-xl text-black">
                            Word dictation
                            <u>
                                <li>
                                    There are over a dozen types of dictation vocabulary.
                                </li>
                                <li>
                                    Each word has its full part of speech and its meaning.
                                </li>
                                <li>Word memory is assisted by scientific methods, doubling efficiency</li>
                            </u>
                        </span>
                        <span v-if="showStatus == 2" class="font-serif text-xl text-black">
                            Sentence dictation
                            <u>
                                <li>
                                    There are dozens of popular listening textbooks here.
                                </li>
                                <li>
                                    Listening comprehension with automatic error correction function.
                                </li>
                                <li>Each sentence contains Chinese meaning</li>
                            </u>
                        </span>
                        <span v-if="showStatus == 3" class="font-serif text-xl text-black">
                            Chat room
                            <u>
                                <li>
                                    Here, you can speak freely with your friends.
                                </li>
                                <li>
                                    You can join a group with common interests and speak freely.
                                </li>
                                <li>Beginners of oral communication can have conversations with AI.</li>
                            </u>
                        </span>
                        <span v-if="showStatus == 4" class="font-serif text-xl text-black">
                            Interest english
                            <u>
                                <li>
                                    Here, you can learn vocabulary by reading novels.
                                </li>
                                <li>
                                    Here, you can learn vocabulary by listening to music.
                                </li>
                                <li>Learned words can be connected at any time.</li>
                            </u>
                        </span>
                    </el-card>

                </div>
                <div v-if="!userInfo.status" class="flex items-center justify-center mt-10  font-serif">
                    <span class="text-3xl text-red-500 ">
                        Join Us Now!
                    </span>
                    <span class="ml-5">
                        <el-button type="danger" size="medium" @click=""> Join us</el-button>

                    </span>
                </div>
                <div v-if="userInfo.status" class="calendar">
                    <div class="mb-4">
                            <span class="font-serif  text-xl">Learning process</span>
                        </div>
                    <el-calendar v-model="value" />
                </div>
                
            </div>

        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="Modify" width="30%" :before-close="handleClose">
        <el-form label-width="100px" :model="formLabelAlign" style="max-width: 460px">
            <el-form-item label=" Avatar" class="flex items-center">
                <el-avatar :src="formLabelAlign.avatar" style="width: 50px; height: 50px;" 
                    class="ml-2 cursor-pointer" @click="handlePicture" /></el-form-item>
            <el-form-item label=" E-mail">
                <el-input v-model="formLabelAlign.email" />
            </el-form-item>
            <el-form-item label="Phone">
                <el-input v-model="formLabelAlign.phone" />
            </el-form-item>
            <el-form-item label="Nickname">
                <el-input v-model="formLabelAlign.nickname" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleUpdateUser">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
    <pictureSelect ref="pictureSelectRef" @select="handleSelectPicture"></pictureSelect>
</template>
<script setup>
import { useStore } from 'vuex'
import { ref, onBeforeMount, reactive } from 'vue';
import { updateUser } from '~/api/manager.js'
import { toast } from '~/composables/util'
import pictureSelect from './pictureSelect.vue';
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
const handleSelectPicture=(url)=>{
    formLabelAlign.avatar=url
}
const pictureSelectRef=ref(null)
const handlePicture=()=>{
    pictureSelectRef.value.open()
}
const userInfo = ref([])
const dialogVisible = ref(false)
const store = useStore()
const showStatus = ref(1)
const handleStatus = () => {
    showStatus.value = showStatus.value + 1
    if (showStatus.value == 5) {
        showStatus.value = 1
    }
}
const handleUpdateUser = () => {
    console.log(userInfo.value.userId);
    updateUser(userInfo.value.userId, formLabelAlign).then((res) => {
        dialogVisible.value = false
        store.dispatch("getinfo", userInfo.value.username).then(userinfo => {
            toast("修改用户信息成功")
            localStorage.setItem("userInfo", JSON.stringify(userinfo))
            getinfo()
        })
    })
}
const formLabelAlign = reactive({
    avatar: "",
    email: '',
    phone: '',
    nickname: '',
})
const getinfo = () => {
    userInfo.value = JSON.parse(localStorage.getItem('userInfo'))
}
onBeforeMount(() => {
    getinfo();
    formLabelAlign.email = userInfo.value.email
    formLabelAlign.nickname = userInfo.value.nickname
    formLabelAlign.phone = userInfo.value.phone
    formLabelAlign.avatar = userInfo.value.avatar
})
getinfo()
</script>
<style  scoped>
.card {
    width: 100vh;
    height: 90vh;
    padding: 20px;
    @apply bg-light-50 rounded-xl;
}
.button{
    position: absolute;
    left: 90%;
}
.user {
    position: relative;
    left: 10%;
    width: 80%;
    height: 20%;
    @apply bg-gray-200 rounded-3xl;
}

.vipCard {
    position: relative;
    left: 10%;
    top: 4%;
    width: 80%;
    height: 60%;
    @apply bg-gray-200 rounded-3xl;
}

.modify {
    position: relative;
    left: 90%;
    bottom: 10%;
}
.gird-container {
    position: relative;
    top: 5%;
    left: 1%;
    display: grid;
    grid-template-columns: 1fr 3fr;

}

/*Vip*/
.container {
    position: relative;
    width: 250px;
    height: 150px;
}

.background-image {
    width: 100%;
    height: 100%;
}

.top-right-image {
    position: absolute;
    top: -30px;
    right: 20px;
    width: 100px;
    height: 100px;
    object-fit: cover;
    transform: rotate(50deg);
}

.box-card {
    width: 80%;
}
/* 日历 */
:deep(.el-calendar-table .el-calendar-day){
    width: 40px;
    height: 40px;
}
.calendar{
    position: relative;
    top: 5%;
    left: 30%;
    width: 500px;
}
:deep(.el-calendar ){
    @apply bg-green-50;
}
</style>