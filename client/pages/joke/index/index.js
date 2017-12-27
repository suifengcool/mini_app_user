//index.js
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
var util = require('../../../utils/util.js')

Page({
    data: {
        jokeList: [{
            id: 1,
            content: '去一家刚开业的米粉店吃米粉，正吃着的时候，店老板接了个电话，应该是他的什么朋友打电话来询问开业生意如何？只听这老板骂骂咧咧道：生意冷清啊！奶奶的，稀稀拉拉没几个人，就说现在吧，他妈的，只有一个SB顾客在吃。。。'
        },{
            id: 2,
            content: '小逗号八点钟才起床，脸也顾不得洗，背着书包就往跑。他上气不接下气地跑进教室，喊了声“报告”，就坐在自己座位上，听地理老师讲课。“小逗号，你站起来回答我的问题，”老师用教鞭指着地图，“什么叫赤道？”，小逗号红着脸答道：“八点钟上课，八点过了才进教室，就叫迟到！”'
        },{
            id: 3,
            content: '高中时，老师语重心长的教育我们。最后总结了一句：你们都懂点事吧，一个个都老大不小了。哥听的烦了，就接了一句：岂止老大不小了，老二都不小了。'
        },{
            id: 4,
            content: '大一某美女老师......几天婚假后重新开课，美女老师嗓子沙哑，前排一童鞋关切地问，老师怎么嗓子哑了......后排阴暗角落传来一句：喊哑的......'
        }],
        joke: '',
        focus: false,
        edit: false,
        editContent: '',
        num: 0
    },

    onLoad: function() {
        this.change();
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


})
