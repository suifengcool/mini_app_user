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
        day: '',                                               // 当前日
        chooseDay: '',                                         // 选中日
        WeekDay: '1',                                          // 当前日期是本周几
        eventList:[{
            title: '圣诞节',
            content: '要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦'
        },{
            title: '圣诞节',
            content: '要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦'
        },{
            title: '圣诞节',
            content: '要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦，要去逛街，买衣服，好多事情哦'
        }]
    },

    onLoad: function(options){
		this.setData({
			year: options.year,
			month: options.month,
			day: options.day
		})
		this.fetchDayList()
        this.fetchEventList()
    },

    chooseDay(e){
        console.log('e:',e.currentTarget.dataset.choosed)
        this.setData({
            chooseDay: e.currentTarget.dataset.choosed
        })
        
    },

    // 渲染周日历
    fetchDayList(){
    	var dayList = [];
        var today = new Date(this.data.year,this.data.month-1,this.data.day);
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

    // 获取当日
    fetchEventList(){
        wx.request({
            url: config.service.getScheduleListByDay,
            method: 'post',
            data: {
                date: this.data.year + '年0' + this.data.month + '月0' + this.data.day + '日'
            },
            success(result) {
                console.log('result:',result)
            },

            fail(error) {
                util.showModel('提交失败', error)
            }
        });
    }
})
