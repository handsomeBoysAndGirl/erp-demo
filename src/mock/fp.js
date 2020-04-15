import Mock from 'mockjs'
//import qs from 'qs'
const Random = Mock.Random;
const Domain = "http://localhost:8089"

import {fapiaoList} from './data.js'

Mock.mock(`${Domain}/api/getallfp`, 'post',fapiaoList);

//获取数据拦截
Mock.mock(`${Domain}/api`)
export default Mock;