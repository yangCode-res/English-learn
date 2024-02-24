<template>
    <div>
      
      <el-result
        icon="warning"
        title="404提示"
        sub-title="你找的页面走丢了"
      >
        <template #extra>
          <el-button type="primary" @click="this.$router.push('/')">Back</el-button>
        </template>
      </el-result>
   
    </div>
</template>