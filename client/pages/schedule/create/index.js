//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')
var moment = require('../../../vendor/wafer2-client-sdk/lib/moment/we-moment-with-locales');

Page({
    data: {
        start_time: '08:00',
        end_time: '12:00',
        date: '2018年1月1日',
        today: '',
        event_title: '',
        event_detail: '',
        adress: '',
        userInfo: {},
        month: ''

    },

    onLoad: function(){
        var _this = this;
        wx.getStorage({
            key:'userInfo',
            success: function(res) {
                _this.getStorage(res)
            } 
        })
		var date = new Date();
        var today = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
        this.setData({
            date: today,
            today: today
        })
    },

    bindStartTimeChange: function(e) {
	    this.setData({
	        start_time: e.detail.value
	    })
    },

    bindEndTimeChange: function(e) {
        this.setData({
            end_time: e.detail.value
        })
    },

    bindDateChange: function(e) {
        var date = e.detail.value
	    this.setData({
	        date: date.split('-')[0] + '年' + date.split('-')[1] + '月' + date.split('-')[2] + '日',
            month: date.split('-')[0] + '-' + date.split('-')[1]
	    })
	},

    bindTitleInput: function(e) {
        this.setData({
            event_title: e.detail.value
        })
    },

    bindAdressInput: function(e) {
        this.setData({
            adress: e.detail.value
        })
    },

    bindTextAreaBlur: function(e) {
        console.log(e.detail.value)
        this.setData({
            event_detail: e.detail.value
        })
    },

    getStorage (res){
        this.setData({
            userInfo : res.data
        })
    },

    publish() {
        if(!(this.data.event_title).trim()){
            wx.showModal({
                title: '请填写活动标题', 
                showCancel: false
            })
            return
        }
        if(!(this.data.event_detail).trim()){
            wx.showModal({
                title: '请填写活动详情', 
                showCancel: false
            })
            return
        }
        if(!(this.data.adress).trim()){
            wx.showModal({
                title: '请填写活动地址', 
                showCancel: false
            })
            return
        }
        wx.request({
            url: config.service.createSchedule,
            method: 'post',
            data: {
                start_time: this.data.start_time,
                end_time: this.data.end_time,
                date: this.data.date,
                adress: this.data.adress,
                event_detail: this.data.event_detail,
                event_title: this.data.event_title,
                user: this.data.userInfo.nickName,
                month: this.data.month
            },
            success(result) {
                
                wx.showToast({  
                    title: '新建成功',  
                    icon: 'success',  
                    duration: 2000,
                    // complete: that.create(1)
                }) 
            },

            fail(error) {
                util.showModel('提交失败', error)
            }
        });
    }
})
