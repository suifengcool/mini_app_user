//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
    data: {
        userInfo: {},
    },

    onLoad: function() {
        var _this = this;
        wx.getStorage({
            key:'userInfo',
            success: function(res) {
                _this.getStorage(res)
            } 
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#333333'
        })
        wx.setNavigationBarTitle({
            title: '我的'
        })
    },
    
    getStorage (res){
        this.setData({
            userInfo : res.data
        })
    },

    goHome (){
        wx.navigateTo({
            url: '../home/index'
        })
    },
})
