//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
    data: {
        jokeList: [],
        joke: '',
        focus: false,
        edit: false,
        editContent: '',
        num: 0
    },

    onLoad: function() {
        this.getJokeList();
    },

    getJokeList(){
        var that = this;
        wx.request({
            url: config.service.getJoke,
            method: 'get',
            success(result) {
                that.setData({
                    jokeList: result.data.data.data
                })
                that.change();
            },

            fail(error) {
                util.showModel('获取joke列表失败', error)
            }
        });
    },

    change (){
        this.setData({
            joke: this.data.jokeList[Math.floor(Math.random() *(this.data.jokeList.length-1))].content
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
        if(!(e.detail.value.textarea).trim()){
            wx.showModal({
                title: '空空如也，如何提交~', 
                showCancel: false
            })
            return
        }
        wx.request({
            url: config.service.getJoke,
            method: 'post',
            data: e.detail.value.textarea,
            success(result) {
                this.setData({
                    editContent: e.detail.value.textarea
                })
                wx.showToast({  
                    title: '提交成功',  
                    icon: 'success',  
                    duration: 2000,
                    complete: this.create(1)
                }) 
            },

            fail(error) {
                util.showModel('提交失败', error)
            }
        });
          
    },


})
