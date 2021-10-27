/**
 * 获取城市地理位置
 */
const get = (key, url)=>{
    //Promise异步处理
    return new Promise((resolve,reject)=>{
        //定位API
        wx.getLocation({
            type: 'wgs84',
            altitude: false,
            success: (res)=>{
                //通过经纬度查询城市
                wx.request({
                    url: url,
                    data: {
                        key : key,
                        location : res.longitude + ',' + res.latitude
                    },
                    header: {'content-type':'application/json'},
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: (result)=>{
                        const obj = result.data.location[0]
                        resolve(obj)
                        
                    },
                    fail: ()=>{},
                    complete: ()=>{}
                })
            },
            fail: ()=>{},
            complete: ()=>{}
        })
    })
}

/**
 * 导出，对外接口
 */
module.exports = {
    get : get
}