<template>
  <div>
    <el-carousel height="450px">
      <el-carousel-item v-for="(i, index) in pageTemplate.banners" :key="index" >
        <nuxt-link :to="i.url">
          <el-image
              :src="i.src"
              fit="fill"
              :alt="i.alt"
              style="width: 100%"
          ></el-image>
        </nuxt-link>
      </el-carousel-item>
    </el-carousel>
    <div class="container" >
      <div class="intro-text">
        <div>
          <p>{{ pageTemplate.introduce.title }}</p>
          <span></span>
        </div>
      </div>
      <div class="content" v-html="pageTemplate.introduce.content">

      </div>
    </div>
  </div>
</template>

<script>
import {getPageTemplate, PAGE} from "@/api/index/path";

export default {
  name: "index",
  data(){
    return{
      pageTemplate:{}
    }
  },  async asyncData({$axios}) {
    let { content } = await getPageTemplate($axios,{ type: PAGE.MATCHMARKER });

    return {
      pageTemplate: JSON.parse(content),
    };
  },
}
</script>

<style scoped lang="less">

.intro-text{
  margin-top: 30px;
  text-align: center;
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 60px;
div{
  width: 160px;
  display: inline-block;
  position: relative;
span{
  width: 100%;
  height: 10px;
  display: inline-block;
  background: #fbc2fe;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
}
}
.content{
  margin-top: 15px;
  margin-bottom: 30px;
}
</style>