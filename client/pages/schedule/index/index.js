//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')
var moment = require('../../../vendor/wafer2-client-sdk/lib/moment/we-moment-with-locales');

Page({
    data: {
        weekList: ['一','二','三','四','五','六','日'],          // 星期池
        dayList: [],                                           // 日期池
        year: '',                                              // 当前年
        month: '',                                             // 当前月
        day: '',                                               // 选中日
        today: '',                                             // 当前日
        chooseDay: '',                                         // 选中日
        WeekDay: '1',                                          // 当前日期是本周几
        eventList:[],                                          // 事件池
        currentMonthList:[],                                    // 当月日历
        showMonth: true,
    },

    onLoad: function(options){
        var today = new Date();                                // 获取当日日历
        var year = options.year ? options.year : today.getFullYear(),
            month = options.month ? options.month : today.getMonth() + 1,
            day = options.day ? options.day : today.getDate();

        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#55cbc4'
        })
        wx.setNavigationBarTitle({
            title: year + '年' + month + '月'
        })
		this.setData({
			year: year,
			month: month,
			day: day,
            today: day
		})
        this.fetchMonthData(year, month, 0)                     // 获取本月日历
		this.fetchDayList()
        this.fetchEventList()
    },

    chooseDay(e){
        this.setData({
            chooseDay: e.currentTarget.dataset.choosed,
            day: e.currentTarget.dataset.choosed.toString(),
            showMonth: false
        })
        this.fetchEventList()
        this.fetchDayList()
    },

    // 渲染周日历
    fetchDayList(){
    	var dayList = [];
        var today = new Date(this.data.year,this.data.month-1,this.data.day);
        console.log('today.getDay():',today.getDay())
        var WeekDay = today.getDay() == 0 ? 7 : today.getDay();
        this.setData({
        	WeekDay: WeekDay
        })         
        for(var i=1,j=WeekDay;i<j;i++){
            var item = moment(today).subtract(i,'day').format('D')
            dayList.unshift(item)
        }
        for(var k=0;k<=7-WeekDay;k++){
            var item = moment(today).add(k,'day').format('D')
            dayList.push(item)
        }
        this.setData({
        	dayList: this.editAwrray(dayList)
        })
    },

    // 数组去重
    editAwrray(arr) {
        let newArr = [], obj = {}
        arr.forEach((item, index) =>{
            if(obj[item]){
                return
            }else{
                obj[item] = 1
                newArr.push(item)
            }
        })
        arr = newArr
        return arr
    },

    // 获取当日事件
    fetchEventList(){
        var _this = this;
        var date = 
            this.data.year 
            + ((this.data.month).length > 1 ? '年' : '年0') 
            + this.data.month 
            + ((this.data.day).length > 1 ? '月' : '月0')
            + this.data.day + '日';
        wx.request({
            url: config.service.getScheduleListByDay,
            method: 'post',
            data: {
                date: date
            },
            success(result) {
                console.log('result:',result)
                _this.setData({
                    eventList: result.data.data.data
                })
            },

            fail(error) {
                util.showModel('提交失败', error)
            }
        });
    },

    // 获取月日历
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

    bindscroll(e){
        // //创建节点选择器
        // var query = wx.createSelectorQuery();
        // //选择id
        // query.select('#mjltest').boundingClientRect()
        // query.exec(function (res) {
        //   //res就是 所有标签为mjltest的元素的信息 的数组
        //   console.log(res);
        //   //取高度
        //   console.log(res[0].top);
        // })
        if(e.detail.deltaY>0){
            this.setData({
                isUp: true
            })
        }else if(e.detail.deltaY<0){
            this.setData({
                isUp: false
            })
        }
    },

    onPullDownRefresh: function () {
        this.setData({
            showMonth: true
        })
    },
})
