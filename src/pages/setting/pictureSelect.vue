<template>
    <div>
        <el-dialog v-model="dialogVisible" title="Select Picture" width="50%" :before-close="handleClose">
            <div class=" picture-Container">
                <div v-for="(item, index) in pictureList" :key="index" class="picture">
                    <el-checkbox class="checkBox" v-model="SelectedPicture" :true-label="item" @change=""></el-checkbox>
                    <el-image style="width: 100px; height: 100px" :src="item" :preview-src-list="pictureList"
                        fit="fill"></el-image>
                </div>
            </div>

            <span v-if="pictureList.length == 0" style="color: red">No Picture</span>
            <el-divider />
            <div>
                <span class="font-serif text-lg">Upload Myself</span>
                <el-upload class="avatar-uploader" :action="uploadImageAction" :headers="{
                    token
                }" :on-success="uploadSuccess" :on-error="uploadError">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleCheck">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { getAllPictureList, uploadImageAction } from '~/api/picture.js'
import { ref, onBeforeMount } from 'vue'
import { getToken } from "~/composables/auth"
//图片上传控制
const token = getToken()
console.log(token);
const imageUrl = ref('')
const uploadSuccess = (response, uploadFile, uploadFiles) => {
    console.log(response);
 imageUrl.value=response.path
}
const uploadError = (error, uploadFile, uploadFiles) => {
    let msg = JSON.parse(error.message).msg || "上传失败"
    toast(msg, "error")

}
const emit=defineEmits(['select'])

const dialogVisible = ref(false);
const pictureList = ref([])
const SelectedPicture = ref(null)
const handleCheck = () => {
    emit('select',SelectedPicture.value)
}
onBeforeMount(() => {
    getAllPictureList().then((res) => {
        pictureList.value = res
    })
})
const open = () => {
    dialogVisible.value = true
}
const close = () => {
    dialogVisible.value = false
}

defineExpose({
    open,
    close
})
</script>

<style scoped>
.picture {
    width: 120px;
    height: 120px;
    padding: 0;
    margin: 0;
    border: 1px solid #d6d3d1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.picture-Container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

.checkBox {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>