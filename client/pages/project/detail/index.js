//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
    data: {
        id: ''
    },

    onLoad: function(options){
		this.setData({
			id: options.id
		})
    }
})
