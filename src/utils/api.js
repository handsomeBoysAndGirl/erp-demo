import {post,get} from './http'

//登录
export const apiLogin = data => post("/api/login",data);

//获取往来单位
export const wanglai = data => post("/api/wanglai",data);

//获取销售的具体药品
export const getskuall = data =>post("/api/allsku",data);


//发票部分
//获取所有发票列表
export const allFapiao = data => post("/api/getallfp");

//获取所有销售单据
export const getAllSale = data =>get("/api/getallsale");

//获取相关往来单位含未开发票产品的单据列表
export const getFpList = data =>get("/api/getfplist",data);


//申请发票内勤处理
export const dealFp = data => post("/api/dealFp");
