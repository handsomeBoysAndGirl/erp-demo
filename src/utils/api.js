import {post,get} from './http'

//登录
export const apiLogin = data => post("/api/login",data);

//获取往来单位
export const wanglai = data => post("/api/wanglai",data);

//获取销售的具体药品
export const getskuall = data =>post("/api/allsku",data);

//获取所有销售单据
export const getAllSale = data =>get("/api/getallsale");
