//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')
var moment = require('../../../vendor/wafer2-client-sdk/lib/moment/we-moment-with-locales');

Page({
    data: {
        time: '',
        date: ''
    },

    onLoad: function(){
		
    },

    bindTimeChange: function(e) {
    	console.log('picker发送选择改变，携带值为', e.detail.value)
	    this.setData({
	        time: e.detail.value
	    })
    },

    bindDateChange: function(e) {
	    console.log('picker发送选择改变，携带值为', e.detail.value)
	    this.setData({
	        date: e.detail.value
	    })
	},
})
