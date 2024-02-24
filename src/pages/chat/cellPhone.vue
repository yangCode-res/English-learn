<template>
  <div>
    <el-dialog class="callPhone" v-model="callPhoneVisible" title="Calling" width="15%" draggable :modal="false"
      :close-on-click-modal="false" :show-close="false" destroy-on-close>
      <div class="messageBox">
        <el-avatar :src="UserOrGroup.avatar" />
        <span class="text-black-50 ml-4">{{ UserOrGroup.nickname }}</span>
      </div>
      <div class=" flex items-center justify-center mt-15 ">
        <div class="flex flex-col items-center ">
          <span class="text-2xl">Talk time</span>
          <span class="text-light-800 text-4xl mt-2">
            {{ time }}
          </span>
        </div>


      </div>
      <template #footer>
        <span class="dialog-footer flex items-center justify-center text-light-50 mb-2">
          <el-button class="text-light-50 footerButton " @click="close" :icon="SwitchButton" type="danger"
            circle></el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import {
  SwitchButton,
} from '@element-plus/icons-vue'
const emit=defineEmits([ 'close'])

const props = defineProps({
  UserOrGroup: Object,
})
const callPhoneVisible = ref(false)
const open = () => {
  callPhoneVisible.value = true
  start()
}
const close = () => {
  callPhoneVisible.value = false
  emit('close')
}
defineExpose({
  open,
  close
})


//计时器
const time = ref('00:00:00');
let intervalId = null;

function start() {
  if (intervalId === null) {
    const startTime = Date.now();
    intervalId = setInterval(() => {
      const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      time.value = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }
}

</script>
<style scoped>
.footerButton {
  width: 50px;
  height: 50px;
}

:deep(.el-dialog__title) {
  @apply text-gray-700 flex items-center justify-center;
}

:deep(.el-dialog) {
  height: 55vh;
  background: linear-gradient(to right, #6dd5ed, #2193b0);
}

:deep(.el-dialog__body) {
  padding-top: 0%;
  height: 75%;


}

.messageBox {
  border: 2px solid black;
  padding: 4px;
  @apply mt-3 ml-4 mr-4 flex items-center cursor-pointer rounded-xl bg-light-50 justify-center;
}
</style>
