
export const getFunctionList = ($axios,data) => $axios.get('/gw-back/functions/list',{params:data})

export const getFunctionDetail=($axios,code)=>  $axios.get(`/gw-back/functions/detail/${code}`)
