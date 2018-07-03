// page/health/result.js
var WxParse = require('../../wxParse/wxParse.js');
var app=getApp();
Page({
  data:{
    score:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    var que_id = app.globalData.que_id;
    var que_folume = app.globalData.que_folume;
    wx.request({
      url: app.globalData.serverUrl + "api.php?s=/Index/getTestResult",
      method:"POST",
      data:{
        que_id:que_id,
        que_folume:que_folume,
      },
      success(res){
        self.setData({
          score:res.data.data.score,
        });
        var que_info=res.data.data.que_info;
        WxParse.wxParse('result', 'html', que_info.result, self);
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})