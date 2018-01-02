//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
    data: {
        userInfo: {},
        jokeList: [],
        joke: '',
        focus: false,
        edit: false,
        editContent: '',
        num: 0
    },

    onLoad: function() {
        var _this = this;
        wx.getStorage({
            key:'userInfo',
            success: function(res) {
                _this.getStorage(res)
            } 
        })
        _this.getJokeList();

    },

    getJokeList(value){
        var that = this;
        wx.request({
            url: config.service.getJoke,
            method: 'get',
            success(result) {
                that.setData({
                    jokeList: result.data.data.data,
                    joke: value ? value : result.data.data.data[Math.floor(Math.random() *(result.data.data.data.length-1))].content
                })
            },
            fail(error) {
                util.showModel('获取joke列表失败', error)
            }
        });
    },

    change (){
        this.setData({
            joke:this.data.jokeList[Math.floor(Math.random() *(this.data.jokeList.length-1))].content
        })
    },

    create (type){
        this.setData({
            focus: type === 1 ? false : !this.data.focus,
            edit: type === 1 ? false : !this.data.edit,
            joke: type === 1 ? this.data.editContent : this.data.jokeList[Math.floor(Math.random() *(this.data.jokeList.length-1))].content
        })
    },

    submitJoke(e) {
        var that = this;
        if(!(e.detail.value.textarea).trim()){
            wx.showModal({
                title: '空空如也，如何提交~', 
                showCancel: false
            })
            return
        }
        wx.request({
            url: config.service.updateJoke,
            method: 'post',
            data: {
                content: e.detail.value.textarea,
                user: that.data.userInfo.nickName
            },
            success(result) {
                var editContent = e.detail.value.textarea;
                that.getJokeList(editContent);
                wx.showToast({  
                    title: '提交成功',  
                    icon: 'success',  
                    duration: 2000,
                    complete: that.create(1)
                }) 
            },

            fail(error) {
                util.showModel('提交失败', error)
            }
        });
          
    },

    getStorage (res){
        this.setData({
            userInfo : res.data
        })
    },



})
