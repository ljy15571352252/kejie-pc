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
    <div class="container">
      <div>
        <div class="search-board">
          <el-input
            placeholder="请输入活动"
            size="mini"
            style="width: 200px"
            v-model="searchVal"
          >
            <template slot="append">
              <el-button type="primary">搜索</el-button>
            </template>
          </el-input>
        </div>
      </div>
      <el-container>
        <el-main>
          <div v-if="pageTemplate.leftActivity" v-template-edit="{key:'leftActivity',data:pageTemplate.leftActivity}">
            <div class="activity_warp">
              <div class="activity_nav">
                <span
                    :class="selectIndex === index ? 'active': 'activity_name'"
                    v-for="(item, index) in pageTemplate.leftActivity"
                    @click="selectIndex = index;pageIndex = 1"
                    :key="index"
                >{{item.title}}</span>
              </div>
              <div v-if=" pageTemplate.leftActivity &&  pageTemplate.leftActivity.length > 0">
                <div :gutter="20" class="activity-item" v-for="(item, i) in pagedetailedList" :key="i">
                  <div style="display: flex">
                    <div :span="6" class="activity-img">
                      <el-image :src="item.src" fit="fill" style="width: 229px;height: 214px;" ></el-image>
                    </div>
                    <div :span="14" class="activity-info">
                      <nuxt-link to="/" >
                        {{item.activityName}}
                      </nuxt-link>
                      <p class="ellipsis">活动时间：{{item.activityTime}}</p>
                      <p class="ellipsis">活动地址：{{item.activityAddress}}</p>
                      <p class="ellipsis" style="margin-top: 20px">咨询电话：{{item.telephone}}</p>
                      <p class="ellipsis" style="margin-bottom: 20px">活动类型：{{item.activityType}}</p>
                      <p class="ellipsis">活动费用：{{item.activityCost}}</p>
                    </div>
                  </div>
                  <div :span="4" class="activity-btn">
                    <nuxt-link :to="activityDetailPage(i)">立即报名</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
            <el-pagination
                    class="page-tool"
                    :page-size="pageSize"
                    :current-page="pageIndex"
                    @current-change="handleCurrentChange"
                    :total="this.pageTemplate.leftActivity[this.selectIndex].children.length">
            </el-pagination>
          </div>
          <!--模板-->
          <div v-else  v-template-edit="{key:'leftActivity',data:pageTemplate.leftActivity}">
            <div class="activity_warp">
              <div class="activity_nav">
                活动名称
              </div>
              <div :gutter="20" class="activity-item" v-for="i in 1" :key="i">
                <div style="display: flex">
                  <div :span="6" class="activity-img">
                    <el-image src="/images/banner.jpg" fit="fill" style="width: 229px;height: 214px;" ></el-image>
                  </div>
                  <div :span="14" class="activity-info">
                    <nuxt-link to="/" >
                      活动标题
                    </nuxt-link>
                    <p class="ellipsis">活动时间：xxxx</p>
                    <p class="ellipsis">活动地址：xxxxxxxx</p>
                    <p class="ellipsis" style="margin-top: 20px">咨询电话：xxxxxxxx</p>
                    <p class="ellipsis" style="margin-bottom: 20px">活动类型：xxxxxxxx</p>
                    <p class="ellipsis">活动费用：xxxx</p>
                  </div>
                </div>
                <div :span="4" class="activity-btn">
                  <nuxt-link :to="activityDetailPage(i)">立即报名</nuxt-link>
                </div>
            </div>
            </div>
          </div>
        </el-main>
        <el-aside width="250px" class="tr">
          <el-row v-template-edit="{key:'rightBanners',data:pageTemplate.rightBanners}">
            <el-col
              class="ternant-banner"
              v-for="(i, index) in pageTemplate.rightBanners"
              :key="index"
            >
              <nuxt-link :to="i.url">
                <el-image
                  :src="i.src"
                  :alt="i.alt"
                  fit="fill"
                  style="width: 200px; height: 300px"
                ></el-image>
              </nuxt-link>
            </el-col>
          </el-row>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getPageTemplate, PAGE } from "@/api/index/path";

