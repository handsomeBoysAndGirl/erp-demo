export default {

   TimeConversion:(num)=>{
    return num > 9 ? (num + "") : ("0" + num);
    },
    //将中国标准时间转为征程Y-M-D 格式
   formatDate:(date,vm)=>{
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return year + "-" + vm.$tools.TimeConversion(month) + "-" + vm.$tools.TimeConversion(day);
    },
    //四舍六入五成双，财务计算精度
    FinanceDeal:(num)=>{
        //保留位数
        let d = 2;
        let m = Math.pow(10, d);
        let n = +(d ? num * m : num).toFixed(8);
        let i = Math.floor(n), f = n - i;
        let e = 1e-8;
        let r = (f > 0.5 - e && f < 0.5 + e)?((i % 2 == 0) ? i : i + 1) : Math.round(n);
        let nums = d ? r / m : r;
        return nums;
    },
    in_array:(search,array)=>{
        for(var i in array){
            if(array[i]==search){
                return true;
            }
        }
        return false;
    },
    
    randomNumber:()=> {
        const now = new Date();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        month = this.setTimeDateFmt(month);
        day = this.setTimeDateFmt(day);
        hour = this.setTimeDateFmt(hour);
        minutes = this.setTimeDateFmt(minutes);
        seconds = this.setTimeDateFmt(seconds);
        let orderCode =
          "CD" +
          now.getFullYear().toString() +
          month.toString() +
          day +
          Math.round(Math.random() * 1000000).toString();
        return orderCode;
      }
}