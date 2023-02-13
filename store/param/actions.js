
// 异步修改状态
export default {
  async nuxtServerInit({commit, dispatch}, {req, res}) {
    let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("nuxt初始化完毕", "来访ip:" + user_ip)
  },
}
