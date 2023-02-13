<template>
  <div class="container">
    <el-breadcrumb separator="/" style="padding: 15px 0">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/activity' }">活动</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content-board">
      <el-row  class="activity-item">
        <el-col :span="9">
          <el-carousel height="300px" style="width: 400px">
            <el-carousel-item v-for="item in 4" :key="item" >
              <el-image src="/images/banner.jpg" fit="fill" style="width: 400px;height: 300px"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="15" class="activity-info">
          <h1>活动标题活动标题活动标题活动标</h1>
          <p>活动时间：xxxx</p>
          <p>活动地址：xxxxxxxx</p>
          <p>活动类型：xxxx</p>
          <p>活动费用：xxxx</p>
          <div class="qrcode-item">
            <div><img src="~static/images/logo/logo.png"/></div>
            <p>扫二维码进行报名</p>
          </div>
        </el-col>
      </el-row>
      <h2 class="lanmu">活动介绍</h2>
      <div class="content">
        详情{{id}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data(){
    return{
      id:null
    }
  },
  created() {
    this.id=this.$route.params.id
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/variable";
.content-board{
  margin-bottom: 30px;
  .activity-item{
    padding: 15px 0;
    margin-bottom: 20px;
    }
    .activity-info{
      position: relative;
      a{
        color: @black;
        font-weight: 400;
        font-size: 15px;
        height: 40px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      p{
        margin-top: 12px;
        color: @text-color;
        font-size: 10px;
      }
    }
  .qrcode-item{
    display: inline-block;

    float: right;
    div{
      text-align: center;
      img{
        width: 80px;height: 80px;
      }
    }

    p{
      text-align: center;
      margin-top: 15px;
      font-size: 10px;
    }
  }
}
.content{
  margin-top: 15px;
}
</style>