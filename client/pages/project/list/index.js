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
	    projectList: [],
	    sortStatus: [{
	    	name:'日期',sortUp:true
	    }],
	    inputValue: '',
	    scroll_x: true
    },
	
	onLoad: function(){
		this.setData({
	        projectList: [{
	        	id: 1,
	        	name: '店族-门店端',
	        	tools: ['VueJS','NodeJS','Sass','VmUI'],
	        	skills: 'VueJS、ES6、Sass、NodeJS、Webpack、VmUI',
	        	type: '微信公众号',
	        	time: '2017年4月至2017年7月',
	        	desc:'公司是采用线上代理分销和终端用户的运营模式，对应开发产品有大使端(企业号)和用户端(公众号)，里面嵌入公司购物平台，产品逻辑包括用户管理，大使管理，整套电商购物结算流程，大使收益分配。前端采用vue2.0框架，通过flexible和rem布局，通过750px标准设计稿适配所有终端机型。',
	        	imgData: ['https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/503e443fc0898cdaa60e6ffbaf6561cc340bb94225fe795aef3cb14fe53d7aabfe250e9aed152815c18c4fdb13675a73?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=dzshop10.jpg&size=1024'],
	        	imageUrl: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/4dd8182d1f97629282ece0d204c18a8745066290bf441ec4b7a4bfd6127a371a5f64f1e4e7a82cd2b5672b0715ec394f?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=dzshop1.jpg&size=1024'
	        },{
	        	id: 2,
	        	name: '店族-用户端',
	        	tools: ['VueJS','NodeJS','Sass','VmUI'],
	        	skills: 'VueJS、ES6、Sass、NodeJS、Webpack、VmUI',
	        	type: '微信公众号',
	        	time: '2017年4月至2017年7月',desc:'公司是采用线上代理分销和终端用户的运营模式，对应开发产品有大使端(企业号)和用户端(公众号)，里面嵌入公司购物平台，产品逻辑包括用户管理，大使管理，整套电商购物结算流程，大使收益分配。前端采用vue2.0框架，通过flexible和rem布局，通过750px标准设计稿适配所有终端机型。',
	        	imageUrl: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/19d3ead9509f0e75dbba1d523728e59dc04db2bc46c5372f397c6ffd809ca1c279fa9e1b14a10cc76c565976224aa8c1?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=dzwap1.jpg&size=1024'
	        },{
	        	id: 3,
	        	name: '优网科技-运营平台',
	        	tools: ['VueJS','NodeJS','Sass','VmUI'],
	        	skills: 'VueJS、ES6、Sass、NodeJS、Webpack、VmUI',
	        	type: 'PC端',
	        	time: '2017年9月至2017年12月',
	        	desc:'公司是采用线上代理分销和终端用户的运营模式，对应开发产品有大使端(企业号)和用户端(公众号)，里面嵌入公司购物平台，产品逻辑包括用户管理，大使管理，整套电商购物结算流程，大使收益分配。前端采用vue2.0框架，通过flexible和rem布局，通过750px标准设计稿适配所有终端机型。',
	        	imageUrl: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/715d591c0a46098baada95af6cffc961506c2de77608fdda543982f7b1d8b25c80f3d04711af10a2131651c1da177398?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-01-10%20%E4%B8%8B%E5%8D%8810.55.50.png&size=1024'
	        },{
	        	id: 4,
	        	name: '优网科技-政企端',
	        	tools: ['VueJS','NodeJS','Sass','VmUI'],
	        	skills: 'VueJS、ES6、Sass、NodeJS、Webpack、VmUI',
	        	type: 'PC端',
	        	time: '2017年9月至2017年12月',
	        	desc:'公司是采用线上代理分销和终端用户的运营模式，对应开发产品有大使端(企业号)和用户端(公众号)，里面嵌入公司购物平台，产品逻辑包括用户管理，大使管理，整套电商购物结算流程，大使收益分配。前端采用vue2.0框架，通过flexible和rem布局，通过750px标准设计稿适配所有终端机型。',
	        	imageUrl: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/715d591c0a46098baada95af6cffc961506c2de77608fdda543982f7b1d8b25c80f3d04711af10a2131651c1da177398?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202018-01-10%20%E4%B8%8B%E5%8D%8810.55.50.png&size=1024'
	        },{
	        	id: 5,
	        	name: '影大人-官网',
	        	tools: ['VueJS','NodeJS','Sass','VmUI'],
	        	skills: 'VueJS、ES6、Sass、NodeJS、Webpack、VmUI',
	        	type: 'Pc端',
	        	time: '2016年7月至2016年9月',
	        	desc:'公司是采用线上代理分销和终端用户的运营模式，对应开发产品有大使端(企业号)和用户端(公众号)，里面嵌入公司购物平台，产品逻辑包括用户管理，大使管理，整套电商购物结算流程，大使收益分配。前端采用vue2.0框架，通过flexible和rem布局，通过750px标准设计稿适配所有终端机型。',
	        	imageUrl: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/a68c16388cbf075f64eb8763a9d900e3e43fa1214959a0109b8afc1666bcb1acd7db50a75ff38c3f31d63da947049738?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=ydrpc1.jpg&size=1024'
	        },{
	        	id: 6,
	        	name: '影大人-移动端',
	        	tools: ['VueJS','NodeJS','Sass','VmUI'],
	        	skills: 'VueJS、ES6、Sass、NodeJS、Webpack、VmUI',
	        	type: 'H5移动端',
	        	time: '2016年7月至2016年9月',
	        	desc:'公司是采用线上代理分销和终端用户的运营模式，对应开发产品有大使端(企业号)和用户端(公众号)，里面嵌入公司购物平台，产品逻辑包括用户管理，大使管理，整套电商购物结算流程，大使收益分配。前端采用vue2.0框架，通过flexible和rem布局，通过750px标准设计稿适配所有终端机型。',
	        	imageUrl: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/74cf2dba79f485231ccfca5c6c22d164e369225c0703e659ac6f1d9ac5d5c78cf32d711ebe1561c72ff2f3f0e6bec9cb?pictype=scale&from=30113&version=2.0.0.2&uin=371801080&fname=yingdaren1.jpg&size=1024'
	        }]
	    })
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

    },

    search() {
		console.log('bindKeyInput:',this.data.inputValue)
    },

    bindKeyInput: function(e) {
	    this.setData({
	        inputValue: e.detail.value
	    })
    },

    goDetail(e){
    	var data = e.currentTarget.dataset.detail;
    	wx.setStorageSync('projectDeail', data)
    	wx.navigateTo({
	        url: `../detail/index?id=${data.id}`
    	})
    }
})
