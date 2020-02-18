import Mock from 'mockjs'
//import qs from 'qs'
const Random = Mock.Random;
const Domain = "http://localhost:8089"
// 构建一个函数对象，返回mock数据
const mockData = function () {
    let data = {
        code: 1,
        msg: "登录成功"
    };
    // 此处省略对data的一系列运算
    return {
        data: data
    }
}


// url是真实的url，第二个参数是post和get都管，第三个参数就是传入函数对象
Mock.mock(`${Domain}/api/test`, /post/i, mockData);

Mock.mock(`${Domain}/api/login`, 'post', opts => {
    let optss = JSON.parse(`${opts.body}`)
    let data = {
        code: -1,
        msg: '',
        token: '',
        name: '',
    }
    if (optss.name != "" && optss.name === "twj" && optss.pass == "123") {
        data.code = 1;
        data.msg = "success";
        data.token = "123456789";
        data.name = Random.cname();
        return data;

    }
    return data;
});


//获取数据拦截
Mock.mock(`${Domain}/api`)