// app.js
App({
    /**
     * 全局属性
     */
    globalData: {
        //用户认证
        key : 'cda4929d4b2f4b81bdf36e648a590ec9',

        //城市地理搜索URL
        locationUrl : 'https://geoapi.qweather.com/v2/city/lookup',

        //天气实况URL
        weatherUrl : 'https://devapi.qweather.com/v7/weather/now',

        //空气质量URL
        airUrl : 'https://devapi.qweather.com/v7/air/now',

        //逐时天气预报URL
        hourUrl : 'https://devapi.qweather.com/v7/weather/24h',

        //三天预报URL
        threeUrl : 'https://devapi.qweather.com/v7/weather/3d',

        //生活指数URL
        liveUrl : 'https://devapi.qweather.com/v7/indices/1d',

        //热门城市URL
        topUrl : 'https://geoapi.qweather.com/v2/city/top'
    }
})
