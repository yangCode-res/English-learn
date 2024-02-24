<template>
    <div id="building">
        <!-- <div class="content">
         
    </div> -->
        <div class="image">
            <el-avatar size="large" class="w-[100px] h-[100px]"
                src="https://english-1309979517.cos.ap-nanjing.myqcloud.com/logo.png" />
        </div>
        <span class="text-name">Sigh in EngHub</span>

        <div class="epcard">

            <el-card shadow="always">
                <!-- card body -->

                <el-form ref="formRef" :rules="rules" :model="Form">
                    <span class="text-xs">Username or email address</span>
                    <el-form-item label="" prop="username" size="normal">
                        <el-input v-model="Form.username" placeholder="Please input your account" size="normal" clearable
                            @change=""></el-input></el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12" :offset="0"><span class="text-xs">Password</span></el-col>
                        <el-col :span="11" :offset="1"><span class="text-xs text-blue-500" style="cursor: pointer;">Forgot
                                password?</span></el-col>
                    </el-row>

                    <el-form-item label="" size="normal" prop="password">
                        <el-input v-model="Form.password" placeholder="Please input your password" size="normal" clearable
                            @change=""></el-input>
                    </el-form-item>

                </el-form>
                <el-button type="success" class="w-[260px]" size="default" @click="submit" :loading="loading">Sign
                    in</el-button>

            </el-card>
            <div class="card2">
                <el-card shadow="hover" class="m-1">
                    <el-row :gutter="20">
                        <el-col :span="12" :offset="0">
                            <p class="text-xs">New to EngHub?</p>
                        </el-col>
                        <el-col :span="12" :offset="0">
                            <p class="text-xs text-blue-500 " style="cursor: pointer;"><a
                                    href="http://localhost:5173/#/signup">Create an account</a></p>
                        </el-col>
                    </el-row>



                </el-card>
            </div>
        </div>

    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from '~/composables/util'
const router = useRouter()
const store = useStore()
const Form = reactive({
    username: "",
    password: ""
})
const formRef = ref(null)
const loading = ref(false)
const rules = {
    username: [
        {
            required: true,
            message: 'Username can not null',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 5,
            message: 'The length of username is between 3 to 5',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: 'Password can not null',
            trigger: 'blur'
        },
    ]
}
const submit = () => {
    loading.value = true
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }

        store.dispatch("login", Form).then(res => {
            toast('登录成功')
            console.log(res);

            router.push("/")
        }).finally(() => {
            loading.value = false
        })
    })
    store.dispatch("getinfo", Form.username).then(userinfo => {
        toast("获取用户信息成功")
        localStorage.setItem("userInfo",JSON.stringify(userinfo))
    })
}
</script>
<style>
#building {
    background: url("~/assets/background.png");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: cover;
    /* 更好的背景图适配 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* 堆叠元素 */
}

.image {
    margin-bottom: 10px;
    /* 添加间距 */
}

.text-name {
    margin-bottom: 10px;
    /* 添加间距 */
    white-space: nowrap;
    /* 防止文本换行 */
    font-size: 16px;
    /* 根据需要调整字体大小 */
    max-width: 100%;
    /* 确保宽度不会超出父元素 */
    @apply text-light-500;

}

.epcard {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    /* 根据需要调整字体大小 */
    align-items: center;
    margin-top: 20px;
    /* 与上方元素的间距 */
}

.el-card {
    min-width: 300px;
    transition: all .5s;
    /* 移除绝对定位，使用 flex 布局 */
    @apply bg-gray-50;
}</style>
