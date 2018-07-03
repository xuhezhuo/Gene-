// page/faq/detail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    var id=options.id?options.id:0;
    if(id==0){
      wx.showToast("问题不存在");
      wx.navigateBack();
    }else{
      wx.request({
        url: app.globalData.serverUrl + "api.php?s=/Index/get_faq_by_id",
        data: {id:id},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          var faq_info=res.data.data;
          WxParse.wxParse('question','html',faq_info.question,self);
          WxParse.wxParse('answer','html',faq_info.answer,self);
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
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