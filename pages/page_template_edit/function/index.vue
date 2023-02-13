<template>
  <div>
    <el-carousel height="450px"  v-template-edit="{key:'banners',data:pageTemplate.banners}">
      <el-carousel-item v-for="(i, index) in pageTemplate.banners" :key="index">
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
    <div class="container"  v-template-edit="{key:'menubar',data:pageTemplate.menubar}">
      <el-row class="func-list" v-if="pageTemplate.menubar && pageTemplate.menubar.length > 0">
        <el-col
                :span="12"
                class="func-item"
                v-for="(i, index) in pageTemplate.menubar"
                :key="index"
        >
          <nuxt-link :to="`/function/detail/${i.code}`">
            <div>
              <el-image
                      :src="i.src"
                      fit="fill"
                      style="width: 400px; height: 200px"
              />
            </div>
            <h4>{{ i.name }}</h4>
            <p class="ellipsis">{{ i.describe }}</p>
            <!--            <p class="ellipsis">功能玩法</p>-->
          </nuxt-link>
        </el-col>
      </el-row>
      <div v-else class="addTo">
        添加功能玩法
      </div>
    </div>
  </div>
</template>

<script>
  import { getPageTemplate, PAGE } from "@/api/index/path";
  import { getFunctionList } from "@/api/function/path";

  export default {
    name: "index",
    data() {
      return {
        pageTemplate: {},
        // functionList: [],
      };
    },

    methods:{
      receiveMessage(event) {
        let origin = event.origin || event.originalEvent.origin;
        if (origin === window.location.origin) return;
        this.pageTemplate = event.data;
      },
    },
    mounted() {
      console.log(JSON.stringify(this.pageTemplate))
      window.addEventListener("message", this.receiveMessage, false);
    },
    destroyed() {
      window.removeEventListener("message", this.receiveMessage, false);
    },

    async asyncData({ $axios }) {
      let { content } = await getPageTemplate($axios, { type: PAGE.FUNCTIONS });
      // let res = await getFunctionList($axios,{ state: 1 });
      return {
        pageTemplate: JSON.parse(content),
        // functionList: res.records,
      };
    },
  };
</script>

<style scoped lang="less">
  @import "~assets/css/variable";
  .func-list {
    margin-top: 30px;
    padding: 0 160px;
  }
  .func-item {
    margin-bottom: 20px;
    h4 {
      font-size: 15px;
      font-weight: 400;
      margin-top: 10px;
      color: @black;
    }
    p {
      margin-top: 8px;
      color: @text-color;
      font-size: 10px;
    }
  }
  .addTo{
    margin: 20px 0;
    text-align: center;
    height: 200px;
    line-height: 200px;
    font-size: 18px;
  }
</style>
