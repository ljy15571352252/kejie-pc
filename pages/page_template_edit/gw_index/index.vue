<template>
  <div>
    <el-carousel height="450px" v-template-edit="{key:'banners',data:pageTemplate.banners}">
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
    <div class="func-intro" v-template-edit="{key:'functionList',data:pageTemplate.functionList}">
      <div class="container">
        <el-row>
          <el-col
            :span="6"
            class="func-list"
            v-for="(i, index) in pageTemplate.functionList"
            :key="index"
          >
            <div class="box-item">
              <i class="icon" :class="i.icon"></i>
            </div>
            <p>{{ i.label }}</p>
            <p class="desc">{{ i.text }}</p>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="container module-intro">
      <el-row :gutter="20" v-template-edit="{key:'modules',data:pageTemplate.modules}">
        <el-col
          :span="8"
          v-for="(i, index) in pageTemplate.modules"
          :key="index"
          class="module"
        >
          <el-image :src="i.src" fit="fill" :alt="i.alt"></el-image>
        </el-col>
      </el-row>
    </div>

    <div class="banner-intro" v-template-edit="{key:'midBanner',data:pageTemplate.midBanner}">
      <el-image
        :src="pageTemplate.midBanner.src"
        :alt="pageTemplate.midBanner.alt"
        fit="fill"
        style="width: 100%; height: 100%"
      />
    </div>

    <div class="container youshi" v-template-edit="{key:'youshi',data:pageTemplate.youshi}">
      <div class="intro-text">
        <div>
          <p>{{ pageTemplate.youshi.title }}</p>
          <span></span>
        </div>
      </div>
      <el-row>
        <el-col
          :span="6"
          class="func-list youshi-list"
          v-for="(i, index) in pageTemplate.youshi.items"
          :key="index"
        >
          <div class="box-item youshi-item">
            <img :src="i.icon" alt="" width="80" height="80" style="border-radius: 50%">
            <i class="icon" :class="i.icon"></i>
          </div>
          <p>{{ i.label }}</p>
          <p class="desc">{{ i.text }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {getPageTemplate, PAGE} from "@/api/index/path";

export default {
  name: "index",
  data() {
    return {
      pageTemplate: {}
    }
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
  async asyncData({$axios}) {
    let { content } = await getPageTemplate($axios,{ type: PAGE.INDEX });

    return {
      pageTemplate: JSON.parse(content),
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/variable.less";
.func-intro {
  background: #f5f5f5;
  padding: 15px 0;
}
.youshi-list {
  margin-bottom: 50px;
}

.intro-text {
  text-align: center;
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 60px;
  div {
    width: 160px;
    display: inline-block;
    position: relative;
    span {
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

.func-list {
  text-align: center;
  .box-item {
    display: inline-block;
    border-radius: 12px;
    text-align: center;
    i {
      font-size: 80px;
      color: @theme-background;
      margin-top: 15px;
    }
  }
  .youshi-item {
    border-radius: 50%;
    i {
      color: @theme-background;
    }
  }
  p {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 400;
  }
  p.desc {
    font-size: 15px;
  }
}

.module-intro {
  padding: 20px 0 0;
  .module {
    margin-bottom: 20px;
  }
}

.banner-intro {
  height: 400px;
  margin-bottom: 20px;
}
.youshi {
  margin-bottom: 20px;
  margin-top: 40px;
}
</style>
