import Mock from 'mockjs'
//import qs from 'qs'
const Random = Mock.Random;
const Domain = "http://localhost:8089"

//获取发票列表
import {fapiaoList,newfapiao} from './data.js'

Mock.mock(`${Domain}/api/getallfp`, 'post',fapiaoList);


//获取发票单据
Mock.mock(RegExp(`${Domain}/api/getfplist`+'.*'),'get',newfapiao);

//获取数据拦截
Mock.mock(`${Domain}/api`)
export default Mock;