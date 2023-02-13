<template>
  <div class="container">
    <el-breadcrumb separator="/" style="padding: 15px 0">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/function' }">功能表</el-breadcrumb-item>
      <el-breadcrumb-item>功能详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content-board">
      <h1 class="title">{{ functionDetail.name }}</h1>
      <div v-html="functionDetail.content">
      </div>
    </div>
  </div>
</template>

<script>
import {getFunctionDetail} from "@/api/function/path";

export default {
  name: "detail",
  data(){
    return{
      functionDetail:{}
    }
  },
  created() {
  },
  mounted() {
  }, async asyncData({$axios,params}) {
    let res=await getFunctionDetail($axios,params.id)
    return {
      functionDetail:res
    };
  },
}
</script>

<style scoped lang="less">
.content-board{
  margin-bottom: 30px;
  .title{
    text-align: center;
  }
}
</style>