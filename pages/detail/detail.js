
/**
 * 全局引入
 */
const appInst = getApp()

/**
 * 获取天气模块
 */
const utilsWeather = require('../../utils/weather')

Page({

    /**
     * 初始数据
     */
    data : {
        location : '',
        city : '',

        //整合对象
        obj : null
    },

    /**
     * 加载
     */
    onLoad(option){
        this.setData({
            location : option.location,
            city : option.city
        }),

        //整合数据
        this.setObj()
    },

    /**
     * 整合天气实况和空气质量
     */
    setObj(){
		//获取天气实况
        utilsWeather.get(appInst.globalData.key, appInst.globalData.weatherUrl, this.data.location).then(weather=>{
            //获取空气质量
            utilsWeather.get(appInst.globalData.key, appInst.globalData.airUrl, this.data.location).then(air=>{
                // console.log(weather)
                // console.log(air)
                
                //合并主天气
                let main = {
                    'icon' : weather.now.icon,
                    'text' : weather.now.text,
                    'temp' : weather.now.temp + '&#176;C'
                }

                //合并详情
                main.details = [
                    {
                        'id'        : 1,
                        'icon'    : '501',
                        'text'    : weather.now.windDir,
                        'content' : '风力' + weather.now.windScale + '级'
                    },
                    {
                        'id'        : 2,
                        'icon'    :'512',
                        'text'    : '空气质量',
                        'content' : air.now.aqi + '/' + air.now.category
                    },
                    {
                        'id'        : 3,
                        'icon'    : '318',
                        'text'    : '降水量',
                        'content' : weather.now.precip + '%'
                    },
                    {
                        'id'      : 4,
                        'icon'    : '399',
                        'text'    : '湿度',
                        'content' : weather.now.humidity + '%'
                        
                    },
                    {
                        'id'      : 5,
                        'icon'    : '500',
                        'text'    : '能见度',
                        'content' : weather.now.vis + '/km' 
                    },
                    {
                        'id'      : 6,
                        'icon'    : '102',
                        'text'    : '大气压强',
                        'content' : weather.now.pressure + '/百帕'
                    }
                ]
                // console.log(main)
                this.setData({
                    obj : main
                })
            })
		})
    }
})