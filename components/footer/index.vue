<template>
  <div>
    <footer class="footer">
      <div class="container">
        <el-row>
          <el-col :span="5" class="left-section">
            <div class="logo"> <nuxt-link to="/"><img src="~/static/images/logo/logo-white.png" alt="" ></nuxt-link> </div>
            <p>
              服务热线
            </p>
            <p class="phone">400-8828-858</p>
            <p>周一到周五：09:00 - 22:00</p>
          </el-col>
          <!-- Categories -->
          <el-col :span="4" v-for="i in 3" class="right-section" :key="i">
            <h4>帮助中心</h4>
            <ul>
              <li v-for="i in 3" :key="i">
                <nuxt-link  class="nav-link el-link" to="/" target="_blank">默认链接</nuxt-link>
              </li>
            </ul>
          </el-col>
          <el-col :span="4" class="right-section">
              <div class="qrcode-item">
                <div><img src="~static/images/qrcode.jpg"/></div>
                <p>微信扫一扫，进入小程序</p>
              </div>
          </el-col>
        </el-row>
      </div>
    </footer>
    <div class="footer-copyright">
      <div class="container" >
        Copyright©2017-2019 www.yqs.com All Rights Reserved. 广州市拍拍贷投资管理有限公司 <nuxt-link to="/" target="_blank">粤ICP备14045463号</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped lang="less">
@import "~assets/css/variable";
.footer-copyright{
  background: #5b2a71;
  display: none;
  padding: 10px 0;
  font-size: 13px;
  a{
    margin-left: 10px;
  }
}
.footer{
  background: @theme-background;
  padding: 20px 0;
  color: @white;
  .logo{
    img{
      width: 150px;
    }
  }
  .left-section{
    p{
      margin-top: 12px;
      &.phone{
        font-size: 20px;font-weight: bold;
      }
    }
  }
  .right-section{
    border-left: 1px solid @white;
    padding-left: 17px;
    h4{
      font-size: 16px;
      margin-bottom: 15px;
    }
    ul{
      li{
        margin-bottom: 13px;
        .nav-link{
          font-size: 13px;
          color: @nav-color;
          &:hover{
            color: @nav-active-color;
          }
        }
      }
    }
    .qrcode-item{
      div{
        text-align: center;
        img{
          width: 120px;height: 120px;
        }
      }

      p{
        text-align: center;
        margin-top: 15px;
        font-size: 13px;
      }
    }
  }
}

</style>
