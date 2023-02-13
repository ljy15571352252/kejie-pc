
export const PAGE = {
    INDEX: 1,//1_首页数据
    FUNCTIONS: 2,//2_功能表数据
    ACTIVITY: 3,//3_活动数据
    MERCHANT: 4,//4_合伙人数据
    MATCHMARKER: 5,//5_红娘助手数据
}

//https://www.cnblogs.com/moringyaozheng/p/13810208.html
export const getPageTemplate = ($axios,{type}) => $axios.get('/gw-back/page-data',{params:{type}})
