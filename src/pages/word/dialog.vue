<template>
     <el-dialog v-model="dialogFormVisible" title="最近的10个单词" destroy-on-close  width="30%">

        <el-table :data="wordValue" style="width: 100%" class="bg-transparent" max-height="700">
            <el-table-column label="单词" width="150">
                <template #default="{ row }">
                    <div class="flex justify-center" style="flex-direction:column;">
                        <span  class="text-sky-500 text-xl font-bold">{{ row.word }}</span>
                        <div >
                            <span class="text-dark-50 mt-1">/ {{ row.ukphonetic }} /</span>
                            <span class="text-dark-50 mt-1">/ {{ row.usphonetic }} /</span>
                        </div>


                    </div>
                </template>
            </el-table-column>
            <el-table-column width="450">
                <template #default="{ row }">
                    <div class="flex justify-center" style="flex-direction:column;">
                        <div class="flex items-center " v-if="row.n">
                            <span class="text-orange-500 font-bold text-xl italic"> n. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.n }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.prep">
                            <span class="text-orange-500 font-bold text-xl italic"> prep. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.prep }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.vi">
                            <span class="text-orange-500 font-bold text-xl italic"> vi. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.vi }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.adj">
                            <span class="text-orange-500 font-bold text-xl italic"> adj. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.adj }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.pron">
                            <span class="text-orange-500 font-bold text-xl italic"> pron. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.pron }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.v">
                            <span class="text-orange-500 font-bold text-xl italic"> v. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.v }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.conj">
                            <span class="text-orange-500 font-bold text-xl italic"> conj. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.conj }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.adv">
                            <span class="text-orange-500 font-bold text-xl italic"> adv. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.adv }}</span>
                        </div>
                        <div class="flex items-center " v-if="row.interj">
                            <span class="text-orange-500 font-bold text-xl italic"> interj. </span>
                            <span class="text-dark-50 ml-1 text-lg"> {{ row.interj }}</span>
                        </div>


                    </div>
                </template>
            </el-table-column>

        </el-table>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="Confirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
let returnlist=[]
const dialogFormVisible=ref(false)
const props=defineProps({
    wordValue:Array
})
const emits= defineEmits(["notify"])
async function  Confirm(){
    
    await  emits('notify');
    dialogFormVisible.value=false
    
}
const open=()=>{
    dialogFormVisible.value=true
}

defineExpose({
    open,
})
</script>