export default {
  name: "index",
  data() {
    return {
      selectIndex: 0,
      currentPage: 1,
      searchVal: null,
      pageTemplate: {},
      pageIndex: 1,
      pageSize: 3,
    };
  },
  computed: {
    // 前端分页
    pagedetailedList () {
      if ( this.pageTemplate.leftActivity && this.pageTemplate.leftActivity.length > 0 && this.pageTemplate.leftActivity[this.selectIndex] && this.pageTemplate.leftActivity[this.selectIndex].children && this.pageTemplate.leftActivity[this.selectIndex].children.length > 0) {
        let start = (this.pageIndex - 1) * 3
        let end = this.pageIndex * 3
        return  (this.pageTemplate.leftActivity[this.selectIndex].children || []).slice(start, end)
      } else {
        return [];
      }
    },
  },
  methods: {
    activityDetailPage(id) {
      return `/activity/detail/${id}`;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    receiveMessage(event) {
      let origin = event.origin || event.originalEvent.origin;
      if (origin === window.location.origin) return;
      this.pageTemplate = event.data;
    },
  },
  mounted() {
    window.addEventListener("message", this.receiveMessage, false);
  },
  destroyed() {
    window.removeEventListener("message", this.receiveMessage, false);
  },
  async asyncData({$axios}) {
    let { content } = await getPageTemplate($axios,{ type: PAGE.ACTIVITY });

    return {
      pageTemplate: JSON.parse(content),
    };
  },
};
</script>

<style scoped lang="less">
@import "~assets/css/variable";

.search-board {
  padding-top: 15px;
  text-align: right;
}

.page-tool {
  margin-top: 20px !important;
}

.ternant-banner {
  margin-top: 15px;

  img {
    width: 80px !important;
    height: 200px !important;
  }
}

.activity-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid @item-solid-color;
  padding: 15px 0;

  .activity-img {
    width: 229px;
    height: 214px;
    display: inline-block;
    img {
      width: 229px;
      height: 214px;
    }
  }

  .activity-info {
    margin-left: 20px;
    width: 445px;
    a {
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

    p {
      margin-top: 12px;
      color: @text-color;
      font-size: 10px;
    }
  }

  .activity-btn {
    text-align: right;
    line-height: 214px;
    a {
      display: inline-block;
      border-radius: 20px;
      color: @white;
      text-align: center;
      height: 40px;
      width: 120px;
      line-height: 40px;
      font-size: 15px;
      background: @theme-background;

      &:hover {
        background: @theme-background-hover;
      }
    }
  }
}
.activity_warp{
  .activity_nav{
    margin-bottom: 10px;
    font-size: 16px;
    color: rgb(153, 153, 153);
    span{
      cursor: pointer;
      display: inline-block;
    }
    .activity_name{
      margin-right: 38px;
      font-size: 19px;
    }
    .active{
      font-size: 19px;
      margin-right: 38px;
      color: rgb(185, 81, 234);
      border-bottom: 2px solid rgb(185, 81, 234);
    }

  }
  .activity-item{
    border-bottom: 1px solid @item-solid-color;
    padding: 15px 0;
    .activity-img{
      display: inline-block;
      width: 229px;
      height: 214px;
      img{
        width: 229px;
        height: 214px;
      }
    }
    .activity-info{
      height: 214px;
      a{
        color: @black;
        font-weight: 400;
        font-size: 15px;
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
    .activity-btn{
      text-align: right;
      a{
        display: inline-block;
        border-radius: 20px;
        color: @white;
        text-align: center;
        height: 40px;
        width: 120px;
        line-height: 40px;
        font-size: 15px;
        background: @theme-background;
        &:hover{
          background: @theme-background-hover;
        }
      }
    }
  }

}
</style>
