//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
    data: {
        movies:[    
		    {url:'../../../image/uway1.png'} ,    
		    {url:'../../../image/uway2.png'} ,    
		    {url:'../../../image/ydr.png'} ,    
		    {url:'../../../image/weixin2.png'}     
	    ],
	    sortStatus: [{
	    	name:'评分',sortUp:true
	    },{
	    	name:'日期',sortUp:true
	    }]
    },

    getSort(e){
    	var _this = this;
    	var item = e.currentTarget.dataset.item;
		var sortStatus = [];
		_this.data.sortStatus.forEach(function(ele,i){
			if(ele.name == item.name){
				ele.sortUp = !item.sortUp
			}
			sortStatus.push(ele)

		})
		this.setData({
			sortStatus: sortStatus
		})

    }
})
