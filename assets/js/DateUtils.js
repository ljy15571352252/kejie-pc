const DateUtils = {
  getInterval: function (_date, targetDate, target) {// 固定日期和当前日期的比较计算时差天数，例如：getInterval("2016-09-23")
    let date1 = _date.getTime(), date2 = targetDate.getTime()
      let cacl=0
    switch (target) {
      case 'd'://计算两个时间相差的天数
        return Math.ceil((date1 - date2) / (24 * 3600 * 1000))
      case 'm'://计算相差的分钟数
          cacl = _date - targetDate
          let leave1 = cacl % (24 * 3600 * 1000)
        return Math.ceil(leave1 / (60 * 1000))
      case 'h':
          cacl = _date - targetDate
        if (cacl < 0) return 0
        return Math.ceil(cacl / 1000 / 60 / 60)
    }
  },
  parserDate: function (date) {//把字符串日期格式转成Date对象
    date = date.replace(/\+/g, ' ')
    let iosDate = date.replace(/-/g, '\/')
    let t = Date.parse(new Date(date)) || Date.parse(new Date(iosDate))
    // wrong
    if (!isNaN(t)) {
      return new Date(Date.parse(date.replace(/-/g, '/')))
    } else {
      //com in here
      return new Date()
    }
  },
  formatDate: function (date) {//把Date对象转成 2016-09-23格式
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  },
  printDateByRemain: function (remain) {//输出距离当前时间多少天后的日期
    let date2 = new Date()
    date2.setDate(date2.getDate() + remain)
    let times = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
    return times
  },
  timeStampToDate: function (timeStamp, fmt) {
    if (typeof timeStamp === 'undefined') {
      return null
    }
    if (typeof fmt === 'undefined') {
      return new Date(timeStamp)
    }
    return new Date(timeStamp).Format(fmt)
  }
}

Date.prototype.Format = function (fmt) {	//author: meizz
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

Date.prototype.isAfter = function (date) {
  return ((new Date(this.toString().replace(/-/g, '\/'))) > (new Date(date.toString().replace(/-/g, '\/'))))
}

export default DateUtils

