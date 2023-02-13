/**
 * 日期格式化
 * @param value
 * @param type
 * @returns {*}
 */
export function formatTime(value, type) {
    if (value == null||value==='') {
        return null;
    }

    let dataTime = '';
    let data = new Date();
    data.setTime(value);
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let day = data.getDate();
    let hour = data.getHours();
    let minute = data.getMinutes();
    let second = data.getSeconds();

    if (hour < 10) {
        hour = '0' + hour;
    }

    if (minute < 10) {
        minute = '0' + minute;
    }

    if (second < 10) {
        second = '0' + second;
    }

    if (type === 'YMD') {
        dataTime = year + '-' + month + '-' + day;
    } else if (type === 'YMDHMS') {
        dataTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    } else if (type === 'HMS') {
        dataTime = hour + ':' + minute + ':' + second;
    } else if (type === 'YM') {
        dataTime = year + '-' + month;
    }
    return dataTime;
}


/**
 * 价格保持2位数字
 * @param value
 * @returns {string}
 */
export function price(value) {
    if (!value)
        return ''
    value = parseFloat(value)
    return value.toFixed(2)
}

export function sex(val) {
    if (typeof val === 'undefined')
        return ""
    return val ? '男' : '女'
}

/**
 * 过滤掉空字符串
 */
export function escapeEmpty(val, str) {
    if (typeof val == 'undefined' || val == null)
        return str
    return val
}
