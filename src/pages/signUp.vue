<template>
    <div>
        <el-card class="mt-35" shadow="hover" :body-style="{ padding: '20px' }">
            <template #header>
                <div>
                    <span class="font-serif text-xl " style="color: #ef4444;">Welcome to EngHub</span>
                </div>
            </template>
            <div class="regiesterForm">
                <el-form :model="signupForm" label-width="80px" :inline="false" size="large" label-position="right"
                    class=" mt-4 p-1">
                    <el-form-item label="Username">
                        <el-input class="w-80" v-model="signupForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Password">
                        <el-input class="w-80" v-model="signupForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="longSpan" label="Confirm Password">
                        <el-input class="w-80" v-model="signupForm.confirm" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="w-70 font-serif" color="#fda4af" @click="onSubmit">Register Now</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="agreeRule" label="true" @change="">Do you agree to the <a href="">《EngHub User
                                Agreement》</a></el-checkbox>

                    </el-form-item>
                </el-form>
                <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
            </div>

        </el-card>

    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import Vcode from "vue3-puzzle-vcode";
import { register } from "~/api/manager.js"
import { useRouter, } from 'vue-router'
const router = useRouter()
const isShow = ref(false)
const agreeRule = ref(false)
const onSubmit = () => {
    if (signupForm.password !== signupForm.confirm) {

    } else {
        if (!agreeRule.value) {
            alert("Please agree to the agreement")
        }
        else {
            isShow.value = true
        }

    }
}

const onClose = () => {
    isShow.value = false
};
const onSuccess = () => {
    onClose()
    register(signupForm.username, signupForm.password).then(res => {
        router.push('/login')
        console.log(res)
    })
}

const signupForm = reactive({
    username: '',
    password: '',
    confirm: ''
})
</script>
<style scoped>
.longSpan {
    white-space: nowrap;
}

.regiesterForm {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
}

.el-form-item {
    @apply font-serif;
}

.test {
    @apply text-red-200;
}

.el-card {
    min-width: 800px;
}</style>