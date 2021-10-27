/**
 * 获取天气模块
 */
const get = (key, url, location = '', type='')=>{
    //Promise异步处理
    return new Promise((resolve,reject)=>{
        wx.request({
			url: url,
			data: {
				key : key,
				location : location,
				type : type
			},
			header: {'content-type':'application/json'},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (res)=>{
				resolve(res.data);
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