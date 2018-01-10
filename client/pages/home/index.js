//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
    data: {
        userInfo: {},
        currentTab: 0,                                   // 底部当前tab
        weekList: ['一','二','三','四','五','六','日'],    // 星期池
        lastMonthList: [],                               // 上月日期池
        currentMonthList: [],                            // 当月日期池
        nextMonthList: [],                               // 下月日期池
        lastMonthEventList: [],                          // 上月月事件池
        currentMonthEventList: [],                       // 当月事件池
        nextMonthEventList: [],                          // 下月事件池
        year: '',
        month: '',
        day: '' 
    },

    changeTab (e) {
        let tab = e.currentTarget.dataset.tab;
        let color = '', bg_color = '', title = '';
        switch (tab){
            case '0':
                color = '#000000';
                bg_color = '#f4f4f4';
                title = '随风-Web Developer';
                break;
            case '1':
                color = '#000000';
                bg_color = '#f4f4f4';
                title = '日程';
                break;
            case '2':
                color = '#ffffff';
                bg_color = '#55cbc4';
                title = '问答';
                break;
            case '3':
                color = '#000000';
                bg_color = '#f4f4f4';
                title = '我的';
                break;
            default:
                color = '#000000';
                bg_color = '#f4f4f4';
                title = '随风-Web Developer';
        }
        console.log('bg_color:',bg_color)
        wx.setNavigationBarColor({
            frontColor: color,
            backgroundColor: bg_color
        })
        wx.setNavigationBarTitle({
            title: title
        })

    	this.setData({
            currentTab : e.currentTarget.dataset.tab
        })
    },

    getStorage (res){
        this.setData({
            userInfo : res.data
        })
    },

    goToAnswer(){
        this.setData({
            currentTab : 2
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

        this.fetchEventData(year, month, 0)             // 获取本月日历
        this.fetchEventData(year, month-1, -1)          // 获取上月日历
        this.fetchEventData(year, month+1, 1)           // 获取下月日历
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

    fetchEventData(year, month, type){
        var _this = this;
        wx.request({
            url: config.service.getScheduleListByMonth,
            method: 'post',
            data: {
                month: year + ((month.length) > 1 ? '-' : '-0') + month
            },
            success(result) {
                var arr = result.data.data.data;
                var rst = [], eventList = [], monthList = [];
                if(type === 0){
                    monthList = _this.data.currentMonthList
                }else if(type === -1){
                    monthList = _this.data.lastMonthList
                }else if(type === 1){
                    monthList = _this.data.nextMonthList
                }

                monthList.forEach(function(ele, i){
                    if(result.data.data.data.length){
                        (result.data.data.data).forEach(function(item, index){
                            if(Number(item.date.split('月')[1].substring(0,2)) == ele){
                                eventList.push({
                                    event: item.event_title
                                })
                                rst.push({
                                    day: ele,
                                    event: eventList
                                })
                            }else{
                                rst.push({
                                    day: ele,
                                    event: []
                                })
                            }
                        })

                        if(rst.length ==2){
                            for (var i = 0;i<rst.length;i++) {
                                for (var j =1;j<rst.length;j++) {
                                    if(rst[i].day == rst[j].day){
                                        rst.splice(j,1)
                                    }
                                }
                            }
                        }else{
                            for (var i = 0;i<rst.length;i++) {
                                for (var j =1;j<rst.length-1;j++) {
                                    if(rst[i].day == rst[j].day){
                                        rst.splice(j,1)
                                    }
                                }
                            }
                        }

                    }else{
                        rst.push({
                            day: ele,
                            event: []
                        })
                    }
                });
                if(result.data.data.data.length){
                    // 去重
                    if(rst.length ==2){
                        for (var i = 0;i<rst.length;i++) {
                            for (var j =1;j<rst.length;j++) {
                                if(rst[i].day == rst[j].day){
                                    rst.splice(j,1)
                                }
                            }
                        }
                    }else{
                        for (var i = 0;i<rst.length;i++) {
                            for (var j =1;j<rst.length-1;j++) {
                                if(rst[i].day == rst[j].day){
                                    rst.splice(j,1)
                                }
                            }
                        }
                    }
                }
                

                if(type === 0){
                    console.log('rst1:',rst)
                    _this.setData({
                        currentMonthEventList: rst
                    })
                }else if(type === -1){
                    console.log('rst2:',rst)
                    _this.setData({
                        lastMonthEventList: rst
                    })
                }else if(type === 1){
                    console.log('rst3:',rst)
                    _this.setData({
                        nextMonthEventList: rst
                    })
                }
            },

            fail(error) {
                util.showModel('获取失败', error)
            }
        });
    }
})
