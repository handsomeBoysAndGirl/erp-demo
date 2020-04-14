import {post,get} from './http'


//登录
export const apiLogin = data => post("/api/login",data);

//获取往来单位
export const wanglai = data => get("/api/wanglai",data);


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