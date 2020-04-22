import {post,get} from './http'

//登录
export const apiLogin = data => post("/api/login",data);

//获取往来单位
export const wanglai = data => get("/api/wanglai",data);

//获取销售的具体药品
export const getskuall = data =>get("/api/produit/sale",data);
/**
 *  bp_id 
    bw_id 
    fanweik 
 */

//获取近十次销售价格
export const getprice = data =>get("/api/price",data);
/**
 * bp_id
 * psk_id
 */

//发票部分
//获取所有发票列表
export const allFapiao = data => post("/api/getallfp");

//获取所有销售单据
export const getAllSale = data =>get("/api/getallsale");

//获取相关往来单位含未开发票产品的单据列表
export const getFpList = data =>get("/api/getfplist",data);


//申请发票内勤处理
export const dealFp = data => post("/api/dealFp");

//获取产品
export const produit = data => get("/api/produit",data);

/*草稿*/
//添加草稿
export const addCaogao = data => post("/api/caogao/add",data);
//获取草稿
export const getCaogao = data => get("/api/caogao/list",data);
//获取草稿详情
export const getCaogaoDetail = data => get("/api/caogao/detail",data);

/*单据*/
//获取单据
export const getDanju = data => get("/api/danju",data);
//获取单据详情
export const getDanjuDetail = data => get("/api/danju/Detail",data);


