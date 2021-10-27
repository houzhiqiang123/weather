/**
 * 全局引入
 */
const appInst = getApp()

/**
 * 获取城市地理模块
 */
const utilsLocation = require('../../utils/location')

/**
 * 获取天气模块
 */
const utilsWeather = require('../../utils/weather')
Page({
	data: {
		//城市名
		city : '',

		//经纬度
		location : '',

		//天气实况
		weather : null,

		//空气质量
		air : null,

		//逐时预报
		hour : null,

		//三天预报
		three : null,

		//生活指数
		live : null
	},

	/**
	 * 加载数据
	 */
	onLoad(options){
		// console.log(options)

		//判断options是否有值
		if(Object.keys(options).length === 0){
			//获取城市地理位置
			utilsLocation.get(appInst.globalData.key, appInst.globalData.locationUrl).then(res=>{
				this.setData({
					city : res.adm2 + ',' + res.name,
					location : res.lon + ',' + res.lat
				})

				//运行
				this.run()
			})
		}else {
			this.setData({
				city : options.city,
				location : options.location
			})

			//运行
			this.run()
		}
	},

	/**
	 * 运行
	 */
	run(){
		//获取天气实况
		this.getWeather()
		//获取空气质量
		this.getAir()
		//获取逐时预报
		this.getHour()
		//获取三天预报
		this.getThree()
		//获取生活指数
		this.getLive()
	},

	/**
	 * 获取天气实况
	 */
	getWeather(){
		utilsWeather.get(appInst.globalData.key, appInst.globalData.weatherUrl, this.data.location).then(res=>{
			//格式化温度
			res.now.temp += '&#176;C'
			// console.log(res);
			this.setData({
				weather : res
			})
		})
		
	},

	/**
	 * 获取空气质量
	 */
	getAir(){
		utilsWeather.get(appInst.globalData.key, appInst.globalData.airUrl, this.data.location).then(res=>{
			
			//创建一组等级颜色
			switch(res.now.level){
				case '1' : 
					res.now.bgcolor = 'limegreen'
					break
				case '2' : 
					res.now.bgcolor = 'gold'
					break
				case '3' : 
					res.now.bgcolor = 'orange'
					break
				case '4' : 
					res.now.bgcolor = 'red'
					break
				default : 
					res.now.bgcolor = 'maroon'
			}
			// console.log(res)
			this.setData({
				air : res
			})
		})
	},

	/**
	 * 获取逐时预报
	 */
	getHour(){
		utilsWeather.get(appInst.globalData.key, appInst.globalData.hourUrl, this.data.location).then(res=>{
			//遍历修改
			res.hourly.forEach(element => {
				//修改温度显示	
				element.temp += '&#176;C'
				//修改时间显示
				element.fxTime = element.fxTime.substring(11,16)
				// console.log(element.fxTime)

			})


			this.setData({
				hour : res
			})
		})
	},

	/**
	 * 三天预报
	 */
	getThree(){
		utilsWeather.get(appInst.globalData.key, appInst.globalData.threeUrl, this.data.location).then(res=>{
			//创建	今明后
			res.daily[0].day = '今天'
			res.daily[1].day = '明天'
			res.daily[2].day = '后天'

			//遍历赋值
			res.daily.forEach(element => {
				//修改温度显示
				element.temp = element.tempMin + '/' + element.tempMax + '&#176;C'

				//修改成：晴转多云 模式
				if(element.textDay === element.textNight){
					element.text = element.textDay
				} else {
					element.text = element.textDay + '转' + element.textNight
				}

			})
			// console.log(res)
			this.setData({
				three : res
			})
		})
	},

	/**
	 * 生活指数
	 */
	getLive(){
		utilsWeather.get(appInst.globalData.key, appInst.globalData.liveUrl, this.data.location, '1,2,3,5,6,9').then(res => {
			// console.log(res)

			this.setData({
				live : res
			})
		})
	},

	/**
	 * 生活指数弹窗
	 */
	showDetails(e){
		// console.log(e)

		//详情对象
		const details = e.currentTarget.dataset.item
		// console.log(details)

		//弹窗
		wx.showModal({
			title: details.name,
			content: details.text,
			showCancel: false,
			confirmText: '确定',
			confirmColor: '#3880fe',
			success: (result) => {
				if(result.confirm){
					
				}
			},
			fail: ()=>{},
			complete: ()=>{}
		})
	}
})
