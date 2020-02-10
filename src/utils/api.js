import {post,get} from './http'


//登录
export const apiLogin = data => post("/api/login",data);