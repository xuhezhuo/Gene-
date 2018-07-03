// page/health/test.js
var app = getApp();
var inputContent = {};
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    que_items: null,
    que_info: null,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var self = this;
    var que_id = options.id ? options.id : 0;

    app.globalData.que_id=que_id;

    if (que_id == 0) {
      wx.showToast("产品不存在");
      wx.navigateBack();
    } else {
      wx.request({
        url: app.globalData.serverUrl + "api.php?s=/Index/getQueById",
        data: { que_id: que_id },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          var items = res.data.data.que_items;
          for (let i = 0; i < items.length; i++) {
            if (items[i].type == "radio") {
              var answer = items[i].answer.split(";");
              var text = [];
              var score = [];
              for (let j = 0; j < answer.length; j++) {
                var a = answer[j].split("[");
                text.push(a[0]);
                score.push(a[1].substring(0, a[1].length - 1));
              }
              items[i].textArray = text;
              items[i].scoreArray = score;
            }
          }

          self.setData({
            que_items: items,
            que_info: res.data.data.que_info,
          });

          WxParse.wxParse('description', 'html', self.data.que_info.description, self);
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindChange: function (e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },
  formSubmit: function (e) {
    var self = this;
    //检测是否已经填写完整
    for (let i = 0; i < self.data.que_items.length; i++) {
      if (inputContent['x_' + self.data.que_items[i].id] == null || inputContent['x_' + self.data.que_items[i].id] == '') {
        wx.showToast({
          title: '请先填写完整的问卷',
        })
        return;
      }
    }
    
    //根据公式计算得分
    var folume=self.data.que_info.rule;
    for(let i=0;i<self.data.que_items.length;i++){
      var item=self.data.que_items[i];
      folume = folume.replace("[x" + item.id+"]", inputContent['x_' + item.id] );
    }
    // var value=eval(folume);
    //小程序不支持eval，把计算公式反回服务器，右服务器计算出结果。
    app.globalData.que_folume=folume;
    
    wx.navigateTo({
      url: '/page/health/result'
    })
  }
})