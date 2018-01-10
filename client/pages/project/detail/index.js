//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
    data: {
        id: '',
        currentTab: '1',
        pics:[    
            {url:'../../../image/uway1.png'} ,    
            {url:'../../../image/uway2.png'} ,    
            {url:'../../../image/ydr.png'} ,    
            {url:'../../../image/weixin2.png'}     
        ],
        projectDeail : {}
    },

    onLoad: function(options){
        var _this = this;
        wx.getStorage({
            key:'projectDeail',
            success: function(res) {
                _this.getStorage(res)
            } 
        })
		this.setData({
			id: options.id
		})
    },

    changeTab (e){
		this.setData({
            currentTab : e.currentTarget.dataset.tab
        })
    },

    getStorage (res){
        this.setData({
            projectDeail : res.data
        })
    },
})
