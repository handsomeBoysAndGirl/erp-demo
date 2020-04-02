module.exports = {
    devServer:{
        port:8089,
        open:true,
        // proxy: {
        //     '/api': {//代理api
        //         target: "http://localhost:5000",//服务器api地址
        //         changeOrigin: true,//是否跨域
        //         ws: true, // proxy websockets
        //     }
        // }
    }
}