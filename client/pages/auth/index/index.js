//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')


Page({
    data: {
        userInfo: {},
        currentTab: 0, 
        weekList: ['一','二','三','四','五','六','日'],    // 星期池
        lastMonthList: [],                               // 上月日期池
        currentMonthList: [],                            // 当月日期池
        nextMonthList: [],                               // 下月日期池
        lastEventList: [],                               // 上月月事件池
        currentEventList: [],                            // 当月事件池
        nextEventList: [],                               // 下月事件池
        year: '',
        month: '',
        day: '' 
    },

    changeTab (e) {
    	this.setData({
            currentTab : e.currentTarget.dataset.tab
        })
    },

    getStorage (res){
        this.setData({
            userInfo : res.data
        })
    },

    onLoad: function(){
        var _this = this;
        wx.getStorage({
            key:'userInfo',
            success: function(res) {
                _this.getStorage(res)
            } 
        })

    	var today = new Date();                         // 获取当日日历
    	var year = today.getFullYear(),
    		month = today.getMonth() + 1,
    		day = today.getDate();
    	this.setData({
    		year: year,                                 // 获取当前年份
	        month: month,                               // 获取当前月份,注意月份需+1
	        day: day                                    // 获取当前日期
    	})
        this.fetchMonthData(year , month ,0)            // 获取本月日历
        this.fetchMonthData(year , month -1,-1)         // 获取上月日历
        this.fetchMonthData(year , month +1,1)          // 获取下月日历
    },

    fetchMonthData(year, month ,type) {
        var ret = []

        var firstDay = new Date(year, month -1, 1)
        var firstDayWeekDay = firstDay.getDay()
        if(firstDayWeekDay === 0) firstDayWeekDay = 7

        var lastDayLastMonth = new Date(year , month -1, 0)
        var lastDayOfLastMonth = lastDayLastMonth.getDate()

        var preMonthDayCount = firstDayWeekDay - 1

        var lastDay = new Date(year, month , 0);
        var lastDate = lastDay.getDate()

        for(var i=0; i<7*6; i++){
            var date = i + 1 - preMonthDayCount;
            var showDate = date
            var thisMonth = month

            // 上一月
            if(date <= 0){
                thisMonth = month -1
                showDate = lastDayOfLastMonth + date
            }
            // 下一月
            else if (date > lastDate) {
                thisMonth = month + 1
                showDate = showDate - lastDate
            };

            if(thisMonth === 0) thisMonth = 12
            if(thisMonth === 13) thisMonth = 1

            ret.push(showDate)
        }

        var arr = []

        // 去除非本月日历
        ret.forEach((element, index) =>{
            if(index < preMonthDayCount){
                element = ''
            }else if(index >20 && element <15){
                element = ''
            }
            arr.push(element)
        })

        if(type === 0){
        	this.setData({
        		currentMonthList: arr
        	})
        }else if(type === -1){
        	this.setData({
        		lastMonthList: arr
        	})
        }else if(type === 1){
        	this.setData({
        		nextMonthList: arr
        	})
        }
    },
})