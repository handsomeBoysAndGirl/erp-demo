import {post,get} from './http'


//登录
export const apiLogin = data => post("/api/login",data);

//获取往来单位
export const wanglai = data => get("/api/wanglai",data);


//获取往来单位
export const produit = data => get("/api/produit",data);