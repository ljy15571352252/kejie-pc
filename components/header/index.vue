<template>
  <div>
    <div class="top-bar">
      <div class="container">
        <p>红娘热线：400-8828-858 （9:00-21:00）</p>
        <div class="right-sec">
          <ul>
            <li>
              <nuxt-link
                class="el-link"
                to="/"
                target="_blank"
                >会员登录</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                class="el-link"
                to="/"
                target="_blank"
                >加盟注册</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="/"
                target="_blank"
                class="el-link"
                ><el-icon name="phone-outline"></el-icon>小程序</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Header -->
    <header>
      <div class="container">
        <el-row class="nav-block" style="padding: 20px 0">
          <el-col :span="8">
            <div class="logo">
              <nuxt-link to="/"><img src="~static/images/logo/logo.png" alt="" /></nuxt-link>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="el-row--flex locate-store">
              <div class="head-item">
                <img src="~static/images/head.jpg" alt="" />
              </div>
              <div class="info-text">
                <div>嫁得好新和服务站</div>
                <div>广东省广州白云区新和 <i class="icon icon-lujing939"></i></div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="el-row--flex right-content">
              <a :href="storeLoginSite" class="btn" target="_blank">登录</a>
              <a :href="storeRegisterSite" class="btn"  target="_blank" >注册</a>
<!--              <a :href="matchmarkerLoginSite" class="btn" target="_blank">红娘登录</a>-->
<!--              <a :href="matchmarkerRegisterSite" class="btn"  target="_blank" >红娘注册</a>-->
              <div class="qrcode"><img src="~static/images/qrcode.jpg"/></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- Nav -->
      <nav class="navbar">
        <div class="container">
          <el-row>
            <el-col :span="4" v-for="(item, i) in menuList" :key="i">
              <nuxt-link
                :to="item.path"
                class="nav-link el-link"
                :class="{ active: $route.path === item.path }"
              >
                {{ item.name }}
              </nuxt-link></el-col
            >
          </el-row>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import {getPageTemplate, PAGE} from "@/api/index/path";

export default {
  name: "index",
  data() {
    return {
      storeLoginSite:'',
      storeRegisterSite:'',
      matchmarkerLoginSite:'',
      matchmarkerRegisterSite:'',
      menuList: [
        {
          path: "/",
          name: "首页",
        },
        {
          path: "/function",
          name: "功能表",
        },
        {
          path: "/activity",
          name: "活动",
        },
        {
          path: "/merchant",
          name: "合伙人",
        },
        {
          path: "/matchmarker",
          name: "红娘助手",
        },
      ],
    };
  },
  methods: {},
  mounted() {
    this.matchmarkerLoginSite=this.$nuxt.$config.VUE_APP_MATCHMARKER_LOGIN_SITE
    this.matchmarkerRegisterSite=this.$nuxt.$config.VUE_APP_MATCHMARKER_REGISTER_SITE
    this.storeLoginSite=this.$nuxt.$config.VUE_APP_STORE_LOGIN_SITE
    this.storeRegisterSite=this.$nuxt.$config.VUE_APP_STORE_REGISTER_SITE
  },
};
</script>

<style scoped lang="less">
@import "~assets/css/variable";
.nav-block{
  .locate-store{
    align-items: center;
    .head-item{
      img{
        width: 60px;
        height: 60px;
      }
    }
    .info-text{
      margin-left: 10px;
      font-size: 16px;
      i{
        color: #EE2742;
        margin-left: 5px;
      }
      div:first-child{
        font-weight: bold;
      }
      div:last-child{
        margin-top: 8px;
        color: #999999;
        font-size: 14px;
      }
    }
  }
  .right-content{
    align-items: center;
    .btn{
      background: #9e2ecd;
      color: #fff;
      padding: 8px 15px;
      border-radius: 8px;
      &:nth-of-type(2){
        margin-left: 20px;
      }
    }
    .qrcode{
      margin-left: 30px;
      img{
        width: 80px;
        height: 80px;
      }
    }
  }

}

.logo{
  img{
    width: 195px;
  }
}
.top-bar {
  height: 35px;
  background: #f8f8f8;
  border-bottom: 1px solid #ebebeb;
  p {
    line-height: 35px;
    margin: 0px;
    font-size: 13px;
    font-weight: normal;
    display: inline-block;
  }
  ul {
    li {
      display: inline-block;
    }
  }
  .right-sec {
    float: right;
    ul {
      float: left;
    }
    li {
      border-right: 1px solid #dddddd;
      margin-right: 10px;
      margin-top: 10px;
      line-height: 14px;
      padding-right: 10px;
      a {
        font-size: 13px;
        color: @line-color;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
}

header {
  .navbar {
    background: @theme-background;
    line-height: 55px;
  }
  .nav-link {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: @nav-color;
    text-align: center;
    &:hover {
      color: @nav-active-color;
    }
    &.active {
      color: @nav-active-color;
    }
  }
}
</style>
