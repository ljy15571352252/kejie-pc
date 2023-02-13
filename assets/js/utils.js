/**
 * 判断是否空对象
 * @param data
 * @returns {boolean}
 */
export function isEmptyObject(data){
  if (typeof data === 'number') //数字都不为空
  {
    return false
  }
  if (data === undefined || data === null || data === '') {
    return true
  }
  if (data.__proto__.constructor === Array) //如果是数组
  {
    return data.length === 0
  }
  if (typeof data === 'object') { //如果是json对象
    for (let i in data) {
      return !1
    }
    return !0
  }
  return false
}

/**
 * json转formdata
 * @param json
 * @returns {string}
 */
export function jsonToFormData(json){
  let str = ''
  for (let key in json) {
    let value = json[key]
    if (value != null && typeof value !== 'undefined'&&value!=='null') {
      if (value.__proto__.constructor === Array) {
        for (let index in value) {
          if (typeof value[index] !== 'function') {
            str += '&' + key + '=' + value[index]
          }
        }
        continue
      }
      str += '&' + key + '=' + value
    }
  }
  return str === '' ? str : str.substr(1)
}

/**
 * 合并json
 * @param json
 * @param obj
 * @returns {*}
 */
export function concatJson(json,obj) {
    let data=copyJson(json)
     for (let key in obj){
         let value = obj[key]
         data[key]=value

     }
    return escapeEmptyValue(data)
}

/**
 *
 * @param json
 */
export function escapeEmptyValue (json) {
  let data={}
  for (let key in json) {
    let value = json[key]
    if (value != null && typeof value !== 'undefined' && value !== '') {
      data[key]=value
    }
  }
  return data
}

/**
 * 重置json
 * @param json
 */
export function resetToNullValue (json) {
  for (let key in json) {
    json[key]=null
  }
}

export function copyJson(json){
  return JSON.parse(JSON.stringify(json))
}

export function getLocationPathQuery() {
  let query = window.location.search;
  let json = {};
  if (query) {
    query = query.substr(1);
    let arr = query.split('&');
    for (let index in arr) {
      let str = arr[index];
      json[str.split('=')[0]] = str.split('=')[1];
    }
  }
  return json;
};