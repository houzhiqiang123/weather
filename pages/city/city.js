
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

    /**
     * 初始数据
     */
    data : {
        //城市名
        city : '',

        //经纬度
        location : '',

        //热门城市
        topList : [],

        //历史城市
        historyCity : [],

        //close,display
        iconState : 'none',

        //ui,display
        uiState : 'block',

        //输入的城市名
        inputCity : '',

        //搜索的城市列表
        cityList : []
    },

    /**
     * 加载
     */
    onLoad(option){

        //获取城市地理位置
		utilsLocation.get(appInst.globalData.key, appInst.globalData.locationUrl).then(res=>{
			this.setData({
				city : res.adm2 + ',' + res.name,
				location : res.lon + ',' + res.lat
			})

            //热门城市
            utilsWeather.get(appInst.globalData.key, appInst.globalData.topUrl).then(res=>{
                this.setData({
                    topList : res.topCityList
                })

            })

            //历史城市
            this.setData({
                historyCity : this.getStroageLocation()
            })
		})
    },

    /**
     * 提交定位地理
     */
    sendLocation(e){
        // console.log(e)

        const obj = e.currentTarget.dataset

        //得到经纬度
        let location = obj.location

        //得到城市名
        let city = obj.city

        //判断是否选择了定位的城市
        if(Object.keys(obj).length === 0){
            location = this.data.location
            city = this.data.city
        } else {
            //非定位城市，写入本地存储
            this.setStroageLocation(obj)
            // console.log(obj)
        }

        // console.log(location)
        // console.log(city)

        //跳转并关闭所有页面
        wx.reLaunch({
            url: '/pages/index/index?location=' + location + '&city=' + city,
            success: (result)=>{
                
            },
            fail: ()=>{},
            complete: ()=>{}
        })
    },

    /**
     * 写入本地存储
     */
    setStroageLocation(obj){
        //先读取本地存储，如果没有，则创建空数组
        const locationList = this.getStroageLocation() || []

        //判断超过5条，则每次删除最后一条
        if(locationList.length >= 5){
            locationList.pop()
        }

        //通过ID字段查询重复
        const flag = locationList.findIndex(item => {
            return item.id === obj.id
        })

        //如果没有存储，则存储
        if(flag === -1){

            //将城市信息写入数组
            locationList.unshift(obj)

            //写入本地存储
            wx.setStorageSync('location', locationList)
        }

        
    },

    /**
     * 获取本地存储
     */
    getStroageLocation(){
        return wx.getStorageSync('location')
    },

    /**
     * 输入城市事件
     */
    inputCity(e){
        // console.log(e)
        //显示close,ui
        this.setData({
            iconState : 'block',
            uiState : 'none'
        })

        //手动清空时
        if(e.detail.value === ''){
            this.setData({
                iconState : 'none',
                uiState : 'block',
                cityList : []
            })
        } else {
            //查询城市
            utilsWeather.get(appInst.globalData.key, appInst.globalData.locationUrl, e.detail.value).then(res => {
                console.log(res)
                if(res.code !== '404'){
                    this.setData({
                        cityList : res.location
                    })
                }
            })
        }
    },

    /**
     * 清空输入框
     */
    clearCity(){
        this.setData({
            iconState : 'none',
            inputCity : '',
            uiState : 'block',
            cityList : []
        })
    }
})