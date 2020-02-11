import Mock from 'mockjs'

const data = {
    "id": "@guid",
    "name": "@cname",
};

const wanglai = [{
        "bw_id": "3",
        "name": "贵州九州通达医药有限公司",
        "suoxie": "GZJZTDYYYXGS",
        "type": 1,
        "shuihao": "9152011308278846XT",
        "zhanghu": "2402001109200113340",
        "address": "贵州省贵阳市白云区掌坡路186号",
        "fanwei_c": "zyyp,zcy,ptyp,ksszj,zyc,fyp",
        "is_tingshou": 2,
        "value": "贵州九州通达医药有限公司  GZJZTDYYYXGS 正常销售"
    },
    {
        "bw_id": "46",
        "name": "遵义市银花药业有限公司",
        "suoxie": "ZYSYHYYYXGS",
        "type": 1,
        "shuihao": "91520321596363477A",
        "zhanghu": "0248001500000026",
        "address": "贵州省遵义市播州区桂花社区龙泉工业园区内",
        "fanwei_c": "zyyp",
        "is_tingshou": 2,
        "value": "遵义市银花药业有限公司  ZYSYHYYYXGS 正常销售"
    }
]

const user = {
    "be_id": "39",
    "name": "樊娅",
    "suoxie": "FY",
    "station": "station_pro",
    "state": "y",
}

const product = [{
        "bp_id": 2,
        "name": "盐酸肾上腺素注射液",
        "factory": "远大医药（中国）有限公司",
        "guige": "1ml:1mg*10只",
        "suoxie": "YSSSXSZSY",
        "otc": "cfy",
        "gsp": "ptyp",
        "danwei": "盒",
        "jianzhuang": 300,
        "step": 0.3,
        "jx": "jx_zsj",
        "ghdw": "贵州九州通达医药有限公司",
        "value": "*盐酸肾上腺素注射液* [YSSSXSZSY] [远大医药（中国）有限公司] [1ml:1mg*10只] [jx_zsj] 库存：20盒",
        "price": 0,
        "shuliang": 0,
    },
    {
        "bp_id": 3,
        "name": "伊曲康唑胶囊（易启康）",
        "factory": "成都倍特药业有限公司",
        "guige": "0.1g*7s",
        "suoxie": "YQKSJNYQK",
        "otc": "cfy",
        "gsp": "ptyp",
        "danwei": "盒",
        "jianzhuang": 300,
        "step": 1,
        "jx": "jx_jnj",
        "ghdw": "贵州九州通达医药有限公司",
        "value": "*伊曲康唑胶囊（易启康）* [YQKSJNYQK] [成都倍特药业有限公司] [0.1g*7s] [jx_jnj] 库存：20盒",
        "price": 0,
        "shuliang": 0,
    },
    {
        "bp_id": 4,
        "name": "醋酸地塞米松片",
        "factory": "浙江仙琚制药股份有限公司",
        "guige": "0.75mg*100s",
        "suoxie": "CSDSMSP",
        "otc": "cfy",
        "gsp": "ptyp",
        "danwei": "盒",
        "jianzhuang": 450,
        "step": 1,
        "jx": "jx_jnj",
        "ghdw": "贵州九州通达医药有限公司",
        "value": "*醋酸地塞米松片* [YSSSXSZSY] [浙江仙琚制药股份有限公司] [0.75mg*100s] [jx_jnj] 库存：20盒",
        "price": 0,
        "shuliang": 0,
    }
]

Mock.mock('/api/test', 'post', data)
Mock.mock('/api/wanglai', 'post', wanglai)
Mock.mock('/api/product', 'post', product)
Mock.mock('/api/user', 'post', user)

export default Mock;