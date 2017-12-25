//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


Page({
    data: {
        currentTab: 0,  
    },

    changeTab (e) {
    	this.setData({
            currentTab : e.currentTarget.dataset.tab
        })
    }
})
