<template>
  <div>
    <el-carousel height="450px">
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
    <div class="container">
      <div class="intro-text">
        <div>
          <p>{{ pageTemplate.introduce.title }}</p>
          <span></span>
        </div>
      </div>
      <div class="content" v-html="pageTemplate.introduce.content"></div>
    </div>

    <!--红娘列表-->
    <div class="container">
      <!--头部-->
      <div class="selected">
        <div>
        </div>
        <div class="intro-text">
          <div>
            <p>精选合伙人</p>
            <span></span>
          </div>
        </div>
        <div></div>
      </div>
      <!-- 合伙人列表 -->
      <div class="warp">
        <div class="introducerList">
          <div class="introducerItem" v-for="item in matchmakerList">
            <div class="imgWarp">
              <img :src="item.headUrl" alt="">
              <div class="introducerInfo">{{item.store}}</div>
            </div>
            <div class="introducerName">{{item.nickName}}</div>
            <div class="success">成功促成4对成功促成4对成功促成4对成功促成4对成功促成4对</div>
            <div class="introducerAddrees">{{item.townName}} <i class="icon icon-lujing939"></i></div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageTemplate, PAGE } from "@/api/index/path";
import { getMatchmakerList } from "@/api/merchant/path";

export default {
  name: "index",
  data() {
    return {
      pageTemplate: {},
      matchmakerList: [],
      axios: '',
      areaSelect: [],
      formItem: {
        provinceCode:null,
        cityCode: 1,
        countyCode: null,
      },
    };
  },
  created() {
    console.log(1)
  },

  methods: {
  },
  watch: {
    areaSelect(val) {
      this.formItem.provinceCode = val[0] ? val[0] : null;
      this.formItem.cityCode = val[1] ? val[1] : null;
      this.formItem.countyCode = val[2] ? val[2] : null;
    },
  },
  async asyncData({$axios}) {
    let { content } = await getPageTemplate($axios,{ type: PAGE.MERCHANT });
    let res = await getMatchmakerList($axios);
    return {
      pageTemplate: JSON.parse(content),
      matchmakerList: res.records || [],
      axios: $axios,
    };
  },
};
</script>

<style scoped lang="less">
.intro-text {
  margin-top: 30px;
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
.content {
  margin-top: 15px;
  margin-bottom: 30px;
}
.warp{
  width: 1170px;
  overflow: hidden;
  .pagination{
    text-align: center;
    margin: 20px 0 80px 0;
  }
}
.introducerList{
  width: 1200px;
  overflow: hidden;
  .introducerItem{
    float: left;
    margin-right: 74px;
    .imgWarp{
      overflow: hidden;
      height: 310px;
      width: 322px;
      position: relative;
      border: 2px solid  #BA52EC;
      border-radius: 15px;
      img{
        width: 100%;
        height: 100%;
      }
      .introducerInfo{
        position: absolute;
        left: 0px;
        bottom: 0;
        width: 100%;
        height: 46px;
        text-align: center;
        line-height: 46px;
        color: white;
        background: rgba(219, 176, 237, .7);
      }
    }
    .introducerName{
      width: 322px;
      font-size: 24px;
      text-align: center;
      margin: 15px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .success{
      width: 322px;
      height: 48px;
      overflow: hidden;				//溢出内容隐藏
      text-overflow: ellipsis;		//文本溢出部分用省略号表示
      display: -webkit-box;			//特别显示模式
      -webkit-line-clamp: 2;			//行数
      line-clamp: 2;
      -webkit-box-orient: vertical;	//盒子中内容竖直排列
      font-size: 18px;
    }
    .introducerAddrees{
      width: 322px;
      font-size: 15px;
      color: rgb(153, 153, 153);
      margin: 10px 0 30px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      i{
        color: #EE2742;
        margin-left: 5px;
      }
    }
  }

}
</style>
